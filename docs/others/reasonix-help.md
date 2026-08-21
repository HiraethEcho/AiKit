# Reasonix 帮助参考

## 概述

Reasonix — AI 编码代理，采用双模型协作（规划器 + 执行器）。专为结构化、权限感知的开发工作流设计。

## 快速开始

```sh
reasonix                    # 交互式 TUI 模式
reasonix "修复这个 bug"     # 一次性带提示词
reasonix -c                 # 继续之前的会话
reasonix -r                 # 恢复会话选择器
```

## 配置

解析顺序（后加载者获胜）：flag > `./reasonix.toml` > `~/.config/reasonix/config.toml` > 内置默认值。

### 关键配置字段

| 字段 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `default_model` | string | `deepseek-flash` | 默认执行器模型 |
| `language` | string | auto | UI/模型语言 (zh/en) |
| `planner_model` | string | `deepseek-pro` | 规划器模型（双模型协作） |
| `agent.max_steps` | int | 0 | 执行器工具调用轮次 (0 = 无限制) |
| `agent.auto_plan` | string | `off` | 自动规划模式 (off/on) |
| `agent.temperature` | float | 0.0 | 模型温度 |
| `agent.output_style` | string | `concise` | 输出风格/语气 |
| `agent.compact_ratio` | float | 0.8 | 压缩阈值 |
| `tools.bash_timeout_seconds` | int | 120 | Bash 安全超时上限 |
| `codegraph.enabled` | bool | false | 内置 CodeGraph MCP |
| `lsp.enabled` | bool | true | 语言服务器工具 |
| `permissions.mode` | string | `ask` | 权限模式 (ask/allow/deny) |
| `sandbox.bash` | string | `enforce` | 操作系统沙箱强制 |

## 提供商

在 `[[providers]]` 部分声明：

```toml
[[providers]]
name        = "deepseek-flash"
kind        = "openai"
base_url    = "https://api.deepseek.com"
models      = ["deepseek-v4-flash"]
default     = "deepseek-v4-flash"
api_key_env = "DEEPSEEK_API_KEY"
context_window = 1000000
price       = { cache_hit = 0.02, input = 1, output = 2, currency = "¥" }
```

## 技能

默认从 `.agents/skills/<name>/SKILL.md` 加载。通过 `skills.paths` 自定义路径。

子代理技能使用 `runAs=subagent`，可为每个技能配置模型覆盖：

```toml
[skills]
paths = ["~/my-skills"]
disabled_skills = ["review"]
```

## 权限

优先级：deny > ask > allow > fallback。读取操作默认为 allow。

```toml
[permissions]
mode = "ask"
deny = ["bash(rm -rf*)", "bash(git push*)"]
allow = ["bash(go test*)"]
```

## 子代理

- 内置：`explore`（代码探索）
- 通过 `runAs=subagent` 技能自定义
- 通过 `subagent_models` 按技能覆盖模型

## 环境变量

| 变量 | 用途 |
|------|------|
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥 |
| `REASONIX_LANG` | 语言覆盖 (zh/en) |
| `REASONIX_PROXY_PASSWORD` | 代理密码 |

## 链接

- 仓库：https://github.com/reasonix/reasonix (假设)
- 配置参考：见 `configs/reasonix-example.toml`