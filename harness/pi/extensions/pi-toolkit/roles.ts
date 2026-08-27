// ─── roles: custom system-prompt / model / thinking via named roles ──────
//
// Roles come from two sources, JSON wins over .md on name collision:
//   1. settings.json (project + global) → `agent.<name>` with `mode: "primary"`
//   2. <cwd>/.pi/agents + <cwd>/.agents/agents → recursive *.md scan, frontmatter
//      `mode: primary`, body = system prompt (opencode main-agent compat)
//
// `/role` lists roles, `/role <name>` switches the active role for this session.
// `defaultRole` seeds fresh sessions only. The role system prompt fully replaces
// Pi's default; model/thinking are applied once on switch/start.

import type {
	ExtensionAPI,
	ExtensionCommandContext,
	ExtensionContext,
} from "@earendil-works/pi-coding-agent";
import { parseFrontmatter } from "@earendil-works/pi-coding-agent";
import type { AutocompleteItem } from "@earendil-works/pi-tui";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import type { PiToolkitConfig } from "./config.ts";

type ThinkingLevel = "off" | "minimal" | "low" | "medium" | "high" | "xhigh";

interface Role {
	name: string;
	description?: string;
	model?: string;
	thinking?: ThinkingLevel;
	systemPrompt: string;
	source: "json" | "md";
}

const THINKING_LEVELS: readonly ThinkingLevel[] = [
	"off", "minimal", "low", "medium", "high", "xhigh",
];

function asThinking(v: unknown): ThinkingLevel | undefined {
	if (typeof v !== "string") return undefined;
	const s = v.trim().toLowerCase();
	return (THINKING_LEVELS as readonly string[]).includes(s) ? (s as ThinkingLevel) : undefined;
}

// ── Discovery ─────────────────────────────────────────────────────────────

function discoverJsonRoles(cfg: PiToolkitConfig): Role[] {
	const out: Role[] = [];
	for (const [name, entry] of Object.entries(cfg.agent ?? {})) {
		if (!entry || entry.mode !== "primary") continue;
		out.push({
			name,
			description: entry.description,
			model: entry.model,
			thinking: asThinking(entry.thinking),
			systemPrompt: entry.prompt ?? "",
			source: "json",
		});
	}
	return out;
}

function loadMdRole(filePath: string): Role | null {
	try {
		const content = readFileSync(filePath, "utf-8");
		const { frontmatter, body } = parseFrontmatter<Record<string, unknown>>(content);
		if (frontmatter.mode !== "primary") return null;
		if (typeof frontmatter.name !== "string" || !frontmatter.name) return null;
		return {
			name: frontmatter.name,
			description: typeof frontmatter.description === "string" ? frontmatter.description : undefined,
			model: typeof frontmatter.model === "string" ? frontmatter.model : undefined,
			thinking: asThinking(frontmatter.thinking),
			systemPrompt: body ?? "",
			source: "md",
		};
	} catch {
		return null;
	}
}

/** Recursively collect `mode: primary` roles from a directory tree. */
function scanDir(base: string): Role[] {
	if (!existsSync(base)) return [];
	const out: Role[] = [];
	const walk = (dir: string): void => {
		let entries;
		try {
			entries = readdirSync(dir, { withFileTypes: true });
		} catch {
			return;
		}
		for (const e of entries) {
			const full = join(dir, e.name);
			if (e.isDirectory()) walk(full);
			else if (e.isFile() && e.name.endsWith(".md")) {
				const r = loadMdRole(full);
				if (r) out.push(r);
			}
		}
	};
	walk(base);
	return out;
}

function discoverMdRoles(cwd: string): Role[] {
	const roots = [resolve(cwd, ".pi/agents"), resolve(cwd, ".agents/agents")];
	return roots.flatMap(scanDir);
}

export function discoverRoles(cwd: string, cfg: PiToolkitConfig): Role[] {
	const seen = new Set<string>();
	const out: Role[] = [];
	// JSON first (wins), then md (skips shadowed names).
	for (const r of [...discoverJsonRoles(cfg), ...discoverMdRoles(cwd)]) {
		if (!seen.has(r.name)) {
			seen.add(r.name);
			out.push(r);
		}
	}
	return out;
}

// ── Model resolution ──────────────────────────────────────────────────────

function parseModelId(raw: string): { provider?: string; id: string } {
	const idx = raw.indexOf("/");
	if (idx <= 0 || idx === raw.length - 1) return { id: raw };
	return { provider: raw.slice(0, idx), id: raw.slice(idx + 1) };
}

