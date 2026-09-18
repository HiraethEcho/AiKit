# AiKit

一个 AI 工具集合，提供各种 AI 代理、技能和模板。

## Harness

编码代理：

- pi
- opencode
- reasonix
- zerostack
- dsh

以及：

- codex
- claude code

### pi 扩展

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

等等

### opencode

### dsh

## 人设 (Persona)

自定义人设：

- build
- general
- scout
- audit
- plan
- reviewer

## 模块

### 基础 (Base)

基础工具 — 内容手动挑选中

### Spec 驱动

轻量工作流 (lite 全套, 文件驱动)：

- 技能：app / init / brainstorm / refine / plan / task + pickup/archive/rest/upgrade
- 代理：conductor / slicer / maker / tester / inspector
- 命令：init / task

### 使用 LightSpec

重型工作流 (SDD/lightspec, default 工作流)：

- 技能：app-sdd / init-sdd / spec-proposal / spec-driven-development / planning
- 代理：orchestrator / planner / plan-reviewer / builder / code-reviewer / documenter / releaser
- 命令：init-sdd / spec / plan / build / test / review / ship

### 开发工具 (Dev)

代码额外工具池：工作流外工具 (context7, ponytail-\*, tdd, security …)。不进 workflow preset。

### 额外工具 (Extra)

纯工具（文献 API、ocr、翻译、格式规范 + agentkit/skills/extra 并入 32 skills, 共 48 + agents）。不进 workflow preset。

### 论文 (Paper)

写论文 + 收到 review 后修改。skills/agents/commands 见 `manifest.toml`。

### 审稿 (Review)

审稿 + 读论文批注（论文 review）。

### 研究 (Research)

研究辅助（ideation/literature-survey/proof-exploration/orchestration/math-deep-research/research-loop）。

## 部署 (Deploy)

Inspired by [OpenAgentControl](https://github.com/darrenhinde/OpenAgentsControl)

- 真源: `harness/agents.toml` (agents presets / agents.mcp / pi packages-skills-prompts-mcp) + `harness/agents/pi/settings.example.json` 模板
- `python3 deploy/gen.py` — 独立生成脚本, 重生成 deploy/manifest/preset/agents 的 lua+json (+yaml 只读 sidecar, 脚本不用)
- `python3 deploy/deploy.py agents` — 预览 (.agents 链接计划 + mcp.json + pi settings)
- `python3 deploy/deploy.py agents --project <proj>` — 写 `<proj>/.agents/` + `<proj>/.pi/settings.json`
- `python3 deploy/deploy.py agents --global` — 写 `~/.agents/` + `~/.pi/agent/settings.json`
