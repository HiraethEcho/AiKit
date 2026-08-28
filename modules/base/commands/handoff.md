---
description: Create or update HANDOFF.md — record current progress, key decisions, plan, next steps, and caveats
---

## Process

1. **Gather context**
   - Review current session: what was done, what was decided, what's blocked, what failed

2. **Write/update HANDOFF.md**
   - Exists → **rewrite** with current state (not append). Keep valuable historical decisions, remove stale/completed items
   - Not exists → create
   - Use the template below

3. **Confirm**
   - Output: "HANDOFF.md updated → use /pickup in next session to resume"

## HANDOFF.md Template

---
date: <ISO datetime>
status: <in-progress | blocked | ready-for-review>
---

# Handoff — <topic>

## Goal
<what & why, 1-3 sentences>

## Current Progress
- [x] Done: <key outcomes>
- [ ] In progress: <what's being worked on>
- [ ] Pending: <queued items>

## Key Decisions
- <decision> — <rationale> (`<file:line>`)
- <decision> — <rationale>

## Current Plan
<overview of current phase, or path to plan document>

## Next Steps
1. <action> — `file:line` [P0/P1]
2. <action>
3. ...

## Notes
- <gotchas / edge cases / known issues>
- <failed attempt> — <reason>
- <other reminders>