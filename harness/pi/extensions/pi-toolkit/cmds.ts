// ─── cmds: load .agents/commands/*.md as prompt templates ──────
//
// Recursively walks <cwd>/.agents/commands and ~/.agents/commands and
// contributes every .md file as a prompt template — same semantics as
// .pi/prompts (filename = command name; frontmatter args/argument-hint
// supported; nested dirs scanned recursively).
//
// Toggle: /cmds [on|off] — prompts load at session start, so a
// toggle takes effect after /reload or the next session.

import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerToggle } from "./toggle.ts";

const AGENT_COMMANDS_ICON = "\u{F0C8}"; // codicon: terminal

/** Recursively collect .md files under root (symlinked dirs skipped). */
function collectMdFiles(root: string): string[] {
  if (!existsSync(root)) return [];
  const out: string[] = [];
  const walk = (dir: string): void => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.isFile() && entry.name.endsWith(".md")) out.push(p);
    }
  };
  walk(root);
  return out;
}

// ── Registration ───────────────────────────────────────────────────────────

export default function registerAgentCommands(
  pi: ExtensionAPI,
  initialEnabled?: boolean,
) {
  const t = registerToggle(
    pi,
    {
      command: "cmds",
      description:
        "Toggle .agents/commands prompt loading on/off. Usage: /cmds [on|off]",
      configKey: "cmds-config",
      statusKey: "cmds",
      icon: AGENT_COMMANDS_ICON,
      defaultEnabled: true,
      label: "Agent commands",
      suffix: " Run /reload to apply.",
    },
    initialEnabled,
  );

  // Contribute .md files from .agents/commands (project + global) as prompt
  // templates. Runs at startup and on /reload; gated by the toggle state.
  pi.on("resources_discover", (event) => {
    if (!t.isEnabled()) return {};
    const roots = [
      join(event.cwd, ".agents", "commands"),
      join(homedir(), ".agents", "commands"),
    ];
    const promptPaths = roots.flatMap(collectMdFiles);
    return promptPaths.length > 0 ? { promptPaths } : {};
  });
}
