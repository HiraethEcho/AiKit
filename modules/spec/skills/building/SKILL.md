---
name: building
description: Implements code in thin vertical slices with quality checks, ponytail minimal code philosophy, and quick-fix/incremental/tdd/plan-driven modes — including plan execution, mismatch handling, and acceptance validation.
---

# Building

## Overview

The Building subskill merges incremental-implementation, test-driven-development, and ponytail into a unified building workflow. It implements code precisely, applies minimal code philosophy, verifies with tests, and hands off to reviewing.

## How It Works

The skill detects the complexity of the task, selects the appropriate mode, implements changes in thin slices, verifies each slice with tests, and hands off to the reviewing subskill.

**Workflow:**

1. Detect complexity (quick-fix/incremental/tdd)
2. Select appropriate mode
3. Implement changes (with ponytail pre-check)
4. Verify with tests
5. Hand off to reviewing

## Usage

### Quick-Fix Mode (Lite)

Minimal changes for simple fixes.

**When:** Bug fixes, typos, simple updates
**Duration:** 2-10 minutes
**Output:** Fixed code

**Workflow:**

1. Understand the fix
2. Make minimal change
3. Verify it works
4. Commit

### Incremental Mode (Normal)

Thin vertical slices for features.

**When:** New features, significant changes
**Duration:** 30-120 minutes
**Output:** Working feature

**Workflow (incremental-implementation):**

1. **Slice**: Break into thin vertical slices
2. **Implement**: One slice at a time
3. **Test**: Write tests for each slice
4. **Verify**: Run tests after each slice
5. **Commit**: Atomic commit after each slice

**Example:**

```
Feature: Dark Mode

Slice 1: CSS variables
- Implement: Create theme.css with variables
- Test: Verify variables are defined
- Commit: "Add dark mode CSS variables"

Slice 2: System detection
- Implement: Add prefers-color-scheme detection
- Test: Verify system preference is detected
- Commit: "Add system preference detection"
```

### TDD Mode (Heavy)

Test-driven development for complex features.

**When:** Critical features, complex logic
**Duration:** 1-4 hours
**Output:** Tested implementation

**Workflow (test-driven-development):**

1. **Red**: Write failing test
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code while tests pass
4. **Repeat**: Continue until feature complete

**Example:**

```
Feature: JWT Authentication

Test 1: Should validate token format
- Red: Write test for token validation
- Green: Add basic validation
- Refactor: Clean up validation logic

Test 2: Should check token expiration
- Red: Write test for expiration check
- Green: Add expiration check
- Refactor: Extract validation service
```

### Plan-Driven Mode (lite + default)

Plan-driven execution when a plan already exists — `PLAN.md` (lite workflow) or `lightspec/changes/<id>/tasks.md` (lightspec workflow). The plan is the contract; your job is to execute it faithfully while adapting to what you find.

**Workflow:**

1. **Read the plan fully** — phases, tasks, checkboxes, acceptance criteria. Understand dependencies before touching code.
2. **Find the next unfinished item** — first unchecked `- [ ]` in the current phase.
3. **Trust completed checkmarks** — work marked `- [x]` is done; don't re-verify unless something seems off.
4. **Implement phase by phase** — finish an in-scope phase before starting the next; adapt to codebase reality while honoring the plan's intent.
5. **Verify each phase before advancing** — run that phase's acceptance criteria (see Validation); fix failures before moving on.
6. **Update the plan** — tick checkboxes as you complete tasks, using Edit on the plan file itself.

**Resuming:** if the plan has existing checkmarks, pick up from the first unchecked item. Trust prior completion; verify only what seems off.

**When the plan scopes you to a single phase:** stop immediately after that phase's checks pass — do not advance to other phases.

### Mismatch Handling

Plans are carefully designed, but reality is messy. When the plan can't be followed — codebase evolved, assumptions wrong, phase impossible — do not silently diverge:

1. **STOP** and think about why the plan can't be followed.
2. **Present the issue clearly:**
   ```
   Issue in Phase {N}:
   Expected: {what the plan says}
   Found: {actual situation}
   Why this matters: {explanation}
   ```
3. **Offer three options** and let the user pick:
   - **Follow the plan** — adapt the plan's approach to the current code state
   - **Skip this change** — move on; it may not be needed
   - **Update the plan** — the plan needs revision before continuing (see Plan Revision below)
4. Only after the user decides, continue.

## Ponytail Integration

### Pre-Check (Before Each Slice)

Before implementing each slice, check the active ponytail level (read `.ponytail-mode` or `/ponytail` with no args). Then evaluate the 7-rung ladder and stop at the first holding rung:

1. **YAGNI** — Does this need to exist at all?
2. **Reuse** — Already in this codebase? Reuse it.
3. **Stdlib** — Standard library does it? Use it.
4. **Native** — Native platform feature covers it? Use it.
5. **Installed dep** — Already-installed dependency solves it? Use it.
6. **One-liner** — Can this be one line? One line.
7. **Minimum** — Only then: write the minimum code that works.

