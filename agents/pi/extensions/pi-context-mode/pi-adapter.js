/**
 * PiAdapter — Pi Coding Agent platform adapter (standalone, no other platforms).
 *
 * Storage: ~/.pi/context-mode/sessions/
 * Config:  ~/.pi/settings.json
 * Rules:   AGENTS.md
 *
 * Inlines BaseAdapter from context-mode/adapters/base.js
 * No reference to claude-code, omp, opencode, or any other platform.
 */
import { join, resolve } from "node:path";
import { accessSync, copyFileSync, constants, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { hashProjectDirCanonical } from "./session/db.js";

// ── Context-mode data root override (#649) ─────────────────────
function resolveContextModeDataRoot(env = process.env) {
    const raw = env.CONTEXT_MODE_DATA_DIR;
    if (!raw || raw.trim() === "")
        return null;
    if (raw.startsWith("~"))
        return resolve(homedir(), raw.replace(/^~[/\\]?/, ""));
    return resolve(raw);
}

// ── BaseAdapter (inlined) ──────────────────────────────────────
class BaseAdapter {
    sessionDirSegments;
    constructor(sessionDirSegments) {
        this.sessionDirSegments = sessionDirSegments;
    }
    getSessionDir() {
        const override = resolveContextModeDataRoot();
        const dir = override
            ? join(override, "context-mode", "sessions")
            : join(homedir(), ...this.sessionDirSegments, "context-mode", "sessions");
        mkdirSync(dir, { recursive: true });
        return dir;
    }
    getConfigDir(_projectDir) {
        return join(homedir(), ...this.sessionDirSegments);
    }
    getInstructionFiles() {
        return ["AGENTS.md"];
    }
    getMemoryDir(projectDir) {
        const override = resolveContextModeDataRoot();
        const base = override
            ? join(override, "context-mode", "memory")
            : join(this.getConfigDir(), "memory");
        if (!projectDir) return base;
        return join(base, hashProjectDirCanonical(projectDir));
    }
    backupSettings() {
        const settingsPath = this.getSettingsPath();
        try {
            accessSync(settingsPath, constants.R_OK);
            const backupPath = settingsPath + ".bak";
            copyFileSync(settingsPath, backupPath);
            return backupPath;
        } catch { return null; }
    }
}

// ── PiAdapter (extends BaseAdapter) ────────────────────────────
export class PiAdapter extends BaseAdapter {
    constructor() { super([".pi"]); }
    name = "Pi";
    paradigm = "mcp-only";
    capabilities = {
        preToolUse: false, postToolUse: false, preCompact: false,
        sessionStart: false, canModifyArgs: false, canModifyOutput: false,
        canInjectSessionContext: false,
    };
    // Pi does not use JSON-stdio — wired via extension.js hooks
    parsePreToolUseInput(_raw) { throw new Error("Pi does not support JSON-stdio hooks (wired via extension.js)"); }
    parsePostToolUseInput(_raw) { throw new Error("Pi does not support JSON-stdio hooks (wired via extension.js)"); }
    parsePreCompactInput(_raw) { throw new Error("Pi does not support JSON-stdio hooks (wired via extension.js)"); }
    parseSessionStartInput(_raw) { throw new Error("Pi does not support JSON-stdio hooks (wired via extension.js)"); }
    formatPreToolUseResponse(_response) { return undefined; }
    formatPostToolUseResponse(_response) { return undefined; }
    formatPreCompactResponse(_response) { return undefined; }
    formatSessionStartResponse(_response) { return undefined; }

    getSettingsPath() { return resolve(homedir(), ".pi", "settings.json"); }
    getInstructionFiles() { return ["AGENTS.md"]; }
    generateHookConfig(_pluginRoot) { return {}; }

    readSettings() {
        try {
            const raw = readFileSync(this.getSettingsPath(), "utf-8");
            return JSON.parse(raw);
        } catch { return null; }
    }
    writeSettings(settings) {
        const settingsPath = this.getSettingsPath();
        mkdirSync(resolve(settingsPath, ".."), { recursive: true });
        writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf-8");
    }
    validateHooks(_pluginRoot) {
        return [{
            check: "Hook support",
            status: "pass",
            message: "Pi hooks are wired via the context-mode-pi extension, not via JSON-stdio.",
        }];
    }
    checkPluginRegistration() {
        const pkgPath = resolve(homedir(), ".pi", "extensions", "context-mode-pi", "package.json");
        try {
            const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
            if (pkg?.name === "context-mode-pi") {
                return { check: "Pi extension registration", status: "pass", message: `extension installed at ${pkgPath}` };
            }
            return { check: "Pi extension registration", status: "warn", message: `Unexpected package at ${pkgPath}` };
        } catch {
            return { check: "Pi extension registration", status: "fail", message: `context-mode-pi not found at ${pkgPath}`, fix: "Run: pi install npm:context-mode-pi" };
        }
    }
    getInstalledVersion() {
        try {
            const pkgPath = resolve(homedir(), ".pi", "extensions", "context-mode-pi", "package.json");
            const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
            return pkg.version ?? "unknown";
        } catch { return "not installed"; }
    }
    configureAllHooks(_pluginRoot) { return []; }
    setHookPermissions(_pluginRoot) { return []; }
    updatePluginRegistry(_pluginRoot, _version) { /* managed by pi install */ }
    getRoutingInstructions() {
        return "context-mode active. Hierarchy: ctx_batch_execute > ctx_execute > ctx_execute_file > ctx_search. " +
            "Read/edit files → ctx_execute_file. Multi-command research → ctx_batch_execute. " +
            "Web pages → ctx_fetch_and_index then ctx_search. Index docs → ctx_index. " +
            "Stats → ctx_stats. Doctor → ctx_doctor. Upgrade → ctx_upgrade. Purge → ctx_purge.";
    }
}
