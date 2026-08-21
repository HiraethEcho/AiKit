---
name: math-beamer
description: Create, revise, or audit mathematical Beamer slide decks (talks, posters, lectures, defenses) from papers, notes, proofs, or existing slides — source-grounded claims, template packs, story-first structure, build and layout audit. Use when turning math research into a presentation or fixing existing decks.
source: opt/math-beamer（模板资产 + build 审计）合并 opt/texra-skills/scientific-presenter（story-first 方法 + 视觉 QA），面向数学类演示
---

# Math Beamer — 数学类演示

构建、修订、审计可编译可溯源的数学 Beamer 幻灯片：论文/笔记/证明 → 演讲、海报、课程、答辩。覆盖数学幻灯片结构 + 演示方法，非通用装饰。

## 使用时机

- 数学论文/讲义/证明梗概 → Beamer 幻灯片
- 修订现有 `.tex` 幻灯（数学清晰度、来源支撑、构建可靠性）
- 为研讨班/读书会/答辩/课程/workshop/海报选模板
- 审计定理/证明/公式/图表幻灯的记号、假设、overclaim、布局风险
- 中/英/双语数学幻灯

## 输入

- 必填：演示目标、source-packet、受众、语言、时长或页数、输出目录
- 可选：现有 Beamer 源码、bib、图、数据、机构风格、模板选择、handout/poster 模式、讲者备注、编译命令

## 工作流

1. **先读源** — 读论文/笔记/现有 `.tex`/`.sty`；保留既有主题/字体/颜色/宏，除非要求重设计。
2. **故事线优先**（presenter 方法）— 围绕故事组织，不按论文章节顺序。每页回答一个问题或推进一个观点。
3. **证据清点** — 识别真正属于演示的核心声明、定理、算法、图、公式。
4. **模板选择** — 查 `templates/preview-gallery.md` + `templates/catalog.yaml`，选匹配数学类型的最小模板（algebra-number-theory-talk、theorem-proof-talk、course-lecture-zh 等 24 packs）。
5. **视觉化优先** — 架构/推导/比较转图、表、overlay、紧凑公式，不用散文块。公式只在阐明论证时用；记号先定义。
6. **代码片段精短** — 只显解释机制所需行。
7. **编译-视觉读取循环** — 每次实质改动后检查渲染：裁剪、溢出、标签、可读性、图质量。图由代码生成则重跑代码验证，不凭描述 mock。
8. **渐进披露** — 推导/算法/工作流分步呈现。

## 输出

- Beamer 源码树（`main.tex` + figures + bib + 本地 style）
- 编译批准且工具可用时：PDF
- `slide-source-ledger.md`：每页声明/定理/公式/数值 → 来源映射
- build + layout 报告：命令、引擎、警告、错误、引用、缺失资产、字体、overfull
- 修订说明：区分数学含义风险 vs 机械布局修复

## 质量条

- 正文在演示尺寸可读：幻灯拥挤 → 拆分，不缩小
- 公式克制，仅阐明论证时用；页上记号先定义
- 图纵横比完好；轴/图例/单位可见
- 视觉 QA 强制：能编译但裁剪/重叠/藏标签 = 未完成
- 不发明结果、不证未证定理、不虚构引用；许可/logo 未查不公开品牌模板

## 参考

- `references/math-domain-patterns.md` — 数学领域幻灯模式
- `references/build-and-layout-audit.md` — 构建审计
- `references/presentation-method.md` — story-first + 视觉 QA 方法
- `references/slide-quality-checklist.md` — 终检清单
- `templates/slide-source-ledger.md`、`templates/source-packet.md`、`templates/review-report.md`

## 来源

- 主体：`opt/math-beamer`（模板 packs、catalog、build 审计、preview 脚本）
- 方法：`opt/texra-skills/scientific-presenter`（story-first、视觉 QA、渐进披露）— https://github.com/texra-ai/texra-scientific-skills
- 合并为单一技能，以数学类演示为目标。
