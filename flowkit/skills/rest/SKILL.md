---
name: rest
agent: conductor
description: Pause in-progress work without archiving — survey per the AGENTS.md workflow block, record a parked note in PLAN.md, append HANDOFF.md, report status. Shared by the lite and default workflows. Use on pause, handoff, or session end with in-progress work.
---

# Rest (pause and handoff)

Pauses in-progress work — like archive but WITHOUT closing it. Archive says "this is done"; rest says "this is parked, here's exactly where". **Shared by the lite and default workflows** — the survey step follows the workflow block in `AGENTS.md`.

## Boundaries

**This skill MAY:** read workflow state (per the AGENTS.md workflow block), update PLAN.md checkboxes/notes, write a handoff note (`HANDOFF.md`), report status.
**This skill MAY NOT:** archive anything, mark tasks done that aren't, close changes, delete anything.

**Archive ≠ rest.** If the in-flight work's tasks are all complete, that's archive — suggest it instead.

## When to use

- Ending a session with in-progress work
- Switching to higher-priority work mid-phase
- Waiting on external input (user decision, dependency, review)
- "Stop for now, continue later"

## Steps

### 1. Survey state

**Entry:** User wants to pause.

Read `AGENTS.md` workflow block. Follow its survey method:
- **LiteSpec block (lite workflow)** — read `PLAN.md`: which phase is active, `- [ ]` vs `- [x]` per task, where the next task is.
- **LightSpec block (default/lightspec workflow)** — read `PLAN.md` roadmap plus the per-change state named by the block (e.g. `lightspec list` + `changes/<id>/tasks.md`).

For each in-flight item: what's done, what's pending, where the next task is, any blockers or waiting inputs.

**Exit:** You know every in-flight item's exact position.

### 2. Update PLAN.md

**Entry:** State surveyed.

Ensure the root `PLAN.md` reflects reality:
- Tick completed phases/tasks
- Add a note line under each in-flight section:
  ```
  ⏸ parked (YYYY-MM-DD): <what's done> / <next task> / <blocker or waiting-on>
  ```

**Exit:** PLAN.md shows true position.

### 3. Write the handoff note

**Entry:** PLAN.md updated.

Write `HANDOFF.md` (append, don't clobber):

```
# Handoff — YYYY-MM-DD

## State
- [ ] <item> — <progress n/m tasks> — <next: task>
- [ ] <item2> — <progress> — <waiting on: X>

## Pickup commands
- resume → /pickup (picks up next unfinished task)

## Notes
- <decisions made, traps avoided, context worth keeping>
```

Keep it compact — a fresh session only needs "where, what's next, what to watch".

**Exit:** Handoff note written.

### 4. Report

**Entry:** Handoff written.

Summarize:
- `parked: <n> items`
- per item: `id / progress / next / blocker`
- pickup path: `/pickup` or the handoff note

**Exit:** User knows exactly how to resume.

## Output

- Updated `PLAN.md` (parked notes)
- `HANDOFF.md` (append) — or a session-ending summary if the user prefers no file

## Rules

1. Never archive incomplete work — rest parks, archive closes
2. Don't mark tasks done that aren't; be honest about progress
3. Blocker/waiting-on must be explicit — a fresh session can't read your mind
4. Keep the handoff compact; no essay
5. If everything is actually complete, say so and suggest archive instead
