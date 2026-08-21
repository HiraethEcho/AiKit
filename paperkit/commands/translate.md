---
name: translate
description: Translate mathematics text between Chinese and English, preserving formulas and LaTeX commands.
---

# Command: translate

模式：`zh2en`（中译英）/ `en2zh`（英译中）
来源：research-writing-skill #1/#2 (github.com/alfonso0512/research-writing-skill)，改编（数学）

## 变量

- `{{text}}`：待译文本（TeX/公式保留）
- `{{mode}}`：zh2en | en2zh
- `{{style}}`：期刊级 | 初稿级（默认期刊级）

## 规则

- 数学符号/公式/`\label`/`\ref`/`\cite` 原样保留，不翻译
- 术语：`en2zh` 用 semitrans 术语表（default 模式：英文术语保留）
- 定理/引理/命题环境名不译（theorem/lemma/proposition/remark）

## 输出

- 译文 + 术语表变更记录 + 存疑处标注

## 来源

改编自 research-writing-skill `01-zh2en.md` / `02-en2zh.md`。
