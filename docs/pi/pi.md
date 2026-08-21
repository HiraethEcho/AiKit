# Pi Coding Agent

精简核心，其余皆为扩展。Pi 仅内置 4 个工具（`read`、`write`、`edit`、`bash`），无内置子代理、plan 模式或 MCP。通过 TypeScript 扩展、技能、提示词模板和主题按需添加。

> "勿将所有功能放入核心。保持代理框架小巧。暴露扩展点，让用户组合自己的工作流。"

一个最小化、可扩展的终端编码代理框架。由 Mario Zechner (badlogic) 构建。MIT、TypeScript。

- 网站 / 文档：https://pi.dev/
- 仓库：https://github.com/earendil-works/pi
- npm：`@earendil-works/pi-coding-agent`

## 配置位置（本目录）

| 文件                                | 用途                        |
| ----------------------------------- | --------------------------- |
| `AGENTS.md`                         | 项目上下文                  |
| `.agents/mcp.json`                  | canonical MCP 服务列表      |
| `.agents/skills/<n>/SKILL.md`       | 共享技能                    |
| `.pi/agent/settings.json`           | 包、默认模型                |
| `.agents/models.json`               | canonical 提供商（pi 共享） |
| `.pi/mcp.json` → `.agents/mcp.json` | MCP 服务 symlink            |
| `~/.pi/agent/`                      | 用户全局：会话、模型、扩展  |

## 完整配置文件参考

### 项目级 (`<cwd>/.pi/`)

| 文件               | 用途                              |
| ------------------ | --------------------------------- |
| `settings.json`    | 项目设置（与全局深度合并）        |
| `mcp.json`         | MCP 服务定义                      |
| `sandbox.json`     | 沙箱安全配置（通过 sandbox 扩展） |
| `AGENTS.md`        | 项目上下文（也会搜索父目录）      |
| `SYSTEM.md`        | 项目系统提示词覆盖                |
| `APPEND_SYSTEM.md` | 项目系统提示词追加                |
| `extensions/`      | 项目扩展                          |
| `prompts/`         | 项目提示词模板                    |
| `skills/`          | 项目技能                          |
| `themes/`          | 项目主题                          |

### 用户全局 (`~/.pi/agent/`) — 可通过 `$PI_CODING_AGENT_DIR` 覆盖根目录

| 文件               | 用途                                   |
| ------------------ | -------------------------------------- |
| `settings.json`    | 包、默认模型、提示词、主题、扩展、技能 |
| `models.json`      | 自定义模型/提供商定义                  |
| `auth.json`        | OAuth / API key 存储                   |
| `oauth.json`       | OAuth token 存储                       |
| `keybindings.json` | 按键绑定配置                           |
| `trust.json`       | 项目信任决策                           |
| `AGENTS.md`        | 全局项目上下文/指令                    |
| `SYSTEM.md`        | 全局系统提示词覆盖                     |
| `APPEND_SYSTEM.md` | 全局系统提示词追加                     |
| `extensions/`      | 全局 TypeScript 扩展文件               |
| `prompts/`         | 全局提示词模板（`/name` 展开）         |
| `skills/`          | 全局技能定义                           |
| `themes/`          | 全局主题 JSON 文件                     |
| `tools/`           | 自定义工具定义                         |
| `sessions/`        | 会话存储（`.jsonl` 文件）              |
| `git/`             | git 相关配置                           |
| `npm/`             | npm 相关配置                           |

### 工作区共享 (`<cwd>/.agents/`)

| 文件                  | 用途                                          |
| --------------------- | --------------------------------------------- |
| `mcp.json`            | canonical MCP 服务列表（pi 和 opencode 共享） |
| `skills/<n>/SKILL.md` | 共享技能定义                                  |

## 环境变量

| 变量                          | 默认值                    | 用途                                  |
| ----------------------------- | ------------------------- | ------------------------------------- |
| `PI_CODING_AGENT_DIR`         | `~/.pi/agent`             | 覆盖整个配置目录                      |
| `PI_CODING_AGENT_SESSION_DIR` | `<agentDir>/sessions/`    | 覆盖会话存储目录                      |
| `PI_PACKAGE_DIR`              | （二进制位置）            | 覆盖包安装目录（Nix/Guix）            |
| `PI_OFFLINE`                  | —                         | `1/true/yes` 禁用启动网络操作         |
| `PI_TELEMETRY`                | —                         | `1/true/yes` 或 `0/false/no` 安装遥测 |
| `PI_SHARE_VIEWER_URL`         | `https://pi.dev/session/` | `/share` 命令的基础 URL               |
| `PI_NO_PTY`                   | —                         | 禁用 PTY 交互式 bash                  |
| `PI_SKIP_VERSION_CHECK`       | —                         | 启动时跳过版本检查                    |

