# Paperkit — 计划

目标：构建 `modules/paper/`（`agents/`、`skills/`、`commands/`），面向基础数学（纯数学）学术论文写作。集成 5 个现有工具的长处，补引用惯例/定理写作规范缺口。

## 架构决策

1. **skills/ 为严谨性核心**：以 `opt/paper-writing` 6 subskills 为骨架（claim-evidence、proof-obligation、notation、formula、skeleton、latex-build），并入 texra 的 manuscript-review / enhancer / tikz-builder，补 arm 的 theorem-proof-writing。每个 skill 一份 SKILL.md（frontmatter: name/description，匹配 `.agents/skills/` 格式）。每个文件头部声明来源 repo。
2. **agents/ 为确定流水线**：吸收 ars 8 agent 流水线 + **phase boundary 硬纪律**（单相职责、禁越界写下游文件、禁模拟他人输出、禁好心续写），裁掉通用学科杂质，改为数学专用顺序 pipeline：
   `intake → structure-architect → theorem-writer → proof-reviewer → abstract-bilingual → formatter → revision-coach`（单次论文写作走全链；各 agent 亦可独立调用）。每 agent 引用对应 skills。
3. **commands/ 为即用命令**：从 research-writing 30 prompts 抽取**仅数学相关**子集（zh2en/en2zh/polish/de-ai/logic-check/simulate-reviewer/outline/section-expand/abstract/intro/rebuttal/cover-letter/lit-summary）+ latex 命令（compile/audit）。每命令一个模板文件，`{{变量}}` 占位，头部声明来源。
4. **引用规范（不依赖 AGENTS.md）**：citation-check 技能只做数学论文通用引用规范——arXiv/MathSciNet/DOI 核实、禁虚构引用、引用精确到定理号/页码、一手来源优先。
5. **双语摘要复用 semitrans**：abstract-bilingual 调 semitrans 术语表（`dictionary.md` / `abbrev.md`），中英独立撰写非机械翻译。
6. **零依赖**：同 texra，无脚本/包/API 依赖；latex 命令仅调系统 latexmk/pdflatex，缺失则降级静态检查。
7. **README 声明来源**：`README.md` 列出每个 skill/agent/command 的出处——上游工具名 + GitHub 仓库 URL + 改编程度（原样/改编/新增）。

## 任务列表

### Phase 1: 骨架与规范（依赖 None）
- [x] T1: `modules/paper/README.md` — 包结构、触发词、使用方式、**来源声明表**（上游工具 + GitHub 仓库 + 改编程度）
- [x] T2: `skills/theorem-proof-writing/SKILL.md` — 定理陈述/证明写作规范（假设先于陈述、直觉先于严谨、环境一致性、label/ref），改编自 arm/Orchestra-Research + latex 惯例
- [x] T3: `skills/citation-check/SKILL.md` — arXiv/MathSciNet/DOI 核实、禁虚构引用、引用精确到定理号/页码；改编自 texra literature-search，不依赖任何项目 AGENTS.md

### 检查点 1
- [x] 两个新技能符合 `.agents/skills/` frontmatter 格式
- [x] 示例 LaTeX 片段编译通过（latexmk -pdf）

### Phase 2: 严谨性核心（依赖 T1）
- [x] T4: `skills/paper-skeleton/SKILL.md` — 改编 paper-writing skeleton
- [x] T5: `skills/claim-evidence-ledger/SKILL.md` + `templates/claim-evidence-ledger.md`
- [x] T6: `skills/proof-obligation-audit/SKILL.md` + `templates/proof-obligation-ledger.md`
- [x] T7: `skills/notation-consistency/SKILL.md` — 记号表
- [x] T8: `skills/formula-readability/SKILL.md`
- [x] T9: `skills/latex-build-audit/SKILL.md` — 编译/label/cite/浮点/arXiv 兼容
- [x] T10: `skills/manuscript-review/SKILL.md` — 改编 texra：数学正确性、独立验证计算、findings-first
- [x] T11: `skills/tikz-figure-builder/SKILL.md` — 编译-视觉读取循环
- [x] T12: `skills/mathematical-enhancer/SKILL.md` — 有把握才实现，推测标注为建议

### 检查点 2
- [x] 9 个 skill 全部就位，registry 索引（`skills/registry.yaml`）
- [x] 每个 skill 有 inputs/outputs/质量条

### Phase 3: agents 流水线（依赖 Phase 2）
- [x] T13: `agents/intake.md` — 配置访谈 + 材料清点（source-packet）
- [x] T14: `agents/structure-architect.md` — 骨架 + 依赖图 + 字数分配
- [x] T15: `agents/theorem-writer.md` — 逐节撰写，调 theorem-proof-writing + claim-evidence + notation skills
- [x] T16: `agents/proof-reviewer.md` — 调 manuscript-review + proof-obligation，findings-first
- [x] T17: `agents/abstract-bilingual.md` — 中英双语摘要，复用 semitrans 术语表（dictionary.md/abbrev.md），中英独立撰写
- [x] T18: `agents/formatter.md` — LaTeX 格式 + latex-build-audit + cover letter
- [x] T19: `agents/revision-coach.md` — 审稿意见 → 修订路线图（独立可用）
- [x] T20: 每 agent 含 phase boundary 纪律块

### 检查点 3
- [x] 8 agent 单相职责无重叠、无越界
- [x] 端到端试跑：给定 source-packet → 骨架 → 定理草稿 → 审稿 → 修订

### Phase 4: commands（依赖 Phase 2 技能；仅数学相关子集，每文件声明来源）
- [x] T21: `commands/translate.md`（zh2en/en2zh）
- [x] T22: `commands/polish.md`（en-polish/zh-polish）
- [x] T23: `commands/deai.md`（zh/en 去 AI 味）
- [x] T24: `commands/logic-check.md` + `commands/abbrev-check.md`
- [x] T25: `commands/simulate-reviewer.md`
- [x] T26: `commands/outline.md` + `commands/section-expand.md`
- [x] T27: `commands/abstract.md` + `commands/introduction.md`
- [x] T28: `commands/rebuttal.md` + `commands/cover-letter.md`
- [x] T29: `commands/lit-summary.md`（zotero 优先）
- [x] T30: `commands/latex-compile.md` + `commands/latex-audit.md`（latexmk/pdflatex 调用）

### 检查点 4
- [x] 命令模板与对应 skill 交叉引用
- [x] 每个命令有 `{{变量}}` 清单与输出约定

## 风险

| 风险 | 影响 | 缓解 |
| --- | --- | --- |
| 技能过多难维护 | Med | registry.yaml 集中索引；每技能小而专 |
| 与 .agents/skills 及 toolkit 重复 | Med | 复用而非复制；paperkit 只管论文写作，semitrans/zotero 已在别处 |
| 编译审计依赖本机 TeX 环境 | Low | latex 命令检测 latexmk，缺失则降级为静态检查 |
| 流水线过重（ars 教训） | Med | agents 可独立调用；默认走 skill 直达路径 |

## 已定决策（用户确认）

1. agents 用 phase-boundary 硬纪律，确定顺序 pipeline ✓
2. commands 只收数学相关子集 ✓
3. 要 latex 编译命令 ✓
4. 双语摘要复用 semitrans 术语表 ✓
5. 不依赖 AGENTS.md 内容（引用规范独立于项目惯例）✓
6. README 声明所有来源 repo ✓
