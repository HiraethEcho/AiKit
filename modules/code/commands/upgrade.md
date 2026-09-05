---
description: Upgrade a workflow project to the default (lightspec) workflow — keep SPEC/PLAN/DESIGN/HANDOFF, add the lightspec/ layer, migrate PLAN.md tasks into the first change's tasks.md, swap the AGENTS.md workflow block
---

Invoke the upgrade skill.

Upgrade this project from the workflow to the default (lightspec) workflow:

1. **Confirm** — explain what stays (SPEC/PLAN/DESIGN/HANDOFF) and what changes (lightspec/ layer, AGENTS.md block); get user OK.
2. **Keep the four files** — SPEC.md, PLAN.md, DESIGN.md, HANDOFF.md preserved as the project-level view.
3. **Create `lightspec/`** — copy `references/AGENTS.md` from the init-sdd skill → `lightspec/AGENTS.md`.
4. **Swap AGENTS.md block** — replace the `<!-- WORKFLOW:START -->` block with the LightSpec block (as /init-sdd writes it).
5. **Migrate PLAN.md** — in-flight phase becomes the first change: scaffold `lightspec/changes/<id>/` (proposal.md + tasks.md), move task checkboxes verbatim into tasks.md; PLAN.md keeps the roadmap (one section per change, phase checkboxes).
6. **Fold decisions** — append decisions into SPEC.md Decisions.
7. **Update README.md** — point to the new layout.
8. **Report** — kept / created / changed. Future routing: `/spec` → `/plan` → `/build` → `/review` → `/ship` → archive.