## 安装

```sh
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

`--ignore-scripts` 禁用安装期间的依赖生命周期脚本。

## 运行时模式

| 模式         | 用途                    |
| ------------ | ----------------------- |
| 交互式 TUI   | 日常编码                |
| print / JSON | 脚本化、一次性          |
| RPC          | 进程集成（见 OpenClaw） |
| SDK          | 嵌入自己的应用          |

## 核心包

- `pi-coding-agent` — CLI + 代理运行时
- `pi-agent-core` — 代理循环、工具
- `pi-ai` — 统一模型 API
- `pi-tui` — 终端 UI 组件

## 提供商 & 模型

15+ 提供商支持：Anthropic、OpenAI、Google、Azure、Bedrock、Mistral、Groq、Cerebras、xAI、Hugging Face、Kimi For Coding、MiniMax、OpenRouter、Ollama 等。通过 API key 或 OAuth 认证。

- 会话中切换：`/model` 或 `Ctrl+L`
- 循环切换收藏：`Ctrl+P`
- 添加自定义：`models.json` 或提供商扩展

## 自定义

### 配置加载顺序

1. 全局：`~/.pi/agent/settings.json`（最低优先级）
2. 项目：`<cwd>/.pi/settings.json`（深度合并到全局）
3. `PI_CODING_AGENT_DIR` 环境变量覆盖整个代理目录

`CONFIG_DIR_NAME` 默认为 `".pi"`，可通过 `package.json` `piConfig.configDir` 覆盖。

### 上下文文件

- `AGENTS.md` — 项目指令，启动时从 `~/.pi/agent/`、父目录和 cwd 加载
- `SYSTEM.md` — 替换或追加默认系统提示词（按项目）

### 技能

能力包，包含指令 + 工具，按需加载。渐进式披露，提示词缓存友好。

### 提示词模板

可复用提示词，Markdown 文件。输入 `/name` 展开。

### 主题

TUI 的视觉自定义。

### 扩展

TypeScript 模块，可：

- 注册自定义工具 (`pi.registerTool()`)
- 拦截生命周期事件（阻止/修改工具调用、注入上下文、自定义压缩）
- 提示用户 (`ctx.ui`：选择、确认、输入、通知、自定义 TUI)
- 注册自定义命令 (`/mycommand` 通过 `pi.registerCommand()`)
- 跨重启持久化状态 (`pi.appendEntry()`)
- 自定义工具调用/结果/消息的渲染

**位置：**

- 全局：`~/.pi/agent/extensions/`
- 项目：`.pi/extensions/`
- 快速测试：`pi -e ./path.ts`（不可热重载）

热重载：`/reload`。

## 会话

- 树形结构历史。通过 `/tree` 导航到任意节点。
- 所有分支存储在单个文件中。
- 按消息类型过滤，标签条目为书签。
- 通过 `/export` 导出为 HTML；通过 `/share` 分享到 GitHub gist。

## 压缩

自动总结接近上下文限制的旧消息。可通过扩展完全自定义 — 实现基于主题、代码感知或使用不同的总结模型。

示例：`examples/extensions/custom-compaction.ts`

## 常见工作流

- **权限门控**：在执行 `rm -rf`、`sudo` 等之前确认
- **Git 检查点**：每轮 stash，分支恢复
- **路径保护**：阻止写入 `.env`、`node_modules/`
- **代理链**：Scout → Plan → Build → Review
- **域锁定安全**：代理限制在特定目录

## CLI 参考

```sh
pi                          # 启动交互式 TUI
pi "fix the bug"            # 一次性带提示词
pi -e ./my-ext.ts           # 加载扩展快速测试
pi --system-prompt "..."    # 覆盖系统提示词
pi --append-system-prompt   # 追加系统提示词
```

## 有用链接

- 扩展文档：http://pi.dev/docs/latest/extensions
- 设置 + LazyPi：https://www.bitdoze.com/pi-coding-agent-setup-guide
- 框架概述：https://silenceper.com/en/article/2026-05-27-pi-coding-agent-harness
- vs Claude Code：https://agenticengineer.com/the-only-claude-code-competitor
- 自文档演示：https://dev.to/theoklitosbam7/pi-coding-agent-a-self-documenting-extensible-ai-partner-dn
- 示例扩展：https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions
- Discord：https://discord.com/invite/3cU7Bz4UPx
- 设置指南（中文）：https://blog.dejavu.moe/posts/translation-setting-up-and-using-the-pi-coding-agent/