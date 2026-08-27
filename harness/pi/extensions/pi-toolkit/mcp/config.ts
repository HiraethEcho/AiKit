// ─── Multi-path config loader ──────────────────────────────────────────────────

// Precedence (lower index = higher priority):
//   1. ./.pi/mcp.json        (project pi override)
//   2. ./.agents/mcp.json    (project agents override)
//   3. ~/.pi/agent/mcp.json  (user pi config)
//   4. ~/.agents/mcp.json    (user agents config)

import { readFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import type { McpConfig } from "./types.ts";

function userConfigPaths(): string[] {
  const home = homedir();
  return [
    join(home, ".pi", "agent", "mcp.json"),
    join(home, ".agents", "mcp.json"),
  ];
}

function projectConfigPaths(cwd: string): string[] {
  return [
    join(cwd, ".pi", "mcp.json"),
    join(cwd, ".agents", "mcp.json"),
  ];
}

function readJsonSafe(p: string): McpConfig | null {
  try {
    if (!existsSync(p)) return null;
    const raw = JSON.parse(readFileSync(p, "utf-8")) as Partial<McpConfig>;
    if (raw?.mcpServers && typeof raw.mcpServers === "object") {
      return { mcpServers: raw.mcpServers };
    }
  } catch { /* corrupt file, skip */ }
  return null;
}

/** Merge keys from `src` into `target`; `src` wins on conflicts. */
function mergeConfig(target: McpConfig, src: McpConfig): McpConfig {
  for (const [name, cfg] of Object.entries(src.mcpServers)) {
    if (cfg !== undefined) {
      target.mcpServers[name] = cfg;
    }
  }
  return target;
}

/** Load user-wide configs (lower priority). */
function loadUserConfigs(): McpConfig {
  const result: McpConfig = { mcpServers: {} };
  // Iterate reverse so first path wins on conflict (but user configs are
  // lower priority than project configs overall).
  for (const p of userConfigPaths().reverse()) {
    const cfg = readJsonSafe(p);
    if (cfg) mergeConfig(result, cfg);
  }
  return result;
}

/** Load all configs and merge with correct precedence. */
export function loadConfig(cwd?: string): McpConfig {
  const resolvedCwd = cwd ?? process.cwd();
  // ── Load base: user configs (lowest priority) ──
  const merged: McpConfig = { mcpServers: {} };
  const userCfg = loadUserConfigs();
  mergeConfig(merged, userCfg);

  // ── Overlay project configs (each path may exist independently) ──
  for (const p of projectConfigPaths(resolvedCwd)) {
    const cfg = readJsonSafe(p);
    if (cfg) mergeConfig(merged, cfg);
  }

  // ── Normalize enabled state (migrate old userDisabled, default true) ──
  for (const [name, cfg] of Object.entries(merged.mcpServers)) {
    if (cfg && typeof cfg === "object") {
      const c = cfg as any;
      if ("userDisabled" in c) {
        c.enabled = !c.userDisabled;
        delete c.userDisabled;
      }
      if (!("enabled" in c)) {
        c.enabled = true;
      }
    }
  }

  return merged;
}

