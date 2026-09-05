---
description: Ponytail minimal-code philosophy — intensity levels plus audit / debt / gain / help / review subcommands
---

Invoke the ponytail skill.

## `/ponytail` (no subcommand)

Sets the ponytail minimal-code intensity level:

- **lite** — Build what's asked, name the lazier alternative in one line
- **full** — The 7-rung ladder enforced (default)
- **ultra** — YAGNI extremist. Deletion before addition. Challenge the requirement
- **off** — Disable ponytail enforcement

When invoked with no argument, report the current level. When changing levels, write the new level to `.ponytail-mode` and confirm the change.

Bare `/ponytail` alone is also the philosophy reference: 7-rung ladder, intensity levels, comment convention.

## `/ponytail <subcommand>`

Subcommand ∈ `audit|debt|gain|help|review`.

`review` / `audit` are subagent-suitable — whole-repo scans; run as a subagent to keep the scan out of main context.

### audit

Scan the entire codebase for over-engineering opportunities. Same tags as review but across all files in the repository. Results ranked by biggest potential cut first.

End with `net: -<N> lines, -<M> deps possible.`

### debt

Search the repository for `// ponytail:` and `# ponytail:` comment markers. Build a ledger with one row per marker. Flag any marker that has no upgrade path/trigger as `no-trigger`.

End with `<N> markers, <M> with no trigger.`

### gain

Display ponytail benchmark results from published data:
- LOC: no-skill 100% vs ponytail 6-20% (down 80-94%)
- Cost: no-skill 100% vs ponytail 23-53% (down 47-77%)
- Speed: ponytail 3-6x faster

Never print per-repo savings (no baseline available).

### help

Display a quick reference showing:
1. Three intensity levels (lite/full/ultra) and their behavior
2. All six ponytail commands and their purpose
3. Deactivation instructions
4. The 7-rung ladder

Keep the output concise — one screen of information.

### review

Review the current uncommitted diff (or recent commits) for over-engineering. Use tags:
- `delete:` — Code that shouldn't exist
- `stdlib:` — Reinventing stdlib or native platform
- `native:` — Native platform feature already covers this
- `yagni:` — You ain't gonna need it
- `shrink:` — Can be significantly smaller

End with `net: -<N> lines possible.` Only flag over-engineering, NOT correctness, security, or performance.
