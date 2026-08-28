---
name: ponytail-audit
agent: code-reviewer
description: Audit entire repository for over-engineering opportunities, ranked by cut potential
---

# Ponytail Audit

## Overview

The ponytail-audit skill scans the entire codebase for over-engineering. It uses the same tagging system as ponytail-review but across all files, returning findings ranked by biggest potential reduction first.

## How It Works

Walk every source file in the repository and identify:

1. Unused code, dead code paths
2. Over-abstracted patterns (factories, strategies, adapters for single use)
3. Dependencies that could be replaced by stdlib or native features
4. Boilerplate that could be one-liners
5. Scaffolding "for later" that was never used

## Output Format

Same tags as ponytail-review, but findings are ranked by estimated line savings (biggest first).

End with:

```
net: -<N> lines, -<M> deps possible.
```

## Usage

```
/ponytail-audit
```

Use when you want a systematic reduction pass across the whole project.

## Rules

1. Exclude vendored, generated, and third-party code
2. One finding per over-engineering pattern (not per occurrence)
3. Be conservative in estimates — count only what can clearly be removed