### Intensity Levels

| Level     | Behavior                                                    |
| --------- | ----------------------------------------------------------- |
| **lite**  | Build what's asked, name the lazier alternative in one line |
| **full**  | The ladder enforced (default)                               |
| **ultra** | YAGNI extremist. Deletion before addition.                  |

Set via `/ponytail [lite|full|ultra|off]`.

### Ponytail Comment Convention

Mark every deliberate simplification with a `ponytail:` comment naming the ceiling and upgrade path:

```typescript
// ponytail: simple object instead of class, add interface if 3+ shapes
const config = { dark: "#000", light: "#fff" };

// ponytail: native Date instead of moment.js, switch if timezone math needed
const now = new Date();
```

### Never Lazy About

Understanding the problem, input validation at trust boundaries, error handling that prevents data loss, security, accessibility, hardware calibration.

## Output

Working code that matches the spec, with passing tests and ponytail-compliant minimal implementations.

## Verification

### After Each Slice

```bash
# Run tests
npm test

# Check types
tsc --noEmit

# Verify lint
eslint .
```

### After All Slices

```bash
# Full test suite
npm test

# Coverage check
npm run coverage

# Build verification
npm run build
```

## Validation (plan acceptance)

When working plan-driven, slice verification is not enough — each task's acceptance criteria must be checked against the working tree. This is the end-of-plan discipline that turns "looks right" into "verified".

**How:**

1. **Read acceptance criteria from the plan** — each task's `(acceptance: ...)` in PLAN.md, or the scenario/acceptance notes in lightspec tasks.md. The plan encodes the right commands per project; do not hardcode project-specific build tools here.
2. **Run each task's criteria** — e.g. the plan says `npm run check`, run that; another project may need `cargo test` or `pytest`. Follow the plan.
3. **Produce a validation report:**
   ```
   ## Validation report
   Verdict: pass | fail
   Tasks checked: n/m
   Deviations:
   - [task] expected X, found Y
   ```
4. **Fix failures before moving on** — a failing acceptance criterion blocks the phase, not just the slice.
5. **Plan-level gaps escalate** — if findings imply the plan itself is wrong (missing phases, wrong approach, untestable criteria), don't patch around it: revise the plan (below), then re-implement, then re-validate.

Cross-reference: this complements the per-slice Verification above — slices verify incrementally; Validation closes the loop against the plan's acceptance contract.

## Plan Revision (surgical)

When review feedback, mid-implementation discoveries, or new constraints require plan changes, revise surgically — preserve structure and quality, don't rewrite.

**How:**

1. **Identify the delta** — the specific phases/tasks the feedback touches.
2. **Ground in reality** — verify claims against the actual codebase before changing the plan; don't edit on assertion alone.
3. **Edit minimally** — adjust the affected task/phase (scope, ordering, acceptance criteria); keep the rest untouched.
4. **Sync** — update dependent phases (dependencies/ordering) and re-validate the changed acceptance criteria.
5. **Resume** — hand the revised plan back to plan-driven execution from the first unchecked item.

## Integration

### With Planning Subskill

```
Planning → Building
Input: Spec or task list
Output: Implementation
```

### With Reviewing Subskill

```
Building → Reviewing
Input: Implemented code
Output: Code review
```

### With Lightspec

```
lightspec update <id> --task <task-id> --status done
```

## Mode Selection

### Auto-Detect

```
Simple fix      → quick-fix
Feature request → incremental
Complex logic   → tdd
Plan exists     → plan-driven (PLAN.md / tasks.md)
```

### Manual Override

```
User: "Just fix this"          → quick-fix mode
User: "Implement incrementally" → incremental mode
User: "Use TDD"                → tdd mode
User: "Be lazy"                → incremental mode + ponytail
```

## Present Results

Report what was implemented, which mode was used, verification results, and any ponytail simplifications applied. Highlight areas where ponytail comments were added.

## Troubleshooting

- **Test failures**: If tests fail after implementation, fix them before moving to the next slice. Never leave broken tests.
- **Plan mismatch**: Plan says X, code reality is Y — stop, present Expected/Found/Why, offer Follow/Skip/Update (see Mismatch Handling). Never silently diverge.
- **Acceptance fails at phase end**: A task's acceptance criterion fails — fix it, or if the criterion is wrong/unreachable, revise the plan surgically (see Plan Revision), then re-validate.
- **Plan itself seems wrong**: Don't patch around it — revise the plan, re-implement, re-validate.
- **Slice too large**: If a slice takes more than 30 minutes, break it into smaller slices.
- **Ponytail override**: If the user explicitly asks for a complex solution, document the override with a `ponytail: override - reason` comment.
