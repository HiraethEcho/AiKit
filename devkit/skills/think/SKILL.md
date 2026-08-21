---
name: think
agent: researcher
description: Deep reasoning with multiple frameworks — Expert Panel, Devil's Advocate, What-If, Tradeoff Matrix
---

# Think

## Overview

The Think skill applies structured reasoning frameworks to complex decisions. It goes beyond surface-level analysis by forcing systematic exploration from multiple angles before reaching a conclusion.

## How It Works

### Reasoning Frameworks

Select the appropriate framework based on the decision type:

| Framework            | When                             | What It Does                                                                                                          |
| -------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Expert Panel**     | Complex decisions with tradeoffs | Assembles N virtual experts with distinct perspectives, each analyzes independently, panel synthesizes recommendation |
| **Devil's Advocate** | When consensus forms too quickly | Argues the strongest counter-position, tests assumptions, identifies blind spots                                      |
| **What-If**          | Planning with uncertainty        | Explores 3-5 alternative futures, each with different assumptions, maps outcomes                                      |
| **Tradeoff Matrix**  | Comparing options                | Ranks options against weighted criteria, highlights tradeoffs, quantifies decisions                                   |

### Expert Panel Mode

1. Select 3-5 panelists relevant to the domain (e.g., Architect, SRE, PM, Security Engineer, UX)
2. Each panelist writes their analysis independently
3. Panel synthesizes: consensus areas, disagreement points, recommendation
4. Minority opinions are preserved, not discarded

### Devil's Advocate Mode

1. State the prevailing view or plan
2. Identify its key assumptions
3. For each assumption, construct the strongest counter-argument
4. Assess which assumptions hold under scrutiny
5. Recommend either: proceed (assumptions validated), adjust (some assumptions need work), or reject (fatal flaw found)

### What-If Mode

1. Identify key uncertainty drivers
2. Build 3-5 coherent scenarios with different assumptions
3. For each: "If X happens, then Y follows"
4. Map outcomes per scenario
5. Recommend: which scenario to plan for, which triggers to watch

### Tradeoff Matrix Mode

1. List options (2-5)
2. Define weighted criteria
3. Score each option per criterion
4. Calculate weighted totals
5. Present as matrix with tradeoff commentary

## Usage

Invoke when facing architectural decisions, design disagreements, or strategic planning:

```
Load the think skill using [expert-panel|devils-advocate|what-if|tradeoff-matrix] mode.
```

## Output

Each framework has its own output template. All outputs end with a clear recommendation and supporting rationale.

## Rules

1. Always state which framework is being used and why
2. Preserve minority and dissenting views — they're the most valuable
3. Separate analysis from recommendation
4. When using Tradeoff Matrix, weight criteria transparently, never hide the scoring
5. When using Devil's Advocate, argue in good faith — not for entertainment
