// ─── pi-docs: toggle Pi documentation block in system prompt ────────────────

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerToggle } from "./toggle.ts";

const PI_DOCS_ICON = "\u{F02D}";
const PI_DOCS_REGEX =
  /\nPi documentation \(read only when the user asks about pi itself[^\n]*\n(?:- [^\n]*\n)*- [^\n]*/;

export default function registerPiDocs(pi: ExtensionAPI, initialEnabled?: boolean) {
  const t = registerToggle(pi, {
    command: "pi-doc",
    description: "Toggle Pi documentation in system prompt on/off. Usage: /pi-doc [on|off]",
    configKey: "pidocs-config",
    statusKey: "pi-doc",
    icon: PI_DOCS_ICON,
    defaultEnabled: false,
    label: "Pi documentation",
    suffix: " Will take effect on next turn.",
  }, initialEnabled);

  // ── System prompt injection ───────────────────────────────────────
  pi.on("before_agent_start", async (event) => {
    const prompt = event.systemPrompt ?? "";
    if (t.isEnabled()) return { ...event, systemPrompt: prompt };
    return { ...event, systemPrompt: prompt.replace(PI_DOCS_REGEX, "") };
  });
}
