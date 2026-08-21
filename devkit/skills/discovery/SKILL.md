---
name: discovery
agent: orchestrator
description: Understands user demands through structured exploration — explore/brainstorm/deep-dive modes — before planning begins.
---

# Discovery

## Overview

The Discovery subskill merges brainstorm, grill-me, and interview-me into a unified discovery workflow. It understands user demands, explores the problem space, documents decisions, and hands off to planning.

## How It Works

The skill detects the complexity of the request and selects the appropriate mode. It executes the discovery workflow, documents findings, and hands off to the planning subskill.

**Workflow:**

1. Detect complexity (lightweight/standard/heavy)
2. Select mode (explore/brainstorm/deep-dive)
3. Execute discovery workflow
4. Document findings
5. Hand off to planning

## Usage

### Explore Mode (Lite)

Quick discovery for simple tasks.

**When:** "I want to add X", "Fix Y", simple changes
**Duration:** 2-5 minutes
**Output:** Decision summary

**Workflow:**

1. Ask clarifying questions (3-5 max)
2. Identify constraints
3. Document decision
4. Hand off to planning

**Example:**

```
User: "Add dark mode"
Agent: Quick questions:
1. What colors? (light/dark/custom)
2. Where? (whole app/selected pages)
3. Toggle or system preference?
User: System preference, whole app
Agent: Decision: System-wide dark mode using CSS variables
```

### Brainstorm Mode (Normal)

Standard discovery for features.

**When:** "Explore approaches", "What should we build?", new features
**Duration:** 10-20 minutes
**Output:** Discovery document

**Workflow (7 phases):**

1. **Reframe the Problem**: What are we actually solving? First question is intent-only — before any codebase probe
2. **Research**: Check existing code and patterns
3. **Explore Approaches**: 2-3 options — **mandated comparison shape**: for each option pros / cons / trade-offs, then a recommended path with why
4. **Assumption Audit**: Why do we believe this?
5. **Decision Capture**: What did we choose and why?
6. **Doubt-Driven Check**: before handoff, run a fresh-context challenge biased to disprove — surface assumptions that hardened into "facts" during the session ("we assume users prefer X" — verified or inherited?); cross-examine correctness-critical decisions (branching, boundaries, invariants, irreversible choices). One sharp question per decision is enough.
7. **Open Questions**: What's still unclear?
8. **Next Steps**: Hand off to planning

**Solution comparison shape (step 3 output):**

```
| Option | Pros | Cons | Trade-offs |
|---|---|---|---|
| A | ... | ... | ... |
| B | ... | ... | ... |

Recommended: A — <why, one sentence>
```

Use this shape whenever the user is weighing approaches ("what are the options", "compare approaches", "how should we approach X").

### Deep-Dive Mode (Heavy)

Comprehensive discovery for complex changes.

**When:** Major features, architecture decisions, refactoring
**Duration:** 30-60 minutes
**Output:** Full discovery document with research

**Workflow:**

1. **Problem Reframing**: Deep understanding of root cause — first question intent-only, before probing
2. **Research**: Codebase analysis, pattern research
3. **Approach Exploration**: 3-4 options with detailed tradeoffs — same mandated comparison shape (option | pros | cons | trade-offs + recommended path with why)
4. **Assumption Audit**: Recursive "why" loop
5. **Stakeholder Analysis**: Who is affected?
6. **Risk Assessment**: What could go wrong?
7. **Decision Capture**: Detailed rationale
8. **Doubt-Driven Check**: fresh-context adversarial review — materialize a skeptical pass over the recorded decisions: which assumptions became "facts" mid-session? which choices are correctness-critical (branching, boundaries, invariants, irreversible) and deserve one disproving probe each? Fix what survives the challenge; document what doesn't
9. **Architecture Implications**: How does this affect system design?
10. **Open Questions**: Comprehensive list
11. **Next Steps**: Detailed handoff to planning

### Research Mode (structured codebase research)

Answer structured research questions about the codebase before designing. Distinct from the other modes: they clarify WHAT to build; this answers HOW the codebase works.

**When:** "research X", "how does Y work", architecture/behavior questions before designing changes
**Output:** Research document with evidence-backed answers

**Workflow:**

1. **Formulate research questions** — break the user's prompt into 2-5 specific, answerable questions ("how is auth wired", "where does the payment flow terminate", "what calls component X")
2. **Intent-first**: ask the user to confirm the questions before probing — the intent is settled before any codebase exploration
3. **Dispatch targeted parallel probes** — one probe per question: `codebase-locator` (find files), `codebase-analyzer` (read/interpret), `codebase-pattern-finder` (similar patterns), or direct read/grep; run independent probes in parallel
4. **Synthesize findings** — merge probe outputs into a research document:
   ```
   ## Research: <topic>

   ### Q1: <question>
   Finding: <answer with file:line evidence>

   ### Q2: <question>
   Finding: ...

   ### Gaps
   - <what couldn't be determined statically>
   ```
5. **Hand off** — research doc feeds planning (cluster 2) or building; unresolved questions surface explicitly

Every finding needs a file:line reference or it's not a finding. Gaps are honest — don't guess to fill them.

## Output

A discovery document containing: problem statement, context, chosen approach with rationale, design decisions, open questions, and next steps.

```markdown
# Discovery: Dark Mode

## Problem Statement

Users need a dark mode option for better visibility in low-light environments.

## Context

- Current app uses hardcoded light theme
- CSS variables already in place
- No system preference detection

## Chosen Approach

System-wide dark mode using CSS variables and prefers-color-scheme media query.

## Key Design Decisions

1. Use CSS variables for theme switching
2. Detect system preference via media query
3. Allow manual override with localStorage

## Next Steps

→ /plan: Create spec for dark mode implementation
```

## Integration

### With Code Router

```
Code Router → Discovery
Input: User intent, context
Output: Discovery document, handoff to planning
```

### With Planning Subskill

```
Discovery → Planning
Input: Discovery document, decisions
Output: Spec, task breakdown
```

### With Lightspec

```
lightspec new <id>
lightspec validate <id>
```

## Mode Selection

### Auto-Detect

```
Simple request  → explore mode
Feature request → brainstorm mode
Major change    → deep-dive mode
```

### Manual Override

```
User: "Let's brainstorm this"  → brainstorm mode
User: "Quick question"         → explore mode
User: "Deep analysis"          → deep-dive mode
```

## Present Results

Present the discovery document or decision summary to the user. Highlight key decisions and open questions that need their input before proceeding to planning.

## Troubleshooting

- **Too many questions**: Keep the explore mode to 3-5 clarifying questions. If more depth is needed, suggest brainstorm mode.
- **User is impatient**: Use explore mode and document decisions quickly. Deep-dive only for complex changes.
- **Missing context**: Check existing specs and codebase before starting discovery.
