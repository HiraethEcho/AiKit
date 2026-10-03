// ─── terse: three-level output style toggle ──────────────────────────
//
// Injects the `terse` skill's rules into the system prompt for the active
// level. Prompt text is READ FROM the skill file at each injection, so the
// runtime toggle and /skill:terse can never drift apart (the old cave.ts and
// adhd.ts each embedded their own copy, and adhd.ts had silently lost the
// "Pre-send check" section that way).
//
// /terse                 -> toggle off <-> last level (resting: ultra)
// /terse off|normal|ultra -> set and pin a level
//
// off removes the rules from the system prompt entirely: they were never in
// the transcript, so nothing lingers in history.

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { AutocompleteItem } from "@earendil-works/pi-tui";
import { existsSync, readFileSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const TERSE_ICON = "\u{F0E7}";
const CONFIG_KEY = "terse-level";
const STATUS_KEY = "terse";

export type TerseLevel = "off" | "normal" | "ultra";

const LEVELS: readonly TerseLevel[] = ["off", "normal", "ultra"];

/** Level used when bare `/terse` turns terse back on. */
const RESTING: TerseLevel = "ultra";

/**
 * Sections injected for every level, in order. Titles match the `## ` headings
 * in the skill file; the level-specific section is appended from `levelSection`.
 */
const SHARED_SECTIONS = [
  "precedence",
  "levels",
  "never compress",
  "shape",
  "when to break",
  "pre-send check",
];

const LEVEL_SECTIONS: Record<Exclude<TerseLevel, "off">, string> = {
  normal: "normal ",
  ultra: "ultra ",
};

function isTerseLevel(value: unknown): value is TerseLevel {
  return typeof value === "string" && (LEVELS as readonly string[]).includes(value);
}

function skillCandidates(): string[] {
  const home = homedir();
  const fromEnv = process.env.PI_TERSE_SKILL;
  const paths = fromEnv ? [fromEnv] : [];
  paths.push(
    join(home, "AiKit", "modules", "base", "skills", "terse", "SKILL.md"),
    join(process.cwd(), "modules", "base", "skills", "terse", "SKILL.md"),
    join(home, ".pi", "agent", "skills", "terse", "SKILL.md"),
  );
  return paths;
}

/** `## Title` -> section body, keyed by lowercased title. */
function parseSections(markdown: string): Map<string, string> {
  const body = markdown.startsWith("---") ? markdown.split(/^---$/m, 3)[2] ?? markdown : markdown;
  const sections = new Map<string, string>();
  let title: string | null = null;
  let buffer: string[] = [];
  for (const line of body.split("\n")) {
    const heading = /^##\s+(.*)$/.exec(line);
    if (heading) {
      if (title) sections.set(title, buffer.join("\n").trim());
      title = heading[1].trim().toLowerCase();
      buffer = [];
      continue;
    }
    if (title) buffer.push(line);
  }
  if (title) sections.set(title, buffer.join("\n").trim());
  return sections;
}

/** Section titles start with a key phrase; match by prefix. */
function pick(sections: Map<string, string>, key: string): string | undefined {
  for (const [title, text] of sections) {
    if (title.startsWith(key) && text) return `## ${title.replace(/^\w/, (c) => c.toUpperCase())}\n${text}`;
  }
  return undefined;
}

let cache: { path: string; mtimeMs: number; sections: Map<string, string> } | null = null;

function loadSections(): { path: string; sections: Map<string, string> } | null {
  for (const path of skillCandidates()) {
    if (!existsSync(path)) continue;
    let mtimeMs: number;
    try {
      mtimeMs = statSync(path).mtimeMs;
    } catch {
      continue;
    }
    if (cache && cache.path === path && cache.mtimeMs === mtimeMs) {
      return { path, sections: cache.sections };
    }
    let sections: Map<string, string>;
    try {
      sections = parseSections(readFileSync(path, "utf-8"));
    } catch {
      continue;
    }
    cache = { path, mtimeMs, sections };
    return { path, sections };
  }
  return null;
}

/** Assemble the injected prompt for one level, from the skill file. */
export function buildPrompt(level: Exclude<TerseLevel, "off">): string | undefined {
  const loaded = loadSections();
  if (!loaded) return undefined;
  const parts: string[] = [
    `# terse — active (level: ${level})`,
    level === "ultra"
      ? "Rest at ultra for the whole answer. Move one segment up to `normal` only for the clarity"
      + " cases listed under Levels, then return to ultra. Change with /terse off|normal|ultra."
      : "Stay at normal for the whole answer; do not compress prose. Change with"
      + " /terse off|normal|ultra.",
  ];
  for (const key of SHARED_SECTIONS) {
    const section = pick(loaded.sections, key);
    if (section) parts.push(section);
  }
  const levelSection = pick(loaded.sections, LEVEL_SECTIONS[level]);
  if (levelSection) parts.push(levelSection);
  if (parts.length <= 2) return undefined;
  return parts.join("\n\n");
}

export default function registerTerse(pi: ExtensionAPI, initialLevel?: TerseLevel) {
  // A typo in settings.json `toolkit.terse` must not silently disable injection.
  let level: TerseLevel = isTerseLevel(initialLevel) ? initialLevel : RESTING;
  let lastLevel: Exclude<TerseLevel, "off"> = RESTING;
  let activeUi: any = null;
  let missingWarned = false;

  function updateStatus(): void {
    activeUi?.setStatus(STATUS_KEY, level === "off" ? undefined : `${TERSE_ICON} ${level}`);
  }

  function persist(): void {
    pi.appendEntry(CONFIG_KEY, { level });
  }

  function apply(next: TerseLevel, ctx: ExtensionContext): void {
    level = next;
    if (next !== "off") lastLevel = next;
    persist();
    updateStatus();
    ctx.ui.notify(`terse: ${next}`, "info");
  }

  function restoreFromBranch(ctx: ExtensionContext): void {
    const branch = ctx.sessionManager?.getBranch?.() ?? [];
    for (const entry of branch) {
      if (entry.type !== "custom" || entry.customType !== CONFIG_KEY) continue;
      const data = entry.data as { level?: unknown } | undefined;
      if (data && isTerseLevel(data.level)) {
        level = data.level;
        if (level !== "off") lastLevel = level;
      }
    }
  }

  pi.registerCommand("terse", {
    description: "Output style level. Usage: /terse [off|normal|ultra]",
    getArgumentCompletions(argumentPrefix: string): AutocompleteItem[] | null {
      const p = (argumentPrefix ?? "").trim().toLowerCase();
      const items: AutocompleteItem[] = [];
      for (const value of LEVELS) {
        if (!p || value.startsWith(p)) {
          const hint =
            value === "off" ? "no injection" : value === "normal" ? "STE100, explicit sentences" : "maximum compression";
          items.push({ value, label: value, description: `terse: ${hint}` });
        }
      }
      return items.length > 0 ? items : null;
    },
    handler: async (args, ctx) => {
      const arg = (args ?? "").trim().toLowerCase();
      if (!arg) {
        apply(level === "off" ? lastLevel : "off", ctx);
        return;
      }
      if (!isTerseLevel(arg)) {
        ctx.ui.notify("Usage: /terse [off|normal|ultra]", "warning");
        return;
      }
      apply(arg, ctx);
    },
  });

  pi.on("session_start", async (_event, ctx) => {
    activeUi = ctx.ui;
    restoreFromBranch(ctx);
    updateStatus();
  });

  pi.on("session_tree", async (_event, ctx) => {
    restoreFromBranch(ctx);
    updateStatus();
  });

  pi.on("before_agent_start", async (event) => {
    if (level === "off") return undefined;
    const prompt = buildPrompt(level);
    if (!prompt) {
      if (!missingWarned && activeUi) {
        activeUi.notify(`terse: skill file not found (checked ${skillCandidates()[0]}). Set PI_TERSE_SKILL=/path/to/SKILL.md`, "warning");
        missingWarned = true;
      }
      return undefined;
    }
    missingWarned = false;
    return { systemPrompt: `${prompt}\n\n${event.systemPrompt ?? ""}` };
  });
}
