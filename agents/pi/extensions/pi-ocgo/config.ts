/**
 * Configuration for the usage side of pi-ocgo.
 *
 * Priority: env vars > file (~/.pi/agent/pi-ocgo-usage.json) > defaults.
 * Reuses the pi-ocgo-usage file path so existing installs keep working.
 *
 * The cookie is NEVER logged.
 */
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const ENV_COOKIE = "OPENCODE_GO_COOKIE";
const ENV_WORKSPACE_ID = "OPENCODE_GO_WORKSPACE_ID";
const ENV_BASE_URL = "OPENCODE_GO_BASE_URL";
const ENV_CACHE_TTL = "OPENCODE_GO_CACHE_TTL";
const ENV_MODE = "OPENCODE_GO_MODE";
const ENV_TIMEOUT_MS = "OPENCODE_GO_TIMEOUT_MS";

const DEFAULT_BASE_URL = "https://opencode.ai";
const DEFAULT_CACHE_TTL = 300;
const DEFAULT_MODE: FetchMode = "auto";
const DEFAULT_TIMEOUT_MS = 10_000;
const MIN_CACHE_TTL = 60;
const MAX_CACHE_TTL = 3600;

export type FetchMode = "auto" | "cookie" | "apikey";

export interface OCGoConfig {
    cookie?: string;
    workspaceID?: string;
    baseUrl: string;
    cacheTTL: number;
    mode: FetchMode;
    timeoutMs: number;
}

/** Resolved location of the persisted config file (reused from pi-ocgo-usage). */
export function configFilePath(): string {
    return join(homedir(), ".pi", "agent", "pi-ocgo-usage.json");
}

/** Load and merge config from file + env vars. Never throws. */
export function loadConfig(): OCGoConfig {
    const fileConfig = readFileConfig();
    const cookie = normalizeCookie(pickString(process.env[ENV_COOKIE], asString(fileConfig?.cookie)));
    const workspaceID = pickString(process.env[ENV_WORKSPACE_ID], asString(fileConfig?.workspaceID));
    const baseUrl = pickString(process.env[ENV_BASE_URL], asString(fileConfig?.baseUrl)) || DEFAULT_BASE_URL;
    const rawTTL = pickNumber(process.env[ENV_CACHE_TTL], asNumber(fileConfig?.cacheTTL), DEFAULT_CACHE_TTL);
    const cacheTTL = clamp(rawTTL, MIN_CACHE_TTL, MAX_CACHE_TTL);
    const mode = parseMode(process.env[ENV_MODE]) ?? parseMode(asString(fileConfig?.mode)) ?? DEFAULT_MODE;
    const timeoutMs = Math.max(0, pickNumber(process.env[ENV_TIMEOUT_MS], asNumber(fileConfig?.timeoutMs), DEFAULT_TIMEOUT_MS));
    return { cookie, workspaceID, baseUrl, cacheTTL, mode, timeoutMs };
}

function readFileConfig(): Record<string, unknown> | null {
    const path = configFilePath();
    if (!existsSync(path)) return null;
    try {
        const parsed = JSON.parse(readFileSync(path, "utf8"));
        return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
        return null;
    }
}

function pickString(envVal: string | undefined, fileVal: string | undefined): string | undefined {
    if (envVal && envVal.length > 0) return envVal;
    if (fileVal && fileVal.length > 0) return fileVal;
    return undefined;
}

/**
 * Normalize a pasted cookie into a valid `Cookie:` header value.
 * Accepts full header, bare auth value, or auth value + oc_locale.
 */
export function normalizeCookie(input: string | undefined): string | undefined {
    if (!input) return undefined;
    const trimmed = input.trim().replace(/\s+/g, " ");
    if (!trimmed) return undefined;
    const hasAuthPrefix = /^auth=/.test(trimmed);
    const segments = trimmed.split(/;\s*/).filter(Boolean);
    const ocLocale = segments.find((s) => s.startsWith("oc_locale="));
    if (hasAuthPrefix) {
        const authSeg = (segments.find((s) => s.startsWith("auth=")) ?? segments[0] ?? "").trim();
        return `${authSeg}; ${ocLocale ?? "oc_locale=en"}`;
    }
    const authValue = (segments[0] ?? "").trim();
    const extras = segments.slice(1).map((s) => s.trim()).filter(Boolean);
    const ocLocale2 = extras.find((s) => s.startsWith("oc_locale=")) ?? "oc_locale=en";
    return `auth=${authValue}; ${ocLocale2}`;
}

function pickNumber(envVal: string | undefined, fileVal: number | undefined, fallback: number): number {
    const fromEnv = envVal ? Number.parseInt(envVal, 10) : NaN;
    if (Number.isFinite(fromEnv)) return fromEnv;
    if (fileVal !== undefined && Number.isFinite(fileVal)) return fileVal;
    return fallback;
}

function asString(v: unknown): string | undefined {
    return typeof v === "string" && v.length > 0 ? v : undefined;
}

function asNumber(v: unknown): number | undefined {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string") {
        const n = Number.parseInt(v, 10);
        if (Number.isFinite(n)) return n;
    }
    return undefined;
}

function parseMode(v: string | undefined): FetchMode | undefined {
    if (v === "auto" || v === "cookie" || v === "apikey") return v;
    return undefined;
}

function clamp(n: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, n));
}
