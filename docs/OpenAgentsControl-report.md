# OpenAgentsControl 技术报告

> 分析对象：https://github.com/darrenhinde/OpenAgentsControl
> 本地源码：`/tmp/OpenAgentsControl`（`git clone --depth 1`）
> 版本：`0.7.1`

## 1. 项目概况

OpenAgentsControl（OAC）是基于 OpenCode 的 AI agent 框架。提供 markdown 定义的
agent、context 文件、skills、commands、tools、plugins，以及 CLI `oac` 用于安装和
管理这些组件。强调 plan-first、approval-gated 工作流。

解决的问题：
- 可复用、可安装的 AI agent/context/skill 定义
- 多 IDE 兼容（OpenCode → Cursor/Claude/Windsurf）
- 安装后跟踪文件变更、支持安全更新

## 2. 技术栈

| 层 | 选型 |
|---|---|
| 语言/运行时 | TypeScript / Bun |
| 包管理 | npm workspaces（`bun.lock`） |
| CLI 框架 | Commander.js v12 |
| 校验 | Zod v3 |
| 输出 | chalk + ora |
| 版本 | semver |
| 测试 | bun test |

monorepo packages：
- `packages/cli` — CLI 本体
- `packages/compatibility-layer` — IDE 适配器
- `packages/plugin-abilities` — 插件能力
- `evals/framework` — 评估框架

## 3. 仓库结构

```
OpenAgentsControl/
  package.json            # workspace 定义, bin: oac
  registry.json           # 组件注册表（106KB）
  .opencode/              # 被部署的资源
    agent/                # agent markdown（含 frontmatter）
    command/              # 命令
    context/              # 上下文（294 文件）
    skill/                # skills
    tool/                 # 工具
    plugin/               # 插件
    profiles/             # profile 定义
    config.json           # 默认 config
    opencode.json         # opencode 配置
  packages/cli/src/
    index.ts
    commands/{init,add,apply,update,list,status,doctor}.ts
    lib/{installer,manifest,registry,bundled,sha256,ide-detect,version}.ts
    ui/{logger,spinner}.ts
  packages/compatibility-layer/src/
    adapters/{Cursor,Claude,Windsurf}Adapter.ts
  install.sh              # curl 安装脚本（无 symlink）
```

## 4. 核心概念

### 4.1 资源定义

Agent 是 markdown + YAML frontmatter，例
`.opencode/agent/core/openagent.md`：

```markdown
---
name: OpenAgent
description: "Universal agent..."
mode: primary
temperature: 0.2
permission:
  question: "allow"
  bash:
    "*": "ask"
    "rm -rf *": "ask"
    "sudo *": "deny"
  edit:
    "**/*.env*": "deny"
---
```

### 4.2 注册表 registry.json

结构（`version 2.0.0`）：

```json
{
  "version": "2.0.0",
  "schema_version": "2.0.0",
  "repository": "https://github.com/darrenhinde/OpenAgentsControl",
  "categories": {
    "essential": "...",
    "standard": "...",
    "extended": "...",
    "specialized": "...",
    "meta": "..."
  },
  "components": {
    "agents": [ ... ],
    "subagents": [ ... ],
    "skills": [ ... ],
    "commands": [ ... ],
    "contexts": [ ... ],
    "tools": [ ... ],
    "plugins": [ ... ],
    "configs": [ ... ]
  },
  "profiles": {
    "essential": {
      "name": "Essential (Minimal)",
      "description": "...",
      "components": ["agent:openagent", "skill:task-management", ...]
    },
    "developer": { ... },
    "business": { ... },
    "full": { ... },
    "advanced": { ... }
  },
  "metadata": { ... },
  "subagents": { ... }
}
```

组件字段（`components.agents[]` 示例）：
`id`, `name`, `type`, `path`, `description`, `tags`, `dependencies`
（依赖格式 `subagent:domain-analyzer`、`agent:xxx`），`category`。

组件引用格式：`{type}:{id}`，如 `agent:openagent`、`context:essential-patterns`。

### 4.3 安装清单 .oac/manifest.json

Zod schema（`packages/cli/src/lib/manifest.ts`）：

```ts
const MANIFEST_RELATIVE_PATH = '.oac/manifest.json';
const MANIFEST_VERSION = '1';

const ManifestFileTypeSchema = z.enum([
  'agent', 'context', 'skill', 'config', 'other',
]);

const FileEntrySchema = z.object({
  sha256: z.string(),
  type: ManifestFileTypeSchema,
  // ...
});
```

每个已安装文件记录 SHA256，用于 `oac update` 判断用户是否改过。

