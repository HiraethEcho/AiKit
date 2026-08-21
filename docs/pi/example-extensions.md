# pi Extension Examples

Example extensions from the npm package located at `examples/extensions/`.

## Lifecycle & Safety

- `permission-gate.ts`
  - Intercepts `tool_call` for `bash`, checks commands against `rm -rf`, `sudo`, `chmod/chown 777` patterns via regex. Uses `ctx.ui.select()` to prompt Yes/No confirmation. In non-interactive mode, blocks by default.
  - 通过 `tool_call` 事件拦截 bash 命令，用正则匹配 `rm -rf`、`sudo`、`chmod/chown 777` 等危险模式，使用 `ctx.ui.select()` 弹出 Yes/No 确认对话框。非交互模式下默认阻止。

- `project-trust.ts`
  - Handles `project_trust` event with 5 options: Trust and remember, Trust with note and remember, Trust this session, Do not trust, Let built-in prompt decide. Uses `ctx.ui.input()` for optional note. Returns `{ trusted, remember }` to override built-in trust prompt.
  - 处理 `project_trust` 事件，提供 5 个选项：信任并记住、带备注信任并记住、本次会话信任、不信任、由内置提示决定。使用 `ctx.ui.input()` 输入可选备注。返回 `{ trusted, remember }` 覆盖内置信任提示。

- `protected-paths.ts`
  - Intercepts `tool_call` for `write` and `edit` tools. Blocks paths containing `.env`, `.git/`, `node_modules/`. Uses `ctx.ui.notify()` to show warning. Returns `{ block: true, reason }` to cancel the operation.
  - 拦截 `write` 和 `edit` 工具的 `tool_call` 事件。阻止包含 `.env`、`.git/`、`node_modules/` 的路径。使用 `ctx.ui.notify()` 显示警告，返回 `{ block: true, reason }` 取消操作。

- `confirm-destructive.ts`
  - Handles `session_before_switch` and `session_before_fork` events. On clear (`reason === "new"`), uses `ctx.ui.confirm()` to confirm. On resume, checks for unsaved user messages via `ctx.sessionManager.getEntries()`. On fork, uses `ctx.ui.select()` with Yes/No options. Returns `{ cancel: true }` to block.
  - 处理 `session_before_switch` 和 `session_before_fork` 事件。clear 时用 `ctx.ui.confirm()` 确认；resume 时通过 `ctx.sessionManager.getEntries()` 检查未保存的用户消息；fork 时用 `ctx.ui.select()` 提供 Yes/No 选项。返回 `{ cancel: true }` 阻止操作。

- `dirty-repo-guard.ts`
  - Runs `git status --porcelain` via `pi.exec()` to check for uncommitted changes. Counts changed files. Uses `ctx.ui.select()` to ask user whether to proceed. Handles `session_before_switch` and `session_before_fork` events. Non-interactive mode blocks by default.
  - 通过 `pi.exec()` 执行 `git status --porcelain` 检查未提交更改，统计变更文件数。使用 `ctx.ui.select()` 询问用户是否继续。处理 `session_before_switch` 和 `session_before_fork` 事件。非交互模式下默认阻止。

- `sandbox/`
  - OS-level sandboxing using `@anthropic-ai/sandbox-runtime`. Loads per-project config from `.pi/sandbox.json` with `deepMerge` for overrides. Creates sandboxed `BashOperations` that run commands inside the sandbox runtime with proper abort handling.
  - 使用 `@anthropic-ai/sandbox-runtime` 进行操作系统级沙箱隔离。从 `.pi/sandbox.json` 加载项目级配置，支持 `deepMerge` 覆盖。创建沙箱化的 `BashOperations`，在沙箱运行时内执行命令并处理中止信号。

- `gondolin/`
  - Routes built-in tools (read, write, edit, ls, find, grep, bash) into a Gondolin micro-VM. Implements `ReadOperations`, `WriteOperations`, `EditOperations`, `LsOperations`, `FindOperations`, `GrepOperations`, `BashOperations` that translate host paths to guest paths. Uses `VM` from gondolin for isolated execution with `sanitizeEnv`.
  - 将内置工具（read、write、edit、ls、find、grep、bash）路由到 Gondolin 微虚拟机中。实现 `ReadOperations`、`WriteOperations`、`EditOperations`、`LsOperations`、`FindOperations`、`GrepOperations`、`BashOperations`，将主机路径转换为客户机路径。使用 Gondolin 的 `VM` 进行隔离执行，支持 `sanitizeEnv`。

## Custom Tools

- `todo.ts`
  - Full todo list tool with `TodoListComponent` custom UI. Supports add, toggle, delete, reorder. State persisted via `details` in tool results and reconstructed from session branch on `session_start`. Custom `renderResult` for compact display.
  - 完整的待办事项列表工具，包含 `TodoListComponent` 自定义 UI。支持添加、切换完成状态、删除、重新排序。通过工具结果的 `details` 持久化状态，在 `session_start` 时从会话分支重建。自定义 `renderResult` 实现紧凑显示。

