---
name: paper-skeleton
description: Use when turning mathematical notes, theorem statements, proof sketches, or reading outputs into a paper skeleton, section plan, result dependency map, or contribution architecture before prose drafting.
source: AI4Math paper-writing (github.com/andkhalov/AI4Math)，改编
---

# Paper Skeleton And Logical Architecture

散文前先立骨架。目标：让定义、结果、依赖、证明占位、示例、章节角色在动笔前可见，提前暴露缺口。

## 输入

- source-packet：定义、定理陈述、引理、证明梗概、笔记、目标期刊/arXiv。
- 可选：已有大纲、草稿、审稿意见、页数约束。

## 输出契约

1. **贡献主轴** — 一句话贡献：*"We prove {main result} by {technique}, which {significance}."*
2. **章节地图** — 每节：角色（动机/准备/主结果/应用/附录）+ 目标长度。
3. **结果依赖图** — 定理/引理/命题间的依赖边；无依赖边支撑的结果 → 标为 gap。
4. **缺口清单** — 未证引理、缺失定义、未定位的外部结果、未覆盖情形。

## 标准结构（纯数学）

| 节 | 角色 | 典型长度 |
| --- | --- | --- |
| Abstract | 问题/结果/意义 | 100-150 words |
| Introduction | 动机、历史、主定理、证明策略、组织 | 2-3 pages |
| Preliminaries | 定义、记号、背景 | 2-4 pages |
| Main Results | 定理 + 完整证明 | 8-15 pages |
| Applications | 例子、计算 | 2-4 pages |
| Appendix | 技术引理、长计算 | 按需 |

## 质量条

- 每条结果可回溯到来源材料（笔记/定理/证明）。
- 依赖图无环、无悬空引用（依赖未定义对象）。
- 缺口显式列出，不靠散文掩盖。
- 字数分配与期刊/arXiv 约束匹配。

## 来源

改编自 `opt/paper-writing/skills/paper-skeleton-and-logical-architecture/SKILL.md`（AI4Math: https://github.com/andkhalov/AI4Math）。
