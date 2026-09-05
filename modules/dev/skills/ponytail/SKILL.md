---
name: ponytail
description: Minimal code philosophy — 7-rung ladder, intensity levels, comment convention, plus audit / debt / gain / help / review workflows
---

# Ponytail — Minimal Code Philosophy

## Overview

Ponytail is a minimal-code methodology that enforces disciplined laziness. Before writing any code, climb the 7-rung ladder and stop at the first rung that holds. The result is code that is just enough — nothing more.

## The 7-Rung Ladder

The ladder runs _after_ you understand the problem, not instead of it. Read the task, trace the real flow end to end, then climb:

1. **YAGNI** — Does this need to exist at all? If not, stop.
2. **Reuse** — Already in this codebase? Reuse it.
3. **Stdlib** — Standard library does it? Use it.
4. **Native** — Native platform feature covers it? Use it.
5. **Installed dep** — Already-installed dependency solves it? Use it.
6. **One-liner** — Can this be one line? One line.
7. **Minimum** — Only then: write the minimum code that works.

## Intensity Levels

| Level     | Behavior                                                             |
| --------- | -------------------------------------------------------------------- |
| **lite**  | Build what's asked, name the lazier alternative in one line          |
| **full**  | The ladder enforced — stdlib and native first (default)              |
| **ultra** | YAGNI extremist. Deletion before addition. Challenge the requirement |

## Never Lazy About

- Understanding the problem
- Input validation at trust boundaries
- Error handling that prevents data loss
- Security, accessibility, hardware calibration
- Anything explicitly requested

## Comment Convention

Mark intentional simplifications so they are not mistaken for ignorance:

```
// ponytail: <ceiling>, <upgrade path>
# ponytail: <ceiling>, <upgrade path>
```

Examples:

- `// ponytail: 3 lines beats a dependency`
- `// ponytail: global lock, per-account locks if throughput matters`
- `// ponytail: this exists`

The Debt workflow harvests these markers into a ledger and flags markers with no upgrade path as `no-trigger`.

## Usage

Bare `/ponytail [lite|full|ultra|off]` sets the intensity level (no argument = report current). Subcommands: `/ponytail audit|debt|gain|help|review`.

## Rules

1. No unrequested abstractions, no boilerplate, no scaffolding "for later"
2. Deletion over addition, boring over clever, fewest files possible
3. Shortest working diff wins — but only after understanding the problem
4. Bug fix = root cause, not symptom (fix shared function once)
5. Mark intentional simplifications with `ponytail:` comment naming ceiling + upgrade path
6. Between two same-size stdlib options, pick the edge-case-correct one
7. Non-trivial logic leaves ONE runnable check (assert-based self-test or one small test file)

## Audit

Repo-wide over-engineering scan. Same tags as Review, but across all files and ranked by biggest potential cut first.

Walk every source file in the repository and identify:

1. Unused code, dead code paths
2. Over-abstracted patterns (factories, strategies, adapters for single use)
3. Dependencies that could be replaced by stdlib or native features
4. Boilerplate that could be one-liners
5. Scaffolding "for later" that was never used

End with:

```
net: -<N> lines, -<M> deps possible.
```

Use when you want a systematic reduction pass across the whole project.

Rules:

1. Exclude vendored, generated, and third-party code
2. One finding per over-engineering pattern (not per occurrence)
3. Be conservative in estimates — count only what can clearly be removed

## Debt

Harvest `// ponytail:` and `# ponytail:` comment markers into a debt ledger so deferrals don't rot.

1. Grep the entire repo for `// ponytail:` and `# ponytail:` markers (excluding node_modules, .git, dist)
2. Parse each marker into: file, line, ceiling, upgrade path
3. Flag markers with no upgrade path as `no-trigger`
4. Present as a table

Output format:

```
| File | Line | Ceiling | Upgrade Path | Status |
|------|------|---------|-------------|--------|
| src/app.ts | 42 | 3 lines beats a dep | use zod | tracked |
| src/utils.ts | 87 | global lock | per-account locks | no-trigger |
```

End with:

```
<N> markers, <M> with no trigger.
```

Run periodically (e.g., before releases) to check if any deferrals are now due.

Rules:

1. Only process comment markers — not code
2. Flag markers missing an upgrade path
3. Suggest revisiting `no-trigger` entries when the relevant code area changes

## Gain

Display published benchmark results showing the impact of the ponytail methodology.

### LOC Reduction

```
no-skill   ████████████████████████████████████████████████ 100%
ponytail   ██████▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  6-20%
```

Down 80-94% on over-build traps, ~0% on already-minimal code.

### Cost Reduction

```
no-skill   ████████████████████████████████████████████████ 100%
ponytail   ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░ 23-53%
```

Down 47-77%.

### Speed Improvement

```
no-skill   1x
ponytail   ██████████████████████░░░░░░░░░░░░░░░░░░░░░░░ 3-6x
```

Rules:

1. Never print per-repo savings — there's no baseline to subtract from
2. Always reference published benchmark data
3. Note that results vary by codebase and task type

## Help

Quick reference card.

### The 7-Rung Ladder

1. **YAGNI** — Does this need to exist at all?
2. **Reuse** — Already in this codebase?
3. **Stdlib** — Standard library does it?
4. **Native** — Native platform feature covers it?
5. **Installed dep** — Already-installed dependency solves it?
6. **One-liner** — Can this be one line?
7. **Minimum** — Only then: write the minimum code.

### Intensity Levels

| Level   | Behavior                                        |
| ------- | ----------------------------------------------- |
| `lite`  | Build what's asked, name the lazier alternative |
| `full`  | The ladder enforced (default)                   |
| `ultra` | YAGNI extremist. Challenge the requirement      |

### Commands

| Command            | Purpose                          |
| ------------------ | -------------------------------- |
| `/ponytail`        | Set level or report current      |
| `/ponytail audit`  | Audit whole repo                 |
| `/ponytail debt`   | Harvest `ponytail:` comments     |
| `/ponytail gain`   | Show benchmark scoreboard        |
| `/ponytail help`   | This reference                   |
| `/ponytail review` | Review diff for over-engineering |

### Deactivation

```
/ponytail off
```

### Comment Convention

```
// ponytail: <ceiling>, <upgrade path>
```

## Review

Examines the current uncommitted diff (or recent commits) specifically for over-engineering. Does NOT check correctness, security, or performance — those belong to the standard review skill.

Scan every changed line and tag over-engineering findings:

| Tag       | Meaning                                         |
| --------- | ----------------------------------------------- |
| `delete:` | Code that shouldn't exist                       |
| `stdlib:` | Reinventing standard library or native platform |
| `native:` | Native platform feature already covers this     |
| `yagni:`  | You ain't gonna need it                         |
| `shrink:` | Can be significantly smaller                    |

Output format:

```
L<line>: <tag> <what>. <replacement>.
```

Example:

```
L42: yagni: caching layer for one-user app. Remove CacheManager, inline the one call.
L87: stdlib: hand-rolled CSV parser. Use csv-parse from stdlib.
```

End with:

```
net: -<N> lines possible.
```

Run after standard code review as a post-step, or standalone when you want a focused over-engineering check.

Rules:

1. Only flag over-engineering — never correctness, security, or performance
2. Be specific: include line number, what's wrong, and the replacement
3. Quantify the savings when possible
