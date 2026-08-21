# PPI — Pi Profile Manager

`pi-profiles` 是 pi 的 profile 管理器（类似 opencode 的 `ocx`）。在不同配置集（settings、extensions、skills、themes、auth）之间一键切换。

- npm: [`pi-profiles`](https://www.npmjs.com/package/pi-profiles)
- GitHub: [`chaychoong/pi-profiles`](https://github.com/chaychoong/pi-profiles)
- CLI: `ppi`
- Latest: v0.1.1 (2026-03-13)

## 工作原理

Pi 通过 `PI_CODING_AGENT_DIR` 环境变量解析配置目录。`ppi` 在 `~/.pi/profiles/<name>/` 下创建和管理独立的 profile 目录，启动 pi 时将该变量指向所选 profile。Pi 本身不感知被包装 — TUI 直接通过继承的 stdio 渲染。

## Install

```bash
npm install -g pi-profiles
```

依赖：pi 和 Node.js（安装 pi 时已具备）。

## CLI

### 创建 profile

```bash
ppi create work                         # 新建空 profile
ppi create personal --own-auth          # 独立 API key（不共享全局 auth）
ppi create personal --own-models        # 独立模型配置
ppi create work --from-base             # 从当前 ~/.pi/agent 复制
ppi create experiments --from work      # 从已有 profile 复制
```

### 查看 profile

```bash
ppi list                    # 列出所有 profile，标注默认
```

### 设置默认

```bash
ppi set-default work        # 无参数运行 ppi 时启动此 profile
```

### 启动 pi

```bash
ppi use work                              # 以 work profile 启动 pi
ppi                                       # 启动默认 profile
ppi use work -- -p "fix the bug"          # -- 之后传递 pi 参数
ppi use work -- --model claude-sonnet-4   # 指定模型
```

### 删除 profile

```bash
ppi delete experiments       # 交互确认
ppi delete experiments --force  # 跳过确认
```

## Profile 目录结构

每个 profile 是一个完整的 pi agentDir：

```
~/.pi/profiles/work/
├── settings.json                     # profile 独立配置
├── auth.json → ~/.pi/agent/auth.json     # symlink 共享全局认证（默认）
├── models.json → ~/.pi/agent/models.json # symlink 共享全局模型（默认）
├── extensions/                       # profile 独立扩展
├── skills/                           # profile 独立技能
├── tools/                            # profile 独立工具
├── prompts/                          # profile 独立提示词模板
├── themes/                           # profile 独立主题
└── sessions/                         # profile 独立会话
```

**认证与模型共享（默认）：** `auth.json` 和 `models.json` symlink 到 `~/.pi/agent/`，一次 `pi login` 全 profile 通用。创建时加 `--own-auth` / `--own-models` 可独立管理。

## 与 `ocx` 的对比

|            | ocx (opencode)                                 | ppi (pi)                                             |
| ---------- | ---------------------------------------------- | ---------------------------------------------------- |
| 配置位置   | `~/.config/opencode/profiles/<name>/`          | `~/.pi/profiles/<name>/`                             |
| 切换方式   | `ocx profile use <name>` + `ocx oc`            | `ppi use <name>`                                     |
| 原生支持   | 通过 `OPENCODE_CONFIG_DIR` 或 profile 深度合并 | 通过 `PI_CODING_AGENT_DIR`（ppi 设置该变量）         |
| 配置格式   | `opencode.jsonc` + `ocx.jsonc`                 | `settings.json`（pi settings 格式）                  |
| 隔离粒度   | 插件、权限、模型、MCP                          | settings、extensions、skills、themes、auth、sessions |
| npm 包管理 | `ocx add npm:<pkg>`                            | `pi install npm:<pkg>`（pi 内置）                    |

## 程序化使用

```typescript
import { ProfileManager } from "pi-profiles";

const pm = new ProfileManager();
const profile = pm.resolve("work");
console.log(profile.path); // ~/.pi/profiles/work

// 结合 pi SDK 使用
import { createAgentSession } from "@mariozechner/pi-coding-agent";
const { session } = await createAgentSession({ agentDir: profile.path });
```

## 设计目标

- **完全隔离** — 每个 profile 是独立的 agentDir
- **零 pi 修改** — 仅通过已文档化的 `PI_CODING_AGENT_DIR` 实现
- **零运行时依赖** — 纯 Node.js 文件系统操作
- **Library + CLI** — `ProfileManager` 可被其他程序调用
- **路径可预测** — `~/.pi/profiles/<name>/` 约定，文件系统即 registry

## 与本仓库的关系

本仓库的 `configs/*.conf` 定义 profile 变量，`scripts/setup.sh` 负责部署。pi profile 通过以下方式集成：

```
configs/code.conf  ──→  scripts/setup.sh  ──→  ppi create code --from-base
                          (读取 pi_extensions)    (创建 profile 目录)
                                              ──→  symlink lib/pi/ → ~/.pi/profiles/code/extensions/
                                              ──→  pi install npm:<ext>
```

目前 `setup.sh` 尚未直接调用 `ppi`（仅输出安装指引）。后续可增强自动创建 pi profile。

## 参见

- `pi.md` — pi 完整配置参考
- `ocx.md` — opencode profile 管理器
- [pi-profiles GitHub](https://github.com/chaychoong/pi-profiles)
- [pi.dev](https://pi.dev)