- `hello.ts`
  - Minimal custom tool using `defineTool()` with `Type.Object` schema. Registers a `hello` tool that takes a `name` string parameter and returns a greeting. Uses `pi.registerTool()` for registration. Demonstrates the simplest possible extension.
  - 使用 `defineTool()` 和 `Type.Object` 模式的最小化自定义工具示例。注册一个 `hello` 工具，接收 `name` 字符串参数并返回问候语。使用 `pi.registerTool()` 注册。演示最简扩展的写法。

- `question.ts`
  - Demonstrates `ctx.ui.select()` with custom rendering. Shows a question with multiple options, each with description. Uses `ctx.ui.custom()` to build a full TUI component with keyboard navigation, wrapped text rendering, and option selection via number keys or arrow keys + Enter.
  - 演示 `ctx.ui.select()` 的自定义渲染。显示带描述的多选项问题。使用 `ctx.ui.custom()` 构建完整的 TUI 组件，支持键盘导航、文本换行渲染、数字键或方向键+Enter 选择。

- `questionnaire.ts`
  - Multi-question form with tab bar navigation between questions. Supports text input, single-select, and multi-select question types. Uses `ctx.ui.custom()` with `Question`/`Answer` interfaces. Custom rendering with progress indicator and tab bar at top.
  - 多问题表单，支持在问题之间通过标签栏导航。支持文本输入、单选和多选问题类型。使用 `ctx.ui.custom()` 配合 `Question`/`Answer` 接口。自定义渲染包含进度指示器和顶部标签栏。

- `tool-override.ts`
  - Overrides the built-in `read` tool by registering a tool with the same name. Adds access logging to `read-access.log` via `withFileMutationQueue`. Blocks sensitive paths (`.env`, `secrets`, `credentials`, `.ssh/`, `.aws/`, `.gnupg/`). Registers `/read-log` command to view last 20 log entries. Uses built-in renderer automatically.
  - 通过注册同名工具覆盖内置 `read` 工具。通过 `withFileMutationQueue` 将文件访问记录到 `read-access.log`。阻止敏感路径（`.env`、`secrets`、`credentials`、`.ssh/`、`.aws/`、`.gnupg/`）。注册 `/read-log` 命令查看最近 20 条日志。自动使用内置渲染器。

- `dynamic-tools.ts`
  - Registers `echo_session` tool on `session_start` event. Provides `/add-echo-tool <name>` command to register additional echo tools at runtime. Each tool has `promptSnippet` and `promptGuidelines`. Uses `normalizeToolName()` for validation and `Set<string>` to prevent duplicates.
  - 在 `session_start` 事件中注册 `echo_session` 工具。提供 `/add-echo-tool <名称>` 命令在运行时注册额外的 echo 工具。每个工具包含 `promptSnippet` 和 `promptGuidelines`。使用 `normalizeToolName()` 验证名称，`Set<string>` 防止重复注册。

- `structured-output.ts`
  - Final tool with `terminate: true` so agent ends on the tool call without extra LLM turn. Uses `defineTool()` with `headline`, `summary`, `actionItems` parameters. Custom `renderResult` using `theme.fg()` for colored display. Includes `promptSnippet` and `promptGuidelines` for agent guidance.
  - 设置 `terminate: true` 的最终工具，代理在工具调用后结束，无需额外 LLM 轮次。使用 `defineTool()` 定义 `headline`、`summary`、`actionItems` 参数。自定义 `renderResult` 使用 `theme.fg()` 实现彩色显示。包含 `promptSnippet` 和 `promptGuidelines` 指导代理行为。

- `built-in-tool-renderer.ts`
  - Custom compact rendering for built-in tools (read, bash, edit, write) via `renderCall` and `renderResult`. Keeps original tool behavior while replacing the TUI display. Shows truncated previews, syntax-highlighted file content, and execution status.
  - 通过 `renderCall` 和 `renderResult` 为内置工具（read、bash、edit、write）提供自定义紧凑渲染。保持原有工具行为的同时替换 TUI 显示。显示截断预览、语法高亮的文件内容和执行状态。

- `minimal-mode.ts`
  - Overrides built-in tool rendering for minimal display. In collapsed mode, shows only tool call names without output. Uses `shortenPath()` for compact file paths. Creates custom `renderCall`/`renderResult` for read, bash, edit, write tools that strip verbose output.
  - 覆盖内置工具渲染以实现最小化显示。折叠模式下仅显示工具调用名称，不显示输出。使用 `shortenPath()` 缩短文件路径。为 read、bash、edit、write 工具创建自定义 `renderCall`/`renderResult`，去除冗长输出。

- `truncated-tool.ts`
  - Wraps ripgrep with proper output truncation using `truncateHead()` from built-in utilities. Saves full output to temp file when truncated. Custom `renderCall` shows search pattern with syntax highlighting. Custom `renderResult` shows match count, truncation warning, and first 20 lines in expanded view.
  - 使用内置 `truncateHead()` 工具包装 ripgrep 实现输出截断。截断时将完整输出保存到临时文件。自定义 `renderCall` 显示带语法高亮的搜索模式。自定义 `renderResult` 显示匹配数、截断警告和展开视图中的前 20 行。

