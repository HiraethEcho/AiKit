---
name: ponytail
agent: code-reviewer
description: Minimal code philosophy — the 7-rung ladder, intensity levels, and comment convention for avoiding over-engineering
---

# Ponytail — Minimal Code Philosophy

## Overview

Ponytail is a minimal-code methodology that enforces disciplined laziness. Before writing any code, climb the 7-rung ladder and stop at the first rung that holds. The result is code that is just enough — nothing more.

## How It Works

### The 7-Rung Ladder

The ladder runs _after_ you understand the problem, not instead of it. Read the task, trace the real flow end to end, then climb:

1. **YAGNI** — Does this need to exist at all? If not, stop.
2. **Reuse** — Already in this codebase? Reuse it.
3. **Stdlib** — Standard library does it? Use it.
4. **Native** — Native platform feature covers it? Use it.
5. **Installed dep** — Already-installed dependency solves it? Use it.
6. **One-liner** — Can this be one line? One line.
7. **Minimum** — Only then: write the minimum code that works.

### Intensity Levels

| Level     | Behavior                                                             |
| --------- | -------------------------------------------------------------------- |
| **lite**  | Build what's asked, name the lazier alternative in one line          |
| **full**  | The ladder enforced — stdlib and native first (default)              |
| **ultra** | YAGNI extremist. Deletion before addition. Challenge the requirement |

### Never Lazy About

- Understanding the problem
- Input validation at trust boundaries
- Error handling that prevents data loss
- Security, accessibility, hardware calibration
- Anything explicitly requested

## Usage

Invoke the `ponytail` skill before any implementation:

```
/ponytail [lite|full|ultra|off]
```

When no argument is given, reports current level. Set level before starting work to guide all subsequent code generation.

## Ponytail: Comment Convention

Mark intentional simplifications so they are not mistaken for ignorance:

```
// ponytail: <ceiling>, <upgrade path>
# ponytail: <ceiling>, <upgrade path>
```

Examples:

- `// ponytail: 3 lines beats a dependency`
- `// ponytail: global lock, per-account locks if throughput matters`
- `// ponytail: this exists`

The `ponytail-debt` skill harvests these markers into a ledger and flags markers with no upgrade path as `no-trigger`.

## Integration

### In Building Skill

Before implementing each slice, evaluate the 7-rung ladder. Use the first holding rung. Mark deliberate simplifications with `ponytail:` comments.

### In Reviewing Skill

After standard review, run ponytail-review to check for over-engineering. Produce a delete-list with tagged findings.

## Sub-skills

| Skill           | Function                                 |
| --------------- | ---------------------------------------- |
| ponytail-review | Review current diff for over-engineering |
| ponytail-audit  | Audit whole repo for over-engineering    |
| ponytail-debt   | Harvest `ponytail:` markers into ledger  |
| ponytail-gain   | Show benchmark scoreboard                |
| ponytail-help   | Quick reference card                     |

## Rules

1. No unrequested abstractions, no boilerplate, no scaffolding "for later"
2. Deletion over addition, boring over clever, fewest files possible
3. Shortest working diff wins — but only after understanding the problem
4. Bug fix = root cause, not symptom (fix shared function once)
5. Mark intentional simplifications with `ponytail:` comment naming ceiling + upgrade path
6. Between two same-size stdlib options, pick the edge-case-correct one
7. Non-trivial logic leaves ONE runnable check (assert-based self-test or one small test file)
