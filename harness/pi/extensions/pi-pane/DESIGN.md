# Pi Side — 侧边栏面板 + Footer

## 概述

`pi-pane` 是一个 Pi 扩展，提供 docked 右侧边栏。

- 侧边栏：4 个面板（WORKSPACE / CONTEXT / ACTIVITY / TASKS），仿 `pi-atelier`
- 所有面板始终显示，仅 TASKS 在无 task 数据时隐藏

加载：`pi -e ./pi-pane/index.ts`

## 目录结构

```
pi-pane/
├── index.ts              # 扩展入口（状态管理、事件处理、pane controller）
├── pane.ts            # 侧边栏渲染引擎（面板、调色板、控制器）
├── split.ts           # 分栏控制器（split-pane overlay）
├── metrics.ts            # formatTokens 工具
```

## 侧边栏

### 命令

- `/pane` — toggle 侧边栏
- `/pane on` — 显示
- `/pane off` — 隐藏

### 面板

| 面板 | 始终显示 | 内容 | 数据来源 |
|------|---------|------|----------|
| WORKSPACE | 是 | session name, cwd, branch + git status (Nerd Font 图标), entries count | Pi core API + `git status --short --branch` |
| CONTEXT | 是 | In, Out, Cache (R/W/Hit%), Cost | session message usage |
| ACTIVITY | 是 | turn + duration + active tools (name + summary + status + duration) + done/failed 聚合 + ALERTS 合并 | RunActivityTracker |
| TASKS | 仅在有 todo 数据时 | 多列 todo widget，列头标注来源 (main/subagent:xxx) | pi-work `todo:state` 事件 |

### WORKSPACE 面板

```
│ ─ ✦ WORKSPACE ────
│ Release prep              ← session name（或无: —）
│ ~/code/my-project         ← cwd
│  main  ●2  ~1  ↑3       ← branch + staged/unstaged/ahead/behind
│ 12 entries · persisted    ← entries + persistence
```

- git 数据源：`git status --short --branch --untracked-files=no`，每 `turn_end` 刷新
- staged/unstaged 从 `git status` 的 XY 字段解析
- ahead/behind 从分支跟踪信息解析

### CONTEXT 面板

```
│ ─ ✦ CONTEXT ──────
│ In 12.3k  Out 4.2k        ← input/output（双列，放不下时换行）
│ Cache 8.1k  Hit 65.3%     ← cache read + hit %
│ Write 2.0k                ← cache write（仅 >0 时显示）
│ Cost $0.042               ← 累计费用
```

- 数据源：`refreshUsage()` 遍历 `sessionManager.getEntries()` 累加 `message.usage`
- 格式：标签 `muted` 色，数值用语义色（input 蓝 / output 紫 / cache 青 / cost 橙）

### ACTIVITY 面板

```
│ ─ ✦ ACTIVITY ─────
│ Turn 3 · running 2m35s                  ← 汇总（turn + phase + duration）
│ bash  git status --short     done 1.2s   ← tool 名 + 命令摘要 + 状态 + 耗时
│ read  src/index.ts           done 0.5s   ← read/write 显示文件路径
│ edit  src/pane.ts         running     ← running 中只显示耗时
│ tools 3 done · 1 failed                 ← 聚合
│ ▲ ext-1 warning  ✕ ext-2 error          ← ALERTS 合并
```

- tool 摘要：bash → 截断命令；read/edit/write → 相对路径；grep/find → pattern
- active tools 按 startedAt 排序，recent tools（最近 3 条）排除仍在 active 的
- 阶段：`running` → `settled` 后变 `Last run · 2m35s`
- ALERTS：`statusDetailRows()` 按正则过滤异常扩展状态

### TASKS 面板

```
│ ─ ✦ TASKS ────────          ← 仅当 pi-work 发送 todo:state 事件时
│ main
│ ☐ Fix login bug
│ ☑ Update docs
│ subagent:scout
│ ☐ Scan ports
```

- 每列对应一个代理，列头标注来源
- 数据由 `worksData` 缓存，pane 关闭时清除

## 渲染

### 边框风格

每个 panel 使用简约标题横线，无 box-drawing 边框：

```
│ ─ ✦ ACTIVITY ─────
│ content line
│
│ ─ ✦ WORKSPACE ────
```

左侧竖线 `│` 由 `renderDock()` 统一添加。

### 调色板

13 种角色色，三档输出：

| 模式 | 条件 |
|------|------|
| DARK (固定 RGB) | 有主题名 + 有颜色 |
| PLAIN (主题映射) | 无主题名 + 有颜色 |
| NOCOLOR | `NO_COLOR` 环境变量 |

### composeGroups + renderGroups

面板内容按 `dropRank` 优先级逐级丢弃，直到适应可用高度：
- CONTEXT/ACTIVITY (required, Infinity) — 不丢弃
- WORKSPACE (dropRank 30)
- TASKS (dropRank 10)

## 生命周期

| 事件 | 行为 |
|------|------|
| `session_start` | 创建 pane controller、RunActivityTracker、注册 footer、刷新 git/usage |
| `agent_start` | tracker.startRun() + activity="working" |
| `turn_start` | tracker.startTurn(turnIndex) |
| `tool_execution_start` | tracker.startTool(event) — 记录 tool + args |
| `tool_execution_end` | tracker.finishTool(event) — 标记 done/failed + duration |
| `agent_settled` | tracker.settle() + activity="ready" |
| `turn_end` | refreshGitInfo() + refreshUsage() |
| `todo:state` | 更新 worksData（TASKS 面板） |
| `session_shutdown` | dispose tracker + pane + footer |

## 配置

用户配置：`~/.pi/agent/pi-pane.json`
项目配置：`<project>/.pi/pi-pane.json`

```json
{
  "shortcut": "alt+s",
  "contextWarning": 70,
  "contextDanger": 90
}
```

## 与 pi-work 的关系

完全独立的扩展，可同时加载。pi-pane 的 TASKS 面板通过 `todo:state` 事件接收 pi-work 的数据。

## 依赖

- `@earendil-works/pi-coding-agent` — ExtensionAPI, ExtensionContext
- `@earendil-works/pi-tui` — Component, truncateToWidth, visibleWidth
- `node:os` — homedir()
- `node:path` — 路径拼接（run-activity.ts）

## 文件说明

| 文件 | 职责 |
|------|------|
| `index.ts` | 扩展入口、状态管理、事件处理、pane controller 创建、git/usage 刷新 |
| `footer.ts` | Footer 渲染与状态管理（ctx.ui.setFooter）、activity 状态同步 |
| `pane.ts` | 侧边栏渲染（palette/panelRows/composeGroups/renderGroups）、控制器、component |
| `split.ts` | 分栏 overlay、键盘 resize |
| `metrics.ts` | formatTokens 工具函数 |
