---
name: logic-check
description: Audit logical flow, transitions, and claim-wording alignment at the prose level — no mathematical correctness judgment.
source: research-writing-skill #9 (github.com/alfonso0512/research-writing-skill)，改编（表达层面）
---

# Command: logic-check

## 变量

- `{{text}}`：章节或全稿
- `{{focus}}`：逻辑流 | 过渡 | 声明-表述一致（默认全查）

## 检查

1. 章节间逻辑流：引言宣称 ↔ 正文交付 ↔ 结论回收
2. 段落与章节过渡：读者断线处（弱过渡、错位段、无支撑跳跃）
3. 声明-表述一致：措辞是否与正文实际交付匹配（overclaim 表述）
4. 量词与条件表述：假设/条件的表述是否清晰、无歧义（不判真假）
5. 冗余与矛盾：同对象两处表述不一致

## 输出

- 问题清单：`[严重度] 位置 + 表述缺陷 + 修复建议`
- 无问题 → 明说

## 来源

改编自 research-writing-skill `09-logic-check.md`（https://github.com/alfonso0512/research-writing-skill）。
