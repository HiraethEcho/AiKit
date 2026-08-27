/**
 * pi-ocgo — merged OpenCode Go extension for Pi.
 *
 * Combines:
 *   1. Prompt caching (from pi-opencode-go-cache) — stamped on every
 *      opencode-go request via before_provider_request.
 *   2. Subscription usage (from pi-ocgo-usage) — fetched fire-and-forget
 *      and shown in the footer alongside the session cache-hit ratio.
 *
 * Footer (single status key "ocgo", compact):
 *   ocgo: 5h 23%(3h25m) · wk30% · mo12% · 🔱42% · no-cache
 * Rolling (5h) window shows time remaining; weekly/monthly & fetch
 * timestamp are dropped for brevity.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { stampOpencodeGoCache, type CacheStampResult } from "./cache";
import { runOcgoConfig } from "./config-cmd";
import { isOpencodeGoModel, isOpencodeGoProvider } from "./provider";
import { renderErrorStatusCode, UsageCache, type NormalizedUsage } from "./usage";

const STATUS_KEY = "ocgo";
const WINDOW_LABELS: Record<string, string> = { rolling: "5h", weekly: "wk", monthly: "mo" };

/** Last cache-stamp outcome, tracked for footer decoration. */
let lastCacheState: CacheStampResult | undefined;

// ── Footer rendering (compact, single line) ────────────────────────────────
type U = NonNullable<NormalizedUsage["rolling"]>;

function formatReset(sec: number): string {
    if (!Number.isFinite(sec) || sec <= 0) return "";
    const total = Math.floor(sec);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    if (h > 0) return `${h}h${m > 0 ? `${m}m` : ""}`;
    if (total >= 60) return `${Math.floor(total / 60)}m`;
    return `${total}s`;
}

function windowSeg(w: U, theme: any): string {
    const label = WINDOW_LABELS[w.kind] ?? w.kind;
    const color = w.status === "rate-limited" || w.percent >= 90 ? "error" : w.percent >= 80 ? "warning" : "syntaxString";
    const reset = w.kind === "rolling" ? formatReset(w.resetInSec) : "";
    return `${theme.fg("muted", label)}${theme.fg(color, `${w.percent}%`)}${reset ? theme.fg("dim", `(${reset})`) : ""}`;
}

/** Compute the cumulative cache-hit ratio from session usage entries. */
function computeCacheHit(ctx: any): string | null {
    const finite = (n: unknown): number => (typeof n === "number" && Number.isFinite(n) ? n : 0);
    let input = 0, cacheRead = 0, cacheWrite = 0;
    const add = (u: any) => {
        if (!u) return;
        input += finite(u.input);
        cacheRead += finite(u.cacheRead);
        cacheWrite += finite(u.cacheWrite);
    };
    const entries = ctx?.sessionManager?.getEntries?.() ?? ctx?.sessionManager?.getBranch?.() ?? [];
    for (const e of entries) {
        if (e?.type === "message") {
            const m = e.message;
            if (m?.role === "assistant") add(m.usage);
            else if (m?.role === "toolResult" && m?.usage) add(m.usage);
        } else if ((e?.type === "branch_summary" || e?.type === "compaction") && e?.usage) {
            add(e.usage);
        }
    }
    const promptTokens = input + cacheRead + cacheWrite;
    if (promptTokens <= 0 || (cacheRead === 0 && cacheWrite === 0)) return null;
    return ((cacheRead / promptTokens) * 100).toFixed(1) + "%";
}

function renderUsage(data: NormalizedUsage, theme: any, ctx: any): string | undefined {
    const parts: string[] = [];
    if (data.rolling) parts.push(windowSeg(data.rolling, theme));
    if (data.weekly) parts.push(windowSeg(data.weekly, theme));
    if (data.monthly) parts.push(windowSeg(data.monthly, theme));

    const hit = computeCacheHit(ctx);
    if (hit) parts.push(theme.fg("syntaxType", `\uf1c0${hit}`));
    if (lastCacheState === "unsupported") parts.push(theme.fg("warning", "no-cache"));

    if (parts.length === 0) return undefined;
    return `${theme.fg("muted", "ocgo:")} ${parts.join(" · ")}`;
}

function renderError(error: unknown, theme: any, _ctx: any): string {
    const hit = _ctx ? computeCacheHit(_ctx) : null;
    const hitPart = hit ? ` · ${theme.fg("syntaxType", `\uf1c0${hit}`)}` : "";
    return `${theme.fg("muted", "ocgo:")}${theme.fg("error", renderErrorStatusCode(error))}${hitPart}`;
}

// ── Extension wiring ───────────────────────────────────────────────────────
const extension = (pi: ExtensionAPI): void => {
    const usageCache = new UsageCache(
        STATUS_KEY,
        {
            render: renderUsage,
            renderError,
        },
    );

    // Cache stamping on every opencode-go request.
    pi.on("before_provider_request", (event, ctx) => {
        try {
            const model = ctx.model as { provider?: string; api?: string; id?: string } | undefined;
            if (!isOpencodeGoModel(model)) return undefined;
            const payload = event.payload as Record<string, unknown>;
            if (!payload || typeof payload !== "object") return undefined;
            lastCacheState = stampOpencodeGoCache(
                model,
                payload,
                (ctx.sessionManager as any)?.getSessionId?.(),
            );
            return payload;
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            try {
                ctx.ui.notify(`pi-ocgo cache: ${msg} (request sent without caching)`, "warning");
            } catch {
                /* ignore */
            }
            return undefined;
        }
    });

    // Refresh status on session start, model switch, and each turn.
    pi.on("session_start", (_e, ctx) => {
        if (isOpencodeGoProvider(ctx)) usageCache.refresh(ctx);
    });
    pi.on("model_select", (event, ctx) => {
        if (isOpencodeGoModel(event.model)) {
            lastCacheState = undefined;
            usageCache.refresh(ctx);
        } else {
            lastCacheState = undefined;
            usageCache.clear(ctx);
        }
    });
    pi.on("turn_end", (_e, ctx) => {
        if (isOpencodeGoProvider(ctx)) usageCache.refresh(ctx);
    });
    pi.on("session_shutdown", (_e, ctx) => {
        lastCacheState = undefined;
        usageCache.clear(ctx);
    });

    pi.registerCommand("oc-go-config", {
        description: "Configure OpenCode Go usage (cookie + workspace_id)",
        handler: async (args: string, ctx: any) => {
            await runOcgoConfig(args, ctx);
        },
    });
};

export default extension;