- `ssh.ts`
  - Delegates all tools (read, write, edit, bash) to a remote machine via SSH. Uses `createReadTool()`, `createWriteTool()`, `createEditTool()`, `createBashTool()` with custom `Operations` that run commands via `ssh` spawn. Registers `--ssh` CLI flag. Handles `user_bash` hook and `before_agent_start` to update system prompt with remote CWD.
  - 通过 SSH 将所有工具（read、write、edit、bash）委托到远程机器。使用 `createReadTool()`、`createWriteTool()`、`createEditTool()`、`createBashTool()` 配合自定义 `Operations`，通过 `ssh` spawn 执行命令。注册 `--ssh` CLI 标志。处理 `user_bash` 钩子和 `before_agent_start` 事件以更新系统提示中的远程工作目录。

- `subagent/`
  - Delegates tasks to specialized subagents with isolated context windows. Supports single, parallel, and chain execution modes. Uses `pi.exec()` to spawn subagent processes. Tracks usage stats (input/output tokens, cost) per subagent. Custom rendering with `DisplayItem` for progress.
  - 将任务委托到具有隔离上下文窗口的专用子代理。支持单次、并行和链式执行模式。使用 `pi.exec()` 生成子代理进程。跟踪每个子代理的使用统计（输入/输出 token、成本）。使用 `DisplayItem` 自定义渲染进度。

## Commands & UI

- `preset.ts`
  - Named presets for model, thinking level, tools, and instructions. Loads from `.pi/presets.json` config. Provides `/preset` command with interactive selector via `ctx.ui.custom()`. Supports `--preset` CLI flag. Cycles through presets with `/preset cycle`. Persists active preset in session state.
  - 为模型、思维层级、工具和指令提供命名预设。从 `.pi/presets.json` 配置加载。通过 `ctx.ui.custom()` 提供 `/preset` 命令的交互式选择器。支持 `--preset` CLI 标志。`/preset cycle` 循环切换预设。将会话中的活动预设持久化。

- `plan-mode/`
  - Claude Code-style plan mode for read-only exploration. Toggles between plan mode (read-only tools) and normal mode via `/plan` command. Blocks destructive bash commands (rm, mv, git write operations, npm install, etc.) using `DESTRUCTIVE_PATTERNS` regex list. Extracts todo items from assistant messages with `extractTodoItems()`. Tracks completed steps via `[DONE:N]` markers.
  - Claude Code 风格的只读规划模式。通过 `/plan` 命令在规划模式（只读工具）和正常模式间切换。使用 `DESTRUCTIVE_PATTERNS` 正则列表阻止破坏性 bash 命令（rm、mv、git 写操作、npm install 等）。通过 `extractTodoItems()` 从助手消息中提取待办事项。通过 `[DONE:N]` 标记跟踪已完成步骤。

- `tools.ts`
  - Interactive `/tools` command using `ctx.ui.custom()` with `SettingsList` component. Shows all registered tools with enable/disable toggle. Persists tool selection via `pi.appendEntry()` with `tools-config` custom type. Restores state on `session_start` and `session_tree` events. Uses `pi.setActiveTools()` to apply selection.
  - 使用 `ctx.ui.custom()` 和 `SettingsList` 组件的交互式 `/tools` 命令。显示所有已注册工具并支持启用/禁用切换。通过 `pi.appendEntry()` 以 `tools-config` 自定义类型持久化工具选择。在 `session_start` 和 `session_tree` 事件中恢复状态。使用 `pi.setActiveTools()` 应用选择。

- `handoff.ts`
  - Transfers context to a new focused session via `/handoff <goal>`. Uses `complete()` from pi-ai to generate a focused prompt from conversation history. Shows `BorderedLoader` during generation. Opens generated prompt in editor via `ctx.ui.editor()` for review. Creates new session with `ctx.newSession()` and parent tracking.
  - 通过 `/handoff <目标>` 将上下文转移到新的聚焦会话。使用 pi-ai 的 `complete()` 从对话历史生成聚焦提示。生成期间显示 `BorderedLoader`。通过 `ctx.ui.editor()` 在编辑器中打开生成的提示供审查。使用 `ctx.newSession()` 创建带父会话跟踪的新会话。

- `qna.ts`
  - Extracts questions from last assistant message into editor via `/qna` command. Uses `complete()` with a system prompt that formats questions as `Q:`/`A:` pairs. Shows `BorderedLoader` during extraction. Loads result into editor via `ctx.ui.setEditorText()` for user to fill in answers.
  - 通过 `/qna` 命令从最后一条助手消息中提取问题到编辑器。使用 `complete()` 配合系统提示，将问题格式化为 `Q:`/`A:` 对。提取期间显示 `BorderedLoader`。通过 `ctx.ui.setEditorText()` 将结果加载到编辑器中供用户填写答案。

- `status-line.ts`
  - Shows turn progress in footer via `ctx.ui.setStatus()`. Listens to `session_start`, `turn_start`, `turn_end` events. Uses `theme.fg()` for colored status: dim "Ready" on start, accent spinner on turn, success checkmark on complete. Tracks turn count.
  - 通过 `ctx.ui.setStatus()` 在页脚显示轮次进度。监听 `session_start`、`turn_start`、`turn_end` 事件。使用 `theme.fg()` 实现彩色状态：开始时显示 dim "Ready"，轮次中显示 accent 旋转器，完成后显示 success 勾号。跟踪轮次计数。

