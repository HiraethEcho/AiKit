---
description: Run tests — TDD workflow or acceptance validation (sdd test stage)
---

**Subagent-suitable** — writing failing tests + running the suite is self-contained; isolate the noisy test output.
- type: `general-purpose`
- note: long suites → `run_in_background: true`; parallel file edits → `isolation: worktree`

Follow `test-driven-development` (red-green-refactor) or the `building` skill's Validation section (acceptance criteria from the plan).

For new features:
1. Write tests that describe the expected behavior (they should FAIL)
2. Implement the code to make them pass
3. Refactor while keeping tests green

For bug fixes (Prove-It pattern):
1. Write a test that reproduces the bug (must FAIL)
2. Confirm the test fails
3. Implement the fix
4. Confirm the test passes
5. Run the full test suite for regressions

For plan-driven work (lite or default):
1. Read each task's acceptance criteria from the plan (PLAN.md or `lightspec/changes/<id>/tasks.md`) — the plan encodes the right commands; don't hardcode project tools
2. Run each criterion against the working tree
3. Produce a validation report: verdict pass/fail, tasks checked n/m, deviations
4. Plan-level gaps → revise the plan, re-implement, re-validate

For browser-related issues, also follow `browser-testing-with-devtools`.
