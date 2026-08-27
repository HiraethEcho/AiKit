/**
 * MCP-stdio bridge for the Pi Coding Agent extension.
 *
 * Spawns server.bundle.mjs as a stdio child, performs MCP handshake,
 * and registers each returned tool through pi.registerTool().
 *
 * Inlines runtime detection + env scrub helpers from context-mode.
 * No external deps beyond node builtins.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawn, execSync } from "node:child_process";

// ── Fork-bomb prevention (#516) ──────────────────────────────
const PI_BINARY_BASENAME = /^pi(\.exe)?$/i;
const BRIDGE_DEPTH_ENV = "CONTEXT_MODE_BRIDGE_DEPTH";
const isWindows = process.platform === "win32";

function basename(p) {
    const segs = p.split(/[\\/]/);
    return segs[segs.length - 1] ?? "";
}
function whichOnPath(cmd) {
    try {
        const probe = isWindows ? `where ${cmd}` : `command -v ${cmd}`;
        const out = execSync(probe, { encoding: "utf-8", stdio: "pipe" }).trim().split(/\r?\n/)[0]?.trim();
        return out && out.length > 0 ? out : null;
    } catch { return null; }
}

// ── Runtime detection (from context-mode/build/runtime.js) ──
const BUN_BASENAME = /^bun(\.exe)?$/i;
const JS_RUNTIMES = new Set(["node", "bun", "deno"]);

export function detectRuntimes() {
    const runtimes = {};
    // Detect node
    try {
        const out = execSync("node --version", { encoding: "utf-8", stdio: "pipe" }).trim();
        runtimes.javascript = "node";
        runtimes.nodeVersion = out;
    } catch { /* not available */ }
    // Detect bun
    try {
        const out = execSync("bun --version", { encoding: "utf-8", stdio: "pipe" }).trim();
        if (!runtimes.javascript) runtimes.javascript = "bun";
        runtimes.bunVersion = out;
    } catch { /* not available */ }
    return runtimes;
}

function resolveJsRuntimeForBridge(deps = {}) {
    const detect = deps.detect ?? (() => detectRuntimes());
    const which = deps.which ?? whichOnPath;
    const execPath = deps.execPath ?? process.execPath;
    const isPi = (p) => !!p && PI_BINARY_BASENAME.test(basename(p));
    // 1. Prefer detectRuntimes().javascript when it is NOT pi.
    let candidate = null;
    try { candidate = detect().javascript ?? null; } catch { candidate = null; }
    if (candidate && !isPi(candidate)) return candidate;
    // 2. Fall back to PATH-resolved node, then bun.
    for (const cmd of ["node", "bun"]) {
        const resolved = which(cmd);
        if (resolved && !isPi(resolved)) return resolved;
    }
    // 3. Last resort: process.execPath only if it is not pi.
    if (execPath && !isPi(execPath)) return execPath;
    return null;
}

// ── Platform env var helpers (from context-mode/adapters/detect.js) ──
// Pi-only: only Pi's own env vars are 'ours'; everything else is foreign.
const PI_WORKSPACE_VARS = [
    { name: "PI_WORKSPACE_DIR", role: "workspace" },
    { name: "PI_PROJECT_DIR", role: "workspace" },
];
const PI_IDENTIFICATION_VARS = [
    { name: "PI_CONFIG_DIR", role: "identification" },
    { name: "PI_SESSION_FILE", role: "identification" },
    { name: "PI_COMPILED", role: "identification" },
];

// All known platform env vars (simplified for Pi-only: ~/.pi, ~/.claude, ~/.omp)
const PLATFORM_ENV_VARS = new Map([
    ["pi", PI_WORKSPACE_VARS],
    ["claude-code", [
        { name: "CLAUDE_PROJECT_DIR", role: "workspace" },
        { name: "CLAUDE_CODE_ENTRYPOINT", role: "identification" },
        { name: "CLAUDE_PLUGIN_ROOT", role: "identification" },
    ]],
    ["omp", [
        { name: "PI_CODING_AGENT_DIR", role: "identification" },
    ]],
]);

