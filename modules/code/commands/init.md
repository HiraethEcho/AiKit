---
description: Initialize a project with the workflow — create SPEC.md, PLAN.md, AGENTS.md pointers, optional DESIGN.md. The four files carry all detail; no CLI tooling
---

Invoke the init skill.

Initialize the current project with the workflow:

1. **Interview** the user for goal, stack, and initial phases.
2. **Write `SPEC.md`** — Goal / What We're Building / Decisions (skip if exists).
3. **Write `PLAN.md`** — phases with `- [ ]` task checkboxes (skip if exists).
4. **Update `AGENTS.md`** — append the Workflow block + links to SPEC/PLAN/DESIGN/HANDOFF (never clobber).
5. **Update `README.md`** — add links to SPEC/PLAN if it exists; don't rewrite content.
6. **`DESIGN.md`** — only if the user requests design depth.
7. **Report** — confirm what was created/updated. Self-contained in its four files.

## Not In Scope

- Installing skills/agents from the sdd repo
- The default (lightspec) workflow (that's `/init-sdd`) or upgrading (that's `/upgrade`)
