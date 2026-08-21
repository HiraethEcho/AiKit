---
name: pre-process-latex
description: Clean LaTeX source — strip all non-content code, keep only mathematical document content.
---

# Pre-Process: LaTeX Cleanup

Strip everything unrelated to content. Keep only the mathematical essence.

## Remove

- `\documentclass`, `\usepackage`, package imports
- `\title`, `\author`, `\date`, `\maketitle` — metadata only
- Macro definitions (`\newcommand`, `\def`, `\let`, `\DeclareMathOperator`)
- Cross-reference boilerplate (`\label`, `\ref`, `\cite`, `\bibitem`, `\bibliography`)
- Formatting-only environments (keep math, drop wrapper)
- `\input`, `\include` — resolve and inline the content
- Conditional compilation (`\ifdefined`, `\ifx`, `\@ifundefined`)
- latex comments

## Keep

- Theorem-environment bodies: `\begin{theorem}...\end{theorem}` etc.
- Definitions, lemmas, proofs, remarks, corollaries, conjectures, open problems
- Inline and displayed math (`$...$`, `$$...$$`, `\begin{equation}`)
- Section headings (`\section`, `\subsection`)
- Plain text that carries mathematical meaning

## shrink

keep abstract. shrink `Introduction` and `Prelimary` section. Remove well-known background, history, definition.

## Output

Write to `workspace/<topic>/data/<paper-id>-clean.tex`.
The file may not compile standalone — that is intentional. It is a content extract, not a buildable document.

If a structured markdown pre-read is also wanted, produce `<paper-id>-preread.md` alongside it.