export function foreignWorkspaceEnv(platform) {
    const ban = new Set();
    for (const [p, vars] of PLATFORM_ENV_VARS) {
        if (p === platform) continue;
        for (const v of vars) {
            if (v.role === "workspace") ban.add(v.name);
        }
    }
    return ban;
}

export function foreignIdentificationEnv(platform) {
    const ban = new Set();
    for (const [p, vars] of PLATFORM_ENV_VARS) {
        if (p === platform) continue;
        for (const v of vars) {
            if (v.role === "identification") ban.add(v.name);
        }
    }
    return ban;
}

// ── TUI rendering helpers (PiTextComponent, truncateAnsiLine) ──
const GRAPHEME_SEGMENTER = new Intl.Segmenter(undefined, { granularity: "grapheme" });

export class PiTextComponent {
    text;
    constructor(text = "") { this.text = text; }
    setText(text) { this.text = text; }
    invalidate() { /* stateless renderer */ }
    render(width) {
        if (!this.text || this.text.trim() === "") return [];
        return this.text.replace(/\t/g, "   ").split(/\r?\n/).map((line) => truncateAnsiLine(line, Math.max(1, width)));
    }
}

function extractTerminalEscape(str, pos) {
    if (pos >= str.length || str[pos] !== "\x1b") return null;
    const next = str[pos + 1];
    if (next === "[") {
        let j = pos + 2;
        while (j < str.length) {
            const code = str.charCodeAt(j);
            if (code >= 0x40 && code <= 0x7e) return { code: str.slice(pos, j + 1), length: j + 1 - pos };
            j++;
        }
        return null;
    }
    if (next === "]" || next === "_") {
        let j = pos + 2;
        while (j < str.length) {
            if (str[j] === "\x07") return { code: str.slice(pos, j + 1), length: j + 1 - pos };
            if (str[j] === "\x1b" && str[j + 1] === "\\") return { code: str.slice(pos, j + 2), length: j + 2 - pos };
            j++;
        }
        return null;
    }
    return null;
}

function couldBeEmoji(segment) {
    const cp = segment.codePointAt(0) ?? 0;
    return ((cp >= 0x1f000 && cp <= 0x1fbff) ||
        (cp >= 0x2300 && cp <= 0x23ff) ||
        (cp >= 0x2600 && cp <= 0x27bf) ||
        (cp >= 0x2b50 && cp <= 0x2b55) ||
        segment.includes("\uFE0F") || segment.includes("\u200D"));
}

function charWidth(cp) {
    return cp >= 0x1100 && (cp <= 0x115f ||
        (cp >= 0xa960 && cp <= 0xa97c) || cp === 0x2329 || cp === 0x232a ||
        (cp >= 0x2e80 && cp <= 0xa4cf && cp !== 0x303f) ||
        (cp >= 0xac00 && cp <= 0xd7a3) ||
        (cp >= 0xd7b0 && cp <= 0xd7fb) ||
        (cp >= 0xf900 && cp <= 0xfaff) ||
        (cp >= 0xfe10 && cp <= 0xfe19) ||
        (cp >= 0xfe30 && cp <= 0xfe6f) ||
        (cp >= 0xff01 && cp <= 0xff60) ||
        (cp >= 0xffe0 && cp <= 0xffe6) ||
        (cp >= 0x20000 && cp <= 0x2fffd) ||
        (cp >= 0x30000 && cp <= 0x3fffd)
    ) ? 2 : 1;
}

function graphemeWidth(segment) {
    const cp = segment.codePointAt(0);
    if (cp === undefined) return 0;
    if (cp < 0x20 || (cp >= 0x7f && cp <= 0x9f) ||
        (cp >= 0x300 && cp <= 0x36f) ||
        (cp >= 0x1ab0 && cp <= 0x1aff) ||
        (cp >= 0x1dc0 && cp <= 0x1dff) ||
        (cp >= 0x20d0 && cp <= 0x20ff) ||
        (cp >= 0xfe00 && cp <= 0xfe0f) ||
        (cp >= 0xfe20 && cp <= 0xfe2f) ||
        cp === 0x200b || cp === 0x200c || cp === 0xfeff) return 0;
    if (couldBeEmoji(segment)) return 2;
    if (cp >= 0x1f1e6 && cp <= 0x1f1ff) return 2;
    return charWidth(cp);
}

