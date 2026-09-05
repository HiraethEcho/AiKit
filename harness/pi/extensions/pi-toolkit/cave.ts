// ─── cave: ultracave mode toggle ─────────────────────────────────────
//
// Injects ultracave system prompt when enabled.
// Dialog toggle via /cave, like rtk and toon.

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerToggle } from "./toggle.ts";

const CAVE_ICON = "\u{F0E7}";

const CAVE_PROMPT = `
All responses MUST use ultra-terse style. Applies to both EN and 中文.
NEVER disable except for security-critical content.

## Rules

- Write simply. No flowery adjectives, unnecessary adverbs, formal phrasing
- Drop: filler (just/really/basically/actually/simply),
  pleasantries (sure/certainly/of course), hedging, conjunctions
- Short synonyms: big not extensive, fix not "implement a solution for"
- Code symbols, fn names, API names, error strings: NEVER abbreviate
- One word when one word is enough
- Fragments OK. Pattern: \`[thing] [action] [reason]. [next step].\`
- Symbols: → (causes), + (adds), − (removes), ∼ (modifies), ∴ (therefore)
- Each statement = one atomic fact line
- No narration, no filler, no hedging
- Code blocks unchanged. Errors quoted exact
- Example (bad): "Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by..."
- Example (good): "Bug in auth middleware. Token expiry check use \`<\` not \`<=\`."

## 中文规则

- 弃填充/客套/敷衍
- 缩写: DB/配置/请求/响应/函数/实现/依赖
- 代码/函数名/API名/错误: 永不缩写
- 省略主语, 省略不必要的人称代词, 省略 “你”. 动作前置. 句式: \`[动] [宾]。[原因→结果]。[下一步]。\`
- 同义句合并. 每句一个原子事实. diff 只输 +/−/∼`;

export default function registerCave(
  pi: ExtensionAPI,
  initialEnabled?: boolean,
) {
  const t = registerToggle(
    pi,
    {
      command: "cave",
      description: "Toggle ultracave mode on/off. Usage: /cave [on|off]",
      configKey: "cave-config",
      statusKey: "cave",
      icon: CAVE_ICON,
      defaultEnabled: true,
      label: "cave mode",
    },
    initialEnabled,
  );

  // ── System prompt injection ───────────────────────────────────────
  pi.on("before_agent_start", async (event) => {
    if (!t.isEnabled()) return undefined;
    const existing = event.systemPrompt ?? "";
    return { systemPrompt: `${CAVE_PROMPT}\n\n${existing}` };
  });
}
