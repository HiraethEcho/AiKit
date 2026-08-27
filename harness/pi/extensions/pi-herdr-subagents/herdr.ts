/**
 * Herdr surface layer for subagents.
 *
 * A subagent gets its own split pane off the parent pi pane (right split, no
 * focus steal). Everything the extension does to a pane goes through the small
 * API in this file: split a pane, run a script in it, read its screen, inspect
 * its lifecycle, close it. Split-only — no tabs/worktrees.
 */
import { execFile, execFileSync } from "node:child_process";
import { promisify } from "node:util";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const execFileAsync = promisify(execFile);

const commandAvailability = new Map<string, boolean>();

function hasCommand(command: string): boolean {
  if (commandAvailability.has(command)) {
    return commandAvailability.get(command)!;
  }

  let available = false;
  try {
    execFileSync("sh", ["-c", `command -v ${command}`], { stdio: "ignore" });
    available = true;
  } catch {
    available = false;
  }

  commandAvailability.set(command, available);
  return available;
}

/** True when this pi process runs inside a Herdr-managed pane. */
export function isHerdrAvailable(): boolean {
  return process.env.HERDR_ENV === "1" && hasCommand("herdr");
}

function parseHerdrJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function extractHerdrPaneId(output: string, context: string): string {
  const parsed = parseHerdrJson(output) as {
    result?: { pane?: { pane_id?: unknown } };
  } | null;
  const paneId = parsed?.result?.pane?.pane_id;
  if (typeof paneId !== "string" || !paneId) {
    throw new Error(`Unexpected herdr ${context} output: ${output.trim() || "(empty)"}`);
  }
  return paneId;
}

function herdrExec(args: string[]): string {
  return execFileSync("herdr", args, { encoding: "utf8" });
}

async function herdrExecAsync(args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("herdr", args, { encoding: "utf8" });
  return stdout;
}

function getHerdrParentPaneId(): string {
  const paneId = process.env.HERDR_PANE_ID;
  if (!paneId) {
    throw new Error("HERDR_PANE_ID not set — pi is not running inside Herdr");
  }
  return paneId;
}

