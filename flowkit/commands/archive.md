---
description: Roll up a completed phase — shared by the lite and default workflows. Verify completion, mark PLAN.md done, update SPEC.md decisions and human docs (README/CHANGELOG) where the surface changed, then run any archival step named by the AGENTS.md workflow block
---

Invoke the archive skill.

Close out a completed phase:

1. **Read `AGENTS.md`** — the workflow block may require a variant archival step (e.g. `lightspec archive <change-id>`). Note it.
2. **Confirm completion** — every task in the phase is `- [x]`; if not, report remaining tasks and stop.
3. **Mark done in `PLAN.md`** — `## Phase N: <name> — DONE (YYYY-MM-DD)`.
4. **Update `SPEC.md`** — append phase decisions; update scope only if changed. Skip if unchanged.
5. **Update `DESIGN.md`** — only if the phase produced design decisions worth keeping.
6. **Update `README.md` / `CHANGELOG.md`** — only if the user-facing surface changed. Skip otherwise.
7. **Variant step** — if the workflow block says the variant archives via lightspec, run it (e.g. `lightspec archive <id>`); otherwise skip.
8. **Update `HANDOFF.md`** — remove resolved parked notes.
9. **Report** — which docs updated vs skipped, and why.
