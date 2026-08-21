---
name: proof-obligation-audit
description: Use when checking mathematical results for assumptions, quantifiers, domains, dependency fit, edge cases, external theorem use, proof coverage, or theorem-to-claim consistency.
source: AI4Math paper-writing (github.com/andkhalov/AI4Math)，改编
---

# Proof Obligation And Assumption Audit

审计结果是否被其假设、依赖、证明覆盖度支撑。这是写作审查，非自动定理证明：识别散文不得隐藏的义务与风险。

## 输入

- 待审结果：theorem/proposition/lemma/corollary。
- 证明文本、定义、记号表、被引外部结果、来源笔记。
- 可选：期刊标准、审稿意见。

## 审计维度

1. **假设充分性** — 每个假设在证明中被用到？未用假设 → 弱化或删除；缺假设 → 证明有洞。
2. **量词与定义域** — ∀/∃ 顺序、非空条件、退化对象（空集/零/平凡群）显式处理？
3. **依赖拟合** — 外部定理（`\cite`）的假设是否真的满足？"看起来像"≠"满足"。
4. **边界情形** — 极限情形、特征 p、奇异对象、无穷维。
5. **证明覆盖度** — 证明每步覆盖声明全部情形？分情形证明无漏。
6. **定理-声明一致性** — 摘要/引言宣称的强度 ≤ 定理实际强度。

## 输出契约

- 义务表：`[结果] 维度 + 风险 + 证据位置 + 建议`。
- 分三档：确认缺口 / 疑似问题 / 开放问题。不混档。
- 引用具体行/公式/`\label`，不泛泛而谈。

## 质量条

- 只报告可定位的问题（具体位置 + 具体风险）。
- 无重大问题时显式说明 + 残余不确定项。
- 不重写证明，只审计并给修复建议。

## 来源

改编自 `opt/paper-writing/skills/proof-obligation-and-assumption-audit/SKILL.md` + `templates/proof-obligation-ledger.md`（AI4Math: https://github.com/andkhalov/AI4Math）。
