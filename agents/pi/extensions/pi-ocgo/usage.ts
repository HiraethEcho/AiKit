/**
 * Usage fetching + caching for pi-ocgo (port of pi-ocgo-usage).
 *
 * Two HTTP paths (cookie SSR scrape primary; apikey official endpoint when
 * the PR merges), both adapting to `NormalizedUsage`. The refresh is
 * fire-and-forget — never blocks the message pipeline.
 */
import { loadConfig } from "./config";

// ============================================================================
// Types
// ============================================================================
export interface WindowUsage {
    kind: "rolling" | "weekly" | "monthly";
    percent: number;
    resetInSec: number;
    status: "ok" | "rate-limited";
}

export interface NormalizedUsage {
    useBalance?: boolean;
    updatedAt?: number;
    rolling?: WindowUsage;
    weekly?: WindowUsage;
    monthly?: WindowUsage;
}

export class UsageError extends Error {
    code: string;
    name = "UsageError";
    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

// ============================================================================
// HTTP + parsing (cookie SSR path)
// ============================================================================
async function safeFetchText(url: string, init: RequestInit, timeoutMs: number): Promise<string> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, { method: init.method ?? "GET", headers: init.headers, signal: controller.signal });
        if (!res.ok) throw new UsageError(`HTTP ${res.status}`, `http${res.status}`);
        return await res.text();
    } catch (e) {
        if (e instanceof UsageError) throw e;
        if (e instanceof Error && e.name === "AbortError") {
            throw new UsageError(`Request timed out after ${timeoutMs}ms`, "timeout");
        }
        throw new UsageError(e instanceof Error ? e.message : String(e), "fetch");
    } finally {
        clearTimeout(timer);
    }
}

async function fetchViaCookie(cfg: ReturnType<typeof loadConfig>): Promise<NormalizedUsage> {
    if (!cfg.cookie || !cfg.workspaceID) {
        throw new UsageError("Missing cookie or workspaceID", "noconfig");
    }
    const url = `${cfg.baseUrl}/workspace/${encodeURIComponent(cfg.workspaceID)}/go`;
    const html = await safeFetchText(url, { headers: { Cookie: cfg.cookie, Accept: "text/html" } }, cfg.timeoutMs);
    return fromSSRHTML(html);
}

/** Parse the SSR usage page into NormalizedUsage. */
export function fromSSRHTML(html: string): NormalizedUsage {
    const itemStartRe = /<div[^>]*data-slot="usage-item"/g;
    const starts: number[] = [];
    let startMatch = itemStartRe.exec(html);
    while (startMatch !== null) {
        starts.push(startMatch.index);
        startMatch = itemStartRe.exec(html);
    }
    const items: Array<{ label: string; percent: number; resetsIn: string }> = [];
    for (let i = 0; i < starts.length; i++) {
        const block = html.slice(starts[i], starts[i + 1] ?? html.length);
        const labelMatch = block.match(/data-slot="usage-label"[^>]*>([^<]+)</);
        const valueMatch = block.match(/data-slot="usage-value"[\s\S]*?<!--\$-->\s*(\d+)\s*<!--\/-->/);
        const resetMatch = block.match(/data-slot="reset-time"[\s\S]*?Resets in(?:<!--\/-->\s*)?([\s\S]*?)(?:<!--\/-->|<\/span>)/);
        if (!labelMatch || !valueMatch) continue;
        const label = labelMatch[1]?.trim() ?? "";
        const percent = Number.parseInt(valueMatch[1] ?? "0", 10);
        const resetsIn = resetMatch ? stripHtmlComments(resetMatch[1] ?? "").trim() : "";
        items.push({ label, percent, resetsIn });
    }
    const result: NormalizedUsage = { useBalance: html.includes("useBalance") };
    for (const item of items) {
        const kind = labelToKind(item.label);
        if (!kind) continue;
        result[kind] = {
            kind,
            percent: clampPercent(item.percent),
            resetInSec: parseDurationToSec(item.resetsIn),
            status: item.percent >= 100 ? "rate-limited" : "ok",
        };
    }
    return result;
}

function labelToKind(label: string): WindowUsage["kind"] | undefined {
    const lower = label.toLowerCase();
    if (lower.startsWith("rolling")) return "rolling";
    if (lower.startsWith("weekly")) return "weekly";
    if (lower.startsWith("monthly")) return "monthly";
    return undefined;
}

function stripHtmlComments(s: string): string {
    return s.replace(/<!--[\s\S]*?-->/g, "").trim();
}

