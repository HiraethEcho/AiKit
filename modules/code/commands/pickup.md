---
description: Check sdd workflow progress and pick up work — shared by both workflows. Reads the workflow block in AGENTS.md (written by /init-sdd or /init), then SPEC/PLAN/DESIGN/HANDOFF, and reports where we are and what's next
---

Invoke the pickup skill.

Check the sdd workflow state and report where things stand. **One command for both workflows** — the variant is decided by the workflow block in `AGENTS.md`, never guessed:

1. **Read `AGENTS.md`** — the workflow block (`<!-- LIGHTSPEC:START -->` or `<!-- WORKFLOW:START -->`) names the variant and the command/skill routing. Follow it.
2. **Read `SPEC.md`** — goal + decisions; report project-level intent first: `goal: <one line> / decisions: <n>`
3. **Read `PLAN.md`** — progress via checkboxes; per the workflow block, also read per-change task detail if it lives elsewhere (e.g. `lightspec/changes/<id>/tasks.md`); for each in-flight item report `id / goal / progress / next / route`
4. **Read `HANDOFF.md`** — surface parked notes / blockers from a previous `/rest`
5. **Report** — compact: `workflow / goal / progress / next / route`, plus blockers

If resuming, continue from the next task using the routed skill/command. Keep output compact — a new session only needs "where we are, what's next, which skill".
