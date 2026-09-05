---
description: Pause in-progress work without archiving — shared by both workflows. Survey per the AGENTS.md workflow block, add a parked note to PLAN.md, append HANDOFF.md, report status
---

Invoke the rest skill.

Park in-progress work without archiving:

1. **Read `AGENTS.md`** — the workflow block names the survey method (Workflow block → PLAN.md; LightSpec block → PLAN.md + lightspec state per the block).
2. **Survey** — per the workflow block: what's done, what's pending, next task, blockers.
3. **Update PLAN.md** — tick completed phases, add ⏸ parked note per in-flight item: `done / next / blocker`.
4. **Write `HANDOFF.md`** (append): state, pickup commands, notes.
5. **Report** — `parked: n items — id / progress / next / blocker`.

Never archive an incomplete item. If everything is complete, suggest /ship + archive instead.
