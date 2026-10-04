// pi-board: index.ts — extension entry.
// Zero-dependency blackboard workspace for pi: HTTP server + /board commands.
import type { ExtensionAPI, ExtensionCommandContext, ExtensionContext, SessionEntry } from "@earendil-works/pi-coding-agent";
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { spawn } from "node:child_process";
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import { basename, isAbsolute, join, normalize, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import {
  computeRegion,
  createEmptyState,
  hashContent,
  lineNumber,
  makeId,
  makeItem,
  normalizeText,
  parseLocator,
  MAX_ITEMS,
  MAX_REGIONS,
} from "./shared/board-model.js";
import { loadState, resolveStatePath, saveState } from "./shared/board-state.js";
import { assembleBoard } from "./shared/board-assembler.js";

interface HistoryItem {
  locator: string;
  kind: "reply" | "prompt";
  label: string;
  preview: string;
  content: string;
  ts: string;
}

// ── module-level state ────────────────────────────────────────────────
const BOARD_VERSION_LABEL = "v0.2.0";
let board = createEmptyState();
let statePath = resolveStatePath(process.cwd());
let cwd = process.cwd();
let server: Server | null = null;
let serverPromise: Promise<number> | null = null;
let serverPort = 0;
let lastPort = 0;
let history: HistoryItem[] = [];
let historyById = new Map<string, string>();
let lastReplyLocator: string | null = null;
let lastCtx: ExtensionCommandContext | null = null;
let piRef: ExtensionAPI | null = null;

// ── terminal / notification helpers ───────────────────────────────────
function terminalOut(text: string) {
  const stream = process.stderr && process.stderr.isTTY ? process.stderr : process.stdout;
  stream.write(text.endsWith("\n") ? text : text + "\n");
}

function notify(ctx: ExtensionCommandContext | null, message: string, type: "info" | "warning" | "error" = "info") {
  try {
    if (ctx && ctx.ui && typeof ctx.ui.notify === "function") ctx.ui.notify(message, type);
    else terminalOut(`[board] ${message}`);
  } catch {
    terminalOut(`[board] ${message}`);
  }
}

function persist() {
  saveState(board, statePath);
}

// ── history ───────────────────────────────────────────────────────────
function extractText(msg: { role?: string; content?: unknown }): string {
  const c = msg && msg.content;
  if (typeof c === "string") return normalizeText(c);
  if (Array.isArray(c)) {
    return c
      .filter((x) => x && typeof x === "object" && (x as any).type === "text" && typeof (x as any).text === "string")
      .map((x) => (x as any).text)
      .join("\n");
  }
  return "";
}

function short(text: string, max = 120): string {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  return t.length <= max ? t : t.slice(0, max - 1) + "…";
}

function buildHistory(entries: SessionEntry[], limit = 30): HistoryItem[] {
  const out: HistoryItem[] = [];
  const counts = new Map<string, number>();
  let replyN = 0;
  const push = (h: HistoryItem) => {
    out.push(h);
    if (out.length > limit) out.shift();
  };
  for (const entry of entries) {
    if (!entry || entry.type !== "message") continue;
    const msg = (entry as { message?: { role?: string; content?: unknown } }).message;
    if (!msg) continue;
    const role = msg.role;
    const text = extractText(msg);
    if (role === "user") {
      if (text) {
        push({
          locator: `prompt:${entry.id}`,
          kind: "prompt",
          label: `prompt (${short(text, 24)})`,
          preview: short(text),
          content: text,
          ts: String(entry.timestamp || ""),
        });
      }
      continue;
    }
    if (role === "assistant") {
      if (!text) continue;
      replyN++;
      const h = hashContent(text);
      const idx = counts.get(h) ?? 0;
      counts.set(h, idx + 1);
      push({
        locator: `reply:${h}-${idx}`,
        kind: "reply",
        label: `reply #${replyN}`,
        preview: short(text),
        content: text,
        ts: String(entry.timestamp || ""),
      });
    }
  }
  const lastReply = out.filter((x) => x.kind === "reply").pop();
  if (lastReply) lastReplyLocator = lastReply.locator;
  // git-log style: newest first
  return out.reverse();
}

function refreshHistory(ctx: ExtensionContext | null) {
  try {
    const entries = ctx && ctx.sessionManager ? ctx.sessionManager.getBranch() : [];
    history = buildHistory(entries);
    historyById = new Map(history.map((h) => [h.locator, h.content]));
  } catch {
    history = [];
    historyById = new Map();
  }
}

// ── file access (browser-safe: confined to cwd) ───────────────────────
function resolveInCwd(path: string): string | null {
  try {
    const base = realpathSync(cwd);
    const target = isAbsolute(path) ? normalize(path) : resolve(base, path);
    const rel = relative(base, target);
    if (rel.startsWith("..") || isAbsolute(rel)) return null;
    // Harden against symlink escape: the lexical path may be inside cwd while
    // the real (symlink-resolved) target lives outside. If the target exists,
    // re-check containment on its real path too.
    if (existsSync(target)) {
      const real = realpathSync(target);
      const relReal = relative(base, real);
      if (relReal.startsWith("..") || isAbsolute(relReal)) return null;
    }
    return target;
  } catch {
    return null;
  }
}

function readFileText(path: string): { content: string; ok: true } | { ok: false; error: string } {
  try {
    const st = statSync(path);
    if (!st.isFile()) return { ok: false, error: "not a file" };
    if (st.size > 2 * 1024 * 1024) return { ok: false, error: "file too large (>2MB)" };
    return { content: normalizeText(readFileSync(path, "utf8")), ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

function listTree(dirPath: string): { ok: true; dirs: { name: string; path: string }[]; files: { name: string; path: string }[] } | { ok: false; error: string } {
  try {
    const resolved = resolveInCwd(dirPath || ".");
    if (!resolved) return { ok: false, error: "path outside cwd" };
    const dirs: { name: string; path: string }[] = [];
    const files: { name: string; path: string }[] = [];
    const entries = readdirSync(resolved, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith(".")) continue;
      const full = join(resolved, e.name);
      const rel = relative(cwd, full) || e.name;
      try {
        if (e.isDirectory()) {
          dirs.push({ name: e.name, path: rel });
        } else if (e.isFile()) {
          files.push({ name: e.name, path: rel });
        }
      } catch {
        // unreadable entry: skip
      }
    }
    dirs.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));
    return { ok: true, dirs, files };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// ── items / content resolution ────────────────────────────────────────
function findItemByLocator(locator: string) {
  return board.items.find((i) => i.locator === locator);
}

function ensureItem(source: "file" | "reply" | "prompt" | "note", locator: string, content: string, label: string) {
  const existing = findItemByLocator(locator);
  if (existing) return existing;
  const item = makeItem(source, locator, label, content);
  board.items.push(item);
  trimItems();
  persist();
  return item;
}

function contentForItem(item: { source: string; locator: string; contentSnapshot?: string; edit?: { before: string; after: string } }): string {
  if (item.source === "file") {
    // Edits are not written to disk; use the in-memory edited buffer as the working copy.
    if (item.edit) return item.contentSnapshot || "";
    const resolved = resolveInCwd(item.locator);
    if (resolved) {
      const r = readFileText(resolved);
      if (r.ok) return r.content;
    }
  }
  return item.contentSnapshot || "";
}

/** Trim board to MAX_ITEMS (oldest dropped, along with their annotations). */
function trimItems() {
  if (board.items.length <= MAX_ITEMS) return;
  const removed = board.items.slice(0, board.items.length - MAX_ITEMS);
  const removedIds = new Set(removed.map((i) => i.id));
  board.items = board.items.slice(-MAX_ITEMS);
  board.annotations = board.annotations.filter((a) => !removedIds.has(a.itemId as string));
}

/** Re-anchor an item's annotations to `newContent` after an edit, using each region's quote. */
function reanchorAnnotations(itemId: string, newContent: string) {
  const src = normalizeText(newContent);
  for (const a of board.annotations) {
    if (a.itemId !== itemId || !a.region) continue;
    const quote = a.region.quote;
    if (!quote) continue;
    const idx = src.indexOf(quote);
    if (idx === -1) {
      a.region.ambiguous = true;
      continue;
    }
    a.region.lineRange = {
      start: lineNumber(src, idx),
      end: lineNumber(src, idx + quote.length - 1),
    };
    a.region.ambiguous = false;
  }
}

function resolveOpen(
  locatorIn: string,
  sourceIn?: string,
): { ok: true; itemId: string; source: "file" | "reply" | "prompt" | "note"; locator: string; label: string; content: string; contentHash: string } | { ok: false; error: string } {
  const parsed = parseLocator(locatorIn);
  if (!parsed) return { ok: false, error: `invalid locator: ${locatorIn}` };
  const source = (sourceIn as "file" | "reply" | "prompt" | "note") || parsed.source;

  if (source === "file") {
    const resolved = resolveInCwd(parsed.locator);
    if (!resolved) return { ok: false, error: "path outside cwd or not found" };
    const r = readFileText(resolved);
    if (!r.ok) return { ok: false, error: r.error };
    const item = ensureItem("file", parsed.locator, r.content, basename(parsed.locator));
    const working = item.edit ? (item.contentSnapshot || "") : r.content;
    return { ok: true, itemId: item.id, source: "file", locator: parsed.locator, label: item.label, content: working, contentHash: hashContent(working) };
  }

  if (source === "reply" || source === "prompt") {
    const locator = parsed.locator === "__last__" ? (lastReplyLocator || "") : parsed.locator;
    const content = historyById.get(locator) || "";
    if (!content) return { ok: false, error: `history message not found: ${locatorIn}` };
    const hist = history.find((h) => h.locator === locator);
    const label = hist ? hist.label : locator;
    const item = ensureItem(source, locator, content, label);
    return { ok: true, itemId: item.id, source, locator, label: item.label, content, contentHash: hashContent(content) };
  }

  if (source === "note") {
    const item = findItemByLocator(parsed.locator);
    if (!item) return { ok: false, error: `note not found: ${parsed.locator}` };
    return { ok: true, itemId: item.id, source: "note", locator: item.locator, label: item.label, content: item.contentSnapshot || "", contentHash: item.contentHash || "" };
  }

  return { ok: false, error: `unsupported source: ${source}` };
}

// ── HTTP helpers ──────────────────────────────────────────────────────
function sendJson(res: ServerResponse, code: number, payload: unknown) {
  const body = JSON.stringify(payload);
  res.writeHead(code, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(body);
}

function sendText(res: ServerResponse, code: number, body: string, contentType = "text/plain; charset=utf-8") {
  res.writeHead(code, { "content-type": contentType, "cache-control": "no-store" });
  res.end(body);
}

function authorized(_req: IncomingMessage): boolean {
  return true;
}

function readBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolveBody, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;
    const MAX_BODY = 5 * 1024 * 1024; // 5MB cap
    req.on("data", (c: Buffer) => {
      total += c.length;
      if (total > MAX_BODY) {
        reject(new Error("request body too large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolveBody(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

// ── actions (shared by HTTP and CLI) ──────────────────────────────────
async function handleAction(payload: any): Promise<{ ok: boolean; [k: string]: unknown }> {
  const action = String(payload?.action || "");
  try {
    switch (action) {
      case "open":
      case "load": {
        const r = resolveOpen(String(payload?.locator || ""), payload?.source);
        return r.ok ? { ok: true, ...r } : { ok: false, error: r.error };
      }
      case "unpin": {
        const itemId = String(payload?.itemId || "");
        const before = board.items.length;
        board.items = board.items.filter((i) => i.id !== itemId);
        board.annotations = board.annotations.filter((a) => a.itemId !== itemId);
        const removed = before - board.items.length;
        if (removed) persist();
        return { ok: true, removed };
      }
      case "note": {
        const text = normalizeText(String(payload?.text || "")).trim();
        if (!text) return { ok: false, error: "empty note" };
        const locator = `note:${makeId("note")}`;
        const item = makeItem("note", locator, short(text, 40), text);
        board.items.push(item);
        trimItems();
        persist();
        return { ok: true, itemId: item.id, locator, label: item.label };
      }
      case "annotate": {
        const itemId = String(payload?.itemId || "");
        const item = board.items.find((i) => i.id === itemId);
        if (!item) return { ok: false, error: "item not found" };
        // When `content` is supplied (Edit-mode comment), anchor to that buffer;
        // otherwise anchor to the live file / snapshot content.
        const hasSupplied = typeof payload?.content === "string";
        const supplied = hasSupplied ? normalizeText(payload.content) : "";
        const content = hasSupplied ? supplied : contentForItem(item);
        const ch = String(payload?.contentHash || "");
        if (ch && !hasSupplied && hashContent(content) !== ch) return { ok: false, error: "content changed (hash mismatch); reopen and retry" };
        const kind = String(payload?.kind || "comment");
        if (kind !== "comment") return { ok: false, error: `only kind=comment is supported, got: ${kind}` };
        const start = Math.max(0, Math.floor(Number(payload?.offsetStart) || 0));
        const end = Math.max(start, Math.floor(Number(payload?.offsetEnd) || start));
        const region = payload?.region || (start < end ? computeRegion(content, start, end) : undefined);
        board.annotations.push({
          id: makeId("an"),
          itemId,
          region,
          kind: "comment",
          text: normalizeText(String(payload?.text || "")).trim(),
          createdAt: Date.now(),
        });
        if (board.annotations.length > MAX_REGIONS) board.annotations = board.annotations.slice(-MAX_REGIONS);
        persist();
        return { ok: true, region: region || null };
      }
      case "update_annotation": {
        const id = String(payload?.annotationId || "");
        const a = board.annotations.find((x) => x.id === id);
        if (!a) return { ok: false, error: "annotation not found" };
        a.text = normalizeText(String(payload?.text || "")).trim();
        persist();
        return { ok: true };
      }
      case "delete_annotation": {
        const id = String(payload?.annotationId || "");
        const before = board.annotations.length;
        board.annotations = board.annotations.filter((x) => x.id !== id);
        const removed = before - board.annotations.length;
        if (removed) persist();
        return { ok: true, removed };
      }
      case "save_edit": {
        const itemId = String(payload?.itemId || "");
        const item = board.items.find((i) => i.id === itemId);
        if (!item) return { ok: false, error: "item not found" };
        if (item.source !== "file") return { ok: false, error: "edit is file-only" };
        const resolved = resolveInCwd(item.locator);
        if (!resolved) return { ok: false, error: "path outside cwd" };
        const next = normalizeText(String(payload?.content ?? ""));
        const diskBefore = contentForItem(item);
        const baseline = item.edit ? item.edit.before : (item.contentSnapshot || diskBefore);
        item.edit = { before: baseline, after: next };
        item.contentSnapshot = next;
        item.contentHash = hashContent(next);
        reanchorAnnotations(itemId, next);
        persist();
        return { ok: true, message: "已生成 diff（未写盘）", contentHash: item.contentHash };
      }
      case "revert_edit": {
        const itemId = String(payload?.itemId || "");
        const item = board.items.find((i) => i.id === itemId);
        if (!item) return { ok: false, error: "item not found" };
        if (!item.edit) return { ok: false, error: "no edit to revert" };
        const before = item.edit.before;
        const resolved = resolveInCwd(item.locator);
        if (!resolved) return { ok: false, error: "path outside cwd" };
        item.edit = undefined;
        item.contentSnapshot = normalizeText(before);
        item.contentHash = hashContent(before);
        reanchorAnnotations(itemId, item.contentSnapshot);
        persist();
        return { ok: true, message: "已撤销（未写盘）", content: item.contentSnapshot, contentHash: item.contentHash };
      }
      case "set_appendix": {
        board.appendix = normalizeText(String(payload?.text || ""));
        persist();
        return { ok: true };
      }
      case "preview": {
        const text = assembleBoard(board, { resolveContent: contentForItem });
        return { ok: true, text };
      }
      case "send": {
        const explicit = typeof payload?.text === "string" ? normalizeText(payload.text).trim() : "";
        const text = explicit || assembleBoard(board, { resolveContent: contentForItem });
        const appendix = typeof payload?.appendix === "string"
          ? normalizeText(payload.appendix).trim()
          : normalizeText(board.appendix).trim();
        const body = appendix ? text + "\n\n# 追加\n" + appendix : text;
        if (!body.trim()) return { ok: false, error: "board is empty" };
        if (piRef && typeof piRef.sendUserMessage === "function") {
          piRef.sendUserMessage(body);
          // annotations (and legacy appendix) are consumed by the send; reset for next round (keep pinned items)
          board.annotations = [];
          board.appendix = "";
          persist();
          return { ok: true, message: "已发送（注释与追加已清空）" };
        }
        return { ok: false, error: "pi.sendUserMessage unavailable" };
      }
      case "clear": {
        board = createEmptyState();
        persist();
        return { ok: true, message: "board cleared" };
      }
      default:
        return { ok: false, error: `unknown action: ${action}` };
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// ── static assets ─────────────────────────────────────────────────────
const HERE_DIR = (() => {
  try {
    return fileURLToPath(new URL(".", import.meta.url));
  } catch {
    return process.cwd() + sep;
  }
})();
const CSS_CONTENT = readStatic("client/board.css");
const CLIENT_JS_CONTENT = readStatic("client/board-client.js");
function readStatic(rel: string): string {
  try {
    return readFileSync(join(HERE_DIR, rel), "utf8");
  } catch {
    return "";
  }
}

// ── HTML page ─────────────────────────────────────────────────────────
const HTML_PAGE = `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>pi-board</title>
<link rel="stylesheet" href="/board.css__TOKEN__">
</head>
<body>
<header class="topbar">
  <button id="leftRailBtn" class="rail-toggle" title="隐藏左栏" aria-label="切换左栏">◧</button>
  <div class="top-left">
    <h1>pi-board</h1>
    <span class="summary" id="boardSummary"></span>
  </div>
  <span class="top-status" id="statusLine"></span>
  <div class="toolbar">
    <button id="refreshBtn" title="刷新历史/状态">刷新</button>
    <button id="clearBtn" class="danger" title="清空整块板">Clear</button>
    <button id="themeBtn" title="切换暗色/亮色">☀️</button>
  </div>
  <button id="rightRailBtn" class="rail-toggle" title="隐藏右栏" aria-label="切换右栏">◨</button>
</header>

<main class="workspace">
  <aside class="sources">
    <nav class="tabs">
      <button class="tab active" data-tab="board">板</button>
      <button class="tab" data-tab="files">文件</button>
      <button class="tab" data-tab="history">历史</button>
    </nav>

    <section class="pane" id="pane-board">
      <ul class="board-items" id="boardItems"></ul>
    </section>

    <section class="pane" id="pane-files" hidden>
      <form class="quick-open" id="filesOpenForm">
        <input id="filesPath" placeholder="路径，回车打开/上板" autocomplete="off">
      </form>
      <ul class="tree" id="filesTree"></ul>
    </section>

    <section class="pane" id="pane-history" hidden>
      <form class="quick-open">
        <input id="historyFilter" placeholder="过滤消息（回复/提示）" autocomplete="off">
      </form>
      <ul class="messages" id="historyMessages"></ul>
    </section>
  </aside>

  <section class="viewer">
    <header class="viewer-head">
      <button id="promptBtn" class="pane-toggle" title="打开 prompt 面板">prompt</button>
      <span class="viewer-title" id="viewerTitle">（未打开文件/消息）</span>
      <div class="view-toggle" id="viewToggle">
        <button id="rawBtn" class="active">Raw</button>
        <button id="previewBtn">Preview</button>
        <button id="editBtn" hidden>Edit</button>
      </div>
      <div class="assembly-actions" id="assemblyActions" hidden>
        <button id="assemblyRefreshBtn">刷新 prompt</button>
        <button id="sendBtn">发送</button>
      </div>
    </header>
    <div class="viewer-raw" id="viewerRaw">
      <pre class="gutter" id="gutter"></pre>
      <pre class="backdrop" id="backdrop"><code id="backdropCode"></code></pre>
      <textarea class="raw" id="raw" readonly spellcheck="false" wrap="off"></textarea>
    </div>
    <iframe class="preview" id="preview" sandbox="" hidden></iframe>

    <section class="viewer-edit" id="viewerEdit" hidden>
      <div class="edit-toolbar">
        <span class="edit-hint">Edit 模式：编辑不写盘，保存后仅生成 diff 随 prompt 发送。</span>
        <button id="editSaveBtn">生成 diff</button>
        <button id="editRevertBtn" class="danger">撤销</button>
      </div>
      <textarea id="editText" spellcheck="false" wrap="off"></textarea>
    </section>

    <section class="viewer-assembly" id="viewerAssembly" hidden>
      <textarea id="assemblyText" spellcheck="false" placeholder="完整 prompt，可直接修改后发送"></textarea>
      <div class="appendix-toolbar"><span>追加内容</span></div>
      <textarea id="appendixText" placeholder="单独编辑的追加内容，不会被刷新覆盖"></textarea>
    </section>
  </section>

  <aside class="comments">
    <form class="composer" id="annotateForm">
      <label>注释</label>
      <textarea id="annotateText" placeholder="选中原文后填写；不选中 = 注释整个文件/消息"></textarea>
      <button type="submit">添加</button>
    </form>
    <h2>注释</h2>
    <ul id="annotationsRail"></ul>
  </aside>
</main>

<script src="/board-client.js__TOKEN__"></script>
</body>
</html>`;

// ── HTTP request handling ─────────────────────────────────────────────
function handleHttp(req: IncomingMessage, res: ServerResponse) {
  const url = (req.url || "").split("?")[0];
  if (!authorized(req)) return sendJson(res, 401, { ok: false, error: "unauthorized" });

  if (req.method === "GET" && url === "/") {
    return sendText(res, 200, HTML_PAGE.replace(/__TOKEN__/g, ""), "text/html; charset=utf-8");
  }
  if (req.method === "GET" && url === "/board.css") return sendText(res, 200, CSS_CONTENT, "text/css; charset=utf-8");
  if (req.method === "GET" && url === "/board-client.js") return sendText(res, 200, CLIENT_JS_CONTENT, "application/javascript; charset=utf-8");

  if (req.method === "GET" && url === "/state") {
    refreshHistory(lastCtx);
    return sendJson(res, 200, {
      ok: true,
      items: board.items.map((i) => ({
        id: i.id,
        source: i.source,
        locator: i.locator,
        label: i.label,
        pinnedAt: i.pinnedAt,
        edit: i.edit ? true : undefined,
      })),
      annotations: board.annotations,
      history: history.map((h) => ({ locator: h.locator, kind: h.kind, label: h.label, preview: h.preview, ts: h.ts })),
      appendix: board.appendix,
    });
  }

  if (req.method === "GET" && url === "/tree") {
    const q = new URLSearchParams((req.url || "").split("?")[1] || "");
    const path = q.get("path") || "";
    const r = listTree(path);
    return sendJson(res, r.ok ? 200 : 400, r);
  }

  if (req.method === "POST" && url === "/action") {
    readBody(req)
      .then((payload) => handleAction(payload))
      .then((result) => sendJson(res, result.ok ? 200 : 400, result))
      .catch((e) => sendJson(res, 400, { ok: false, error: e instanceof Error ? e.message : String(e) }));
    return;
  }

  sendJson(res, 404, { ok: false, error: "not found" });
}

function startServer(portHint: number): Promise<number> {
  if (server) return Promise.resolve(serverPort);
  if (serverPromise) return serverPromise;
  serverPromise = new Promise((resolveStart, reject) => {
    const s = createServer(handleHttp);
    s.on("error", (e) => {
      serverPromise = null;
      reject(e);
    });
    s.listen(portHint || lastPort || 0, "127.0.0.1", () => {
      const addr = s.address();
      server = s;
      serverPort = typeof addr === "object" && addr ? addr.port : (portHint || lastPort || 0);
      lastPort = serverPort;
      resolveStart(serverPort);
    });
  });
  return serverPromise;
}

function stopServer() {
  if (server) {
    server.close();
    server = null;
    serverPromise = null;
    serverPort = 0;
  }
}

function buildBoardUrl(p: number): string {
  return `http://127.0.0.1:${p}/`;
}

function openBrowser(url: string) {
  const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  try {
    spawn(cmd, [url], { stdio: "ignore", detached: true }).unref();
  } catch {
    // best effort
  }
}

// ── /board command ────────────────────────────────────────────────────
async function handleBoardCommand(args: string, ctx: ExtensionCommandContext) {
  lastCtx = ctx;
  cwd = ctx.cwd || process.cwd();
  statePath = resolveStatePath(cwd);
  refreshHistory(ctx);
  const cmd = args.trim().split(/\s+/)[0] || "";

  if (cmd && !["stop", "refresh"].includes(cmd)) {
    notify(ctx, `unknown command: ${cmd} — usage: /board [refresh|stop]`, "warning");
    return;
  }

  if (cmd === "stop") { stopServer(); notify(ctx, "Stopped board server."); return; }

  if (cmd === "refresh") {
    refreshHistory(ctx);
    stopServer();
    notify(ctx, "board refresh: server stopped, reloading runtime…");
    await ctx.reload();
    return;
  }

  // default: open the board
  const portHint = Number(process.env.PI_BOARD_PORT) || 0;
  let p = serverPort;
  if (!server) {
    try {
      p = await startServer(portHint);
    } catch (e) {
      notify(ctx, `server failed: ${e instanceof Error ? e.message : String(e)}`, "error");
      return;
    }
  }
  const url = buildBoardUrl(p);
  notify(ctx, `Board: ${url}`);
  openBrowser(url);
}

// ── export ────────────────────────────────────────────────────────────
export default function (pi: ExtensionAPI) {
  piRef = pi;
  const loaded = loadState(statePath);
  board = loaded.state;
  statePath = loaded.filePath;
  if (loaded.fromBackup) terminalOut("[board] restored state from .bak backup");
  if (!loaded.restored) terminalOut("[board] no saved board; starting empty");

  pi.registerCommand("board", {
    description: "Blackboard workspace: /board (open), /board refresh, /board stop",
    getArgumentCompletions: (prefix: string) => {
      const items = [
        { value: "refresh", label: "refresh", description: "重启服务器并热重载" },
        { value: "stop", label: "stop", description: "停止服务器" },
      ];
      const filtered = items.filter((i) => i.value.startsWith(prefix));
      return filtered.length ? filtered : null;
    },
    handler: async (args: string, ctx: ExtensionCommandContext) => {
      await handleBoardCommand(args, ctx);
    },
  });

  pi.on("session_shutdown", () => {
    stopServer();
  });
  pi.on("turn_end", (_event, ctx) => {
    lastCtx = ctx as ExtensionCommandContext;
    refreshHistory(ctx);
  });
  pi.on("session_start", (event, ctx) => {
    lastCtx = ctx as ExtensionCommandContext;
    lastReplyLocator = null; // don't leak --last across sessions
    refreshHistory(ctx);
    // A reload is an explicit refresh: restart the board server so the new
    // code is live. Normal session start does not auto-start the server.
    if (event && (event as any).reason === "reload") {
      const portHint = Number(process.env.PI_BOARD_PORT) || lastPort || 0;
      startServer(portHint)
        .then((p) => {
          terminalOut(`[board] port=${p}`);
          terminalOut(`[board] url=${buildBoardUrl(p)}`);
        })
        .catch((e) => terminalOut(`[board] server failed: ${e instanceof Error ? e.message : String(e)}`));
    }
  });
}
