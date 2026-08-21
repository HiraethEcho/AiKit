# SPEC

## Deploy

### 背景与目标

AiKit 仓库（当前为 scaffold）是唯一真实来源，存放各类 AI agent 资源：
skills、agents、commands、mcp、plugins 等。

提供交互式 CLI 部署工具，把资源部署到目标项目或全局 `~`。部署分两阶段：

1. **Phase 1 – 通用资源**：符号链接（绝对路径）到 `.agents/`。
2. **Phase 2 – 配置 coding agent**：MVP 只做 pi，写 `settings.json`（非链接）。

### 数据文件（三个 TOML，人类可读写）

| 文件 | 职责 |
|---|---|
| `deploy/manifest.toml` | 根清单：`includes` 引用各 kit 的 `*/manifest.toml` |
| `*/manifest.toml` | kit 级资源注册表：skills / agents / commands / mcp |
| `deploy/preset.toml` | 根预设：`includes` 引用各 kit 的 `*/preset.toml`；可加根内联跨 kit 预设 |
| `deploy/agents.toml` | Coding agent 配置（phase 2）：pi 设置模板 + plugins |

这些 TOML 共同构成唯一真实来源。后续支持 reasonix/opencode 时扩展 `agents.toml`。

### 范围（MVP）

- Phase 1 类型：`skills`、`agents`、`commands`、`mcp`。
- Phase 2 agent：仅 pi。
- 三套实现：
  1. `deploy/deploy.py`：Python 3 标准库（`tomllib` + `curses`），完整 TUI。
  2. `deploy/deploy.lua`：Lua 5.4+ 脚本，核心功能对等，TUI 控件从简（数字菜单 + y/n）。
  3. `deploy/deploy.sh`：bash + `jq`/`fzf`，读生成的 JSON，fzf 多选。
- Lua/shell 版读取生成文件（见 D-2），不直接解析 TOML。

### 非目标

- 不做 JSON 合并（现有 settings.json 直接备份后覆盖，不保留旧键）。
- 不做卸载/uninstall、不做 watch 同步。
- 不支持 Windows。
- 不实现 reasonix/opencode 配置逻辑。

### 功能需求

#### D-1 `manifest.toml`（Phase 1 资源）

- 根 `deploy/manifest.toml` 用 `includes = ["paperkit/manifest.toml", ...]` 引用各 kit 清单（include 相对仓库根）。
- kit 级 `*/manifest.toml` 按类型分组：`[[skills]]`、`[[agents]]`、`[[commands]]`、`[[mcp]]`。
- 合并后资源 id 为 `<kit名>:<原id>`（kit 前缀）；根清单内联资源 id 保持原样。
- 每个资源字段：
  - `id`：类型内唯一，用于 preset 引用。
  - `category`：UI 分组/筛选用，不进部署路径。
  - `tags`：字符串数组。
  - `path`：源路径，相对仓库根目录（文件或目录）。
  - `description`：描述。
- 部署落点自动推导：`.agents/{type}/{basename(path)}`。
  - `type` = skills → `.agents/skills/`
  - `type` = agents → `.agents/agents/`
  - `type` = commands → `.agents/commands/`
  - `type` = mcp → `.agents/mcp/`
- 项目与全局落点规则相同。

#### D-2 `preset.toml`（Phase 1 预设）

- 根 `deploy/preset.toml` 用 `includes = ["paperkit/preset.toml", ...]` 引用 kit 预设。
- kit 级 `*/preset.toml`：`[[preset]]`，作用域默认本 kit。
- `[[preset]]` 字段：`id`、`description`、`kits`（可选，整 kit）、`skills`、`agents`、`commands`、`mcp`。
- 省略 `kits` 且无逐类引用 = 整 kit。
- 合并后 preset id 为 `<kit名>:<preset id>`；根内联 preset id 保持原样。

#### D-3 `agents.toml`（Phase 2 agent 配置）

- 位置：`deploy/agents.toml`。
- 每个 agent 一个 section。MVP 只有 `[pi]`：
  - `settings`：源模板路径，`agents/pi/settings.json`。
  - `project_target`：`.pi/settings.json`。
  - `global_target`：`.pi/agent/settings.json`。
- `[[pi.plugins]]`：可选插件列表。
  - `path`：插件路径或包名。
  - `type`：`local`（本地目录，路径相对仓库根）或 `npm`（npm 包名）。
