// ── Render routing for subagent results ────────────────────────────────

import { Text } from "@earendil-works/pi-tui";
import type { SubagentDetails, SubagentToolResult } from "./types.js";
import { renderCompactSingle, renderCompactParallel, renderCompactProgress } from "./compact.js";
import { renderExpanded, buildExpandedText } from "./expanded.js";

type Theme = { fg: (token: string, text: string) => string; bold: (text: string) => string };
type RenderContext = { expanded: boolean; state: Record<string, unknown>; invalidate: () => void };

export function renderSubagentResult(
  text: Text, result: SubagentToolResult, expanded: boolean, theme: Theme, context: RenderContext,
): Text {
  const details: SubagentDetails | undefined = result.details;
  if (!details) { text.setText(theme.fg("dim", "  no results")); return text; }

  // ── No results yet ─────────────────────────────────────────────────
  if (details.results.length === 0) {
    // ── Streaming progress (progress has data) ────────────────────
    if (details.progress && details.progress.length > 0) {
      if (details.progress.length === 1) {
        return renderCompactProgress(text, details.progress[0]!, theme, context);
      }
      const lines = details.progress.map(p => {
        const glyph = theme.fg("muted", "↳");
        const stats = p.toolCount > 0 ? `  ${p.toolCount} tools · ${Math.round(p.durationMs / 1000)}s` : "";
        return `${glyph} ${p.agent}: ${p.task}${stats}`;
      });
      text.setText(lines.join("\n"));
      return text;
    }
    text.setText(theme.fg("dim", "  no results"));
    return text;
  }

  // ── Single agent ─────────────────────────────────────────────────────
  if (details.mode === "single" || details.results.length === 1) {
    const result = details.results[0]!;
    const progress = details.progress?.[0];
    if (expanded) return renderExpanded(text, result, progress, theme);
    return renderCompactSingle(text, result, progress, theme, context);
  }

  // ── Parallel agents ──────────────────────────────────────────────────
  if (expanded) {
    const lines = details.results.map((r, i) =>
      buildExpandedText(r, details.progress?.[i], theme));
    text.setText(lines.join("\n\n"));
    return text;
  }
  return renderCompactParallel(text, details, theme, context);
}
