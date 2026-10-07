// ─── notify: delayed desktop notification for ask prompts ───────────────────
//
// Self-contained: pi-asks owns its own terminal notification path so the ask
// plugin works with or without pi-toolkit loaded. No cross-extension imports.
//
// A notification is scheduled when the ask UI opens and cancelled when it
// closes, so the user is only pinged when a question actually waits for input.

import { execFile } from "node:child_process";

const NOTIFY_DELAY_MS = 5_000;

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

// herdr exposes a notification API over its own socket and does not parse OSC
// 777, so the CLI is the reliable path inside a herdr pane. "request" is the
// sound herdr reserves for input that needs the user.
function notifyHerdr(title: string, body: string): void {
  const bin = process.env.HERDR_BIN_PATH || "herdr";
  execFile(
    bin,
    ["notification", "show", title, "--body", body, "--sound", "request"],
    { shell: false },
    () => {},
  );
}

function notify(title: string, body: string): void {
  if (process.env.HERDR_ENV || process.env.HERDR_SOCKET_PATH) { notifyHerdr(title, body); return; }
  if (process.env.WT_SESSION) { notifyWindows(title, body); return; }
  if (process.env.KITTY_WINDOW_ID) { notifyOSC99(title, body); return; }
  if (process.env.TERM_PROGRAM === "iTerm.app" || process.env.ITERM_SESSION_ID) {
    notifyOSC9(body); return;
  }
  notifyOSC777(title, body);
}

// ─── Pending notification ────────────────────────────────────────────────────

let notifyTimer: ReturnType<typeof setTimeout> | null = null;

/** Notify after the delay unless the pending notification is cancelled first. */
export function scheduleAskNotify(title: string, body: string): void {
  cancelAskNotify();
  notifyTimer = setTimeout(() => {
    notifyTimer = null;
    notify(title, body);
  }, NOTIFY_DELAY_MS);
  notifyTimer.unref();
}

/** Drop a pending notification, for example because the question was answered. */
export function cancelAskNotify(): void {
  if (notifyTimer) {
    clearTimeout(notifyTimer);
    notifyTimer = null;
  }
}
