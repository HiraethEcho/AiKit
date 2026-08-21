# Reasonix

AI 编码代理，采用双模型协作（规划器 + 执行器）。专为结构化、权限感知的开发工作流设计。

## 特性

- **双模型协作**: 规划器（planner）+ 执行器（executor）分离
- **权限感知**: ask/allow/deny 三级权限控制
- **代码图谱**: 内置 CodeGraph MCP 支持
- **LSP 集成**: 语言服务器工具内置
- **沙箱执行**: 操作系统级 bash 沙箱
- **技能系统**: 从 `.agents/skills/` 加载自定义技能

## 安装

Reasonix 通过 npm 全局安装：

```sh
npm install -g reasonix
```

或使用项目内的本地版本（通过 `setup.sh` symlink 部署）。

## 配置

### 配置文件位置

解析顺序（后加载者获胜）：

```
flag > ./reasonix.toml > ~/.config/reasonix/config.toml > 内置默认值
```

### 全局配置

默认路径：`~/.config/reasonix/config.toml`

```toml
# 核心配置
default_model = "deepseek-flash"   # 执行器模型
planner_model = "deepseek-pro"    # 规划器模型
language = "auto"                  # UI/模型语言 (zh/en)

# Agent 行为
[agent]
max_steps = 0                      # 工具调用轮次上限 (0=无限制)
auto_plan = "off"                  # 自动规划模式
temperature = 0.0                  # 模型温度
output_style = "concise"           # 输出风格
compact_ratio = 0.8                # 压缩阈值

# 工具配置
[tools]
bash_timeout_seconds = 120         # Bash 超时上限

# CodeGraph
[codegraph]
enabled = false                    # 启用 CodeGraph MCP

# LSP
[lsp]
enabled = true                     # 启用语言服务器工具

# 权限配置
[permissions]
mode = "ask"                       # 权限模式 (ask/allow/deny)
deny = ["bash(rm -rf*)", "bash(git push*)"]
allow = ["bash(go test*)"]

# 沙箱配置
[sandbox]
bash = "enforce"                   # 操作系统沙箱强制
```

### 提供商配置

在 `[[providers]]` 部分声明模型提供商：

```toml
[[providers]]
name = "deepseek-flash"
kind = "openai"
base_url = "https://api.deepseek.com"
models = ["deepseek-v4-flash"]
default = "deepseek-v4-flash"
api_key_env = "DEEPSEEK_API_KEY"
context_window = 1000000
price = { cache_hit = 0.02, input = 1, output = 2, currency = "¥" }
```

### 技能配置

默认从 `.agents/skills/<name>/SKILL.md` 加载：

```toml
[skills]
paths = ["~/.agents/skills"]       # 技能路径
disabled_skills = ["review"]       # 禁用的技能
```

子代理技能使用 `runAs=subagent`，可为每个技能配置模型覆盖：

```toml
[skills]
subagent_models = { review = "gpt-4" }
```

## 使用

### CLI 用法

```sh
reasonix                    # 交互式 TUI 模式
reasonix "修复这个 bug"     # 一次性带提示词
reasonix -c                 # 继续之前的会话
reasonix -r                 # 恢复会话选择器
```

### 项目配置

在项目根目录创建 `reasonix.toml` 覆盖全局配置：

```toml
# 项目级配置示例
default_model = "claude-3.5-sonnet"
agent.max_steps = 50
```

## 环境变量

| 变量 | 用途 |
|------|------|
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥 |
| `REASONIX_LANG` | 语言覆盖 (zh/en) |
| `REASONIX_PROXY_PASSWORD` | 代理密码 |

## Profile 集成

在 AI Agent Sandbox 中，通过 `setup.sh` 部署：

```sh
./scripts/setup.sh --profile code  # 部署 reasonix 模板到 ~/.config/reasonix/
```

模板位置：`configs/reasonix-global/`

## 权限详解

优先级：deny > ask > allow > fallback

- **deny**: 完全阻止操作
- **ask**: 每次询问用户
- **allow**: 允许执行，询问敏感操作
- **fallback**: 默认允许读取操作

```toml
[permissions]
mode = "ask"
deny = ["bash(rm -rf*)", "bash(git push --force)"]
allow = ["bash(go test*)", "bash(npm run *)"]
```

## 子代理

内置子代理：
- `explore`: 代码探索

通过技能自定义：
```toml
[skills]
runAs = "subagent"
```

## 链接

- 仓库：https://github.com/reasonix/reasonix
- 配置参考：见 `docs/others/reasonix-help.md`