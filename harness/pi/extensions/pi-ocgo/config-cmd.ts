/**
 * /oc-go-config slash command — configure or test the usage side.
 * Port of pi-ocgo-usage's config-cmd. The cookie is never echoed.
 */
import { chmodSync, existsSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fetchUsage, UsageError, type NormalizedUsage } from "./usage";
import { configFilePath, loadConfig, normalizeCookie } from "./config";

const USAGE_HELP = [
    "`/oc-go-config` — configure OpenCode Go usage",
    "",
    "Subcommands:",
    "  (none)  Show current configuration (masked)",
    "  set     Prompt for cookie + workspace_id, persist with chmod 600",
    "  clear   Delete the config file (requires confirmation)",
    "  test    One-shot fetch using the active config",
    "",
    "Env vars:",
    "  OPENCODE_GO_COOKIE         full Cookie header value",
    "  OPENCODE_GO_WORKSPACE_ID   workspace id (wrk_...)",
    "  OPENCODE_GO_BASE_URL       default https://opencode.ai",
    "  OPENCODE_GO_CACHE_TTL      60-3600, default 300",
    "  OPENCODE_GO_MODE           auto | cookie | apikey",
    "  OPENCODE_GO_TIMEOUT_MS     default 10000",
].join("\n");

function fingerprint(value: string | undefined): string {
    if (!value) return "(unset)";
    if (value.length <= 12) return `${value.length} chars`;
    return `${value.length} chars, starts "${value.slice(0, 6)}…"`;
}

function summarize(): string {
    const cfg = loadConfig();
    const file = configFilePath();
    const exists = existsSync(file);
    return [
        `config file: ${file} ${exists ? "" : "(not created)"}`,
        `cookie:        ${fingerprint(cfg.cookie)}`,
        `workspace_id:  ${cfg.workspaceID ?? "(unset)"}`,
        `base_url:      ${cfg.baseUrl}`,
        `cache_ttl:     ${cfg.cacheTTL}s`,
        `mode:          ${cfg.mode}`,
        `timeout_ms:    ${cfg.timeoutMs}`,
    ].join("\n");
}

function writeConfig(cookie: string, workspaceID: string): void {
    const path = configFilePath();
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({ cookie, workspaceID }, null, 2), { encoding: "utf8", mode: 0o600 });
    chmodSync(path, 0o600);
}

function rawSummary(data: NormalizedUsage): string {
    const seg = (k: "rolling" | "weekly" | "monthly") => (data[k] ? `${k}:${data[k]!.percent}%` : null);
    return [seg("rolling"), seg("weekly"), seg("monthly")].filter(Boolean).join(" ");
}

/** Entry point registered as /oc-go-config. */
export async function runOcgoConfig(args: string, ctx: any): Promise<Record<string, unknown>> {
    const sub = args.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
    if (sub === "" || sub === "status" || sub === "help") {
        ctx.ui.notify(summarize(), "info");
        ctx.ui.notify(USAGE_HELP, "info");
        return {};
    }
    if (sub === "set") {
        const workspaceID = await ctx.ui.input("OpenCode Go workspace ID (wrk_…)", loadConfig().workspaceID ?? "");
        if (!workspaceID) {
            ctx.ui.notify("Cancelled: workspace ID is required.", "warning");
            return {};
        }
        const cookie = await ctx.ui.input("OpenCode Go session cookie (e.g. auth=Fe26.2*…; oc_locale=zh)", loadConfig().cookie ?? "");
        if (!cookie) {
            ctx.ui.notify("Cancelled: cookie is required.", "warning");
            return {};
        }
        const confirmed = await ctx.ui.confirm("Persist cookie to disk?", `Cookie written to ${configFilePath()} with mode 0600. Continue?`);
        if (!confirmed) return {};
        try {
            const normalized = normalizeCookie(cookie) ?? cookie;
            writeConfig(normalized, workspaceID);
            ctx.ui.notify(`Saved: ${configFilePath()}\n  cookie: ${fingerprint(normalized)}`, "info");
        } catch (e) {
            ctx.ui.notify(`Failed to save: ${e instanceof Error ? e.message : String(e)}`, "error");
        }
        return { clearStatus: true };
    }
    if (sub === "clear") {
        const path = configFilePath();
        if (!existsSync(path)) {
            ctx.ui.notify("Nothing to clear.", "info");
            return {};
        }
        const ok = await ctx.ui.confirm("Delete config file?", `Remove ${path}?`);
        if (!ok) return {};
        unlinkSync(path);
        ctx.ui.notify(`Removed ${path}`, "info");
        return { clearStatus: true };
    }
    if (sub === "test") {
        ctx.ui.notify("Running one-shot fetch…", "info");
        try {
            const data = await fetchUsage(ctx.modelRegistry);
            const rendered = rawSummary(data);
            ctx.ui.notify(rendered ? `OK: ${rendered}` : "OK (no windows to display).", "info");
        } catch (e) {
            const code = e instanceof UsageError ? e.code : "fetch";
            const msg = e instanceof Error ? e.message : String(e);
            ctx.ui.notify(`Failed: <err:${code}>\n  ${msg}`, "error");
        }
        return { clearStatus: true };
    }
    ctx.ui.notify(`Unknown subcommand: ${sub}\n\n${USAGE_HELP}`, "warning");
    return {};
}
