---
description: Break work into small verifiable tasks — sdd plan stage. Route per the AGENTS.md workflow block
---

Follow the `planning` skill (vertical-slice decomposition for complex features) or `plan` — route per the workflow block in `AGENTS.md`.

Read the spec (SPEC.md / lightspec proposal) and the relevant codebase sections. Then:

1. Read only — no code changes
2. Identify the dependency graph between components
3. Slice work vertically (one complete path per task, not horizontal layers)
4. Write tasks with acceptance criteria and verification steps
5. Add checkpoints between phases

**Default workflow (LightSpec block)**: create the change scaffold via `spec-proposal` (`lightspec/changes/<id>/` with proposal.md, tasks.md, spec deltas), then review with `plan-reviewer` and validate with `lightspec validate <id> --strict`. Update the root PLAN.md roadmap (one section per spec, phase checkboxes).

**Lite workflow (LiteSpec block)**: write PLAN.md — phases with `- [ ]` task checkboxes, each with an `(acceptance: ...)` criterion. Run `slicer` to sanity-check slicing/ordering before building.

Present the plan for human review before any implementation.
