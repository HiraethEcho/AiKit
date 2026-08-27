import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { truncateToWidth, visibleWidth, wrapTextWithAnsi } from "@earendil-works/pi-tui";
import { homedir } from "node:os";
import { existsSync } from "node:fs";
import { join } from "node:path";
// ponytail: duplicated from pi-pane/metrics.ts to keep pi-footer independent.
function finite(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0;
}

function formatTokens(count: number): string {
  const safe = Math.max(0, finite(count));
  if (safe < 1000) return safe.toString();
  if (safe < 10000) return (safe / 1000).toFixed(1) + "k";
  if (safe < 1000000) return Math.round(safe / 1000) + "k";
  if (safe < 10000000) return (safe / 1000000).toFixed(1) + "M";
  return Math.round(safe / 1000000) + "M";
}

function shortPath(p: string): string {
  const h = homedir();
  if (p === h) return "~";
  if (h && p.indexOf(h+"/") === 0) return "~"+p.slice(h.length);
  return p;
}

/** Aggregate of LLM usage token/cost buckets (mirrors default footer). */
interface UsageTotals {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
  cost: number;
}

function addUsage(t: UsageTotals, u: any): void {
  if (!u) return;
  const num = (v: unknown): number => (typeof v === "number" && Number.isFinite(v) ? v : 0);
  t.input += num((u as any).input);
  t.output += num((u as any).output);
  t.cacheRead += num((u as any).cacheRead);
  t.cacheWrite += num((u as any).cacheWrite);
  t.cost += num((u as any).cost?.total);
}

/**
 * Cumulative cache-hit ratio + cost over the whole session, computed the same
 * way the default Pi footer does (assistant + toolResult + compaction/summary).
 */
function computeUsageStats(ctx: any): { hitPct: number | null; hasCache: boolean; cost: number } {
  const t: UsageTotals = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, cost: 0 };
  const entries = ctx?.sessionManager?.getEntries?.() ?? ctx?.sessionManager?.getBranch?.() ?? [];
  for (const entry of entries) {
    if (entry?.type === "message") {
      const m = entry.message;
      if (m?.role === "assistant") {
        addUsage(t, m.usage);
      } else if (m?.role === "toolResult" && m?.usage) {
        addUsage(t, m.usage);
      }
    } else if ((entry?.type === "branch_summary" || entry?.type === "compaction") && entry?.usage) {
      addUsage(t, entry.usage);
    }
  }
  const promptTokens = t.input + t.cacheRead + t.cacheWrite;
  const hitPct = promptTokens > 0 ? (t.cacheRead / promptTokens) * 100 : null;
  return { hitPct, hasCache: t.cacheRead > 0 || t.cacheWrite > 0, cost: t.cost };
}

function formatCost(c: number): string {
  if (c <= 0) return "$0";
  return "$" + c.toFixed(3);
}

