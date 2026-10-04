---
description: Stage this round's changes and hand them to a reusable commit subagent
---

Two steps. The commit itself is not yours.

**1. Stage this round's work.**

```sh
git status --short
git add <files related to this round work>
```

Only what belongs to this round. Never `git add -A`.

**2. Hand it to the `commit-writer` subagent.** 
Try to reuse the subagent if it exists. otherwise create it.
Let the subagent use the `commit-writer` skill.
Then pass on what it returns. Nothing else is your part.
