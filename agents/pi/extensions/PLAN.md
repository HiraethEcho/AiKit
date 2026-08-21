# PLAN

## Change: agent-commands loader (pi-toolkit) — completed

- [x] Task 1: `agents-cmds.ts` — resources_discover 时**全递归** walk `.agents/commands/**/*.md`（项目 + 全局），每个文件单独贡献为 promptPath（loader 支持文件级）；名称 = 文件名 stem（原生语义，跨目录同名冲突走 pi 原生 first-wins + collision 诊断）；toggle 状态门控
- [x] Task 2: `config.ts` 加 `agent-commands`（默认 true）+ `index.ts` 注册 + toggle 命令 `/agent-commands [on|off]`（suffix: 需 /reload 生效）
- [x] Task 3: 验证 — 样例 `.agents/commands/hello.md` → `/hello` 可用；`/agent-commands off` + `/reload` 后消失

## Change: pi-board（黑板工作区，由 pi-annotator 更名）

设计稿：`DESIGN.md`（定稿 v5，随实现迭代更新）。

- [x] Task 0: 设计定稿 — 未决问题已关闭，随反馈迭代至 v5
- [x] Task 1: spike 历史消息 API（通过：`ctx.sessionManager.getBranch()` → `SessionEntry[]`）→ 新建 `pi-board/`（零依赖，新写最小实现）
- [x] Task 2: 数据模型与持久化 — `shared/board-model.js`（items（含 file edit before/after）/annotations（仅 comment）/appendix + region 提取 + quote 唯一性兜底 + 行级 diff）+ `shared/board-state.js`（原子写 + .bak + 版本迁移）
- [x] Task 3: 组装器 — `shared/board-assembler.js`（Items/Annotations/文件 diff/追加；embed `snippet|full|quote`；自包含 + 指令边界 + 上限）
- [x] Task 4: 前端 — 单 HTML + `client/board-client.js`（含极简 markdown 渲染器）+ `client/board.css`；三栏（来源 tabs 板/文件/历史 | 查看器 Raw(行号+注释高亮)/Preview/Edit(文件) | 注释栏）；注释内联编辑/删除/点击定位；history git-log 风格新在上；文件快速打开 + 历史过滤 + 末尾追加
- [x] Task 5: 命令 — `/board`（打开板）+ `--status/--stop/--port/--no-browser`（headless 子命令族已移除）
- [x] Task 6: 验证 — 自动化测试 **13/13 通过**（`pi-board/scripts/test_board.py`，python pty 驱动全新 pi 进程），含：空板 / 打开文件 / offset 注释 / 文件编辑(diff) / 组装 / 清空 / 文件树+越界拦截 / quote 唯一性 / locator 区间 / 注释编辑删除 / Edit 模式注释+保存重锚 / 持久化重启恢复
  - 代码审查：subagent 独立审查 + 修复 6 个 bug（token 鉴权链、symlink 逃逸、dialog 不显示、文件树不自动加载、reply 标签碰撞、locator 前缀 round-trip）；后续迭代继续修复：textarea 重影/底部空白、自动刷新导致无法输入、编辑与注释共存（重锚）、send 通知等
  - send 链路端到端验证：open → annotate → send → 模型回复进入历史 ✓
  - 前端 ID 一致性校验：HTML id ↔ JS 引用全部匹配 ✓

## Spec: pi-extensions (SPEC.md)

- [ ] Phase 1: pi-board — 黑板工作区（**已实现，持续按反馈迭代**；本 PLAN 上方任务）
- [ ] Phase 3: 其他插件按需维护（pi-context-mode / pi-toolkit / pi-pane / pi-free-lite）
