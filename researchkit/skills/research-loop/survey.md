---
name: math-survey
description: Use when conducting a mathematical literature survey — reading papers, extracting key results, and synthesizing new conjectures from existing theorems
---

# Math Literature Survey

## Overview

Systematic method for reading mathematical papers, extracting results, and synthesizing new conjectures. Tracks dependencies between results and identifies gaps.

## When to Use

- Starting research on a new mathematical topic
- Checking whether a conjecture is already known
- Finding prior results to cite or build on
- Writing a survey or introduction section

## Workflow

```
1. MAP       → Identify key papers and their relationships
2. EXTRACT   → Pull out definitions, theorems, techniques
3. SYNTHESIZE → Find gaps, propose conjectures
4. VERIFY    → Check cited results are correctly stated
```

---

## Stage 1: Map the Literature

For each paper, record:
- **Authors, year, venue** (citation)
- **arXiv ID or DOI** (access)
- **Main result** (one theorem)
- **Technique** (proof method)
- **Depends on** (cited prior results)
- **Opens** (unanswered questions)

**Dependency graph:**
```
PaperA ──uses──► PaperB
  │
  └──opens──► "open question X"
PaperC ──extends──► PaperA
```

---

## Stage 2: Extract Key Results

**Template per theorem:**
```markdown
### [ShortID] — Authors (Year)
**Title.** Venue. arXiv:XXXX.XXXXX.

**Theorem X.Y.** Let [hypotheses]. Then [conclusion].

**Technique:** [method, 1 sentence].

**Sharpness:** [example or "open"].

**Opens:** [questions left].
```

---

## Stage 3: Synthesize New Conjectures

After mapping 3+ papers, look for:

| Pattern | Propose |
|---------|---------|
| Bound + equality characterization | "equality iff [geometric structure]" |
| Result in special case | "extends to general singularities" |
| Index/rank bound | "length bound in terms of rank" |
| Classification with one exception | "exception is the only one" |
| Two parallel theories | "analog of classical result" |

**Conjecture template:**
```markdown
### Conjecture X (Name)

> Let [hypotheses]. Then [conclusion].

**Motivation:**
- [Paper A] proves [special case]
- [Paper B] shows [related bound]
- [gap]

**Depends on:** [result list]
```

---

## Stage 4: Verify Citations

| Check | How |
|-------|-----|
| Correct statement | Re-read theorem in paper, not just abstract |
| Correct hypotheses | smooth / klt / lc / F-dlt? |
| Correct conclusion | Bound exactly as stated? |
| arXiv ID | Fetch page, verify title |
| Published status | Preprint or published? |

---

## File Naming

Survey files use numbered prefixes for reading order:
```
01-survey-overview.md
02-paper-A-summary.md
03-paper-B-summary.md
04-gap-analysis.md
05-new-conjectures.md
```

## Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| Paraphrasing too loosely | Copy exact statement, then paraphrase |
| Missing hypothesis | List every hypothesis explicitly |
| Conflating results | Separate entry per paper |
| Ignoring singularities | Always note: smooth / klt / lc / F-dlt |