export function truncateAnsiLine(line, maxWidth) {
    if (maxWidth <= 0) return "";
    let output = "";
    let visible = 0;
    let index = 0;
    while (index < line.length) {
        const escape = extractTerminalEscape(line, index);
        if (escape) { output += escape.code; index += escape.length; continue; }
        let end = index + 1;
        while (end < line.length && !extractTerminalEscape(line, end)) end++;
        const chunk = line.slice(index, end);
        for (const { segment } of GRAPHEME_SEGMENTER.segment(chunk)) {
            const w = graphemeWidth(segment);
            if (visible + w > maxWidth) return output;
            output += segment;
            visible += w;
        }
        index = end;
    }
    return output;
}

// ── Tool renderers ─────────────────────────────────────────
function createContextModeCallRenderer(toolName) {
    return (_args, theme, context) => {
        const text = context.lastComponent instanceof PiTextComponent
            ? context.lastComponent : new PiTextComponent();
        text.setText(theme.fg("toolTitle", theme.bold(toolName)));
        return text;
    };
}
function createContextModeResultRenderer(toolName) {
    return (result, { expanded, isPartial }, theme, context) => {
        const text = context.lastComponent instanceof PiTextComponent
            ? context.lastComponent : new PiTextComponent();
        if (isPartial) { text.setText(theme.fg("warning", "indexing/searching...")); return text; }
        const output = (result.content ?? [])
            .filter((c) => c?.type === "text" && typeof c.text === "string")
            .map((c) => c.text).join("\n");
        if (expanded) { text.setText(theme.fg("toolOutput", output)); return text; }
        const firstLine = output.split(/\r?\n/).find((line) => line.trim().length > 0)?.trim();
        const status = firstLine && firstLine.length <= 180 ? firstLine : `${toolName} completed`;
        text.setText(theme.fg("toolOutput", status));
        return text;
    };
}

// ── MCP stdio client ───────────────────────────────────────
const DEFAULT_REQUEST_TIMEOUT_MS = 60_000;
const MAX_INIT_RETRIES = 2;
const INIT_RETRY_DELAY_MS = 1_000;

export class MCPStdioClient {
    serverScript; env; runtimeOverride; diag;
    child = null; requestId = 0; pending = new Map();
    buffer = ""; initialized = false; exited = false;
    respawnPromise = null; _spawnEnv = null;

    constructor(serverScript, env = process.env, runtimeOverride = null, diag = () => {}) {
        this.serverScript = serverScript;
        this.env = env;
        this.runtimeOverride = runtimeOverride;
        this.diag = diag;
    }

    start() {
        if (this.child) return;
        this.exited = false;
        const runtime = this.runtimeOverride ?? resolveJsRuntimeForBridge() ?? process.execPath;
        const depth = Number.parseInt(this.env[BRIDGE_DEPTH_ENV] ?? "0", 10);
        const childEnv = {
            ...this.env,
            [BRIDGE_DEPTH_ENV]: String(Number.isFinite(depth) ? depth + 1 : 1),
        };
        // Scrub foreign workspace env vars
        for (const banned of foreignWorkspaceEnv("pi")) delete childEnv[banned];
        // Scrub foreign identification env vars
        for (const banned of foreignIdentificationEnv("pi")) delete childEnv[banned];
        // Ensure PI_CONFIG_DIR is set for child detection
        if (!childEnv.PI_CONFIG_DIR) {
            const home = childEnv.HOME ?? childEnv.USERPROFILE ?? childEnv.HOMEPATH;
            const appData = childEnv.APPDATA;
            const candidates = [];
            if (home) candidates.push(join(home, ".pi"));
            if (appData) candidates.push(join(appData, ".pi"));
            for (const candidate of candidates) {
                if (existsSync(candidate)) { childEnv.PI_CONFIG_DIR = candidate; break; }
            }
        }
        this._spawnEnv = childEnv;
        this.child = spawn(runtime, [this.serverScript], {
            stdio: ["pipe", "pipe", "pipe"],
            env: childEnv,
        });
        this.child.stdout?.on("data", (chunk) => this.onData(chunk));
        this.child.stderr?.on("data", (chunk) => {
            const text = chunk.toString("utf-8");
            for (const line of splitDiagLines(text)) {
                if (line !== "") this.diag(`[mcp-bridge] ${line}`, "debug");
            }
        });
        this.child.on("exit", () => this.onExit());
        this.child.on("error", () => this.onExit());
    }

