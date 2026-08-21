# Paperkit — 现有论文写作工具分析

目标：构建面向**基础数学**（纯数学：代数几何、代数、数论等方向）学术论文写作工具包 `paperkit/`，含 `agents/`、`skills/`、`commands/` 三子目录。

分析对象 5 个工具：

| 工具 | 形式 | 定位 |
| --- | --- | --- |
| `opt/arm/paper-writing` | 单 SKILL.md | 纯数学（AG）LaTeX 论文写作流程 |
| `opt/ARS` | SKILL + 8 agents + 模板 + references | 通用学术论文 8 阶段流水线 |
| `opt/paper-writing` | SKILL + 6 subskills + 模板 | AI4Math 数学论文写作 adapter（证据审计核心） |
| `opt/research-writing-skill` | SKILL + 30 prompt 模板 + 2 脚本 | 科研写作全流程 prompt 库（中英） |
| `opt/texra-skills` | 9 个独立技能 | 数学实质增强/审稿/图表/OCR |

---

## 1. arm/paper-writing（math-paper-writing v1.0.0）

**能干什么**
- 纯数学论文完整工作流：定义贡献一句话 → 大纲（含各节长度表）→ 逐节写作 → 图表 → 引用 → 编译。
- 数学写作规则：定义先于定理、假设先于陈述、直觉先于严谨、精确优于冗长、记号一致性、明确归因。
- 定理/证明格式模板（`\begin{theorem}` + `\begin{proof}`，直觉先行）。
- 图表工具选型表：tikz-cd（交换图）、tikz（几何示意）、pgfplots（函数图）。
- LaTeX 检查清单：label/ref、cite/bib、无 undefined reference、浮点、环境一致性。

**强项**：基础数学结构感最强——章节布局、定理陈述规范、AG 惯例（光滑射影簇、特征零代数闭域 $k$ 等）。

**弱项**
- 无 claim-evidence 追踪、无 proof-obligation 审计（不自查证明漏洞）。
- 无记号表（notation ledger）工具化。
- 无审稿/修订环节；无中英双语摘要。
- 引用只给通用指令（BibTeX + 核实），未对接 arXiv/MathSciNet 惯例。

---

## 2. ARS（paper skill，8 agents）

**能干什么**
- 8 阶段流水线：intake（配置访谈）→ literature_strategist（文献策略）→ structure_architect（结构）→ argument_builder（论证链 CER）→ draft_writer（逐节初稿）→ abstract_bilingual（中英双语摘要，独立撰写非机械翻译）→ formatter（LaTeX/DOCX/PDF 格式）→ revision_coach（审稿意见解析 → 修订路线图）。
- **Phase Boundary 纪律**：每 agent 单相，禁越界写其他 phase 文件、禁模拟他人输出、禁"好心续写"。
- 模式：full / plan / outline / draft / abstract / format / revision。
- 模板：theoretical paper、IMRaD、literature review、bilingual abstract、conference、revision tracking 等。
- references：academic_writing_style、paper_structure_patterns、failure_paths、writing_quality_check、citation_format_switcher、journal_submission_guide、anti_leakage、disclosure 协议等。

**强项**：流水线骨架 + 阶段纪律最完整；revision_coach 独立可用（任意草稿 + 审稿意见 → 修订计划）；双语摘要。

**弱项**
- 通用学科（HEI 域），非数学专用：结构模板偏社科/实证（IMRaD、case study、policy brief）。
- 无数学正确性审查（peer_reviewer 被裁掉）；无记号一致性、无公式可读性专项。
- 流程重（8 agent 全跑开销大）；无 LaTeX 编译审计。

---

## 3. opt/paper-writing（AI4Math adapter，6 subskills）

**能干什么** — 数学论文写作中最强的**证据/严谨性**核心：

| Subskill | 功能 |
| --- | --- |
| paper-skeleton-and-logical-architecture | 笔记/定理 → 论文骨架、贡献主轴、结果依赖图、缺口清单 |
| claim-evidence-ledger | 每条实质断言 → 证明/引用/实验/显式不确定性 溯源 |
| proof-obligation-and-assumption-audit | 假设、量词、定义域、边界情形、外部定理适用性、证明覆盖度审计 |
| notation-and-variable-consistency | 记号表、变量复用、未定义符号、作用域、记号漂移检查 |
| formula-environment-and-readability | 公式环境选择、长式断行、定理/证明环境、公式-散文衔接 |
| latex-build-and-layout-audit | 编译、latexmk 日志、undefined ref、重复 label、宏卫生、浮点、arXiv/期刊兼容 |

**强项**：claim-evidence ledger、proof-obligation audit、notation ledger 正是基础数学论文最需要的严谨性工具。source-grounded 原则（不发明定理/引用/结果）。模板齐：source-packet、rapid-prototype-skeleton、claim-evidence-ledger、proof-obligation-ledger、submission-readiness。

**弱项**
- 无 theorem/proof 写作规范指导（假设陈述、直觉先行）——由 arm 覆盖。
- 无图表（tikz）技能；无审稿/修订环节；无翻译/润色 prompt。
- 无 agents 流水线（单一 workflow + registry 路由）。

---

## 4. research-writing-skill（30 prompt 模板）

**能干什么** — 全流程 prompt 库（中英）：

