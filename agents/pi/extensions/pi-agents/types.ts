// ── Shared types for subagent system ────────────────────────────────────

export interface ProgressUpdate {
  agent: string;
  status: "running" | "completed" | "error";
  task: string;
  currentTool?: string;
  toolCount: number;
  tokens: number;
  durationMs: number;
  recentOutput: string[];
  model?: string;
}

export interface SubagentResult {
  agent: string;
  task: string;
  exitCode: number;
  finalOutput: string;
  error?: string;
  model?: string;
  timedOut?: boolean;
  savedPath?: string;
  savedSummary?: string;
  progress: ProgressUpdate;
  progressSummary?: { toolCount: number; tokens: number; durationMs: number };
}

export interface SubagentToolResult {
  content: Array<{ type: "text"; text: string }>;
  details: SubagentDetails;
  isError?: boolean;
}

export interface SubagentDetails {
  mode: "single" | "parallel" | "chain";
  results: SubagentResult[];
  progress: ProgressUpdate[] | undefined;
}

export interface CallItem {
  agent?: string;
  prompt: string;
  model?: string;
  cwd?: string;
  session?: string;
  initialContext?: "parent" | "empty";
  timeout?: number;
}
