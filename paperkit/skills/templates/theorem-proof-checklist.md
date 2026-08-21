# Theorem/Proof Checklist

来源：arm-lite/paper-writing（Orchestra Research），改编。

## 陈述

- [ ] 假设全部显式列出
- [ ] 量词顺序正确（∀/∃）
- [ ] 术语/符号先定义后使用
- [ ] 环境选择正确（thm/lem/prop/cor/rem）
- [ ] 结论强度 ≤ 证明实际支撑

## 证明

- [ ] 开头有直觉/策略句
- [ ] 每步论断可独立验证
- [ ] 边界情形处理或显式排除
- [ ] 内部结果用 `\ref{}`，不重证
- [ ] 外部结果归因明确

## LaTeX

- [ ] `\label{thm:...}` 唯一
- [ ] 有 `\ref{}` 引用该 label
- [ ] 编译无 undefined reference
