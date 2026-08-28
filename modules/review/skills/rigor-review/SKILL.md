---
name: math-rigor-review
description: Rigor review and proof verification for pure mathematics research. Use when checking the logical soundness of proofs, verifying claim-evidence alignment, or performing a self-review of a mathematics paper draft in algebraic geometry and related fields.
version: 1.0.0
author: Orchestra Research
license: MIT
tags: [Pure Mathematics, Rigor Review, Proof Verification, Peer Review, Algebraic Geometry]
---

# Math Rigor Review

Performs systematic review of mathematical proofs and paper drafts for logical soundness. Evaluates 6 dimensions of rigor and produces a severity-ranked report. Adapted from ara-rigor-reviewer for pure mathematics.

## When to Use

- You have a proof and want to verify it's correct before writing up
- You have a paper draft and want a self-review before submission
- You want to check if a claimed result actually follows from the argument
- You're reviewing a colleague's work and want a structured framework

## When NOT to Use

- You're still exploring proof strategies → use `proof-exploration`
- You haven't written the paper yet → use `paper-writing`

---

## Workflow

### Step 1: Read the Document

Read in this order (for a paper):
1. Main theorem statement(s)
2. Proofs of main theorems
3. Preliminaries / definitions
4. Applications / examples
5. Appendix (technical lemmas)

Read in this order (for a proof attempt):
1. The conjecture being addressed
2. The proof strategy
3. Each step of the argument
4. Intermediate lemmas used

### Step 2: Extract Entities

For each theorem/proposition/lemma:

```yaml
statement: "precise statement"
status: theorem | proposition | lemma | conjecture
assumptions:
  - "explicit assumption 1"
  - "explicit assumption 2"
proof_steps:
  - step: 1
    claim: "what is shown"
    relies_on: [definitions, previous steps, cited results]
  - step: 2
    ...
conclusion: "what follows"
```

### Step 3: Evaluate 6 Dimensions

Score each 1-5 (1=weak, 5=strong):

#### D1 — Logical Completeness

Does every proof step follow from the previous ones?

| Score | Meaning |
|-------|---------|
| 5 | Every step justified, no gaps |
| 4 | Minor gaps easily filled by reader |
| 3 | One or two non-trivial gaps |
| 2 | Significant logical jumps |
| 1 | Fundamental steps missing |

**Check for**:
- "It is easy to see that..." — is it really?
- "By standard results..." — which result exactly?
- "Similarly..." — is the analogy valid?
- Unstated use of choice, Zorn's lemma, or AC

#### D2 — Assumption Tracking

Are all assumptions used? Are any unnecessary?

| Score | Meaning |
|-------|---------|
| 5 | All assumptions used, none redundant |
| 4 | All used, one potentially redundant |
| 3 | Assumption usage unclear in places |
| 2 | Assumptions used without being stated |
| 1 | Key assumptions missing |

**Check for**:
- Assumptions stated but never used (why include them?)
- Assumptions used but never stated (dangerous!)
- Could the theorem hold with weaker assumptions?

#### D3 — Definition Precision

Are all terms defined before use?

| Score | Meaning |
|-------|---------|
| 5 | Every term defined, notation consistent |
| 4 | One or two minor ambiguities |
| 3 | Some terms used before definition |
| 2 | Notation changes meaning mid-proof |
| 1 | Key terms undefined |

#### D4 — Scope Calibration

Are the claims appropriately bounded?

| Score | Meaning |
|-------|---------|
| 5 | Claims exactly match what's proved |
| 4 | Slight overclaiming (one word too strong) |
| 3 | Claim broader than proof supports |
| 2 | Significant gap between claim and proof |
| 1 | Claim is false or proof is wrong |

**Check for**:
- "We prove..." when you only showed a special case
- "For all varieties..." when you only checked smooth ones
- "Complete classification..." when you listed some examples

#### D5 — Reference Accuracy

Are cited results correctly stated and applied?

| Score | Meaning |
|-------|---------|
| 5 | All references correct and properly applied |
| 4 | Minor citation errors (wrong page number) |
| 3 | One misapplied cited result |
| 2 | Key cited result misstated |
| 1 | Fabricated or non-existent reference |

#### D6 — Proof Architecture

Is the proof well-organized and readable?

| Score | Meaning |
|-------|---------|
| 5 | Clear structure, logical flow, easy to follow |
| 4 | Mostly clear, minor organization issues |
| 3 | Correct but hard to follow |
| 2 | Disorganized, hard to reconstruct |
| 1 | Incoherent |

### Step 4: Compile Findings

For each issue found:

```yaml
finding_id: F01
dimension: D1
severity: critical | major | minor | suggestion
target: "location in the document"
observation: "what is wrong"
reasoning: "why this is a problem"
suggestion: "how to fix it"
```

**Severity definitions**:
- **critical**: Proof is wrong or fundamentally broken
- **major**: Significant gap that affects the result
- **minor**: Correctness not affected, but quality is
- **suggestion**: Could be improved, not required

### Step 5: Compute Grade

| Grade | Condition |
|-------|-----------|
| Strong Accept | mean >= 4.5 AND no dimension < 3 |
| Accept | mean >= 3.8 AND no dimension < 2 |
| Weak Accept | mean >= 3.0 AND no dimension < 2 |
| Weak Reject | mean >= 2.0 AND (mean < 3.0 OR any dimension < 2) |
| Reject | mean < 2.0 OR any dimension = 1 |

### Step 6: Write Report

```markdown
# Rigor Review Report

## Overall Grade: {Grade}
## Mean Score: {mean}/5.0

## Dimension Scores
| Dimension | Score | Summary |
|-----------|:-----:|---------|
| D1 Logical Completeness | X/5 | ... |
| D2 Assumption Tracking | X/5 | ... |
| D3 Definition Precision | X/5 | ... |
| D4 Scope Calibration | X/5 | ... |
| D5 Reference Accuracy | X/5 | ... |
| D6 Proof Architecture | X/5 | ... |

## Findings (sorted by severity)

### Critical
[F01] ...

### Major
[F02] ...

### Minor
[F03] ...

### Suggestions
[F04] ...

## Questions for Authors
1. ...
2. ...
```

---

## Algebraic Geometry Specific Checks

- [ ] Is the base field algebraically closed when needed?
- [ ] Are characteristic assumptions stated?
- [ ] Is "smooth" vs "regular" vs "nonsingular" used consistently?
- [ ] Are scheme-theoretic vs set-theoretic statements distinguished?
- [ ] Are cohomology groups computed over the correct field/ring?
- [ ] Are functors described as functors of points or as sheaves consistently?

---

## Output

- `review/{date}_review.md` — the review report
- `research-log.md` — append: "Rigor review: {target}, grade: {grade}"
