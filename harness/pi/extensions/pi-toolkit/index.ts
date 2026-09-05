// ─── pi-toolkit — multi-function Pi extension ───────────────────────────────
//
// Entry point that registers all modules. Modules are independent; no cross-imports.

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { loadConfig } from "./config.ts";
import registerPiDocs from "./pi-docs.ts";
import registerNotify from "./notify.ts";
import registerRename from "./rename.ts";
import registerAddDir from "./add-dir.ts";
import registerMcp from "./mcp/index.ts";
import registerTools from "./tools.ts";
import registerRtk from "./rtk.ts";
import registerToon from "./toon.ts";
import registerCave from "./cave.ts";
import { registerSafeBash } from "./safe-bash.ts";
import registerAgentCommands from "./cmds.ts";
import registerRoles from "./roles.ts";

export default function piToolkit(pi: ExtensionAPI) {
  const cfg = loadConfig();
  registerPiDocs(pi, cfg["pi-doc"]);
  registerNotify(pi);
  registerRename(pi);
  registerAddDir(pi);
  registerMcp(pi);
  registerTools(pi);
  registerRtk(pi, cfg.rtk);
  registerToon(pi, cfg.toon);
  registerCave(pi, cfg.cave);
  registerSafeBash(pi, cfg["safe-bash"]);
  registerAgentCommands(pi, cfg["cmds"]);
  registerRoles(pi, cfg);
}
