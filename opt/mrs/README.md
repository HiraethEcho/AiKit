# arsm — ARS for Math

学术研究工具链 (research toolkit for foundational mathematics)。从 aro/ 移植精简: 无编排器, 三组独立工具, 纯数学内容, 简体中文。

Agent-agnostic — 适用于 opencode、pi、claude-code 等任何 agent。

## 三组工具

| Group | Skill | 职责 | Agents | Modes | Commands |
|---|---|---|---|---|---|
| `research/` | `math-deep-research` | 文献检索 + 综合 + 研究报告 (arXiv/OpenAlex/Crossref/S2 API) | 15 | 8 | 2 |
| `review/` | `math-reviewer` | 多视角同行评审模拟 + 修订验证 + 校准 | 8 | 6 | 6 |
| `paper/` | `math-paper` | 论文写作 (定理-证明结构) + 修改 + 格式 + 引用验证 | 14 | 10 | 8 |

## 结构

```
arsm/
├── AGENTS.md            routing rules (skill selection, loading protocol, invariants)
├── ARCHITECTURE.md      功能架构
├── MODE_REGISTRY.md     全部 24 modes 单一事实源
├── requirements.txt
├── research/  review/  paper/
│   ├── <skill>/        SKILL.md (入口: modes/agents/phases) + references/ templates/ (+ scripts/)
│   ├── agents/         每个 agent 一个文件 (完整 prompt, mode: primary)
│   └── commands/       opencode 斜杠命令
```

注: 脚本按技能归属 — research 有检索/完整性脚本, paper 有修订补丁/提交包脚本, review 无脚本。恒单模型 — 无跨模型验证机制。

## 安装

```bash
pip install -r requirements.txt   # jsonschema (修订补丁校验), PyYAML (venue profile/sidecar)
```

- arXiv/OpenAlex/Crossref 客户端零依赖, 无需 key (速率限制自动降级)
- Semantic Scholar 可选: `export S2_API_KEY=...` (10 req/s vs 1 req/s)
- `pypdf` 可选: 提交包验证的 PDF 元数据扫描 (缺失时降级为 NOT-CHECKED)
- PDF 输出需 XeLaTeX (CJK: xeCJK + Noto CJK SC)

## 部署到项目 (.agents/)

文件内路径均以 `.agents/` 为根书写 — 拷贝后直接可用:

```bash
# 单组 (如 paper)
mkdir -p .agents/agents .agents/commands .agents/skills
cp arsm/paper/agents/*.md      .agents/agents/
cp arsm/paper/commands/*.md    .agents/commands/
cp -r arsm/paper/math-paper/   .agents/skills/math-paper/

# 全三组
cp -r arsm/research/agents/*.md arsm/review/agents/*.md arsm/paper/agents/*.md .agents/agents/
cp -r arsm/research/commands/*.md arsm/review/commands/*.md arsm/paper/commands/*.md .agents/commands/
cp -r arsm/research/math-deep-research .agents/skills/
cp -r arsm/review/math-reviewer      .agents/skills/
cp -r arsm/paper/math-paper         .agents/skills/
```

布局:

```
<project>/.agents/
├── agents/    (agent prompts, mode: primary)
├── commands/  (opencode slash commands)
└── skills/    math-deep-research/ math-paper/ math-reviewer/
```

拷贝后引用均可解析: skill 文档 → `agents/x.md`; 跨 skill → `skills/math-*/references/…`; agents 权限 globs → `skills/math-*/scripts/*`。

## 使用方式

### 1. 斜杠命令 (opencode)

```
/ars-3w               research: WHY/HOW/WHAT 文献对比扫描
/ars-lit-review       research: 文献综述 (注释书目 + 综合)
/ars-plan             paper: Socratic 章节规划
/ars-outline          paper: 详细大纲 + 证据图
/ars-abstract         paper: 双语摘要 (zh-CN + EN)
/ars-format-convert   paper: LaTeX/PDF + 引用格式转换
/ars-revision         paper: 按审稿意见修订 (补丁式, fail-closed)
/ars-revision-coach   paper: 解析审稿意见 → 修订路线图 + 回复信骨架
/ars-rebuttal-audit   paper: 审查已有回复信草稿 (QA 报告)
/ars-citation-check   paper: 引用核查 (arXiv/OpenAlex/Crossref 三元验证)
/ars-review           review: 5 评审 + 主编决定 + 修订路线图
/ars-re-review        review: 修订验证清单
/ars-quick-review     review: 主编快速评估
/ars-methodology-review review: 方法论专项评审 (证明严谨度加权)
/ars-guided-review    review: Socratic 逐问题引导
/ars-calibration      review: 评审者精度校准 (FNR/FPR/AUC)
```

### 2. 直接触发 (任何 agent, 包括 pi)

消息包含触发词 → agent 读取对应 SKILL.md:

```
research:  "研究 X" / "文献回顾 X" / "guide my research" / "黎曼猜想的最新进展"
paper:     "写论文" / "帮我规划论文" / "审查意见" / "convert to LaTeX"
review:    "review paper" / "评审这篇论文" / "check revisions" / "验证修订"
```

### 3. `[direct-mode]` 前缀

跳过选择, 直接指定 skill+mode:

```
[math-paper:plan] 我想写一篇关于 Frobenius 定理的论文
[math-reviewer:quick] 快速看下这篇的 main theorem
```

## 典型工作流

```
research → paper → review → revision → re-review
/ars-3w      /ars-plan     /ars-review      /ars-revision      /ars-re-review
/ars-lit-review /ars-outline   (full review)   /ars-revision-coach
             /ars-abstract
```

无自动派发 — 每个阶段手动触发, 交接格式见各 skill `references/handoff_schemas.md`。

## 论文三种结构 (paper)

1. **Theoretical Paper** (严肃数学学术论文) — 定理-证明, 15-40 页, 投稿用
2. **Survey Note** (综述性质笔记) — 问题历史/结果总结/比较/文献来源, 2-8 页
3. **Research Note** (研究结果笔记) — 命题陈述+证明/困难/失败路线, 1-6 页

模板: `paper/math-paper/templates/` (`theoretical_paper_template.md`, `survey_note_template.md`, `research_note_template.md`, `latex_article_template.tex`, `bilingual_abstract_template.md`, `revision_tracking_template.md`, `literature_review_template.md`)。

## 模式光谱

- **fidelity** — 模板驱动, 可预测输出 (lit-review, citation-check, format-convert, re-review…)
- **balanced** — 默认 (full, outline)
- **originality** — 探索式 + 高监督 (socratic, plan, guided)

监督等级决定对话检查点密度: `plan`/`guided` (Very High) 全程 Socratic; `format-convert` (Low) 机械执行。

## 不变量 (所有输出)

- LaTeX 符号正确, 与引用源记号一致
- 定理/引理/定义精确陈述 — 假设与量词顺序不可省
- 证明逻辑完整 — gap/未述假设必须显式标记, 不得默默填补
- 每项主张可溯源; 未过验证的来源不得声称已验证
- 输出语言随用户, 数学术语保留英文
