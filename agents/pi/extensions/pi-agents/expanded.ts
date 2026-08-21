// ── Expanded rendering for subagent results ─────────────────────────────

import { Text } from "@earendil-works/pi-tui";
import type { ProgressUpdate, SubagentResult } from "./types.js";
import { formatTokens, formatDuration, buildAgentLabel } from "./format.js";

type Theme = { fg: (token: string, text: string) => string; bold: (text: string) => string };

export function buildExpandedText(
  result: SubagentResult,
  progress: ProgressUpdate | undefined,
  theme: Theme,
): string {
  const lines: string[] = [];
  lines.push(buildAgentLabel(result.agent, result.task));
  lines.push("");

  // Stats line
  const summary = result.progressSummary ?? { toolCount: 0, tokens: 0, durationMs: 0 };
  const statsParts: string[] = [];
  if (result.model) statsParts.push(theme.fg("accent", result.model));
  if (summary.toolCount > 0) statsParts.push(summary.toolCount + " tools");
  if (summary.tokens > 0) statsParts.push(formatTokens(summary.tokens) + " tok");
  if (summary.durationMs > 0) statsParts.push(formatDuration(summary.durationMs));
  lines.push(statsParts.join(" · "));

  // Output
  const output = result.finalOutput;
  if (output) {
    lines.push("");
    lines.push(output);
  }

  // Error or status
  if (result.error) {
    lines.push("");
    lines.push(theme.fg("error", "✗ " + result.error));
  } else if (result.exitCode === 0) {
    lines.push("");
    lines.push(theme.fg("success", "✓ Done"));
  } else {
    lines.push("");
    lines.push(theme.fg("error", "✗ Failed"));
  }

  return lines.join("\n");
}

export function renderExpanded(
  text: Text,
  result: SubagentResult,
  progress: ProgressUpdate | undefined,
  theme: Theme,
): Text {
  text.setText(buildExpandedText(result, progress, theme));
  return text;
}
