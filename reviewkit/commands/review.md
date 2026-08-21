---
name: review
description: Review a mathematics article — draft or PDF text → findings-first review report (math correctness + expression), severity-ranked, three-tier.
source: 新增（调 reviewkit agents/reviewer + reviewkit/skills）
---

# Command: review

## 变量

- `{{draft}}`：草稿路径（tex/md）或粘贴文本
- `{{persona}}`：代数几何 / 代数 / 数论（默认代数几何）
- `{{severity}}`：温和 | 严格（默认严格）

## 流程

1. 通读全稿 → 调 `agents/reviewer` 双轨审（数学 + 表达）
2. 数学轨用 reviewkit/skills（manuscript-review 独立验证计算、proof-obligation、claim-evidence）
3. 输出 findings-first 报告：`[P0/P1/P2] 位置 + 问题 + 依据`，三档 confirmed/likely/open

## 输出

- `review-report.md`（`templates/review-report.md`）

## 来源

reviewkit 新增；方法来自 reviewkit/skills（AI4Math + texra）。
