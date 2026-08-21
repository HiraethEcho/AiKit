# SPEC

## Goal

构建和维护一组 pi 插件（pi-agents / pi-tasks / pi-asks / pi-context-mode / pi-board / pi-toolkit 等），覆盖子代理编排、任务管理、提问、上下文记忆、黑板工作区等场景。每个插件独立可用，互不依赖。

## What We're Building

- 插件体系：pi-agents（子代理+role）、pi-tasks（任务管理）、pi-asks（提问）
- 上下文工具：pi-context-mode（FTS5 知识库 + ctx_* 工具族）
- 黑板工作区：pi-board（文件 + 历史消息 → 追加/注释/文件编辑(diff)/组装；三栏前端 + 文件树 + Raw/Preview/Edit；设计见 `DESIGN.md`）
- 参考底座：pi-studio（已移至 `examples/`，完整双栏 IDE，仅作 pi-board 的 API 用法与选区算法参考）
- 其他：pi-pane、pi-free-lite、pi-toolkit（原 pi-roles 的 role 功能已并入 pi-toolkit）
- `.agents/commands/` 加载：pi-toolkit 贡献 promptPaths（项目 + 全局），`/agent-commands` toggle 开关（rtk 同款）

## Decisions

- 插件独立：核心插件互不依赖，可单独使用
- Agent 定义扫描：project > global 优先级
- 工作流：SDD（spec-driven）。项目意图源 `SPEC.md`，路线图 `PLAN.md`，设计稿 `DESIGN.md`
- pi-board 方向：黑板隐喻——板上内容两个来源（项目文件 + 历史消息），三个动作（追加 pin / 注释 comment / 文件编辑 edit）；注释存 sidecar 可编辑/删除；文件编辑直接写盘并把 diff 传给模型（保存时注释按 quote 自动重锚）；发送时组装为自包含结构化文本 + 可选末尾追加（appendix）
- pi-board 前端：三栏（来源 tabs 板/文件/历史 | 查看器 | 注释栏）；查看器 Raw（行号 gutter + 注释高亮 backdrop）/ Preview / Edit（文件）；选区在 Raw 与 Edit 都可用；history git-log 风格新在上；无构建、原生 JS
- pi-board 实现：**新写最小实现，不整体复制 pi-studio**；实现前 spike 验证历史消息 API（`ctx.sessionManager.getBranch()` → `SessionEntry[]`）
- pi-board 注释 kind：仅 `comment`（用户决策去掉 question/highlight/todo）
- pi-board 命令：只保留 `/board`（打开板）+ `--status/--stop/--port/--no-browser`；headless 子命令族已移除（无可用性）
- `.agents/commands/` 加载器：并入 pi-toolkit，可 toggle（rtk 模式）；范围 = 项目 `<cwd>/.agents/commands` + 全局 `~/.agents/commands`；语义对齐 `.pi/prompts`（非递归 .md 扫描、文件名=命令名）；toggle 后需 /reload 生效

## Active

- pi-board：黑板工作区（已实现，持续按反馈迭代；设计见 `DESIGN.md`，任务见 `PLAN.md`）