- 写入 settings.json 时：
  - 读模板 JSON。
  - `packages` 数组合并选中插件。
  - local → `~` + 仓库相对 home 路径，如 `~/AiKit/agents/pi/extensions/pi-toolkit`。
  - npm → `npm:` + 包名，如 `npm:pi-deepseek-search`。
  - 两种类型都保留，去重。
  - 若模板无 `packages`，创建空数组。

#### D-4 Python 版 `deploy.py`

- 仅 Python 3 标准库。
- TOML 读取用 `tomllib`（Python 3.11+）。
- TUI 用 `curses`。
- 子命令：
  - `deploy/deploy.py`：启动 TUI。
  - `deploy/deploy.py gen-lua`：生成 Lua 数据文件（见 D-5）。
  - `deploy/deploy.py list`：列出 manifest 全部资源，按类型分组，显示 id/category/tags/description；支持 `--cat`/`--tag`。
  - `deploy/deploy.py doctor`：校验 TOML 可解析、源路径存在、phase 2 模板可读。
  - `deploy/deploy.py scan [--write]`：对比文件系统与 manifest。
  - `deploy/deploy.py --help`。
- `--yolo`：非交互冲突策略，phase 1 冲突自动备份后覆盖（不逐文件询问）。
- TUI 选择流程：preset 多选 → 按 `skills` / `agents` / `commands` / `mcp` 分阶段多选。
- TUI 支持 `/` 搜索过滤（支持 `cat:`/`tag:`）；资源行显示 category、tags、description。
- 预览界面 `ENTER` 确认部署。
- 不写部署状态文件（无 `deploy-state.json`）。

#### D-5 数据文件生成（多格式）

- `deploy/deploy.py gen --format lua|json|sh|all` 从 TOML 聚合生成多格式文件
  （默认 `all`）。
- `lua`：`manifest.lua` / `preset.lua` / `agents.lua`（Lua 版 `dofile` 加载）。
- `json`：`manifest.json` / `preset.json` / `agents.json`（给 jq/node 等）。
- `sh`：`manifest.sh`（bash `source` 直接读取，`RESOURCES`/`PRESETS` 数组 + pi 变量）。
- 生成文件提交到仓库；头部注释 `GENERATED FROM <src> by deploy/deploy.py gen. DO NOT EDIT.`
  （JSON 无注释）。
- 原子写入（临时文件后 replace）；生成失败不覆盖旧文件。
- `deploy.py gen-lua` 为 `gen --format lua` 别名。

#### D-6 Lua 版 `deploy.lua`

- Lua 5.4+，核心功能与 Python 对等。
- 读取 `manifest.lua`、`preset.lua`、`agents.lua`。
- 交互从简：数字菜单、y/n 确认、行输入。
- 文件系统操作走 POSIX 命令：`mkdir -p`、`ln -s`、`test`、`readlink`、`mv`。

#### D-7 目标选择

- 每次运行先选：
  1. **project**：输入项目路径（`.` 允许），必须存在且为目录。
  2. **global**：目标根 = `~`。
- 两阶段共用该目标。

#### D-8 Phase 1 选择流程

1. 选 preset（可跳过）：
   - 从 `preset.toml` 多选预设，展开为资源 id 集合。
2. 追加 extra：
   - 浏览 `manifest.toml` 全部资源，按类型分组显示，展示 id/category/tags/description。
   - 可继续勾选追加，可取消已选。
3. 完全自定义：
   - 不选 preset，直接进入 extra 多选。
4. 最终选择结果去重后预览。

#### D-9 Phase 1 部署

- 符号链接，源为绝对路径：`<repo_root>/<resource.path>`。
- 目标：`<root>/.agents/{type}/{basename(path)}`。
- 父目录自动创建。
- 源不存在：预览标错，跳过，不中断。
- 冲突逐文件询问：`s) skip` / `o) overwrite` / `b) backup`。
  - overwrite 非空目录需二次确认。
  - backup 重命名为 `<target>.bak-YYYYmmdd-HHMMSS`。
- `--yolo`：跳过询问，冲突自动 backup 后覆盖。
- 已有符号链接且 `realpath == 源`：自动跳过（已是最新）。

#### D-10 Phase 2 配置 pi

- 可跳过。
- 读 `agents.toml` `[pi]`，交互选择是否启用 pi、选择哪些 `[[pi.plugins]]`。
- 生成 settings.json：
  - 读模板 `agents/pi/settings.json`。
  - 合并选中插件到 `packages`（去重，两种类型都保留）。
