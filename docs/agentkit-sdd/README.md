# SDD (Spec-Driven Development) Workflow

A structured spec-driven development workflow for AI coding agents. 两个**独立**工作流, 各自自足:

- **default 工作流** — lightspec 管理 (proposal/apply/archive 纪律), 四文件保持简单, 细节在 `lightspec/`
- **lite 工作流** — 文件驱动 (四文件承载全部细节), 无 CLI, 无仪式

工作流无关的通用工具归 **extra 类** (见下文)。

完整工具归属清单: [`tool-map.yaml`](tool-map.yaml) (lite / sdd / shared / extra × agents / skills / commands, 带注释)。

```
clarify → plan → code → review → archive
   │        │      │      │        │
 get idea  plan   build  review   archive
 + spec    tasks  slices 5-axis   decisions
```

## 四文件契约 (两个工作流共有)

| File         | default (lightspec)                                | lite (文件驱动)                       |
| ------------ | --------------------------------------------------- | -------------------------------------- |
| `SPEC.md`    | 项目级意图源 (Goal/What/Decisions), 简单            | Goal/What/Decisions, 承载细节          |
| `PLAN.md`    | 路线图: 每 change 一节, phase 勾选框                | 完整任务清单: phases + task checkboxes |
| `DESIGN.md`  | 设计配套 (change 的 design.md 可引用)               | 架构细节, 需要时创建                   |
| `HANDOFF.md` | `/rest` 写入, `/pickup` 读取                        | 同左                                   |
| `lightspec/` | change 级细节 (proposal/design/tasks/specs)         | — (不存在)                             |

## 工作流引导

- `skills/app-sdd/` — default 工作流指南: `/init-sdd` → `/spec` → `/plan` → `/build` → `/review` → `/ship` → archive
- `skills/app-lite-sdd/` — lite 工作流指南: `/init-lite-sdd` → `/lite-build` → `/archive`, 零 CLI

---

## default 工作流 (lightspec)

Proposal → apply → archive 纪律, `lightspec/` 作 change 存储。四文件只放项目级视图。仅含工作流相关工具。

### Loop

```
/init-sdd → /spec (proposal) → /plan → /build → /review → /ship → archive
```

### 工作流工具

| Skill                                    | What It Does                                                    | Use When                                        | Agent         |
| ---------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------- | ------------- |
| [app-sdd](skills/app-sdd/SKILL.md)       | default workflow guide — route by stage, lightspec flow         | Starting a session in a lightspec project       | orchestrator  |
| [init-sdd](skills/init-sdd/SKILL.md)     | Init — lightspec/ + SPEC.md + PLAN.md + AGENTS.md 工作流块      | New project needing proposal/archive discipline | orchestrator  |
| [spec-proposal](skills/spec-proposal/SKILL.md) | Scaffold a validated change proposal (proposal/design/tasks/spec deltas) | New feature, change, non-trivial work    | planner       |
| [spec-driven-development](skills/spec-driven-development/SKILL.md) | Clarify-stage spec engine — assumptions, claims, success criteria | Unclear requirements, new features       | planner       |
| [planning](skills/planning/SKILL.md)     | Plan entry — mode selector: quick-plan/spec/architecture         | Breaking a spec into implementable units         | planner       |
| [planning-and-task-breakdown](skills/planning-and-task-breakdown/SKILL.md) | Deep task decomposition — dependency graph, vertical slicing | Spec/architecture mode detail            | planner       |
| [building](skills/building/SKILL.md)     | Thin vertical slices + ponytail — plan-driven modes, acceptance validation | Any implementation                    | builder       |
| [reviewing](skills/reviewing/SKILL.md)   | Review entry — five-axis, fresh-perspective, criteria-walk      | Any review                                        | code-reviewer |
| [archive](skills/archive/SKILL.md)       | 共享收尾 — verify → docs → variant archival step (lightspec archive) | Change complete                          | documenter    |
| [shipping](skills/shipping/SKILL.md)     | Release prep — git, docs, commit/release/archive                | Preparing release                                | releaser      |
| [knowledge-capture](skills/knowledge-capture/SKILL.md) | Capture decisions, solutions, lessons learned         | Preserving learnings (archive 阶段)              | documenter    |

**Reference (已折叠进 app-sdd)**

| Skill                                      | Note                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| [spec-router](skills/spec-router/SKILL.md) | Former clarify router — content folded into [app-sdd](skills/app-sdd/SKILL.md) as reference |
| [test-router](skills/test-router/SKILL.md) | Former test router — content folded into [app-sdd](skills/app-sdd/SKILL.md) as reference    |

### 命令

