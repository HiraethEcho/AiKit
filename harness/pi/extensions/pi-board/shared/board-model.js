// pi-board: shared/board-model.js
// Pure data-model helpers: types (JSDoc), normalization, locator parsing,
// offset->lineRange+quote region computation, quote uniqueness fallback,
// and a minimal unified line diff for file edits.
// Zero dependencies (node:crypto only).

import { createHash } from "node:crypto";

/** @typedef {"file"|"reply"|"prompt"|"note"} BoardSourceKind */

/** @typedef {{ start: number, end: number }} LineRange */

/** @typedef {{ lineRange?: LineRange, quote?: string, ambiguous?: boolean }} BoardRegion */

/**
 * @typedef {Object} BoardItem
 * @property {string} id
 * @property {BoardSourceKind} source
 * @property {string} locator
 * @property {string} label
 * @property {string} [contentSnapshot]
 * @property {string} [contentHash]
 * @property {number} pinnedAt
 * @property {{ before: string, after: string }} [edit]  file items only: user's edit
 */

/**
 * @typedef {Object} BoardAnnotation
 * @property {string} id
 * @property {string} [itemId]
 * @property {BoardRegion} [region]
 * @property {"comment"} kind
 * @property {string} text
 * @property {number} createdAt
 */

/**
 * @typedef {Object} BoardState
 * @property {1} version
 * @property {BoardItem[]} items
 * @property {BoardAnnotation[]} annotations
 * @property {string} appendix 自由文本，prompt 时附加在末尾
 */

export const BOARD_VERSION = 1;
export const MAX_ITEMS = 20;
export const MAX_REGIONS = 50;
export const SNIPPET_CONTEXT_LINES = 10;
/** 注释 kind：只支持 comment。 */
export const ANNOTATION_KINDS = ["comment"];

export function hashContent(text) {
  return createHash("sha256").update(String(text ?? "")).digest("hex").slice(0, 16);
}

