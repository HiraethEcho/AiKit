---
name: refine
description: Refine a vague idea into a concrete SPEC.md using structured questioning modes (Sherlock/Poirot/Columbo). The workflow clarify convergence tool — use after brainstorm, before plan.
---

# Refine

## Overview

Refine converges a rough idea into a concrete `SPEC.md` (Goal / What / Decisions). It reuses the structured investigation protocol — gather, hypothesize, test, conclude — applied to the *idea itself* instead of a bug. The clarify stage has two tools: `base/brainstorm` (diverge, get ideas) and `refine` (converge, idea → spec).

## Modes

| Mode         | Approach                                                                                                | Best For                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Sherlock** | Deductive reasoning from what's said. Observe every claim, filter noise, deduce what the user actually wants. | Fairly clear idea, need the exact spec                                  |
| **Poirot**   | Orderly analysis of all possibilities. Systematically eliminate alternative readings of the request.     | Ambiguous ideas, conflicting requirements, missing context              |
| **Columbo**  | Question assumptions. "One more thing." Challenge the obvious interpretation, surface blind spots.       | Ideas that seem simple but have hidden complexity or unstated constraints |

## Refinement Protocol

1. **Capture** — restate the idea in one sentence. What is it? For whom? Why now?
2. **Probe** — 3–5 sharp questions per unclear area (scope, users, success criteria, non-goals)
3. **Challenge** — test each assumption: what if the opposite were true? what's the cheapest way to learn this is wrong?
4. **Converge** — write `SPEC.md`: Goal (1–3 lines), What (concrete outcomes, not solutions), Decisions (explicit choices + rejected alternatives)
5. **Verify** — read the spec back to the user; confirm before `plan` breaks it into tasks

## Output

```
## SPEC.md draft

### Goal
[1-3 lines: why this exists]

### What
- [concrete outcome]
- [concrete outcome]

### Decisions
- [choice] — [why], [rejected: alternative]
```

## Rules

1. Never write code before the spec — refine first
2. One spec per idea (split the idea if it's really two)
3. A spec is not done until the user confirms it
4. If the idea keeps resisting refinement, name the missing information and ask
5. Explicitly state which assumption you're challenging (Columbo mode)

## Related tools
- `spec/idea-refine` — 结构化发散→收敛
- `spec/interview-me` — 追问真实意图（~95% 置信）
- `base/grill-me` — 收敛前压力测试
