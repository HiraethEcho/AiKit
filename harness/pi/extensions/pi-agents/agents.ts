import { getAgentDir, parseFrontmatter } from "@earendil-works/pi-coding-agent";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { homedir } from "node:os";

// ── Types ────────────────────────────────────────────────────────────────

export interface AgentConfig {
  name: string;
  description: string;
  model?: string;
  thinking?: string;
  tools?: string[];
  mode?: "primary" | "subagent";
  systemPrompt: string;
  extraFields: Record<string, unknown>;
}

export interface ScopedAgents {
  project: AgentConfig[];
  user: AgentConfig[];
  global: AgentConfig[];
}

// ── File scanning ─────────────────────────────────────────────────────────

/** Scan a directory tree for agent .md files (recursive), returning configs. */
function scanDir(base: string): AgentConfig[] {
  if (!existsSync(base)) return [];
  const results: AgentConfig[] = [];

  const walk = (dir: string): void => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return; // skip unreadable
    }
    for (const entry of entries) {
      const full = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const cfg = loadAgentFile(full);
        if (cfg) results.push(cfg);
      }
    }
  };
  walk(base);
  return results;
}

function loadAgentFile(filePath: string): AgentConfig | null {
  try {
    const content = readFileSync(filePath, "utf-8");
    const { frontmatter, body } = parseFrontmatter<Record<string, unknown>>(content);
    if (!frontmatter?.name) return null;

    const name = String(frontmatter.name);
    const description = frontmatter.description ? String(frontmatter.description) : "";

    // Parse tools: YAML array only
    let tools: string[] | undefined;
    if (Array.isArray(frontmatter.tools)) {
      tools = frontmatter.tools.map(String).map((t: string) => t.trim()).filter(Boolean);
    }

    // Collect extra fields
    const knownKeys = new Set(["name", "description", "tools", "model", "thinking", "mode", "provider"]);
    const extraFields: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(frontmatter)) {
      if (!knownKeys.has(key)) extraFields[key] = value;
    }

    return {
      name,
      description,
      tools,
      model: resolveModel(frontmatter),
      thinking: frontmatter.thinking ? String(frontmatter.thinking) : undefined,
      mode: frontmatter.mode === "primary" ? "primary" : frontmatter.mode === "subagent" ? "subagent" : undefined,
      systemPrompt: body ?? "",
      extraFields,
    };
  } catch {
    return null;
  }
}

// ── Model resolution ──────────────────────────────────────────────────────
// provider: "anthropic" + model: "claude-sonnet-4" → "anthropic/claude-sonnet-4"
// thinking: "high" → "anthropic/claude-sonnet-4:high" (skipped if model already has a ":suffix")
function resolveModel(fm: Record<string, unknown>): string | undefined {
  let model = fm.model ? String(fm.model) : undefined;
  if (!model) return undefined;
  const provider = fm.provider ? String(fm.provider) : undefined;
  if (provider && !model.includes("/")) model = `${provider}/${model}`;
  const thinking = fm.thinking ? String(fm.thinking) : undefined;
  if (thinking && thinking !== "off" && !model.includes(":")) model = `${model}:${thinking}`;
  return model;
}

// ── Discovery ─────────────────────────────────────────────────────────────

// Project scope: cwd/.pi/agents/, cwd/.agents/agents/
function discoverProject(cwd: string): AgentConfig[] {
  const paths = [
    resolve(cwd, ".pi/agents"),
    resolve(cwd, ".agents/agents"),
  ];
  const results: AgentConfig[] = [];
  for (const p of paths) results.push(...scanDir(p));
  return results;
}

// User scope: ~/.pi/agents/
function discoverUser(): AgentConfig[] {
  return scanDir(resolve(homedir(), ".pi/agents"));
}

// Global scope: ~/.pi/agent/agents/*.md, ~/.agents/agents/*.md */
function discoverGlobal(): AgentConfig[] {
  const paths = [
    resolve(homedir(), ".pi/agent/agents"),
    resolve(homedir(), ".agents/agents"),
  ];
  const results: AgentConfig[] = [];
  for (const p of paths) results.push(...scanDir(p));
  return results;
}

/** Discover all agents across scopes, highest priority first. */
export function discoverAgents(cwd: string): AgentConfig[] {
  const seen = new Set<string>();
  const all: AgentConfig[] = [];

  // Project → User → Global (highest priority first)
  for (const agent of [...discoverProject(cwd), ...discoverUser(), ...discoverGlobal()]) {
    if (!seen.has(agent.name)) {
      seen.add(agent.name);
      all.push(agent);
    }
  }
  return all;
}

/** Discover all agents with scope info. */
export function discoverAgentsAll(cwd: string): ScopedAgents {
  return {
    project: discoverProject(cwd),
    user: discoverUser(),
    global: discoverGlobal(),
  };
}

/** Find an agent by name across all scopes. */
export function findAgent(cwd: string, name: string): AgentConfig | undefined {
  return discoverAgents(cwd).find(a => a.name === name);
}

/** Get only roles (mode: primary) across all scopes. */
export function discoverRoles(cwd: string): AgentConfig[] {
  return discoverAgents(cwd).filter(a => a.mode === "primary");
}

/** Fallback: role name doesn't match any agent → use pi default behavior */
export function findRole(cwd: string, name: string): AgentConfig | undefined {
  return discoverRoles(cwd).find(r => r.name === name);
}
