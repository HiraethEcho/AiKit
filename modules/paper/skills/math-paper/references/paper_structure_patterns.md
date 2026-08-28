# Paper Structure Patterns — 3 Structure Models

Used by `structure_architect_agent` and `intake_agent` to select the appropriate structure.

Per project AGENTS.md, only three structures are in scope:
1. **Theoretical Paper** (严肃数学学术论文)
2. **Survey Note** (综述性质笔记 — 对已有结果的总结)
3. **Research Note** (研究结果笔记 — 记录自己的研究)

## Pattern 1: Theoretical Paper (严肃数学学术论文)

**Best for**: Original mathematical results for submission — theorem-proof papers
**Typical length**: 15-40 pages
**Format**: LaTeX (see `templates/latex_article_template.tex`)

### Structure

```
1. Title + Abstract + Keywords
2. Introduction
   2.1 Motivation and background
   2.2 Main results (informal statement)
   2.3 Related work and positioning
   2.4 Outline of the paper
3. Preliminaries
   3.1 Notation and conventions
   3.2 Known results used
4. Main Results
   4.1 Theorem/Proposition statements (precise hypotheses + quantifier order)
   4.2 Proofs (each step justified; gaps flagged explicitly)
   4.3 Corollaries and examples
5. Discussion
   5.1 Relation to prior results
   5.2 Limitations and open problems
6. Conclusion
7. References
```

Key rules: every theorem/lemma/definition stated precisely; hypotheses load-bearing; proofs logically complete — never silently fill gaps.

## Pattern 2: Survey Note (综述性质笔记)

**Best for**: Personal knowledge-store summaries of existing results — not for submission
**Typical length**: 2-8 pages (scale with topic)

### Structure

```
1. Problem History (起源, 时间线, 开放问题)
2. Problem Statement (精确陈述 + 记号)
3. Results Summary (结果 × 作者 × 年份 表格)
4. Comparison (结果间关系, 方法对比)
5. Sources (文献来源记录: 引用 + arXiv/DOI + 阅读日期)
6. Personal Understanding (直觉, 疑问)
```

See `templates/survey_note_template.md`.

## Pattern 3: Research Note (研究结果笔记)

**Best for**: Recording one's own research results in a personal knowledge store — not for submission
**Typical length**: 1-6 pages per result

### Structure

```
1. Problem & Motivation
2. Statements (命题精确陈述: 假设 + 记号)
3. Proof (证明或证明要点, 检查清单)
4. Difficulties (卡点, 阻塞)
5. Failed Routes (失败的证明路线表: 想法/原因/教训)
6. Open Questions
7. Links (关联笔记/文献)
```

See `templates/research_note_template.md`.

## Pattern Selection Guide

```
Input: Paper Configuration Record (paper_type)
├── paper_type = "theoretical"   -> Pattern 1 (submission-ready math paper)
├── paper_type = "survey_note"   -> Pattern 2 (existing-results summary)
├── paper_type = "research_note" -> Pattern 3 (own results, proof records)
└── not specified ->
    ├── User targets submission/publication -> Pattern 1
    ├── User summarizes existing literature  -> Pattern 2
    └── User records own research progress   -> Pattern 3
```

Special cases:
- If user's goal is ambiguous -> clarify intent first (see `references/intent_clarification_protocol.md`)
- If user already has partial drafts -> prioritize adapting to the existing draft structure
