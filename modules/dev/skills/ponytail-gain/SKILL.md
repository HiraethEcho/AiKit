---
name: ponytail-gain
agent: code-reviewer
description: Display ponytail benchmark scoreboard — LOC, cost, and speed improvements from published data
---

# Ponytail Gain

## Overview

The ponytail-gain skill displays published benchmark results showing the impact of the ponytail methodology.

## Published Benchmarks

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

## Usage

```
/ponytail-gain
```

## Rules

1. Never print per-repo savings — there's no baseline to subtract from
2. Always reference published benchmark data
3. Note that results vary by codebase and task type
