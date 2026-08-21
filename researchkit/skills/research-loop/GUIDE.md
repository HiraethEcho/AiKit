# Math Lite

> 极简三模块数学研究工具包：文献综述、猜想-证明循环、结果汇总。

## Overview

Math Lite 是一个极简的三模块数学研究工具包，完全由文档组成（无脚本、无 agent、无外部 API）。三个模块形成完整的数学研究循环：survey（文献综述）→ tackle（猜想-证明迭代）→ summary（结果汇总）。设计为个人研究工作流跟踪工具。

**目标用户：** 需要轻量化数学研究工作流的个人研究者。

## Directory Structure

```
math-lite/
├── SKILL.md        # 空文件（0 行）
├── survey.md       # 文献综述模块（126 行）
├── tackle.md       # 猜想-证明循环模块（191 行）
└── summary.md      # 结果汇总模块（136 行）
```

## Core Capabilities

### 1. survey — 数学文献综述

**触发场景：** 开始新主题研究、检查猜想是否已知、寻找先驱结果、撰写综述/引言

**4 阶段流程：**

```
MAP：识别关键论文，记录作者/年份/期刊/主要结果/技术/依赖，构建依赖图
  ↓
EXTRACT：提取定义、定理、技术（标准化模板：ShortID, title, theorem, technique, sharpness, open questions）
  ↓
SYNTHESIZE：映射 3+ 篇论文后寻找模式，提出新猜想
  ↓
VERIFY：检查所有引用（重读原文确认、arXiv ID 验证、发表状态确认）
```

**常见陷阱：** 转述过于宽松、遗漏假设、混淆结果、忽略奇异性。

### 2. tackle — 数学猜想-证明-研究循环

**参数：** `rounds`（默认 3，最大 20）, `output_dir`（默认 `mimo-attempt/`）

**5 阶段流程：**

```
FORMULATE：精确陈述猜想（假设、结论、尖锐性、依赖）
  ↓
ATTEMPT（N 轮）：编写编号尝试文件
  - 01-conjecture.md
  - 02-first-attempt.md
  - ...
  - NN-stuck-summary.md
  ↓
VERIFY：压力测试每个声明（维度计数、不等式方向、引用匹配、普遍性）
  ↓
RECORD：每轮后写尝试文件；所有轮次后写汇总
  ↓
SYNTHESIZE（如果卡住）：从失败尝试中提取有用引理，识别精确断点
```

**常见缺口模式：** 错误奇异性类别、遗漏锥定理、off-by-one、循环论证、声明过强。

**引理提取规则：** 每个 TRUE 但不足以证明主猜想的中间结果都应记录为命名引理。

### 3. summary — 数学结果汇总

**触发场景：** N 轮证明尝试后、文献综述后、呈现发现前、会话结束时

**参数：** `input_dir`（默认 `attempt/`）, `output`（默认 `{input_dir}/00-summary.md`）

**4 阶段流程：**

```
SCAN：按名称排序读取所有编号文件
  ↓
EXTRACT：提取猜想、已证结果、引理、卡点；分类为 Proven/Partial/Open/Disproven/Lemma/Stuck
  ↓
ORGANIZE：按状态分组
  ↓
WRITE：单个汇总文件（Status 概览表 + 已证结果 + 开放猜想 + 失败方法 + 有用引理 + 阅读顺序）
```

## Key Workflows

### 完整研究循环

```
survey（文献综述）
    ↓ 识别空白，提出猜想
tackle（猜想-证明循环）
    ↓ 产生编号尝试文件
summary（汇总）
    ↓ 产生 00-summary.md
```

### 文件命名约定

```
00-summary.md          # 汇总（最后生成，最先阅读）
01-conjecture.md       # 猜想陈述
02-first-attempt.md    # 第一次尝试
03-second-attempt.md   # 第二次尝试
...
NN-stuck-summary.md    # 卡点汇总
```

## Configuration & Dependencies

**零依赖：** 无脚本、无 agent、无外部 API、无安装步骤。

**设计哲学：** 纯文档驱动的程序化工具，由单个 AI 或人类研究者直接使用。

## Limitations & Notes

- 极简设计——无自动化、无流水线、无多 agent 协作
- 适合个人研究工作流跟踪，不适合大规模研究项目
- SKILL.md 为空文件；实际内容在 survey.md, tackle.md, summary.md
- 文件命名约定是核心——确保正确的阅读顺序
