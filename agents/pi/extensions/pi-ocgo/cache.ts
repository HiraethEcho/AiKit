/**
 * Prompt-cache stamping for the OpenCode Go gateway (port of pi-opencode-go-cache).
 *
 * Applies the full OpenCode CLI caching strategy to every opencode-go
 * request, for both `openai-completions` and `anthropic-messages` APIs:
 *   - prompt_cache_key     scoped to the pi session id
 *   - prompt_cache_retention "24h"
 *   - cache_control breakpoints on up to 2 system msgs, last 2 msgs, last tool
 *
 * GLM/Zhipu models reject Anthropic-style cache_control markers, so they are
 * skipped (return "unsupported").
 */
const MAX_PROMPT_CACHE_KEY_LEN = 64;
const CACHE_CONTROL_EPHEMERAL = Object.freeze({ type: "ephemeral", ttl: "1h" });

/** Models whose downstream API rejects cache_control markers. */
const UNSUPPORTED_CACHE_MODEL_PATTERNS: readonly string[] = ["glm", "zhipu"];

export type CacheStampResult = "enabled" | "unsupported" | "skipped";

function isUnsupportedForCache(model: { id?: string } | undefined): boolean {
    if (!model) return false;
    const id = (model.id ?? "").toLowerCase();
    return UNSUPPORTED_CACHE_MODEL_PATTERNS.some((p) => id.includes(p));
}

function clampPromptCacheKey(key: string): string {
    return key.length <= MAX_PROMPT_CACHE_KEY_LEN
        ? key
        : Array.from(key).slice(0, MAX_PROMPT_CACHE_KEY_LEN).join("");
}

function stampCacheControlOnMessage(
    message: Record<string, unknown>,
    marker: Record<string, unknown>,
): boolean {
    const content = message.content;
    if (typeof content === "string") {
        if (content.length === 0) return false;
        message.content = [{ type: "text", text: content, cache_control: marker }];
        return true;
    }
    if (Array.isArray(content) && content.length > 0) {
        for (let i = content.length - 1; i >= 0; i--) {
            const part = content[i] as Record<string, unknown>;
            if (!part || typeof part !== "object") continue;
            if (part.cache_control) return true;
            if (
                part.type === "text" ||
                part.type === "image" ||
                part.type === "image_url" ||
                part.type === "tool_use" ||
                part.type === "tool_result"
            ) {
                part.cache_control = marker;
                return true;
            }
        }
    }
    return false;
}

function applyConversationCacheBreakpoints(
    messages: Array<Record<string, unknown>>,
    marker: Record<string, unknown>,
): void {
    let systemStamped = 0;
    for (const msg of messages) {
        const role = msg.role;
        if (role === "system" || role === "developer") {
            if (stampCacheControlOnMessage(msg, marker)) {
                systemStamped += 1;
                if (systemStamped >= 2) break;
            }
        } else {
            break;
        }
    }
    let finalStamped = 0;
    for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        const role = msg.role;
        if (role === "user" || role === "assistant") {
            if (stampCacheControlOnMessage(msg, marker)) {
                finalStamped += 1;
                if (finalStamped >= 2) break;
            }
        }
    }
}

function applyOpenAICompletionsCacheControl(
    payload: Record<string, unknown>,
    marker: Record<string, unknown>,
): void {
    const messages = payload.messages;
    if (Array.isArray(messages) && messages.length > 0) {
        applyConversationCacheBreakpoints(messages as Array<Record<string, unknown>>, marker);
    }
    const tools = payload.tools;
    if (Array.isArray(tools) && tools.length > 0) {
        const lastTool = tools[tools.length - 1] as Record<string, unknown>;
        if (lastTool && typeof lastTool === "object") lastTool.cache_control = marker;
    }
}

function applyAnthropicCacheControl(
    payload: Record<string, unknown>,
    marker: Record<string, unknown>,
): void {
    const system = payload.system;
    if (typeof system === "string") {
        if (system.length > 0) {
            payload.system = [{ type: "text", text: system, cache_control: marker }];
        }
    } else if (Array.isArray(system) && system.length > 0) {
        let stamped = 0;
        for (let i = 0; i < system.length && stamped < 2; i++) {
            const part = system[i] as Record<string, unknown>;
            if (part && part.type === "text") {
                part.cache_control = marker;
                stamped += 1;
            }
        }
    }
    const messages = payload.messages;
    if (Array.isArray(messages) && messages.length > 0) {
        applyConversationCacheBreakpoints(messages as Array<Record<string, unknown>>, marker);
    }
    const tools = payload.tools;
    if (Array.isArray(tools) && tools.length > 0) {
        const lastTool = tools[tools.length - 1] as Record<string, unknown>;
        if (lastTool && typeof lastTool === "object") lastTool.cache_control = marker;
    }
}

function stripStaleCacheControl(payload: Record<string, unknown>): void {
    const visit = (node: unknown): void => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
            for (const item of node) visit(item);
            return;
        }
        const obj = node as Record<string, unknown>;
        if (obj.cache_control && typeof obj.cache_control === "object") {
            const cc = obj.cache_control as Record<string, unknown>;
            if (cc.type === "ephemeral") delete obj.cache_control;
        }
        for (const key of Object.keys(obj)) {
            if (key === "cache_control") continue;
            const val = obj[key];
            if (val && typeof val === "object") visit(val);
        }
    };
    if ("messages" in payload) visit(payload.messages);
    if ("system" in payload) visit(payload.system);
    if ("tools" in payload) visit(payload.tools);
}

/**
 * Stamp caching on an opencode-go request payload. Mutates and returns the
 * payload. Returns the resulting cache state ("enabled" | "unsupported" |
 * "skipped").
 */
export function stampOpencodeGoCache(
    model: { api?: string; id?: string } | undefined,
    payload: Record<string, unknown>,
    sessionId: string | undefined,
): CacheStampResult {
    if (isUnsupportedForCache(model)) return "unsupported";

    if (sessionId) {
        payload.prompt_cache_key = clampPromptCacheKey(sessionId);
        payload.prompt_cache_retention = "24h";
    }

    stripStaleCacheControl(payload);

    const api = model?.api;
    if (api === "openai-completions") {
        applyOpenAICompletionsCacheControl(payload, CACHE_CONTROL_EPHEMERAL);
    } else if (api === "anthropic-messages") {
        applyAnthropicCacheControl(payload, CACHE_CONTROL_EPHEMERAL);
    }
    // Unknown api: still benefits from prompt_cache_key + 24h retention.

    return "enabled";
}
