---
name: archive
agent: documenter
description: Roll up a completed phase — verify completion, mark PLAN.md done, fold decisions into SPEC.md, refresh DESIGN/HANDOFF/README/CHANGELOG only where the surface changed, then run any archival step named by the AGENTS.md workflow block (e.g. lightspec archive). Shared by the lite and default workflows.
---

# Archive (phase rollup)

## Purpose

Close out a completed phase: mark it done, capture decisions, refresh human-facing docs — but only where the surface actually changed. No-op doc updates are noise; skipping unchanged documents is correct behavior. The workflow block in `AGENTS.md` may add a variant-specific archival step at the end.

## Steps

1. **Read `AGENTS.md`** — note the workflow block; it may require an extra archival step (e.g. `lightspec archive <id>`). Keep it in mind for step 7.
2. **Confirm completion** — verify every task in the phase (PLAN.md section, or the per-change task list named by the workflow block) is `- [x]`. If not, report the remaining tasks and stop.
3. **Mark the phase done in `PLAN.md`** — add a completion line under the phase header:
   ```markdown
   ## Phase 1: <name> — DONE (YYYY-MM-DD)
   ```
4. **Update `SPEC.md`** (only if changed):
   - Append decisions made during the phase to the `## Decisions` table
   - Update `## What We're Building` if scope changed
   - Skip entirely if neither changed
5. **Update `DESIGN.md`** — only if the phase produced design decisions worth keeping. Skip otherwise.
6. **Update human-facing docs** (only on surface change):
   - `README.md` — new commands, changed usage, new setup steps; keep it a mirror (link to SPEC/PLAN, don't duplicate)
   - `CHANGELOG.md` — append an entry from the phase's git history; skip if no user-facing changes
7. **Variant step** — if the AGENTS.md workflow block says the variant archives via lightspec (e.g. `lightspec archive <change-id>`), run that step now. Otherwise skip.
8. **Update `HANDOFF.md`** — remove resolved parked notes for this phase.
9. **Report** — list which docs were updated and which were skipped (and why), plus the archival step taken.

## Working Rules

- **Change-driven updates** — every doc update is gated on an actual surface change. When in doubt, skip and note it
- **README is a mirror** — link to SPEC/PLAN rather than restating content
- **Progress already in PLAN.md** — do not add a status file; the checkboxes plus the DONE line are the record
- **Never archive incomplete work** — archive closes; if tasks remain, hand back to build instead