- `github-issue-autocomplete.ts`
  - Adds `#1234` issue completions by stacking a custom `AutocompleteProvider`. Uses `gh issue list` to preload open issues (up to 100) once per session. Resolves GitHub repo from git remote. Supports numeric prefix matching and fuzzy search via `fuzzyFilter()`. Shows issue title and state in autocomplete description.
  - 通过堆叠自定义 `AutocompleteProvider` 添加 `#1234` 问题自动完成。使用 `gh issue list` 在每个会话中预加载最多 100 个开放问题。从 git remote 解析 GitHub 仓库。支持数字前缀匹配和 `fuzzyFilter()` 模糊搜索。在自动完成描述中显示问题标题和状态。

- `widget-placement.ts`
  - Shows widgets above and below the editor via `ctx.ui.setWidget()` on `session_start`. Uses `placement: "belowEditor"` option for bottom widget. Demonstrates both default (above editor) and below-editor widget placement.
  - 在 `session_start` 时通过 `ctx.ui.setWidget()` 在编辑器上方和下方显示小部件。使用 `placement: "belowEditor"` 选项实现底部小部件。演示默认（编辑器上方）和编辑器下方两种小部件位置。

- `hidden-thinking-label.ts`
  - Customizes the collapsed thinking label via `ctx.ui.setHiddenThinkingLabel()`. Provides `/thinking-label <text>` command to set custom label and `/thinking-label` (no args) to reset to default "Pondering...". Applies on `session_start`.
  - 通过 `ctx.ui.setHiddenThinkingLabel()` 自定义折叠的思维标签。提供 `/thinking-label <文本>` 命令设置自定义标签，无参数时重置为默认 "Pondering..."。在 `session_start` 时应用。

- `working-indicator.ts`
  - Customizes the streaming working indicator via `ctx.ui.setWorkingIndicator()`. Supports 5 modes: dot (static), pulse (animated), spinner (rainbow-colored), none (hidden), reset (pi default). Each mode returns `WorkingIndicatorOptions` with `frames` and `intervalMs`. Provides `/working-indicator` command to switch modes.
  - 通过 `ctx.ui.setWorkingIndicator()` 自定义流式工作指示器。支持 5 种模式：dot（静态点）、pulse（动画脉冲）、spinner（彩虹色旋转器）、none（隐藏）、reset（pi 默认）。每种模式返回带 `frames` 和 `intervalMs` 的 `WorkingIndicatorOptions`。提供 `/working-indicator` 命令切换模式。

- `model-status.ts`
  - Shows model changes in status bar via `model_select` hook. Fires on `/model` command, Ctrl+P cycling, or session restore. Updates status bar with `🤖 {model.id}`. Shows notification on change (skips on restore). Logs change details to console.
  - 通过 `model_select` 钩子在状态栏显示模型变化。在 `/model` 命令、Ctrl+P 循环或会话恢复时触发。用 `🤖 {model.id}` 更新状态栏。变更时显示通知（恢复时跳过）。将变更详情记录到控制台。

- `snake.ts`
  - Snake game with custom UI via `ctx.ui.custom()`. Uses `SnakeComponent` with keyboard handling (arrow keys). Tracks game state (snake body, food position, direction, score). Custom rendering with colored blocks and box borders. State persistence via session.
  - 通过 `ctx.ui.custom()` 实现贪吃蛇游戏的自定义 UI。使用 `SnakeComponent` 配合键盘处理（方向键）。跟踪游戏状态（蛇身、食物位置、方向、分数）。使用彩色方块和边框的自定义渲染。通过会话持久化状态。

- `tic-tac-toe.ts`
  - Tic-tac-toe vs the agent with `executionMode: "sequential"` tools to prevent race conditions on shared cursor state. Uses `TicTacToeComponent` with full board rendering. Agent makes moves via registered tool, user via keyboard. Win detection with `getWinLine()`. Custom rendering with colored cells, borders, and cursor highlighting.
  - 井字棋对战代理，使用 `executionMode: "sequential"` 工具防止共享光标状态下的竞争条件。使用 `TicTacToeComponent` 实现完整棋盘渲染。代理通过注册的工具下棋，用户通过键盘下棋。`getWinLine()` 检测胜利。自定义渲染包含彩色格子、边框和光标高亮。

- `send-user-message.ts`
  - Demonstrates `pi.sendUserMessage()` with 3 delivery modes: normal (`/ask`), steer interrupt (`/steer`), and follow-up queue (`/followup`). Also shows content array variant (`/askwith`). Checks `ctx.isIdle()` to determine if streaming. Steer interrupts current processing, followUp queues for after completion.
  - 演示 `pi.sendUserMessage()` 的 3 种投递模式：普通（`/ask`）、转向中断（`/steer`）和后续队列（`/followup`）。还展示内容数组变体（`/askwith`）。通过 `ctx.isIdle()` 判断是否在流式输出中。steer 中断当前处理，followUp 排队等待完成后执行。

- `timed-confirm.ts`
  - Demonstrates timed dialogs with auto-dismiss. Two approaches: simple `timeout` option (recommended) via `/timed` (5s) and `/timed-select` (10s), and manual `AbortSignal` via `/timed-signal`. Shows live countdown in dialog. Returns `false`/`null` on timeout.
  - 演示带自动消失的定时对话框。两种方式：简单的 `timeout` 选项（推荐）通过 `/timed`（5 秒）和 `/timed-select`（10 秒），以及手动 `AbortSignal` 通过 `/timed-signal`。对话框显示实时倒计时。超时返回 `false`/`null`。

