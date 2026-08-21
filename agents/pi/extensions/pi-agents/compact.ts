// ── Compact rendering for subagent results ──────────────────────────────

import { Text } from "@earendil-works/pi-tui";
import type { ProgressUpdate, SubagentResult, SubagentDetails } from "./types.js";
import { formatDuration, buildStatsLine, buildAgentLabel } from "./format.js";

type Theme = { fg: (token: string, text: string) => string; bold: (text: string) => string };
type RenderContext = { state: Record<string, unknown>; invalidate: () => void };

// ── Shared helpers ────────────────────────────────────────────────────────

function compactGlyph(status: string, theme: Theme): string {
  const glyph = status === "running" ? "↳" : status === "completed" ? "✓" : "✗";
  const color = status === "completed" ? "success" : status === "error" ? "error" : "muted";
  return theme.fg(color, glyph);
}

function resolveStatus(result: { exitCode: number }, progress?: { status?: string }): string {
  if (progress?.status === "running") return "running";
  return result.exitCode === 0 ? "completed" : "error";
}

function liveDurationMs(
  agentName: string, isRunning: boolean,
  summary: { durationMs?: number }, progress: { durationMs?: number } | undefined,
  context: RenderContext,
): number {
  const timeKey = `subagent:${agentName}:start`;
  if (isRunning && context.state[timeKey] === undefined) {
    context.state[timeKey] = Date.now() - (progress?.durationMs ?? 0);
  }
  return isRunning && context.state[timeKey] !== undefined
    ? Date.now() - (context.state[timeKey] as number)
    : (summary.durationMs ?? 0);
}

// ── Single agent ─────────────────────────────────────────────────────────

export function renderCompactSingle(
  text: Text, result: SubagentResult, progress: ProgressUpdate | undefined,
  theme: Theme, context: RenderContext,
): Text {
  const agent = result.agent ?? "general";
  const status = resolveStatus(result, progress);
  const summary = result.progressSummary ?? { toolCount: 0, tokens: 0, durationMs: 0 };
  const duration = liveDurationMs(agent, status === "running", summary, progress, context);

  const stats = buildStatsLine({ toolCount: summary.toolCount, tokens: summary.tokens, durationMs: duration }, theme);
  const model = result.model ? theme.fg("accent", " " + result.model) : "";
  const line = `${compactGlyph(status, theme)} ${buildAgentLabel(agent, result.task)}${model} ${stats} ${theme.fg("dim", "(ctrl+o)")}`;
  text.setText(line);
  return text;
}

// ── Parallel agents ──────────────────────────────────────────────────────

export function renderCompactParallel(
  text: Text, details: SubagentDetails, theme: Theme, _context: RenderContext,
): Text {
  const lines = details.results.map((r, i) => {
    const progress = details.progress?.[i];
    const agent = r.agent ?? "general";
    const status = resolveStatus(r, progress);
    const summary = r.progressSummary ?? { toolCount: 0, tokens: 0, durationMs: 0 };
    const stats = buildStatsLine({ toolCount: summary.toolCount, tokens: summary.tokens, durationMs: summary.durationMs }, theme);
    const statsPart = stats ? "  " + stats : "";
    return `${compactGlyph(status, theme)} ${buildAgentLabel(agent, r.task)}${statsPart}`;
  });
  text.setText(lines.join("\n"));
  return text;
}

// ── Streaming progress (single, during execution) ────────────────────────

export function renderCompactProgress(
  text: Text, progress: ProgressUpdate, theme: Theme, context: RenderContext,
): Text {
  const agent = progress.agent ?? "general";
  const duration = liveDurationMs(agent, true, { durationMs: 0 }, progress, context);
  const stats = buildStatsLine({ toolCount: progress.toolCount, tokens: progress.tokens, durationMs: duration }, theme);
  const model = progress.model ? theme.fg("accent", " " + progress.model) : "";
  const line = `${compactGlyph("running", theme)} ${buildAgentLabel(agent, progress.task)}${model} ${stats}`;
  text.setText(line);
  return text;
}
