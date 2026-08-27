// ─── toon: JSON/TOON token-optimization guidance for pi-toolkit ────────────
//
// Injects a system-prompt nudge teaching the model to run JSON through
// `jq` (query/reshape) and `toon` (compress for context), and to convert
// back to JSON only when a strict contract requires it.
//
// The nudge is only injected when the user prompt mentions JSON or a
// related token (json, jsonl, ndjson, jq, toon, openapi, swagger).
//
// Requires: jq and toon on PATH.
//   jq:   sudo apt install jq  or  brew install jq
//   toon: npm i -g @toon-format/cli

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerToggle, canExecute } from "./toggle.ts";

const TOON_ICON = "\u{F05C0}";

// ── System prompt ──────────────────────────────────────────────────────────

const TOON_SYSTEM_PROMPT = `# JSON Handling — jq + TOON

When working with information-dense JSON (LLM/OpenAPI schemas, API responses,
config dumps, datasets), prefer this pipeline over dumping raw JSON into context:

\`\`\`bash
curl -s <url> | jq '<query>' | toon          # fetch → reshape → compress
cat data.json   | jq '.items'  | toon --stats # local file, show token savings
echo "$TOON"    | toon -d                      # convert TOON back to JSON
\`\`\`

## Why
- **jq** queries/reshapes so you only carry the slice you need.
- **toon** re-encodes JSON as TOON: uniform arrays of objects declare their
  keys once (\`key[N]{a,b,c}:\`) then stream bare rows — large token savings on
  tabular/dense data. \`toon\` auto-detects direction; \`-d\` decodes back.

## When TOON helps (use it)
- Uniform/tabular arrays of objects (TOON's sweet spot — savings scale with rows × fields)
- Flat objects and primitive arrays
- Shallow nesting

## When to SKIP TOON (keep JSON)
- API-level contracts / payloads you must send or store verbatim
- Deeply nested or non-uniform structures (compact JSON can win)
- Arrays of arrays (TOON is less efficient here)
- Anything a downstream parser requires as strict JSON

Rule of thumb: TOON for **reading** dense data into context; JSON for **contracts**.`;

// ── Prompt relevance gate ──────────────────────────────────────────────────

const JSON_TRIGGERS = [
	"json",
	"jsonl",
	"ndjson",
	"jq",
	"toon",
	"openapi",
	"swagger",
] as const;

const JSON_TRIGGER_RE = new RegExp(`\\b(${JSON_TRIGGERS.join("|")})\\b`, "i");

/**
 * True when the user prompt mentions JSON (or a related token), so the
 * jq+TOON guidance is only injected when actually relevant. Case-insensitive
 * and word-bounded ("JSON", "Json", "json" all match; "adjust" does not).
 */
export function mentionsJson(prompt: string | undefined | null): boolean {
	if (!prompt) return false;
	return JSON_TRIGGER_RE.test(prompt);
}

// ── Registration ───────────────────────────────────────────────────────────

export default function registerToon(pi: ExtensionAPI, initialEnabled?: boolean) {
	let jqAvailable: boolean | null = null;
	let toonAvailable: boolean | null = null;

	const t = registerToggle(pi, {
		command: "toon",
		description: "Toggle JSON/TOON guidance on/off. Usage: /toon [on|off]",
		configKey: "toon-config",
		statusKey: "toon",
		icon: TOON_ICON,
		defaultEnabled: false,
		label: "JSON/TOON guidance",
		isActive: (enabled) => enabled && jqAvailable !== false && toonAvailable !== false,
	}, initialEnabled);

	// ── System prompt injection (gated on JSON mentions) ──────────────────
	pi.on("before_agent_start", async (event, ctx) => {
		if (!t.isEnabled()) return undefined;
		if (!mentionsJson(event.prompt)) return undefined;

		// Probe once on first JSON-relevant prompt.
		if (jqAvailable === null || toonAvailable === null) {
			[jqAvailable, toonAvailable] = await Promise.all([
				canExecute(pi, "jq", ["--version"]),
				canExecute(pi, "toon", ["--version"]),
			]);
			if (!jqAvailable)
				ctx.ui.notify(
					"jq not found — JSON/TOON guidance disabled. Install: sudo apt install jq  or  brew install jq",
					"warning",
				);
			if (!toonAvailable)
				ctx.ui.notify(
					"toon not found — JSON/TOON guidance disabled. Install: bun add -g @toon-format/cli  or  npm i -g @toon-format/cli",
					"warning",
				);
		}

		t.refreshStatus();
		if (jqAvailable === false || toonAvailable === false) return undefined;
		const existing = event.systemPrompt ?? "";
		return { systemPrompt: `${TOON_SYSTEM_PROMPT}\n\n${existing}` };
	});
}
