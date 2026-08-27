# pi-herdr-subagents

异步 Pi subagents 扩展。Herdr 内 → split pane；不在 Herdr → headless RPC fallback。tmux 已移除。

## 功能

- `subagent` — 异步 spawn；`subagent_message` — steer/resume；`subagents_list` — 列出 agents；`ask_user_question` — 主会话问用户（已合并自独立扩展）
- 子进程内：`ask_question`（问 orchestrator → 自动弹主窗口转问你，答案直回子进程）、`subagent_done`（非 auto-exit 自结束）
- Herdr 模式：`pane split` 右侧 pane、脚本启动、sentinel + `pane get` 完成检测
- RPC fallback：`pi --mode rpc` 子进程、JSONL `prompt`/`steer`、exit + sidecar 完成检测
- 状态 widget 常开（`status.ts`，不再读 config）
- safe-bash 移至 `../pi-toolkit/safe-bash.ts`；`/safe-bash` 默认开启，关闭时 spawn 传 `PI_SAFE_BASH_DISABLED=1`

## Agent 定义来源

无内置 agents。按优先级（后者覆盖同名）：

1. `~/.agents/agents/`
2. `~/.pi/agent/agents/`
3. `.agents/agents/`
4. `.pi/agents/`

空列表合法。

## 文件

| 文件                                   | 作用                                                      |
| -------------------------------------- | --------------------------------------------------------- |
| `index.ts`                             | 主扩展：tools/commands/launch/watch                       |
| `herdr.ts`                             | Herdr pane surface（split/run/read/inspect/close）        |
| `rpc.ts`                               | RPC fallback 子进程 + JSONL client                        |
| `completion.ts`                        | sidecar + sentinel + pane-absence 完成检测                |
| `subagent-done.ts`                     | 子进程扩展：auto-exit/ask_question/subagent_done/activity |
| `activity.ts` `session.ts` `status.ts` | 活动记录、会话/loadout、状态模型                          |
| `ask-user-question.ts`                | 主会话 `ask_user_question` UI 工具（merged；支持 `questions[]` 多题 tab 窗口） |

## 参考插件

本扩展参考/继承了两个插件：

- [pi-interactive-subagents](https://github.com/amosblomqvist/pi-interactive-subagents) 本目录 fork 自其 `pi-extension/subagents/`，tmux-only。
- [pi-herdr-agents](https://github.com/giuseppecrj/pi-herdr-agents) Herdr 实现参考（split/tab、pane run、sentinel、pane inspection、lifecycle）。

## 加载

```jsonc
// ~/.pi/agent/settings.json 或 .pi/settings.json
{ "extensions": ["<path>/pi-herdr-subagents"] }
```

Herdr 内启动 pi；否则自动用 RPC fallback。