/** Parse a human duration phrase ("2 hours 29 minutes") into seconds. */
export function parseDurationToSec(phrase: string): number {
    if (!phrase) return 0;
    const p = phrase.trim().replace(/\s+/g, " ").toLowerCase();
    if (!p) return 0;
    const re = /(\d+)\s*(second|minute|hour|day|week|month|year)s?/g;
    let total = 0;
    let matched = false;
    let m = re.exec(p);
    while (m !== null) {
        const n = Number.parseInt(m[1] ?? "0", 10);
        const unit = m[2] ?? "";
        matched = true;
        switch (unit) {
            case "second": total += n; break;
            case "minute": total += n * 60; break;
            case "hour": total += n * 3600; break;
            case "day": total += n * 86400; break;
            case "week": total += n * 604800; break;
            case "month": total += n * 2592000; break;
            case "year": total += n * 31536000; break;
        }
        m = re.exec(p);
    }
    return matched ? total : 0;
}

function clampPercent(n: number): number {
    return Math.max(0, Math.min(100, Math.floor(n)));
}

// ============================================================================
// Orchestrator
// ============================================================================
/** Fetch usage via the configured paths, stamping the fetch time. */
export async function fetchUsage(registry: unknown): Promise<NormalizedUsage> {
    const cfg = loadConfig();
    if (cfg.mode === "cookie" && cfg.cookie && cfg.workspaceID) {
        return stampUpdatedAt(await fetchViaCookie(cfg));
    }
    // mode === "auto": cookie path (apikey official API once PR #16513 merges).
    if (cfg.cookie && cfg.workspaceID) {
        return stampUpdatedAt(await fetchViaCookie(cfg));
    }
    throw new UsageError(
        "No usable config (set OPENCODE_GO_COOKIE + OPENCODE_GO_WORKSPACE_ID)",
        "noconfig",
    );
}

function stampUpdatedAt(data: NormalizedUsage): NormalizedUsage {
    return { ...data, updatedAt: Date.now() };
}

/** Short error code for the footer (e.g. "noconfig", "http500"). */
export function renderErrorStatusCode(error: unknown): string {
    if (error instanceof UsageError) {
        return error.code.length > 0 ? error.code : "fetch";
    }
    return "fetch";
}

// ============================================================================
// Fire-and-forget usage cache
// ============================================================================
interface Renderers<Ctx> {
    render: (data: NormalizedUsage, theme: unknown, ctx: Ctx) => string | undefined;
    renderError: (error: unknown, theme: unknown, ctx: Ctx) => string;
}

export class UsageCache {
    private statusKey: string;
    private fetchUsage: (registry: unknown) => Promise<NormalizedUsage>;
    private render: (data: NormalizedUsage, theme: unknown, ctx: unknown) => string | undefined;
    private renderError: (error: unknown, theme: unknown, ctx: unknown) => string;
    private failureCooldownMs: number;

    private lastData: NormalizedUsage | null = null;
    private lastFetchMs = 0;
    private failureUntilMs = 0;
    private fetching = false;
    private active = false;

    constructor(statusKey: string, renderers: Renderers<unknown>, failureCooldownMs = 60_000) {
        this.statusKey = statusKey;
        this.fetchUsage = fetchUsage;
        this.render = renderers.render;
        this.renderError = renderers.renderError;
        this.failureCooldownMs = failureCooldownMs;
    }

    private get ttlMs(): number {
        return loadConfig().cacheTTL * 1000;
    }

    /** Fire-and-forget refresh. Never throws. */
    refresh(ctx: { ui: { setStatus: (k: string, v: string) => void; theme: unknown }; modelRegistry: unknown }): void {
        this.active = true;
        void this.refreshAsync(ctx);
    }

    /** Clear footer + discard in-flight results. */
    clear(ctx: { ui: { setStatus: (k: string, v: string) => void } }): void {
        this.active = false;
        this.setStatusSafe(ctx, "");
    }

    private async refreshAsync(ctx: { ui: { setStatus: (k: string, v: string) => void; theme: unknown }; modelRegistry: unknown }): Promise<void> {
        const now = Date.now();
        try {
            if (this.lastData && now - this.lastFetchMs < this.ttlMs) {
                this.apply(ctx, this.render(this.lastData, ctx.ui.theme, ctx));
                return;
            }
            if (now < this.failureUntilMs) return;
            if (this.fetching) return;
            this.fetching = true;
            try {
                const data = await this.fetchUsage(ctx.modelRegistry);
                if (!this.active) return;
                this.lastData = data;
                this.lastFetchMs = Date.now();
                this.failureUntilMs = 0;
                this.apply(ctx, this.render(data, ctx.ui.theme, ctx));
            } finally {
                this.fetching = false;
            }
        } catch (error) {
            if (!this.active) return;
            this.failureUntilMs = Date.now() + this.failureCooldownMs;
            this.apply(ctx, this.renderError(error, ctx.ui.theme, ctx));
        }
    }

    private apply(ctx: { ui: { setStatus: (k: string, v: string) => void } }, text: string | undefined): void {
        if (!this.active) return;
        this.setStatusSafe(ctx, text ?? "");
    }

    private setStatusSafe(ctx: { ui: { setStatus: (k: string, v: string) => void } }, text: string): void {
        try {
            ctx.ui.setStatus(this.statusKey, text);
        } catch {
            // ctx invalidated after session shutdown/replace; ignore.
        }
    }
}