- 写入（非链接）：
  - project → `<project>/.pi/settings.json`
  - global → `~/.pi/agent/settings.json`
- 目标已存在：备份为 `<target>.bak-YYYYmmdd-HHMMSS` 后覆盖。
- 模板不存在：报错并跳过 phase 2。

### 交互流程

1. 选目标：project / global。
2. Phase 1（可跳过）：
   - preset 多选 → extra 追加 → 预览 → 确认 → 部署链接。
3. Phase 2（可跳过）：
   - 选 agent（MVP 仅 pi）→ 选 plugins → 预览 settings.json 变更 → 写文件。

Python 版用 curses 多选/确认；Lua 版用数字菜单 + y/n，流程一致。

### `manifest.toml` 示例

```toml
# manifest.toml
version = "1.0"

[[skills]]
id = "grill-me"
category = "general"
tags = ["ask", "review"]
path = "base/skills/grill-me"
description = "ask user questions"

[[agents]]
id = "code-reviewer"
category = "code"
tags = ["review"]
path = "base/agents/code-reviewer"
description = "review code"

[[commands]]
id = "handoff"
category = "general"
tags = ["handoff"]
path = "base/commands/handoff"
description = "handoff notes"

[[mcp]]
id = "search"
category = "web"
tags = ["search"]
path = "base/mcp/search"
description = "web search mcp"
```

### `preset.toml` 示例（kit 级）

```toml
# paperkit/preset.toml
version = "1.0"

[[preset]]
id = "full"
description = "paperkit 全套"

[[preset]]
id = "writers"
description = "写作相关"
skills = ["theorem-proof-writing", "paper-skeleton"]
agents = ["theorem-writer", "formatter"]
commands = ["outline-gen", "proof-write"]
```

根 `preset.toml`（可选）用 `kits` 或 `<kit>:<id>` 跨 kit。

### `agents.toml` 示例

```toml
# agents.toml
version = "1.0"

[pi]
settings = "agents/pi/settings.json"
project_target = ".pi/settings.json"
global_target = ".pi/agent/settings.json"

[[pi.plugins]]
path = "agents/pi/extensions/pi-toolkit"
type = "local"

[[pi.plugins]]
path = "pi-deepseek-search"
type = "npm"
```

### 仓库文件布局（新增）

```
AiKit/
  deploy/
    manifest.toml   # 根清单：includes（人工维护）
    preset.toml     # 根预设：includes（人工维护）
    agents.toml     # phase 2 agent 配置 + plugins（人工维护）
    manifest.lua    # 生成
    preset.lua      # 生成
    agents.lua      # 生成
    deploy.py       # Python 版 + gen-lua/gen
    deploy.lua      # Lua 版
  */manifest.toml   # kit 级资源清单（人工维护）
  */preset.toml     # kit 级预设（人工维护）
```

### 验收标准

- [ ] 三个 TOML 可被 `tomllib` 解析。- [ ] `deploy/deploy.py gen --format all` 生成 lua/json/sh 三套文件，lua `dofile`、json 可解析、sh 可 `source` 且数据一致。
- [ ] `deploy/deploy.py doctor/list/scan` 子命令可用。
- [ ] 部署不写状态文件。
- [ ] `--yolo` 冲突自动备份覆盖。
- [ ] Phase 1：project/global、preset/自定义/追加、预览、冲突三选项、绝对路径链接。
- [ ] link 名 = `basename(path)`，落点 `.agents/{type}/{basename}`。
- [ ] `category` 不进入路径。
- [ ] Phase 2：读 `agents/pi/settings.json`，合并 plugins，`packages` 去重，local `~/...` + npm `npm:...` 都保留。
- [ ] settings.json 已存在时备份后覆盖。
- [ ] 两阶段均可跳过。
- [ ] 缺失源/模板报错并跳过对应阶段。

### 任务计划

1. 编写三个 TOML 骨架。
2. 实现 `deploy.py`：TOML 读取、curses TUI、两阶段流程、部署执行、冲突处理、状态文件、`--yolo`。
3. 实现 `deploy/deploy.py gen`（lua/json/sh）+ `list` + `doctor` + `scan`。
4. 实现 `deploy.lua`（phase 1 优先）。
5. 端到端测试（临时项目目录）。
6. 更新 `README.md` / `AGENTS.md`。
7. Phase 2 settings 写入（pi）后续实现。
