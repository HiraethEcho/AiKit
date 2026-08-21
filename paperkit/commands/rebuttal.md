---
name: rebuttal
description: Draft point-by-point response to reviewer comments.
---

# Command: rebuttal

来源：research-writing-skill #26 (github.com/alfonso0512/research-writing-skill)，改编（数学）

## 变量

- `{{reviews}}`：审稿意见（原文）
- `{{draft}}`：草稿路径
- `{{roadmap}}`：revision-coach 输出（可选）

## 规则

- 逐条回复：意见原文 → 分类 → 修改说明（含证据：`\ref`/`\cite`/新证明）→ 拒绝则给理由
- 每条意见都有回应，不静默跳过
- 数学部分：改动可验证；不空承诺
- 语气：事实性、不辩解、不谄媚

## 输出

- Rebuttal 逐条回复稿（与 roadmap 对应）

## 来源

改编自 research-writing-skill `26-rebuttal.md` + paperkit `agents/revision-coach`。
