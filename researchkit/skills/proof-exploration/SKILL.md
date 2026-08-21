---
name: math-proof-exploration
description: Structured proof exploration and attempt loop for pure mathematics research. Use when working on proving or disproving a conjecture, exploring proof strategies, or tracking intermediate results in algebraic geometry and related fields.
version: 1.0.0
author: Orchestra Research
license: MIT
tags: [Pure Mathematics, Proof Exploration, Conjecture, Algebraic Geometry, Research Loop]
---

# Math Proof Exploration

Manages the iterative process of proving (or disproving) mathematical conjectures. Tracks proof attempts, intermediate lemmas, dead ends, and progress. This is the "inner loop" of mathematical research.

## When to Use

- You have a conjecture and need to prove it
- You're stuck on a proof and need to systematically try different approaches
- You want to track what you've tried and what worked/didn't
- You need to manage multiple partial results toward a theorem

## When NOT to Use

- You don't have a conjecture yet → use `ideation`
- You need to survey literature first → use `literature-survey`
- You have a complete proof and need to write the paper → use `paper-writing`

---

## Workspace Setup

```
conjectures/{name}/
├── statement.md              # The conjecture (from ideation)
├── attempts/
│   └── {date}-{method}/
│       ├── approach.md       # What we're trying and why
│       ├── progress.md       # Intermediate results
│       ├── obstacles.md      # Where it breaks down
│       └── status.md         # ongoing | stuck | partial | complete
├── lemmas/
│   └── {lemma-name}.md       # Standalone intermediate results
├── status.md                 # Overall conjecture status
└── findings.md               # Synthesis of all attempts
```

---

## Inner Loop: Proof Attempt Cycle

Each iteration follows this protocol:

### 1. Pick a Strategy

Choose from:
- Direct proof (from definitions to conclusion)
- Contrapositive
- Proof by contradiction
- Induction (on dimension, degree, rank, ...)
- Reduction to known results
- Functorial argument (natural transformation, universal property)
- Cohomological method (spectral sequence, long exact sequence)
- Deformation / flat family argument
- Explicit construction / computation
- Categorical / abstract nonsense

Record in `attempts/{date}-{method}/approach.md`:

```markdown
# Approach: {Method Name}

## Strategy
[Why this approach might work]

## Key Idea
[The core insight driving this attempt]

## Expected Obstacles
[What could go wrong]

## Plan
1. [Step 1]
2. [Step 2]
3. [Step 3]
```

### 2. Lock the Protocol

**Commit BEFORE working**:
```
research(attempt): {conjecture} — {method}
```

This ensures you have a record of what you intended before knowing the outcome.

### 3. Work the Proof

For each step:
- State precisely what you need to show
- Check that your assumptions are satisfied
- If you need a result you don't have → create a sub-lemma

**Sub-lemma protocol**:
```markdown
# Lemma: {Name}

## Statement
[Precise statement]

## Status: unproved | proved | failed

## Proof attempt
[If attempted]
```

Save to `lemmas/{name}.md`.

### 4. Record Progress

In `attempts/{date}-{method}/progress.md`:

```markdown
# Progress: {Method}

## Achieved
- [Intermediate result 1]: [statement]
- [Reduction]: [what the problem reduces to]

## Remaining
- [What still needs to be shown]
- [Gap in the argument]

## Status
[ongoing | stuck | partial | complete]
```

### 5. Handle Obstacles

When stuck, record in `obstacles.md`:

```markdown
# Obstacles

## {Date}: {Obstacle Description}
- **Where**: [step in the proof that fails]
- **Why**: [structural reason it fails]
- **What it suggests**: [does this indicate the conjecture is false? a different approach is needed?]
- **Action taken**: [switched to / tried / abandoned]
```

### 6. Decision Points

After each attempt, decide:

| Outcome | Action |
|---------|--------|
| Complete proof | → `paper-writing` |
| Partial result (new lemma proved) | Record lemma, continue or switch approach |
| Dead end (clear obstruction) | Record why, try different approach |
| Interesting failure | Record what it teaches, consider if the conjecture needs revision |
| Stuck (no progress) | Set aside, work on a different conjecture, return later |

---

## Outer Loop: Periodic Reflection

After every 3-5 attempts, step back:

### 1. Review All Attempts

```markdown
# findings.md

## Attempt Summary
| # | Date | Method | Status | Key Result |
|---|------|--------|--------|------------|
| 1 | ... | ... | ... | ... |
| 2 | ... | ... | ... | ... |
```

### 2. Pattern Analysis

- Which approaches get closest? Why?
- Is there a common obstruction across multiple approaches?
- Are there lemmas that keep appearing? (These might be key.)
- Does the failure pattern suggest the conjecture is false?

### 3. Direction Decision

| Decision | Meaning |
|----------|---------|
| **DEEPEN** | One approach is promising — push harder |
| **BROADEN** | Try fundamentally different techniques |
| **PIVOT** | Related problem is more tractable |
| **REVISE** | The conjecture may need modification |
| **CONCLUDE** | Result proved, disproved, or firmly blocked |

### 4. Literature Check

If results are surprising or an approach keeps failing:
- Search for related techniques in the literature
- Check if the obstruction is known
- Look for partial results by others

### 5. Update State

```
research(reflect): {direction} — {reason}
```

---

## Git Protocol

| Event | Message |
|-------|---------|
| Proof attempt started | `research(attempt): {conjecture} — {method}` |
| Lemma proved | `research(result): {conjecture} — lemma {name}` |
| Partial progress | `research(progress): {conjecture} — {what was achieved}` |
| Dead end reached | `research(dead-end): {conjecture} — {method} — {reason}` |
| Conjecture solved | `research(result): {conjecture} — proved/disproved/partial` |
| Direction change | `research(reflect): {direction} — {reason}` |

---

## Algebraic Geometry Specific Strategies

When working in algebraic geometry, additionally consider:

- **Reduce to characteristic p**: Use reduction mod p to test or prove statements
- **Use functor of points**: Reformulate in terms of R-valued points
- **Deformation theory**: Does the statement deform? Is it obstructed?
- **Spectral sequences**: Are there natural spectral sequences that compute the relevant invariant?
- **Grothendieck's relative approach**: Work relatively over a base scheme
- **Stacks vs. schemes**: Would working in the stacky world simplify the problem?
- **Explicit computation**: Can you check the statement for specific varieties (curves, surfaces, toric varieties)?

---

## Output

- `conjectures/{name}/` — complete record of proof exploration
- `lemmas/` — standalone intermediate results
- `research-log.md` — append: "Proof exploration: {conjecture}, {N} attempts, status: {status}"
