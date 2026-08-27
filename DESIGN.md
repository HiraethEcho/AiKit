# DESIGN


## Layout

```
AiKit/
  README.md  AGENTS.md  DESIGN.md
  agents/       coding agent configs
  base/         base profile (contents chosen manually)
  persona/      main agents / custom system prompts
  codekit/      轻 workflow (lite 全套, 文件驱动)
  speckit/     重 workflow (SDD/lightspec)
  devkit/       code-extra 工具池 (不进 workflow preset)
  extra/        extra 工具 (文献/ocr/翻译/格式)
  paperkit/     paper/notes writing kit
  reviewkit/    review kit (论文审稿)
  researchkit/  research assistance kit
  docs/         documents
  opt/          git submodules
```

## Kit structure

Under each `*kit/`: `agents/`, `skills/`, `commands/`.

## Deploy

### 架构总览

```
manifest.toml ─┐
*/manifest.toml┤
*/preset.toml ─┼─(gen.py)──> manifest.lua / preset.lua / agents.lua ──> deploy.lua
harness/agents.toml ┘   manifest.json / preset.json / agents.json (shell: jq 读 json)
       │
       └──(deploy.py, tomllib)──> 两阶段部署（Python 版）
```

- TOML 文件（根 + kit 级）为唯一真实来源，人工维护。
- `deploy.py`：Python 3 标准库（`tomllib` + `curses`），完整 TUI；含 `gen-lua`。
- 生成三个 Lua 文件，提交到仓库；`deploy.lua` `dofile` 加载。
- 部署分两阶段：Phase 1 通用资源链接；Phase 2 coding agent 配置写入。
- 子命令：`list` / `doctor` / `scan` / `gen` / `agents`；`--yolo` 非交互冲突策略。

### 设计原则

1. **数据与逻辑分离**：新增资源/预设/插件只改 TOML，不改代码。
2. **零依赖优先**：Python 标准库；Lua 标准库 + POSIX 命令。
3. **Phase 1 用链接**：绝对路径 symlink，仓库更新即时可见。
4. **Phase 2 用写入**：settings.json 是 agent 运行时配置，需落为真实文件。
5. **可预期**：先预览后执行；Phase 1 冲突逐文件询问，Phase 2 备份后覆盖。

### 数据设计

`manifest.toml`：

- 根清单：`includes` 引用各 `*/manifest.toml`。
- kit 清单按类型分组：`[[skills]]` `[[agents]]` `[[commands]]` `[[mcp]]`。
- 字段：`id`（类型内唯一）、`category`（仅 UI）、`tags`、`path`、`description`。
- 合并后 id 加 kit 前缀：`paperkit:theorem-proof-writing`。
- 目标推导：`.agents/{type}/{basename(path)}`。

`preset.toml`：

- 根：`includes` 引用各 `*/preset.toml`；根内联预设做跨 kit。
- kit 级：`[[preset]]`，作用域默认本 kit；省略 `kits` 且无逐类引用 = 整 kit。
- 合并后 preset id 加 kit 前缀：`paperkit:full`。

`harness/agents.toml`（唯一真源, 无 extends）:

- `[pi]`：`template`（settings.example.json 路径）、`project_target`、`global_target`。
- `[pi]`：`template`（settings.example.json 路径）、`project_target`、`global_target`。
- `[[pi.packages]]`：`type = "local"`（`path` 仓库相对 → 部署时绝对路径）| `type = "npm"`（`name` → `npm:<name>`）。
- `[pi.skills] presets = ["full"]`：根 preset（codekit+speckit），展开为 `kit/name`。
- `[pi.commands] dirs`：→ pi `prompts` 绝对目录。
- `[pi.mcp] names`：→ pi `mcp` 名称。
- `harness/agents/pi/settings.example.json`：模板，packages/skills/prompts/mcp 为空数组，脚本填充。

> 不写任何部署状态文件（无 `deploy-state.json`）；`status` 命令已移除。

### 多格式生成

`gen.py --format lua|json|yaml|all`（默认 all）：

- 单一数据源 TOML → `build_data()` 合并 → 多格式序列化。
- `lua`：Lua 表，`deploy.lua` dofile。
- `json`：给人/jq/node。
- `sh`：bash `source`；`RESOURCES`/`PRESETS` 数组（`|` 分隔字段）+ pi 变量。
- 原子写入，生成失败不破坏旧文件。

