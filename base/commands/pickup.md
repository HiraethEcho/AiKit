---
description: Resume from HANDOFF.md — restore context and continue
---

## Process

1. **Read HANDOFF.md**
   - Not exists → "No HANDOFF.md found, nothing to resume"
   - Exists → read full file (frontmatter + all sections)

2. **Verify state**
   - Check files mentioned in "Next Steps" and "Current Progress" still exist
   - Flag any drift (deleted files, changed content)

3. **Present summary to user**
   ```
   Handoff: <topic> (<date>)
   
   Goal: <goal>
   
   Progress:
   - [x] <done> — verified
   - [ ] <in progress> — verified
   
   Decisions:
   - <key decisions>
   
   Next:
   1. <action> — start here
   
   Notes:
   - Don't retry: <failed attempts>
   - <caveats>
   ```
   do not start working, ask user what to do next.
