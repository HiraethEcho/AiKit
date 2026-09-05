---
name: init
description: Scaffold the workflow file layer — AGENTS.md pointers, SPEC.md (Goal/What/Decisions), PLAN.md (phases with task checkboxes), optional DESIGN.md, on first pause. The four files carry all detail; no CLI tooling. Use to initialize a small project with the standalone workflow.
---

# Init SDD (file-driven workflow setup)

## Purpose

Initialize a project with the workflow: a small, CLI-free, file-driven layer. The four files (`SPEC.md`, `PLAN.md`, `DESIGN.md`) carry everything — no proposal ceremony, no validate step, no CLI. `AGENTS.md` gets the Workflow block that names the workflow and routing.

## Steps

1. **Interview the user** — gather:
   - **Goal**: 1–3 lines on why the project exists
   - **Stack**: language(s), key tools/frameworks
   - **Initial phases**: high-level phase names for the plan
2. **Write `SPEC.md`** (skip if it already exists):

   ```markdown
   # SPEC

   ## Goal

   <why this project exists>
   ## What We're Building
   - <user-facing deliverables>
   ## Decisions
   | Decision | Choice | Rationale | Date |
   |---|---|---|---|
   | Language | <lang> | <why> | <date> |
   ```

3. **Write `PLAN.md`** (skip if it already exists):

   ```markdown
   # PLAN

   ## Phase 1: <name>

   - [ ] <task>
   ```

   One `## Phase N:` section per phase from the interview. Progress lives ONLY here — never duplicate it elsewhere.

4. **Update `AGENTS.md`** — add the Workflow block (below) and a project header with links to `SPEC.md`, `PLAN.md`, `DESIGN.md`. Never remove existing content; append the block if missing.
5. **Update `README.md`** — if it exists, add links to `SPEC.md` and `PLAN.md` under a small header. Do NOT rewrite README content.
6. **`DESIGN.md`** — create only if the user asks for design depth (or a phase clearly needs architecture decisions). When created, it carries the architecture detail for the phases that reference it.

## Idempotency

Re-running `/init` must never clobber: skip any file that already exists; only add missing pieces (e.g. append the Workflow block to AGENTS.md if absent).

## AGENTS.md Workflow block (to embed)

```markdown
<!-- WORKFLOW:START -->

# Workflow Instructions (file-driven)

## Files

- `SPEC.md` — goal, what we're building, decisions (rare changes)
- `PLAN.md` — phases, tasks, progress checkboxes (frequent changes)
- `DESIGN.md` — architecture depth, only when a phase needs it
- `README.md` / `CHANGELOG.md` — human mirrors, updated at phase-complete only

## Workflow

- New session / pickup → `/pickup` (reads AGENTS.md block + SPEC/PLAN)
- New work → update `SPEC.md` (Decisions) + `PLAN.md` (tasks) before building
- Implement next task → `/task` (tick the checkbox)
- Phase complete → `/archive` (rollup: PLAN done + SPEC decisions + README/CHANGELOG if user-facing)
- Pause → `/rest` (parked note in PLAN.md)

## Rules

- Progress is derived from `PLAN.md` checkboxes only — never store a status line elsewhere.
<!-- WORKFLOW:END -->
```

## Not In Scope

- Installing skills/agents from the sdd repo
- The default (lightspec) workflow (that's `/init-sdd`) or upgrading to it (that's `/upgrade`)
