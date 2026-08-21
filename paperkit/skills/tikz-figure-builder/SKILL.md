---
name: tikz-figure-builder
description: Create or refine TikZ figures for technical papers — commutative diagrams, geometric illustrations, proof-strategy flowcharts. Iteratively compile and visually read the rendered output until the figure is correct and readable.
source: texra-scientific-skills (github.com/texra-ai/texra-scientific-skills)，改编
---

# TikZ Figure Builder

数学论文图：交换图、几何示意、证明流程图。迭代编译-视觉读取循环，直到正确且可读。

## 输入

- 手稿上下文（记号、词汇、数学含义）+ 图的需求描述。
- 可选：现有 TikZ 源码 / 手绘草图 / 图片。

## 工具选型

| 图型 | 工具 |
| --- | --- |
| 交换图、函子论证、正合列 | `tikz-cd` |
| 曲线、曲面、奇点几何示意 | `tikz` |
| 函数图、数值数据 | `pgfplots` |
| 证明策略流程图 | `tikz` |

## 工作流

1. 先读手稿上下文：图须匹配文中记号与数学含义。
2. 决定图要传达什么：精简到本质对象/关系/流/几何。
3. 优先可复用样式与紧凑结构，不逐节点复制格式。
4. **每次实质改动都编译 + 视觉读取**（渲染 PDF/图片，不只读源码）：edit → build → read → fix → rebuild 循环，直到稳定。
5. 立即修 clipping、拥挤、标签碰撞、间距不均、标签不可读、风格漂移。
6. 数学意义图：验证拓扑、箭头方向、标签、邻接与所表示等式/构造一致。
7. caption 与正文引用保持同步。

## 质量条

- 漂亮但数学错误的图 = 失败。
- 标签清晰且与手稿记号一致。
- 间距让结构明显，无装饰性杂乱。
- 多图共享样式放 preamble，不重复定义。
- 能编译就必须编译查看；默认循环到干净。
- 矢量输出（PDF/EPS），黑白可读。

## 输出

- 可编译 TikZ 代码 + 渲染确认 + caption 草稿。

## 来源

改编自 `opt/texra-skills/tikz-figure-builder/SKILL.md`（texra-ai/texra-scientific-skills: https://github.com/texra-ai/texra-scientific-skills）。
