---
name: mathematical-enhancer
description: Strengthen the mathematical substance of papers by proposing or implementing better proofs, sharper results, cleaner derivations, and stronger formulations. Implement only what can be rigorously justified.
source: texra-scientific-skills (github.com/texra-ai/texra-scientific-skills)，改编
---

# Mathematical Enhancer

手稿的主要机会在更强的数学：更干净的证明策略、更紧的界、更一般的定理、更启发的推导。

## 工作流

1. 通读全文，定位：常规内容、脆弱处、真正可改进处。
2. 找可被更自然结构/已知结果/更揭示性工具替代的暴力论证。
3. 用两轴评估候选改进：**对论文的影响** × **路线可靠性**。
4. 分离可实施与推测性：前者完整实现；后者显式标注为建议。
5. 声称改进就必须做出来——不空指更强的结果。
6. 区分数学实质改进 vs 纯表达；聚焦数学。
7. 更优证明依赖标准结果时，明确连接该结果而非从头重推。
8. 直接在 LaTeX 中改时保持内联批注编译安全。

## 质量条

- 增强须至少改善其一：正确性 /  generality / 优雅 / 解释力。
- 只实现能严格证明的改进。
- 推测/困难想法标为建议，不写成既成事实。
- 不以抽象聪明换清晰——新论证更难信任则弃。
- 强路线失败 → 干净回退，不留半成品。
- 高影响×高置信的改进要落地，不只赞叹。

## 输出

- 实现的改进（含完整论证）+ 标注的建议（未证路线）。
- 每项：改动位置、数学增益、置信度。

## 来源

改编自 `opt/texra-skills/mathematical-enhancer/SKILL.md`（texra-ai/texra-scientific-skills: https://github.com/texra-ai/texra-scientific-skills）。
