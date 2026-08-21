<!-- LIGHTSPEC:START -->

# LightSpec Instructions

IF (and only if) the user message:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

THEN:
Do the following:

- [ ] Suggest switching to `/plan` mode before writing the proposal if it's not already the case
- [ ] When the user approves the plan and terminates planning mode, run `lightspec-apply` to implement the approved proposal.
- [ ] Run `lightspec-proposal`.
- [ ] Do not implement the feature until the proposal is approved by the user. Implementation MUST be operated using `lightspec-apply` to ensure the implementation is properly tracked and documented.
- [ ] If unsure which skill to run, list installed skills.

Keep this managed block so 'lightspec update' can refresh the instructions.

<!-- LIGHTSPEC:END -->

# SDD 仓库

Spec-Driven Development 工作流。两个**独立**工作流 + extra 工具类, 无 tier 概念:

## default 工作流 (lightspec)

- 四文件 (SPEC/PLAN/DESIGN/HANDOFF) 保持简单, 细节在 `lightspec/`
- 入口 `/init-sdd` → 循环 `/spec` → `/plan` → `/build` → `/review` → `/ship` → archive
- 工作流权威: `skills/init-sdd/references/AGENTS.md` — `/init-sdd` 复制到项目 `lightspec/AGENTS.md`
- 项目引导: `skills/app-sdd/SKILL.md`
- 工具: 仅工作流相关 (init/spec/plan/build/review/archive 阶段件)

## lite 工作流 (文件驱动)

- 四文件承载全部细节, 无 CLI, 无 proposal gate
- 入口 `/init-lite-sdd` → 循环 `/lite-build` → `/archive`
- 项目引导: `skills/app-lite-sdd/SKILL.md`
- 工具: 仅工作流相关 (lite-brainstorm/refine/plan/build + 共享件)

## extra 工具 (工作流无关)

通用能力, 不属于任一工作流流程: coding 技能 (tdd/review/debug/security/performance…), 深度推理 (think/expert-panel/advisor), 系统创作 (craft-skill/designing-agents), 极简哲学 (ponytail 家族), 文档检索 (context7) 等。目录平铺于 `skills/`, 按需引用。

## 共享命令

- `/pickup` — 进度检查 + 续接 (读项目 AGENTS.md 工作流块 + 四文件)
- `/archive` — 阶段收尾 (lightspec 步骤按工作流块)
- `/rest` — 暂停 + HANDOFF
- `/upgrade` — lite → default 迁移

差异由 init 写入项目的 AGENTS.md 工作流块 (`<!-- LIGHTSPEC:START -->` / `<!-- LITESPEC:START -->`) 决定。

## 命令速查

| 命令              | 工作流 | 用途                                                         |
| ----------------- | ------ | ------------------------------------------------------------ |
| `/init-sdd`       | default| 初始化 (lightspec/ + SPEC/PLAN + AGENTS.md 块)               |
| `/init-lite-sdd`  | lite   | 初始化 (SPEC/PLAN + AGENTS.md 块)                            |
| `/spec`           | default| 提案 (spec-proposal + 访谈 + 审查)                           |
| `/plan`           | 共享   | 计划 (按工作流块路由 planning / lite-plan)                   |
| `/build`          | default| 实施 (lightspec-apply + coding skills)                       |
| `/lite-build`     | lite   | 实施 (PLAN.md 下一任务 + 打勾)                               |
| `/test`           | 共享   | 测试                                                         |
| `/review`         | 共享   | 审查                                                         |
| `/ship`           | 共享   | 发布                                                         |
| `/pickup`         | 共享   | 进度检查 + 续接                                              |
| `/archive`        | 共享   | 阶段收尾                                                     |
| `/rest`           | 共享   | 暂停 + HANDOFF                                               |
| `/upgrade`        | 共享   | lite → default 迁移                                          |
| `/code-simplify`  | 共享   | ponytail 极简审查                                            |
| `orchestrate`     | extra  | 多 agent 编排 (skill)                                        |
