---
description: Apply the next unfinished task from PLAN.md — implement, self-review, tick the checkbox. Lite workflow build step.
---

Invoke the build skill.

Execute the next unfinished task from the lite plan:

1. **Read `PLAN.md`** — find the current phase (first phase with an unchecked `- [ ]` task).
2. **Read design if linked** — if the phase references a `DESIGN.md` section, read it first.
3. **Implement** the task with minimal, focused edits.
4. **Self-review** — five-axis pass (correctness, design, tests, edge cases, naming), fix issues.
5. **Tick the checkbox** — mark it `- [x]` in `PLAN.md`.
6. **Continue or stop** — next task in the phase, or suggest `/archive` when the phase is complete.

No proposal gate, no validate, no lightspec CLI.
