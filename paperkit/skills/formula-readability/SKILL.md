---
name: formula-readability
description: Use when improving mathematical formulas, displayed derivations, theorem/proof environments, equation alignment, cases blocks, long displays, or formula-to-prose readability in paper drafts.
source: AI4Math paper-writing (github.com/andkhalov/AI4Math)，改编
---

# Formula Environment And Readability

改进展示公式，让公式传达论证。环境选择是表达的一部分：揭示结构而不改变含义。

## 输入

- TeX 或草稿文本，含公式、定理陈述、证明、推导、算法。
- 可选：期刊类约束、风格偏好。

## 环境选择

| 情形 | 环境 |
| --- | --- |
| 单行等式 | `\[ ... \]`（或用 `equation` 需编号时） |
| 多行推导 | `align` / `aligned`（= 对齐）；步骤语义用 `align`，单块换行用 `aligned` |
| 分情形 | `cases`（定义域分段） |
| 长式断行 | 在运算符处断（`=` `+` `\leq`），续行缩进 |
| 定理/引理/命题 | `\begin{theorem}` 等（见 theorem-proof-writing） |

## 输出契约

1. 改写后的公式块（语义不变）。
2. 每处改动一行理由（环境/对齐/断行/编号）。
3. 公式-散文衔接检查：每个 display 前有引导句，后有解释句。

## 规则

- 公式是句子的延续：display 前后标点（`,` `.`）与句子语法一致。
- 每个 `display` 环境前有引导语（"We claim that", "By (2), we have"），不用孤立公式墙。
- 长推导用编号锚点（`\label{eq:...}` + `\eqref{}`）分段，读者可跳读。
- 不用 `$$...$$`（间距/检查工具兼容性差）；统一 `\[...\]` 或环境。
- 保留数学含义：重排 ≠ 重写；不"修正"公式内容。
- 编号节制：非引用公式不编号。

## 质量条

- 语义零变化（可数值/符号抽查验证）。
- 每 display 可独立读懂：引导句 + 公式 + 解释。
- 与 notation-consistency 记号表一致。

## 来源

改编自 `opt/paper-writing/skills/formula-environment-and-readability/SKILL.md`（AI4Math: https://github.com/andkhalov/AI4Math）。
