---
name: math-summary
description: Use when consolidating research results into a single summary — after completing rounds of conjecture attempts, literature surveys, or multi-step proofs
---

# Math Summary

## Overview

Consolidates scattered research artifacts into one authoritative summary file. Designed for projects that produce numbered attempt files (`01-conjecture.md`, `02-first-attempt.md`, ..., `NN-stuck-summary.md`).

## When to Use

- After completing N rounds of proof attempts
- After finishing a literature survey
- When asked to "summarize results" or "write a summary"
- Before presenting findings to a collaborator
- At the end of a research session

## Accepts

- `input_dir`: directory containing research files (default: `attempt/`)
- `output`: summary file path (default: `{input_dir}/00-summary.md`)

## Workflow

```
1. SCAN    → Read all numbered files in input_dir
2. EXTRACT → Pull conjectures, proven results, lemmas, stuck points
3. ORGANIZE → Group by status (proven / open / disproven)
4. WRITE   → Single summary file with clear sections
```

---

## Stage 1: Scan

Read all files in `input_dir` sorted by name (numbered prefixes enforce order). For each file, extract:

- **Conjecture statements** (exact wording)
- **Proven lemmas/propositions** (statement + which round proved them)
- **Failed approaches** (what was tried and why it failed)
- **Stuck points** (exact location where proof breaks)
- **Open questions** (left by the research)

## Stage 2: Extract

For each item found, classify:

| Category | Meaning |
|----------|---------|
| **Proven** | Complete proof, verified |
| **Partial** | Some steps proven, gap remains |
| **Open** | Conjecture stated, no proof yet |
| **Disproven** | Counterexample found |
| **Lemma** | True intermediate result, useful but not the main goal |
| **Stuck** | Proof attempt breaks at a specific point |

## Stage 3: Write Summary

### Summary template

```markdown
# Research Summary — [Topic]

**Session:** [date range]
**Files:** [list of input files read]

---

## Status overview

| Item | Status | Proven in | Notes |
|------|--------|-----------|-------|
| Conjecture X | Proven | Round 3 | |
| Conjecture Y | Open | — | Stuck at [point] |
| Lemma A | Proven | Round 1 | Used in Conjecture X |
| Lemma B | Proven | Round 2 | Standalone, might be useful later |

---

## Proven results

### Conjecture X ([name])
**Statement:** [exact statement]
**Proof:** Round [N], file `NN-name.md`
**Key idea:** [1-sentence proof strategy]

### Lemma A ([name])
**Statement:** [exact statement]
**Proved in:** Round [N]

---

## Open conjectures

### Conjecture Y ([name])
**Statement:** [exact statement]
**Attempted:** Rounds 1–[N]
**Stuck at:** [exact description of where proof breaks]
**Tried:** [list of approaches]
**Root cause:** [why each approach fails]
**Possible direction:** [idea for future work]

---

## Failed approaches (what not to repeat)

| Approach | Tried in | Why it fails |
|----------|----------|--------------|
| [method] | Round 1 | [reason] |
| [method] | Round 2 | [reason] |

---

## Useful lemmas (not part of main conjecture)

- **Lemma B:** [statement] — might be useful for [related problem]
- **Proposition C:** [statement] — weaker than needed but correct

---

## Reading order

00-summary.md → 01-conjecture.md → 02-first-attempt.md → ... → NN-stuck-summary.md
```

---

## Rules

1. **One summary file per topic.** If the input directory covers multiple conjectures, group them in one summary.
2. **Preserve exact statements.** Copy conjecture/theorem wording verbatim from the attempt files.
3. **Never omit stuck points.** A stuck point with root cause analysis is more valuable than a clean summary that hides the difficulties.
4. **Include the reading order.** The summary should end with the file sequence so a reader can follow the research narrative.
5. **Date-stamp.** Include the date range of the research session.
