// ─── notify: delayed desktop notifications with circuit breaker ─────────────
//
// Self-contained terminal notification via OSC sequences.
// No @pi-archimedes/core dependency.

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { AutocompleteItem } from "@earendil-works/pi-tui";
import { execFile } from "node:child_process";

// ─── Terminal detection ──────────────────────────────────────────────────────

function wrapForTmux(sequence: string): string {
  if (!process.env.TMUX) return sequence;
  const escaped = sequence.replace(/\x1b/g, "\x1b\x1b");
  return `\x1bPtmux;${escaped}\x1b\\`;
}

function notifyOSC777(title: string, body: string): void {
  process.stderr.write(wrapForTmux(`\x1b]777;notify;${title};${body}\x07`));
}

function notifyOSC9(message: string): void {
  process.stderr.write(wrapForTmux(`\x1b]9;${message}\x07`));
}

function notifyOSC99(title: string, body: string): void {
  process.stderr.write(wrapForTmux(`\x1b]99;i=1:d=0;${title}\x1b\\`));
  process.stderr.write(wrapForTmux(`\x1b]99;i=1:p=${body}\x1b\\`));
}

function notifyWindows(title: string, body: string): void {
  const escapedTitle = title.replace(/'/g, "''");
  const escapedBody = body.replace(/'/g, "''");
  const script = [
    "Add-Type -AssemblyName System.Runtime.WindowsRuntime",
    "Add-Type -AssemblyName System.Runtime.InteropServices.WindowsRuntime",
    '$xml = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02)',
    '$textNodes = $xml.GetElementsByTagName("text")',
    "$textNodes.Item(0).InnerText = '" + escapedTitle + "'",
    "$textNodes.Item(1).InnerText = '" + escapedBody + "'",
    '$toast = New-Object Windows.UI.Notifications.ToastNotification $xml',
    "[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier('Pi').Show($toast)",
  ].join(";");
  execFile("powershell.exe", ["-NoProfile", "-Command", script], { shell: false }, () => {});
}

// ─── Dispatcher ──────────────────────────────────────────────────────────────

function notify(title: string, body: string): void {
  if (process.env.WT_SESSION) { notifyWindows(title, body); return; }
  if (process.env.KITTY_WINDOW_ID) { notifyOSC99(title, body); return; }
  if (process.env.TERM_PROGRAM === "iTerm.app" || process.env.ITERM_SESSION_ID) {
    notifyOSC9(body); return;
  }
  notifyOSC777(title, body);
}

// ─── Circuit breaker state ───────────────────────────────────────────────────

let notifyTimer: ReturnType<typeof setTimeout> | null = null;
let pendingTrigger: "agent_end" | "ask_request" | null = null;
let notifyOnAgentEnd = true;
let notifyOnAsk = true;
let notifyDelayMs = 5_000;

function cancelPending(): void {
  if (notifyTimer) {
    clearTimeout(notifyTimer);
    notifyTimer = null;
  }
  pendingTrigger = null;
}

function scheduleNotify(trigger: "agent_end" | "ask_request"): void {
  cancelPending();
  if (trigger === "agent_end" && !notifyOnAgentEnd) return;
  if (trigger === "ask_request" && !notifyOnAsk) return;

  pendingTrigger = trigger;
  notifyTimer = setTimeout(() => {
    if (pendingTrigger === "agent_end") {
      notify("Pi", "Task complete — waiting for input");
    } else {
      notify("Pi", "A question needs your answer");
    }
    notifyTimer = null;
    pendingTrigger = null;
  }, notifyDelayMs);
  notifyTimer.unref();
}

// ─── Registration ────────────────────────────────────────────────────────────

export default function registerNotify(pi: ExtensionAPI): void {
  pi.on("agent_end", () => scheduleNotify("agent_end"));
  pi.on("input", () => cancelPending());
  pi.on("before_agent_start", () => cancelPending());
  pi.on("agent_start", () => cancelPending());

  pi.registerCommand("notify", {
    description: "Send a desktop notification now, or configure notify behavior. Usage: /notify [on|off]",
    getArgumentCompletions(argumentPrefix: string): AutocompleteItem[] | null {
      const p = argumentPrefix.trim().toLowerCase();
      const items: AutocompleteItem[] = [];
      if (!p || "on".startsWith(p)) items.push({ value: "on", label: "on", description: "Enable notifications" });
      if (!p || "off".startsWith(p)) items.push({ value: "off", label: "off", description: "Disable notifications" });
      return items.length > 0 ? items : null;
    },
    handler: async (args, ctx) => {
      const arg = args?.trim().toLowerCase();
      if (arg === "" || !arg) {
        notify("Pi", "Test notification from /notify command");
        ctx.ui.notify("Notification sent!", "info");
      } else if (arg === "on") {
        notifyOnAgentEnd = true;
        notifyOnAsk = true;
        ctx.ui.notify("Notifications enabled.", "info");
      } else if (arg === "off") {
        notifyOnAgentEnd = false;
        notifyOnAsk = false;
        ctx.ui.notify("Notifications disabled.", "info");
      } else {
        ctx.ui.notify("Usage: /notify [on|off]", "warning");
      }
    },
  });

  // Cancel on terminal input
  let unsubTerminalInput: (() => void) | null = null;
  pi.on("session_start", (_event, ctx: ExtensionContext) => {
    unsubTerminalInput = ctx.ui.onTerminalInput?.(() => cancelPending()) ?? null;
  });

  pi.on("session_shutdown", () => {
    cancelPending();
    unsubTerminalInput?.();
  });
}
