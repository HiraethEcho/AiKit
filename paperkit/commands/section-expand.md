---
name: section-expand
description: Expand a section from the outline with theorem/proof discipline.
---

# Command: section-expand

来源：research-writing-skill #22 (github.com/alfonso0512/research-writing-skill)，改编（数学）

## 变量

- `{{outline}}`：大纲（outline-gen 输出）
- `{{section}}`：目标节（如 "Main Results"）
- `{{sources}}`：source-packet 路径

## 规则

- 逐节扩展，遵守 theorem-proof-writing 规范
- 定理/证明环境完整；直觉先于严谨
- 不发明内容：来源缺失处标注缺口

## 输出

- 章节草稿（TeX/md）

## 来源

改编自 research-writing-skill `22-section-expand.md` + paperkit `skills/theorem-proof-writing`。
