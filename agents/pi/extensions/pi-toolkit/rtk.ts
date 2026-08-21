// ─── rtk: RTK command rewriting for pi-toolkit ────────────────────────────
//
// Thin bridge to the `rtk rewrite` CLI. Intercepts bash tool calls and
// delegates to `rtk rewrite` for token-optimized command output.
// Also injects an RTK system prompt to teach the model to use `rtk`
// proactively.
//
// Requires: rtk >= 0.23.0 in PATH (cargo install rtk-ai).

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { isToolCallEventType } from "@earendil-works/pi-coding-agent";
import { registerToggle, canExecute } from "./toggle.ts";

const RTK_ICON = "\u{F04E5}";

// ── Constants ──────────────────────────────────────────────────────────────

const REWRITE_TIMEOUT_MS = 2_000;
const RTK_SYSTEM_PROMPT = `# RTK — token-optimized command wrapper

Prefix shell commands with \`rtk\` (e.g. \`rtk git status\`). RTK compacts output for git, gh, cargo, npm/pnpm/yarn/bun, tsc, lint, vitest/jest/playwright, docker, kubectl, ls, grep, prisma — and passes anything else through unchanged, so it's always safe.

Prefix EVERY segment in a chain, not just the first:
\`rtk git add . && rtk git commit -m "msg" && rtk git push\`

RTK also has filtering subcommands the auto-rewriter won't add — reach for these yourself when useful: \`rtk err <cmd>\` (errors only), \`rtk summary <cmd>\`, \`rtk log <file>\` (dedup), \`rtk json <file>\` (structure), \`rtk test <cmd>\` (failures only), \`rtk gain\` (savings stats).`;

// ── Helpers ────────────────────────────────────────────────────────────────

/** Calls `rtk rewrite`; returns the rewritten command or null (pass through). */
async function rewriteCommand(
	pi: ExtensionAPI,
	cmd: string,
	signal?: AbortSignal,
): Promise<string | null> {
	const result = await pi.exec("rtk", ["rewrite", cmd], {
		timeout: REWRITE_TIMEOUT_MS,
		signal,
	});
	if (result.killed) return null;
	if (result.code !== 0 && result.code !== 3) return null;
	return result.stdout.trim() || null;
}

// ── Registration ───────────────────────────────────────────────────────────

export default function registerRtk(pi: ExtensionAPI, initialEnabled?: boolean) {
	let rtkAvailable: boolean | null = null;
	let warnedMissing = false;

	async function checkRtk(): Promise<boolean> {
		if (rtkAvailable !== null) return rtkAvailable;
		rtkAvailable = await canExecute(pi, "rtk", ["--version"]);
		return rtkAvailable;
	}

	const t = registerToggle(pi, {
		command: "rtk",
		description: "Toggle RTK command rewriting on/off. Usage: /rtk [on|off]",
		configKey: "rtk-config",
		statusKey: "rtk",
		icon: RTK_ICON,
		defaultEnabled: true,
		label: "RTK rewriting",
		isActive: (enabled) => enabled && rtkAvailable === true,
		onSessionStart: async (ctx) => {
			const available = await checkRtk();
			if (!available && !warnedMissing) {
				ctx.ui.notify(
					"rtk not found — RTK rewriting disabled. Install: cargo install rtk-ai",
					"warning",
				);
				warnedMissing = true;
			}
		},
	}, initialEnabled);

	// ── System prompt injection ───────────────────────────────────────────
	pi.on("before_agent_start", async (event) => {
		if (!t.isEnabled()) return undefined;
		const available = await checkRtk();
		if (!available) return undefined;
		const existing = event.systemPrompt ?? "";
		return { systemPrompt: `${RTK_SYSTEM_PROMPT}\n\n${existing}` };
	});

	// ── Bash command rewriting ────────────────────────────────────────────
	pi.on("tool_call", async (event, ctx) => {
		if (!t.isEnabled()) return undefined;
		if (!isToolCallEventType("bash", event)) return undefined;

		const cmd = event.input.command;
		if (typeof cmd !== "string" || cmd.trim() === "") return undefined;
		if (cmd.startsWith("rtk ")) return undefined;
		if (process.env.RTK_DISABLED === "1") return undefined;

		const available = await checkRtk();
		t.refreshStatus();
		if (!available) {
			if (!warnedMissing) {
				ctx.ui.notify(
					"rtk not found — RTK rewriting disabled. Install: cargo install rtk-ai",
					"warning",
				);
				warnedMissing = true;
			}
			return undefined;
		}

		const rewritten = await rewriteCommand(pi, cmd, ctx.signal);
		if (rewritten && rewritten !== cmd) {
			event.input.command = rewritten;
		}
		return undefined;
	});
}