/** POSIX single-quote escape for shell command construction. */
export function shellEscape(value: string): string {
  return "'" + value.replace(/'/g, "'\\''") + "'";
}

/**
 * Split the parent pi pane right and return the new pane id.
 * Keeps the user's focus in the parent pane (`--no-focus`).
 */
export function createHerdrSurfaceSplit(
  name: string,
  direction: "right" | "down" = "right",
): string {
  void name;
  const parentPaneId = getHerdrParentPaneId();
  const args = ["pane", "split", parentPaneId, "--direction", direction];
  args.push("--no-focus", "--cwd", process.cwd());
  const output = herdrExec(args);
  const paneId = extractHerdrPaneId(output, "pane split");
  try {
    herdrExec(["pane", "rename", paneId, name]);
  } catch {
    // Cosmetic; pane label is optional.
  }
  return paneId;
}

/** Send a command string to a pane and submit it (text + Enter atomically). */
export function sendHerdrCommand(surface: string, command: string): void {
  herdrExec(["pane", "run", surface, command]);
}

/**
 * Send a long command to a pane via a script file, avoiding terminal
 * line-wrapping issues. Returns the script path.
 */
export function runScriptInPane(
  surface: string,
  command: string,
  options?: { scriptPath?: string; scriptPreamble?: string },
): string {
  const scriptPath =
    options?.scriptPath ??
    join(
      tmpdir(),
      "pi-herdr-subagent-scripts",
      `cmd-${Date.now()}-${Math.random().toString(16).slice(2, 8)}.sh`,
    );
  mkdirSync(dirname(scriptPath), { recursive: true });

  const scriptLines = ["#!/bin/bash"];
  if (options?.scriptPreamble) {
    scriptLines.push(options.scriptPreamble.trimEnd());
  }
  scriptLines.push(command);
  writeFileSync(scriptPath, `${scriptLines.join("\n")}\n`, { mode: 0o755 });

  sendHerdrCommand(surface, `bash ${shellEscape(scriptPath)}`);
  return scriptPath;
}

/** Read pane screen (sync). */
export function readPane(surface: string, lines = 50): string {
  return herdrExec([
    "pane",
    "read",
    surface,
    "--source",
    "visible",
    "--lines",
    String(lines),
  ]);
}

/** Read pane screen (async). */
export async function readPaneAsync(surface: string, lines = 50): Promise<string> {
  return herdrExecAsync([
    "pane",
    "read",
    surface,
    "--source",
    "visible",
    "--lines",
    String(lines),
  ]);
}

/** Close a pane. */
export function closePane(surface: string): void {
  herdrExec(["pane", "close", surface]);
}

// ── Pane inspection ──

export type PaneInspection =
  | {
      kind: "present";
      agent?: string;
      agentStatus: "idle" | "working" | "blocked" | "done" | "unknown";
    }
  | { kind: "missing"; error?: string }
  | { kind: "unavailable"; error: string };

function parsePaneGetOutput(
  output: string,
  surface: string,
): PaneInspection {
  const parsed = parseHerdrJson(output) as {
    result?: { pane?: unknown };
    error?: { code?: unknown; message?: unknown };
  } | null;
  const errorObj = parsed?.error;
  if (errorObj?.code === "pane_not_found" || errorObj?.code === "not_found") {
    return {
      kind: "missing",
      error:
        typeof errorObj.message === "string"
          ? errorObj.message
          : "pane not found",
    };
  }
  const pane = parsed?.result?.pane;
  if (!pane || typeof pane !== "object") {
    return { kind: "unavailable", error: "pane get returned no pane record" };
  }
  const record = pane as {
    pane_id?: unknown;
    agent?: unknown;
    agent_status?: unknown;
  };
  if (record.pane_id !== surface) {
    return { kind: "unavailable", error: "pane id mismatch" };
  }
  const agent = typeof record.agent === "string" ? record.agent : undefined;
  const rawStatus =
    typeof record.agent_status === "string" ? record.agent_status : "unknown";
  const agentStatus =
    rawStatus === "idle" ||
    rawStatus === "working" ||
    rawStatus === "blocked" ||
    rawStatus === "done" ||
    rawStatus === "unknown"
      ? rawStatus
      : "unknown";
  return { kind: "present", ...(agent ? { agent } : {}), agentStatus };
}

function parsePaneGetError(error: any): PaneInspection {
  for (const raw of [error?.stderr, error?.stdout]) {
    if (typeof raw !== "string" || !raw.trim()) continue;
    try {
      const parsed = parsePaneGetOutput(raw, "");
      if (parsed.kind === "missing") return parsed;
    } catch {
      // Keep trying the other stream.
    }
    if (/\b(?:pane_not_found|not_found)\b/.test(raw)) {
      return { kind: "missing", error: raw.trim() };
    }
  }
  const message = error?.message
    ? String(error.message)
    : "herdr pane get failed";
  return { kind: "unavailable", error: message };
}

/** Structured pane query: present / missing / unavailable. */
export async function inspectPane(surface: string): Promise<PaneInspection> {
  try {
    return parsePaneGetOutput(await herdrExecAsync(["pane", "get", surface]), surface);
  } catch (error: any) {
    return parsePaneGetError(error);
  }
}

// ── Shell readiness ──

export interface HerdrPaneProcessInfo {
  paneId: string;
  shellPid?: number;
  foregroundProcessGroupId?: number;
  pids: number[];
  foregroundProcesses: Array<{
    pid: number;
    name?: string;
    argv0?: string;
    argv?: string[];
    cwd?: string;
  }>;
}

export function parsePaneProcessInfo(
  output: string,
  paneId: string,
): HerdrPaneProcessInfo {
  const parsed = parseHerdrJson(output) as {
    result?: {
      process_info?: {
        pane_id?: unknown;
        shell_pid?: unknown;
        foreground_process_group_id?: unknown;
        foreground_processes?: Array<{
          pid?: unknown;
          name?: unknown;
          argv0?: unknown;
          argv?: unknown;
          cwd?: unknown;
        }>;
      };
    };
  } | null;
  const info = parsed?.result?.process_info;
  if (!info || typeof info !== "object") {
    throw new Error(
      `Unexpected herdr pane process-info output: ${output.trim() || "(empty)"}`,
    );
  }
  if (typeof info.pane_id === "string" && info.pane_id !== paneId) {
    throw new Error(
      `herdr pane process-info pane id mismatch: ${info.pane_id} != ${paneId}`,
    );
  }
  const pids = new Set<number>();
  if (
    typeof info.shell_pid === "number" &&
    Number.isInteger(info.shell_pid) &&
    info.shell_pid > 0
  ) {
    pids.add(info.shell_pid);
  }
  if (
    typeof info.foreground_process_group_id === "number" &&
    Number.isInteger(info.foreground_process_group_id) &&
    info.foreground_process_group_id > 0
  ) {
    pids.add(info.foreground_process_group_id);
  }
  const foregroundProcesses: HerdrPaneProcessInfo["foregroundProcesses"] = [];
  for (const process of info.foreground_processes ?? []) {
    if (
      typeof process?.pid === "number" &&
      Number.isInteger(process.pid) &&
      process.pid > 0
    ) {
      const entry: HerdrPaneProcessInfo["foregroundProcesses"][number] = {
        pid: process.pid,
      };
      if (typeof process.name === "string") entry.name = process.name;
      if (typeof process.argv0 === "string") entry.argv0 = process.argv0;
      if (
        Array.isArray(process.argv) &&
        process.argv.every((value) => typeof value === "string")
      ) {
        entry.argv = process.argv as string[];
      }
      if (typeof process.cwd === "string") entry.cwd = process.cwd;
      foregroundProcesses.push(entry);
      pids.add(process.pid);
    }
  }
  return {
    paneId,
    ...(typeof info.shell_pid === "number" ? { shellPid: info.shell_pid } : {}),
    ...(typeof info.foreground_process_group_id === "number"
      ? { foregroundProcessGroupId: info.foreground_process_group_id }
      : {}),
    pids: [...pids],
    foregroundProcesses,
  };
}

export function getPaneProcessInfo(surface: string): HerdrPaneProcessInfo {
  return parsePaneProcessInfo(
    herdrExec(["pane", "process-info", "--pane", surface]),
    surface,
  );
}

async function getPaneProcessInfoAsync(
  surface: string,
): Promise<HerdrPaneProcessInfo> {
  return parsePaneProcessInfo(
    await herdrExecAsync(["pane", "process-info", "--pane", surface]),
    surface,
  );
}

function isHerdrShellReady(info: HerdrPaneProcessInfo): boolean {
  return (
    info.shellPid != null && info.foregroundProcessGroupId === info.shellPid
  );
}

/** Wait until the new pane has an interactive shell in the foreground. */
export async function waitForShellReady(
  surface: string,
  options: { timeoutMs?: number; intervalMs?: number; signal?: AbortSignal } = {},
): Promise<void> {
  const timeoutMs = options.timeoutMs ?? 10_000;
  const intervalMs = options.intervalMs ?? 50;
  const deadline = Date.now() + timeoutMs;
  let lastError = "no interactive shell foreground process";

  while (Date.now() <= deadline) {
    if (options.signal?.aborted) {
      throw new Error("Shell readiness wait cancelled.");
    }
    try {
      if (isHerdrShellReady(await getPaneProcessInfoAsync(surface))) return;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (Date.now() >= deadline) break;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  throw new Error(
    `Timed out waiting for interactive shell in Herdr pane ${surface}: ${lastError}`,
  );
}

export const __herdrTest__ = {
  parseHerdrJson,
  extractHerdrPaneId,
  parsePaneGetOutput,
  parsePaneGetError,
  parsePaneProcessInfo,
  isHerdrShellReady,
};