## 5. 安装与部署机制

### 5.1 CLI 命令

| 命令 | 作用 |
|---|---|
| `oac init` | 初始化项目 |
| `oac add <component>` | 安装单个组件 |
| `oac apply [cursor|claude|windsurf|--all]` | 生成 IDE 规则文件 |
| `oac update` | 按 manifest 更新 |
| `oac list` | 列出可用组件 |
| `oac status` | 查看安装状态/变更 |
| `oac doctor` | 诊断 |

### 5.2 安装策略

- **复制文件，不用 symlink**。`packages/cli/src/lib/installer.ts` 从 npm 包内
  bundled 文件复制到项目。
- 来源：npm 包根目录（`getBundledFilePath`）；目标：`<projectRoot>`。
- 分类：`packages/cli/src/lib/bundled.ts` 按文件路径前缀分类
  （`.opencode/agent/` → `agent` 等）。
- 记录：写入 `.oac/manifest.json`（SHA256 + type + 路径）。

### 5.3 冲突与更新

`installer.ts` 决策逻辑：
- 新文件 → install
- 已跟踪且 hash 未变（用户未改）→ update
- 已跟踪但 hash 变了（用户改过）→ skip
- `--yolo` → 备份（backup）后覆盖用户修改
- bundle 中已移除的文件 → 从 manifest 移除（untrack）

备份：`backupFile`（`installer.ts`）。

### 5.4 oac apply 适配器

`packages/cli/src/commands/apply.ts`：
- 读 `.opencode/agent/` 定义
- `CursorAdapter` → `.cursorrules`
- `ClaudeAdapter` → `CLAUDE.md`
- `WindsurfAdapter` → `.windsurfrules`
- 大小阈值：cursor `warn 80KB / limit 100KB`
- 目标已存在 → `backupIfExists`（时间戳备份）

### 5.5 install.sh

`install.sh`：curl 从 GitHub raw 下载文件，交互式 profile 菜单，冲突策略可选。
无 symlink。

## 6. 与 AiKit 对比

| 维度 | OpenAgentsControl | AiKit（当前设计） |
|---|---|---|
| 语言/运行时 | TypeScript + Bun | Python 3 stdlib + Lua 5.4 |
| 数据源 | registry.json（JSON） | manifest.toml / preset.toml / agents.toml |
| 资源定义 | markdown + YAML frontmatter | 目录/文件，TOML 描述 |
| 部署方式 | 复制文件 | Phase 1 symlink（绝对路径）；Phase 2 写 settings.json |
| 跟踪 | `.oac/manifest.json` SHA256 | 无 |
| 更新 | `oac update` 检测修改 | 不做 |
| 冲突 | skip / backup / `--yolo` | Phase 1 逐文件 skip/overwrite/backup；Phase 2 备份覆盖 |
| 预设 | registry profiles（5 档） | preset.toml |
| 多 agent | OpenCode 生态 + 子代理 | MVP 仅 pi |
| 适配层 | `oac apply` → Cursor/Claude/Windsurf | 无（预留 phase 2） |
| 目标 | project / global | project / global |

相同点：
- 仓库/包作为唯一内容源
- project/global 双目标
- 预设 profile 概念
- 预览、dry-run、冲突询问
- 备份带时间戳

## 7. 可借鉴点

1. **SHA256 manifest + update 命令**：AiKit 可加 `deploy.py status/update`，
   检测链接目标是否被用户改过，未改则更新，改过则 skip，`--yolo` 备份覆盖。
2. **adapter 模式**：`oac apply` 把规范 agent 定义转成 `.cursorrules`/`CLAUDE.md`；
   AiKit phase 2 扩展 reasonix/opencode 时可复用此模式。
3. **doctor/status/list 命令**：验证工具安装状态、显示组件清单、诊断环境。
4. **profile 元数据**：registry profile 有 name/description/badge/组件计数，
   TUI preset 界面可显示描述+数量。
5. **按路径前缀分类**：`bundled.ts` 用路径前缀判类型；AiKit 可用
   `.agents/{type}/` 天然对应。
6. **懒加载命令模块**：CLI 启动快，命令按需 import。

## 8. 参考

- 仓库：https://github.com/darrenhinde/OpenAgentsControl
- 关键文件：
  - `package.json`
  - `registry.json`
  - `.opencode/config.json`
  - `.opencode/agent/core/openagent.md`
  - `packages/cli/src/lib/installer.ts`
  - `packages/cli/src/lib/manifest.ts`
  - `packages/cli/src/lib/registry.ts`
  - `packages/cli/src/commands/apply.ts`
  - `install.sh`
