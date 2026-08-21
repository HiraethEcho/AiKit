# Opencode

## 速查表

| 操作       | 命令                               |
| ---------- | ---------------------------------- |
| 启动 TUI   | `opencode`                         |
| 打印模式   | `opencode -p "..."`                |
| 继续会话   | `opencode -c`                      |
| 恢复选择器 | `opencode -r`                      |
| 切换模型   | `Shift+Tab`                        |
| 切换代理   | `Tab`                              |
| 调试配置   | `opencode debug config`            |
| MCP 列表   | `opencode mcp list`                |
| 重载       | TUI 内: `Ctrl+R`                   |
| 添加技能   | 写入 `.agents/skills/<n>/SKILL.md` |
| 添加 MCP   | 编辑 `.agents/mcp.json`            |
| 添加插件   | 添加到 `opencode.jsonc` `plugin[]` |

## 安装

```sh
# 二进制
curl -fsSL https://opencode.ai/install | sh
# npm
npm i -g opencode-ai
# bun
bun add -g opencode-ai
```

## 完整配置文件参考

### 全局 (`~/.config/opencode/` — 遵循 `$XDG_CONFIG_HOME`)

| 文件/目录                     | 用途                             |
| ----------------------------- | -------------------------------- |
| `opencode.jsonc` (或 `.json`) | 主配置: 插件、权限、模型、提供商 |
| `tui.json` / `tui.jsonc`      | TUI 特定配置 (主题、按键绑定)    |
| `plugin/*.ts`                 | 全局插件 (例如 `mcp-loader.ts`)  |
| `agents/<name>.md`            | 全局自定义代理定义               |

### 项目级 (`<cwd>/`)

| 文件/目录                                   | 用途                    |
| ------------------------------------------- | ----------------------- |
| `opencode.jsonc` / `opencode.json` (根目录) | 项目配置 (与全局合并)   |
| `.opencode/opencode.jsonc`                  | 项目配置的备选位置      |
| `.opencode/plugin/*.ts`                     | 项目本地插件            |
| `.opencode/agents/<name>.md`                | 项目自定义代理          |
| `.opencode/commands/`                       | 自定义命令              |
| `.opencode/skills/`                         | 项目技能                |
| `.opencode/package.json`                    | 插件依赖 (Bun 自动安装) |

### XDG 路径 (`opencode debug paths`)

| 键       | 默认                                                    |
| -------- | ------------------------------------------------------- |
| `config` | `$XDG_CONFIG_HOME/opencode` 或 `~/.config/opencode`     |
| `data`   | `$XDG_DATA_HOME/opencode` 或 `~/.local/share/opencode`  |
| `cache`  | `$XDG_CACHE_HOME/opencode` 或 `~/.cache/opencode`       |
| `state`  | `$XDG_STATE_HOME/opencode` 或 `~/.local/state/opencode` |
| `bin`    | `~/.cache/opencode/bin`                                 |
| `log`    | `~/.local/share/opencode/log`                           |
| `repos`  | `~/.local/share/opencode/repos`                         |
| `tmp`    | `/tmp/opencode`                                         |

## 加载顺序 (后加载者获胜，深度合并)

1. `~/.config/opencode/opencode.jsonc` — 全局 (最低优先级)
2. `opencode.jsonc` (项目根目录或 `.opencode/`) — 项目
3. `.opencode/plugins/`、`.opencode/agents/`、`.opencode/commands/`、`.opencode/skills/`
4. `OPENCODE_CONFIG` 环境变量 (最高优先级)

配置是合并而非替换。不冲突的键会被保留。设置 `OPENCODE_DISABLE_PROJECT_CONFIG=true` 可跳过项目级配置。

## 环境变量

