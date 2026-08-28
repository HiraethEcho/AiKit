---
name: latex-build-audit
description: Use when checking LaTeX paper projects for compilation, latexmk logs, undefined references, citation issues, duplicate labels, macro/package hygiene, layout warnings, floats, arXiv, or venue compatibility.
source: AI4Math paper-writing (github.com/andkhalov/AI4Math)，改编
---

# LaTeX Build And Layout Audit

审计数学论文能否可靠编译与投稿。本技能处理机械性 LaTeX 质量，非证明正确性。

## 输入

- 完整 TeX 源码树、bib、图、class/style 文件、目标期刊或 arXiv 约束。
- 可选：现有 PDF、`.log`/`.blg`/`.bbl`、构建命令。

## 输出契约

1. **编译状态**：`latexmk -pdf` 是否零错误零警告（或列出全部 error/warning 原文）。
2. **问题清单**，按严重度：
   - 编译错误（缺失宏包、坏命令）
   - undefined reference / citation（`??`）
   - 重复 label
   - 坏 `\cite`（无 bib 条目、格式错）
   - 宏/包卫生（未用宏包、重定义冲突、`\newcommand` 覆盖）
   - 浮点问题（figure/table 溢出、`H` 滥用）
   - 布局警告（overfull hbox 影响可读性者、分页断层）
3. **投稿风险**：arXiv 兼容（禁 `\include` 绝对路径、外部文件缺失）、期刊类冲突。

## 检查项

- [ ] `latexmk -pdf` 干净或错误全列
- [ ] 所有 `\label{}` 有对应 `\ref{}`（反向也查：无引用 label 是否该删）
- [ ] 所有 `\cite{}` 有 BibTeX 条目（配合 citation-check 核实内容）
- [ ] 无重复 label / 无 undefined
- [ ] 宏在 preamble 定义，无覆盖
- [ ] 图矢量（PDF/EPS）非栅格；caption 独立可读；文中先引用后出现
- [ ] 定理/引理/命题/推论环境一致（见 theorem-proof-writing）
- [ ] arXiv 提交预检：源码树自包含

## 质量条

- 机械问题定位到文件:行。
- 区分"必须修"（编译/引用断裂）与"建议修"（风格/布局）。
- 不做内容修订，只报构建问题。

## 来源

改编自 `opt/paper-writing/skills/latex-build-and-layout-audit/SKILL.md`（AI4Math: https://github.com/andkhalov/AI4Math）。
