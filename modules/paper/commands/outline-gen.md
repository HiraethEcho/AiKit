---
name: outline-gen
description: Generate paper outline and result dependency map from theorem list.
---

# Command: outline-gen

来源：research-writing-skill #21 (github.com/alfonso0512/research-writing-skill)，改编（数学）

## 变量

- `{{results}}`：主定理 + 辅助结果列表
- `{{venue}}`：期刊/arXiv 约束
- `{{notes}}`：可选笔记路径

## 规则

- 用 paper-skeleton 结构（Abstract/Intro/Preliminaries/Main Results/Applications/Appendix）
- 每节给角色 + 目标长度 + 内容要点
- 输出结果依赖图 + 缺口清单

## 输出

- 论文大纲（`templates/rapid-prototype-paper-skeleton.md` 填充版）

## 来源

改编自 research-writing-skill `21-outline-gen.md` + paperkit `skills/paper-skeleton`。