- `rpc-demo.ts`
  - Exercises all RPC-supported extension UI methods: `select()` on dangerous bash, `confirm()` on session clear, `input()` via `/rpc-input`, `editor()` via `/rpc-editor`, `setEditorText()` via `/rpc-prefill`, `setTitle()` on session start, `setWidget()` with demo banner, `setStatus()` on turn lifecycle, `notify()` after dialogs.
  - 练习所有支持 RPC 的扩展 UI 方法：危险 bash 的 `select()`、会话清除的 `confirm()`、`/rpc-input` 的 `input()`、`/rpc-editor` 的 `editor()`、`/rpc-prefill` 的 `setEditorText()`、会话启动的 `setTitle()`、演示横幅的 `setWidget()`、轮次生命周期的 `setStatus()`、对话框后的 `notify()`。

- `modal-editor.ts`
  - Custom vim-like modal editor via `ctx.ui.setEditorComponent()`. Extends `CustomEditor` with normal/insert mode switching. Normal mode: `hjkl` navigation, `0`/`$` line start/end, `x` delete, `i` insert, `a` append. Shows mode indicator ("NORMAL"/"INSERT") in editor border. Escape toggles mode or aborts agent.
  - 通过 `ctx.ui.setEditorComponent()` 实现类似 vim 的自定义模态编辑器。继承 `CustomEditor`，支持普通/插入模式切换。普通模式：`hjkl` 导航、`0`/`$` 行首/行尾、`x` 删除、`i` 插入、`a` 追加。编辑器边框显示模式指示器（"NORMAL"/"INSERT"）。Escape 切换模式或中止代理。

- `rainbow-editor.ts`
  - Animated rainbow text effect via custom editor. Extends `CustomEditor` to highlight "ultrathink" text with animated shine effect. Uses 7 base colors (coral → yellow → green → teal → blue → purple → pink) with brightness factor. 60fps animation when "ultrathink" is present, stops when removed.
  - 通过自定义编辑器实现动画彩虹文字效果。继承 `CustomEditor`，高亮 "ultrathink" 文本并添加动画闪光效果。使用 7 种基础颜色（珊瑚→黄→绿→青→蓝→紫→粉）配合亮度因子。检测到 "ultrathink" 时以 60fps 动画，移除后停止。

- `notify.ts`
  - Desktop notifications via OSC 777 (Ghostty, iTerm2, WezTerm), OSC 99 (Kitty), or Windows toast (Windows Terminal). Listens to `agent_end` event. Sends "Pi" / "Ready for input" notification. Auto-detects terminal type via `WT_SESSION` and `KITTY_WINDOW_ID` env vars.
  - 通过 OSC 777（Ghostty、iTerm2、WezTerm）、OSC 99（Kitty）或 Windows toast（Windows Terminal）发送桌面通知。监听 `agent_end` 事件。发送 "Pi" / "Ready for input" 通知。通过 `WT_SESSION` 和 `KITTY_WINDOW_ID` 环境变量自动检测终端类型。

- `titlebar-spinner.ts`
  - Braille spinner animation in terminal title via `ctx.ui.setTitle()`. Uses 10 braille frames (⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏) at 80ms interval. Starts on `agent_start`, stops on `agent_end` and `session_shutdown`. Shows session name and CWD basename in title.
  - 通过 `ctx.ui.setTitle()` 在终端标题中显示盲文旋转器动画。使用 10 个盲文字符帧（⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏），间隔 80ms。在 `agent_start` 时启动，`agent_end` 和 `session_shutdown` 时停止。标题中显示会话名称和 CWD 目录名。

- `summarize.ts`
  - Summarizes conversation with GPT-5.2 via `/summarize` command. Builds conversation text from session branch entries. Uses `complete()` with `reasoningEffort: "high"`. Shows summary in transient UI via `ctx.ui.custom()` with `DynamicBorder`, `Markdown` rendering. Press Enter/Esc to close.
  - 通过 `/summarize` 命令使用 GPT-5.2 总结对话。从会话分支条目构建对话文本。使用 `complete()` 配合 `reasoningEffort: "high"`。通过 `ctx.ui.custom()` 在瞬态 UI 中显示摘要，使用 `DynamicBorder` 和 `Markdown` 渲染。按 Enter/Esc 关闭。

- `custom-footer.ts`
  - Custom footer via `ctx.ui.setFooter()` showing token stats (input/output/cost) and git branch. Uses `footerData.getGitBranch()` and `footerData.onBranchChange()`. Computes tokens from `ctx.sessionManager.getBranch()`. Toggle with `/footer` command. Restores default with `setFooter(undefined)`.
  - 通过 `ctx.ui.setFooter()` 自定义页脚，显示 token 统计（输入/输出/成本）和 git 分支。使用 `footerData.getGitBranch()` 和 `footerData.onBranchChange()`。从 `ctx.sessionManager.getBranch()` 计算 token。通过 `/footer` 命令切换。`setFooter(undefined)` 恢复默认。