/** Normalize CRLF/CR to LF; offsets from the UI are relative to this exact string. */
export function normalizeText(text) {
  return String(text ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

export function makeId(prefix) {
  const rand = createHash("sha256").update(Math.random().toString() + Date.now().toString()).digest("hex").slice(0, 12);
  return `${prefix}_${rand}`;
}

/** 1-based line number of the given offset (offset at index 0 = line 1). */
export function lineNumber(text, offset) {
  const o = Math.max(0, Math.min(offset, text.length));
  let line = 1;
  for (let i = 0; i < o; i++) if (text[i] === "\n") line++;
  return line;
}

export function countOccurrences(text, sub) {
  if (!sub) return 0;
  let n = 0;
  let idx = 0;
  while ((idx = text.indexOf(sub, idx)) !== -1) {
    n++;
    idx += sub.length;
  }
  return n;
}

/**
 * Extend `base` (a substring of text) to surrounding lines until it is unique
 * in `text`, up to `maxExtendLines`. Returns { quote, ambiguous }.
 */
export function findUniqueQuote(text, base, maxExtendLines = 3) {
  const src = String(text ?? "");
  let quote = String(base ?? "");
  let occ = countOccurrences(src, quote);
  if (occ <= 1) return { quote, ambiguous: false };
  const idx = src.indexOf(quote);
  if (idx === -1) return { quote, ambiguous: true };
  let start = idx;
  let end = idx + quote.length;
  let extended = 1;
  while (occ > 1 && extended < maxExtendLines) {
    const prevNL = src.lastIndexOf("\n", start - 1);
    const nextNL = src.indexOf("\n", end);
    const newStart = prevNL === -1 ? 0 : prevNL + 1;
    const newEnd = nextNL === -1 ? src.length : nextNL;
    if (newStart === start && newEnd === end) break;
    start = newStart;
    end = newEnd;
    extended++;
    quote = src.slice(start, end).trim();
    occ = countOccurrences(src, quote);
  }
  return { quote, ambiguous: occ > 1 };
}

/** Compute a region from character offsets into `text` (the exact served content). */
export function computeRegion(text, offsetStart, offsetEnd) {
  const src = normalizeText(text);
  const start = Math.max(0, Math.min(Math.floor(Number(offsetStart) || 0), src.length));
  const end = Math.max(start, Math.min(Math.floor(Number(offsetEnd) || start), src.length));
  const lineRange = {
    start: lineNumber(src, start),
    end: end > start ? lineNumber(src, end - 1) : lineNumber(src, start),
  };
  const base = src.slice(start, end);
  const { quote, ambiguous } = findUniqueQuote(src, base);
  return { lineRange, quote, ambiguous };
}

/**
 * Parse a locator string.
 *   reply:<id> | prompt:<id> | note:<id> | <path> | --last
 * Returns { source, locator } or null.
 */
export function parseLocator(raw) {
  const str = String(raw ?? "").trim();
  if (!str) return null;
  if (str === "--last") return { source: "reply", locator: "__last__" };

  const kindMatch = str.match(/^(reply|prompt|note):(.+)$/);
  if (kindMatch) {
    return { source: kindMatch[1], locator: str };
  }
  return { source: "file", locator: str };
}

export function makeItem(source, locator, label, contentSnapshot) {
  return {
    id: makeId("item"),
    source,
    locator,
    label,
    contentSnapshot: contentSnapshot ?? "",
    contentHash: contentSnapshot ? hashContent(contentSnapshot) : undefined,
    pinnedAt: Date.now(),
  };
}

export function normalizeLineRange(v) {
  if (!v || typeof v !== "object") return undefined;
  const start = Math.max(1, Math.floor(Number(v.start) || 1));
  const end = Math.max(start, Math.floor(Number(v.end) || start));
  return { start, end };
}

export function normalizeRegion(v) {
  if (!v || typeof v !== "object") return undefined;
  const region = {};
  const lr = normalizeLineRange(v.lineRange);
  if (lr) region.lineRange = lr;
  if (typeof v.quote === "string") region.quote = v.quote;
  if (v.ambiguous === true) region.ambiguous = true;
  return Object.keys(region).length ? region : undefined;
}

export function normalizeItem(raw) {
  if (!raw || typeof raw !== "object") return null;
  const source = String(raw.source || "file");
  if (!["file", "reply", "prompt", "note"].includes(source)) return null;
  const locator = String(raw.locator || "");
  if (!locator) return null;
  const edit = raw.edit && typeof raw.edit === "object" && typeof raw.edit.before === "string" && typeof raw.edit.after === "string"
    ? { before: raw.edit.before, after: raw.edit.after }
    : undefined;
  return {
    id: String(raw.id || makeId("item")),
    source,
    locator,
    label: String(raw.label || locator),
    contentSnapshot: typeof raw.contentSnapshot === "string" ? raw.contentSnapshot : "",
    contentHash: typeof raw.contentHash === "string" ? raw.contentHash : undefined,
    pinnedAt: Number(raw.pinnedAt) || Date.now(),
    edit,
  };
}

export function normalizeAnnotation(raw) {
  if (!raw || typeof raw !== "object") return null;
  const kind = String(raw.kind || "comment");
  if (!ANNOTATION_KINDS.includes(kind)) return null;
  const region = normalizeRegion(raw.region);
  return {
    id: String(raw.id || makeId("an")),
    itemId: typeof raw.itemId === "string" && raw.itemId ? raw.itemId : undefined,
    region,
    kind: "comment",
    text: String(raw.text || ""),
    createdAt: Number(raw.createdAt) || Date.now(),
  };
}

export function normalizeState(raw) {
  if (!raw || typeof raw !== "object") return null;
  const items = Array.isArray(raw.items)
    ? raw.items.map(normalizeItem).filter(Boolean)
    : [];
  const itemIds = new Set(items.map((i) => i.id));
  const annotations = Array.isArray(raw.annotations)
    ? raw.annotations.map(normalizeAnnotation).filter((a) => a && (!a.itemId || itemIds.has(a.itemId)))
    : [];
  return {
    version: BOARD_VERSION,
    items,
    annotations,
    appendix: typeof raw.appendix === "string" ? raw.appendix : "",
  };
}

export function createEmptyState() {
  return { version: BOARD_VERSION, items: [], annotations: [], appendix: "" };
}

// ── minimal unified line diff (for file edits) ──────────────────────

/**
 * LCS-based line diff. Returns an array of { t: "eq"|"del"|"ins", line } or
 * null when the input is too large for the DP table.
 */
export function diffLines(before, after, maxCells = 400000) {
  const a = String(before ?? "").split("\n");
  const b = String(after ?? "").split("\n");
  const n = a.length, m = b.length;
  if (n * m > maxCells) return null;
  const W = m + 1;
  const dp = new Uint32Array((n + 1) * W);
  const at = (i, j) => i * W + j;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[at(i, j)] = a[i] === b[j]
        ? dp[at(i + 1, j + 1)] + 1
        : Math.max(dp[at(i + 1, j)], dp[at(i, j + 1)]);
    }
  }
  const ops = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { ops.push({ t: "eq", line: a[i] }); i++; j++; }
    else if (dp[at(i + 1, j)] >= dp[at(i, j + 1)]) { ops.push({ t: "del", line: a[i] }); i++; }
    else { ops.push({ t: "ins", line: b[j] }); j++; }
  }
  while (i < n) { ops.push({ t: "del", line: a[i] }); i++; }
  while (j < m) { ops.push({ t: "ins", line: b[j] }); j++; }
  // Drop the artificial empty context line produced when both strings end with "\n".
  if (ops.length && ops[ops.length - 1].t === "eq" && ops[ops.length - 1].line === "") ops.pop();
  return ops;
}

