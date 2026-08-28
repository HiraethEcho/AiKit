---
name: math-literature-survey
description: Literature survey and paper extraction for pure mathematics research. Use when surveying existing work on a mathematical topic, extracting structured knowledge from papers, or identifying research gaps in algebraic geometry and related fields.
version: 1.0.0
author: Orchestra Research
license: MIT
tags: [Pure Mathematics, Literature Survey, Paper Extraction, Algebraic Geometry, arXiv]
---

# Math Literature Survey

Surveys mathematical literature, extracts structured knowledge from papers, and identifies research gaps. Outputs a curated knowledge base in ARA (Agent-Native Research Artifact) format.

## When to Use

- Starting work on a new conjecture and need to know the state of the art
- Reading a key paper and want to extract its mathematical structure
- Building a knowledge base on a specific topic (e.g., derived categories, motivic cohomology)
- Identifying what's missing in existing literature

## When NOT to Use

- You already know the literature and need to prove something → use `proof-exploration`
- You need creative problem finding → use `ideation`

---

## Workflow

### Step 1: Define Search Scope

Write a one-paragraph scope statement:

```markdown
## Search Scope
Topic: [e.g., "Derived categories of coherent sheaves on Calabi-Yau threefolds"]
Key terms: [list 5-10 keywords]
Time range: [e.g., 2015-2025]
Key authors: [if known]
Target venues: [arXiv math.AG, math.AC; journals: ...]
```

### Step 2: Search Literature

**Primary sources** (in priority order):

| Source | Coverage | Access |
|--------|----------|--------|
| arXiv math.AG | Preprints, algebraic geometry | Free |
| arXiv math.AC | Commutative algebra | Free |
| arXiv math.AT | Algebraic topology | Free |
| arXiv math.AG | Number theory | Free |
| Semantic Scholar | Cross-discipline | Free API |
| MathSciNet | Reviews, citations | Subscription |
| zbMATH | Open access reviews | Free |

**Search strategy**:
1. Start with 2-3 known foundational papers
2. Follow citation chains backward (what do they cite?) and forward (who cites them?)
3. Search arXiv for recent work (last 2-3 years)
4. Check survey articles and conference proceedings

**Save everything** to `literature/`:
```
literature/
├── papers/
│   └── {author-year-title}/
│       ├── metadata.yaml    # authors, year, venue, arXiv ID
│       ├── summary.md       # your summary
│       └── notes.md         # your notes
├── surveys/
│   └── {topic}/
│       └── synthesis.md     # cross-paper synthesis
└── gaps.md                  # identified research gaps
```

### Step 3: Extract Mathematical Structure

For each key paper, use the **ara-compiler** extraction pattern:

**3.1 — Semantic Deconstruction**
- Strip narrative, extract raw mathematical content
- Preserve ALL definitions, theorems, lemmas, propositions exactly as stated
- Note ALL numerical results (bounds, dimensions, ranks) — never round
- Capture proof techniques, not just statements

**3.2 — Cognitive Mapping**
Create structured files:

```markdown
# logic/problem.md
## Observations
[What the paper observes about the mathematical landscape]
## Gaps
[What remains open or unexplained]
## Key Insight
[The paper's main contribution in one sentence]
## Assumptions
[All assumptions explicitly listed]

# logic/claims.md
For each theorem/proposition:
- **Statement**: [exact statement]
- **Status**: theorem | proposition | conjecture | lemma
- **Proof technique**: [method used]
- **Dependencies**: [what it relies on]
- **Falsification**: [what would disprove it if it were a conjecture]

# logic/concepts.md
For each key definition:
- **Name**: [term]
- **Definition**: [precise mathematical definition]
- **Examples**: [concrete instances]
- **Non-examples**: [what it's not]
- **Related concepts**: [connections]

# logic/solution/algorithm.md
For each proof technique or construction:
- **Technique**: [name]
- **When applicable**: [conditions]
- **Key steps**: [outline]
- **Complexity**: [if computational]
```

**3.3 — Exploration Graph**
Reconstruct the paper's logical structure:

```
Root: Main Theorem
├── Lemma A (used in proof of Main)
│   ├── Proposition B (proves Lemma A)
│   └── Definition C (setup for Proposition B)
├── Lemma D (alternative approach)
│   └── Theorem E (from another paper)
└── Open Question F (mentioned as future work)
```

Save to `trace/exploration_tree.yaml`.

### Step 4: Identify Gaps

After extracting 3-5 key papers, synthesize:

```markdown
# gaps.md

## Identified Gaps

### Gap 1: {Title}
- **What's missing**: [specific open question]
- **Why it matters**: [what it would unlock]
- **Suggested approach**: [how to attack it]
- **Related work**: [papers that come close]

### Gap 2: {Title}
...

## Underexplored Connections
- [Area A] ↔ [Area B]: [why the connection is promising]

## Computational Opportunities
- [What could be computed/checks that haven't been done]
```

### Step 5: Write Survey Synthesis

For a literature survey paper or background section:

```markdown
# synthesis.md

## Overview
[2-3 paragraph overview of the field]

## Key Results
[Chronological or thematic list of main results]

## Techniques
[Survey of proof methods and constructions]

## Open Problems
[Catalog of open questions with references]

## Connections
[Links to other areas of mathematics]
```

---

## Math-Specific Extraction Rules

1. **Definitions are sacred** — copy exactly, never paraphrase notation
2. **Track dependencies** — which results rely on which
3. **Note characteristic** — always record if working in characteristic 0, p, or mixed
4. **Record all assumptions** — field algebraically closed? smooth? projective?
5. **Distinguish theorem from conjecture** — never blur this boundary
6. **Cite precisely** — paper, theorem number, page number

---

## Output

- `literature/` — curated paper summaries and notes
- `logic/` — extracted mathematical structure (problem, claims, concepts, solution)
- `trace/exploration_tree.yaml` — logical dependency graph
- `gaps.md` — identified research gaps
- `research-log.md` — append: "Literature survey: {topic}, {N} papers reviewed"
