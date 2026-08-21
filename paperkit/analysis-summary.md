# Paperkit — 工具分析摘要

5 工具各有所长，互补明显：

- **arm/paper-writing**：纯数学结构（AG 章节布局、定理/证明模板、直觉先于严谨）、图表选型表。
- **ars-paper**：8 agent 流水线 + phase boundary 纪律 + 双语摘要 + revision-coach；但通用学科、无数学正确性审查。
- **paper-writing**（AI4Math）：严谨性核心——claim-evidence ledger、proof-obligation audit、notation ledger、formula 可读性、latex build audit。最贴近基础数学需求。
- **research-writing-skill**：30 prompt 覆盖全流程（中英翻译、去 AI、润色、模拟审稿、rebuttal、cover letter）；通用学术、非数学专用。
- **texra-skills**：数学实质最强——manuscript-review（独立验证计算）、mathematical-enhancer（真写证明）、tikz-builder（编译-看图循环）；零依赖。

关键缺口（对基础数学）：

1. 数学引用规范未成技能（arXiv/MSN 核实、禁虚构、引到定理号/页码；独立于 AGENTS.md）
2. 定理-证明写作规范未 checklist 化
3. 证据台账与证明义务审计未与写作流程串联（需确定 pipeline）
4. 双语摘要需套 semitrans 术语表
5. 无统一编排入口
6. 需 latex 编译命令
7. 所有内容需声明上游 repo 来源

结论：paper-writing（严谨性）+ texra（数学实质）+ arm（结构规范）→ skills 层；ars → agents 层；research-writing → commands 层。
