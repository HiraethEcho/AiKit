---
name: brainstorm
agent: conductor
description: Lite workflow idea generation — diverges on a vague idea, explores the problem space, surfaces prior work, and produces a structured brainstorm note. Use in the lite clarify stage before refine (idea → SPEC.md).
model: openai-codex/gpt-5.5
---

# Lite Brainstorm

Lite workflow clarify stage tool #1: **get the idea out** (diverge). Answers WHAT/WHY before `refine` converges it into `SPEC.md`. This is a discussion, not implementation.

## Boundaries

- **May**: research (read-only), discuss, ask questions, write the brainstorm note
- **May NOT**: edit code, create files beyond the brainstorm note, run tests, implement anything

**Never write code during this skill.**

## Phase 1: Reframe the problem

Ask **one question at a time**, wait for the answer:

1. "What problem are we actually solving?" — strip assumptions, get the root need
2. "Who has this problem and when?" — context changes solutions
3. "What does success look like?" — outcomes, not features

Validate assumptions explicitly: "I'm assuming X — correct?"

## Phase 2: Research what exists

Scan the codebase + docs for prior art — similar features, past decisions, existing patterns:

```
>> Related: docs/... (past decision)
>> Pattern: services/... (existing implementation)
>> Anti-pattern: ... (known bad approach)
```

If nothing relevant: say so. Don't invent relevance.

## Phase 3: Explore approaches

Generate 2–3 solid options with trade-offs. After 2–3 options, stop — more exploration adds noise, not signal. No prototypes; discussion only.

## Phase 4: Produce the brainstorm note

Write a structured note (e.g. `docs/brainstorms/<date>-<topic>.md`):

```
# Brainstorm: <topic>

## Problem
[reframed problem statement — one line]

## Users / context
[who, when]

## Success looks like
[outcomes]

## Options considered
1. [approach] — pros / cons / fit
2. [approach] — pros / cons / fit

## Open questions
- [unresolved items to settle in refine]
```

## Rules

1. Reframe before solving — users describe solutions, not problems
2. One question at a time; validate assumptions explicitly
3. No code, no prototypes — discussion and note only
4. After 2–3 options, stop exploring
5. Hand off to `refine` when the idea is clear enough to converge into SPEC.md
