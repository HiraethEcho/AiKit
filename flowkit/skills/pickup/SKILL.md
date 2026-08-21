---
name: pickup
agent: conductor
description: Check sdd workflow progress and pick up work for a new session or agent. Shared by the lite and default workflows — reads the workflow block in AGENTS.md, then SPEC.md/PLAN.md/DESIGN.md/HANDOFF.md, and reports where we are and what's next. Use when starting a new session, after an interruption, or when asked "where are we / what's next".
---

# Pickup (progress check and handoff)

## Purpose

Cold-start a new session/agent: quickly understand the current sdd workflow state, locate the next task, and route to the matching skill/command. **One command for both workflows (lite / default)** — the variant is decided by the workflow block in `AGENTS.md` (written by `/init-sdd` or `/init`), never guessed.

## Steps

1. **Read `AGENTS.md`** — find the workflow block (`<!-- LIGHTSPEC:START -->` or `<!-- LITESPEC:START -->`). It names the variant, the four files, and the command/skill routing. Follow it.
2. **Read `SPEC.md`** — extract goal (one line) and current decisions.
3. **Read `PLAN.md`** — count `- [ ]` (pending) vs `- [x]` (done), compute progress, locate the first unfinished task. If the workflow block routes task detail elsewhere (e.g. `lightspec/changes/<id>/tasks.md`), read that too, per the block.
4. **Read `HANDOFF.md`** — if present, check for a parked note (from `/rest`) that names blockers or waiting inputs.
5. **Read `DESIGN.md`** — only if the next task references a design section.
6. **Output summary** (compact, 3-5 lines):
   ```
   workflow: <variant per AGENTS.md>
   goal: <one-line from SPEC.md>
   progress: <n>/<total> tasks (phase <k>)
   next: <first unfinished task>
   route: <per the workflow block — e.g. /task, /build, /archive>
   ```
   Flag any blocker from HANDOFF.md.

## Rules

1. Never detect the variant by file existence — the AGENTS.md workflow block is the authority
2. Progress lives in PLAN.md (or the per-change task list named by the workflow block) — never infer it elsewhere
3. Keep output compact: a new session only needs "where we are, what's next, which skill/command"
4. Multiple in-flight items → sort by completion (lowest first) or ask which to resume
5. Blocked (pending review, waiting on input) → flag the blocker, resolve before continuing
