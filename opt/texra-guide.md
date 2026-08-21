# TeXRA Scientific Skills

> 围绕 TeXRA 的 9 个科学写作/审稿/图表技能，可通过 Claude Code 插件或 Codex 技能包安装。

## Overview

TeXRA Scientific Skills 是一套 9 个自包含的科学写作技能，覆盖论文审阅、文献检索、数学 OCR、公式增强、演示制作、代码简化、TikZ 绘图、写作批注等。每个技能独立运行，无显式互相依赖。可通过 Claude Code 插件市场安装。

**目标用户：** 需要 LaTeX 科学写作工具链的研究者。

## Directory Structure

```
texra-scientific-skills/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── skills/
│   ├── inline-paper-critic/     # 数学正确性批注
│   │   ├── SKILL.md
│   │   ├── references/critique-checklist.md
│   │   └── agents/openai.yaml
│   ├── literature-search/       # 文献检索
│   ├── manuscript-review/       # 技术手稿审查
│   ├── math-ocr/                # 手写数学→LaTeX
│   ├── mathematical-enhancer/   # 数学实质增强
│   ├── scientific-presenter/    # 科学演示制作
│   ├── scientific-simplifier/   # 代码/LaTeX/文本简化
│   ├── tikz-figure-builder/     # TikZ 图表构建
│   └── writing-commenter/       # 写作批注
├── README.md
└── LICENSE (MIT)
```

每个技能遵循统一布局：
```
skills/<skill-name>/
├── SKILL.md              # 技能文档
├── references/           # 深度检查清单
└── agents/openai.yaml    # Agent 元数据
```

## Core Capabilities

### 9 个技能详解

| # | 技能 | 功能 | 关键质量规则 |
|---|------|------|-------------|
| 1 | **inline-paper-critic** | 在推导密集的 LaTeX 手稿上留下编译安全的内联批注 | 使用 `\criticize{comment}{severity}{confidence}` 宏；优先级：有效性问题 > 风格问题 |
| 2 | **literature-search** | 发现、验证、综合学术文献 | 优先一手来源；交叉验证重要声明；保持引用精确 |
| 3 | **manuscript-review** | 审计技术手稿的数学正确性、逻辑性、符号一致性、证据质量 | 独立验证关键计算；区分已确认错误、可能问题、开放问题 |
| 4 | **math-ocr** | 将手写或图像数学内容转为符号一致、可编译的 LaTeX | 符号一致性优先于字面形状匹配；标记不确定性而非发明符号 |
| 5 | **mathematical-enhancer** | 增强数学实质——更好的证明、更尖锐的结果、更干净的推导 | 仅实现能严格证明的改进；标记推测性想法为建议 |
| 6 | **scientific-presenter** | 构建和迭代科学演讲、海报、Beamer 幻灯片 | 围绕故事而非论文结构组织；视觉 QA 是强制的 |
| 7 | **scientific-simplifier** | 简化科学代码、LaTeX 和文本，保持行为/意义不变 | 简化是表达变更，非行为变更；不折叠不同科学机制 |
| 8 | **tikz-figure-builder** | 创建或改进 TikZ 图表，迭代编译-查看 | 数学正确的图表优先于美观；每次重大更改都编译并视觉读取 |
| 9 | **writing-commenter** | 在草稿上添加逻辑/符号/编辑批注 | 三种模式：逻辑流、符号一致性、编辑提升；保持模式内范围 |

### 关键区别

- **inline-paper-critic** vs **writing-commenter**：前者关注数学正确性，后者关注逻辑/符号/编辑
- **manuscript-review** 是综合审计；inline-paper-critic 和 writing-commenter 是专注内联工具
- **mathematical-enhancer** 可与 manuscript-review 配合使用

### Agent 定义（openai.yaml）

每个技能都有相同的 4 字段结构：

```yaml
interface:
  display_name: '<Human Readable Name>'
  short_description: '<One-line purpose>'
  default_prompt: 'Use $<skill-name> to <action>.'
```

## Key Workflows

### 安装

```bash
/plugin marketplace add texra-ai/texra-scientific-skills
/plugin install texra-scientific-skills@texra-scientific-skills
```

### 典型使用场景

**审阅论文：**
1. `manuscript-review` — 全面技术审查
2. `inline-paper-critic` — 数学正确性内联批注
3. `writing-commenter` — 逻辑/符号/编辑批注

**改进论文：**
1. `mathematical-enhancer` — 增强数学实质
2. `scientific-simplifier` — 简化代码/文本
3. `tikz-figure-builder` — 改进图表

**准备演讲：**
1. `scientific-presenter` — 构建幻灯片
2. `tikz-figure-builder` — 创建图表

**处理手写笔记：**
1. `math-ocr` — 转为 LaTeX

### 技能间关系

无显式依赖图。隐式互补关系：
- inline-paper-critic + writing-commenter 互补
- manuscript-review 是综合审计入口
- math-ocr 为所有 LaTeX 技能提供输入
- literature-search 为写作提供引用支持

## Configuration & Dependencies

**插件元数据：**
- 名称：`texra-scientific-skills`
- 版本：0.1.0
- 作者：texra-ai
- 许可：MIT

**零外部依赖：** 无脚本、无 Python 包、无 API

## Limitations & Notes

- 每个技能完全自包含
- 通过 Claude Code 插件市场安装
- 同伴项目：texra-lean-skills（Lean 4 / Mathlib 形式化）
- MIT 许可
