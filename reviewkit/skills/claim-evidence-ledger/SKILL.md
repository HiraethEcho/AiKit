---
name: claim-evidence-ledger
description: Use when auditing mathematical paper drafts for supported claims, missing citations, overclaims, proof status, or source-to-text traceability. Build a claim ledger before polishing prose.
source: AI4Math paper-writing (github.com/andkhalov/AI4Math)，改编
---

# Claim Evidence Ledger

打磨散文前先建声明台账。每条实质陈述可追溯到证明/引用/实验/显式不确定性。

## 输入

- 草稿或目标章节。
- source-packet：定理陈述、证明笔记、参考文献、相关工作笔记、审稿意见。
- 可选：期刊/读者约束、引用策略。

## 台账字段

| 字段 | 内容 |
| --- | --- |
| claim | 逐字声明 |
| status | supported / needs-citation / needs-proof / needs-experiment / soften / remove |
| evidence | 证明引用（`\ref`）、文献引用（`\cite`）、笔记路径 |
| coverage | 假设全覆盖 / 部分 / 未覆盖 |
| action | 保留 / 加引用 / 加证明 / 弱化措辞 / 删除 |

## 输出契约

1. 台账表：每条实质声明一行。
2. 未支撑清单：`citation needed` + 支撑声明；证明缺口 + 位置。
3. 建议下一步编辑 + 需做的来源核查。

## 分类规则

- 定理/命题：需证明覆盖；证明不完整 → `needs-proof` + 缺口定位。
- 文献声称：需引用；引用错配 → `needs-citation` + 正确锚点。
- 直觉/展望句：标为 intuition/future-work，不算声明。
- "有引用或证明梗概" < "假设与证明义务全覆盖"。

## 来源

改编自 `opt/paper-writing/skills/claim-evidence-ledger/SKILL.md` + `templates/claim-evidence-ledger.md`（AI4Math: https://github.com/andkhalov/AI4Math）。
