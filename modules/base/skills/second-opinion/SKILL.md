---
name: second-opinion
description: Second-opinion advisor — dispatches 1-2 subagents (advice + hard devil's-advocate) to review a decision, design, plan, or code before you commit to it
---

# Second Opinion

## Overview

The second-opinion skill gets you an independent second opinion cheaply: **1-2 subagents** — one for constructive advice, one for hard adversarial critique. Use it before committing to a decision, design, plan, or non-trivial code change when you want to catch blind spots without a full panel.

This is the lightweight entry point; `expert-panel` (multi-perspective panel) and `think` (structured frameworks) remain as reference for heavier analysis.

## Mode Selection

| Situation                                     | Mode             | Subagents |
| --------------------------------------------- | ---------------- | --------- |
| Want a sanity check + blind-spot hunt         | `advice`         | 1         |
| Consensus formed too fast / stakes are high   | `devils-advocate`| 1         |
| Both                                            | run both        | 2         |

## Mode: advice

Dispatch **one** subagent to review the artifact constructively.

1. **Pick the persona** — match an existing specialist where one fits (architect, code-reviewer, security-auditor, test-engineer, researcher, planner); otherwise role-brief `general`. Never invent personas.
2. **Brief** — include: the artifact (decision/design/plan/code), its context, and the fixed probes:
   - *"What might I be missing?"*
   - *"What are you least confident about?"*
3. **Independent analysis** — the subagent reports: strengths, risks, blind spots, and a confidence assessment per key claim.
4. **Synthesize** — main agent folds findings into the recommendation; preserve minority views.

## Mode: devils-advocate

Dispatch **one** adversarial subagent to argue the strongest counter-position.

1. **Brief** — the prevailing view/plan + its key assumptions; instruct arguing in good faith: strongest counter-argument per assumption, not strawmen.
2. **Attack** — the subagent identifies which assumptions hold under scrutiny and which fail, and answers the fixed probes:
   - *"What might I be missing?"*
   - *"What are you least confident about?"*
3. **Verdict** — recommend one of: **proceed** (assumptions validated) / **adjust** (some assumptions need work) / **reject** (fatal flaw found).
4. **Synthesize** — main agent weighs the counter-position against the original view; state what changed in the recommendation.

## Synthesis (both modes)

Output shape:

```markdown
## Advisor Report
### Mode(s) used
advice / devils-advocate (+ why)
### Independent Analyses
[per subagent: findings, evidence, confidence]
### Consensus Areas
[agreed findings]
### Disagreements
[point: advisor vs main view; resolution]
### Recommendation
[synthesized, with rationale]
### Preserved Minority Views
[positions kept even if not adopted]
```

## Rules

1. Subagents analyze independently — no cross-contamination between them or the main agent's prior conclusion
2. Both probes — "what might I be missing?" and "what are you least confident about?" — are asked in every dispatch
3. Evidence, not opinion: each finding cites the artifact or context
4. Disagreements are surfaced, not smoothed over; minority views preserved
5. State which mode(s) you used and why
6. Separate analysis from recommendation — the report shows the reasoning, then the verdict
7. Devil's advocate argues in good faith — strongest real counter-position, never a strawman
8. 1-2 subagents only — if you need more perspectives, use `expert-panel` instead