| Command            | When                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| `/init-sdd`        | new lightspec project — lightspec/ + SPEC/PLAN + AGENTS.md 工作流块   |
| `/spec`            | proposal (spec-proposal + discovery interview + plan-reviewer)        |
| `/plan`            | plan entry (quick-plan/spec/architecture modes)                       |
| `/build`           | implement (lightspec-apply, plan-driven slices)                       |
| `/test`            | write/run tests (test-driven-development)                             |
| `/review`          | five-axis review                                                      |
| `/ship`            | release prep                                                          |
| `/code-simplify`   | ponytail minimal-code review                                          |
| `/ponytail` …      | `/ponytail-review` · `/ponytail-audit` · `/ponytail-debt` · `/ponytail-gain` · `/ponytail-help` |

---

## lite 工作流 (文件驱动)

`SPEC.md` + `PLAN.md` + optional `DESIGN.md` + `HANDOFF.md`, 无 CLI, 无 proposal gate, 无 validate。纯 markdown + 勾选框。独立自足。

### Loop

```
lite-brainstorm (get idea) → lite-refine (→ SPEC.md) → lite-plan (→ PLAN.md)
→ lite-plan-reviewer → lite-orchestrator (main agent, drives lite-builder + lite-test-engineer)
→ lite-code-reviewer → archive
```

### 工作流工具

| Skill                                        | What It Does                                                          | Use When                          | Agent              |
| -------------------------------------------- | --------------------------------------------------------------------- | --------------------------------- | ------------------ |
| [app-lite-sdd](skills/app-lite-sdd/SKILL.md) | Lite workflow guide — 6-stage file-driven loop, no CLI                | Starting a session in a lite project | lite-orchestrator |
| [init-lite-sdd](skills/init-lite-sdd/SKILL.md) | Scaffold lite file layer (SPEC.md + PLAN.md + AGENTS.md 工作流块)    | New lite project                   | lite-orchestrator  |
| [lite-brainstorm](skills/lite-brainstorm/SKILL.md) | Lite idea generation — diverge, explore, produce brainstorm note | Lite clarify stage 1/2            | lite-orchestrator  |
| [lite-refine](skills/lite-refine/SKILL.md)   | Converge idea → SPEC.md via structured questioning                    | Lite clarify stage 2/2             | lite-orchestrator  |
| [lite-plan](skills/lite-plan/SKILL.md)       | SPEC.md → phased PLAN.md with checkboxes                              | Lite planning                      | lite-plan-reviewer |
| [lite-build](skills/lite-build/SKILL.md)     | Implement next PLAN.md task, tick checkbox                            | Lite per-task build                | lite-builder       |
| [archive](skills/archive/SKILL.md)           | Roll up completed phase — PLAN done + SPEC decisions (共享)           | Lite phase complete                | lite-code-reviewer |

### 命令

| Command            | When                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `/init-lite-sdd`   | new lite project — build SPEC.md + PLAN.md + AGENTS.md pointers (no CLI tooling)             |
| `/lite-build`      | implement next unfinished `- [ ]` in PLAN.md, tick it                                        |

### How to use (lite)

```
/init-lite-sdd      # 1. scaffold SPEC.md + PLAN.md
/lite-build         # 2. implement next task, tick checkbox (repeat)
/archive            # 3. phase done — mark PLAN, fold decisions into SPEC.md
```

---

## 共享命令

| Command     | 用途                                                                           |
| ----------- | ------------------------------------------------------------------------------ |
| `/pickup`   | 进度检查 + 续接 — 读 AGENTS.md 工作流块 + SPEC/PLAN/DESIGN/HANDOFF, 报 next step |
| `/archive`  | 阶段收尾 — 验证 → PLAN 标记 → SPEC 决策回写 → docs; lightspec 步骤按工作流块      |
| `/rest`     | 暂停 — PLAN.md ⏸ 注记 + HANDOFF.md 追加, 不归档                                |
| `/upgrade`  | lite → default (lightspec) 迁移 — 保留四文件, 加 lightspec/ 层, 换 AGENTS.md 块  |

共享命令不含工作流逻辑 — 差异由 `init-sdd` / `init-lite-sdd` 写入的 AGENTS.md 工作流块决定。

---

## extra 工具 (工作流无关)

不属于 lite/default 工作流流程的通用能力: coding 技能、深度推理、系统创作、极简哲学等。目录平铺于 `skills/`, 按需引用。

### Skills

