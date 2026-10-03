// ─── toggle: shared on/off/toggle scaffold for /toon /rtk /pi-doc ─────────
// Each module keeps its own prompt + injection logic; this handles state,
// persistence, status icon, command handler, and session lifecycle.
// Multi-state toggles (like /terse off|normal|ultra) live in their own module.

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { AutocompleteItem } from "@earendil-works/pi-tui";

export interface ToggleSpec {
  command: string;
  description: string;
  configKey: string;   // appendEntry custom type, e.g. "toon-config"
  statusKey: string;   // setStatus key, e.g. "cave"
  icon: string;
  defaultEnabled: boolean;
  /** notify label, e.g. "Ultracave mode" → "Ultracave mode enabled." */
  label: string;
  /** extra notify suffix, e.g. " Will take effect on next turn." */
  suffix?: string;
  /** icon shown only when this returns true; default: enabled */
  isActive?: (enabled: boolean) => boolean;
  /** extra work on session_start (probes etc.); runs before updateStatus */
  onSessionStart?: (ctx: ExtensionContext) => Promise<void> | void;
  /** called after each /cmd toggle (on/off/empty); for live install/teardown */
  onToggle?: (enabled: boolean, ctx: ExtensionContext) => void;
}

export interface ToggleHandle {
  isEnabled(): boolean;
  refreshStatus(): void;
}

export function registerToggle(pi: ExtensionAPI, spec: ToggleSpec, initialEnabled?: boolean): ToggleHandle {
  let enabled = initialEnabled ?? spec.defaultEnabled;
  let activeUi: any = null;
  const isActive = spec.isActive ?? ((e: boolean) => e);

  function updateStatus() {
    if (!activeUi) return;
    activeUi.setStatus(spec.statusKey, isActive(enabled) ? spec.icon : undefined);
  }

  function persistState() {
    pi.appendEntry(spec.configKey, { enabled });
  }

  function restoreFromBranch(ctx: ExtensionContext) {
    const branchEntries = ctx.sessionManager?.getBranch?.() ?? [];
    for (const entry of branchEntries) {
      if (entry.type === "custom" && entry.customType === spec.configKey) {
        const data = entry.data as { enabled?: unknown } | undefined;
        if (data && typeof data.enabled === "boolean") enabled = data.enabled;
      }
    }
  }

  pi.registerCommand(spec.command, {
    description: spec.description,
    getArgumentCompletions(argumentPrefix: string): AutocompleteItem[] | null {
      const p = argumentPrefix.trim().toLowerCase();
      const items: AutocompleteItem[] = [];
      if (!p || "on".startsWith(p)) items.push({ value: "on", label: "on", description: `Enable ${spec.label}` });
      if (!p || "off".startsWith(p)) items.push({ value: "off", label: "off", description: `Disable ${spec.label}` });
      return items.length > 0 ? items : null;
    },
    handler: async (args, ctx) => {
      const arg = args?.trim().toLowerCase();
      if (arg === "on") {
        enabled = true; persistState(); updateStatus(); spec.onToggle?.(enabled, ctx);
        ctx.ui.notify(`${spec.label} enabled.${spec.suffix ?? ""}`, "info");
      } else if (arg === "off") {
        enabled = false; persistState(); updateStatus(); spec.onToggle?.(enabled, ctx);
        ctx.ui.notify(`${spec.label} disabled.${spec.suffix ?? ""}`, "info");
      } else if (!arg) {
        enabled = !enabled; persistState(); updateStatus(); spec.onToggle?.(enabled, ctx);
        ctx.ui.notify(`${spec.label} ${enabled ? "enabled" : "disabled"}.${spec.suffix ?? ""}`, "info");
      } else {
        ctx.ui.notify(`Usage: /${spec.command} [on|off]`, "warning");
      }
    },
  });

  pi.on("session_start", async (_e, ctx) => {
    activeUi = ctx.ui;
    restoreFromBranch(ctx);
    await spec.onSessionStart?.(ctx);
    updateStatus();
  });

  pi.on("session_tree", async (_e, ctx) => { restoreFromBranch(ctx); });

  return { isEnabled: () => enabled, refreshStatus: updateStatus };
}

/** Test whether a command can perform a harmless operation through Pi's executor. */
export async function canExecute(
  pi: Pick<ExtensionAPI, "exec">,
  command: string,
  args: string[],
  timeout = 3000,
): Promise<boolean> {
  try {
    const result = await pi.exec(command, args, { timeout });
    return result.code === 0;
  } catch {
    return false;
  }
}
