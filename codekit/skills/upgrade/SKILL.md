---
name: upgrade
agent: conductor
description: Upgrade a lite workflow project to the default (lightspec) workflow — keep SPEC.md (Goal/What/Decisions), DESIGN.md, and HANDOFF.md; add the lightspec/ layer; migrate PLAN.md tasks into the first change's tasks.md; swap the AGENTS.md workflow block. Use when a lite project outgrows the file-driven flow.
---

# Upgrade (lite → default/lightspec)

## Purpose

Move a project from the lite workflow (file-driven: SPEC/PLAN/DESIGN/HANDOFF carry everything) to the default workflow (lightspec-managed: the four files stay simple, detail lives in `lightspec/`). Everything already captured is kept — only the layer changes.

## Preconditions

- Project runs the lite workflow: `AGENTS.md` has the `<!-- LITESPEC:START -->` block
- All in-flight phases are either complete or parked (run `/rest` first if not)
- No unfinished tasks left dangling — upgrade assumes a clean rollup

## Steps

1. **Confirm** — explain what stays and what changes; get user OK. Never upgrade silently.
2. **Keep the four files** — `SPEC.md` (Goal/What/Decisions), `PLAN.md`, `DESIGN.md`, `HANDOFF.md` are preserved as-is. Their roles stay; from now on they hold the project-level view (see below).
3. **Create `lightspec/`** — copy the workflow authority from the `init-sdd` skill reference:
   ```
   mkdir -p lightspec
   cp <init-sdd skill>/references/AGENTS.md lightspec/AGENTS.md
   ```
4. **Swap the AGENTS.md workflow block** — replace the `<!-- LITESPEC:START --> ... <!-- LITESPEC:END -->` block with the LightSpec block (as `/init-sdd` writes it). Keep any project-specific AGENTS.md content that isn't part of the block.
5. **Migrate PLAN.md** — the current lite tasks become the first change:
   - Run `lightspec` scaffold for the in-flight phase (or the next planned change): `lightspec/changes/<id>/` with `proposal.md` + `tasks.md`
   - Move the phase's `- [ ]` / `- [x]` task checkboxes from PLAN.md into `tasks.md` verbatim
   - PLAN.md keeps the roadmap: one section per change, phase checkboxes linking the change id — task detail now lives in `tasks.md`
6. **Fold decisions** — append any lite decisions already made into SPEC.md's `## Decisions` (they persist as the project-level source)
7. **Update `README.md`** — if it links to the workflow, point to the new layout (SPEC/PLAN/DESIGN/HANDOFF + `lightspec/`)
8. **Report** — what was kept, what was created, what changed. Future work now routes via the LightSpec block: `/spec` → `/plan` → `/build` → `/review` → `/ship` → archive.

## Not In Scope

- Downgrade (sdd → lite) — not supported
- Moving existing `lightspec/` content — this is a first-time upgrade