扩展新格式只需加一个 writer，读取逻辑不变。

### 两阶段流程

```
start
 ├─ 目标: project(path) | global(~)
 ├─ Phase 1 (可跳过):
 │    preset 多选 → extra 追加/删减 → 预览 → symlink
 └─ Phase 2 (可跳过):
      agent: pi? → plugins 多选 → 预览 packages 变更 → 写 settings.json
```

### Python 版模块

- `load_manifest()` / `load_presets()` / `render_pi_settings()`：TOML 读取 + 校验。
- `ui_*`：目标选择、preset 多选、资源多选（按类型分组，显示 category/tags）、
  预览、冲突询问。
- `plan_phase1()`：计算 (src, dst)，标注 missing/conflict。
- `apply_phase1()`：mkdir、冲突处理、symlink、更新 state。
- `cmd_list()` / `cmd_doctor()` / `cmd_scan()` / `cmd_agents()`：子命令。
- `render_pi_settings()`：读模板 JSON，填充 packages（path→绝对, npm→前缀）/skills/prompts/mcp。
- `gen()`：manifest/preset/agents → lua + json + yaml（yaml 仅可读 sidecar, 无脚本消费）。

### Lua 版模块

- `load_data()`：`dofile` 三个 Lua 文件。
- `term`：`stty` raw + ANSI。
- `menu_pick` / `menu_multi` / `ask_yesno`：数字菜单。
- `plan_phase1` / `apply_phase1`：逻辑同 Python（含 state、`--yolo`）。
- `cmd_list` / `cmd_doctor`：从简实现。
- `build_settings` / `apply_phase2`：后续实现。
- POSIX 封装：`mkdir -p`、`ln -s`、`test -e/-L`、`readlink`、`mv`。

### 部署算法

Phase 1：

```
for resource in selected:
    src = repo_root / resource.path
    dst = target_root / ".agents" / type / basename(resource.path)
    if src missing: mark ERROR
    elif dst missing: plan SYMLINK
    elif dst symlink and realpath(dst)==realpath(src): plan SKIP
    else: ask skip/overwrite/backup (--yolo: auto backup)
preview → apply
```

Phase 2（`deploy.py agents`）：

```
preview:                deploy.py agents
project .pi/settings.json:  deploy.py agents --project <path>
global  ~/.pi/agent/settings.json: deploy.py agents --global

读取 harness/agents.toml[pi] + settings.example.json
packages: path → <repo-root>/<path>
          npm  → "npm:<name>"
skills:   preset 展开 (manifest) → "kit/name"
prompts:  commands dir → <repo-root>/<dir>
mcp:      名称列表
目标存在: 备份 .bak 后覆盖
```

### 冲突与安全

- Phase 1：逐文件 `skip` / `overwrite` / `backup`；非空目录 overwrite 二次确认。
- `--yolo`：Phase 1 冲突自动 backup 覆盖，不询问。
- Phase 2：目标存在直接备份后覆盖（不合并旧文件键）。
- 备份用 `rename`，时间戳 `YYYYmmdd-HHMMSS`。
- 所有 symlink 源为绝对路径；settings.json 为写入。

### 路径规则

- `repo_root`：脚本所在位置解析。
- Phase 1 目标必须相对路径，拒绝以 `/` 开头。
- link 名 = `basename(path)`，不引入 id，避免重名由资源源路径保证。
- local 插件 `~` 路径 = `~` + `repo_root.relative_to(home)` + `plugin.path`；
  repo 不在 home 下时报错提示。

### 错误处理

- TOML 解析失败：退出，不部署。
- 源缺失：预览标错，跳过。
- 模板缺失：跳过 phase 2。
- symlink/写文件失败：记录错误，继续后续，最后非零退出。

### 测试策略

- TOML 解析 + `gen-lua` 一致性。
- Phase 1 临时项目：链接、冲突三选项、`--yolo`、backup 命名、already-up-to-date。
- `list` / `doctor` 输出正确。
- Phase 2 临时 home：settings.json 生成、plugins local/npm 格式、去重、备份覆盖。
- Python/Lua 对照测试 `plan_phase1` 结果一致。

### 后续扩展点

- `agents.toml` 增加 `[reasonix]` / `[opencode]`，每个 agent 自带 settings 模板、目标路径、plugins。
- 若需合并已有 settings.json（而非备份覆盖），扩展 `build_settings` 策略。
- Windows 支持需替换 symlink/POSIX 层。
