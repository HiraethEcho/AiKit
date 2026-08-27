# AiKit

This is a kit of ai tools.

## agents

coding agents

- pi
- opencode
- reasonix
- zerostack
- dsh

and

- codex
- claude code

#### pi

extensions:

- pi-toolkit
  - rtk, cave, toon
  - doc
  - role
- agents
  - pi-agents
  - pi-asks
  - pi-tasks
- pi-board
- pi-footer

etc

#### opencode

#### dsh

## persona

自定义 personas
build/general/scout/audit/plan/reviewer

## base

基础工具 — 内容手动挑选中（此前 codekit 承载 shared 骨架）

### skills

- grill-me
- handoff

## codekit

轻 workflow (lite 全套, 文件驱动):

- skills: app / init / brainstorm / refine / plan / task + pickup/archive/rest/upgrade (骨架临时)
- agents: conductor / slicer / maker / tester / inspector (名称与 speckit 不同, 不靠 kit 前缀)
- commands: init / task (+ skeleton 命令)

## speckit

重 workflow (SDD/lightspec, default 工作流):

- skills: app-sdd / init-sdd / spec-proposal / spec-driven-development / planning / …
- agents: orchestrator / planner / plan-reviewer / builder / code-reviewer / documenter / releaser
- commands: init-sdd / spec / plan / build / test / review / ship

## devkit

code-extra 池: 工作流外工具 (context7, ponytail-*, tdd, security …)。不进 workflow preset。

## extra

纯工具（文献 API、ocr、翻译、格式规范 + agentkit/skills/extra 并入 32 skills, 共 48 + agents）。不进 workflow preset。

## paperkit

写论文 + 收到 review 后修改。skills/agents/commands 见 `manifest.toml`。

## reviewkit

审稿 + 读论文批注（论文 review）。

## researchkit

研究辅助（ideation/literature-survey/proof-exploration/orchestration/math-deep-research/research-loop）。

## modules

submodule 远程地址记录 (仅记录, 不 clone): `modules`

## deploy

- 真源: `harness/agents.toml` (agents presets / agents.mcp / pi packages-skills-prompts-mcp) + `harness/agents/pi/settings.example.json` 模板
- `python3 gen.py` — 独立生成脚本, 重生成 deploy/manifest/preset/agents 的 lua+json (+yaml 只读 sidecar, 脚本不用)
- `python3 deploy/deploy.py agents` — 预览 (.agents 链接计划 + mcp.json + pi settings)
- `python3 deploy/deploy.py agents --project <proj>` — 写 `<proj>/.agents/` + `<proj>/.pi/settings.json`
- `python3 deploy/deploy.py agents --global` — 写 `~/.agents/` + `~/.pi/agent/settings.json`
