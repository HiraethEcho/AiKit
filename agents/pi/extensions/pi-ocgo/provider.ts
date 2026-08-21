/**
 * Provider matching: is the current Pi model an OpenCode Go model?
 *
 * Two checks (OR-ed):
 *  1. `ctx.model?.provider === "opencode-go"`  (primary)
 *  2. `ctx.model?.id?.startsWith("opencode-go/")`  (fallback)
 */
export const PROVIDER_PREFIX = "opencode-go";

/** Return true iff the model is any `opencode-go/*` model. */
export function isOpencodeGoModel(model: { provider?: string; id?: string } | undefined): boolean {
    if (!model) return false;
    if (model.provider === PROVIDER_PREFIX) return true;
    if (typeof model.id === "string" && model.id.startsWith(`${PROVIDER_PREFIX}/`)) return true;
    return false;
}

/** Return true iff the current ctx model is an opencode-go model. */
export function isOpencodeGoProvider(ctx: { model?: { provider?: string; id?: string } }): boolean {
    return isOpencodeGoModel(ctx.model);
}
