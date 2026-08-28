---
name: ponytail-debt
agent: code-reviewer
description: Harvest ponytail comments into a debt ledger — track intentional simplifications
---

# Ponytail Debt

## Overview

The ponytail-debt skill searches the repository for `// ponytail:` and `# ponytail:` comment markers and builds a ledger. This ensures deferrals don't rot — every intentional simplification is tracked and can be revisited.

## How It Works

1. Grep the entire repo for `// ponytail:` and `# ponytail:` markers (excluding node_modules, .git, dist)
2. Parse each marker into: file, line, ceiling, upgrade path
3. Flag markers with no upgrade path as `no-trigger`
4. Present as a table

## Output Format

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

## Usage

```
/ponytail-debt
```

Run periodically (e.g., before releases) to check if any ponytail deferrals are now due.

## Rules

1. Only process comment markers — not code
2. Flag markers missing an upgrade path
3. Suggest revisiting `no-trigger` entries when the relevant code area changes
