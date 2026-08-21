// ─── Types ────────────────────────────────────────────────────────────────────

export interface McpServerConfig {
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  url?: string;
  headers?: Record<string, string>;
  directTools?: boolean | string[];
  excludeTools?: string[];
  /** Idle timeout in minutes. Default 10. 0 = no timeout. */
  idleTimeout?: number;
  /** Enabled state, in-memory only. Default true. */
  enabled?: boolean;
}

export interface McpClient {
  readonly serverName: string;
  readonly isDead: boolean;
  readonly lastUsedAt: number;
  initialize(): Promise<void>;
  listTools(): Promise<McpTool[]>;
  callTool(name: string, args: Record<string, unknown>): Promise<McpCallResult>;
  close(): void;
  /** Touch the lastUsedAt timestamp to reset idle timeout. */
  touch(): void;
  /** Set the user-supplied idleTimeout override (minutes, 0=no timeout). */
  setIdleTimeout(minutes: number): void;
}

export interface McpConfig {
  mcpServers: Record<string, McpServerConfig>;
}

export interface McpTool {
  name: string;
  description?: string;
  inputSchema?: {
    type?: string;
    properties?: Record<string, unknown>;
    required?: string[];
    [key: string]: unknown;
  };
}

export interface McpCallResult {
  content: Array<{ type: string; text?: string; data?: string; mimeType?: string }>;
  isError?: boolean;
}

export interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: number;
  method: string;
  params?: unknown;
}

export interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

