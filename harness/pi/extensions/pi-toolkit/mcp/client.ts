// ─── McpStdioClient — stdio JSON-RPC transport with idle timeout ─────────────

import { spawn, type ChildProcess } from "node:child_process";
import { createInterface } from "node:readline";
import type { McpClient, McpServerConfig, McpTool, McpCallResult, JsonRpcRequest, JsonRpcResponse } from "./types.ts";

const DEFAULT_IDLE_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

export class McpStdioClient implements McpClient {
  private proc!: ChildProcess;
  private rl!: ReturnType<typeof createInterface>;
  private pending = new Map<number, { resolve: (v: JsonRpcResponse) => void; reject: (e: Error) => void; timer: ReturnType<typeof setTimeout> }>();
  private nextId = 1;
  private _dead = false;
  private _lastUsedAt: number = Date.now();
  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  private idleTimeoutMs: number = DEFAULT_IDLE_TIMEOUT_MS;
  private _serverName: string;
  private stderrLines: string[] = [];
  private stderrHandlers: Array<(line: string) => void> = [];

  constructor(
    readonly serverName: string,
    private config: McpServerConfig,
    private timeoutMs = 120_000,
  ) {
    this._serverName = serverName;

    // Build env: process.env + config.env with ${VAR} interpolation
    const env: Record<string, string> = {};
    for (const [k, v] of Object.entries(process.env)) {
      if (v !== undefined) env[k] = v;
    }
    if (config.env) {
      for (const [k, v] of Object.entries(config.env)) {
        env[k] = this.interpolate(v);
      }
    }

    const resolvedArgs = (config.args ?? []).map((a) => this.interpolate(a));

    this.proc = spawn(config.command!, resolvedArgs, {
      stdio: ["pipe", "pipe", "pipe"],
      env,
      shell: false,
    });

    this.proc.stderr?.on("data", (chunk: Buffer) => {
      const lines = chunk.toString().split("\n").filter(Boolean);
      for (const line of lines.slice(0, 20)) {
        this.stderrLines.push(line);
        if (this.stderrLines.length > 20) this.stderrLines.shift();
        for (const h of this.stderrHandlers) h(line);
      }
    });

    // Set up readline for parsing JSON-RPC responses
    this.rl = createInterface({ input: this.proc.stdout!, terminal: false });
    this.rl.on("line", (line: string) => {
      let parsed: JsonRpcResponse;
      try {
        parsed = JSON.parse(line);
      } catch {
        return;
      }
      const id = parsed.id;
      const pending = this.pending.get(id);
      if (pending) {
        clearTimeout(pending.timer);
        this.pending.delete(id);
        pending.resolve(parsed);
      }
    });

    this.proc.on("exit", (code) => {
      this._dead = true;
      const err = new Error(
        `MCP server "${this.serverName}" exited (code ${code ?? "unknown"})` +
          (this.stderrLines.length ? `\nstderr:\n${this.stderrLines.join("\n")}` : ""),
      );
      for (const { reject, timer } of this.pending.values()) {
        clearTimeout(timer);
        reject(err);
      }
      this.pending.clear();
    });
  }

  get isDead(): boolean {
    return this._dead;
  }

  get lastUsedAt(): number {
    return this._lastUsedAt;
  }

  touch(): void {
    this._lastUsedAt = Date.now();
    this.resetIdleTimer();
  }

  setIdleTimeout(minutes: number): void {
    this.idleTimeoutMs = minutes > 0 ? minutes * 60 * 1000 : 0;
    this.resetIdleTimer();
  }

  private resetIdleTimer(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    if (this.idleTimeoutMs <= 0 || this._dead) return;
    this.idleTimer = setTimeout(() => {
      if (this._dead) return;
      // Only close if no in-flight requests
      if (this.pending.size === 0) {
        this.close();
      } else {
        // Check again later
        this.resetIdleTimer();
      }
    }, this.idleTimeoutMs);
    this.idleTimer.unref();
  }

  private interpolate(v: string): string {
    return v.replace(/\$\{([^}]+)\}/g, (_, name: string) => {
      return process.env[name] ?? "";
    });
  }

  onStderr(handler: (line: string) => void): () => void {
    this.stderrHandlers.push(handler);
    return () => {
      this.stderrHandlers = this.stderrHandlers.filter((h) => h !== handler);
    };
  }

  private send(method: string, params?: unknown): Promise<JsonRpcResponse> {
    if (this._dead) {
      return Promise.reject(new Error(`MCP server "${this.serverName}" is not running`));
    }
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`MCP request "${method}" timed out after ${this.timeoutMs}ms`));
      }, this.timeoutMs);
      this.pending.set(id, { resolve, reject, timer });
      const msg: JsonRpcRequest = { jsonrpc: "2.0", id, method, params: params ?? {} };
      this.proc.stdin!.write(JSON.stringify(msg) + "\n");
    });
  }

  async initialize(): Promise<void> {
    await this.send("initialize", {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      clientInfo: { name: "pi-toolkit", version: "1.0.0" },
    });
    this.proc.stdin!.write(
      JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n",
    );
    this.touch();
  }

  async listTools(): Promise<McpTool[]> {
    const tools: McpTool[] = [];
    let cursor: string | undefined;
    do {
      const res = await this.send("tools/list", cursor ? { cursor } : undefined);
      const result = res.result as { tools?: McpTool[]; nextCursor?: string };
      tools.push(...(result.tools ?? []));
      cursor = result.nextCursor;
    } while (cursor);
    this.touch();
    return tools;
  }

  async callTool(name: string, args: Record<string, unknown>): Promise<McpCallResult> {
    const res = await this.send("tools/call", { name, arguments: args });
    this.touch();
    return res.result as McpCallResult;
  }

  close(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    if (!this._dead) {
      this._dead = true;
      const err = new Error(`MCP server "${this.serverName}" closed`);
      for (const { reject, timer } of this.pending.values()) {
        clearTimeout(timer);
        reject(err);
      }
      this.pending.clear();
      this.proc.stdin?.end();
      this.proc.kill("SIGTERM");
      // Force kill after 3s
      setTimeout(() => {
        try { this.proc.kill("SIGKILL"); } catch {}
      }, 3000).unref();
    }
  }
}