- `custom-header.ts`
  - Custom header via `ctx.ui.setHeader()` showing pi mascot ASCII art. Mascot has eyes, wide top bar, and 4 legs using block characters. Uses `theme.fg()` for pi-blue coloring. Shows subtitle "shitty coding agent" with version. `/builtin-header` command restores default.
  - 通过 `ctx.ui.setHeader()` 自定义页眉，显示 pi 吉祥物 ASCII 艺术。吉祥物包含眼睛、宽顶栏和 4 条腿，使用块字符绘制。使用 `theme.fg()` 实现 pi 蓝色配色。显示副标题 "shitty coding agent" 和版本号。`/builtin-header` 命令恢复默认。

- `overlay-test.ts`
  - Test overlay compositing with inline text inputs and edge cases. Uses `ctx.ui.custom()` with `overlay: true`. Tests wide chars (CJK), styled text (colored), emoji (including ZWJ sequences), and inline text inputs within menu items. Keyboard navigation with arrow keys, Enter to select, Esc to cancel.
  - 测试覆盖层合成，包含内联文本输入和边缘情况。使用 `ctx.ui.custom()` 配合 `overlay: true`。测试宽字符（中日韩）、样式文本（彩色）、emoji（包括 ZWJ 序列）和菜单项中的内联文本输入。方向键导航，Enter 选择，Esc 取消。

- `overlay-qa-tests.ts`
  - Comprehensive overlay QA tests: anchor positions (top-left, top-right, bottom-left, bottom-right, center), margins, stacking order, streaming overflow, percentage sizing, max-height, sidepanel layout, animation demo (HSL color cycling), toggle demo, passive demo, focus management, streaming input.
  - 全面的覆盖层 QA 测试：锚点位置（左上、右上、左下、右下、居中）、边距、堆叠顺序、流式溢出、百分比尺寸、最大高度、侧边栏布局、动画演示（HSL 颜色循环）、切换演示、被动演示、焦点管理、流式输入。

- `doom-overlay/`
  - DOOM game running as an overlay at 35 FPS. Uses `DoomEngine` with WAD file loading (auto-downloads if missing). `DoomOverlayComponent` handles real-time rendering. Supports resume between invocations. Overlay options: 75% width, 95% max height, center anchor. Q to pause/exit.
  - 以 35 FPS 作为覆盖层运行的 DOOM 游戏。使用 `DoomEngine` 加载 WAD 文件（缺失时自动下载）。`DoomOverlayComponent` 处理实时渲染。支持多次调用间恢复。覆盖层选项：75% 宽度、95% 最大高度、居中锚点。Q 暂停/退出。

- `shutdown-command.ts`
  - Adds `/quit` command demonstrating `ctx.shutdown()` for clean exit. Also registers `finish_and_exit` and `deploy_and_exit` tools that call `ctx.shutdown()` after completing work. Shutdown is deferred until agent is idle. Tool parameters via TypeBox schema.
  - 添加演示 `ctx.shutdown()` 的 `/quit` 命令实现干净退出。还注册了 `finish_and_exit` 和 `deploy_and_exit` 工具，在完成工作后调用 `ctx.shutdown()`。关闭操作延迟到代理空闲时执行。工具参数通过 TypeBox schema 定义。

- `reload-runtime.ts`
  - Adds `/reload-runtime` command and `reload_runtime` tool showing safe reload flow. Command calls `ctx.reload()` directly. Tool queues `/reload-runtime` as a follow-up user command via `pi.sendUserMessage()` since tools only have `ExtensionContext` (not `ExtensionCommandContext`).
  - 添加 `/reload-runtime` 命令和 `reload_runtime` 工具，展示安全重载流程。命令直接调用 `ctx.reload()`。工具通过 `pi.sendUserMessage()` 将 `/reload-runtime` 排队为后续用户命令，因为工具只有 `ExtensionContext`（没有 `ExtensionCommandContext`）。

- `interactive-shell.ts`
  - Run interactive commands (vim, htop, git rebase, lazygit, etc.) with full terminal via `user_bash` hook. Detects interactive commands from a list of 60+ patterns (editors, pagers, git interactive, system monitors, file managers, DB clients, k8s/docker). Supports `!i` prefix to force interactive mode. Suspends TUI via `tui.stop()`/`tui.start()`.
  - 通过 `user_bash` 钩子运行交互式命令（vim、htop、git rebase、lazygit 等），支持完整终端。从 60+ 模式列表中检测交互式命令（编辑器、分页器、git 交互、系统监视器、文件管理器、数据库客户端、k8s/docker）。支持 `!i` 前缀强制交互模式。通过 `tui.stop()`/`tui.start()` 暂停/恢复 TUI。

- `inline-bash.ts`
  - Expands `!{command}` patterns in user prompts via `input` event transformation. Executes commands via `pi.exec("bash", ["-c", command])` with 30s timeout. Replaces `!{...}` with command output. Shows expansion summary via `ctx.ui.notify()`. Preserves existing `!command` whole-line bash behavior.
  - 通过 `input` 事件转换扩展用户提示中的 `!{command}` 模式。通过 `pi.exec("bash", ["-c", command])` 执行命令，超时 30 秒。将 `!{...}` 替换为命令输出。通过 `ctx.ui.notify()` 显示扩展摘要。保留现有的 `!command` 整行 bash 行为。

