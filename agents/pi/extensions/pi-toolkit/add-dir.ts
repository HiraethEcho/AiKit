// ─── add-dir: add external directories with context injection ───────────────
//
// Trimmed: no suggestions engine, no widget auto-reload, no search_external_files tool.

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { AutocompleteItem } from "@earendil-works/pi-tui";
import * as fs from "node:fs";
import * as path from "node:path";
import { homedir } from "node:os";

function expandHome(p: string): string {
  if (p.startsWith("~/")) return homedir() + p.slice(1);
  if (p === "~" || p === "~/") return homedir();
  return p;
}

function resolveDirPath(input: string, cwd: string): string {
  const expanded = expandHome(input);
  return path.isAbsolute(expanded) ? expanded : path.resolve(cwd, expanded);
}
interface AddedDir {
  absolutePath: string;
	label: string;
}

interface DirContext {
  agentsMd: string | null;
  claudeMd: string | null;
  skillNames: string[];
}

const SKILL_DIRS = [".pi/skills", ".agents/skills", ".claude/skills"];

function dirExists(dir: string): boolean {
  try { return fs.statSync(dir).isDirectory(); } catch { return false; }
}

function readFileSafe(filePath: string): string | null {
  try { return fs.readFileSync(filePath, "utf-8"); } catch { return null; }
}

function scanDirContext(dir: string): DirContext {
  const ctx: DirContext = { agentsMd: null, claudeMd: null, skillNames: [] };

  for (const name of ["AGENTS.md", "CLAUDE.md"]) {
    const content = readFileSafe(path.join(dir, name)) || readFileSafe(path.join(dir, ".pi", name));
    if (name === "AGENTS.md" && content) ctx.agentsMd = content;
    if (name === "CLAUDE.md" && content) ctx.claudeMd = content;
  }

  for (const skillDir of SKILL_DIRS) {
    const fullDir = path.join(dir, skillDir);
    if (!dirExists(fullDir)) continue;
    try {
      const entries = fs.readdirSync(fullDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && readFileSafe(path.join(fullDir, entry.name, "SKILL.md"))) {
          ctx.skillNames.push(entry.name);
        }
      }
    } catch {}
  }

  return ctx;
}

function summarizeDirContext(ctx: DirContext): string[] {
  const found: string[] = [];
  if (ctx.agentsMd) found.push("AGENTS.md");
  if (ctx.claudeMd) found.push("CLAUDE.md");
  if (ctx.skillNames.length > 0) found.push(`${ctx.skillNames.length} skill(s)`);
  return found;
}

// ponytail: cap per-dir context injection so a giant AGENTS.md cannot blow up the system prompt
const MAX_CONTEXT_BYTES = 4000;

function truncateContext(content: string, limit: number): string {
  return content.length <= limit ? content : content.slice(0, limit) + "\n\n… (truncated, see file for full content)";
}

