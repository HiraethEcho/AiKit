---
name: ponytail-help
agent: code-reviewer
description: Quick reference card for ponytail — levels, commands, and the 7-rung ladder
---

# Ponytail Help

## Quick Reference

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
| `/ponytail-review` | Review diff for over-engineering |
| `/ponytail-audit`  | Audit whole repo                 |
| `/ponytail-debt`   | Harvest `ponytail:` comments     |
| `/ponytail-gain`   | Show benchmark scoreboard        |
| `/ponytail-help`   | This reference                   |

### Deactivation

```
/ponytail off
```

### Comment Convention

```
// ponytail: <ceiling>, <upgrade path>
```