| 变量                                                    | 用途                          |
| ------------------------------------------------------- | ----------------------------- |
| `OPENCODE_CONFIG`                                       | 覆盖配置文件路径 (最高优先级) |
| `OPENCODE_CONFIG_DIR`                                   | 覆盖配置目录                  |
| `OPENCODE_CONFIG_CONTENT`                               | 内联配置内容 (绕过文件读取)   |
| `OPENCODE_TUI_CONFIG`                                   | 覆盖 TUI 配置文件路径         |
| `OPENCODE_DISABLE_PROJECT_CONFIG`                       | `true` 禁用项目级配置加载     |
| `OPENCODE_PURE`                                         | 无外部插件运行                |
| `OPENCODE_PERMISSION`                                   | 权限配置覆盖                  |
| `OPENCODE_PLUGIN_META_FILE`                             | 插件元数据文件路径            |
| `OPENCODE_CLIENT`                                       | 客户端类型 (默认: `"cli"`)    |
| `OPENCODE_DB`                                           | 数据库路径覆盖                |
| `OPENCODE_MODELS_URL` / `OPENCODE_MODELS_PATH`          | 模型 URL/路径覆盖             |
| `OPENCODE_WORKSPACE_ID`                                 | 工作区 ID                     |
| `OPENCODE_SERVER_PASSWORD` / `OPENCODE_SERVER_USERNAME` | 服务器认证                    |
| `OPENCODE_DISABLE_AUTOUPDATE`                           | 禁用自动更新                  |
| `OPENCODE_DISABLE_PRUNE`                                | 禁用会话修剪                  |
| `OPENCODE_DISABLE_TERMINAL_TITLE`                       | 禁用终端标题更改              |
| `OPENCODE_DISABLE_AUTOCOMPACT`                          | 禁用自动压缩                  |
| `OPENCODE_DISABLE_MODELS_FETCH`                         | 禁用模型获取                  |
| `OPENCODE_DISABLE_MOUSE`                                | 禁用鼠标支持                  |
| `OPENCODE_DISABLE_SHARE`                                | 禁用会话共享                  |
| `OPENCODE_EXPERIMENTAL`                                 | 实验性功能总开关              |
| `OPENCODE_FAKE_VCS`                                     | 假 VCS 模式                   |
| `OPENCODE_REPO_CLONE_GITHUB_BASE_URL`                   | 自定义 GitHub 克隆基础 URL    |

## 模型 / 提供商

- `provider.<id>.options.apiKey` → 环境变量: `ANTHROPIC_API_KEY`、`OPENAI_API_KEY`、`GEMINI_API_KEY`、`GITHUB_TOKEN`
- `model` (默认), `small_model` (标题生成)
- `provider.<id>.options.timeout` 毫秒，默认 300000
- 禁用提供商: `disabled_providers: ["openai"]`

## 插件 / MCP / 代理

**插件** (此目录): `opencode.jsonc` `plugin[]` → `./plugin/mcp-loader.ts` (本地) 或 npm 名称。
本地插件可通过 `.opencode/package.json` 使用外部依赖 (Bun 自动安装)。

**技能**: `.agents/skills/<n>/SKILL.md` (共享)。格式: YAML 前置元数据 `name` + `description` (必需)，`license`、`compatibility` (可选)。正文 = markdown。配置中 `permission.skill.<pattern>` 控制加载行为。

**代理** (自定义): `.opencode/agents/<name>.md` — 前置元数据 + 提示词正文。或在 `opencode.jsonc` `agent.<name>` 中定义。

**子代理**: 内置 `build`、`plan`。常规任务使用 `general-purpose`。

## 自定义

- `provider` 块: 声明自定义 OpenAI 兼容端点
- `compaction.prune: true` — 丢弃旧工具输出
- `watcher.ignore: ["node_modules/**"]` — 从文件监视中排除
- `snapshot: false` — 禁用撤销 (大型仓库更快)
- `autoupdate: "notify"` — 仅通知，不自动安装
- `share: "auto" | "manual" | "disabled"` — 会话共享
- `default_agent: "build" | "plan"` — 设置主代理

## 权限

- `"allow"` 不提示，`"ask"` 每次提示，`"deny"` 静默阻止
- `bash.<glob>`: 例如 `"git status*": "allow"`，`"rm -rf *": "deny"`
- `permission.skill.<pattern>`: `"git-*": "ask"`

全局配置: `~/.config/opencode/opencode.jsonc`。本地: `.opencode/opencode.jsonc`。

## OCX 集成

opencode 通过 `ocx` CLI 管理组件和 profile。详见 `ocx.md`。

```sh
ocx add alias/component          # 安装 registry 组件
ocx add npm:package-name         # 安装 npm 插件
ocx profile list --global        # 列出 profile
ocx config show                  # 查看当前配置
```

## 链接

- 文档: https://opencode.ai/docs
- 配置 schema: https://opencode.ai/config.json
- 插件: https://opencode.ai/docs/plugins/
- MCP: https://opencode.ai/docs/mcp-servers/
- 技能: https://opencode.ai/docs/skills/
- 仓库: https://github.com/anomalyco/opencode
- 插件 API: https://opencode.ai/docs/plugins
