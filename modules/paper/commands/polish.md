---
name: polish
description: Polish English or Chinese math prose without altering mathematical content.
---

# Command: polish

模式：`en`（英文润色）/ `zh`（中文润色）
来源：research-writing-skill #6/#3 (github.com/alfonso0512/research-writing-skill)，改编（数学）

## 变量

- `{{text}}`：待润色文本
- `{{mode}}`：en | zh
- `{{target}}`：期刊名/arXiv（默认不指定）

## 规则

- 不动数学内容：公式、定理陈述、证明步骤、假设、量词原样
- 修：句法、措辞、冗余、主被动、衔接
- 保留数学语域（被动语态、"We prove that..."、"By Lemma 3.1" 等惯例）
- 润色改动逐处标注（不静默改）

## 输出

- 润色稿 + 改动清单（位置 + 原句 → 新句）

## 来源

改编自 research-writing-skill `06-en-polish.md` / `03-zh-polish.md`。
