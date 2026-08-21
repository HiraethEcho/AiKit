---
name: manuscript-review
description: Audit technical manuscripts for mathematical correctness, logical soundness, notation consistency, evidence quality, and figure or code alignment. Produce findings-first assessment instead of rewriting prose blindly.
source: texra-scientific-skills (github.com/texra-ai/texra-scientific-skills)，改编
---

# Manuscript Review

数学论文严肃审稿：找问题、独立验证关键声明、按严重度报告可操作发现。

## 工作流

1. 先读全文（含附录、bib、宏、图、支撑代码）。
2. 识别主声明与最高风险推导/证明/引用，再铺开。
3. **独立验证关键计算**：极限情形、量纲、符号、因子、边界条件；结论是否真由设定推出。
4. 可用计算验证工具（符号代数/数值抽查/恒等式检验）；验证过就明说。
5. 追踪记号：定义先于使用，全文（含图与代码）稳定。
6. 检查手稿是否兑现摘要/引言宣称的目标。
7. **findings-first**：按严重度排序，指向确切位置。
8. 区分三档：确认错误 / 疑似问题 / 开放问题，不混档。

## 质量条

- 报附录/引理前先确认其存在（"缺失推导"须先查附录）。
- 聚焦影响有效性、可解释性、可复现性、可读性的问题。
- 说明验证了什么、怎么验证的。
- 短清单高信号 > 琐碎编辑噪声。
- 无重大问题 → 明说 + 残余不确定项。

## 输出

- 发现清单：`[严重度] 位置 + 问题 + 依据`（验证过的标注方法）。
- 三档分类（confirmed/likely/open）。
- 修复建议（按优先级）。

## 来源

改编自 `opt/texra-skills/manuscript-review/SKILL.md`（texra-ai/texra-scientific-skills: https://github.com/texra-ai/texra-scientific-skills）。
