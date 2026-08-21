---
name: latex
description: LaTeX documents, articles, theorems/proofs, pdflatex cycle
triggers: LaTeX, .tex, article, paper, preamble, theorem, pdflatex
combines_with: markdown (when choosing format), lean (for Lean theorems in article)
---

# LaTeX — patterns and compilation

## When to use LaTeX vs Markdown

- **LaTeX** — scientific articles, dissertations, books, Beamer slides,
  documents with complex math (theorems, proofs 2+ pages, large formulas).
- **Markdown** — README, documentation, brief notes, diary.md, literature
  reviews, notebook-like reports. GitHub renders MD with syntax
  highlighting and basic math via KaTeX.
- **Rule**: if the user asked for `.md` — do not give `.tex`. If they
  asked for a scientific article / dissertation — `.tex`. If unsure — ask.

## Minimal preamble for math

```latex
\documentclass[11pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[T2A]{fontenc}          % Russian
\usepackage[russian,english]{babel}
\usepackage{amsmath,amssymb,amsthm}
\usepackage{mathtools}              % amsmath extension
\usepackage{geometry}
\geometry{margin=2.5cm}
\usepackage{hyperref}
\hypersetup{colorlinks=true,linkcolor=blue!70!black,urlcolor=blue!60!black}
\usepackage{graphicx}
\usepackage{booktabs}               % pretty tables: \toprule \midrule \bottomrule
\usepackage{microtype}              % improved kerning
\usepackage{listings}               % code
\usepackage{xcolor}
```

For Beamer presentations replace `article` with `beamer` and add
`\usetheme{metropolis}` (requires `metropolistheme` or
`beamerthememetropolis`).

## Math

- **Inline**: `$x^2 + 1$`, **display**: `\[ \int_0^\infty e^{-x^2}\,dx \]`.
- **Do not use `$$...$$`** — this is deprecated plain TeX. Only `\[...\]` or
  environments `equation`, `align`, `gather`.
- **Numbering**: `equation` is numbered, `equation*` — not. `align` — per line,
  `align*` — without numbers.
- **Theorems**:

  ```latex
  \newtheorem{theorem}{Theorem}[section]
  \newtheorem{lemma}[theorem]{Lemma}
  \newtheorem{definition}[theorem]{Definition}
  \theoremstyle{remark}
  \newtheorem*{remark}{Remark}
  ```

- **Proofs**: `\begin{proof} ... \end{proof}` — automatically places
  `∎` at the end.
- **Number sets**: `\mathbb{R}`, `\mathbb{Z}`, `\mathbb{N}`, `\mathbb{Q}`,
  `\mathbb{C}`. Custom shortcut: `\newcommand{\R}{\mathbb{R}}`.
- **Spaces in formulas**: `\,` (thin), `\;` (medium), `\quad`, `\qquad`.
  In integrals before `dx`: `\int f(x)\,dx`.

## Tables

```latex
\begin{table}[h]
  \centering
  \begin{tabular}{lrr}
    \toprule
    Model & Success & Latency \\
    \midrule
    qwen3      & 96.7\%  & 16.8 s \\
    deepseek-v3 & 90.0\% & 29.7 s \\
    \bottomrule
  \end{tabular}
  \caption{Benchmark}
  \label{tab:bench}
\end{table}
```

`\toprule`/`\midrule`/`\bottomrule` from `booktabs` — always. Vertical lines
in tables (`|l|r|`) are considered bad taste.

## Figures

```latex
\begin{figure}[h]
  \centering
  \includegraphics[width=0.7\linewidth]{figures/plot.pdf}
  \caption{Description}
  \label{fig:plot}
\end{figure}
```

- Prefer **PDF** for vector graphics (matplotlib `savefig('plot.pdf')`).
- PNG — for raster (screenshots).
- Never use JPEG for scientific graphics.

## References

- `\label{sec:intro}` + `\ref{sec:intro}` — sections
- `\label{thm:main}` + `\ref{thm:main}` — theorems
- `\label{eq:gauss}` + `\eqref{eq:gauss}` — formulas (parentheses)
- `\cite{key}` + `\usepackage{biblatex}` with `.bib` file — bibliography
- `\url{https://...}` / `\href{url}{text}` — hyperlinks

## Compilation — closed loop

**After writing the `.tex` file, ALWAYS run compilation and check the result.**

```bash
pdflatex -interaction=nonstopmode -halt-on-error main.tex
```

If using `biblatex` / references:

```bash
pdflatex main.tex && biber main && pdflatex main.tex && pdflatex main.tex
```

(Twice at the end to resolve references.)

Output analysis:

- **Errors** (`! ` at line start) — stop, fix, recompile.
- **Undefined references** (`LaTeX Warning: Reference 'xxx' undefined`) —
  normal on first pass, disappears after second.
- **Overfull hbox** — text exceeds margins. Minor, but worth checking.
- **Missing $** — forgot math mode. Wrap in `$...$`.

If `pdflatex` is not installed on the system — tell the user one phrase
(`sudo apt install texlive-latex-recommended texlive-fonts-recommended`).
Do not attempt to install full texlive-full yourself — it's 5 GB.

## Anti-patterns (don't do)

- Do not use `\begin{center}...\end{center}` for alignment — use
  `\centering` inside environments.
- Do not use `\\` in normal text for line breaks — bad style. Use blank
  lines for new paragraphs.
- Do not combine `\section` with manual numbering — LaTeX numbers itself.
- Do not write formulas as text (`x^2 + 1`) — it reads terribly. Either
  `$x^2 + 1$` or display mode.
- Do not forget `~` (non-breaking space) before references:
  `Theorem~\ref{thm:x}`.