export default function registerFooter(pi: ExtensionAPI): void {
  let currentSessionManager: any;
  let currentCtx: any = null;
  let tuiRef: any = null;

  // Git state
  let gitBranch = "";
  let gitStaged = 0;
  let gitUnstaged = 0;
  let gitAhead = 0;
  let gitBehind = 0;

  function findGitRoot(cwd: string): string | null {
    let dir = cwd;
    for (;;) {
      if (existsSync(join(dir, ".git"))) return dir;
      const parent = dir.slice(0, dir.lastIndexOf("/")) || "/";
      if (parent === dir) return null;
      dir = parent;
    }
  }

  function refreshGitInfo() {
    if (!currentCtx) return;
    if (!findGitRoot(currentCtx.cwd)) { resetGit(); return; }
    try {
      const result = require("child_process").execSync(
        "git status --short --branch --untracked-files=no",
        { cwd: currentCtx.cwd, encoding: "utf8", timeout: 2000, stdio: ["ignore", "pipe", "pipe"] },
      );
      const lines = (result as string).split("\n").filter(Boolean);
      const header = lines[0]?.startsWith("## ") ? lines[0].slice(3).trim() : "";
      const branchParts = header.split("...");
      gitBranch = branchParts[0]?.trim() || "";
      if (branchParts.length >= 2) {
        const am = branchParts[1]?.match(/ahead\s+(\d+)/);
        const bm = branchParts[1]?.match(/behind\s+(\d+)/);
        gitAhead = am ? parseInt(am[1]) : 0;
        gitBehind = bm ? parseInt(bm[1]) : 0;
      }
      gitStaged = 0; gitUnstaged = 0;
      for (let li=1; li<lines.length; li++) {
        const l = lines[li];
        if (l.length>=2) {
          if (l[0]!==" "&&l[0]!=="?") gitStaged++;
          if (l[1]!==" "&&l[1]!=="?") gitUnstaged++;
        }
      }
    } catch (_e) { resetGit(); }
  }

  function resetGit() {
    gitBranch = ""; gitStaged=0; gitUnstaged=0; gitAhead=0; gitBehind=0;
  }

  pi.on("session_start", function (_event: unknown, ctx: any) {
    currentSessionManager = ctx.sessionManager;
    currentCtx = ctx;
    refreshGitInfo();
    if (ctx.mode !== "tui") return;
    ctx.ui.setFooter(function (tui: any, theme: any, footerData: any) {
      tuiRef = tui;
      footerData.onBranchChange?.(function() { refreshGitInfo(); tui.requestRender(); });
      return {
        render: function (width: number): string[] {
          try {
            if (width <= 0) return [""];

            const pv = ctx.model?.provider || "";
            const mid = ctx.model?.id || "";
            const th = typeof (pi as any).getThinkingLevel === "function" ? (pi as any).getThinkingLevel() : "";
            const cu = ctx.getContextUsage();
            const pctVal = cu?.percent ?? 0;
            const win = (cu?.contextWindow || 0) > 0 ? formatTokens(cu.contextWindow) : "?";

            // Cache-hit ratio + cost, cumulative over the session (same source as
            // the default Pi footer). Shown next to the context usage on this line.
            const usageStats = computeUsageStats(currentCtx);
            const usageSuffixParts: string[] = [];
            if (usageStats.hasCache && usageStats.hitPct !== null) {
              usageSuffixParts.push(theme.fg("syntaxType", "\uf1c0"+usageStats.hitPct.toFixed(1)+"%"));
            }
            if (usageStats.cost > 0) {
              usageSuffixParts.push(theme.fg("syntaxString", formatCost(usageStats.cost)));
            }
            const usageSuffix = usageSuffixParts.length ? " "+usageSuffixParts.join(" ") : "";

            const sessionIcon = "\uf2bd";
            const folderIcon = "\uf4d3";
            const gitIcon = "\uf126";
            const entriesIcon = "\uf0ae";
            const providerIcon = "\uf0ac";
            const modelIcon = "\uf013";
            let left = theme.fg("accent",providerIcon+" "+pv)+" · "+theme.fg("syntaxType",modelIcon+" "+mid);
            if (th && th!=="off") left += " · "+theme.fg("thinkingMedium","\uee9c")+" "+th;

            const right = Math.round(pctVal)+"%/"+win;
            const barW = Math.max(2, width - visibleWidth(left) - visibleWidth(right + usageSuffix) - 5);
            const filled = Math.max(0, Math.min(barW, Math.round(pctVal/100*barW)));
            const barColor = pctVal >= 90 ? "error" : pctVal >= 70 ? "warning" : "syntaxString";
            let top = left+" · ";
            top += theme.fg(barColor, "\u2501".repeat(filled))+theme.fg("dim", "\u2501".repeat(Math.max(0,barW-filled)));
            top += " "+theme.fg(barColor, right)+usageSuffix;

            const sessionName = ctx.sessionManager?.getSessionName?.() || "";
            const entries = ctx.sessionManager?.getBranch?.().length ?? 0;
            const sp = shortPath(ctx.cwd);
            const lastSlash = sp.lastIndexOf("/");
            const dirBase = lastSlash >= 0 ? sp.slice(lastSlash + 1) : sp;
            const dirPrefix = lastSlash >= 0 ? sp.slice(0, lastSlash + 1) : "";
            const cwdPart = dirPrefix ? theme.fg("muted",dirPrefix)+theme.fg("syntaxFunction",dirBase) : theme.fg("syntaxFunction",dirBase);

            let bottom = "";

            // session name
            if (sessionName) bottom += theme.fg("accent",sessionIcon+" "+sessionName) + " · ";

            // cwd
            const dirIcon = "\uf4d3";
            bottom += theme.fg("syntaxFunction",dirIcon)+" "+cwdPart + " · ";

            // git
            if (gitBranch) {
              const gitParts = [theme.fg("accent",gitIcon)+" "+theme.fg("syntaxType",gitBranch)];
              if (gitStaged > 0) gitParts.push(theme.fg("syntaxString","\u25CF"+gitStaged));
              if (gitUnstaged > 0) gitParts.push(theme.fg("warning","\u007E"+gitUnstaged));
              if (gitAhead > 0) gitParts.push(theme.fg("syntaxType","\u2191"+gitAhead));
              if (gitBehind > 0) gitParts.push(theme.fg("warning","\u2193"+gitBehind));
              bottom += gitParts.join(" ") + " · ";
            }

            // entries
            if (entries > 0) {
              const sessionFile = ctx.sessionManager?.getSessionFile?.();
              const persisted = !!sessionFile;
              bottom += theme.fg("syntaxType",entriesIcon+" "+entries)+" "+theme.fg(persisted?"syntaxString":"muted",persisted?"persisted":"ephemeral");
            }

            // ext icons
            const extStatuses = footerData.getExtensionStatuses();
            if (extStatuses && extStatuses.size > 0) {
              const extParts: string[] = [];
              extStatuses.forEach(function(v: string) {
                const s = v.replace(/[\r\n\t]/g," ").replace(/ +/g," ").trim();
                if (s) extParts.push(s);
              });
              if (extParts.length>0) bottom += " · "+extParts.join(" ");
            }
            // Top line always fits (bar flexes to width). Bottom line wraps so
            // extension statuses are not cut off / hidden behind the pane.
            const lines = [truncateToWidth(" "+top, width, "")];
            const wrappedBottom = wrapTextWithAnsi(" "+bottom, Math.max(1, width)).slice(0, 3);
            for (let wi=0; wi<wrappedBottom.length; wi++) lines.push(wrappedBottom[wi]);
            return lines;
          } catch (_e) {
            console.error("[pi-footer]", _e);
            return [""];
          }
        },
        invalidate: function () {},
        dispose: function () {},
      };
    });
  });

  pi.on("session_shutdown", function () {
    currentSessionManager = undefined;
    currentCtx = undefined;
    tuiRef = null;
  });
}