function findModelInRegistry(
	registry: ExtensionContext["modelRegistry"],
	raw: string,
): { model?: ReturnType<ExtensionContext["modelRegistry"]["find"]>; ambiguous: boolean } {
	const { provider, id } = parseModelId(raw);
	if (provider) return { model: registry.find(provider, id), ambiguous: false };
	const matches = registry.getAll().filter((m) => m.id === id);
	return { model: matches[0], ambiguous: matches.length > 1 };
}

// ── Runtime state ─────────────────────────────────────────────────────────

let activeRole: Role | null = null;
let currentCwd = process.cwd();

function setStatus(ctx: Pick<ExtensionContext, "ui">): void {
	ctx.ui.setStatus("role", activeRole ? activeRole.name : undefined);
}

async function applyRole(
	pi: ExtensionAPI,
	ctx: ExtensionContext,
	role: Role,
): Promise<string[]> {
	const warnings: string[] = [];
	if (role.model) {
		const lookup = findModelInRegistry(ctx.modelRegistry, role.model);
		if (!lookup.model) {
			warnings.push(`Model "${role.model}" not found. Keeping current model.`);
		} else if (lookup.ambiguous) {
			warnings.push(
				`Model id "${role.model}" matches multiple providers; using "${lookup.model.provider}/${lookup.model.id}".`,
			);
		}
		if (lookup.model) {
			const ok = await pi.setModel(lookup.model);
			if (!ok) {
				warnings.push(
					`Model "${lookup.model.provider}/${lookup.model.id}" has no API key. Keeping current model.`,
				);
			}
		}
	}
	if (role.thinking) pi.setThinkingLevel(role.thinking);
	activeRole = role;
	setStatus(ctx);
	return warnings;
}

// ── Registration ──────────────────────────────────────────────────────────

export default function registerRoles(pi: ExtensionAPI, cfg: PiToolkitConfig): void {
	// Seed fresh sessions with defaultRole (session-only; does not persist).
	pi.on("session_start", async (_event, ctx: ExtensionContext) => {
		currentCwd = ctx.cwd;
		activeRole = null;
		setStatus(ctx);
		if (cfg.defaultRole) {
			const role = discoverRoles(ctx.cwd, cfg).find((r) => r.name === cfg.defaultRole);
			if (role) {
				const warnings = await applyRole(pi, ctx, role);
				for (const w of warnings) console.warn(`[pi-toolkit/roles] ${w}`);
			} else {
				console.warn(`[pi-toolkit/roles] defaultRole "${cfg.defaultRole}" not found; using default prompt.`);
			}
		}
	});

	// Re-inject the role system prompt every turn (Pi rebuilds the prompt per turn).
	pi.on("before_agent_start", () => {
		if (!activeRole) return undefined;
		return { systemPrompt: activeRole.systemPrompt };
	});

	pi.registerCommand("role", {
		description: "/role (list), /role <name> (switch), /role off (clear)",
		getArgumentCompletions(argumentPrefix: string): AutocompleteItem[] | null {
			const roles = discoverRoles(currentCwd, cfg);
			const p = argumentPrefix.trim().toLowerCase();
			const items: AutocompleteItem[] = [];
			if (!p || "off".startsWith(p)) {
				items.push({ value: "off", label: "off", description: "Clear active role" });
			}
			for (const r of roles) {
				if (!p || r.name.toLowerCase().startsWith(p)) {
					items.push({ value: r.name, label: r.name, description: r.description });
				}
			}
			return items.length > 0 ? items : null;
		},
		handler: async (args: string, ctx: ExtensionCommandContext) => {
			const name = args?.trim();

			if (!name) {
				const roles = discoverRoles(ctx.cwd, cfg);
				if (roles.length === 0) {
					ctx.ui.notify(
						"No roles found. Add agent entries to settings.json (mode: \"primary\") or create .md files under .pi/agents / .agents/agents with `mode: primary`.",
						"warning",
					);
					return;
				}
				const lines = roles.map(
					(r) => `  ${r.name} [${r.source}]${r.description ? ": " + r.description : ""}`,
				);
				ctx.ui.notify(`Available roles:\n${lines.join("\n")}`, "info");
				return;
			}

			if (name === "off" || name === "clear") {
				activeRole = null;
				setStatus(ctx);
				ctx.ui.notify("Role cleared. Default system prompt restored.", "info");
				return;
			}

			const role = discoverRoles(ctx.cwd, cfg).find((r) => r.name === name);
			if (!role) {
				ctx.ui.notify(`Role "${name}" not found. Run /role to list available roles.`, "warning");
				return;
			}

			const warnings = await applyRole(pi, ctx, role);
			const extra = warnings.length > 0 ? "\n" + warnings.map((w) => `  ⚠ ${w}`).join("\n") : "";
			ctx.ui.notify(`Switched to role: ${role.name}${extra}`, "info");
		},
	});
}
