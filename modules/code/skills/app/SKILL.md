---
name: app
description: Workflow guide (file-driven, CLI-free) — use when starting a session or task in a project. 6-stage loop — brainstorm → refine (SPEC.md) → plan (PLAN.md) → build → review → archive, routed through /init /task /archive. The four files carry all detail.
---

# App SDD (workflow guide)

## Overview

The workflow runs the same 6-stage sdd loop (init → clarify → plan → code → review → archive) but **file-driven**: `SPEC.md` + `PLAN.md` + optional `DESIGN.md` + `HANDOFF.md`, no CLI tooling, no proposal gate, no validate ceremony. Everything is a plain markdown file with checkboxes. It is a standalone workflow — self-contained in its four files.

## The four files (all detail lives here)

- **`SPEC.md`** — goal, what we're building, decisions (rare changes)
- **`PLAN.md`** — phases, tasks, progress checkboxes (frequent changes)
- **`DESIGN.md`** — architecture depth, only when a phase needs it
- **`HANDOFF.md`** — parked notes from `/rest`, read by `/pickup` on resume

## Loop (canonical)

```
get idea ──> refine to spec ──> plan ──> [review plan] ──> build per task ──> review ──> archive
   │              │              │            │               │                │           │
 brainstorm       refine         plan      slicer    conductor    inspector   archive
  (发散)         (→ SPEC.md)    (→ PLAN.md)  (检查切片)   (主导: maker +   (五轴审查)    (PLAN 标记 +
                                                          tester)                   SPEC 决策)
```

| Stage      | Tool                 | What it does                                                                           |
| ---------- | -------------------- | -------------------------------------------------------------------------------------- |
| 1. clarify | `base/brainstorm` | get idea, diverge — problem reframe + options                                          |
| 2. clarify | `refine`        | converge idea → `SPEC.md` (Goal/What/Decisions)                                        |
| 3. plan    | `plan`          | break SPEC into phases/tasks → `PLAN.md`                                               |
| 4. plan    | `slicer` | sanity-check the plan before building                                    |
| 5. code    | `conductor`  | main coding agent  — drives per-task iteration, dispatches maker/tester |
| 5. code    | `maker`       | implement next PLAN.md task, tick checkbox                                             |
| 5. code    | `tester` | tests for the task                                                                     |
| 6. review  | `inspector` | five-axis review of the slice                                                          |
| 7. archive | `archive`            | mark phase done + update SPEC decisions + README/CHANGELOG as needed                   |

## Commands

| Command          | When                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `/init` | new project — build SPEC.md + PLAN.md + AGENTS.md pointers (no CLI tooling)                 |
| `/task`    | implement next unfinished `- [ ]` in PLAN.md, tick it                                            |
| `/archive`       | phase complete — mark PLAN stages, update SPEC decisions, README/CHANGELOG on surface change     |
| `/rest`          | pause — parked note in PLAN.md + HANDOFF.md                                                      |
| `/pickup`        | resume — reads the AGENTS.md workflow block + SPEC/PLAN/HANDOFF, reports next task               |

## Loop in practice

1. **Clarify**: interview the user (init style) → capture Goal/What/Decisions in `SPEC.md`. If the idea is vague, first diverge (`base/brainstorm`) then converge with `refine`.
2. **Plan**: break into phases with task checkboxes in `PLAN.md`; `slicer` sanity-checks slicing/ordering.
3. **Build**: repeat `/task` per task — `conductor` drives, `maker` implements in thin slices (ponytail minimal-code check), `tester` verifies, tick the box.
4. **Review**: `inspector` five-axis pass (correctness/simplicity/scope/verification/security) before phase close.
5. **Archive**: `/archive` — mark phase done, fold decisions into SPEC.md, update README/CHANGELOG only where surface changed.
6. **Pickup**: `/pickup` — reads the AGENTS.md workflow block (Workflow) + SPEC/PLAN/HANDOFF, reports the next unfinished task.

## Working principles

1. No CLI ceremony — no proposal, no validate. Files + checkboxes only.
2. Start with the spec: vague idea → SPEC.md before any code.
3. One task at a time; verify each before ticking.
4. Prefer the boring solution (ponytail): fewer lines, no speculative abstraction.
5. Scope discipline: touch only what the task says.
6. When confused: stop, name it, ask.

## Moving to the sdd (lightspec) workflow

When the project outgrows the file-driven flow (multiple concurrent changes, formal proposal/archive discipline needed), run `/upgrade` — it keeps the four files and adds the `lightspec/` layer.
