---
name: reviewing
agent: code-reviewer
description: Reviews code across five axes (correctness, readability, architecture, security, performance) with ponytail over-engineering check — plus fresh-perspective (blind-spot) and criteria-walk (acceptance verification) review modes.
---

# Reviewing

## Overview

The Reviewing skill is the sdd review entry point — a mode selector. It picks the right review depth/lens for the change (quick / standard / deep-dive / fresh-perspective / criteria-walk), executes it, runs the ponytail over-engineering pass, and hands off to shipping. The deep methodology (five-axis detail, PR triage, change sizing, layered architecture) lives in `code-review-and-quality` — reviewing references it for the standard/deep-dive modes.

## How It Works

The skill detects the complexity of the change, selects the appropriate review mode, executes the review workflow across five axes (per `code-review-and-quality` details), reports findings, and hands off to the shipping subskill.

**Workflow:**

1. Detect complexity (quick-review/standard/deep-dive)
2. Select appropriate mode
3. Execute review workflow
4. Report findings
5. Hand off to shipping

## Usage

### Quick-Review Mode (Lite)

Fast, terse review for simple changes.

**When:** Quick fixes, small changes, PR reviews
**Duration:** 2-5 minutes
**Output:** One-line-per-finding review

**Workflow (quick one-liner style):**

1. Get diff
2. Scan for bugs, risks, nits
3. Output one-liners

**Output:**

```
L42: 🔴 bug: user can be null after .find(). Add guard before .email.
L58: 🟡 risk: no rate limiting on login endpoint.
L67: 🔵 nit: consider using const instead of let.
```

### Standard Mode (Normal)

Balanced review for features.

**When:** New features, significant changes
**Duration:** 10-20 minutes
**Output:** Structured review report

**Workflow (per `code-review-and-quality`):**

1. **Correctness**: Does it work as intended?
2. **Readability**: Is it easy to understand?
3. **Architecture**: Does it fit the system design?
4. **Security**: Are there vulnerabilities?
5. **Performance**: Are there bottlenecks?

For the full five-axis detail, severity labels, PR triage, and change sizing, see `code-review-and-quality`.

**Output:**

```markdown
## Review Report

### Correctness ✅

- Logic is correct
- Edge cases handled

### Readability ⚠️

- Line 42: Complex nested conditionals
- Line 67: Long function (50+ lines)

### Architecture ✅

- Follows existing patterns

### Security ⚠️

- Line 58: No input validation on email

### Performance ✅

- No obvious bottlenecks
```

### Deep-Dive Mode (Heavy)

Comprehensive audit for major changes.

**When:** Major features, refactoring, security-critical
**Duration:** 30-60 minutes
**Output:** Full audit report

**Workflow (per `code-review-and-quality` deep audit + security + performance):**

1. **Code Smells**: Check for design problems
2. **Security Audit**: OWASP Top 10 review
3. **Performance Analysis**: Profiling, bottlenecks
4. **Architecture Review**: System design implications
5. **Documentation**: API docs, ADRs

### Fresh-Perspective Mode (blind-spot)

Review by a fresh reader who did NOT author the change. Catches the inconsistency-class bugs work-authors miss because their mental model is anchored on what they touched — the bugs live in files they didn't.

**When:** pre-merge / pre-ship review of a change set, "fresh eyes", "did I miss anything"

**Anti-trigger:** if you authored the change, decline — fresh perspective requires not having been the author. Suggest another reviewer/agent.

**Workflow:**

1. **Establish the change set** — `git diff <base>...HEAD` (or PR diff); record which files/lines changed
2. **Read the diff fully** — both added and removed lines; the author's mental model is encoded in what they did and didn't change
3. **Read adjacent UNCHANGED files** — for each concept modified in the diff, find files that reference it but were NOT in the diff (grep + `git log -- <file>` to confirm untouched); read them cold. This is where the gap class lives
4. **Read anchoring context** — AGENTS.md conventions, recent commit arc, any active plan
5. **Synthesize the report**

**Gap classes to catch (ranked):**

