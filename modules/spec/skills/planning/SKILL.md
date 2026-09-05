---
name: planning
description: Creates specs and breaks down work into tasks using lightspec, with quick-plan/spec/architecture modes — including vertical-slice decomposition for complex features.
---

# Planning

## Overview

The Planning skill is the sdd plan stage entry — a mode selector. It picks the right planning depth (quick-plan / spec / architecture), executes it, validates with lightspec, and hands off to building. The deep task-decomposition method (dependency graph, vertical slicing, task templates, checkpoints) lives in `planning-and-task-breakdown` — planning references it for the spec/architecture modes.

## How It Works

The skill detects the complexity of the request, selects the appropriate mode, creates a spec or task list, validates with lightspec, and hands off to the building subskill.

**Workflow:**

1. Detect complexity (quick-plan/spec/architecture)
2. Select appropriate mode
3. Create spec or task list
4. Validate with lightspec
5. Hand off to building

## Usage

### Quick-Plan Mode (Lite)

Simple task list for small changes.

**When:** Quick fixes, simple features, bug fixes
**Duration:** 2-5 minutes
**Output:** Task checklist

**Workflow:**

1. Understand the change
2. List tasks (3-5 max)
3. Order by dependency
4. Hand off to building

### Spec Mode (Normal)

Full spec with scenarios for features.

**When:** New features, significant changes
**Duration:** 10-20 minutes
**Output:** lightspec spec

**Workflow:**

1. Read discovery document
2. Create lightspec change
3. Write proposal.md
4. Write tasks.md
5. Write spec.md with scenarios
6. Validate with lightspec

> Complex features (6+ files across layers): use vertical-slice decomposition (see Architecture Mode) for the tasks.md breakdown — slices map to phases 1:1.

### Architecture Mode (Heavy)

Architecture decision records + vertical-slice decomposition for complex changes.

**When:** Major refactoring, architecture decisions, system design, complex multi-component features (6+ files across layers)
**Duration:** 30-60 minutes
**Output:** ADR + vertical-slice plan + lightspec spec

**Workflow:**

1. Read discovery document
2. Analyze architecture implications
3. **Dimension Sweep** — enumerate ambiguities before decomposing: edge cases, configuration options, failure modes, integration points. Settle each as an explicit decision (record in the ADR)
4. **Holistic Decomposition** — define ALL slices, their dependencies, and ordering BEFORE generating any code:
   ```
   Slice 1: {name} — {what this slice delivers}   (foundation)
   Slice 2: {name} — {what this slice delivers}   (depends on 1)
   Slice 3: {name} — {what this slice delivers}   (depends on 1-2)
   ```
   Slice rules:
   - Each slice is a **self-contained end-to-end cross-section** of one concern — types + implementation + wiring (not a horizontal layer)
   - Sized ~512-1024 tokens per slice (maps to one buildable, verifiable unit)
   - Slice ≡ phase: the plan's phases map 1:1 to slices
5. **Developer Checkpoint** — present the decomposition (N slices + ordering + scope) and confirm before finalizing:
   ```
   {N} slices for {feature}:
   Slice 1: {name} (foundation)
   Slices 2-N: {brief}
   Approve? [proceed / adjust slices / change scope]
   ```
6. Write Architecture Decision Record (ADR) — including dimension-sweep decisions
7. Create lightspec change — tasks.md phases map to slices
8. Write detailed spec
9. Validate with lightspec

## Output

Depending on mode: a task checklist, a lightspec spec (proposal.md + tasks.md + spec.md), or an ADR + full spec.

```markdown
## Tasks

- [ ] 1.1 Add dark mode CSS variables
- [ ] 1.2 Add system preference detection
- [ ] 1.3 Add toggle in settings
- [ ] 1.4 Update existing components
```

## Integration

### With Discovery Subskill

```
Discovery → Planning
Input: Discovery document, decisions
Output: Spec or task list
```

### With Building Subskill

```
Planning → Building
Input: Spec or task list
Output: Implementation
```

### With Lightspec

```
lightspec new <id>
lightspec validate <id>
lightspec list
```

## Mode Selection

### Auto-Detect

```
Simple change   → quick-plan
Feature request → spec
Major change    → architecture
```

### Manual Override

```
User: "Just list the tasks"    → quick-plan mode
User: "Write a spec"           → spec mode
User: "Design the architecture" → architecture mode
```

## Present Results

Present the spec or task list to the user for approval before building begins. Highlight key decisions, dependencies, and any open questions.

## Troubleshooting

- **Missing discovery**: If no discovery document exists, prompt the user to complete discovery first, or route to discovery subskill.
- **Validation failures**: Run `lightspec validate --strict` and fix errors before handing off to building.
- **Too many tasks**: Break large task lists into phases. Each phase should be implementable independently.