| 类别 | Prompt |
| --- | --- |
| 翻译润色 | zh2en、en2zh、zh-polish、en-shorten、en-expand、en-polish（TOP 期刊标准） |
| 去 AI 味 | zh-deai、en-deai |
| 检查 | logic-check（挑刺王）、abbrev-check |
| 图表 | architecture-diagram、chart-recommend、figure-caption、table-caption |
| 结果 | experiment-analysis |
| 审稿 | simulate-reviewer |
| 文献 | lit-summary、lit-compare、research-gap |
| 大纲初稿 | outline-gen、section-expand、abstract、introduction、method |
| 投稿 | rebuttal、cover-letter |
| 其他 | grant-proposal、research-proposal、academic-talk、ai-tool-select |

**强项**：覆盖面最广；中英双向 + 去 AI 味 + 模拟审稿；每个 prompt 独立文件按需加载；脚本 escape_latex.py、title_case.py 可直接复用。

**弱项**
- 通用学术导向，无数学特殊性（公式、定理、证明）。
- 无证据审计（会建议"补充实验"等非数学动作）。
- 纯 prompt，无流程编排、无 agents。

---

## 5. texra-skills（9 技能，零依赖）

**能干什么**

| 技能 | 功能 |
| --- | --- |
| manuscript-review | 数学正确性审计：独立验证关键计算、极限情形、量纲/符号/因子、记号追踪、代码-手稿一致性；findings-first，按严重度排序，区分确认错误/疑似/开放问题 |
| mathematical-enhancer | 数学实质增强：更优证明、更紧界、更一般定理；实现有把握的改进，标注推测性想法 |
| inline-paper-critic | 推导密集手稿内联批注（`\criticize{comment}{severity}{confidence}` 宏，编译安全） |
| writing-commenter | 三模式批注：逻辑流 / 记号一致性 / 编辑提升 |
| tikz-figure-builder | TikZ 图迭代构建：编译-视觉读取循环，数学正确优先于美观 |
| literature-search | 一手来源优先、交叉验证、引用精确 |
| math-ocr | 手写/图像数学 → 符号一致的可编译 LaTeX |
| scientific-simplifier | 代码/LaTeX/文本简化（行为不变） |
| scientific-presenter | Beamer 幻灯片/海报 |

**强项**：数学实质最强——审稿会独立验证计算、增强器会真的把证明写出来。tikz 构建循环（编译-看图-修复）与 arm 的图表表互补。agents/openai.yaml 元数据模式（interface: display_name/short_description/default_prompt）可复用。

**弱项**
- 无写作流程编排（各技能独立触发）。
- 无证据 ledger、无 proof-obligation 结构审计（有 manuscript-review 但面向成品手稿）。
- 无翻译/润色/双语摘要；无引用格式管理。

---

## 6. 能力矩阵（按论文生命周期）

| 阶段 | arm | ars | paper-writing | research-writing | texra |
| --- | :-: | :-: | :-: | :-: | :-: |
| 配置访谈/材料清点 | – | ✅ intake | – | – | – |
| 文献策略/检索 | – | ✅ | – | ✅ lit-summary/compare | ✅ literature-search |
| 论文骨架/依赖图 | ✅ 大纲 | ✅ structure | ✅ skeleton | ✅ outline-gen | – |
| 论证链/证据 | – | ✅ argument | ✅ claim-evidence | – | – |
| 定理/证明写作规范 | ✅ | – | – | – | – |
| 逐节初稿 | ✅ | ✅ draft | – | ✅ 22-25 | – |
| 证明义务审计 | – | – | ✅ proof-obligation | – | ✅ manuscript-review |
| 记号一致性 | ✅ 规则 | – | ✅ notation-ledger | – | ✅ writing-commenter |
| 公式可读性 | – | – | ✅ formula | – | – |
| 数学实质增强 | – | – | – | – | ✅ enhancer |
| 图表 (tikz) | ✅ 选型表 | – | – | ✅ caption | ✅ tikz-builder |
| LaTeX 编译审计 | ✅ checklist | ✅ formatter | ✅ build-audit | – | – |
| 双语摘要 | – | ✅ | – | – | – |
| 翻译/润色/去 AI | – | – | – | ✅ 1-8 | – |
| 模拟审稿 | – | – | – | ✅ 16 | ✅ critic |
| 修订/回复审稿人 | – | ✅ revision | – | ✅ 26 | – |
| Cover letter/投稿 | – | ✅ formatter | ✅ submission | ✅ 27 | – |
| 数学 OCR | – | – | – | – | ✅ |
| 引用核实 (arXiv/MSN) | ✅ 指令 | – | ✅ audit | – | ✅ lit-search |

## 7. 对基础数学的缺口

1. **数学引用规范未成技能**：arXiv/MathSciNet 核实、禁虚构、引用精确到定理号/页码、一手来源优先——5 工具仅 texra literature-search 部分覆盖，需成独立 skill（不依赖项目 AGENTS.md 惯例）。
2. **定理-证明写作规范**：arm 有雏形但无 checklist 化、无"假设完整列举""环境一致性（theorem/lemma/proposition/remark）"强制项。
3. **证明义务审计与证据台账联用**：paper-writing 有工具，但未与 theorem/proof 写作规范串成流程。
4. **双语摘要**：ars 有但通用化；需套 semitrans 术语表（dictionary.md/abbrev.md）数学半翻译规则。
5. **流程编排**：5 工具各自独立，无统一入口与阶段纪律（ars 的 phase boundary 值得保留）→ 确定 pipeline。
6. **commands 层**：30 prompts 中的数学相关子集可下沉为可直接调用的命令（translate/polish/de-ai/review/abstract/intro/outline/rebuttal/cover-letter + latex 编译命令）。
7. **来源声明**：所有内容需标注上游 repo（arm/ars/AI4Math/research-writing/texra），便于追溯与更新。