    onExit() {
        if (this.exited) return;
        this.exited = true;
        const err = new Error("MCP server exited");
        for (const [, p] of this.pending) p.reject(err);
        this.pending.clear();
    }

    onData(chunk) {
        this.buffer += chunk.toString("utf-8");
        let idx;
        while ((idx = this.buffer.indexOf("\n")) >= 0) {
            const line = this.buffer.slice(0, idx).trim();
            this.buffer = this.buffer.slice(idx + 1);
            if (!line) continue;
            let msg;
            try { msg = JSON.parse(line); } catch { continue; }
            if (typeof msg.id !== "number" || !this.pending.has(msg.id)) continue;
            const handler = this.pending.get(msg.id);
            this.pending.delete(msg.id);
            if (msg.error) handler.reject(msg.error);
            else handler.resolve(msg.result);
        }
    }

    async request(method, params, timeoutMs = DEFAULT_REQUEST_TIMEOUT_MS) {
        if (this.exited) {
            if (!this.respawnPromise) {
                this.respawnPromise = this.respawn().finally(() => { this.respawnPromise = null; });
            }
            await this.respawnPromise;
        }
        if (!this.child) throw new Error("MCP client not started");
        const id = ++this.requestId;
        return new Promise((resolve, reject) => {
            const timer = Number.isFinite(timeoutMs)
                ? setTimeout(() => {
                    if (!this.pending.has(id)) return;
                    this.pending.delete(id);
                    reject(new Error(`MCP request timeout after ${timeoutMs}ms: ${method}`));
                }, timeoutMs)
                : null;
            this.pending.set(id, {
                resolve: (v) => { if (timer) clearTimeout(timer); resolve(v); },
                reject: (e) => { if (timer) clearTimeout(timer); reject(e); },
            });
            const frame = JSON.stringify({ jsonrpc: "2.0", id, method, params });
            this.writeFrame(frame, (err) => {
                const handler = this.pending.get(id);
                if (handler) { this.pending.delete(id); handler.reject(err); return; }
                reject(err);
            });
        });
    }

    writeFrame(frame, onError) {
        if (!this.child || this.exited) { onError?.(new Error("MCP server exited")); return false; }
        const stdin = this.child.stdin;
        if (!stdin || stdin.destroyed || stdin.writableEnded || stdin.closed) {
            this.onExit();
            onError?.(new Error("MCP server stdin unavailable"));
            return false;
        }
        try {
            stdin.write(frame + "\n", (err) => {
                if (!err) return;
                const code = err.code;
                if (code === "EPIPE" || code === "ERR_STREAM_DESTROYED") { this.onExit(); onError?.(err); return; }
                onError?.(err);
            });
            return true;
        } catch (err) {
            const code = err && typeof err === "object" && "code" in err ? err.code : undefined;
            if (err instanceof Error && (code === "EPIPE" || code === "ERR_STREAM_DESTROYED")) {
                this.onExit(); onError?.(err); return false;
            }
            throw err;
        }
    }

    notify(method, params) {
        if (!this.child) return;
        const frame = JSON.stringify({ jsonrpc: "2.0", method, params });
        this.writeFrame(frame);
    }

    async initialize() {
        if (this.initialized) return;
        await this.request("initialize", {
            protocolVersion: "2025-06-18",
            capabilities: { tools: {} },
            clientInfo: { name: "pi-coding-agent-context-mode-bridge", version: "1.0" },
        });
        this.notify("notifications/initialized", {});
        this.initialized = true;
    }

    async listTools() {
        const result = await this.request("tools/list", {});
        return Array.isArray(result.tools) ? result.tools : [];
    }

    async callTool(name, args) {
        return this.request("tools/call", { name, arguments: args ?? {} }, Number.POSITIVE_INFINITY);
    }

    async respawn() {
        this.child = null;
        this.buffer = "";
        this.exited = false;
        this.initialized = false;
        this.start();
        await this.initialize();
    }

