// ─── McpHttpClient — Streamable HTTP transport (MCP spec 2025-03-26) ─────────
//
// All JSON-RPC messages sent as POST requests to a single endpoint.
// Server may reply with application/json or text/event-stream.
// Session tracked via Mcp-Session-Id header.
// Idle timeout is simpler: no session, no persistent connection.

import type { McpClient, McpServerConfig, McpTool, McpCallResult, JsonRpcRequest, JsonRpcResponse } from "./types.ts";

export class McpHttpClient implements McpClient {
  private _dead = false;
  private sessionId: string | undefined;
  private readonly resolvedHeaders: Record<string, string>;
  private nextId = 1;
  private _lastUsedAt: number = Date.now();

  constructor(
    readonly serverName: string,
    private readonly config: McpServerConfig,
    private timeoutMs = 120_000,
  ) {
    // Resolve ${VAR} in headers
    this.resolvedHeaders = {};
    if (config.headers) {
      for (const [k, v] of Object.entries(config.headers)) {
        this.resolvedHeaders[k] = this.interpolate(v);
      }
    }
  }

  get isDead(): boolean {
    return this._dead;
  }

  get lastUsedAt(): number {
    return this._lastUsedAt;
  }

  touch(): void {
    this._lastUsedAt = Date.now();
  }

  setIdleTimeout(_minutes: number): void {
    // HTTP has no persistent connection to idle-close
  }

  private interpolate(v: string): string {
    return v.replace(/\$\{([^}]+)\}/g, (_, name: string) => {
      return process.env[name] ?? "";
    });
  }

  private buildHeaders(extra?: Record<string, string>): Record<string, string> {
    const h: Record<string, string> = { ...this.resolvedHeaders, ...extra };
    if (this.sessionId) h["Mcp-Session-Id"] = this.sessionId;
    return h;
  }

  private async sendRequest(method: string, params?: unknown): Promise<unknown> {
    const id = this.nextId++;
    const body: JsonRpcRequest = { jsonrpc: "2.0", id, method, params: params ?? {} };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(this.config.url!, {
        method: "POST",
        headers: this.buildHeaders({
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        }),
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timer);
      this.touch();

      const sid = response.headers.get("Mcp-Session-Id");
      if (sid) this.sessionId = sid;

      if (!response.ok) {
        let text = "";
        try { text = await response.text(); } catch {}
        throw new Error(
          `MCP server "${this.serverName}" returned HTTP ${response.status}` +
            (text ? `: ${text.slice(0, 300)}` : ""),
        );
      }

      const ct = (response.headers.get("Content-Type") ?? "").toLowerCase();

      if (ct.includes("text/event-stream")) {
        return this.readSSEResponse(response, id);
      }

      const json = await response.json() as JsonRpcResponse;
      if (json.error) {
        throw new Error(`MCP server error: ${json.error.message}`);
      }
      return json.result;
    } catch (err) {
      clearTimeout(timer);
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`MCP HTTP request to "${this.serverName}" failed: ${msg}`);
    }
  }

  private async readSSEResponse(response: Response, _id: number): Promise<unknown> {
    const reader = response.body?.getReader();
    if (!reader) return {};

    const decoder = new TextDecoder();
    let buffer = "";
    let lastResult: unknown = {};

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        let currentEvent = "";
        for (const line of lines) {
          if (line.startsWith("event: ")) {
            currentEvent = line.slice(7).trim();
          } else if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (currentEvent === "result" || parsed.id === _id) {
                if (parsed.result) lastResult = parsed.result;
                if (parsed.error) throw new Error(`MCP server error: ${parsed.error.message}`);
              }
            } catch (e) {
              if (e instanceof SyntaxError) continue;
              throw e;
            }
          }
        }
      }
    } finally {
      reader.cancel().catch(() => {});
    }

    return lastResult;
  }

  async initialize(): Promise<void> {
    await this.sendRequest("initialize", {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      clientInfo: { name: "pi-toolkit", version: "1.0.0" },
    });
    // Send initialized notification
    this.sendNotification("notifications/initialized");
  }

  private async sendNotification(method: string, params?: unknown): Promise<void> {
    const body: JsonRpcRequest = { jsonrpc: "2.0", id: 0, method, params: params ?? {} };
    try {
      await fetch(this.config.url!, {
        method: "POST",
        headers: this.buildHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(body),
      });
    } catch {
      // Notifications are fire-and-forget
    }
  }

  async listTools(): Promise<McpTool[]> {
    const raw = await this.sendRequest("tools/list");
    const result = raw as { tools?: McpTool[] };
    return result.tools ?? [];
  }

  async callTool(name: string, args: Record<string, unknown>): Promise<McpCallResult> {
    const result = await this.sendRequest("tools/call", { name, arguments: args }) as McpCallResult;
    return result;
  }

  close(): void {
    if (this._dead) return;
    this._dead = true;
    if (this.sessionId) {
      fetch(this.config.url!, {
        method: "DELETE",
        headers: this.buildHeaders(),
      }).catch(() => {});
    }
  }
}
