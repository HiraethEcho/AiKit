---
name: writing-commenter
description: Review math paper drafts by leaving inline comments on logic flow, notation consistency, and editorial elevation — diagnose and guide instead of silently rewriting.
source: texra writing-commenter（完整版在 toolkit/skills/texra-tools/），适配 paperkit 格式
---

# Writing Commenter

给数学草稿加读者向批注，不静默改写。三模式：逻辑流 / 记号 / 编辑提升。

## 工作流

1. 先读全稿：论证、记号、结构、成熟度。
2. 开局选模式（除非用户要求混合）：
   - **logical flow**：结构、过渡、叙事连贯、解释平衡
   - **notation**：符号一致性、定义顺序、约定冲突、优雅改名
   - **editorial elevation**：标题、摘要、定位、受众匹配、修辞节奏、图表 caption 叙事
3. 严守模式范围：不漂移到数学正确性/逐行编辑/校对（除非要求）。
4. 内联批注指向具体问题 + 可行动修复；已有注释约定则保持。
5. logic 模式：在读者断线处批（弱过渡、错位段、无支撑跳跃、叙事弧断裂）。
6. notation 模式：符号不一致/复用混淆/引入过晚处批；优先最小文档级改动的优雅解。
7. editorial 模式：低估贡献、压平重要思想、未为潜在审稿人定位、图表 caption 沦为装饰处批。
8. LaTeX 内批注自包含且编译安全；文档带批注仍可读可构建。

## 质量条

- 批注具体到作者可立即行动
- 少而高信号 > 逐句批注
- 区分局部修复 vs 系统性问题（不把全篇重组说成一行动）
- 保留作者声音与技术内容：诊断引导，非反射式覆盖
- 混合模式时仍按模式标记问题，不模糊成"改好点"

## 来源

原版：texra writing-commenter（https://github.com/texra-ai/texra-scientific-skills）；完整 checklist 见 `toolkit/skills/texra-tools/writing-commenter/`。
