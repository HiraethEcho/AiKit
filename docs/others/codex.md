# Codex

OpenAI Codex CLI — 本地运行的 AI 编码代理，支持 GPT-5.3/5.4/5.5 模型。

## 特性

- **本地执行**: 完全在本地运行，无云端依赖
- **GPT-5 模型**: 支持 gpt-5.3-codex-spark、gpt-5.4、gpt-5.5
- **多模态**: 代码编辑 + 图像生成（gpt-image-2）
- **会话管理**: workspace、session、thread 隔离
- **工具集成**: 内置文件编辑、bash、grep 等工具

## 安装

```sh
npm install -g @openai/codex-cli
```

## 配置

### 全局配置

默认路径：`~/.codex/config.toml`

```toml
model = "openai-codex/gpt-5.5"
thinking = "high"
max_turns = 100
output_style = "concise"
```

### 环境变量

| 变量 | 用途 |
|------|------|
| OPENAI_API_KEY | OpenAI API 密钥 |
| CODEX_SESSION_ID | 指定会话 ID |
| CODEX_THREAD_ID | 指定线程 ID |

## 使用

### CLI 命令

```sh
codex                    # 交互式对话
codex exec "任务描述" # 一次性执行
codex resume           # 恢复会话
codex workspace init   # 初始化工作区
codex auth login       # 登录认证
```

### 图像生成

```sh
codex --image "描述"   # 生成图像
codex -i "a red cat"  # 简写形式
```

## Profile 集成

在 AI Agent Sandbox 中部署：

```sh
./scripts/setup.sh --profile code
```

模板位置：`configs/codex/`（待创建）

## 模型选择

| 模型 | 用途 |
|------|------|
| gpt-5.3-codex-spark | 快速实时编码迭代 |
| gpt-5.4 | 平衡性能和成本 |
| gpt-5.5 | 复杂软件工程，行业领先编码能力 |