# AG Stacks Paper Assistant

> 代数几何领域问答系统，从 Stacks Project 本地索引和多源学术论文中检索证据，生成带引用的答案。

## Overview

AG Stacks Paper Assistant 是一个代数几何（Algebraic Geometry）专用的问答系统。它结合本地 Stacks Project 索引的混合检索与多源网络学术论文检索，为代数几何相关问题提供有引用支撑的结构化回答。系统内置相关性门控、降级处理和内部验证机制。

**目标用户：** 代数几何领域的研究者和学生。

## Directory Structure

```
ag-stacks-paper-assistant/
├── SKILL.md                    # 技能行为协议
├── README.md                   # 使用说明（中文）
├── agents/
│   └── openai.yaml             # Agent 元数据
├── evals/
│   └── evals.jsonl             # 5 个评估用例
├── references/
│   ├── ag_prompt_style.md      # AG 回答风格指南
│   ├── citation_policy.md      # 引用类型和排序规则
│   └── web_search_policy.md    # 多源检索策略
└── scripts/
    ├── classify_relevance.py   # 相关性门控（143 行）
    ├── retrieve_stacks.py      # Stacks Project 检索器
    ├── retrieve_papers.py      # 多源论文检索器
    ├── format_citations.py     # 引用块生成器
    └── ag_assistant_pipeline.py# 完整流水线编排器（536 行）
```

## Core Capabilities

| 能力 | 说明 |
|------|------|
| 相关性门控 | 41 个 AG 关键词 + 10 个负面提示词，分类 high/medium/low |
| Stacks 检索 | 本地向量+词法混合检索 + GraphRAG 引用图扩展 |
| 多源论文检索 | arXiv, OpenAlex, Semantic Scholar, Crossref, MathOverflow, MathSE, Wikipedia |
| 引用块生成 | `[S1]` 为 Stacks 引用，`[P1]` 为论文引用 |
| 内部验证 | 检查假设、证明步骤、引用准确性 |
| 降级处理 | Stacks-only / Papers-only / 双重失败均可处理 |

## Key Workflows

### 完整问答流程

```
用户查询
  ↓
Step 0: classify_relevance.py → high/medium/low
  ↓ [low: 简短回答，停止]
  ↓ [medium/high: 继续]
Step 1: retrieve_stacks.py → 本地 Stacks 索引（标签、定义、定理）
  ↓
Step 2: retrieve_papers.py → 多源网络证据
  ↓
Step 3: format_citations.py → 统一引用块
  ↓
Step 4: 按 ag_prompt_style.md 生成最终回答
  - 相关性判定 + 范围声明
  - 主要解释
  - 可选病理/边界说明
  - 引用列表
  - 内部验证后输出
```

### 降级路由

| 路由 | 触发条件 | 行为 |
|------|----------|------|
| `stacks_only_degraded` | 论文检索失败 | 仅用 Stacks 回答 |
| `papers_only_degraded` | Stacks 检索失败 | 仅用论文回答 |
| `retrieval_unavailable` | 双重失败 | 说明证据缺口 |
| `low_relevance_stop` | 非 AG 相关 | 要求重新表述 |

## Configuration & Dependencies

**必需数据：**
- `data/index/index_meta.json` + `data/index/lexical.db`（Stacks 索引）
- `data/processed/corpus.jsonl`（Stacks 语料）

**Python 依赖：** `pip install -r requirements.txt`

**网络：** 需访问 arXiv, OpenAlex, Semantic Scholar, Crossref 等 API。

**TLS：** 默认严格验证；`--ca-bundle` 或 `SSL_CERT_FILE` 用于证书问题；`--allow-insecure-ssl-fallback` 作为最后手段。

**默认 arXiv 分类：** `math.AG, math.AC, math.RT, math.NT, math.KT, math.RA, math.AT`

## Evals（5 个测试用例）

| ID | 查询 | 验证内容 |
|----|------|----------|
| `route_low_001` | "Who won the NBA finals?" | 低相关性路由，无伪造内容 |
| `route_high_001` | "Explain flat morphism of schemes..." | 高相关性，Stacks + 引用 |
| `route_medium_001` | "What is the geometric meaning of Ext..." | 中等相关性 |
| `citation_001` | "State a clean definition of etale morphism..." | 引用存在（[S1] 格式） |
| `paper_001` | "Recent directions on derived algebraic geometry..." | 论文检索，无伪造 arXiv ID |

## Limitations & Notes

- 仅适用于代数几何领域
- 需要本地 Stacks 索引数据才能运行
- SSL 问题可能导致论文检索降级
- 默认 TLS 严格验证，不建议绕过
