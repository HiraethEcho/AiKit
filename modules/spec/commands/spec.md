---
description: Start spec-driven development — clarify, then write a structured spec (sdd clarify stage). Route per the AGENTS.md workflow block
---

Follow `spec-driven-development` (requirements-clarification phase) then `spec-proposal` (default workflow) or `refine` + `plan` (lite workflow) — route per the workflow block in `AGENTS.md`.

Begin by understanding what the user wants to build. Ask clarifying questions about:
1. The objective and target users
2. Core features and acceptance criteria
3. Tech stack preferences and constraints
4. Known boundaries (what to always do, ask first about, and never do)

**Default workflow (LightSpec block)**: run the `spec-proposal` flow — clarify (discovery/idea-refine) → ground in current state → scaffold `lightspec/changes/<id>/` (proposal.md, tasks.md, design.md when needed) → write spec deltas with scenarios → plan-reviewer pass → `lightspec validate <id> --strict`. Update the root PLAN.md roadmap. Present the proposal for approval — no implementation code.

**Lite workflow (LiteSpec block)**: `brainstorm` (get idea) → `refine` (converge to SPEC.md: Goal/What/Decisions) → `plan` (PLAN.md with task checkboxes). No lightspec CLI.

Confirm the spec/plan with the user before proceeding.
