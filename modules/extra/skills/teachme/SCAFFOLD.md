# SCAFFOLD — 初始化文件夹结构

阶段三。目标目录 = **当前工作目录**（`cwd`）。不新建父目录，不猜路径。

## 生成什么

目录按需创建，文件只这三个：

| 文件 | 给谁看 | 内容 |
|---|---|---|
| `AGENTS.md` | agent | 硬规则、边界级别、目录分工 |
| `README.md` | 人 | 学习契约（`## 学什么` + `## memo`）、目录说明、当前进度 |
| `USAGE.md` | 人 | 常用命令、环境怎么起、`helper/` 里每个脚本干什么 |

`README.md` 里已有 ASK 阶段写的契约段时，**只补不删**。

## 目录语义

```
reference/            参考资料（对学生只读）
reference/<name>/     上游副本：代码库、论文出处、大文件软链
reference/examples/   例题与答案（agent 写全），基准数字的来源，辅语言对照版
reference/solutions/  exercise 每题的解答（对拍基准），序号与 exercise 对齐
exercise/             根据 reference/examples/ 出的练习题（题面 + 注释 + 骨架 + 练习环境，学生填实现）
helper/               助手产出：check.sh / status.sh 等脚本，也包括其他辅助材料
notes/                纯知识笔记（换台机器依然成立的内容）
logs/dev/             手写的本机记录：实测数字、环境故障、踩过的坑
logs/run/             程序吐出的日志、指标、曲线（gitignore）
```

在创建前先 `ls` 一遍。已存在的目录不动，已存在的文件不覆盖。

## AGENTS.md 模板

```markdown
# AGENTS.md

## 学什么

见 `README.md` 的「学什么」段。

## 边界级别

当前级别：<L0 / L1 / L2 / L3>（默认 L1，每个任务可覆盖）

| 级别 | agent 写什么 | 学生写什么 |
|---|---|---|
| L0 讲解 | 只讲解、举例、画表，不建文件 | 全部 |
| L1 骨架（默认） | 文件 + docstring + 注释 + 空函数体 / TODO | 实现 |
| L2 首步 | 完整写前 1–2 步当范例，然后停 | 其余 |
| L3 对照 | 在 `reference/examples/` 写完整例题与答案 | 自己另写一份，再对拍 |

## 写代码的分工

- agent 写：`reference/examples/` 的例题与答案；`reference/solutions/` 的习题解答；`exercise/` 的题面、注释、骨架、练习环境；`helper/` 的脚本；`reference/README.md` 的索引
- agent 不写：`exercise/` 里的实现（L2 的首 1–2 步除外）
- **解答只进 `reference/examples/` 与 `reference/solutions/`，不进 `exercise/`。** 学生说「做完了」之前不展开解答
- agent 不写：`notes/` 里没实测或没出处的数字

## 辅语言对照版

主语言：<主语言>。辅语言：<辅语言，没指定就删掉这一节>。

每道题在 `reference/examples/` 里同步生成一份辅语言版本，**注释写厚** —— 它不用于做题，只用于自读。
重点写辅语言有、主语言没有的坑。它**不镜像到 `exercise/`**：是读物，不是作业。

## 目录分工

| 目录 | 放什么 | 不放什么 |
|---|---|---|
| `reference/` | 只读参考资料 + `README.md` 索引 | 会被学生修改的代码 |
| `reference/<name>/` | 上游副本，原样保留 | 学生改过的版本 |
| `reference/examples/` | 例题与答案、辅语言对照版、基准数字的出处 | 学生的作业 |
| `reference/solutions/` | `exercise/` 每题的解答，对拍基准 | 验收前给学生看 |
| `exercise/` | 题面、注释、骨架、练习环境 | 实现、答案 |
| `helper/` | 验收脚本、辅助材料 | 学生的作业 |
| `notes/` | 纯知识：概念、原理、坑 | 本机专有的数字、路径、状态 |
| `logs/dev/` | 手写的本机实测、环境故障 | 概念解释（那属于 notes） |
| `logs/run/` | 程序输出 | 任何手写内容 |

判定：**换一台机器这句话还成立吗** → 成立进 `notes/`，不成立进 `logs/dev/`。再问：**人写的还是程序吐的** → 程序吐的进 `logs/run/`。

## 硬规则

1. 不猜。不确定就问。
2. 改文件前先说明改什么；破坏性动作先确认。
3. **未经批准不 `git commit`。** 每个任务完成可以提议提交。
4. 新知识必须落文件，不留在对话里。
5. 一份文件只留一个真相；旧笔记错了直接改。
6. 长任务不占主面板，日志落 `logs/run/`。
7. 说话用中文，代码和注释用英文。
```

模板里那个「每个任务一次 commit」就是学校规则，不再单独留 `RULES.md` —— 两份规则互相抄会漂移。

## helper/ 脚本

L1 起生成，学科相关：

| 脚本 | 作用 |
|---|---|
| `helper/check.sh <file>` | 编译 / 运行 / 数量统计，报剩余未完成处，退出码 0=通过 1=失败 2=用法错 |
| `helper/status.sh` | 一屏：环境状态、当前进度、剩余题目数、git 状态 |

要点：

- `check.sh` 要能**区分「没写」和「写错了」**。只说「失败」的检查器等于没有。
- 计数器要先剥掉注释和字符串再数 `TODO` / `sorry` / `pass`，否则注释里提到关键词就被算成洞。
- 学科不是编程时，`check.sh` 换成出题脚本或自测清单，规则是「可跑 + 可报数」。
- 脚本头部写一行用途说明，`USAGE.md` 里列一个表对应。

## 收尾

1. `git init`（需要学生同意）并写 `.gitignore`：`logs/run/`、`.venv/`、`node_modules/`、大文件软链
2. `logs/dev/01-local-state.md` 建好，写「环境」和「当前进度」两段
3. `reference/examples/README.md` 建好，列：题号 / 知识点 / 来源 / 对应的 exercise 文件；`reference/solutions/` 的文件名与 `exercise/` 对齐
4. 打印目录树
5. 打印下一步：调 `helper/status.sh` 看一屏状态，然后开始第一道题
6. 把当前边界级别写进 `AGENTS.md`，并提醒学生可以随时改

## 反模式

| 做法 | 后果 |
|---|---|
| 覆盖已存在的 `README.md` | 契约和旧进度一起没了 |
| 建一个学生不会用的空目录 | 目录越多越不知道该往哪写 |
| `helper/` 里放学生的答案 | 学生下次直接抄 |
| 没写 `.gitignore` 就 `git init` | 第一次 commit 带进日志和虚拟环境 |
| 一次建全所有空目录不写说明 | 一周后没人记得 `reference/examples/`、`reference/solutions/`、`exercise/` 的区别 |
| 把解答写进 `exercise/` 或只留在对话里 | 学生直接抄，练习作废 |
