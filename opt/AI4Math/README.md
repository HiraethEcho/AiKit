# AI4Math

![Linux](https://img.shields.io/badge/linux-supported-brightgreen)
![macOS](https://img.shields.io/badge/macOS-supported-brightgreen)
![Windows](https://img.shields.io/badge/Windows-WSL2%20%7C%20native%20beta-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

**面向 YSDA「AI4Math Intensive — 构建个人数学研究 AI 环境」课程的 CLI 代理。** [repo](https://github.com/andkhalov/AI4Math)

AI4Math 是基于 Yandex AI Studio 推理后端的 Claude Code 开源替代品。面向数学研究者的科学代码助手，具备 Lean 4 验证、通过 **SciLib-GRC21** 的 Mathlib 搜索及三个辅助引擎、PDF 阅读和网络搜索功能。

在 YSDA「AI4Math Intensive」课程框架内开发。作者：A. P. Khalov, O. M. Ataeva — MIPT | Yandex | FRC CSC RAS。

---

## 快速开始 — 一条命令

克隆 + 安装 + 配置一行搞定。`setup.sh`/`setup.bat` 自动创建 venv、安装依赖、下载 Goose CLI 到 `.tools/`、启动 wizard（询问 Yandex AI Studio API 密钥和 folder id）、创建全局命令 `ai4math` 的 symlink。之后即可立即使用。每次 push 通过 GitHub Actions 在所有三个平台上自动测试（见上方 badge）。

**Linux** (Ubuntu 22+ / Debian 12+)：

```bash
sudo apt-get install -y git curl python3 python3-venv && \
  git clone https://github.com/andkhalov/AI4Math.git && cd AI4Math && ./setup.sh
```

`setup.sh` 会自动通过 apt 安装其他系统依赖（`bzip2`、`tar`、`libgomp1`）— 必要时请求 sudo，如果在 root 下运行（如 Docker 中）则无需 sudo。

**macOS** 13+ (Intel / Apple Silicon)：

```bash
git clone https://github.com/andkhalov/AI4Math.git && cd AI4Math && ./setup.sh
```

**Windows 10/11 + WSL2** — Windows 推荐路径：

```powershell
wsl --install -d Ubuntu
```

然后在 **WSL Ubuntu 内部** 执行上面 Linux 块的命令。

**Windows 原生** (PowerShell / cmd, beta)：

```batch
git clone https://github.com/andkhalov/AI4Math.git && cd AI4Math && setup.bat
```

安装后 — 关闭并重新打开终端以使 `~/.local/bin` 加入 PATH，然后运行：

```bash
# Linux / macOS / WSL
ai4math                              # 交互式会话
ai4math -m deepseek                  # 选择模型
ai4math --mode approve               # 以 approve 模式启动（工具需要确认）
ai4math run "提示"                   # 单次任务
ai4math doctor                       # 检查环境

# 交互式会话中
/plan <task>                         # 通过 planner 模型规划
/mode approve                        # 运行时切换模式
/exit                                # 退出

# Windows 原生
bin\ai4math.bat                      交互式会话
bin\ai4math.bat run "提示"           单次任务
bin\ai4math.bat doctor               检查
```

在此获取 Yandex AI Studio 密钥：[yandex.cloud/ru/docs/ai-studio/quickstart](https://yandex.cloud/ru/docs/ai-studio/quickstart)。

### 用户命令

启动和管理 `ai4math` 会话的完整方式列表。

**CLI — 从终端启动：**

| 命令                   | 功能                                                          |
| ---------------------- | ------------------------------------------------------------- |
| `ai4math`              | 使用默认模型 (qwen) 的交互式会话                              |
| `ai4math run "<提示>"` | 单次任务，输出到控制台，退出。适用于脚本和 CI                 |
| `ai4math doctor`       | 检查环境：API 密钥、Goose、`.venv`、MCP 服务器、Lean endpoint |
| `ai4math --help`       | 所有标志的简要帮助                                            |

**启动标志：**

| 标志                                    | 含义                                                          |
| --------------------------------------- | ------------------------------------------------------------- |
| `-m deepseek` / `-m qwen` / `-m gptoss` | 选择本次会话的模型（默认：`deepseek`）                        |
| `--mode smart_approve`                  | （交互式会话默认）read-only 自动，write/exec 需确认           |
| `--mode auto`                           | （`run` 模式默认）所有 tool-call 自动，无需确认               |
| `--mode approve`                        | 每个 tool-call 需要确认                                       |
| `--mode chat`                           | 仅对话，无 tool-call                                          |
| `--no-lean`                             | 启动时不加载 Lean 工具（当 SciLib endpoint 暂时不可用时有用） |
| `--`                                    | `--` 之后的所有内容原样传递给 Goose                           |

**交互式会话中的 Slash 命令**（Goose 原生命令）：

| 命令                        | 功能                                                                      |
| --------------------------- | ------------------------------------------------------------------------- |
| `/plan <task>`              | 通过 planner 模型制定分步计划，显示给用户，`accept` 后执行                |
| `/mode <name>`              | 运行时切换 approval 模式（`auto` / `smart_approve` / `approve` / `chat`） |
| `/summary`                  | 手动压缩对话历史，保留要点                                                |
| `/prompt <name>`            | 加载 Goose 内置 prompt 模板                                               |
| `/help`                     | Goose slash 命令完整列表                                                  |
| `/exit` 或 `Ctrl-C`（两次） | 退出会话                                                                  |

**快捷键：**

| 按键              | 操作                           |
| ----------------- | ------------------------------ |
| `Ctrl-C`          | 中断当前代理操作（不退出会话） |
| `Ctrl-C` 连续两次 | 退出 `ai4math`                 |
| `Ctrl-D`          | 退出（输入为空时）             |
| `↑` / `↓`         | 输入历史                       |

**环境变量**（覆盖默认值）：

| 变量                                             | 含义                                                                       |
| ------------------------------------------------ | -------------------------------------------------------------------------- |
| `AI4MATH_MODEL`                                  | 默认模型：`deepseek`（默认）/ `qwen` / `gptoss`                            |
| `AI4MATH_QUIET=1`                                | 启动时不打印横幅                                                           |
| `AI4MATH_NOCOLOR=1`                              | 禁用 ANSI 颜色                                                             |
| `AI4MATH_LEAN_DISABLED=1`                        | 完全禁用 Lean 工具（如 `--no-lean`）                                       |
| `AI4MATH_SKILLS_DIR`                             | 额外的 skills 目录                                                         |
| `AI4MATH_DAILY_TOKEN_LIMIT`                      | 每日 token 限制（默认：3,000,000）                                         |
| `GOOSE_MODE`                                     | 默认 approval 模式                                                         |
| `GOOSE_PLANNER_MODEL` / `GOOSE_PLANNER_PROVIDER` | `/plan` 的独立模型（默认：Qwen3-235B，如果 `.env` 中设置了 `YANDEX_QWEN`） |
| `GOOSE_CONTEXT_LIMIT`                            | 模型上下文限制                                                             |
| `GOOSE_AUTO_COMPACT_THRESHOLD`                   | 自动压缩阈值（自动计算 — 无论模型如何，在 100k tokens 时压缩）             |
| `LEAN_CHECKER_URL`                               | 验证 endpoint 的 URL（默认 — 公共 SciLib-GRC21）                           |

**Windows 原生** — 通过 `bin\ai4math.bat` 相同操作（标志相同）。

### 模块化 Skills

AI4Math 使用 **on-demand loading of topic-specific skills** — 代理不是使用单一庞大提示，而是在任务涉及特定领域时动态加载来自 `skills/` 的简短指南。这是 Claude Code 标准模式在 Goose 上的适配。

每个 skill 是带有 Claude-Code 兼容 YAML frontmatter 的 markdown 文件：

```markdown
---
name: python
description: Python 脚本、模块、测试、Jupyter — 执行循环和 venv 规范
triggers: Python, .py, venv, pytest, script, notebook, jupyter
combines_with: debug-loop, markdown, latex
---

# Python — 模式和执行规范

...
```

`list_skills()` 显示所有描述和兼容性，`load_skill(name)` 返回完整内容。

可用 skills（`skills/*.md`）：

| Skill        | 描述                                                               |
| ------------ | ------------------------------------------------------------------ |
| `python`     | Python 脚本、模块、测试、Jupyter — 执行循环和 venv 规范            |
| `latex`      | LaTeX 文档、文章、定理/证明、pdflatex 循环                         |
| `markdown`   | GitHub-Flavored Markdown — README、文档、日记、综述                |
| `lean`       | Lean 4 — 策略、形式化、通过 lean_check 验证                        |
| `literature` | 文献综述 — web_search → pdf_download → 分析 → literature/review.md |
| `debug-loop` | 任何语言的封闭循环规范 write→run→observe→fix                       |

**组合 Skills**。Skills 可以顺序加载，一次会话加载多个。典型组合：

- **python + debug-loop** — 任何带测试和调试的代码
- **latex + lean** — 带形式化定理的科学文章
- **markdown + literature** — 带 `review.md` 的文献综述
- **python + latex** — matplotlib 图形嵌入 tex 文档

**项目特定 skills**：将 `skills/<name>.md` 文件（带 frontmatter）放在 AI4Math 根目录或通过 `AI4MATH_SKILLS_DIR` 指定的路径，代理将通过 `list_skills`/`load_skill` 看到它。适用于自定义约定、内部 API 等。

### 规划（planner/executor 分离）

**交互式会话中的 `/plan <task>`** 使用 **Qwen3-235B** 作为 planner 模型，执行通过 **DeepSeek-V3.2**（默认 executor）。这节省 token：重型模型负责 1-2 次调用的推理，廉价模型负责 30-50 次 tool call 的日常操作。自动配置 — 如果 `.env` 中有 `YANDEX_QWEN`，`GOOSE_PLANNER_MODEL` 自动设置。

手动覆盖：启动前 `export GOOSE_PLANNER_MODEL=...`。

推荐工作流：`/mode approve` → 准备上下文 → `/plan <task>` → 审查 → accept → 自动执行。

### Approval 模式

通过 `GOOSE_MODE` / `--mode` 标志 / `/mode <name>` slash 命令的 4 种模式：

| 模式            | 行为                                                                                                   | 何时默认                        |
| --------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `smart_approve` | Read-only（ls, cat, pdf_read, lean_search_*, list_skills）自动；write/exec（shell, text_editor）需确认 | 交互式会话                      |
| `auto`          | 所有 tool call 自动无需确认                                                                            | `ai4math run "..."`（非交互式） |
| `approve`       | 每个 tool call 需要确认                                                                                | —                               |
| `chat`          | 无 tool call — 仅对话                                                                                  | —                               |

运行时切换：交互式会话中 `/mode approve`。启动时：`ai4math --mode approve`。

### 每日 Token 限制

硬编码为每个实例 **3,000,000 tokens/天**（可通过 `AI4MATH_DAILY_TOKEN_LIMIT` 覆盖）。通过 Goose 和 Yandex API 之间的自定义代理计数 — 从每个响应解析 `usage.total_tokens`，写入 `~/.ai4math_budget.json`。在本地时间午夜重置。

- **会话启动前**：如果预算已用完，`ai4math`/`ai4math run` 拒绝启动（exit 4），打印剩余小时数。
- **会话进行中**：代理返回 HTTP 429 并显示超限消息 — Goose 停止会话。
- **可见性**：启动时横幅显示；代理每 5-7 个 tool call 自动报告剩余量（`(预算: 934k / 2M — 46%)`）。

查看当前消耗而不启动代理：`ai4math doctor` → 行 `budget: X / 3,000,000 (剩余 Y)`。

### 更新现有安装

如果已有旧版 AI4Math 需要更新到当前版本（从仓库 git pull 后）：

```bash
cd AI4Math
git pull origin main
# 完全重建 .venv 并重新安装 Goose — 确保旧 shim 脚本和过时的 MCP 服务器不影响新版本：
rm -rf .venv .tools
./setup.sh
```

`.env` 保持不变 — wizard 会跳过，因为文件已存在。如果想同时重新配置 API 密钥或默认模型，在 `./setup.sh` 前也删除 `.env`。

**重要**：更新后运行 `ai4math doctor` — 新版本 doctor 检查 MCP 服务器 `ai4math` 是否实际响应（通过 JSON-RPC `tools/list` 探测），而不仅仅是 ping Lean endpoint。如果 doctor 显示 `MCP ai4math: 未响应` — 说明扩展未加载（例如 `bin/ai4math-mcp` 不可执行、没有 `.venv/bin/python`、或系统无法启动 Goose 二进制文件）。没有工作的 MCP，代理将从系统提示文本中 **幻觉** `lean_check`/`web_search`，并在实际调用时返回 `-32002 Tool not found`。

### 在新机器上重新安装

与上面部分相同的单条命令。如果没有旧仓库 — 直接克隆并运行：

```bash
git clone https://github.com/andkhalov/AI4Math.git && cd AI4Math && ./setup.sh
```

`.env` 将通过 wizard 重新创建。Yandex AI Studio 密钥可以从原机器的旧 `.env` 复制。

### 卸载

AI4Math 不触及系统包，除了一个 symlink 外不全局安装任何内容。完全清理：

```bash
# 1. 删除 symlink
rm -f ~/.local/bin/ai4math

# 2. 删除仓库（包含 .venv, .tools/goose, .env）
rm -rf ~/AI4Math    # 或你克隆的位置

# 3. 删除 Goose 配置和日志（可选 — 如果不将 Goose 用于其他用途）
rm -rf ~/.config/goose
rm -rf ~/.local/state/goose
rm -rf ~/.local/share/goose
```

**Windows：**

```powershell
# 删除仓库
Remove-Item -Recurse -Force C:\path\to\AI4Math

# 删除 Goose 配置（可选）
Remove-Item -Recurse -Force "$env:APPDATA\goose"
```

之后系统上不会留下任何 AI4Math 痕迹。通过 `setup.sh` 安装的系统包（`python3`、`git`、`curl`、`libgomp1`）会保留 — 它们是标准且无害的。

---

## 为什么需要这个

课程教导数学研究者构建围绕三元组的 **个人 AI 环境**：

```
推理  →  上下文  →  验证
```

- **推理** — LLM 生成代码、文本、证明。没有上下文 — 全靠运气。
- **上下文** — 结构化知识：本体、Mathlib、日志、记忆。决定推理质量。
- **验证** — Lean、测试、同行评审。区分「看起来像真的」和「是真的」。

Claude Code 是第一部分和第三部分的好工具，但依赖 Anthropic API 并需要付费订阅。AI4Math 通过 Yandex AI Studio + 开放权重模型（Qwen3、DeepSeek-V3.2）+ 现有 CLI 代理 Goose 提供类似能力，Lean 验证和前提检索通过课程自有服务 [SciLib-GRC21](https://github.com/andkhalov/SciLib-GRC21) 运行。

**核心理念**：最少自有代码（约 500 行 Python）+ 现成组件。Agent 循环、工具执行和上下文压缩 — Goose。Lean 4 + Mathlib 验证和 GraphRAG 引理搜索 — SciLib-GRC21。推理 — Yandex AI Studio。AI4Math 的任务是将它们精心连接，以课程学生可识别的身份呈现。

---

## 安装详情

### 支持的操作系统

| 操作系统                              | 状态    | 安装路径                        |
| ------------------------------------- | ------- | ------------------------------- |
| **Linux** (Ubuntu 22+ / Debian 12+)   | ✅      | `./setup.sh`                    |
| **macOS** 13+ (Intel / Apple Silicon) | ✅      | `./setup.sh`                    |
| **Windows 10/11 + WSL2**              | ✅      | WSL 内 `./setup.sh`             |
| **Windows 原生** (PowerShell / cmd)   | 🧪 beta | `setup.bat` + `bin\ai4math.bat` |

所有四种变体在 CI 上自动测试（见顶部 badge）。

### 要求

**必须（在运行 `setup.sh` 前应有）：**

- **Python 3.10+**（Debian/Ubuntu 需要 `python3-venv`）
- **curl**、**git**

**由 `setup.sh` 自动安装**（root 下 apt-get 无需 sudo，否则需要 passwordless sudo）：

- **tar**、**bzip2** — 用于解压 Goose tar.bz2 归档
- **libgomp1** (Linux) — GCC OpenMP 运行时，Goose 二进制文件需要。这是 Goose 内部 Rust crate 的传递依赖之一，非我们选择。在典型开发机器上已通过 build-essential / python3-dev / gcc 安装；仅在最小 Docker 镜像上缺失。

**空间**：约 2 GB 用于 `.venv` + `.tools` + pip 缓存。

**可选 — 仅当需要本地 Lean 时**（默认 Lean 通过远程 SciLib 检查，不需要 Docker）：

- **Docker + Docker Compose v2** 用于 `./setup.sh --with-lean-local`
- **约 16 GB RAM** — Mathlib 首次构建最低要求（1.5-2.5 小时）
- **约 8 GB 空闲空间** 用于 Docker volume 上的 olean 文件

### 安装程序做什么

1. 检查系统依赖（Python 3.10+、git、curl、tar、bzip2、Linux 上的 libgomp1）
2. 创建 `.venv` 并从 `requirements.txt` 安装依赖
3. 下载 Goose CLI 到 `.tools/`（本地，无需 root）
4. 运行 `cli/wizard.py` — 询问 Yandex AI Studio 密钥和 folder id，写入 `.env`。默认 Lean checker URL 设置为公共 SciLib endpoint（`https://scilibai.ru/grag`）— 无需本地 Docker。
5. 可选：`./setup.sh --with-lean-local` 额外通过 `docker compose up -d` 启动 `vendor/lean-checker` 以实现完全离线工作（首次 Mathlib 构建 1.5-2.5 小时）
6. 创建 symlink `~/.local/bin/ai4math → bin/ai4math` 用于全局命令（Linux/macOS）

获取 Yandex AI Studio 密钥：[yandex.cloud/ru/docs/ai-studio/quickstart](https://yandex.cloud/ru/docs/ai-studio/quickstart)。

### 首次启动

```bash
ai4math                       # 使用默认模型的交互式会话
ai4math -m deepseek           # 选择模型
ai4math run "提示"            # 单次任务，输出到控制台，退出
ai4math doctor                # 检查环境（密钥、Lean、Goose）
ai4math --help                # 帮助
```

---

## 功能

### 类似 Claude Code

- **shell** — 当前工作目录中的 bash，代理自行选择命令
- **text_editor** — 创建、读取和编辑文件（带 before/after 的精确编辑）
- **todo** — 当前会话的本地任务列表
- **自动错误恢复** — 代理自动重建 venv、在无 `python` 时切换到 `python3`、修复边缘情况
- **多层次上下文** — Goose 管理窗口，溢出时自动总结（`GOOSE_CONTEXT_LIMIT` 的 80% 时自动压缩，参见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)）

### 通过 SciLib-GRC21 的 Lean 4 验证

- **lean_check(code, timeout=60)** — 将 Lean 4 片段发送到基于 [SciLib-GRC21](https://github.com/andkhalov/SciLib-GRC21) 的验证器（Lean 4.28-rc1 + Mathlib 4.26, Mathlib REPL）。返回 `OK` 或带错误类别的结构化错误：`PARSE_ERROR`、`TACTIC_FAILURE`、`GOAL_NOT_CLOSED`、`TIMEOUT`、`SANITY_CHECK_FAILED`。
- **lean_health()** — 检查 endpoint 是否可用。

默认使用公共 endpoint `https://scilibai.ru/grag` — 无需本地部署，`setup.sh` 只需在 `.env` 中填入此 URL。如需完全离线工作，有 `./setup.sh --with-lean-local` — 启动基于 [andkhalov/lean-checker](https://github.com/andkhalov/lean-checker) 的简化 Docker checker（Lean 4.24 + Mathlib 4.24）；MCP 自动检测旧架构并与之配合工作。

SciLib 的 sanity 过滤器拒绝无用的提交：仅 `sorry` 的证明、裸 imports、自然语言文本、仅注释的提交。这已内置在代理系统提示中 — 它不会在这些事情上浪费 tool call。

典型循环：陈述定理 → 调用 `lean_check` → 获取错误类别 + 文本 → 修正策略 → 重复。首次预热后每次检查 20-50 ms。

### Mathlib 搜索（SciLib GraphRAG + 三个外部引擎）

主要工具 — **`lean_search_scilib`** 基于我们自有 SciLib-GRC21 endpoint 的 GraphRAG pipeline：GraphDB（3380 万 RDF 三元组的 Mathlib 本体）+ PostgreSQL（213K Lean 语句）+ Qdrant 向量搜索。接受带 `sorry` 的 Lean goal，返回按策略分类的提示（apply / rw / simp）。零 LLM 调用。

用于 goal 尚未制定时的辅助外部引擎：

| 引擎                   | 输入                    | 适用场景                                  |
| ---------------------- | ----------------------- | ----------------------------------------- |
| **SciLib GraphRAG** ⭐ | 带 `sorry` 的 Lean goal | 已有 goal，需要具体引理应用               |
| Loogle                 | 类型/模式               | 知道目标引理的形式（`?a + ?b = ?b + ?a`） |
| LeanSearch             | 英文描述                | "Cauchy criterion for convergent series"  |
| Moogle                 | 文本查询                | 神经网络语义搜索（best-effort）           |

SciLib-GRC21 — 课程框架内开发的自有服务，公共 endpoint：[scilibai.ru/grag](https://scilibai.ru/grag)（[API 文档](https://github.com/andkhalov/SciLib-GRC21/blob/main/docs/api.md)）。

### 网络

- **web_search(query)** — Brave Search API（如果设置了 `BRAVE_API_KEY`）或 DuckDuckGo（无需密钥，默认）
- **web_fetch(url)** — 下载 URL，HTML → 纯文本，截断

### PDF

- **pdf_download(url, dest_path)** — 二进制安全 PDF 下载，检查 `%PDF-` magic，从 URL 确定性生成文件名
- **pdf_info(path)** — 元数据、页数、大小
- **pdf_read(path, pages)** — 从指定页面提取文本（`"1-5,10"`）
- **pdf_search(path, query)** — Unicode 规范化搜索（"Gödel" 也能找到来自 dvips-PDF 的 `G¨odel`）

有助于在会话中快速了解科学论文。

### Artifact 缓存 + 元工具

重型工具（`web_search`、`web_fetch`、`pdf_read`、`pdf_search`、`lean_search_*`）在输出超过 800 字符时返回 **preview + artifact_id** 而非完整文本。完整内容存储在 MCP 进程内存中，随会话结束而消失。这节省 token — 3 KB 的 PDF 输出不会在后续所有 LLM 调用的历史中徘徊。

- **load_artifact(artifact_id)** — 当 preview 不足时获取完整内容。代理自行决定是否需要完整文本。
- **token_budget()** — 当前每日限制剩余量。代理每 5-7 个 tool call 自动调用。

**共 17 个 MCP 工具**（14 个领域 + 3 个元工具：`list_skills`、`load_skill`、`load_artifact`、`token_budget`）。

---

## 支持的模型

全部通过 Yandex AI Studio OpenAI-compatible endpoint：

| 模型                    | 上下文      | 角色                                                                                                                            |
| ----------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **DeepSeek-V3.2**       | 128k tokens | **默认（executor）** — 每 token 更便宜，基准测试 90% 成功率，复杂任务启用 thinking 模式                                         |
| **Qwen3-235B-A22B-FP8** | 256k tokens | **Planner（自动用于 `/plan`）** — 快速（约 20 tok/s），96.7% 成功率，代码编辑更稳定。单独启动：`-m qwen`                        |
| gpt-oss-120b            | 128k        | 仅用于无 tool chain 的一次性响应 — 与 Goose tool namespacing 不兼容（参见 [EXPERIMENT_REPORT.md](report/EXPERIMENT_REPORT.md)） |

模型切换：

```bash
ai4math               # 默认 — DeepSeek-V3.2 executor + Qwen planner
ai4math -m qwen       # 全部使用 Qwen（更贵，但编辑质量更高）
ai4math -m deepseek   # 显式 DeepSeek（无 planner 分离）
ai4math -m gptoss
```

Goose 不支持会话中切换模型 — `/exit` 然后 `ai4math -m <model>` 重新启动。

---

## 基准测试

在三个 Claude Code 级别任务上（创建文件、带 argparse 的编辑、带图表的 multi-step CSV 分析），每个 10 次试验：

```
                Task A          Task B          Task C         总计
qwen            10/10  10.4s    10/10  15.0s    9/10   24.9s   29/30  96.7%
deepseek        10/10  19.9s     7/10  28.4s   10/10   40.8s   27/30  90.0%
```

完整数字及统计（McNemar + Wilcoxon + Cohen's d + bootstrap CI）— [report/phase3_benchmark.tex](report/phase3_benchmark.tex)，方法 — [report/EXPERIMENT_REPORT.md](report/EXPERIMENT_REPORT.md)。

---

## 项目结构

```
AI4Math/
├── README.md                     本文件
├── LICENSE                       MIT
├── setup.sh / setup.py / setup.bat   安装程序 (Linux/跨平台/Windows)
├── requirements.txt              python 依赖
├── .env.example                  .env 模板
├── .gitignore
│
├── bin/
│   ├── ai4math                   shell shim (Linux/macOS)
│   ├── ai4math.py                跨平台 Python 入口点
│   ├── ai4math.bat               Windows cmd shim
│   └── ai4math-mcp               MCP 服务器的 stdio 启动器
│
├── src/
│   └── ai4math_mcp.py            统一 MCP 服务器 (13 个工具)
│
├── recipes/
│   └── ai4math.yaml              Goose recipe: 身份 + 扩展列表
│
├── cli/
│   └── wizard.py                 首次设置的交互式 wizard
│
├── scripts/
│   ├── install_lean.sh           可选的本地 Docker lean-checker
│   └── clean_room_test.sh        在 python:3.12-slim 中的可重现安装测试
│
├── .github/workflows/
│   └── test.yml                  CI: linux + macOS + Windows setup + Task A
│
├── docs/
│   └── ARCHITECTURE.md           工程概览
│
├── report/
│   ├── EXPERIMENT_REPORT.md      实验报告和基准测试方法
│   ├── phase3_benchmark.tex      LaTeX 摘要 (pdflatex 生成 PDF)
│   └── phase3_summary.json       原始基准测试结果
│
└── vendor/lean-checker/          (由 --with-lean-local 创建) 可选的本地 checker
```

---

## 项目指令文件 (AGENTS.md)

在用户项目中，AI4Math 在会话启动时自动读取一个上下文指令文件，优先级如下：

1. **`AGENTS.md`** — 开放的跨代理标准（[agentsmd.io](https://agentsmd.io/)，Goose、OpenAI 等使用）。**推荐格式。**
2. **`CLAUDE.md`** — 从 Claude Code 迁移的项目的后备。
3. **`.cursorrules`** — 来自 Cursor 的项目的后备。

读取 **第一个找到的**。在此文件中写入项目规则：代码风格、结构、禁止事项、检查清单、标准命令。模板示例：

```markdown
# My project

Python 3.12, pytest, ruff. Lean 4 + Mathlib.

## 风格

- 代码无注释，除 WHY 注释外
- 文件路径格式 `path/file.py:42`
- 文档用中文，代码用英文

## 命令

- 测试: `pytest -q`
- Lint: `ruff check .`
- Lean build: `lake build`

## 禁止事项

- 不提交 `.env`
- 最终证明中不使用 `sorry`
- 未经请求不创建新的 README.md
```

此文件的规则 **优先于** AI4Math 在具体项目规则方面的一般指令。但代理身份（中文、角色、三元组风格）保持系统级。

**为什么用 AGENTS.md 而不是 `AI4Math.md`？** 不引入另一个供应商特定文件。AI4Math 不是独立生态系统，而是 Yandex AI Studio 模型的便捷客户端。课程用户可以同时使用 Claude Code、Cursor、GitHub Copilot — 同一个 `AGENTS.md` 将在任何支持此标准的地方工作。

---

## FAQ

**问：这与 Claude Code 有何不同？**  
答：在 Yandex AI Studio 上使用开放权重模型运行，对拥有 Yandex 资助的研究人员免费。功能集类似：bash/text_editor/todo 工具、通过 Goose recipe 的个人环境、tool-first 行为。区别：(a) 没有 Anthropic 模型，(b) 没有 Anthropic 特定功能（其 MCP 市场、computer use），(c) 增加了 Lean 4 验证和通过 SciLib-GRC21 的 Mathlib 搜索。

**问：能否直接连接 OpenAI / Anthropic / DeepSeek API？**  
答：架构上可以 — `bin/ai4math.py` 包装器收集 Goose 的环境变量，Goose 接受任何 OpenAI-compatible endpoint。Wizard 目前只询问 Yandex；添加其他提供商 — 约 20 行代码在 `cli/wizard.py` 和 recipe 中。

**问：工作需要 Docker 吗？**  
答：不需要。默认 Lean 验证通过公共 SciLib-GRC21 endpoint（`https://scilibai.ru/grag`）进行 — 无需本地部署。Docker 仅当需要完全离线模式时通过 `./setup.sh --with-lean-local` 使用。

**问：为什么用 Goose 而不是 Aider / OpenHands？**  
答：Goose 原生支持 MCP 扩展（非常适合 `lean_check` 等自定义工具），代理本身不需要 Docker，仅通过环境变量配置无需配置文件，作为静态二进制文件安装。选择方法在 [EXPERIMENT_REPORT.md](report/EXPERIMENT_REPORT.md) 中有描述。

**问：什么是「推理 → 上下文 → 验证」三元组？**  
答：课程哲学框架：LLM 是三个支柱之一，不是唯一。验证（Lean）区分真理和似真。上下文（本体、日志、记忆）决定生成质量。研究环境本身就有价值，即使没有 CLI 代理。

**问：隐私 — 我的 Lean 代码在检查时去了哪里？**  
答：默认 — 到课程的公共 SciLib-GRC21 endpoint。对于敏感证明，使用 `./setup.sh --with-lean-local` 并将 `.env` 中的 `LEAN_CHECKER_URL` 切换为 `http://localhost:8888` — 代码保留在本地 Docker 容器中。

---

## 相关项目

- **[SciLib-GRC21](https://github.com/andkhalov/SciLib-GRC21)** — 课程自有服务：Lean 4 验证 + GraphRAG 前提检索，Lean 4.28 + Mathlib 4.26。AI4Math 用作主要 Lean 后端。[API 文档](https://github.com/andkhalov/SciLib-GRC21/blob/main/docs/api.md)。
- **[andkhalov/lean-checker](https://github.com/andkhalov/lean-checker)** — 简化版本地 Docker checker（Lean 4.24 + Mathlib 4.24），离线工作的可选替代方案。
- **[Goose](https://github.com/aaif-goose/goose)** — 开源 AI 代理框架，底层使用。
- **[Yandex AI Studio](https://yandex.cloud/ru/docs/ai-studio)** — 带开放权重模型的 OpenAI-compatible endpoint。
- **[Mathlib](https://leanprover-community.github.io/mathlib4_docs/)** — Lean 4 标准库。

---

## Peer Review Exercise — AI4Math Intensive YSDA 2026

在「AI4Math Intensive YSDA 2026」课程框架内，学生完成完整的科研工作周期：

> 问题表述 → 使用 AI4Math 撰写论文 → 在 OpenReview 上对同学工作进行双盲评审 → 作者回复 → 最终版本

**评审平台：** AI4Math Intensive YSDA 2026 在 [OpenReview](https://openreview.net) 上（venue 部署后链接将出现）。

**关键日期：**

| 日期         | 阶段                     |
| ------------ | ------------------------ |
| 2026年5月1日 | 摘要提交截止             |
| 2026年5月5日 | 论文提交截止（完整论文） |
| 5月5–12日    | 评审（双盲）             |
| 5月12日      | 评审公开，作者回复       |
| 5月16日      | 优秀工作最终展示         |

详情：[docs/submission_guide.md](docs/submission_guide.md)。

**为什么在课程中这样做。** Peer review 以人类验证的最强形式闭合了课程教学三元组 _(推理 → 上下文 → **验证**)_。学生经历「作者 → 评审者 → 编辑」的完整路径，在 ICML、NeurIPS、ICLR、MathAI 使用的同一平台上工作。

**格式：**

- 约 50 名参与者。每人是一篇论文的作者和三篇论文的评审者。
- 双盲提交，≥2 周准备个人资料、bidding 阶段、作者回复期。
- 决定：**Distinction / Solid / Revise** 而非 Accept/Reject（避免教学环境中的竞争框架）。
- 50×3 的匹配被视为课程的一个独立练习：课堂上展示随机分配 vs 基于 affinity 的贪心 vs 通过匈牙利算法 / min-cost flow 的最优分配，使用真实学生 bids。内置 OpenReview solver 是比较的参考点之一。

**评审表格：**

1. Summary（3–5 句用自己的话）
2. Strengths（≥2）
3. Weaknesses（≥2）
4. Questions for authors（1–5）
5. Soundness, Clarity, Novelty, Overall, Confidence — 1–5 分制
6. _Was any AI assistant used to write this review? If yes — describe._

最后一点将课程主题闭环到评审本身：学习「关于 AI 助手用于研究者」课程的学生诚实地记录他们在评审中的 AI 工作流。

**隐私。** Submissions 和 reviews 仅对作者、评审者和 PC 可见。公开披露 — 由学生在课程后自行决定。

---

## 许可证

MIT。参见 [LICENSE](LICENSE)。

产品在 YSDA「AI4Math Intensive YSDA 2026」课程框架内开发。
作者：A. P. Khalov, O. M. Ataeva — MIPT | Yandex | FRC CSC RAS。
