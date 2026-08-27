// pi-board: shared/board-assembler.js
// Renders BoardState into a compact, self-contained prompt sent to the model.
// Simplified output: grouped by source, annotations inline, files use comments/diff.

import { SNIPPET_CONTEXT_LINES, normalizeText, renderUnifiedDiff } from "./board-model.js";

function itemDisplay(item) {
  // labels are already friendly: file = basename, reply/prompt/note = short text
  return item.label || item.locator;
}

/** Short non-file label used in grouped assembly: "reply #3" -> "#3". */
function shortItemLabel(item) {
  return itemDisplay(item).replace(/^(?:reply|prompt)\s+/, "");
}

/** Union of line ranges for an item (from its annotations). */
function regionRangesFor(itemId, annotations) {
  const ranges = [];
  for (const a of annotations) {
    if (a.itemId === itemId && a.region && a.region.lineRange) ranges.push(a.region.lineRange);
  }
  ranges.sort((x, y) => x.start - y.start || x.end - y.end);
  const merged = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r.start <= last.end + 1) last.end = Math.max(last.end, r.end);
    else merged.push({ start: r.start, end: r.end });
  }
  return merged;
}

/** Build the snippet content for one item (snippet is the only mode). */
function snippetBlock(item, content, annotations) {
  const src = normalizeText(content);
  if (!src) return "";
  const lines = src.split("\n");
  const ranges = regionRangesFor(item.id, annotations);
  if (!ranges.length) {
    const head = lines.slice(0, SNIPPET_CONTEXT_LINES);
    const more = lines.length > SNIPPET_CONTEXT_LINES ? "\n... (truncated)" : "";
    return head.join("\n") + more;
  }
  const ctx = 3;
  const selected = new Set();
  for (const r of ranges) {
    for (let i = Math.max(0, r.start - 1 - ctx); i < Math.min(lines.length, r.end + ctx); i++) selected.add(i);
  }
  const idx = [...selected].sort((a, b) => a - b);
  const out = [];
  let prev = -2;
  for (const i of idx) {
    if (prev >= 0 && i - prev > 1) out.push("...");
    out.push(lines[i]);
    prev = i;
  }
  return out.join("\n");
}

function annotationsFor(itemId, annotations) {
  return annotations.filter((a) => a.itemId === itemId);
}

function annotationLocator(a, state) {
  const item = state.items.find((x) => x.id === a.itemId);
  const base = item ? (item.source === "file" ? itemDisplay(item) : shortItemLabel(item)) : (a.itemId || "?");
  if (a.region && a.region.lineRange) {
    const r = a.region.lineRange;
    return `${base}:${r.start === r.end ? r.start : `${r.start}-${r.end}`}`;
  }
  return base;
}

const SOURCE_HEADINGS = {
  file: "file",
  reply: "reply",
  prompt: "prompt",
  note: "note",
};

function sourceHeading(source) {
  return SOURCE_HEADINGS[source] || source || "?";
}

/**
 * Assemble BoardState into a compact markdown prompt.
 * @param {import("./board-model.js").BoardState} state
 * @param {{ resolveContent?: (item: import("./board-model.js").BoardItem) => string|null }} opts
 */
export function assembleBoard(state, opts = {}) {
  const resolveContent = opts.resolveContent || (() => null);
  const L = [];

  // Group items by source, preserving first-seen order.
  const groups = new Map();
  for (const item of state.items) {
    if (!groups.has(item.source)) groups.set(item.source, []);
    groups.get(item.source).push(item);
  }

  for (const [source, groupItems] of groups) {
    // History messages only appear when commented; files only when commented or edited.
    let items = groupItems;
    if (source === "reply" || source === "prompt") {
      items = groupItems.filter((item) => annotationsFor(item.id, state.annotations).length > 0);
      if (!items.length) continue;
    }
    if (source === "file") {
      items = groupItems.filter((item) => annotationsFor(item.id, state.annotations).length > 0 || Boolean(item.edit));
      if (!items.length) continue;
    }

    L.push(`# ${sourceHeading(source)}`);

    if (source === "file") {
      for (const item of items) {
        L.push(`## ${itemDisplay(item)}`);
        const anns = annotationsFor(item.id, state.annotations);
        if (anns.length) {
          L.push("### comments");
          for (const a of anns) {
            L.push(`- ${annotationLocator(a, state)} — [comment] ${a.text}`);
          }
        }

        if (item.edit) {
          const diff = renderUnifiedDiff(item.edit.before, item.edit.after);
          L.push("### diff");
          L.push("apply following diff");
          if (diff) {
            L.push(diff);
          } else {
            L.push("```text");
            L.push("（文件较大，diff 省略，当前内容 snippet 如下）");
            L.push(snippetBlock(item, item.edit.after, state.annotations));
            L.push("```");
          }
        } else {
          // Only include content when there is a region-specific annotation;
          // whole-file comments don't need the file content in the prompt.
          const hasRegionAnn = anns.some((a) => a.region && a.region.lineRange);
          if (hasRegionAnn) {
            const content = resolveContent(item) ?? item.contentSnapshot ?? "";
            L.push("### content");
            L.push("```text");
            L.push(snippetBlock(item, content, state.annotations));
            L.push("```");
          }
        }
      }
      continue;
    }

    // Non-file sources: reply / prompt / note
    const multi = items.length > 1;
    for (const item of items) {
      if (multi) {
        L.push(`## ${shortItemLabel(item)}`);
      }
      const anns = annotationsFor(item.id, state.annotations);
      for (const a of anns) {
        L.push(`- ${annotationLocator(a, state)} — [comment] ${a.text}`);
      }
      const content = resolveContent(item) ?? item.contentSnapshot ?? "";
      if (content) {
        L.push("```text");
        L.push(snippetBlock(item, content, state.annotations));
        L.push("```");
      }
    }
  }

  return L.join("\n");
}
