// ─── pi-toolkit config: loaded from settings.json (global + project) ────────
// Config lives in settings.json rather than a standalone pi-toolkit.json:
//   - `toolkit`       -> default enabled state for rtk, toon, cave, pi-doc,
//                        cmds (fixed-editor is not a toggle here)
//   - `agent`         -> named roles; `mode: "primary"` = role
//   - `defaultRole`   -> role seeded into fresh sessions
// Branch persistence overrides config at session level.

import { readFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

/** One entry in the `agent` map of settings.json. `mode: "primary"` = role. */
export interface RoleEntry {
	mode?: string;
	description?: string;
	prompt?: string;
	model?: string;
	thinking?: string;
}

export interface PiToolkitConfig {
	rtk: boolean;
	toon: boolean;
	cave: boolean;
  adhd: boolean;
	"pi-doc": boolean;
	"cmds": boolean;
	"safe-bash": boolean;
	agent: Record<string, RoleEntry>;
	defaultRole?: string;
}

const DEFAULTS: PiToolkitConfig = {
	rtk: true,
	toon: false,
	cave: false,
  adhd: true,
	"pi-doc": false,
	cmds: false,
	"safe-bash": true,
	agent: {},
};

function resolveCandidates(): string[] {
	const global_ = join(homedir(), ".pi", "agent", "settings.json");
	const project_ = join(process.cwd(), ".pi", "settings.json");
	return [global_, project_];
}

export function loadConfig(): PiToolkitConfig {
	const cfg: PiToolkitConfig = { ...DEFAULTS };
	for (const p of resolveCandidates()) {
		if (existsSync(p)) {
			try {
				const raw = readFileSync(p, "utf-8");
				const parsed = JSON.parse(raw) as Record<string, unknown>;
				// `toolkit` holds the default-enabled toggle flags.
				if (parsed && typeof parsed.toolkit === "object" && parsed.toolkit !== null) {
					const flags = { ...(parsed.toolkit as Record<string, unknown>) };
					// agent / defaultRole live at top level of settings.json, not here.
					delete flags.agent;
					delete flags.defaultRole;
					Object.assign(cfg, flags);
				}
				// `agent` deep-merges per-key so project entries override global
				// ones instead of replacing the whole map.
				if (parsed && typeof parsed.agent === "object" && parsed.agent !== null) {
					cfg.agent = { ...cfg.agent, ...(parsed.agent as Record<string, RoleEntry>) };
				}
				if (parsed && typeof parsed.defaultRole === "string") {
					cfg.defaultRole = parsed.defaultRole;
				}
			} catch {
				console.error(`[pi-toolkit] bad config ${p}`);
			}
		}
	}
	return cfg;
}
