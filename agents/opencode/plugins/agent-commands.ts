import type { Plugin } from "@opencode-ai/plugin";
import { readdirSync, readFileSync, existsSync } from "fs";
import { join, resolve } from "path";
import { homedir } from "os";

const ALLOWED_FM = new Set([
  "description",
  "agent",
  "model",
  "variant",
  "subtask",
]);

function parseCmd(file: string): Record<string, any> {
  const content = readFileSync(file, "utf-8").trimStart();

  if (content.startsWith("---")) {
    const end = content.indexOf("---", 3);
    if (end !== -1) {
      const raw = content.slice(3, end).trim();
      const body = content.slice(end + 3).trim();
      const fm: Record<string, any> = {};
      for (const line of raw.split("\n")) {
        const m = line.match(/^(\w+):\s*(.*)$/);
        if (m && ALLOWED_FM.has(m[1])) {
          let v: any = m[2].trim();
          if (v === "true") v = true;
          else if (v === "false") v = false;
          fm[m[1]] = v;
        }
      }
      return { template: body, ...fm };
    }
  }

  const desc = content.match(/^#\s+(.+)/m)?.[1]?.trim();
  return { template: content, ...(desc ? { description: desc } : {}) };
}

function loadDir(dir: string): Record<string, any> {
  const cmds: Record<string, any> = {};
  if (!existsSync(dir)) return cmds;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".md")) continue;
    cmds[f.replace(/\.md$/, "")] = parseCmd(join(dir, f));
  }
  return cmds;
}

export const AgentCommandsPlugin: Plugin = async (_input) => {
  return {
    config: async (cfg: any) => {
      const global = loadDir(resolve(homedir(), ".agents", "commands"));
      const local = loadDir(resolve(process.cwd(), ".agents", "commands"));
      cfg.command = { ...cfg.command, ...global, ...local };
    },
  };
};