1. Inconsistency between changed and unchanged files (highest value)
2. Renamed/removed concepts not propagated (stale refs in markdown/comments — tests don't catch)
3. Convention drift — new file follows X, siblings follow Y
4. Missing call sites — new function never invoked; removed function still documented
5. Documentation lag — diff changes behavior, docs still describe old behavior
6. Quality-of-life issues — naming, organization (flag, don't block)

**Report shape:**

```
## Review — <change set>

### What works
<2-4 bullets — design calls that hold up>

### Problems
<severity-ordered; each: file:line, what's wrong, why it matters>

### Biggest risk
<the one thing the author should know before merging>

### Next action
<clear question: draft fix? file deferred items? merge as-is?>
```

Lead with strengths (good faith), then severity-ordered problems with file:line refs — a concern without a line reference is not actionable.

### Criteria-Walk Mode (acceptance verification)

Verify the work against its named acceptance criteria — not the reviewer's taste, the plan's contract.

**When:** post-implementation verification, "walk the criteria", "verify acceptance", before phase close or ship

**Workflow:**

1. **Trust-but-verify the executor's claim** — cross-check status (PLAN.md checkboxes / task report) against `git status -sb` and `git log`; **disk reality wins** on conflict (uncommitted work claimed done = not done; status drifted = disk is truth)
2. **Load the criterion list** — PLAN.md task `(acceptance: ...)` items, or lightspec spec scenarios for the change
3. **Probe what exists on disk** — for each load-bearing path in the criteria: file existence, content references, key artifacts
4. **Walk criterion by criterion** — verdict per item:

| Verdict | Meaning |
|---|---|
| **PASS** | Criterion met; cite file:line evidence |
| **PARTIAL** | Some sub-clauses met, others not; cite which |
| **FAIL** | Criterion not met; cite what's absent |
| **UNVERIFIED** | Can't determine statically (e.g. "tests pass" — run them) |

5. **Produce the table** — the verdict table is the report spine; end with a summary + blockers list

Do not improvise criteria — the plan/spec is the contract the work was bound to; review against it.

## Ponytail-Review Post-Step

### Over-Engineering Audit (After Standard Review)

After completing the standard review, run ponytail-review as a mandatory post-step. Scan every changed line and tag findings:

| Tag       | Meaning                             |
| --------- | ----------------------------------- |
| `delete:` | Code that shouldn't exist           |
| `stdlib:` | Reinventing standard library        |
| `native:` | Native platform already covers this |
| `yagni:`  | You ain't gonna need it             |
| `shrink:` | Can be significantly smaller        |

**Output format — per finding:**

```
L<line>: <tag> <what>. <replacement>.
```

**End with quantified summary:**

```
net: -<N> lines possible.
```

**Example:**

```
L42: yagni: caching layer for one-user app. Remove CacheManager, inline the one call.
L87: stdlib: hand-rolled CSV parser. Use csv-parse from stdlib.
L120: delete: dead code from abandoned feature. Remove renderLegacyDashboard().
net: -67 lines possible.
```

For each finding, reference the first holding rung on the 7-rung ladder that would suffice. Only flag over-engineering — never correctness, security, or performance (those belong in the standard review above).

## Output

A review report with findings categorized by severity (Critical, Required, Optional, Nit), plus a ponytail over-engineering assessment.

## Integration

### With Building Subskill

```
Building → Reviewing
Input: Implemented code
Output: Review report
```

### With Shipping Subskill

```
Reviewing → Shipping
Input: Approved code
Output: Ready to ship
```

### With Lightspec

With task tracking (lite): mark the task reviewed in PLAN.md; (default): the change's tasks.md — `lightspec list` shows active changes.

## Mode Selection

### Auto-Detect

```
Small change   → quick-review
Feature change → standard
Major change   → deep-dive
Fresh eyes / pre-merge → fresh-perspective
Verify acceptance    → criteria-walk
```

### Manual Override

```
User: "Quick look"             → quick-review mode
User: "Full review"            → standard mode
User: "Deep audit"             → deep-dive mode
User: "Check over-engineering" → ponytail review
User: "Fresh eyes on this"     → fresh-perspective mode
User: "Walk the criteria"      → criteria-walk mode
```

## Present Results

Present the review report organized by severity. Lead with blocking issues (correctness, security) first, then structural concerns, then optional suggestions. End with the ponytail over-engineering summary.

## Troubleshooting

- **Defensive author**: If the author disagrees with findings, reference the severity hierarchy: technical facts > style guides > design principles > consistency.
- **Rubber-stamping**: Never approve without evidence of actual review. If the change is too large to review, ask for it to be split.
- **Ponytail overreach**: If the user explicitly needs complexity (e.g., enterprise requirements), note the ponytail finding but defer to the specification.
