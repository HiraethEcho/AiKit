---
name: deai
description: Remove AI-flavored filler from math paper prose (en/zh).
---

# Command: deai

模式：`en` / `zh`（去 AI 味）
来源：research-writing-skill #8/#7 (github.com/alfonso0512/research-writing-skill)，改编（数学）

## 变量

- `{{text}}`：待处理文本
- `{{mode}}`：en | zh

## AI 味信号（数学论文）

- 空泛过渡句（"It is worth noting that"、"Furthermore, it is important to"）
- 万金油形容词（significant/robust/crucial 滥用）
- 并列三段式堆砌
- 过度对称排比、模板化结尾（"In conclusion, this paper..."）
- 无信息量的强调（"importantly", "notably" 连发）

## 规则

- 删冗余，不删信息；数学断言/量词/证明步骤一字不动
- 保留数学写作惯例（被动语态、We-form 适度）

## 输出

- 去味稿 + 删除/改写清单

## 来源

改编自 research-writing-skill `08-en-deai.md` / `07-zh-deai.md`。