- `input-transform-streaming.ts`
  - Skips expensive input preprocessing for mid-stream steering via `streamingBehavior`. Checks `event.streamingBehavior === "steer"` to skip `git diff --stat` exec call. When not steering, prepends git diff output when user mentions changes/diff/modified. Returns `{ action: "transform", text }` on match.
  - 通过 `streamingBehavior` 跳过昂贵的输入预处理以进行中途转向。检查 `event.streamingBehavior === "steer"` 跳过 `git diff --stat` 执行调用。非转向时，当用户提到 changes/diff/modified 时在提示前添加 git diff 输出。匹配时返回 `{ action: "transform", text }`。

## Git Integration

- `git-checkpoint.ts`
  - Creates git stash checkpoints at each turn via `git stash create` on `turn_start`. Maps entry IDs to stash refs. On `session_before_fork`, offers to restore code to that point via `git stash apply`. Clears checkpoints on `agent_end`. Interactive mode only for restore prompt.
  - 在 `turn_start` 时通过 `git stash create` 在每个轮次创建 git 存储点。将条目 ID 映射到 stash 引用。在 `session_before_fork` 时，提供通过 `git stash apply` 将代码恢复到该点的选项。在 `agent_end` 时清除存储点。仅交互模式下显示恢复提示。

- `auto-commit-on-exit.ts`
  - Auto-commits on `session_shutdown` using last assistant message for commit message. Runs `git status --porcelain` to check for changes. Extracts first line of last assistant text as commit message (truncated to 50 chars). Stages all changes with `git add -A` and commits with `[pi]` prefix.
  - 在 `session_shutdown` 时自动提交，使用最后一条助手消息作为提交信息。执行 `git status --porcelain` 检查变更。提取最后一条助手文本的第一行作为提交信息（截断至 50 字符）。使用 `git add -A` 暂存所有变更，以 `[pi]` 前缀提交。

## System Prompt & Compaction

- `pirate.ts`
  - Demonstrates `before_agent_start` event to dynamically modify system prompt. `/pirate` command toggles pirate mode. When enabled, appends pirate-speak instructions (arrr, ahoy, ye scurvy dog, etc.) to system prompt. Agent still completes actual tasks but in pirate dialect.
  - 演示使用 `before_agent_start` 事件动态修改系统提示。`/pirate` 命令切换海盗模式。启用时，在系统提示后追加海盗用语指令（arrr、ahoy、ye scurvy dog 等）。代理仍完成实际任务，但使用海盗方言。

- `claude-rules.ts`
  - Scans `.claude/rules/` folder recursively for `.md` files on `session_start`. Lists found rules in system prompt via `before_agent_start`. Supports subdirectories for organization. Shows notification with rule count. Agent can use read tool to load specific rules when needed.
  - 在 `session_start` 时递归扫描 `.claude/rules/` 文件夹中的 `.md` 文件。通过 `before_agent_start` 在系统提示中列出找到的规则。支持子目录组织。显示规则数量通知。代理可在需要时使用 read 工具加载特定规则。

- `custom-compaction.ts`
  - Replaces default compaction with full conversation summary using Gemini Flash. Handles `session_before_compact` event. Summarizes ALL messages (not just last 20k tokens). Uses `serializeConversation()` and `convertToLlm()` for message formatting. Returns `{ compaction: { summary, firstKeptEntryId, tokensBefore } }`. Falls back to default on error.
  - 使用 Gemini Flash 替换默认压缩为完整对话总结。处理 `session_before_compact` 事件。总结所有消息（不仅仅是最后 20k tokens）。使用 `serializeConversation()` 和 `convertToLlm()` 格式化消息。返回 `{ compaction: { summary, firstKeptEntryId, tokensBefore } }`。出错时回退到默认压缩。

- `trigger-compact.ts`
  - Triggers compaction when context usage exceeds 100k tokens. Monitors `turn_end` event via `ctx.getContextUsage()`. Crosses threshold detection to trigger once. Provides `/trigger-compact` command for manual compaction with optional custom instructions. Uses `ctx.compact()` with `onComplete`/`onError` callbacks.
  - 当上下文使用量超过 100k tokens 时触发压缩。通过 `ctx.getContextUsage()` 监控 `turn_end` 事件。使用阈值交叉检测避免重复触发。提供 `/trigger-compact` 命令手动触发压缩，支持可选的自定义指令。使用 `ctx.compact()` 配合 `onComplete`/`onError` 回调。

## System Integration

- `mac-system-theme.ts`
  - Syncs pi theme with macOS dark/light mode. Uses `osascript` to query System Events appearance preferences. Polls every 2 seconds via `setInterval`. Calls `ctx.ui.setTheme("dark"|"light")` on change. Cleans up interval on `session_shutdown`.
  - 将 pi 主题与 macOS 深色/浅色模式同步。使用 `osascript` 查询 System Events 外观偏好。每 2 秒通过 `setInterval` 轮询。变更时调用 `ctx.ui.setTheme("dark"|"light")`。在 `session_shutdown` 时清理定时器。

## Resources

