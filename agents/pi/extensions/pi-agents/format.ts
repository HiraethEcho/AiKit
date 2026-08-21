// ── Formatting helpers for subagent UI ──────────────────────────────────

export function formatTokens(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return Math.round(n / 1_000) + "k";
  return String(n);
}

export function formatDuration(ms: number): string {
  if (ms < 100) return "<0.1s";
  if (ms < 1000) return (ms / 1000).toFixed(1) + "s";
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return seconds + "s";
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return minutes + "m " + remaining + "s";
}

function truncLine(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1) + "…";
}

export function buildAgentLabel(agent: string, task?: string, maxLen = 60): string {
  if (!task || task.length === 0) return agent;
  const preview = truncLine(task, maxLen - agent.length - 3);
  return `${agent}: ${preview}`;
}

type Theme = { fg: (token: string, text: string) => string };

export function buildStatsLine(
  data: { toolCount?: number; tokens?: number; durationMs?: number },
  theme: Theme,
): string {
  const parts: string[] = [];
  if ((data.toolCount ?? 0) > 0) parts.push(data.toolCount + " tool" + (data.toolCount !== 1 ? "s" : ""));
  if ((data.tokens ?? 0) > 0) parts.push(formatTokens(data.tokens!) + " tok");
  if ((data.durationMs ?? 0) > 0) parts.push(formatDuration(data.durationMs!));
  return parts.map(p => theme.fg("dim", "· " + p)).join(" ");
}
