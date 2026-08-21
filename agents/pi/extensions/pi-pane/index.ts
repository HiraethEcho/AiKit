// ── pi-pane entry ───────────────────────────────────────────────────

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { truncateToWidth, visibleWidth } from "@earendil-works/pi-tui";
import { createPaneController, type PaneSnapshot, type WorksData } from "./pane";
import { formatTokens } from "./metrics";
import type { RunActivityTracker } from "./run-activity";
import { createRunActivityTracker, EMPTY_RUN_ACTIVITY } from "./run-activity";

export default function piPaneExtension(pi: ExtensionAPI): void {
  let pane: any = undefined;
  let currentCtx: ExtensionContext | undefined;
  let currentSessionManager: any;
  let lifecycleGeneration = 0;

  // State
  let branch       = "";
  let runActivityTracker: RunActivityTracker | undefined;
  // Git details
  let gitStaged   = 0;
  let gitUnstaged = 0;
  let gitAhead    = 0;
  let gitBehind   = 0;
  // Usage metrics (for CONTEXT panel)
  let usageAvailable  = false;
  let costAvailable   = false;
  let inputTokens     = 0;
  let outputTokens    = 0;
  let cacheRead       = 0;
  let cacheWrite      = 0;
  let cacheHitPercent: number | undefined;
  let cost            = 0;
  let contextWindow   = 0;
  // Category estimates (content-based, chars/4)
  let systemTokens    = 0;
  let userTokens      = 0;
  let toolTokens      = 0;
  let thinkTokens     = 0;
  let compactTokens   = 0;
  let assistantTokens = 0;
  // Extension statuses
  let extensionStatuses: string[] = [];
  // Works data
  let worksData: WorksData | null = null;

  function getCurrentCtx(ctx: ExtensionContext | undefined) {
    if (!ctx || !currentCtx || !currentSessionManager) return undefined;
    if (ctx.sessionManager !== currentSessionManager) return undefined;
    return { ctx: currentCtx, pane: pane };
  }

  function getSnapshot(): PaneSnapshot {
    const proj = currentCtx ? (currentCtx.cwd.split("/").pop() || currentCtx.cwd) : "";
    const sessionFile = currentCtx ? currentCtx.sessionManager.getSessionFile() : undefined;
    return {
      projectName: proj,
      cwd: currentCtx ? currentCtx.cwd : "",
      sessionName: currentCtx ? (currentCtx.sessionManager.getSessionName() || "") : "",
      branch: branch,
      gitStaged: gitStaged, gitUnstaged: gitUnstaged,
      gitAhead: gitAhead, gitBehind: gitBehind,
      branchEntryCount: currentCtx ? currentCtx.sessionManager.getBranch().length : 0,
      persisted: !!sessionFile,
      runActivity: runActivityTracker?.getSnapshot() || EMPTY_RUN_ACTIVITY,
      usageAvailable: usageAvailable,
      costAvailable: costAvailable,
      inputTokens: inputTokens,
      outputTokens: outputTokens,
      cacheRead: cacheRead,
      cacheWrite: cacheWrite,
      cacheHitPercent: cacheHitPercent,
      cost: cost,
      contextWindow: contextWindow,
      systemTokens: systemTokens,
      userTokens: userTokens,
      toolTokens: toolTokens,
      thinkTokens: thinkTokens,
      compactTokens: compactTokens,
      assistantTokens: assistantTokens,
      extensionStatuses: extensionStatuses,
      worksData: worksData,
    };
  }

  // Refresh git status from cwd
  function refreshGitInfo() {
    if (!currentCtx) return;
    try {
      const result = require("child_process").execSync(
        "git status --short --branch --untracked-files=no",
        { cwd: currentCtx.cwd, encoding: "utf8", timeout: 2000 },
      );
      const lines = (result as string).split("\n").filter(Boolean);
      const header = lines[0]?.startsWith("## ") ? lines[0].slice(3).trim() : "";
      const branchParts = header.split("...");
      branch = branchParts[0]?.trim() || "";
      if (branchParts.length >= 2) {
        const ab = branchParts[1]?.match(/ahead\s+(\d+)/);
        const bb = branchParts[1]?.match(/behind\s+(\d+)/);
        gitAhead = ab ? parseInt(ab[1]) : 0;
        gitBehind = bb ? parseInt(bb[1]) : 0;
      }
      gitStaged = 0; gitUnstaged = 0;
      for (let li=1; li<lines.length; li++) {
        const l = lines[li];
        if (l.length>=2) {
          if (l[0]!==" "&&l[0]!=="?") gitStaged++;
          if (l[1]!==" "&&l[1]!=="?") gitUnstaged++;
        }
      }
    } catch (_e) { branch = ""; gitStaged=0; gitUnstaged=0; gitAhead=0; gitBehind=0; }
  }

// Content block parser for token category estimation
function processContentBlocks(content: any): { text: number; tool: number; think: number } {
  let text = 0, tool = 0, think = 0;
  if (typeof content === "string") {
    text += Math.ceil(content.length / 4);
    return { text, tool, think };
  }
  if (!Array.isArray(content)) return { text, tool, think };
  for (let bi = 0; bi < content.length; bi++) {
    const block = content[bi];
    if (!block || !block.type) continue;
    if (block.type === "text") {
      text += Math.ceil((block.text || "").length / 4);
    } else if (block.type === "tool_use") {
      const args = block.input || block.arguments || {};
      tool += Math.ceil(JSON.stringify(args).length / 4);
    } else if (block.type === "tool_result") {
      const tc = block.content;
      if (typeof tc === "string") {
        tool += Math.ceil(tc.length / 4);
      } else if (Array.isArray(tc)) {
        for (let ci = 0; ci < tc.length; ci++) {
          if (tc[ci].type === "text") tool += Math.ceil((tc[ci].text || "").length / 4);
        }
      }
    } else if (block.type === "thinking") {
      think += Math.ceil((block.thinking || block.content || "").length / 4);
    }
  }
  return { text, tool, think };
}

// Refresh usage metrics from session entries
  function refreshUsage() {
    if (!currentCtx) return;
    try {
      const entries = currentCtx.sessionManager.getEntries();
      let uIn = 0, uOut = 0, uCR = 0, uCW = 0, uCost = 0, uAvail = false, cAvail = false, uCHP: number|undefined;
      let catSys = 0, catUser = 0, catTool = 0, catThink = 0, catCompact = 0, catAssistant = 0;

      // System prompt (from API, stable per session)
      try { const sp = currentCtx.getSystemPrompt(); if (sp) catSys += Math.ceil(sp.length / 4); } catch (_e) {}

      for (let ei=0; ei<entries.length; ei++) {
        const e = entries[ei];
        if (e.type==="message" && e.message.role==="assistant") {
          // API usage (may not exist for all messages)
          if (e.message.usage) {
            const u = e.message.usage;
            if (typeof u.input==="number" && Number.isFinite(u.input) &&
                typeof u.output==="number" && Number.isFinite(u.output) &&
                typeof u.cacheRead==="number" && Number.isFinite(u.cacheRead) &&
                typeof u.cacheWrite==="number" && Number.isFinite(u.cacheWrite)) {
              uAvail = true;
              uIn += u.input;
              uOut += u.output;
              uCR += u.cacheRead;
              uCW += u.cacheWrite;
              if (typeof u.cost?.total==="number" && Number.isFinite(u.cost.total)) {
                cAvail = true;
                uCost += u.cost.total;
              }
              const prompt = u.input + u.cacheRead + u.cacheWrite;
              uCHP = prompt > 0 ? (u.cacheRead / prompt) * 100 : undefined;
            }
          }
          // Content analysis (always — doesn't depend on usage)
          const ac = processContentBlocks(e.message.content);
          catAssistant += ac.text; catTool += ac.tool; catThink += ac.think;
        } else if (e.type==="message" && e.message.role==="user") {
          const uc = processContentBlocks(e.message.content);
          catUser += uc.text; catTool += uc.tool;
        } else if (e.type==="message" && e.message.role==="system") {
          const sc = processContentBlocks(e.message.content);
          catSys += sc.text;
        } else if (e.type==="message" && (e.message.role==="tool" || e.message.role==="toolResult")) {
          const tc = processContentBlocks(e.message.content);
          catTool += tc.text + tc.tool;
        } else if (e.type==="message") {
          // Catch-all for any other message role (count as system)
          const oc = processContentBlocks(e.message.content);
          catSys += oc.text + oc.tool;
        } else if (e.type==="compaction" || e.type==="branch_summary") {
          const s = (e as any).summary || "";
          if (s) catCompact += Math.ceil(s.length / 4);
        }
      }

      inputTokens = uIn; outputTokens = uOut; cacheRead = uCR; cacheWrite = uCW;
      cost = uCost; usageAvailable = uAvail; costAvailable = cAvail;
      cacheHitPercent = uCHP;
      systemTokens = catSys; userTokens = catUser; toolTokens = catTool;
      thinkTokens = catThink; compactTokens = catCompact; assistantTokens = catAssistant;
      try { const cu = currentCtx.getContextUsage(); if (cu) contextWindow = cu.contextWindow ?? 0; } catch (_e) {}
    } catch (_e) {}
  }

  // Register /pane command
  pi.registerCommand("pane", {
    description: "Toggle pane. /pane on, /pane off",
    handler: async function (args: string, ctx: ExtensionContext) {
      if (ctx.mode !== "tui") { ctx.ui.notify("Pane requires TUI mode", "warning"); return; }
      const t = args.trim().toLowerCase();
      if (t === "on") { if (pane) pane.show(); }
      else if (t === "off") { if (pane) pane.hide(); }
      else if (t === "") { if (pane) pane.toggle(); }
      else { ctx.ui.notify("Usage: /pane [on|off]", "warning"); }
    },
  });

  // Lifecycle
  pi.on("session_start", function (_event: any, ctx: ExtensionContext) {
    const gen = ++lifecycleGeneration;
    if (ctx.mode !== "tui") return;

    refreshGitInfo();
    refreshUsage();

    runActivityTracker = createRunActivityTracker({ cwd: ctx.cwd });


    const local = createPaneController({
      ctx: ctx,
      getSnapshot: getSnapshot,
      onWarning: function (m: string) { ctx.ui.notify(m, "warning"); },
      onError: function (e: unknown) {
        ctx.ui.notify("Pane: " + (e instanceof Error ? e.message : String(e)), "error");
      },
    });

    if (gen !== lifecycleGeneration) { local.dispose(); return; }
    if (pane) pane.dispose();
    pane = local;
    currentCtx = ctx;
    currentSessionManager = ctx.sessionManager;
  });

  pi.on("agent_start", function (_event: any, ctx: ExtensionContext) {
    if (!ctx || !currentSessionManager || ctx.sessionManager !== currentSessionManager) return;
    if (runActivityTracker) runActivityTracker.startRun();
    refreshUsage();
  });

  pi.on("turn_start", function (event: any, ctx: ExtensionContext) {
    if (!ctx || !currentSessionManager || ctx.sessionManager !== currentSessionManager) return;
    if (runActivityTracker) runActivityTracker.startTurn(event.turnIndex);
  });

  pi.on("tool_execution_start", function (event: any, ctx: ExtensionContext) {
    if (!ctx || !currentSessionManager || ctx.sessionManager !== currentSessionManager) return;
    if (runActivityTracker) runActivityTracker.startTool(event as any);
  });

  pi.on("tool_execution_end", function (event: any, ctx: ExtensionContext) {
    if (!ctx || !currentSessionManager || ctx.sessionManager !== currentSessionManager) return;
    if (runActivityTracker) runActivityTracker.finishTool(event as any);
  });

  pi.on("agent_settled", function (_event: any, ctx: ExtensionContext) {
    if (!ctx || !currentSessionManager || ctx.sessionManager !== currentSessionManager) return;
    if (runActivityTracker) runActivityTracker.settle();
    if (pane) pane.requestRender();
  });

  pi.on("turn_end", function (_event: any, ctx: ExtensionContext) {
    if (!ctx || !currentSessionManager || ctx.sessionManager !== currentSessionManager) return;
    refreshGitInfo();
    refreshUsage();
    if (pane) pane.requestRender();
  });

  // pi-work todo integration (WORKS panel)
  pi.on("todo:state", function (event: any, ctx: ExtensionContext) {
    if (!ctx || !currentSessionManager || ctx.sessionManager !== currentSessionManager) return;
    if (event && event.columns) {
      worksData = { columns: event.columns };
    } else {
      worksData = null;
    }
    if (pane) pane.requestRender();
  });

  pi.on("session_shutdown", function (_event: any, ctx: ExtensionContext) {
    if (!ctx || !currentSessionManager || ctx.sessionManager !== currentSessionManager) return;
    lifecycleGeneration = lifecycleGeneration + 1;
    if (pane) pane.dispose();
    pane = undefined; currentCtx = undefined; currentSessionManager = undefined;
    if (runActivityTracker) runActivityTracker.reset();
    runActivityTracker = undefined;
    worksData = null;
  });
}
