# AI4Math — 架构

AI4Math 内部工作原理的工程概览——用于在无需阅读全部代码的情况下进行修改或诊断问题。

---

## 组成层次

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. 用户                                                         │
│    ai4math [session|run] [-m qwen|deepseek|gptoss] [args]       │
└──────────────────────────────┬──────────────────────────────────┘
                               │ bash / cmd
┌──────────────────────────────▼──────────────────────────────────┐
│ 2. bin/ai4math (shim) → bin/ai4math.py (跨平台核心)              │
│    - 加载 .env                                                  │
│    - 设置 per-model GOOSE_CONTEXT_LIMIT 和其他调优参数           │
│    - 解析 recipes/ai4math.yaml → 两部分：                       │
│      (a) instructions → tempfile → GOOSE_SYSTEM_PROMPT_FILE_PATH│
│      (b) extensions → --with-builtin / --with-extension flags   │
│    - exec goose session|run --no-profile                        │
└──────────────────────────────┬──────────────────────────────────┘
                               │ exec (POSIX) / subprocess (Windows)
┌──────────────────────────────▼──────────────────────────────────┐
│ 3. .tools/goose                 (agent 循环)                    │
│    - OpenAI-compatible client → Yandex AI Studio                │
│    - developer builtin + ai4math stdio 的 tool_schemas          │
│    - agent loop: message → tool_calls → tool_exec → message ... │
│    - 当 GOOSE_AUTO_COMPACT_THRESHOLD (0.8) 时自动压缩            │
└────────────┬──────────────────┬─────────────────────────────────┘
             │ HTTPS            │ stdio JSON-RPC (MCP)
             │                  │
┌────────────▼──────────┐  ┌────▼──────────────────────────────────┐
│ 4a. Yandex AI Studio  │  │ 4b. src/ai4math_mcp.py                │
│     /v1/chat/compl    │  │     FastMCP("ai4math") — 13 个工具     │
│     qwen / deepseek / │  │       lean_check, lean_health         │
│     gpt-oss           │  │       lean_search_scilib  ⭐ primary  │
└───────────────────────┘  │       lean_search_loogle/leansearch/  │
                           │         moogle + _engines             │
                           │       web_search, web_fetch           │
                           │       pdf_info/read/search            │
                           └────┬──────────────────────────────────┘
                                │ HTTPS（用于大多数工具）
  ┌────────────┬────────┬───────┼──────────┬───────────┬───────────┐
  │            │        │       │          │           │           │
  ▼            ▼        ▼       ▼          ▼           ▼           ▼
┌────────┐ ┌──────┐ ┌─────────┐ ┌─────────────┐ ┌──────┐ ┌───────────┐
│SciLib- │ │Loogle│ │LeanSrch │ │Moogle       │ │DDG   │ │pypdf      │
│GRC21   │ │      │ │         │ │             │ │Brave │ │(local)    │
│/check  │ │      │ │         │ │             │ │      │ │           │
│/search │ │      │ │         │ │best-effort  │ │      │ │           │
└────────┘ └──────┘ └─────────┘ └─────────────┘ └──────┘ └───────────┘
   primary
   Lean +
   GraphRAG
```

**Lean 后端** 默认 — `https://scilibai.ru/grag` (SciLib-GRC21)。可选的本地后备 — `http://localhost:8888` (andkhalov/lean-checker, 旧架构)。MCP 根据 URL 自动检测所需架构。

---

## 组件

### 1. bin/ai4math (shim) + bin/ai4math.py (核心)

跨平台 Python 入口点。Linux/macOS 的 `bin/ai4math` shim 脚本和 Windows 的 `bin/ai4math.bat` 委托给 `bin/ai4math.py`：

- 读取 `.env`（仅使用 stdlib，不使用 python-dotenv，以便在安装依赖前工作）
- 设置 `GOOSE_PROVIDER=openai`、`OPENAI_HOST`、`OPENAI_BASE_PATH`、`OPENAI_API_KEY`、`GOOSE_MODEL=gpt://<folder>/<slug>`
- Per-model 上下文：qwen 256k, deepseek/gptoss 128k（参见 [EXPERIMENT_REPORT.md](../report/EXPERIMENT_REPORT.md) — "Context window probe"）
- `GOOSE_AUTO_COMPACT_THRESHOLD=0.8` — 窗口填充到 80% 时自动总结
- 解析 recipe YAML：
  - `instructions` → tempfile → `GOOSE_SYSTEM_PROMPT_FILE_PATH`（Goose 读取的环境变量）
  - `extensions` → `--with-builtin <name>` + `--with-extension "<env> <cmd> <args>"` 标志列表
- `--no-profile` — 忽略 `~/.config/goose/`（其他扩展）
- 支持 `session`、`run`、`doctor`、`--help`、`--model`、`--no-lean`
- 在 POSIX 上使用 `os.execvp` 进行进程替换，在 Windows 上使用 `subprocess.run`

### 2. recipes/ai4math.yaml — Goose recipe

Goose recipe 格式：

