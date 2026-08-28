---
name: ponytail-review
agent: code-reviewer
description: Review current diff for over-engineering — produces a delete-list with tagged findings
---

# Ponytail Review

## Overview

The ponytail-review skill examines the current uncommitted diff (or recent commits) specifically for over-engineering. It does NOT check correctness, security, or performance — those are handled by the standard review skill.

## How It Works

Scan every changed line and tag over-engineering findings:

| Tag       | Meaning                                         |
| --------- | ----------------------------------------------- |
| `delete:` | Code that shouldn't exist                       |
| `stdlib:` | Reinventing standard library or native platform |
| `native:` | Native platform feature already covers this     |
| `yagni:`  | You ain't gonna need it                         |
| `shrink:` | Can be significantly smaller                    |

## Output Format

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

## Usage

```
/ponytail-review
```

Run after standard code review as a post-step, or standalone when you want a focused over-engineering check.

## Rules

1. Only flag over-engineering — never correctness, security, or performance
2. Be specific: include line number, what's wrong, and the replacement
3. Quantify the savings when possible
