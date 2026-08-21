<!-- LIGHTSPEC:START -->
# LightSpec Instructions

IF (and only if) the user message:
  - Mentions planning or proposals (words like proposal, spec, change, plan)
  - Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
  - Sounds ambiguous and you need the authoritative spec before coding

THEN: 
Do the following:
- [ ] When the user approves the plan and terminates planning mode, run `lightspec-apply` to implement the approved proposal.
- [ ] Run `lightspec-proposal`.
- [ ] Do not implement the feature until the proposal is approved by the user. Implementation MUST be operated using `lightspec-apply` to ensure the implementation is properly tracked and documented.
- [ ] If unsure which skill to run, list installed skills.

Keep this managed block so 'lightspec update' can refresh the instructions.

<!-- LIGHTSPEC:END -->

## SDD Workflow

项目采用 sdd（Spec-Driven Development），权威文档：`lightspec/AGENTS.md`（lightspec 三阶段 + sdd 增强层）。

- 提案 → `lightspec-proposal` 脚手架；实现 → `lightspec-apply`；归档 → `lightspec-archive`
- 项目意图源：`SPEC.md`；路线图：`PLAN.md`；可选设计：`DESIGN.md`

# Goal of this project

Write pi extensions

## agents stuff

插件体系：pi-agents（子代理 + role） + pi-tasks (任务管理) + pi-asks. 三个插件互不依赖，可以单独使用

现在没有使用这一组插件，仅仅作为备用。

以 `pi-archimedes/{subagents,todo,ask}` 为基础，删除不需要的功能，并添加其他功能（role 功能原属 `pi-roles`，现已并入 `pi-toolkit`）。

尤其是 subagent 部分，支持

- 子代理跨 turns 复用
- 并行、串行、单个的启动方式
- 非阻塞的后台运行子代理
- 继承上下文的fork模式和空白上下文模式
- 输入信息对子代理做steer

- /role 命令：`/role list`, `/role <name>`
- /agents 命令：列出所有可用 agents
- /tasks 命令：`/tasks` (toggle), `/tasks show`, `/tasks hide`, `/tasks clear`

Agent 定义扫描位置（优先级：project > global ）：

| Scope       | 路径                                                     |
| ----------- | -------------------------------------------------------- |
| **Project** | `<cwd>/.pi/agents/*/*.md`, `<cwd>/.agents/agents/*/*.md` |
| **global**  | `~/.pi/agent/agents/*.md`, `~/.agents/agents/*/*.md`     |

其中仅 frontmatter 包含 `mode: primary` 的可以作为 `role`

### 项目文件

| 文件         | 用途                                               |
| ------------ | -------------------------------------------------- |
| `pi-agents/` | 子代理 + role 插件（主入口：`pi -e ./pi-agents/`） |
| `pi-tasks/`  | 任务管理                                           |
| `pi-asks`    | 向用户提问                                         |

## toolkit

`pi-toolkit/`

A kit of useful tools.

## SDD Workflow

```
BEFORE: board → search → check existing specs
DURING: update status to in-progress → code → document decisions → link dependencies
AFTER:  document completion → update status to complete
```

## 项目记忆自动检索

新 session 开始时，自动调用 ctx_search 查询项目记忆:

```
ctx_search(queries: ["last user prompt", "active tasks", "open blockers", "key decisions"], sort: "timeline", limit: 3)
```

有结果 → 继续未完成工作。
无结果 → 作为新 session 开始。
