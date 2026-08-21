# Math Paper Reading

> 数学论文结构化阅读与分析系统，包含结构提取、依赖图渲染、深度阅读、参考文献管理、文献检索五大模块。

from [VeryMath](https://github.com/VeryMath/AI4Math-Paper-Reading)

## Overview

Math Paper Reading 是一个模块化的数学论文阅读系统，通过 agent_router 路由到五个专门模块。核心流程是：先通过 skill_base 提取论文结构为 JSON，然后其他模块消费该 JSON 进行依赖图渲染、深度阅读、参考文献管理和文献检索。设计原则是将事实提取与解释严格分离。

**目标用户：** 需要系统化数学论文阅读和分析的研究者。

## Directory Structure

```
math-paper-reading/
├── SKILL.md                      # 入口（32 行）
├── agent_router.md               # 主路由器（中文）
├── skill_base.md                 # 结构分析（625 行）
├── skill_pathway_proof.md        # 依赖图渲染（717 行）
├── skill_paper_deep_read.md      # 深度阅读（1010 行）
├── skill_reference_manager.md    # 参考文献管理（746 行）
├── skill_literature_search.md    # 文献检索（866 行）
└── examples/
    ├── gowers2024_marton_structure.json
    ├── behrens_induced_saturation_structure.json
    ├── local_reference_db.json
    └── ... (示例输出)
```

## Core Capabilities

### 1. agent_router — 主路由器

**路由协议（4 步）：**
1. 意图分析：将用户请求分类到触发场景
2. 选择性读取：仅加载触发的技能文件（从不全部加载）
3. 顺序执行：多步请求链式执行（如 base → pathway_proof → reference_manager）
4. 上下文清理：每个技能执行后丢弃约束，仅保留结果

**路由表：**

| 模块 | 触发条件 | 前置条件 |
|------|----------|----------|
| skill_base.md | 提取结构、生成 JSON、整理大纲 | 无 |
| skill_pathway_proof.md | 画依赖图、引理关系、Mermaid 图 | 需要 skill_base 的 JSON |
| skill_paper_deep_read.md | 读这篇论文、填补推导缺口、L2/L3 分析 | 优先使用 JSON |
| skill_reference_manager.md | 保存到数据库、制作笔记卡 | 需要 JSON |
| skill_literature_search.md | 找相关文献、追溯引理来源 | 优先使用 JSON |

### 2. skill_base — 结构分析（v4.2）

**4 步流程：** S1 (Structure Quick-View + Section Map) → S2 (Math Entity Extraction) → S3+4 (Proof Framework + Completeness Audit) → S5 (Output)

**9 条硬约束：**
- C1: 所有数学符号必须用 LaTeX（`$...$` 行内，`$$...$$` 显示）
- C2: 定理陈述必须逐字复制
- C3: 不确定性必须显式标记 `[UNCERTAIN: reason]`
- C4: 不得伪造依赖
- C5: 多子句定理必须列出所有子句
- C6: 多个证明变体分别记录
- C7: 含命名结果的子节获得独立 section_map 条目
- C8: related_work 必须有真实作者/年份
- C9: 角色判断基于显式文本，非结构猜测

**输出：** `<slug>_structure.json` + `<slug>_structure_analysis.md`

**JSON Schema：** paper metadata, section_map, related_work, main_theorems, entities（DEFINITION, LEMMA, PROPOSITION, THEOREM, COROLLARY, CONSTRUCTION, CLAIM, OBSERVATION, REMARK）, tables, proof_framework, completeness_check, uncertain_log

### 3. skill_paper_deep_read — 深度阅读

**4 个阅读层级：**

| 层级 | 命令 | 用途 | 时间 |
|------|------|------|------|
| L1 | `/paper.tldr` | 30 秒概览 | 问题、贡献、定位、一句话评价 |
| L2 | `/paper.core`（默认） | 5 分钟核心骨架 | 符号查找、核心定理（逐字+白话）、证明骨架、前置知识 |
| L3 | `/paper.proof [Thm-ID]` | 深度推导导航 | 假设/结论分解、完整符号映射、逻辑缺口填补 |
| L4 | `/paper.review` | 批判性评估 | 假设局限、技术边界、开放问题 |

**URI 系统：** `paper:[Root_ID]#[Entity_Type]-[Number]`（如 `paper:arxiv:2401.0001#Thm-3`）

**设计原则：** JSON 优先消费；仅在 JSON 缺失时回退到原始文本。

### 4. skill_pathway_proof — 依赖图引擎

**操作：** 拓扑计算（Python 脚本）、Mermaid 图渲染、阅读路径生成（自顶向下 + 自底向上）、逻辑缺口检测

**图规模：** 实体 > 40 时自动降级为多根深度 2 子图

**子图分组：** 假设 → 核心引理 → 技术引理 → 主要结果

**命令：** `/load_json`, `/graph`, `/zoom`, `/feynman`, `/fix`

### 5. skill_reference_manager — 知识库中枢

**5 个模块：** 智能捕获与元数据提取、多维分类、知识内化（Luhmann 卡片法）、语义检索、写作辅助与引用生成

**本地数据库：** `local_reference_db.json`，通过 Python 脚本原子 UPSERT

### 6. skill_literature_search — 数据驱动情报中枢

**5 步流程：** 预判定 + JSON 加载 → 域识别 + 术语结构化 → 数据库推荐 → 查询生成 → 结果过滤 + 质量分级

**JSON 驱动滚雪球：** 向后搜索（从 external_deps）+ 向前搜索（从 arxiv_id/authors/year）

**期刊质量层级：** T0 (Ann. Math., Acta Math., JAMS), T1 (Duke, JFA, Adv. Math.), T2 (PAMS, Math. Ann.), T3 (specialized)

## Key Workflows

### 标准论文阅读流程

```
1. 加载 skill_base → 提取 JSON
2. 加载 skill_paper_deep_read → L2 核心阅读
3. 如需依赖图 → 加载 skill_pathway_proof
4. 如需保存 → 加载 skill_reference_manager
```

### 路由示例

```
用户："帮我读这篇论文"
  → 路由器识别意图 → 仅加载 skill_paper_deep_read.md

用户："画依赖图"
  → 路由器识别意图 → 检查 JSON 是否存在
  → 若不存在，先加载 skill_base.md 生成 JSON
  → 再加载 skill_pathway_proof.md
```

## Configuration & Dependencies

**脚本：** `upsert_paper.py`（原子 UPSERT 操作）

**示例数据：** 2 个结构 JSON、多个 Markdown 笔记、本地参考文献数据库

**零外部依赖：** 无需 API、无需安装步骤

## Limitations & Notes

- 路由器架构——顶层 SKILL.md 是兼容性入口点
- 强调事实提取与解释分离
- 复杂依赖/合并任务优先使用脚本而非手动估算
- 中文为主的技术文档
