---
name: semitrans
description: Semi-translate English math papers to Chinese for learning purposes with three tiers. full (Chinese terms via dictionary.md), default (English terms preserved), lite (abbreviated via abbrev.md). Triggers "semitrans", "half translate", "保留数学术语", "半译英", "数学翻译", "英译中 数学", "algebraic geometry translation".
---

# semitrans

分析数学论文、问题时对英文内容做半翻译，分为三个模式 lite, default, full，默认使用 default, 根据选取参考示例。
专注领域：基础数学，代数几何方向。

## 示例

| 意图 | 模式 | 术语处理 |
| --- | --- | --- |
| lite / 最小 / level 1 | lite | `abbrev.md` 缩写 |
| default / 标准 / level 2 / 未指定 | default | 保留英文原形 |
| full / 学术 / level 3 | full | `dictionary.md` 转中文 |

差别

| 项目 | lite | default | full |
| --- | --- | --- | --- |
| 术语 | `abbrev.md` 缩写，max 3-4 tokens | 保留英文原形 | `dictionary.md` 纯中文 |
| 未收录术语 | 保留英文并记录 | 保留英文 | 保留英文，首次注记 `b-除子 (b-divisor)` |
| 句式 | 缩写+中文 | 英文术语+中文 | 几乎纯中文，重写为中文主动短句意合 |
| 追求 | 最小可读 | 标准半译 | 完整翻译 |

## 通用规则

- LaTeX 仅 `$...$` inline、`$$...$$` display。禁用 `\(...\)`、`\[...\]`
- 无 unicode 数学符号（保持 `.md` ASCII-clean）
- 引用 `surname+year`（如 `Kaw08`），首次全标题+arxiv/DOI，后续仅 `surname+year`
- 结构词译中文：定理、引理、命题、定义、证明
## 字典与示例
- `dictionary.md` — full 模式用
- `abbrev.md` — lite 模式用
- `term.md` — default/full 共用，T1: default 不译 (full 可译)、T2: 两档均不译
