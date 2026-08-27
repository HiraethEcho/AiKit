// ─── safe-bash: dangerous-command guard ────────────────────────────────
//
// Two roles in one module:
//   1. Parent pi session (imported from index.ts): /safe-bash toggle (default
//      on) + bash tool_call interception that blocks dangerous commands.
//   2. Subagent child (loaded via `pi -e <this file>`): registers the
//      `safe_bash` tool wrapping the built-in bash tool. Blocking is disabled
//      when PI_SAFE_BASH_DISABLED=1 (set by the spawner when the toggle is off).
//
// Toggle OFF = bash runs unfiltered (both parent and children).

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { createBashTool, isToolCallEventType } from "@earendil-works/pi-coding-agent";
import { Type } from "@sinclair/typebox";
import { registerToggle } from "./toggle.ts";

const SAFE_BASH_ICON = "\u{F132}"; // NerdFont shield

const DANGEROUS_PATTERNS = [
	/\brm\s+(-[a-zA-Z]*f[a-zA-Z]*\s+)?(-[a-zA-Z]*r[a-zA-Z]*\s+)?(\/|~\/?\s|~\/?\b)/,
	/\brm\s+(-[a-zA-Z]*r[a-zA-Z]*\s+)?(-[a-zA-Z]*f[a-zA-Z]*\s+)?(\/|~\/?\s|~\/?\b)/,
	/\bsudo\b/,
	/\bmkfs\b/,
	/\bdd\s+if=/,
	/:\(\)\s*\{\s*:\|:&\s*\}\s*;:/,
	/>\s*\/dev\/[sh]d[a-z]/,
	/\bchmod\s+(-[a-zA-Z]+\s+)?777\s+\//,
	/\bchown\s+(-[a-zA-Z]+\s+)?root/,
	/\bcurl\s.*\|\s*(ba)?sh/,
	/\bwget\s.*\|\s*(ba)?sh/,
	/\bshutdown\b/,
	/\breboot\b/,
	/\binit\s+0\b/,
	/\bkill\s+-9\s+1\b/,
	/\bkillall\b/,
];

/** Returns a block reason when the command matches a dangerous pattern. */
export function isDangerous(command: string): string | null {
	const normalized = command.replace(/\\\n/g, " ");
	for (const pattern of DANGEROUS_PATTERNS) {
		if (pattern.test(normalized)) {
			return `Command blocked by safe_bash: matches dangerous pattern ${pattern}`;
		}
	}
	return null;
}

// Shared state bridge so pi-herdr-subagents can ask "is safe-bash on?" at spawn
// and set PI_SAFE_BASH_DISABLED for its children.
const SAFE_BASH_STATE_KEY = Symbol.for("pi-toolkit/safe-bash-enabled");

export function isSafeBashEnabled(): boolean {
	const fn = (globalThis as any)[SAFE_BASH_STATE_KEY];
	return typeof fn === "function" ? fn() !== false : true;
}

/**
 * Parent-session registration: /safe-bash toggle + bash interception.
 * Also publishes the live toggle state on a process-global symbol.
 */
export function registerSafeBash(pi: ExtensionAPI, initialEnabled?: boolean) {
	const t = registerToggle(pi, {
		command: "safe-bash",
		description: "Toggle dangerous-command blocking on/off. Usage: /safe-bash [on|off]",
		configKey: "safe-bash-config",
		statusKey: "safe-bash",
		icon: SAFE_BASH_ICON,
		defaultEnabled: true,
		label: "Safe bash",
	}, initialEnabled);

	(globalThis as any)[SAFE_BASH_STATE_KEY] = () => t.isEnabled();

	pi.on("tool_call", (event) => {
		if (!t.isEnabled()) return undefined;
		if (!isToolCallEventType("bash", event)) return undefined;

		const command = event.input.command;
		if (typeof command !== "string" || command.trim() === "") return undefined;

		const danger = isDangerous(command);
		if (danger) return { block: true, reason: danger };
		return undefined;
	});
}

/**
 * Subagent-child registration: the `safe_bash` tool. When the spawner set
 * PI_SAFE_BASH_DISABLED=1 (toggle off), the tool passes through unfiltered.
 */
export default function registerSafeBashTool(pi: ExtensionAPI) {
	const bashTool = createBashTool(process.cwd());

	pi.registerTool({
		name: "safe_bash",
		label: "Safe Bash",
		description:
			"Execute a bash command. Blocks dangerous commands (rm -rf /, sudo, mkfs, etc.) " +
			"unless safe-bash is disabled by the orchestrator.",
		parameters: Type.Object({
			command: Type.String({ description: "Bash command to execute" }),
			timeout: Type.Optional(
				Type.Number({ description: "Timeout in seconds (optional)" }),
			),
		}),
		async execute(toolCallId, params, signal, onUpdate, _ctx) {
			if (process.env.PI_SAFE_BASH_DISABLED === "1") {
				return bashTool.execute(toolCallId, params, signal, onUpdate);
			}
			const danger = isDangerous(params.command);
			if (danger) {
				throw new Error(danger);
			}
			return bashTool.execute(toolCallId, params, signal, onUpdate);
		},
	});
}

export const __safeBashTest__ = { SAFE_BASH_STATE_KEY, DANGEROUS_PATTERNS };