# AGENTS.md

This file provides guidance for coding agents working in this repository.

## Project

**AiKit** — a kit of AI tools.

This is a collection of tools, agents, skills, and templates for working with AI
agents. The repo is being assembled incrementally as tools are collected.

## Layout

The intended structure (based on `README.md`):

```
agents/          # coding agents and their extensions/plugins
  pi/            # pi agent (+ extensions: pi-toolkit, pi-asks, pi-board)
  opencode/
  reasonix/
  zerostack/
  dsh/
  codex/
  claude-code/
persona/         # custom personas (build/general/scout/audit/plan/reviewer)
base/            # basic tools — 内容手动挑选中 (暂空, 骨架在 code)
  agents/        # (待填)
  skills/        # foundation skills (e.g. grill-me, handoff)
  commands/      # handoff, pickup
modules          # submodule remotes — 仅记录, 不 clone
  code/          # 轻 workflow (lite 全套, 文件驱动): conductor/slicer/maker/tester/inspector
  spec/          # 重 workflow (SDD/lightspec): orchestrator/planner/plan-reviewer/builder/code-reviewer/documenter/releaser
  dev/           # code-extra 池: 工作流外工具 (context7, ponytail-*, tdd, security …) — 不进 workflow preset
  extra/         # extra 工具: 文献/ocr/翻译/格式规范 + agentkit extra 32 skills, 共 48 + agents) — 不进 workflow preset
  paper/         # 写论文 (+ 收到 review 后修改)
  review/        # 审稿 (论文 review)
  research/      # 研究辅助
docs/            # 文档 (sdd docs → docs/agentkit-sdd/)
```

> Note: most of these directories do not exist yet. They are the target layout,
> not the current state. Do not assume a path exists without checking.

## Guidelines

- Keep the README as the source of truth for what is collected.
- When adding a new tool/agent/skill, follow the section it belongs to in the
  README and create/update the matching directory.
- Follow the naming conventions used in the README (kebab-case, lowercase).
- If a README section is empty (e.g. `#### opencode`), it means that entry has
  not been filled in yet — leave it or document as you add content.
- Prefer small, focused files over monoliths. Each tool/agent gets its own
  directory with its own documentation.

## Workflow

1. Read `README.md` first to understand where something fits.
2. Check whether a directory already exists before creating files.
3. Add or update content under the appropriate top-level directory.
4. Keep this file in sync when the layout changes materially.
5. Agent 配置单一真源 `harness/agents.toml`；`gen.py` 生成后 `deploy.py agents` 写目标 。
