# Researchkit — 数学研究辅助

协助研究：发现问题、文献调研、证明探索、深研流水线、编排路由。

## 结构

```
researchkit/
├── manifest.toml   # 清单（5 skills / 15 agents / 2 commands）
├── README.md
├── skills/
│   ├── ideation/ literature-survey/ proof-exploration/ orchestration/   # arm 4 技能
│   └── math-deep-research/   # mrs 深研流水线（SKILL.md + references + templates）
├── agents/         # 15（math-researcher + bibliography/source-verification/synthesis…）
└── commands/       # ars-3w、ars-lit-review
```

## 流程

```
ideation → literature-survey → proof-exploration → paperkit（写）
     └────────── orchestration 路由 ──────────┘
深研：math-deep-research（8 modes: full/quick/review/lit-review/3w/fact-check/socratic/systematic-review）
```

## 来源

- arm 4 技能：opt/arm（AI-Research-SKILLs 精选，Orchestra Research）
- math-deep-research + agents + commands：opt/mrs/research（ARS for Math）
- 纯工具脚本（arxiv/crossref/openalex 客户端）→ toolkit/skills/literature-api