- `dynamic-resources/`
  - Loads skills, prompts, and themes using `resources_discover` event. Returns `{ skillPaths, promptPaths, themePaths }` pointing to files in the extension directory. Demonstrates dynamic resource discovery at runtime.
  - 使用 `resources_discover` 事件加载技能、提示和主题。返回 `{ skillPaths, promptPaths, themePaths }`，指向扩展目录中的文件。演示运行时的动态资源发现。

## Messages & Communication

- `message-renderer.ts`
  - Custom message rendering via `registerMessageRenderer` for "status-update" messages. Uses `Box` with `customMessageBg` for consistent styling. Color-coded by level (error=red, warn=yellow, success=green). Shows timestamp in expanded view. `/status` command sends messages with level prefix.
  - 通过 `registerMessageRenderer` 为 "status-update" 消息实现自定义渲染。使用 `Box` 配合 `customMessageBg` 实现一致样式。按级别颜色编码（error=红色、warn=黄色、success=绿色）。展开视图显示时间戳。`/status` 命令发送带级别前缀的消息。

- `event-bus.ts`
  - Inter-extension communication via `pi.events`. Listens for `my:notification` events and shows them via `ctx.ui.notify()`. `/emit` command emits events on the bus. Also emits on `session_start`. Demonstrates `pi.events.on()` and `pi.events.emit()` for decoupled extension communication.
  - 通过 `pi.events` 实现扩展间通信。监听 `my:notification` 事件并通过 `ctx.ui.notify()` 显示。`/emit` 命令在总线上发射事件。在 `session_start` 时也发射事件。演示 `pi.events.on()` 和 `pi.events.emit()` 实现解耦的扩展间通信。

## Session Metadata

- `session-name.ts`
  - Names sessions for the session selector via `pi.setSessionName()`. `/session-name <name>` command sets the name. `/session-name` (no args) shows current name via `pi.getSessionName()`. Name appears in session selector instead of first message.
  - 通过 `pi.setSessionName()` 为会话选择器命名会话。`/session-name <名称>` 命令设置名称。无参数时通过 `pi.getSessionName()` 显示当前名称。名称显示在会话选择器中，替代第一条消息。

- `bookmark.ts`
  - Bookmarks entries with labels for `/tree` navigation via `pi.setLabel()`. `/bookmark [label]` marks the last assistant message. `/unbookmark` removes bookmark from last labeled entry. Uses `ctx.sessionManager.getLabel()` to find labeled entries. Labels appear in tree view.
  - 通过 `pi.setLabel()` 为 `/tree` 导航添加带标签的书签条目。`/bookmark [标签]` 标记最后一条助手消息。`/unbookmark` 移除最后一条带标签条目的书签。使用 `ctx.sessionManager.getLabel()` 查找带标签的条目。标签显示在树视图中。

## Custom Providers

- `custom-provider-anthropic/`
  - Custom Anthropic provider with OAuth support. Implements PKCE flow (`generatePKCE`), OAuth login (`loginAnthropic`), and token refresh (`refreshAnthropicToken`). Custom streaming implementation (`streamCustomAnthropic`) with content block conversion, tool conversion, and stop reason mapping. Supports Claude Code name conversion.
  - 支持 OAuth 的自定义 Anthropic 提供商。实现 PKCE 流程（`generatePKCE`）、OAuth 登录（`loginAnthropic`）和令牌刷新（`refreshAnthropicToken`）。自定义流式实现（`streamCustomAnthropic`），包含内容块转换、工具转换和停止原因映射。支持 Claude Code 名称转换。

- `custom-provider-gitlab-duo/`
  - GitLab Duo provider using pi-ai's built-in Anthropic/OpenAI streaming via proxy. Implements OAuth login (`loginGitLab`), token refresh (`refreshGitLabToken`), and direct access token (`getDirectAccessToken`). Custom streaming (`streamGitLabDuo`) with model definitions for GitLab Duo models.
  - 通过代理使用 pi-ai 内置 Anthropic/OpenAI 流式的 GitLab Duo 提供商。实现 OAuth 登录（`loginGitLab`）、令牌刷新（`refreshGitLabToken`）和直接访问令牌（`getDirectAccessToken`）。自定义流式（`streamGitLabDuo`），包含 GitLab Duo 模型的模型定义。

## External Dependencies

- `with-deps/`
  - Extension with its own `package.json` and npm dependencies. Demonstrates jiti module resolution from extension's own `node_modules`. Uses `ms` package for human-readable duration parsing. Registers `parse_duration` tool that converts strings like "2 days" to milliseconds.
  - 拥有独立 `package.json` 和 npm 依赖的扩展。演示 jiti 从扩展自身 `node_modules` 解析模块。使用 `ms` 包解析人类可读的持续时间。注册 `parse_duration` 工具，将 "2 days" 等字符串转换为毫秒。

- `file-trigger.ts`
  - Watches `/tmp/agent-trigger.txt` via `fs.watch()` on `session_start`. When file content changes, reads content and sends as custom message via `pi.sendMessage()` with `triggerTurn: true` to get LLM response. Clears file after reading. Useful for external systems to send messages to the agent.
  - 在 `session_start` 时通过 `fs.watch()` 监视 `/tmp/agent-trigger.txt`。文件内容变化时读取内容，通过 `pi.sendMessage()` 配合 `triggerTurn: true` 发送自定义消息以触发 LLM 响应。读取后清空文件。用于外部系统向代理发送消息。