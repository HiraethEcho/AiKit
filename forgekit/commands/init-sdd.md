---
description: Initialize a project with the default (lightspec) workflow — lightspec/ + SPEC.md + PLAN.md. The four files stay simple; detail lives in lightspec/
---

Invoke the `init-sdd` skill. The workflow authority is `lightspec/AGENTS.md` (copied from the sdd source).

Initialize the current project:

1. **Read the reference** — `references/AGENTS.md` in the `init-sdd` skill directory (the workflow authority, copy verbatim).
2. **Create `lightspec/`** — copy `references/AGENTS.md` → `lightspec/AGENTS.md`.
3. **Update `AGENTS.md`** — append the LightSpec block + a short default workflow block (idempotent — never duplicate).
4. **Interview the user** — goal, scope, initial decisions.
5. **Write `SPEC.md`** — Goal / What We're Building / Decisions (skip if exists).
6. **Write `PLAN.md`** — roadmap: one section per change, phase checkboxes (skip if exists).
7. **Write `DESIGN.md`** — only on request.
8. **Update `README.md`** — links to SPEC/PLAN/DESIGN.
9. **Report** — what was created/updated.

After init, the loop is `/spec` → `/plan` → `/build` → `/review` → `/ship` → archive. `/pickup` `/archive` `/rest` are shared — they read the workflow block this command writes.

## Not In Scope

- Lite workflow setup (that's `/init`) or upgrade (that's `/upgrade`)
- Installing skills/agents/commands
- Running `lightspec init` CLI