```yaml
version: "1.0.0"
title: "AI4Math"
description: ...
extensions:
  - type: builtin
    name: developer          # bash + text_editor + todo
  - type: stdio
    name: ai4math            # 我们的 MCP
    cmd: bin/ai4math-mcp
    timeout: 180
instructions: |
  # 身份
  你是 AI4Math，课程 CLI 代理 ...
```

`instructions` 包含：

- 身份（AI4Math，不是 Claude，不是 goose）
- 课程理念（推理 → 上下文 → 验证三元组）
- 沟通风格（中文，简短，tool-first，无表情符号）
- 工具目录及描述
- 搜索引擎选择规则（scilib 为主要，其他先询问）
- Lean 工作规则（核心策略，ℕ 陷阱，sanity-filter 限制）
- 本地项目上下文工作规则（AGENTS.md / CLAUDE.md / .cursorrules 优先级）
- "禁止事项" 列表
- 安全规则

### 3. src/ai4math_mcp.py — 统一 MCP 服务器

`FastMCP("ai4math")` 包含 15 个工具，stdio 传输。由 Goose 通过 `bin/ai4math-mcp` 启动。

**Skills — 模块化按需加载** (2)：
- `list_skills()` — 枚举 `$AI4MATH_SKILLS_DIR`（默认 `<repo>/skills/`）中可用的主题指南
- `load_skill(name)` — 读取并返回 `skills/<name>.md` 的完整内容

Skills 是简短（约 100-200 行）的 markdown 文件，每个覆盖一个领域：`python.md`、`latex.md`、`markdown.md`、`lean.md`、`literature.md`、`debug-loop.md`。Recipe instructions 将任务类型与 skill 名称匹配，并要求 agent 在开始该领域工作前调用 `load_skill(...)`。这使得核心系统提示保持在约 250 行而不是 600+ 行，并支持热交换最佳实践而无需编辑 recipe。

项目特定 skills 可以作为额外的 `.md` 文件添加到 skills 目录中——无需修改代码。路径可通过 `AI4MATH_SKILLS_DIR` 环境变量覆盖。

**Lean 验证** (2)：
- `lean_check(code, timeout=60)` — 向 Lean checker 发送 HTTP 请求。根据 URL 自动检测架构（SciLib vs lean-checker）：
  - URL 包含 `/grag` → SciLib /check 架构：`{lean_code, timeout}` → `{success, error_class, error_message, sanity_ok, ...}`
  - 否则 → 旧架构：`{code, import_line}` → `{ok, messages}`
- `lean_health()` — 探测 `/health`

**Mathlib 搜索** (5)：
- `lean_search_scilib(lean_code, n)` — **primary**：POST `{SCILIB}/search` 使用 GraphRAG pipeline
- `lean_search_loogle(query)` — GET `loogle.lean-lang.org/json?q=...`
- `lean_search_leansearch(query, n)` — POST `leansearch.net/search` 使用 `{query: [...]}`
- `lean_search_moogle(query)` — POST `moogle.ai/api/search`
- `lean_search_engines()` — 健康检查所有四个引擎并比较

**Web** (2)：
- `web_search(query, n)` — 如果设置了 `BRAVE_API_KEY` 则使用 Brave Search API，否则使用 DuckDuckGo HTML scrape
- `web_fetch(url, max_chars)` — HTTP GET，HTML → 纯文本，截断

**PDF** (4) — 通过 `pypdf` + `requests` streaming：
- `pdf_download(url, dest_path)` — 二进制安全 PDF 下载，检查 `%PDF-` magic bytes（HTML 重定向时删除文件）
- `pdf_info(path)` — 元数据、页数、大小
- `pdf_read(path, pages, max_chars)` — 根据 1-indexed 规范 `"1-5,10"` 提取文本
- `pdf_search(path, query, context)` — 按行搜索

**Env-toggles**：
- `AI4MATH_LEAN_DISABLED=1` — `lean_check` / `lean_health` 返回 "disabled"
- `AI4MATH_WEB_DISABLED=1` — `web_*` 和 `pdf_download` 返回 "disabled"
- `AI4MATH_LEAN_SCHEMA=scilib|lean-checker` — 显式覆盖自动检测
- `AI4MATH_SKILLS_DIR=/path/to/skills/` — 覆盖 skill 目录路径

### 4. 外部依赖

