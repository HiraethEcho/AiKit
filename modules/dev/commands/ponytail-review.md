---
description: Review current diff for over-engineering
---

Invoke the ponytail-review skill.

Review the current uncommitted diff (or recent commits) for over-engineering. Use tags:
- `delete:` — Code that shouldn't exist
- `stdlib:` — Reinventing stdlib or native platform
- `native:` — Native platform feature already covers this
- `yagni:` — You ain't gonna need it
- `shrink:` — Can be significantly smaller

End with `net: -<N> lines possible.` Only flag over-engineering, NOT correctness, security, or performance.
