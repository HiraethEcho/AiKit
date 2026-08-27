import { existsSync, readFileSync, rmSync } from "node:fs";
import type { PaneInspection } from "./herdr.ts";

const ABORT_MESSAGE = "Aborted while waiting for subagent to finish";
const TERMINAL_SENTINEL = /__SUBAGENT_DONE_(\d+)__/;

export interface CompletionResult {
  reason: "done" | "ping" | "sentinel" | "error";
  exitCode: number;
  ping?: { name: string; message: string };
  errorMessage?: string;
}

export interface CompletionOptions {
  intervalMs: number;
  readTerminalTail: () => Promise<string>;
  inspectPane?: () => Promise<PaneInspection>;
  /** Bounded artifact grace after explicit pane disappearance. Default: 500ms. */
  paneDisappearanceGraceMs?: number;
  sessionFile?: string;
  onTick?: (elapsedSeconds: number) => void;
}

export function interpretExitSidecar(data: unknown): CompletionResult {
  const payload = data as {
    type?: unknown;
    name?: unknown;
    message?: unknown;
    errorMessage?: unknown;
  };

  if (payload?.type === "ping") {
    return {
      reason: "ping",
      exitCode: 0,
      ping: {
        name: typeof payload.name === "string" ? payload.name : "subagent",
        message: typeof payload.message === "string" ? payload.message : "",
      },
    };
  }

  if (payload?.type === "error") {
    const errorMessage =
      typeof payload.errorMessage === "string" && payload.errorMessage.trim()
        ? payload.errorMessage
        : "Subagent exited with stopReason=error (no errorMessage in sidecar).";
    return { reason: "error", exitCode: 1, errorMessage };
  }

  if (payload?.type === "done") return { reason: "done", exitCode: 0 };

  return {
    reason: "error",
    exitCode: 1,
    errorMessage: "Invalid subagent completion sidecar: unsupported payload type.",
  };
}

/** Read+consume `${sessionFile}.exit` if present; null otherwise. */
export function consumeExitSidecar(sessionFile: string | undefined): CompletionResult | null {
  if (!sessionFile) return null;

  const exitFile = `${sessionFile}.exit`;
  if (!existsSync(exitFile)) return null;

  try {
    const result = interpretExitSidecar(JSON.parse(readFileSync(exitFile, "utf8")));
    rmSync(exitFile, { force: true });
    return result;
  } catch {
    // Child may still be writing; retry next cycle.
    return null;
  }
}

function terminalExitCode(screen: string): number | null {
  const match = screen.match(TERMINAL_SENTINEL);
  return match ? Number.parseInt(match[1], 10) : null;
}

function completionArtifact(options: CompletionOptions): CompletionResult | null {
  return consumeExitSidecar(options.sessionFile);
}

async function waitForDisappearanceArtifacts(
  signal: AbortSignal,
  options: CompletionOptions,
): Promise<CompletionResult | null> {
  const immediate = completionArtifact(options);
  if (immediate) return immediate;

  const graceMs = Math.max(0, options.paneDisappearanceGraceMs ?? 500);
  const deadline = Date.now() + graceMs;
  while (Date.now() < deadline) {
    const remaining = deadline - Date.now();
    await abortableDelay(Math.min(25, remaining), signal);
    const result = completionArtifact(options);
    if (result) return result;
  }
  return null;
}

function abortableDelay(milliseconds: number, signal: AbortSignal): Promise<void> {
  if (signal.aborted) return Promise.reject(new Error(ABORT_MESSAGE));

  return new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(timer);
      reject(new Error(ABORT_MESSAGE));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, milliseconds);
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Wait for a pane-backed subagent to finish: sidecar file, terminal sentinel,
 * or pane disappearance (with a short artifact grace window).
 */
export async function waitForCompletion(
  signal: AbortSignal,
  options: CompletionOptions,
): Promise<CompletionResult> {
  const startedAt = Date.now();

  for (;;) {
    if (signal.aborted) throw new Error(ABORT_MESSAGE);

    const sidecarResult = completionArtifact(options);
    if (sidecarResult) return sidecarResult;

    try {
      const exitCode = terminalExitCode(await options.readTerminalTail());
      if (exitCode !== null) return { reason: "sentinel", exitCode };
    } catch {
      // Terminal reads are only probes; pane inspection runs independently.
    }

    if (options.inspectPane) {
      let inspection: PaneInspection;
      try {
        inspection = await options.inspectPane();
      } catch {
        inspection = { kind: "unavailable", error: "inspectPane threw" };
      }
      if (inspection.kind === "missing") {
        const racedCompletion = await waitForDisappearanceArtifacts(signal, options);
        if (racedCompletion) return racedCompletion;
        return {
          reason: "error",
          exitCode: 1,
          errorMessage: "Subagent pane disappeared before completion evidence was recorded.",
        };
      }
    }

    options.onTick?.(Math.floor((Date.now() - startedAt) / 1000));
    await abortableDelay(options.intervalMs, signal);
  }
}

export const __completionTest__ = { abortableDelay, terminalExitCode };