---
name: theorem-proof-writing
description: Use when writing or revising theorem statements and proofs in a pure-mathematics paper — assumption placement, quantifier order, environment choice (theorem/lemma/proposition/remark), proof structure (intuition before rigor), label/ref hygiene.
source: arm-lite/paper-writing (Orchestra Research, AI-Research-SKILLs 精选)，改编
---

# Theorem Proof Writing

定理陈述与证明写作规范。数学论文的骨架是定理链；本技能把陈述-证明的写作纪律 checklist 化。

## 陈述规范

1. **假设先于陈述** — "Let $X$ be a smooth projective variety over an algebraically closed field $k$ of characteristic zero. Assume [conditions]. Then [conclusion]."
2. **量词显式** — 每个变量声明定义域；∀/∃ 不隐含；"for all" vs "there exists" 不可省略。
3. **术语先定义** — 陈述中每个符号/术语须在 Preliminaries 或陈述前定义过。
4. **环境选择一致** — 核心结果 → `theorem`；辅助结果 → `lemma`；直接推论 → `corollary`；观测/边注 → `proposition`/`remark`。不滥用 theorem。
5. **可检验性** — 读者应能从假设独立验证结论；假设太少 → 疑伪；假设太多 → 弱化。

## 证明结构

```
\begin{proof}
[直觉先行：一句话说明核心思想/证明策略]
[正式论证：步骤化]
[收尾：This completes the proof.]
\end{proof}
```

1. **直觉先于严谨** — 每个证明开头给策略概览，再展开形式论证。
2. **逐步展开** — 每步一个论断；长推导拆 lemma 或分步编号。
3. **引用内部结果** — 用 `\ref{}` 指向已证 lemma/theorem，不重证。
4. **归因清晰** — 已知技术写 "Following [Author, Year]"，不自创归因。
5. **边界情形** — 显式处理退化情形（空集、零元素、平凡对象）。

## Checklist

- [ ] 所有假设在陈述中显式列出
- [ ] 量词顺序正确（∀ 与 ∃ 不互换）
- [ ] 术语/符号先定义后使用
- [ ] 环境选择（thm/lem/prop/cor/rem）语义正确
- [ ] 每证明开头有直觉/策略句
- [ ] 每步论断可独立验证
- [ ] 边界情形已处理或显式排除
- [ ] `\label{thm:...}` 唯一且被 `\ref{}` 引用
- [ ] 外部定理归因明确
- [ ] 结论强度与假设匹配（无 overclaim）

## 输出

- 修订后的定理/证明文本 + 偏离规范的清单
- 每个改动一行说明（陈述/证明/环境/引用）

## 来源

改编自 `opt/arm/paper-writing/SKILL.md`（Orchestra Research，AI-Research-SKILLs 98 技能精选；仓库 URL 本地未记录）。
