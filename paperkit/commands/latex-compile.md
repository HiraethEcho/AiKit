---
name: latex-compile
description: Compile LaTeX project via latexmk with manual fallback.
---

# Command: latex-compile

来源：arm + AI4Math paper-writing latex 惯例，改编

## 变量

- `{{file}}`：主 tex 文件（默认 main.tex）

## 流程

```bash
latexmk -pdf {{file}}        # 推荐：自动多趟 + bib
# 或手动：
pdflatex {{file}} && bibtex {{file}} && pdflatex {{file}} && pdflatex {{file}}
```

- `latexmk` 缺失 → 回退手动 4 趟；两者皆缺 → 报环境缺失，降级静态检查
- 编译后跑 `latex-audit`（见 latex-audit.md）

## 输出

- PDF + 编译状态（error/warning 列表）

## 来源

改编自 `opt/arm/paper-writing/SKILL.md`（Orchestra Research）+ `opt/paper-writing`（AI4Math: https://github.com/andkhalov/AI4Math）。
