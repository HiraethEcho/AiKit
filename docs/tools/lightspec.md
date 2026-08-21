# LightSpec 使用流程

## 概述

LightSpec = 规范驱动开发框架。用 spec 定义"已实现什么"，用 change 记录"要改什么"，三段式推进。

## 三阶段流程

```
specs/          → 当前 truth，已实现的能力
changes/<id>/   → 提案进行中，待审核/待实现
changes/archive/ → 已完成归档
```

### 创建提案

场景：新能力 / 破坏性变更 / 架构调整

1. `lightspec list --specs` + `lightspec list` — 查现状，避冲突
2. `mkdir -p lightspec/changes/<verb-id>/specs/<capability>/`
3. 写三文件：
   - `proposal.md` — Why, What Changes, Impact
   - `tasks.md` — 实施清单 `- [ ]`
   - `specs/<cap>/spec.md` — delta，用 `## ADDED|MODIFIED|REMOVED Requirements`
4. `lightspec validate <id> --strict --no-interactive` — 必须通过
5. 用户批准前 **不实施**

### 实施变更

批准后按 tasks.md 顺序打卡，完成后标记 `- [x]`，更新 checklist。

### 归档

```bash
lightspec archive <change-id> [--yes|-y]
```

迁入 `archive/`，更新 `specs/`，再次 validate。

## 在 Agent 中调用（Skill 方式）

### 命令触发

| 输入 | 效果 |
|------|------|
| `/lightspec:proposal` | 走 proposal skill：探查 → 写提案 → validate |
| `/lightspec:apply` | 走 apply skill：读提案 → 实现代码 → 归档 |
| `/plan` | 切换到 planning mode 写提案 |

### 关键词自动触发

| 提到 | 自动调用 |
|------|---------|
| `proposal`/`change`/`spec` + `create`/`plan` | `lightspec-proposal` skill |
| "implement" / "apply" | `lightspec-apply` |

### taskflow 触发

```xml
<taskflow task="create a LightSpec proposal for adding user profile" agent="planner" />
```

### 多变更排队：lightspec-loop

- 逐个清上下文 → 实施 → 归档 → 下一个
- **不并行**
- 失败停等用户确认（重试/跳过/中止）

## 目录结构

```
lightspec/
├── specs/                         # 当前 truth
│   └── <capability>/
│       ├── spec.md                # 需求 + Scenario
│       └── design.md              # 技术决策
├── changes/                       # 提案
│   ├── <change-id>/
│   │   ├── proposal.md            # Why + What + Impact
│   │   ├── tasks.md               # 实施清单
│   │   ├── design.md              # 可选：架构决策
│   │   └── specs/<cap>/spec.md    # delta（ADDED/MODIFIED/REMOVED）
│   └── archive/                   # 已完成
```

## CLI 速查

```bash
lightspec list                          # 活跃变更
lightspec list --specs                  # 已有能力
lightspec show <id>                     # 查看详情
lightspec validate <id> --strict        # 严格校验（提案必做）
lightspec archive <id> [-y]             # 归档
lightspec show <id> --json --deltas-only  # 调试 delta 解析
lightspec init [path]                   # 初始化
lightspec update [path]                 # 更新指令文件
```

## 核心规则

- **Specs = truth，Changes = 提案** — 保持同步
- 每个 Requirement 必须有 `#### Scenario:`（4个#）
- 用 SHALL/MUST 写规范
- 变更 ID：kebab-case，动词开头（`add-`, `update-`, `refactor-`）
- 简单修（bug/typo/格式）**不走提案**，直接改
