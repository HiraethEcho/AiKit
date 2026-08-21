# Paperkit — 计划摘要

构建 `paperkit/{agents,skills,commands}`，面向基础数学论文写作，4 阶段 30 任务。

- **Phase 1 骨架**：README（含来源声明表）+ 2 新技能（theorem-proof-writing、citation-check）
- **Phase 2 严谨性核心**：9 skills（skeleton、claim-evidence、proof-obligation、notation、formula、latex-build、manuscript-review、tikz、enhancer）+ registry
- **Phase 3 agents**：8 agents（intake → structure-architect → theorem-writer → proof-reviewer → abstract-bilingual → formatter → revision-coach）+ phase boundary 硬纪律
- **Phase 4 commands**：12 命令（translate/polish/deai/logic-check/reviewer/outline/abstract/intro/rebuttal/cover-letter/lit-summary + latex compile/audit）

架构决策：skills 自 `opt/paper-writing` + texra + arm；agents 自 ars（数学化，确定 pipeline）；commands 自 research-writing 数学子集；citation-check 独立于 AGENTS.md；abstract-bilingual 复用 semitrans 术语表；latex 命令；零依赖；README 声明全部来源 repo。

已定：phase-boundary 硬纪律 / commands 子集 / latex 要 / 复用 semitrans / 不依赖 AGENTS.md / 声明来源。
