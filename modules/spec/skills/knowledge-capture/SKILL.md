---
name: knowledge-capture
agent: documenter
description: Compound skill for capturing decisions, solutions, and lessons learned — stores to docs/solutions/ with dedup
---

# Knowledge Capture

## Overview

The Knowledge Capture skill preserves project knowledge by saving decisions, solutions, and lessons learned to structured documents. It deduplicates against existing entries, ensuring knowledge accumulates without redundancy.

## How It Works

### Capture Types

| Type         | When                                                      | Schema                                                |
| ------------ | --------------------------------------------------------- | ----------------------------------------------------- |
| **Decision** | Architecture decision, technology choice, design tradeoff | Context, Decision, Rationale, Consequences, Date      |
| **Solution** | Bug fix, workaround, pattern discovered                   | Problem, Solution, Implementation, Alternatives, Date |
| **Lesson**   | Post-mortem, retrospective finding, project insight       | Situation, Insight, Impact, Action, Date              |

### Dedup Flow

1. Search `docs/solutions/` for existing entries on the same topic
2. If found: compare context and date
   - Existing entry is newer/more complete → skip, link to existing
   - New information supplements → update existing entry
   - Existing is stale/incorrect → archive old, create new
3. If not found: create new entry with unique ID

### Storage

Entries are stored in `docs/solutions/` with the naming pattern:

```
docs/solutions/{type}/{NNN}-{kebab-topic}.md
```

Each entry includes:

- YAML frontmatter with date, type, tags, status
- Structured body with type-specific sections
- Cross-references to related entries and specs

## Usage

Invoke during or after significant project events:

```
Load the knowledge-capture skill.
```

Or trigger automatically during:

- **Archive phase**: Capture decisions and lessons when archiving a spec
- **Code review**: Capture notable solutions discovered during review
- **Post-mortem**: Capture lessons after incidents or milestones

## Integration

### With Archive Phase

When a spec is archived, the knowledge-capture skill saves key decisions and lessons learned to `docs/solutions/`. This ensures project memory persists beyond individual specs.

### With Review

Notable patterns or solutions discovered during code review can be captured for future reference.

## Output

```markdown
---
id: D-003
type: decision
date: 2026-07-29
tags: [architecture, database]
status: active
---

# Decision: Use SQLite for local storage

## Context

The application needs local-first data storage. Options considered: SQLite, IndexedDB, JSON files.

## Decision

Use SQLite via better-sqlite3.

## Rationale

- SQLite is battle-tested, embedded, zero-config
- better-sqlite3 provides synchronous API — simpler than async IndexedDB
- JSON files don't support querying, indexing, or constraints

## Consequences

- Reliable ACID transactions
- Rich query capability via SQL

* Adds native dependency (better to bundle)
* Schema migrations needed for schema changes
```

## Rules

1. Always check for existing entries before creating new ones
2. Tag entries for discoverability (at least one domain tag)
3. Link to related specs, PRs, or issues when applicable
4. One entry per decision/solution/lesson — if it spans types, pick the dominant one
5. Never capture credentials, secrets, or personal information
