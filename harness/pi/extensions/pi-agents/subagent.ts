import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { spawn } from "node:child_process";
import { existsSync, readFileSync, unlinkSync, writeFileSync, mkdirSync } from "node:fs";
import { createInterface } from "node:readline";
import { createHash, randomUUID } from "node:crypto";
import { join, dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { createServer } from "node:net";
import { getBus, Events, type TaskItem } from "./bus.js";
import { findAgent } from "./agents.js";
import type { ProgressUpdate, SubagentResult } from "./types.js";

const DEFAULT_MAX_DEPTH = 2;

export interface RunSubagentOpts {
  agentName?: string;
  prompt: string;
  model?: string;
  cwd: string;
  session?: string;
  initialContext: string;
  timeout?: number;
  output?: string;
  /** Chain step index (1-based); suffixes the resolved output path to avoid overwrites. */
  outputSuffix?: number;
}

function asNumber(v: unknown): number | undefined {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function parseModelList(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === "string") return v.split(",").map(s => s.trim()).filter(Boolean);
  return [];
}

function withIndex(base: string, n: number): string {
  const dot = base.lastIndexOf(".");
  const slash = base.lastIndexOf("/");
  if (dot > slash) return `${base.slice(0, dot)}.${n}${base.slice(dot)}`;
  return `${base}.${n}`;
}

function deadProgress(agent: string, task: string, status: "running" | "completed" | "error"): ProgressUpdate {
  return { agent, status, task, currentTool: undefined, toolCount: 0, tokens: 0, durationMs: 0, recentOutput: [] };
}

// ── Run a subagent (with model fallback) ─────────────────────────────────

export async function runSubagent(
  opts: RunSubagentOpts,
  signal: AbortSignal | undefined,
  onUpdate: ((u: any) => void) | undefined,
  ctx: ExtensionContext,
): Promise<SubagentResult> {
  const agentName = opts.agentName ?? "general";
  const agent = findAgent(opts.cwd, agentName);

  // ── Recursion guard ──
  const depth = Number(process.env.PI_SUBAGENT_DEPTH ?? "0");
  const envMax = asNumber(process.env.PI_SUBAGENT_MAX_DEPTH) ?? DEFAULT_MAX_DEPTH;
  const agentMax = asNumber(agent?.extraFields.maxSubagentDepth);
  const maxDepth = agentMax !== undefined ? Math.min(agentMax, envMax) : envMax;
  if (depth >= maxDepth) {
    return {
      agent: agentName,
      task: opts.prompt,
      exitCode: 1,
      finalOutput: "",
      error: `Max subagent depth (${maxDepth}) reached. Complete the task directly instead of delegating.`,
      progress: deadProgress(agentName, opts.prompt, "error"),
      progressSummary: { toolCount: 0, tokens: 0, durationMs: 0 },
    };
  }

  // ── Model fallback chain ──
  const fallbackModels = parseModelList(agent?.extraFields.fallbackModels);
  const primaryModel = opts.model ?? agent?.model;
  const models: (string | undefined)[] = [primaryModel, ...fallbackModels].filter(
    (m, i, arr) => m !== undefined && arr.indexOf(m) === i
  );
  if (models.length === 0) models.push(undefined);
  const rawTimeout = opts.timeout ?? 300_000;
  const deadline = rawTimeout > 0 ? Date.now() + rawTimeout : Infinity;
  const frontmatterOutput = agent?.extraFields.output ? String(agent.extraFields.output) : undefined;
  const outputPath = opts.output ? resolve(opts.cwd, opts.output)
    : frontmatterOutput ? resolve(opts.cwd, frontmatterOutput) : undefined;
  const finalOutputPath = outputPath && opts.outputSuffix ? withIndex(outputPath, opts.outputSuffix) : outputPath;
  const piBinary = resolvePiBinary();

  // Socket bridge lives across attempts; the child inherits the path via env.
  const { socketPath, cleanup: cleanupSocket } = startAskSocketServer(agentName);

  let result: SubagentResult | undefined;
  const attemptErrors: string[] = [];

  try {
    for (let i = 0; i < models.length; i++) {
      const remaining = deadline === Infinity ? 0 : Math.max(0, deadline - Date.now());
      const attempt = await runOnce({
        piBinary,
        agentName,
        agentTools: agent?.tools,
        agentSystemPrompt: agent?.systemPrompt,
        prompt: opts.prompt,
        model: models[i],
        cwd: opts.cwd,
        session: opts.session,
        initialContext: opts.initialContext,
        socketPath,
        timeoutMs: remaining,
        childDepth: depth + 1,
      }, signal, onUpdate, ctx);

      if (attempt.timedOut || attempt.exitCode === 0) {
        result = attempt;
        break;
      }
      attemptErrors.push(`[attempt ${i + 1}${models[i] ? " on " + models[i] : ""}] ${attempt.error ?? `exit ${attempt.exitCode}`}`);
      result = attempt;
    }
  } finally {
    cleanupSocket();
  }

  if (result && attemptErrors.length > 1) {
    result = { ...result, error: attemptErrors.join("\n") };
  }

  // ── Output to file ──
  if (result && finalOutputPath && result.finalOutput) {
    try {
      mkdirSync(dirname(finalOutputPath), { recursive: true });
      writeFileSync(finalOutputPath, result.finalOutput, "utf-8");
      const kb = (Buffer.byteLength(result.finalOutput) / 1024).toFixed(1);
      const lines = result.finalOutput.split("\n").length;
      result = {
        ...result,
        savedPath: finalOutputPath,
        savedSummary: `Output saved to: ${finalOutputPath} (${kb} KB, ${lines} lines). Read this file if needed.`,
      };
    } catch {
      // Save failed: inline output stays in finalOutput
    }
  }

  return result!;
}

// ── Single spawn + JSONL stream ─────────────────────────────────────────

async function runOnce(
  opts: {
    piBinary: string;
    agentName: string;
    agentTools?: string[];
    agentSystemPrompt?: string;
    prompt: string;
    model?: string;
    cwd: string;
    session?: string;
    initialContext: string;
    socketPath: string;
    timeoutMs: number;
    childDepth: number;
  },
  signal: AbortSignal | undefined,
  onUpdate: ((u: any) => void) | undefined,
  ctx: ExtensionContext,
): Promise<SubagentResult> {
  const { agentName, piBinary } = opts;
  const args: string[] = ["--mode", "json"];

  // Session management: fork (inherit context) + named session
  if (opts.initialContext === "parent") {
    try {
      const parentId = ctx.sessionManager.getSessionId();
      args.push("--fork", parentId);
    } catch { /* session manager unavailable in headless/test */ }
  }

  if (opts.session) {
    const sessionId = computeSessionId(opts.session, opts.cwd);
    args.push("--session-id", sessionId);
    args.push("--name", `subagent:${agentName}`);
  } else if (opts.initialContext !== "parent") {
    // No session and no fork => temporary one-off
    args.push("--no-session");
  }

  if (opts.model) args.push("--model", opts.model);
  if (opts.agentTools?.length) args.push("--tools", opts.agentTools.join(","));
  let promptFile: string | undefined;
  if (opts.agentSystemPrompt) {
    promptFile = join(tmpdir(), `pi-agent-prompt-${randomUUID().slice(0, 8)}.md`);
    writeFileSync(promptFile, opts.agentSystemPrompt, { mode: 0o600 });
    args.push("--system-prompt", promptFile);
  }
  args.push("--exclude-tools", "subagent");
  args.push("-p", opts.prompt);

  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  let timedOut = false;

  const child = spawn(piBinary, args, {
    cwd: opts.cwd,
    env: {
      ...process.env,
      PI_SUBAGENT_SOCKET: opts.socketPath,
      PI_SUBAGENT_DEPTH: String(opts.childDepth),
    },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });

  const startTime = Date.now();

  if (opts.timeoutMs > 0) {
    timeoutHandle = setTimeout(() => {
      if (child.pid && !child.killed) { child.kill("SIGKILL"); timedOut = true; }
    }, opts.timeoutMs);
  }

  const cleanup = () => { if (timeoutHandle) clearTimeout(timeoutHandle); };
  child.on("exit", cleanup);
  child.on("error", cleanup);

  // Stream JSON Lines
  const stderrChunks: Buffer[] = [];
  child.stderr?.on("data", (chunk: Buffer) => stderrChunks.push(chunk));

  const result = await new Promise<SubagentResult>((resolvePromise) => {
    const outputChunks: string[] = [];
    let currentTool: string | undefined;
    let toolCount = 0;
    let inputTokens = 0, outputTokens = 0;

    const buildProgress = (): ProgressUpdate => ({
      agent: agentName, status: "running", task: opts.prompt,
      currentTool, toolCount, tokens: inputTokens + outputTokens,
      durationMs: Date.now() - startTime, recentOutput: [],
    });

    const emitProgress = () => onUpdate?.({
      content: [],
      details: { mode: "single", results: [], progress: [buildProgress()] },
    });
    const heartbeat = setInterval(emitProgress, 1000);

    if (!child.stdout) {
      clearInterval(heartbeat);
      resolvePromise({ agent: agentName, task: opts.prompt, finalOutput: "", error: "no stdout", exitCode: 1, progress: buildProgress() });
      return;
    }

    const rl = createInterface({ input: child.stdout, crlfDelay: Infinity });

    rl.on("line", (line: string) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      try {
        const event = JSON.parse(trimmed);
        switch (event.type) {
          case "tool_execution_start": {
            currentTool = event.toolName || event.tool;
            toolCount++;
            if (currentTool === "manage_task_list") handleTaskBridge(event, agentName);
            emitProgress();
            break;
          }
          case "message_end": {
            inputTokens = event.usage?.input ?? inputTokens;
            outputTokens = event.usage?.output ?? outputTokens;
            if (event.message?.role === "assistant" && event.message?.content) {
              const c = event.message.content;
              if (typeof c === "string") { if (c) outputChunks.push(c); }
              else if (Array.isArray(c)) {
                const text = c.filter((x: any) => x.type === "text").map((x: any) => x.text ?? "").join("\n");
                if (text) outputChunks.push(text);
              }
            }
            emitProgress();
            break;
          }
          case "agent_end": {
            if (event.usage) { inputTokens = event.usage.input ?? inputTokens; outputTokens = event.usage.output ?? outputTokens; }
            break;
          }
        }
      } catch { /* skip non-JSON */ }
    });

    child.on("close", (code: number | null) => {
      clearInterval(heartbeat);
      const exitCode = code ?? 1;
      let error: string | undefined;
      if (timedOut) error = `Timeout after ${opts.timeoutMs}ms`;
      else if (exitCode !== 0) {
        const stderr = Buffer.concat(stderrChunks).toString("utf-8").trim();
        if (stderr) error = stderr;
      }
      const finalOutput = outputChunks.join("\n");
      getBus().emit(Events.TASK_CLEAR, { source: `subagent:${agentName}` });
      resolvePromise({
        agent: agentName, task: opts.prompt, finalOutput, error, exitCode, timedOut,
        progress: {
          agent: agentName, status: exitCode === 0 ? "completed" : "error",
          task: opts.prompt, currentTool, toolCount,
          tokens: inputTokens + outputTokens, durationMs: Date.now() - startTime, recentOutput: [],
        },
        progressSummary: { toolCount, tokens: inputTokens + outputTokens, durationMs: Date.now() - startTime },
      });
    });

    child.on("error", (err: Error) => {
      clearInterval(heartbeat);
      resolvePromise({ agent: agentName, task: opts.prompt, finalOutput: "", error: err.message, exitCode: 1, progress: buildProgress() });
    });
  });

  if (promptFile) { try { unlinkSync(promptFile); } catch { /* gone */ } }

  return result;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function computeSessionId(handle: string, cwd: string): string {
  const hash = createHash("sha256").update(`${handle}:${cwd}`).digest("hex").slice(0, 16);
  return `subagent.${hash}`;
}

function startAskSocketServer(agentName: string): { socketPath: string; cleanup: () => void } {
  const id = randomUUID().slice(0, 8);
  const tmpDir = process.platform === "win32" ? process.env.TEMP || "/tmp" : "/tmp";
  const socketPath = join(tmpDir, `pi-ask-${id}.sock`);
  // Defensive: remove a stale socket from a crashed run before listening
  try { if (existsSync(socketPath)) unlinkSync(socketPath); } catch { /* ignore */ }
  const pending = new Map<string, { send: (response: unknown) => void; timeout: ReturnType<typeof setTimeout> }>();

  const unsubResponse = getBus().on(Events.ASK_RESPONSE, (payload: unknown) => {
    const data = payload as { requestId: string; cancelled: boolean; results: unknown[] };
    const entry = pending.get(data.requestId);
    if (entry) { clearTimeout(entry.timeout); pending.delete(data.requestId); entry.send({ type: "ask_response", requestId: data.requestId, cancelled: data.cancelled, results: data.results }); }
  });

  const server = createServer((socket) => {
    let buffer = "";
    socket.on("data", (chunk: Buffer) => {
      buffer += chunk.toString("utf-8");
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
          const msg = JSON.parse(trimmed);
          if (msg.type === "ask_request") {
            const send = (response: unknown) => {
              try { socket.write(JSON.stringify(response) + "\n"); } catch { /* closed */ }
            };
            const timeout = setTimeout(() => {
              if (pending.has(msg.requestId)) {
                pending.delete(msg.requestId);
                send({ type: "ask_response", requestId: msg.requestId, cancelled: true, results: [] });
              }
            }, 300_000);
            pending.set(msg.requestId, { send, timeout });
            getBus().emit(Events.ASK_REQUEST, { source: `subagent:${agentName}`, requestId: msg.requestId, questions: msg.questions });
          }
        } catch { /* ignore */ }
      }
    });
    socket.on("error", () => {});
  });

  server.listen(socketPath);

  const cleanup = () => {
    unsubResponse();
    server.close();
    if (process.platform !== "win32") { try { unlinkSync(socketPath); } catch { /* gone */ } }
  };
  return { socketPath, cleanup };
}

function handleTaskBridge(event: { args?: { operation?: string; taskList?: TaskItem[] } }, agentName: string) {
  if (event.args?.operation === "write" && event.args?.taskList) {
    getBus().emit(Events.TASK_UPDATE, { source: `subagent:${agentName}`, tasks: event.args.taskList });
  }
}

function resolvePiBinary(): string {
  try {
    const entry = process.argv[1];
    if (!entry) return "pi";
    let dir = dirname(entry);
    const root = dirname(dir);
    while (dir !== root) {
      try {
        const pkgPath = join(dir, "package.json");
        const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
        if (pkg.name === "@earendil-works/pi-coding-agent") {
          const bin = pkg.bin;
          const binRel = typeof bin === "string" ? bin : bin?.pi ?? Object.values(bin ?? {})[0];
          if (binRel) { const resolved = join(dir, binRel); if (existsSync(resolved)) return resolved; }
          break;
        }
      } catch { /* keep walking */ }
      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  } catch { /* fall through */ }
  return "pi";
}