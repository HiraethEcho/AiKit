---
name: expert-panel
description: Multi-perspective analysis — parallel analysis from different role perspectives to evaluate decisions, designs, and plans
---

# Expert Panel

## Overview

The Expert Panel skill assembles a virtual panel of domain experts to analyze a problem from multiple perspectives. Each expert writes their analysis independently, then the panel synthesizes findings into a unified recommendation.

This is a standalone version of the Expert Panel framework used inside the Think skill. Use it when you want multi-perspective review without the full reasoning structure.

## How It Works

### Panel Assembly

Select 3-5 panelists relevant to the domain. Common panel compositions:

| Domain              | Panelists                                                         |
| ------------------- | ----------------------------------------------------------------- |
| **Architecture**    | Architect, SRE, Security Engineer, Performance Engineer           |
| **Feature Design**  | Product Manager, UX Designer, Backend Engineer, Frontend Engineer |
| **Security Review** | Security Engineer, Architect, Developer, Operations               |
| **Code Quality**    | Lead Developer, Code Reviewer, Tester, Performance Engineer       |
| **Strategy**        | CTO, Tech Lead, Domain Expert, Business Stakeholder               |

### Analysis Flow

1. **Brief** — Present the problem or artifact to all panelists
2. **Independent analysis** — Each panelist writes their findings (in parallel)
3. **Collation** — Collect and organize by theme
4. **Consensus identification** — Where do panelists agree?
5. **Disagreement surfacing** — Where do they diverge and why?
6. **Synthesis** — Produce unified recommendation with preserved minority views
7. **Output** — Structured panel report

## Usage

Invoke when you need multi-disciplinary review:

```
Load the expert-panel skill with [architecture|feature|security|code|strategy] composition.
```

## Output

```markdown
## Expert Panel Report

### Panel Composition

- Role 1 (expertise)
- Role 2 (expertise)

### Independent Analyses

#### Role 1

[analysis]

#### Role 2

[analysis]

### Consensus Areas

- Area 1: agreed finding
- Area 2: agreed finding

### Disagreements

- Point: Role 1 vs Role 2
- Resolution: recommendation

### Recommendation

[synthesized recommendation with supporting rationale]

### Preserved Minority Views

- View 1: minority position with its rationale
```

## Rules

1. Panelists MUST analyze independently — no cross-contamination
2. Disagreements are surfaced, not smoothed over
3. Each panelist cites evidence, not opinion
4. Minority views are preserved, never discarded
5. Panel composition is disclosed in the output
