# Claude Code

Anthropic Claude CLI — 本地运行的 AI 编码代理，支持 Claude 4/3.5 模型。

## 特性

- **本地执行**: 通过 Claude Code CLI 本地运行
- **Claude 4/3.5**: 支持 opus、sonnet、haiku 模型
- **MCP 支持**: 通过 Model Context Protocol 扩展工具
- **会话管理**: 项目级会话隔离
- **TUI 模式**: 交互式终端界面
- **编辑工具**: 内置 Edit、MultiEdit、Bash 等工具

## 安装

```sh
npm install -g @anthropic-ai/claude-code-cli
# 或下载 macOS/Linux 二进制
```

## 配置

### 全局配置

默认路径：`~/.claude/settings.json`

```json
{
  "model": "claude-sonnet-4-20250514",
  "maxTokens": 4096,
  "thinking": {
    "type": "enabled",
    "budget": 1024
  }
}
```

### 环境变量
| 变量 | 用途 |
|------|------|
| ANTHROPIC_API_KEY | Anthropic API 密钥 |
| CLAUDE_API_KEY | 同上，兼容 |

## 使用

### CLI 命令

```sh
claude                    # 交互式对话
claude "任务描述"     # 一次性执行
claude -p "prompt"    # 指定 prompt 文件
claude --resume        # 恢复会话
```

### MCP 工具

```sh
claude mcp add <server> # 添加 MCP 服务器
claude mcp list        # 列出已添加的 MCP
```

## Profile 集成

在 AI Agent Sandbox 中部署：

```sh
./scripts/setup.sh --profile code
```

模板位置：`configs/claude/`（待创建）

## 模型选择
| 模型 | 用途 |
|------|------|
| claude-opus-4-20250514 | 最强编码能力，适合复杂任务 |
| claude-sonnet-4-20250514 | 平衡性能和成本 |
| claude-3-5-sonnet-20240620 | 性价比首选 |