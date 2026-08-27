/**
 * RPC fallback surface layer.
 *
 * When pi is not running inside Herdr, subagents are spawned headlessly as
 * `pi --mode rpc` child processes and driven over the JSONL protocol:
 * - fresh spawn / resume → `prompt` command
 * - steering a running subagent → `steer` command
 * - completion → child exit (+ `${sessionFile}.exit` sidecar)
 *
 * No terminal multiplexer is required.
 */
import { spawn, type ChildProcess } from "node:child_process";
import { consumeExitSidecar, type CompletionResult } from "./completion.ts";

const ABORT_MESSAGE = "Aborted while waiting for subagent to finish";

export interface RpcSubagent {
  child: ChildProcess;
  sendPrompt(
    message: string,
    opts?: { id?: string; streamingBehavior?: "steer" | "followUp" },
  ): Promise<void>;
  /** Queue a steering message into a running agent. Returns false if child is gone. */
  steer(message: string): boolean;
  kill(): void;
}

interface PendingPrompt {
  resolve: () => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
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

/** Spawn a `pi --mode rpc` subagent child. Args must be raw (not shell-escaped). */
export function spawnRpcSubagent(
  args: string[],
  env: NodeJS.ProcessEnv,
  cwd: string,
): RpcSubagent {
  const child = spawn("pi", args, {
    env,
    cwd,
    stdio: ["pipe", "pipe", "pipe"],
  });

  const pending = new Map<string, PendingPrompt>();
  let buffer = "";
  let spawnError: Error | null = null;

  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (chunk: string) => {
    buffer += chunk;
    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);
      let message: any;
      try {
        message = JSON.parse(line);
      } catch {
        continue;
      }
      if (message?.type !== "response" || typeof message.id !== "string") continue;
      const entry = pending.get(message.id);
      if (!entry) continue;
      pending.delete(message.id);
      clearTimeout(entry.timer);
      if (message.success === true) {
        entry.resolve();
      } else {
        const detail =
          typeof message.error === "string"
            ? message.error
            : typeof message.error?.message === "string"
              ? message.error.message
              : "RPC prompt rejected";
        entry.reject(new Error(detail));
      }
    }
  });

  child.stderr.setEncoding("utf8");
  child.stderr.on("data", () => {
    // Keep stderr drained; child agent logs are visible in its session file.
  });

  child.on("error", (error) => {
    spawnError = error;
    (child as any).spawnError = error;
    for (const entry of pending.values()) {
      clearTimeout(entry.timer);
      entry.reject(error);
    }
    pending.clear();
  });

  child.on("exit", (_code, _signal) => {
    for (const entry of pending.values()) {
      clearTimeout(entry.timer);
      entry.reject(new Error("RPC subagent exited before prompt was accepted"));
    }
    pending.clear();
  });

  function writeCommand(command: Record<string, unknown>): boolean {
    const stdin = child.stdin;
    if (!stdin || stdin.destroyed || child.exitCode !== null) return false;
    try {
      stdin.write(`${JSON.stringify(command)}\n`);
      return true;
    } catch {
      return false;
    }
  }

  return {
    child,
    sendPrompt(message, opts) {
      const id = opts?.id ?? `prompt-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
      return new Promise<void>((resolve, reject) => {
        if (child.exitCode !== null || spawnError) {
          reject(spawnError ?? new Error("RPC subagent already exited"));
          return;
        }
        const command: Record<string, unknown> = {
          id,
          type: "prompt",
          message,
        };
        if (opts?.streamingBehavior) {
          command.streamingBehavior = opts.streamingBehavior;
        }
        if (!writeCommand(command)) {
          reject(new Error("Failed to write prompt to RPC subagent stdin"));
          return;
        }
        const timer = setTimeout(() => {
          pending.delete(id);
          reject(new Error("Timed out waiting for RPC prompt acceptance"));
        }, 15_000);
        (timer as any).unref?.();
        pending.set(id, { resolve, reject, timer });
      });
    },
    steer(message) {
      return writeCommand({ type: "steer", message });
    },
    kill() {
      if (child.exitCode !== null) return;
      try {
        child.kill("SIGTERM");
      } catch {
        // Fall through to SIGKILL below.
      }
      const timer = setTimeout(() => {
        try {
          child.kill("SIGKILL");
        } catch {
          // Already gone.
        }
      }, 2000);
      (timer as any).unref?.();
    },
  };
}

export interface RpcExitOptions {
  child: ChildProcess;
  sessionFile?: string;
  intervalMs?: number;
  onTick?: (elapsedSeconds: number) => void;
}

/**
 * Wait for an RPC subagent to exit. Prefers the `.exit` sidecar; falls back to
 * the child's exit code.
 */
export async function waitForRpcExit(
  signal: AbortSignal,
  options: RpcExitOptions,
): Promise<CompletionResult> {
  const intervalMs = options.intervalMs ?? 1000;
  const startedAt = Date.now();

  for (;;) {
    if (signal.aborted) throw new Error(ABORT_MESSAGE);

    const sidecar = consumeExitSidecar(options.sessionFile);
    if (sidecar) return sidecar;

    const spawnError = (options.child as any).spawnError as Error | undefined;
    if (options.child.exitCode !== null || spawnError) {
      // Give a late sidecar one more short grace window.
      await abortableDelay(200, signal);
      const lateSidecar = consumeExitSidecar(options.sessionFile);
      if (lateSidecar) return lateSidecar;
      if (spawnError) {
        return {
          reason: "error",
          exitCode: 1,
          errorMessage: `Failed to spawn RPC subagent: ${spawnError.message}`,
        };
      }
      return options.child.exitCode === 0
        ? { reason: "done", exitCode: 0 }
        : {
            reason: "error",
            exitCode: options.child.exitCode ?? 1,
            errorMessage: `Subagent exited with code ${options.child.exitCode}`,
          };
    }

    options.onTick?.(Math.floor((Date.now() - startedAt) / 1000));
    await abortableDelay(intervalMs, signal);
  }
}

export const __rpcTest__ = { abortableDelay };