| Skill                                                | What It Does                                                                                                                                                                                | Agent         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| [context7](skills/context7/SKILL.md)                 | 第三方库文档检索 (MCP)                                                                                                                                                                      | general       |
| [craft-skill](skills/craft-skill/SKILL.md)           | Generate/refine SKILL.md via 12 prompting techniques                                                                                                                                         | architect     |
| [designing-agents](skills/designing-agents/SKILL.md) | Author agent personas, skills, harnesses                                                                                                                                                     | architect     |
| [advisor](skills/advisor/SKILL.md)                   | Second-opinion advisor — 1-2 subagents (advice + devil's-advocate) review a decision/design/plan/code                                                                                          | orchestrator  |
| [expert-panel](skills/expert-panel/SKILL.md)         | Multi-perspective parallel analysis — different role perspectives to evaluate decisions, designs, plans                                                                                      | orchestrator  |
| [think](skills/think/SKILL.md)                       | Deep reasoning with frameworks — expert panel, devil's advocate, what-if, tradeoff matrix                                                                                                    | researcher    |
| [orchestrate](skills/orchestrate/SKILL.md)           | Multi-agent orchestration — dispatch specialists in parallel, own acceptance assertions, synthesize results                                                                                  | orchestrator  |
| [discovery](skills/discovery/SKILL.md)               | Structured exploration — explore/brainstorm/deep-dive modes, research mode, solution comparison                                                                                              | orchestrator  |
| [idea-refine](skills/idea-refine/SKILL.md)           | Convergent/divergent thinking — turn vague ideas into concrete proposals                                                                                                                     | orchestrator  |
| [grill-me](skills/grill-me/SKILL.md)                 | 需求访谈                                                                                                                                                                                    | orchestrator  |
| [interview-me](skills/interview-me/SKILL.md)         | 深度访谈                                                                                                                                                                                    | orchestrator  |
| [peer-review](skills/peer-review/SKILL.md)           | 同行评审                                                                                                                                                                                    | code-reviewer |
| [test-driven-development](skills/test-driven-development/SKILL.md) | Red-Green-Refactor, test pyramid, browser testing                                                                     | test-engineer |
| [code-review-and-quality](skills/code-review-and-quality/SKILL.md) | Deep review methodology — five-axis detail, PR triage, layered architecture                                          | code-reviewer |
| [source-driven-development](skills/source-driven-development/SKILL.md) | Ground decisions in official docs — verify, cite                                                                     | builder       |
| [api-and-interface-design](skills/api-and-interface-design/SKILL.md) | Contract-first design, error semantics, boundary validation                                                             | architect     |
| [frontend-ui-engineering](skills/frontend-ui-engineering/SKILL.md) | Component architecture, design systems, a11y, visual design guidance                                                    | builder       |
| [browser-testing-with-devtools](skills/browser-testing-with-devtools/SKILL.md) | Chrome DevTools MCP — DOM, console, network, performance                                                          | test-engineer |
| [ci-cd-and-automation](skills/ci-cd-and-automation/SKILL.md) | Pipeline setup, quality gates, feedback loops                                                                           | builder       |
| [code-simplification](skills/code-simplification/SKILL.md) | Reduce complexity, preserve behavior                                                                                    | code-reviewer |
| [debugging-and-error-recovery](skills/debugging-and-error-recovery/SKILL.md) | Systematic root-cause triage                                                                                          | researcher    |
| [deprecation-and-migration](skills/deprecation-and-migration/SKILL.md) | Code-as-liability, migration patterns, zombie removal                                                                   | builder       |
| [performance-optimization](skills/performance-optimization/SKILL.md) | Measure-first, profiling, anti-patterns                                                                                 | code-reviewer |
| [security-and-hardening](skills/security-and-hardening/SKILL.md) | OWASP prevention, auth, secrets, three-tier boundaries                                                                  | security-auditor |
| [context-engineering](skills/context-engineering/SKILL.md) | Feed agents right info — rules files, context packing                                                                   | general       |
| [git-workflow-and-versioning](skills/git-workflow-and-versioning/SKILL.md) | Trunk-based, atomic commits, structured commit groups                                                              | general       |
| [documentation-and-adrs](skills/documentation-and-adrs/SKILL.md) | ADRs, API docs, inline docs — document the why                                                                        | documenter    |
| [ponytail](skills/ponytail/SKILL.md)                 | Minimal-code 7-rung ladder, intensity levels, comment convention                                                                                                                      | code-reviewer |
| [ponytail-review](skills/ponytail-review/SKILL.md)   | Review current diff for over-engineering — delete-list with tagged findings                                                                                                           | code-reviewer |
| [ponytail-audit](skills/ponytail-audit/SKILL.md)     | Audit entire repository for over-engineering opportunities, ranked by cut potential                                                                                                   | code-reviewer |
| [ponytail-debt](skills/ponytail-debt/SKILL.md)       | Harvest ponytail comments into a debt ledger — track intentional simplifications                                                                                                      | code-reviewer |
| [ponytail-gain](skills/ponytail-gain/SKILL.md)       | Display ponytail benchmark scoreboard — LOC, cost, speed improvements                                                                                                                 | code-reviewer |
| [ponytail-help](skills/ponytail-help/SKILL.md)       | Quick reference card — levels, commands, 7-rung ladder                                                                                                                                 | code-reviewer |

### Personas (extra)

| Persona                                                      | Role                                                            |
| ------------------------------------------------------------ | --------------------------------------------------------------- |
| [deep-researcher](agents/deep-researcher.md)                 | Deep recon for cross-cutting questions                          |
| [claim-verifier](agents/claim-verifier.md)                   | Grounds claims against repo state (Verified/Weakened/Falsified) |
| [diff-auditor](agents/diff-auditor.md)                       | Pattern enumeration in a diff against invariants                |
| [scope-tracer](agents/scope-tracer.md)                       | Traces investigation paths, discovery summaries                 |
| [slice-verifier](agents/slice-verifier.md)                   | Per-slice adversarial verifier for phased plans                 |
| [integration-scanner](agents/integration-scanner.md)         | Reverse-reference lookup — what connects to X                   |
| [artifact-code-reviewer](agents/artifact-code-reviewer.md)   | Adversarial post-finalization review + coverage walk            |
| [codebase-locator](agents/codebase-locator.md)               | Super grep/find/ls                                              |
| [codebase-analyzer](agents/codebase-analyzer.md)             | Deep component analysis                                         |
| [codebase-pattern-finder](agents/codebase-pattern-finder.md) | Finds similar implementations/patterns                          |

---

## Personas (default 工作流)

| Persona                                        | Role                                                    | Primary skill                                                                        |
| ---------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [orchestrator](agents/orchestrator.md)         | Main coding agent (default) — coordinates workflow, dispatches specialists, owns acceptance assertions | [app-sdd](skills/app-sdd/SKILL.md) (+ orchestrate) |
| [planner](agents/planner.md)                   | Specs + task breakdown                                  | [planning](skills/planning/SKILL.md), [spec-proposal](skills/spec-proposal/SKILL.md) |
| [plan-reviewer](agents/plan-reviewer.md)       | Plan critic — completeness, ordering, feasibility       | [planning](skills/planning/SKILL.md)                                                 |
| [builder](agents/builder.md)                   | Implementer — thin vertical slices, verified increments | [building](skills/building/SKILL.md)                                                 |
| [code-reviewer](agents/code-reviewer.md)       | Five-axis review + quick review mode                    | [reviewing](skills/reviewing/SKILL.md)                                               |
| [test-engineer](agents/test-engineer.md)       | Tests — unit/integration/spec validation                | [test-driven-development](skills/test-driven-development/SKILL.md)                   |
| [security-auditor](agents/security-auditor.md) | Vulnerability detection, threat modeling                | [security-and-hardening](skills/security-and-hardening/SKILL.md)                     |
| [documenter](agents/documenter.md)             | READMEs, ADRs, API docs                                 | [documentation-and-adrs](skills/documentation-and-adrs/SKILL.md)                     |
| [releaser](agents/releaser.md)                 | Version bump, changelog, tag                            | [shipping](skills/shipping/SKILL.md)                                                 |
| [architect](agents/architect.md)               | Design decisions, ADRs                                  | [api-and-interface-design](skills/api-and-interface-design/SKILL.md)                 |
| [researcher](agents/researcher.md)             | Fast read-only recon, file:line citations               | —                                                                                    |
| [bowser](agents/bowser.md)                     | Playwright browser automation                           | [browser-testing-with-devtools](skills/browser-testing-with-devtools/SKILL.md)       |
| [general](agents/general.md)                   | General-purpose coding                                  | —                                                                                    |

lite 工作流 personas: `lite-orchestrator` `lite-plan-reviewer` `lite-builder` `lite-test-engineer` `lite-code-reviewer` (见 [app-lite-sdd](skills/app-lite-sdd/SKILL.md))。

---

## Installing

Skills, agents, and commands are portable. Copy `skills/`, `agents/`, `commands/` to your environment (or register `commands/` in pi's `prompts` settings). `init-sdd/references/AGENTS.md` is the workflow doc `/init-sdd` copies into new projects.

## Quick start

```
# new project
/init-sdd          # default 工作流: lightspec/ + SPEC.md + PLAN.md
/init-lite-sdd     # lite 工作流: SPEC.md + PLAN.md

# each session
/pickup        # where are we, what's next

# feature work (default)
/spec → /build → /review → /archive (runs lightspec archive per workflow block)

# feature work (lite)
/lite-build → /lite-build → /archive

# upgrade
/upgrade       # lite → default (保留四文件, 加 lightspec/ 层)
```