function buildContextInjection(dirs: AddedDir[]): string {
  if (dirs.length === 0) return "";
  const sections: string[] = [];
  sections.push("\n\n## External Directories (added via pi-toolkit)");
  sections.push(`\nThe following ${dirs.length} external director${dirs.length === 1 ? "y is" : "ies are"} included. You can read/edit/write files using absolute paths.\n`);

  for (const dir of dirs) {
    const ctx = scanDirContext(dir.absolutePath);
    sections.push(`### ${dir.label} — \`${dir.absolutePath}\``);
    if (ctx.agentsMd) sections.push(`\n#### AGENTS.md\n${truncateContext(ctx.agentsMd, MAX_CONTEXT_BYTES)}`);
    if (ctx.claudeMd) sections.push(`\n#### CLAUDE.md\n${truncateContext(ctx.claudeMd, MAX_CONTEXT_BYTES)}`);
    if (ctx.skillNames.length > 0) {
      sections.push(`\n#### Skills: ${ctx.skillNames.join(", ")} — use /skill:name`);
    }
  }

  return sections.join("\n");
}
export default function registerAddDir(pi: ExtensionAPI) {
  let addedDirs: AddedDir[] = [];
  let ctxCache: { dirs: string; injection: string } | null = null;
  let activeUi: any = null; // For footer status updates
  const FOLDER_ICON = "\uf4d3"; // NerdFont folder icon
  function invalidateCache(): void { ctxCache = null; }

  function updateStatus(): void {
    if (!activeUi) return;
    if (addedDirs.length === 0) {
      activeUi.setStatus("add-dir", undefined);
    } else {
      const labels = addedDirs.map(d => d.label).join(", ");
      activeUi.setStatus("add-dir", `${FOLDER_ICON} ${labels}`);
    }
  }

  function getInjection(): string {
    if (addedDirs.length === 0) return "";
    const key = addedDirs.map(d => d.absolutePath).sort().join("\0");
    if (ctxCache && ctxCache.dirs === key) return ctxCache.injection;
    const injection = buildContextInjection(addedDirs);
    ctxCache = { dirs: key, injection };
    return injection;
  }

  function addDir(dirPath: string, cwd: string): { ok: boolean; message: string } {
    const absolutePath = resolveDirPath(dirPath, cwd);
    if (!dirExists(absolutePath)) return { ok: false, message: `Directory does not exist: ${absolutePath}` };
    if (addedDirs.some(d => d.absolutePath === absolutePath)) return { ok: false, message: `Already added: ${absolutePath}` };

    const label = path.basename(absolutePath);
    addedDirs.push({ absolutePath, label });
    invalidateCache();
    updateStatus();

    const ctx = scanDirContext(absolutePath);
    const found = summarizeDirContext(ctx);
    const foundStr = found.length > 0 ? ` Found: ${found.join(", ")}.` : " No context files found.";
    return { ok: true, message: `Added ${label} (${absolutePath}).${foundStr}` };
  }

  function removeDir(absolutePath: string): { ok: boolean; message: string } {
    const idx = addedDirs.findIndex(d => d.absolutePath === absolutePath);
    if (idx === -1) return { ok: false, message: `Not found: ${absolutePath}` };
    const removed = addedDirs.splice(idx, 1)[0];
    invalidateCache();
    updateStatus();
    return { ok: true, message: `Removed ${removed.label} (${removed.absolutePath}).` };
  }

  // ─── System prompt injection ────────────────────────────────────────────────
  pi.on("before_agent_start", async (event) => {
    if (addedDirs.length === 0) return;
    return { systemPrompt: event.systemPrompt + getInjection() };
  });

  // ─── Session lifecycle ─────────────────────────────────────────────────────
  pi.on("session_start", async (_event: any, ctx: any) => {
    activeUi = ctx.ui;
    updateStatus();
  });


  // ─── Commands ───────────────────────────────────────────────────────────────
  pi.registerCommand("add-dir", {
    description: "Add an external directory to this session",
    handler: async (args, ctx) => {
      const input = args?.trim();
      if (!input) { ctx.ui.notify("Usage: /add-dir <path>", "warning"); return; }
      const result = addDir(input, ctx.cwd);
      ctx.ui.notify(result.message, result.ok ? "info" : "error");
    },
  });

  pi.registerCommand("remove-dir", {
    description: "Remove an external directory from this session",
    getArgumentCompletions(argumentPrefix: string): AutocompleteItem[] | null {
      if (addedDirs.length === 0) return null;
      const p = argumentPrefix.trim().toLowerCase();
      const items: AutocompleteItem[] = [];
      for (const d of addedDirs) {
        if (!p || d.label.toLowerCase().startsWith(p)) {
          items.push({ value: d.label, label: d.label, description: d.absolutePath });
        }
      }
      return items.length > 0 ? items : null;
    },
    handler: async (args, ctx) => {
      if (addedDirs.length === 0) { ctx.ui.notify("No external directories added.", "info"); return; }
      const input = args?.trim();
      if (input) {
        const absolutePath = resolveDirPath(input, ctx.cwd);
        const dir = addedDirs.find(d => d.absolutePath === absolutePath || d.label === input);
        if (!dir) { ctx.ui.notify(`Not found: ${input}`, "error"); return; }
        const result = removeDir(dir.absolutePath);
        ctx.ui.notify(result.message, result.ok ? "info" : "error");
      } else {
        const choices = addedDirs.map(d => `${d.label} — ${d.absolutePath}`);
        const selected = await ctx.ui.select("Remove which directory?", choices);
        if (!selected) return;
        const idx = choices.indexOf(selected);
        if (idx >= 0) {
          const result = removeDir(addedDirs[idx].absolutePath);
          ctx.ui.notify(result.message, "info");
        }
      }
    },
  });

  pi.registerCommand("dirs", {
    description: "List all external directories in this session",
    handler: async (_args, ctx) => {
      if (addedDirs.length === 0) { ctx.ui.notify("No external directories added. Use /add-dir <path> to add one.", "info"); return; }
      const lines: string[] = [`External directories (${addedDirs.length}):\n`];
      for (const dir of addedDirs) {
        const dirCtx = scanDirContext(dir.absolutePath);
        const badges = summarizeDirContext(dirCtx);
        lines.push(`  ${dir.label}`);
        lines.push(`     ${dir.absolutePath}`);
        if (badges.length > 0) lines.push(`     Found: ${badges.join(", ")}`);
        lines.push("");
      }
      ctx.ui.notify(lines.join("\n"), "info");
    },
  });
}
