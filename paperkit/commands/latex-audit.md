---
name: latex-audit
description: Audit LaTeX build, references, labels, layout, arXiv readiness.
---

# Command: latex-audit

来源：AI4Math paper-writing latex-build-audit，改编

## 变量

- `{{dir}}`：tex 项目目录

## 检查

```bash
latexmk -pdf -halt-on-error   # 编译状态
grep -E "undefined|multiply defined" *.log
grep -E "Warning.*reference" *.log
grep -E "Overfull \\\\hbox" *.log | head
```

1. 编译错误/警告全列
2. undefined reference / citation（`??`）
3. 重复 label
4. 宏包/宏卫生（未用宏包、重定义）
5. 浮点/布局（overfull hbox 影响可读性者）
6. arXiv 兼容（源码树自包含）

## 输出

- 审计报告：`[必须修/建议修] 文件:行 + 问题`

## 来源

改编自 `opt/paper-writing/skills/latex-build-and-layout-audit/SKILL.md`（AI4Math: https://github.com/andkhalov/AI4Math）。