/**
 * Render a unified-style diff. Returns a string, or null when too large to diff.
 */
export function renderUnifiedDiff(before, after, context = 3, maxCells = 400000) {
  const ops = diffLines(before, after, maxCells);
  if (!ops) return null;
  // number the ops: track old/new line numbers
  let oldLine = 1, newLine = 1;
  const numbered = ops.map((op) => {
    if (op.t === "eq") {
      const r = { t: op.t, line: op.line, old: oldLine, new: newLine };
      oldLine++; newLine++;
      return r;
    }
    if (op.t === "del") {
      const r = { t: op.t, line: op.line, old: oldLine, new: null };
      oldLine++;
      return r;
    }
    const r = { t: op.t, line: op.line, old: null, new: newLine };
    newLine++;
    return r;
  });

  // group into hunks separated by >= 2*context equal lines
  const hunks = [];
  let cur = [];
  let pendingEq = [];
  const flushEq = () => {
    // keep up to `context` equal lines as trailing context
    const keep = pendingEq.slice(-context);
    cur = cur.concat(keep);
    pendingEq = [];
  };
  const startHunk = () => { if (cur.length) hunks.push(cur); cur = []; pendingEq = []; };
  for (const op of numbered) {
    if (op.t === "eq") {
      pendingEq.push(op);
      if (pendingEq.length > context * 2) {
        // emit a hunk: current + first `context` of pendingEq
        cur = cur.concat(pendingEq.slice(0, context));
        hunks.push(cur);
        cur = [];
        pendingEq = pendingEq.slice(context);
      }
    } else {
      flushEq();
      cur.push(op);
    }
  }
  flushEq();
  if (cur.length) hunks.push(cur);

  if (hunks.length === 0) return "（无差异）";

  const out = [];
  out.push("```diff");
  for (const hunk of hunks) {
    const firstOld = hunk.find((o) => o.old !== null)?.old ?? (hunk[0].new ?? 0);
    const firstNew = hunk.find((o) => o.new !== null)?.new ?? (hunk[0].old ?? 0);
    out.push(`@@ -${firstOld} +${firstNew} @@`);
    for (const op of hunk) {
      if (op.t === "eq") {
        // Skip blank context lines for a more compact assembly diff.
        if (op.line !== "") out.push(` ${op.line}`);
      } else if (op.t === "del") out.push(`-${op.line}`);
      else out.push(`+${op.line}`);
    }
  }
  out.push("```");
  return out.join("\n");
}