    shutdown() {
        if (!this.child) return;
        const child = this.child;
        try { child.kill("SIGTERM"); } catch { /* best effort */ }
        setTimeout(() => {
            try {
                if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
            } catch { /* best effort */ }
        }, 5000).unref();
        this.child = null;
        this.initialized = false;
        this.exited = true;
    }
}

// ── Helpers ────────────────────────────────────────────────
export function makeBridgeDiag(pi) {
    const logger = pi?.logger;
    return (line, level = "warn") => {
        try {
            const fn = level === "debug" ? logger?.debug : logger?.warn;
            if (typeof fn === "function") fn(line);
        } catch { /* never throw */ }
    };
}

export function splitDiagLines(text) {
    const lines = [];
    let start = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "\n") {
            let end = i;
            if (end > start && text[end - 1] === "\r") end--;
            lines.push(text.slice(start, end));
            start = i + 1;
        }
    }
    if (start < text.length) lines.push(text.slice(start));
    return lines;
}

export function isForegroundSession(ctx) {
    const hasUI = ctx?.hasUI;
    return hasUI !== false;
}

export function foregroundBridgeEnv(baseEnv, foreground) {
    if (!foreground) return baseEnv;
    return { ...baseEnv, CONTEXT_MODE_BRIDGE_IDLE_MS: "0" };
}

function skippedBridge() {
    return {
        tools: [],
        shutdown: () => { /* nothing to shut down */ },
        client: new MCPStdioClient("/dev/null"),
    };
}

export async function bootstrapMCPTools(pi, serverScript, options = {}) {
    const env = options.env ?? process.env;
    const diag = makeBridgeDiag(pi);
    // Recursion guard
    const depth = Number.parseInt(env[BRIDGE_DEPTH_ENV] ?? "0", 10);
    if (Number.isFinite(depth) && depth > 0) {
        diag(`[context-mode] WARNING: skipping MCP bridge — ${BRIDGE_DEPTH_ENV}=${depth} indicates recursion. ctx_* tools will not be callable.`);
        return skippedBridge();
    }
    // Runtime guard
    const runtime = resolveJsRuntimeForBridge();
    if (runtime === null) {
        diag(`[context-mode] WARNING: no JS runtime found (need node or bun on PATH). Skipping MCP bridge. ctx_* tools will not be callable.`);
        return skippedBridge();
    }
    const spawnEnv = foregroundBridgeEnv(env, options.foreground ?? false);
    const client = new MCPStdioClient(serverScript, spawnEnv, runtime, diag);

    let lastError;
    for (let attempt = 0; attempt <= MAX_INIT_RETRIES; attempt++) {
        try {
            client.start();
            await client.initialize();
            lastError = undefined;
            break;
        } catch (err) {
            lastError = err;
            if (attempt === MAX_INIT_RETRIES) break;
            const msg = err instanceof Error ? err.message : String(err);
            diag(`[context-mode] WARNING: MCP bridge initialize failed (attempt ${attempt + 1}/${MAX_INIT_RETRIES + 1}): ${msg}. Retrying…`);
            try { client.shutdown(); } catch { /* best effort */ }
            await new Promise((resolve) => setTimeout(resolve, INIT_RETRY_DELAY_MS));
        }
    }
    if (lastError !== undefined) throw lastError;

    const tools = await client.listTools();
    const registered = [];
    for (const tool of tools) {
        pi.registerTool({
            name: tool.name,
            label: tool.name,
            description: tool.description ?? "",
            parameters: tool.inputSchema ?? { type: "object", properties: {} },
            renderCall: createContextModeCallRenderer(tool.name),
            renderResult: createContextModeResultRenderer(tool.name),
            async execute(_toolCallId, params) {
                const result = await client.callTool(tool.name, params ?? {});
                const text = (result.content ?? [])
                    .filter((c) => c?.type === "text" && typeof c.text === "string")
                    .map((c) => c.text).join("\n");
                if (result.isError) throw new Error(text || `${tool.name} returned an error`);
                return { content: [{ type: "text", text }], details: {} };
            },
        });
        registered.push(tool.name);
    }
    return { tools: registered, shutdown: () => client.shutdown(), client };
}
