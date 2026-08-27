---
name: task
agent: maker
description: Implement the next unfinished task from PLAN.md — locate the current phase, read the linked DESIGN.md section if present, implement, and tick the checkbox. Use for executing lite workflow work without proposal or validation ceremony.
---

# Lite Build (apply the plan)

## Purpose

Execute work from the lite workflow plan: pick the next unfinished task in `PLAN.md`, implement it, mark it done. No proposal gate, no approval ceremony — just the next task.

## Steps

1. **Read `PLAN.md`** — find the current phase (first phase with an unchecked `- [ ]` task).
2. **Read design if linked** — if the active phase or task references a `DESIGN.md` section, read that section first and implement per its decisions.
3. **Confirm scope** — state the task being implemented and its acceptance in one line; if the task is ambiguous, ask the user rather than assume.
4. **Implement** — keep edits minimal and focused on the task. Do not touch code or files orthogonal to the task.
5. **Tick the checkbox** — mark the task `- [ ]` → `- [x]` in `PLAN.md`.
6. **Repeat or stop** — continue to the next task in the phase, or stop when the user says so / phase is complete (then suggest `/archive`).

## Working Rules

- **Self-review before ticking** — on task completion, do a quick five-axis self-review (correctness, design, tests, edge cases, naming). Fix issues before marking done.
- **Progress stays in PLAN.md** — never maintain a separate status/notes file; the checkboxes are the truth.
- **DESIGN.md is on-demand** — read it only when the task's phase references it.

## Not In Scope

- Creating proposals or spec deltas (that's the sdd/lightspec `/spec`)
- Validation ceremony — the lite workflow skips it (self-review + PLAN.md checkbox is the gate)
- Updating SPEC.md/AGENTS.md/README/CHANGELOG — that's `/archive` at phase end
