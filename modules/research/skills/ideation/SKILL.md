---
name: math-ideation
description: Problem discovery and conjecture formation for pure mathematics research. Use when exploring new research directions, formulating conjectures, or reframing existing problems in algebraic geometry, number theory, or adjacent fields.
version: 1.0.0
author: Orchestra Research
license: MIT
tags: [Pure Mathematics, Research Ideation, Conjecture Formation, Algebraic Geometry]
---

# Math Ideation

Generates and refines mathematical research directions through structured creative frameworks. Outputs precise conjectures with motivation, partial results, and suggested approaches.

## When to Use

- Starting a new research project in algebraic geometry or related fields
- Feeling stuck on an existing problem and need a fresh angle
- Evaluating whether a half-formed conjecture is worth pursuing
- Exploring connections between different areas of mathematics

## When NOT to Use

- You already have a clear conjecture and need to prove it → use `proof-exploration`
- You need to survey existing literature → use `literature-survey`

---

## Workflow

### Step 1: Map the Problem Space (15 min)

Pick the situation that matches yours:

| Situation | Start With |
|-----------|-----------|
| "Don't know what area" | Tension Hunting → What Changed |
| "Vague area, no specific problem" | Abstraction Ladder → Failure Analysis |
| "Have an idea, not sure if good" | Explain-It Test → Simplicity Test |
| "Need a fresh angle" | Cross-Pollination → Stakeholder Rotation |
| "Want to combine existing work" | Composition/Decomposition |

### Step 2: Generate Candidates (30 min)

Use at least 3 frameworks from the pool below. Produce 5-10 candidate problems.

#### Framework Pool

**F1 — Tension & Contradiction Hunting**
List 3-5 desiderata for your area. Find pairs treated as trade-offs. Ask: is this trade-off fundamental or an artifact of current methods? If artifact → the reconciliation IS the contribution.

*Math example*: "Effective bounds" vs "conceptual clarity" — can a single framework deliver both?

**F2 — Abstraction Ladder**
Move UP (generalize), DOWN (specialize), or SIDEWAYS (analogize). At each level: is this publishable on its own?

*Math example*: Move from "bounds on elliptic curves" UP to "bounds on abelian varieties" DOWN to "specific families over finite fields".

**F3 — Cross-Pollination (Analogy Transfer)**
Describe your problem in domain-agnostic language. Find structurally similar problems in other fields. Map solutions back. The connection must be mechanistic, not metaphorical.

*Math example*: Tropical geometry methods applied to classical enumerative geometry.

**F4 — What Changed?**
Pick an abandoned approach (3-10 years old). List assumptions that killed it. Check if any assumption has been invalidated by new tools, new results, or new scale.

*Math example*: Derived categories were "too abstract" for concrete computations — but now spectral sequences and persistence make them computational.

**F5 — Constraint Manipulation**
List all constraints on your problem. Classify as Hard/Soft/Hidden. For each Soft/Hidden: "what if we relaxed/tightened/replaced it?" Hidden constraints are most fertile.

*Math example*: Working over ℂ vs. over finite fields vs. over mixed characteristic — each gives a different problem.

**F6 — Negation & Inversion**
List 5-10 core assumptions. Negate each. Evaluate: incoherent (discard), already explored (check), unexplored and coherent (potential direction).

*Math example*: "Every smooth projective variety has property X" → "There exists a smooth projective variety failing X — how badly?"

**F7 — The Adjacent Possible**
What has become possible in the last 1-3 years? New theorems, new computational tools, new connections. Ideas that became feasible in the last 6-18 months are the sweet spot.

**F8 — Composition & Decomposition**
Compose: combine two methods solving complementary subproblems. Decompose: isolate each component's contribution to find dominant/redundant parts.

### Step 3: Converge (15 min)

Apply filters to narrow 5-10 candidates to 2-3:

- [ ] **Explain-It Test**: Can you state the problem and why it matters in 2 sentences?
- [ ] **Problem-First Check**: Is this a genuine mathematical question, or a solution looking for a problem?
- [ ] **Simplicity Test**: Strip to the simplest version — is it still interesting?
- [ ] **Feasibility**: Can you make progress in 2-4 weeks?

### Step 4: Formulate Conjectures (15 min)

For each surviving candidate, write:

```markdown
# Conjecture: {Name}

## Statement
[Formal statement — every variable defined, every assumption explicit]

## Motivation
[Why this matters, what it connects to, what it would unlock]

## Known Partial Results
[What's already known, what's the gap]

## Suggested Approaches
1. [Approach 1]: [brief description]
2. [Approach 2]: [brief description]
3. [Approach 3]: [brief description]

## Obstacles
[What makes this hard, what would need to be overcome]
```

Save to `conjectures/{name}/statement.md`.

---

## Algebraic Geometry Specific Prompts

When ideating in algebraic geometry, additionally ask:

- **Categorical angle**: Does this have a natural formulation in terms of functors, natural transformations, or universal properties?
- **Cohomological angle**: Is there a cohomology theory that captures the invariant you're studying?
- **Moduli angle**: Is there a moduli space interpretation? What is the geometric meaning of deformations?
- **Duality angle**: Is there a Serre/Grothendieck/Langlands duality that provides a mirror perspective?
- **Computational angle**: Can this be checked for small examples (surfaces, low-dimensional varieties)?

---

## Output

- `conjectures/{name}/statement.md` — one per candidate
- `research-log.md` — append entry: "Ideation session: {date}, generated {N} candidates, selected {M}"
