---
description: Implement the next task — build, verify, request review (sdd code stage)
---

Follow the `building` skill (plan-driven mode when a plan exists) with ponytail minimal-code pre-check.

Pick the next pending task from the plan (PLAN.md for lite, `lightspec/changes/<id>/tasks.md` for default). For each task:

1. Read the task's acceptance criteria
2. Load relevant context (existing code, patterns, types)
3. Run the ponytail 7-rung ladder: YAGNI → Reuse → Stdlib → Native → Installed dep → One-liner → Minimum
4. Write a failing test for the expected behavior (RED)
5. Implement the minimum code to pass the test (GREEN)
6. Run the full test suite to check for regressions
7. Run the build to verify compilation
8. Mark intentional simplifications with `// ponytail: reason` comments
9. When the task's acceptance criteria pass, tick the checkbox (PLAN.md box, or the change's tasks.md)
10. When all tasks in a change's phase complete, tick the matching phase box in the root PLAN.md

If the plan can't be followed (codebase reality diverged), stop and present Expected/Found/Why with three options — Follow the plan / Skip / Update the plan (see Mismatch Handling in `building`). Never silently diverge.

If any step fails, follow the `debugging-and-error-recovery` skill. On completion, request review via `/review`.
