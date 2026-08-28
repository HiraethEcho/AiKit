# 英文论文翻译大师

`english-paper-translator` 是一个用于 Codex / Agent Skills 的英译中专业翻译 Skill。它面向英文学术、技术、思想性文本，目标不是逐字翻译，而是把英文原文的意义、逻辑和语气重写成自然、准确、可发表的现代中文。

这个 Skill 的核心设计来自“翻译即重写”的理念：忠实于原文的思想，而不是拘泥于原文的句形。它特别关注英汉转换中常见的翻译腔问题，如英文语序残留、被动句滥用、的字链、机械连接词、抽象名词堆叠等。

## 适用场景

适合用于：

- 英文学术论文、研究摘要、学术随笔的中文翻译
- AI、科技、人文社科等专业文本的中文重写
- 需要避免“翻译腔”和欧化中文的英译中任务
- 面向有知识背景但并非特定领域专家的中文读者
- 需要保留标题、段落、列表、公式、引用等结构的精细翻译
- 希望模拟“翻译公司流程”的多轮审校与定稿

不适合用于：

- 要求逐词对照、双语平行语料、词汇表训练的任务
- 法律合同、医学诊断、金融合规等必须逐条审定的高风险文本
- 需要文学再创作、诗歌翻译、字幕压缩等高度特殊文体

## 核心工作流

这个 Skill 采用“三译者流水线”：

| 角色 | 职责 | 产物 |
| --- | --- | --- |
| 首席重写译者 | 理解原文意义和逻辑，直接写出自然中文初稿 | 重写初稿 |
| 审校译者 | 专门检查翻译腔、欧化表达、术语、逻辑与遗漏 | 问题诊断 |
| 定稿译者 | 根据审校意见重新打磨，产出可发表终稿 | 重写终稿 |

这种分工能避免 AI 常见的问题：第一版已经带着英文句法，后续只是浅层润色，最终仍然残留翻译腔。通过把“初译、审校、定稿”拆开，模型会更认真地重组句子和表达。

## 两种使用模式

### 1. 默认交互模式

适合精修、逐段处理、希望看到初稿的人。

你可以这样说：

```text
使用 $academic-zh-translator 翻译下面这段英文：

[粘贴英文原文]
```

Skill 会先输出：

```text
## 重写初稿

[中文初稿]

请审阅初稿。如需进行问题诊断和润色定稿，请输入“继续”。
```

你输入：

```text
继续
```

Skill 再输出：

```text
## 问题诊断

[审校问题列表]

## 重写终稿

[最终译文]
```

### 2. 直接定稿模式

适合日常生产、希望一次拿到最终版本的人。

你可以这样说：

```text
使用 $academic-zh-translator，直接定稿翻译下面这段英文：

[粘贴英文原文]
```

Skill 会直接输出：

```text
## 问题诊断摘要

[主要翻译风险和处理思路]

## 重写终稿

[最终译文]
```

## 安装方法

### 方法一：安装到 Codex 本地 Skills 目录

将本仓库克隆或下载到 Codex 的本地 skills 目录。仓库名仍为 `academic-zh-rewrite-translator`，但 Skill 的正式调用名是 `academic-zh-translator`。

Windows 通常是：

```powershell
git clone https://github.com/Casperpan/academic-zh-rewrite-translator.git "$env:USERPROFILE\.codex\skills\academic-zh-translator"
```

macOS / Linux 通常是：

```bash
git clone https://github.com/Casperpan/academic-zh-rewrite-translator.git ~/.codex/skills/academic-zh-translator
```

安装后，重新打开 Codex 或开始新的会话，Skill 应会被自动发现。

### 方法二：下载 ZIP 手动安装

1. 打开本仓库页面。
2. 点击 `Code` -> `Download ZIP`。
3. 解压后，将文件夹改名为 `academic-zh-translator`。
4. 放入本地 skills 目录：

Windows：

```text
C:\Users\<你的用户名>\.codex\skills\academic-zh-translator
```

macOS / Linux：

```text
~/.codex/skills/academic-zh-translator
```

目录结构应类似：

```text
academic-zh-translator/
  SKILL.md
  agents/
    openai.yaml
  references/
    theory.md
```

## 使用示例

### 示例一：交互式翻译

```text
使用 $academic-zh-translator 翻译下面这段英文：

The rapid adoption of large language models has changed not only how people write software, but also how they think about the boundary between tools and collaborators.
```

第一轮会得到初稿。输入“继续”后，会得到问题诊断和终稿。

### 示例二：一次性定稿

```text
使用 $academic-zh-translator，直接定稿翻译下面这段英文：

The rapid adoption of large language models has changed not only how people write software, but also how they think about the boundary between tools and collaborators.
```

### 示例三：请求理论说明

```text
使用 $academic-zh-translator 说明一下为什么这个 Skill 要把翻译分成初译、审校和定稿三步。
```

这时 Agent 会参考 `references/theory.md`，解释“翻译即重写”、英汉形合与意合差异，以及反翻译腔审校的意义。

## 设计原则

### 忠实于文意，而不是句形

英文常用从句、关系词、被动语态和抽象名词组织信息。中文更依赖语义顺序、短句推进和上下文衔接。这个 Skill 要求译者根据中文逻辑重组原文，而不是照搬英文句法。

### 先理解，再重写

第一步不是直译，而是理解原文的论证关系、语气和信息层次，然后直接写出自然中文初稿。

### 专门审查翻译腔

审校步骤会检查：

- 被字滥用
- 的字链
- 英文语序残留
- 机械连接词
- 不必要代词
- 抽象名词堆叠
- 术语不稳
- 信息遗漏或误增

### 终稿要像中文原创

最终译文应当像一篇中文作者写出的文章：准确、清楚、顺畅、克制、专业。

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `SKILL.md` | Skill 主体，包含触发说明、双模式流程、三译者职责和翻译规则 |
| `agents/openai.yaml` | Codex / OpenAI Skill 界面元数据 |
| `references/theory.md` | 理论说明，按需加载 |
| `README.md` | 仓库说明、安装与使用指南 |

## 作者信息

作者：离谱

X 平台：离谱 [@LipuAIX](https://x.com/LipuAIX)

公众号：稀有学生

欢迎关注。

## 更新 Skill

如果已经通过 `git clone` 安装，可以进入本地 Skill 目录后更新：

```bash
git pull
```

如果是 ZIP 安装，则重新下载 ZIP，替换原文件夹即可。

## 许可证

本项目采用 **CC BY-NC-SA 4.0**（知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议）。

你可以在保留作者署名和来源说明的前提下分享、引用和改写本 Skill；未经作者额外授权，不得用于商业用途。基于本项目改写或再发布的版本，也应采用相同或兼容的许可方式。

完整说明见 [LICENSE.md](./LICENSE.md)。