- **Yandex AI Studio** (`https://llm.api.cloud.yandex.net/v1/chat/completions`) — 通过 OpenAI-compatible 协议的 LLM 推理。Model id: `gpt://<folder>/<slug>/latest`。Folder id 嵌入在 slug 中，不需要单独的 `OpenAI-Project` header。
- **SciLib-GRC21** (`https://scilibai.ru/grag`, [API 文档](https://github.com/andkhalov/SciLib-GRC21/blob/main/docs/api.md)) — Lean 验证 (`/check`) 和前提检索 (`/search`) 的主要后端。Lean 4.28-rc1 + Mathlib 4.26 + GraphDB + PostgreSQL + Qdrant。
- **andkhalov/lean-checker**（可选，通过 Docker 在 `localhost:8888`）— 简化版本地后备，使用 Lean 4.24 + Mathlib 4.24。由 `scripts/install_lean.sh` 脚本在 `--with-lean-local` 时克隆。
- **Loogle** — `https://loogle.lean-lang.org/json?q=...`
- **LeanSearch** — `https://leansearch.net/search` POST
- **Moogle** — `https://www.moogle.ai/api/search` POST

---

## 会话生命周期

### 启动 `ai4math`

1. Shim（bash/bat）计算路径，调用 `python bin/ai4math.py`。
2. Python 加载 `.env`，根据模型设置 GOOSE 环境变量。
3. 解析 recipe → 带有 `instructions` 的 tempfile + `--with-*` 标志列表。
4. 打印 ASCII 横幅（如果 `AI4MATH_QUIET != 1`）。
5. `exec .tools/goose session --no-profile --with-builtin developer --with-extension "<cmd>"`。
6. Goose：
   - 读取 `GOOSE_SYSTEM_PROMPT_FILE_PATH` → 加载 instructions
   - 启动 stdio 子进程 `bin/ai4math-mcp` (Python + FastMCP)，等待 `initialize` 响应
   - 在 tool schema 中注册 13 个 MCP 工具 + 3 个内置 `developer` 工具
   - 打开交互式 REPL

### 每轮交互

1. 用户输入 → Goose 构建 `messages`（system + history + user）。
2. Goose → OpenAI-compat API：`POST /v1/chat/completions` 带 `tools=[...]`、`model="gpt://..."`。
3. Yandex 返回带 `content` 或 `tool_calls` 的 `message`。
4. 如果是 `tool_calls`：
   - Goose 匹配名称 → extension
   - 对于标准工具（`shell`、`text_editor`）— builtin handler
   - 对于我们的工具 — JSON-RPC `tools/call` 到 stdio 进程 MCP
   - MCP 返回结果作为字符串
   - Goose 在 history 中添加 `{role: tool, content: ...}` 并执行下一个 LLM 调用
5. 当 LLM 返回没有 tool_calls 的 `content` 时 — Goose 打印最终响应并等待下一个用户输入。

### 自动压缩

当最近一次响应中的 `usage.total_tokens` 超过 `GOOSE_CONTEXT_LIMIT * GOOSE_AUTO_COMPACT_THRESHOLD`：

1. Goose 自行调用 LLM 使用历史消息的总结提示
2. 将 history 替换为 {system + compaction_summary + 最近 N 轮}
3. 以更小的窗口继续会话
4. 用户看到 `Exceeded auto-compact threshold of 80%. Performing auto-compaction... Compaction complete`

---

## 关键限制

### gpt-oss-120b 与 Goose namespacing 不兼容

gpt-oss 会去除 tool names 中的 `developer__` 前缀，直接调用 `text_editor`，MCP 返回 `-32002: Tool not found`，会话关闭。qwen 和 deepseek 正确使用完整名称。可行的解决方法：仅将 gpt-oss 用于一次性的无 tool-chain 响应。完全修复需要 fork Goose 或 name-rewriting middleware。

### 会话中切换模型

Goose 不支持。`/exit` + `ai4math -m <other>` — 唯一途径。

### SciLib sanity filter

Endpoint 拒绝无用的提交：仅 `sorry` 的证明、裸 imports、仅注释、自然语言。Agent 知道这一点，不会发送此类片段。

### Lean checker 首次预热

SciLib endpoint 启动后，第一次请求可能需要 90 秒（预热 `lake env` + Mathlib）。后续请求 — 20-50 ms。`lean_check` 的默认超时时间为 60 秒，涵盖首次预热。

### 隐私

默认情况下，Lean 代码发送到公共 SciLib-GRC21 endpoint（在课程基础设施内）。对于敏感证明 — `./setup.sh --with-lean-local` 和 `.env` 中的 `LEAN_CHECKER_URL=http://localhost:8888`。

---

## 版本

固定版本（上次基准测试时）：

- **Goose**: 1.30.0（GitHub 发布 `aaif-goose/goose`）
- **Lean（SciLib 默认）**: 4.28.0-rc1 + Mathlib 4.26.0
- **Lean（本地后备）**: 4.24.0 + Mathlib 4.24.0
- **Yandex models**:
  - `qwen3-235b-a22b-fp8/latest`
  - `deepseek-v32/latest`
  - `gpt-oss-120b/latest`
- **Python**: 3.10+（最低）
- **MCP SDK**: `mcp>=0.9`（FastMCP API）

---

## 调试

```bash
ai4math doctor                          # 检查环境
RUST_LOG=debug ai4math run "..."        # verbose Goose 日志
curl https://scilibai.ru/grag/health   # 远程 Lean endpoint
curl http://localhost:8888/health       # 本地 Lean endpoint（如果安装了）
docker logs lean-checker-lean-server-1  # 本地 Lean 容器日志
goose session list                      # 列出历史会话
```

会话工作目录：`~/.config/goose/sessions/` (POSIX) 或 `%APPDATA%\goose\sessions\` (Windows)。