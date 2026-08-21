---
name: init-sdd
agent: orchestrator
description: Initialize a project with the default (lightspec) workflow — creates `lightspec/` (copied workflow doc), writes `SPEC.md` and `PLAN.md`, updates `AGENTS.md` and `README.md`. The four files (SPEC/PLAN/DESIGN/HANDOFF) stay simple; detail lives in `lightspec/`. Use for a new project that needs proposal/archive discipline.
---

# Init SDD (default workflow setup)

Initializes a project with the default workflow: the `lightspec/` layer (proposal → apply → archive discipline) plus the project-level `SPEC.md` intent source, `PLAN.md` roadmap, `DESIGN.md` companion, and `HANDOFF.md` handoff file. The four files hold the simple project-level view; per-change detail (specs, tasks, design) lives in `lightspec/`.

## Reference

The workflow authority is `lightspec/AGENTS.md` — the lightspec three-stage core (proposal/apply/archive) fused with the sdd layer (command reference, discovery/review hooks, skill linkage). The full content lives at `references/AGENTS.md` in this skill's directory. **Copy it verbatim into the target project's `lightspec/AGENTS.md`** — do not rewrite or summarize.

## Steps

1. **Read `references/AGENTS.md`** (this skill's directory) — the exact content to install. Confirm it matches the deployed sdd version if the skill is stale.

2. **Create `lightspec/`** — copy the reference:
   ```
   mkdir -p lightspec
   cp <this-skill>/references/AGENTS.md lightspec/AGENTS.md
   ```

3. **Update `AGENTS.md`** — append the LightSpec block (the `<!-- LIGHTSPEC:START --> ... <!-- LIGHTSPEC:END -->` section from the source) plus a short default workflow block pointing at `lightspec/AGENTS.md`. If `AGENTS.md` doesn't exist, create it. Keep it minimal — the full workflow lives in `lightspec/AGENTS.md`.

4. **Write `SPEC.md`** (skip if exists) — the project-level intent source; keep it simple, per-change detail lives in lightspec:
   - **Interview the user**: goal (1-3 lines on why the project exists), scope, initial decisions
   - Structure:
   ```markdown
   # SPEC

   ## Goal
   <1-3 lines: why this project exists>

   ## What We're Building
   - <concrete outcomes, not solutions>

   ## Decisions
   | Decision | Choice | Rationale | Date |
   ```

5. **Write `PLAN.md`** (skip if exists) — the project roadmap, phase-level only (per-task detail lives in each change's `lightspec/changes/<id>/tasks.md`):
   ```markdown
   # PLAN

   ## <Change>: <name>
   - [ ] Phase 1: <one-line>
   - [ ] Phase 2: <one-line>
   ```

6. **Write `DESIGN.md`** — only if the user requests design depth (optional; change designs may reference it instead of re-deriving).

7. **Update `README.md`** — add links to SPEC/PLAN/DESIGN if it exists; don't rewrite content.

8. **Report** — confirm what was created/updated. Skills/agents/commands are NOT installed by this command — copied separately.

## Working loop

After init: `/spec` (proposal) → `/plan` → `/build` → `/review` → `/ship` → archive (`lightspec archive`, per the LightSpec block). New changes derive their proposal from SPEC.md's What entries; archives write decisions back to SPEC.md's Decisions table. `/pickup`, `/archive`, `/rest` are shared — they read this project's workflow block.

## Not In Scope

- Lite workflow setup (that's `/init`) or upgrade (that's `/upgrade`)
- Installing skills/agents/commands from sdd
- Running `lightspec init` CLI (would overwrite the patched workflow doc with the canonical version)

## Verify

- [ ] `lightspec/AGENTS.md` exists (copied, not recreated)
- [ ] `AGENTS.md` has the LightSpec block once
- [ ] `SPEC.md` has Goal / What We're Building / Decisions
- [ ] `PLAN.md` has roadmap sections with phase checkboxes
