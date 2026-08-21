---
name: math-paper-writing
description: LaTeX paper writing for pure mathematics research. Use when drafting, polishing, or compiling a mathematics paper with formal theorems, proofs, and figures in algebraic geometry and related fields.
version: 1.0.0
author: Orchestra Research
license: MIT
tags: [Pure Mathematics, Paper Writing, LaTeX, Theorem, Proof, Algebraic Geometry]
---

# Math Paper Writing

Writes publication-quality mathematics papers with formal theorems, structured proofs, and publication-ready figures. Adapted from ml-paper-writing for pure mathematics conventions.

## When to Use

- You have results (proved theorems) and need to write them up
- You need to restructure or polish an existing draft
- You need publication-quality figures for geometric objects
- You need to verify citations and references

## When NOT to Use

- You're still proving things → use `proof-exploration`
- You need to review rigor of existing writing → use `rigor-review`

---

## Workflow

### Step 1: Define the Paper

One-sentence contribution:

> "We prove {main result} by {technique}, which {significance}."

### Step 2: Outline

Standard algebraic geometry paper structure:

| Section | Content | Typical Length |
|---------|---------|:--------------:|
| Abstract | Problem, result, significance | 100-150 words |
| Introduction | Motivation, history, main theorem, outline | 2-3 pages |
| Preliminaries | Definitions, notation, background | 2-4 pages |
| Main Results | Theorems with full proofs | 8-15 pages |
| Applications | Examples, computations | 2-4 pages |
| Appendix | Technical lemmas, lengthy computations | as needed |

### Step 3: Write Section by Section

#### Abstract
- State the problem in one sentence
- State the main result in one sentence
- State the significance in one sentence

#### Introduction
- Motivate the problem (why should the reader care?)
- Historical context (what's known?)
- State the main theorem precisely
- Outline the proof strategy
- State secondary results
- Paper organization paragraph

#### Preliminaries
- Introduce ALL notation before use
- State definitions precisely
- Cite sources for background material
- Keep concise — this is a reference section, not a textbook

#### Main Results

**Theorem format**:
```latex
\begin{theorem}\label{thm:main}
Let $X$ be a smooth projective variety over an algebraically closed field $k$ of characteristic zero. Assume that [conditions]. Then [conclusion].
\end{theorem}
```

**Proof format**:
```latex
\begin{proof}
[Intuition first, then formal argument]

We begin by [approach overview].

[Step-by-step proof]

This completes the proof.
\end{proof}
```

**Key principles**:
- State ALL assumptions explicitly before each theorem
- Provide intuition alongside formal proof
- Explain before showing equations/ formulas
- Use `\label{}` and `\ref{}` for all cross-references

#### Applications/Examples
- Concrete computations that illustrate the main result
- Special cases that build intuition
- Connections to other areas

### Step 4: Generate Figures

Types of figures in algebraic geometry:

| Type | Tool | When |
|------|------|------|
| Commutative diagrams | tikz-cd | Functorial arguments, exact sequences |
| Geometric illustrations | tikz / pstricks | Curves, surfaces, singularities |
| Function plots | pgfplots / matplotlib | Numerical data, convergence |
| Flowcharts | tikz | Proof strategy overviews |

**Commutative diagram example**:
```latex
\usepackage{tikz-cd}
\begin{tikzcd}
A \arrow[r, "f"] \arrow[d, "g"'] & B \arrow[d, "h"] \\
C \arrow[r, "k"'] & D
\end{tikzcd}
```

**Rules**:
- All figures must be vector (PDF/EPS), not raster
- Captions must stand alone without main text
- Readable in black-and-white
- Reference all figures in text before they appear

### Step 5: Citations

- Use BibTeX with consistent style
- Verify every citation exists (check arXiv, MathSciNet)
- Cite precisely: paper, theorem number, page
- No fabricated references

### Step 6: Compile

```bash
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```

Or with latexmk:
```bash
latexmk -pdf main.tex
```

---

## Math-Specific Writing Rules

1. **Definitions before theorems** — never use a term before defining it
2. **Assumptions before statements** — "Let X be..." before "Then Y holds"
3. **Intuition before rigor** — explain the idea, then prove it formally
4. **Precision over brevity** — a precise short statement beats a vague long one
5. **Notation consistency** — once introduced, never change meaning
6. **Attribute clearly** — "Following [Author, Year]..." for known techniques

---

## LaTeX Checklist

- [ ] All `\label{}` have corresponding `\ref{}`
- [ ] All `\cite{}` have BibTeX entries
- [ ] No undefined references
- [ ] All figures included and referenced
- [ ] Page numbers, headers correct
- [ ] Theorem/lemma/proposition/remark environments used consistently
- [ ] Math symbols defined in preamble or before first use
- [ ] Compilation produces no errors or warnings

---

## Output

- `paper/main.tex` — LaTeX source
- `paper/references.bib` — bibliography
- `paper/figures/` — vector figures
- `research-log.md` — append: "Paper draft: {title}, {N} pages"
