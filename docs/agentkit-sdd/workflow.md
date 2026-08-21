# SDD — Spec-Driven Development Workflow

Spec-Driven Development 工作流。两个独立工作流 (lite / default) 共享同一条 6 阶段流水线, 无 tier 概念, 无独立 router skill — 阶段路由由 `app-sdd` / `app-lite-sdd` 的 task-routing 表直接承担。

## 6 阶段流水线

```
Clarify → Plan → Code → Test → Review → Archive
   │        │      │       │       │        │
 理解需求  拆任务  实施   验证    审查     收尾
```

每阶段工具见下文; 任务路由: 新会话 → `/pickup`; 之后按 `app-sdd` (default) 或 `app-lite-sdd` (lite) 的阶段表选命令/skill。

## 两种工作流

| | **default (lightspec)** | **lite (文件驱动)** |
|---|---|---|
| 四文件 | 简单: 项目级视图 | 全部细节 |
| 细节 | `lightspec/` (specs/changes) | 就在四文件里 |
| 提案 | `spec-proposal` + validate | 无 (lite-refine 收敛) |
| 入口 | `/init-sdd` | `/init-lite-sdd` |
| 实施 | `/build` | `/lite-build` |
| 引导 | `app-sdd` | `app-lite-sdd` |

选择依据: 项目是否需要 change 级 proposal/archive 纪律。二者独立使用, 可互迁 (`/upgrade`: lite → default)。

## 四文件契约

| File | 角色 |
| ---- | ---- |
| `SPEC.md` | 项目级意图: Goal / What We're Building / Decisions |
| `PLAN.md` | 路线图 + 进度: default = 每 change 一节 phase 勾选; lite = 完整任务勾选框 |
| `DESIGN.md` | 架构深度, 需要时创建; default 的 change `design.md` 可引用 |
| `HANDOFF.md` | `/rest` 写, `/pickup` 读 — 暂停点 + blocker |

## 共享命令

`/pickup` (进度+续接) · `/archive` (阶段收尾) · `/rest` (暂停+HANDOFF) · `/upgrade` (lite→default)

共享命令不含工作流逻辑 — 差异由 AGENTS.md 工作流块 (`LIGHTSPEC` / `LITESPEC`) 决定, init 命令写入。

## 阶段工具

### 1. Clarify — 理解需求

- **default**: `spec-proposal` (lightspec/changes/<id>/: proposal.md, tasks.md, design.md, spec deltas) → `plan-reviewer` → `lightspec validate --strict`
- **lite**: `lite-brainstorm` (发散) → `lite-refine` (收敛 → SPEC.md)

### 2. Plan — 拆任务

- **default**: `planning` → 每 change 的 tasks.md; 根 PLAN.md 存路线图
- **lite**: `lite-plan` → PLAN.md phases + `- [ ]` 勾选框, 每任务带 `(acceptance: ...)`

### 3. Code — 实施

- `building` (plan-driven, thin slices, ponytail 极简) — 两工作流共用
- **lite** 经 `/lite-build`: 取 PLAN.md 下一未完成任务, 实现, 自审, 打勾

### 4. Test — 验证

- 按 plan acceptance 逐条验证 (测试工具见 extra: `test-driven-development`, `browser-testing-with-devtools`)

### 5. Review — 审查

- `reviewing` 五轴 (correctness/readability/architecture/security/performance) + ponytail 过审

### 6. Archive — 收尾

- `/archive` (共享): 验证完成 → PLAN 标记 → SPEC 决策回写 → README/CHANGELOG → 按工作流块跑 lightspec archive

## Router 说明

- **无独立 code-router / spec-router / test-router skill** — 旧版曾有, 内容已折叠进 `app-sdd` (clarify 路由表 + test 路由表), 文件保留为 reference
- 任务路由入口: `/pickup` (续接) + `app-sdd` / `app-lite-sdd` (阶段选择)

## extra 工具 (工作流无关)

工作流阶段之外的通用能力, 按需引用:

- **coding**: `test-driven-development` `code-review-and-quality` `source-driven-development` `api-and-interface-design` `frontend-ui-engineering` `browser-testing-with-devtools` `ci-cd-and-automation` `code-simplification` `debugging-and-error-recovery` `deprecation-and-migration` `performance-optimization` `security-and-hardening` `context-engineering` `git-workflow-and-versioning` `documentation-and-adrs`
- **推理**: `think` `expert-panel` `advisor` `orchestrate` `discovery` `idea-refine` `grill-me` `interview-me` `peer-review`
- **系统创作**: `craft-skill` `designing-agents`
- **检索**: `context7`
- **极简**: `ponytail` 家族 (ponytail-review/audit/debt/gain/help)

## 目录

```
sdd/
├── README.md          # 包文档: 两工作流 + extra + 共享命令
├── AGENTS.md          # 本仓库工作流 (开发 sdd 自身)
├── workflow.md        # 本文档 — 通用流程说明
├── skills/            # 工作流 skills (app-sdd / app-lite-sdd / lite-* / 共享件) + extra 工具 (平铺)
├── agents/            # agent personas (orchestrator / lite-* / 专业角色)
├── commands/          # slash commands (/init-sdd /init-lite-sdd /pickup /archive /rest /upgrade …)
└── .agents/           # (占位)
```
