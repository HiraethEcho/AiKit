---
name: notation-consistency
description: Use when checking paper drafts for notation drift, variable reuse, undefined symbols, inconsistent domains, index conventions, or scalar/vector/matrix ambiguity.
source: AI4Math paper-writing (github.com/andkhalov/AI4Math)，改编
---

# Notation And Variable Consistency

维护记号表，让记号支撑理解而非隐藏数学错误。

## 输入

- 全稿或选节（TeX/Markdown/纯文本）。
- 定义、定理陈述、证明笔记、公式密集节。
- 可选：期刊/课题组记号约定。

## 输出契约

1. **记号表**：符号 / 含义 / 定义位置 / 作用域。
2. **问题清单**，按严重度：
   - 未定义符号（使用先于定义）
   - 变量复用（同符号异义，不同节/不同作用域）
   - 记号漂移（同一对象两种写法：$X$ vs $\mathcal{X}$）
   - 定义域/量纲不一致（$n \in \mathbb{N}$ vs $n \in \mathbb{Z}$）
   - 索引约定冲突（0-based vs 1-based，$\mathbb{Z}_{\ge 0}$ vs $\mathbb{Z}_{>0}$）
3. **统一建议**：每问题给首选写法。

## 检查规则

- 符号先定义后使用，定义一次。
- 同一数学对象全文一种写法（含图与代码）。
- 区分同名异义：局部变量显式声明作用域。
- 希腊字母/花体/黑体不互换（$\mathbb{Z}$ vs $Z$）。
- 定理中临时符号标注作用域（"in this proof, $C$ denotes ..."）。

## 质量条

- 每条问题可定位（节/行/`\label`）。
- 建议不改变数学含义。
- 记号表可导出为附录（Notation 节草稿）。

## 来源

改编自 `opt/paper-writing/skills/notation-and-variable-consistency/SKILL.md`（AI4Math: https://github.com/andkhalov/AI4Math）。
