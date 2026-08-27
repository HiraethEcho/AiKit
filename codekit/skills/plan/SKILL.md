---
name: plan
agent: slicer
description: Lite workflow planner — breaks SPEC.md into a phased PLAN.md with task checkboxes, dependency ordering, and per-task acceptance criteria. Use in the lite workflow after refine, before building.
model: openai-codex/gpt-5.5
---

# Lite Plan

Lite workflow plan stage tool: convert `SPEC.md` (Goal/What/Decisions) into `PLAN.md` — phases with `- [ ]` task checkboxes, ordered by dependency, each with a verifiable acceptance criterion. File-driven: no design artifact, no CLI, no proposal gate.

## Input

- `SPEC.md` — Goal, What (concrete outcomes), Decisions
- Optional `DESIGN.md` section — if the phase references design depth

## Steps

### 1. Read SPEC.md fully

Extract: Goal (why), What (outcomes, not solutions), Decisions (explicit choices). Do not re-evaluate decisions — they are settled in refine.

### 2. Slice into phases

- Each phase = one coherent outcome from SPEC's What
- Each task = the thinnest unit that can be built + verified in one pass
- No task touches more than ~5 files
- Order tasks: dependencies first; note parallelizable phases

### 3. Write PLAN.md

```
# PLAN

## Phase 1: <name>
- [ ] Task 1 — <action>  (acceptance: <verifiable check>)
- [ ] Task 2 — <action>  (acceptance: <verifiable check>)

## Phase 2: <name>   [after Phase 1]
- [ ] Task 1 — <action>  (acceptance: <verifiable check>)
```

Every task's acceptance must be testable (test / type check / lint / runtime evidence).

### 4. Self-review (or hand to slicer)

- **Complete** — every SPEC "What" covered?
- **Ordered** — dependencies before dependents?
- **Sliced** — each task thin enough for one pass?
- **Testable** — each acceptance verifiable?

Fix gaps, then hand off to `conductor` for building.

## Rules

1. Tasks before code — never start building without PLAN.md
2. Decisions live in SPEC.md; the plan executes them, doesn't relitigate
3. Keep tasks thin: fat task = split it
4. Acceptance criteria are mandatory — an unverifiable task is not a task
5. Ambiguous requirement → ask, don't guess
