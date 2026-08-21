---
name: spec-proposal
agent: planner
description: Scaffolds a new sdd change proposal — clarifies requirements, writes proposal/design/tasks/spec deltas, reviews with plan-reviewer, validates. The lightspec workflow's clarify-to-proposal entry — use for new features, changes, or any non-trivial work before implementation.
---

# Spec Proposal

The default workflow's clarify → proposal stage. Turns a request into a validated change proposal under `lightspec/changes/<id>/` — without writing any code.

## Boundaries

**This skill MAY:** run `lightspec` CLI read commands, read code/docs, ask clarifying questions, write proposal.md / design.md / tasks.md / spec deltas.
**This skill MAY NOT:** write implementation code, run `lightspec apply`, edit files outside the change directory, archive.

**Do not write code during this stage. Proposals only — implementation happens after approval.**

## Phase 0: Clarify

**Entry:** User has a request — new feature, change, or vague idea.

If the request is vague or ambiguous, run a clarification pass first:
- Use `discovery` skill modes (explore/brainstorm/deep-dive) to surface requirements, priorities, boundaries
- Use `idea-refine` when the idea needs convergence before it can be specified
- Ask follow-up questions until the change is concrete. Never assume unstated requirements

If the request is already concrete, skip to Phase 1.

**Exit:** The change's scope, outcomes, and boundaries are clear.

## Phase 1: Ground in current state

**Entry:** Scope clear.

1. Run `lightspec list` and `lightspec list --specs` — know existing changes and specs
2. Inspect related code/docs (`rg`, `ls`, read) so the proposal aligns with implementation reality
3. Search existing requirements: `rg -n "Requirement:|Scenario:" lightspec/specs` before writing new ones

**Exit:** Proposal is grounded; no duplicate change exists.

## Phase 2: Scaffold

**Entry:** Grounding done.

1. Choose a unique verb-led `change-id` (e.g. `add-rate-limiting`)
2. Create `lightspec/changes/<id>/` with:
   - `proposal.md` — Goal, Why, What Changes, Out of Scope, Impact
   - `tasks.md` — ordered, small, verifiable work items with validation and dependencies
   - `design.md` — only when the solution spans systems, introduces patterns, or needs trade-off discussion
3. Break multi-scope efforts into distinct spec deltas with clear sequencing

**Exit:** Change skeleton exists.

## Phase 3: Write spec deltas

**Entry:** Skeleton exists.

For each capability: `lightspec/changes/<id>/specs/<capability>/spec.md` (one folder per capability):

```
## Purpose
[why this capability]

## ADDED|MODIFIED|REMOVED Requirements
### Requirement: <name>
[what must be true, SHALL language]

#### Scenario: <name>
Given [state], when [action], then [observable result].
```

- Every requirement has ≥1 scenario
- Scenarios are executable — a fresh agent could verify them
- Cross-reference related capabilities when relevant

**Exit:** All capabilities have spec deltas with scenarios.

## Phase 4: Plan-reviewer pass

**Entry:** Deltas drafted.

Review with the `plan-reviewer` agent: scope tightness, missing requirements, scenario coverage, sequencing. Incorporate feedback.

**Exit:** Proposal incorporates review feedback.

## Phase 5: Validate

**Entry:** Feedback incorporated.

1. Run `lightspec validate <id> --strict --no-interactive`
2. Resolve every issue before sharing
3. Present the proposal to the user for approval

**Exit:** Validation passes; user decides approve / revise / reject.

## Output

```
lightspec/changes/<id>/
├── proposal.md
├── tasks.md
├── design.md          (when needed)
└── specs/<capability>/spec.md
```

## Rules

1. Proposals only — no implementation code in this stage
2. One change-id per concern; split multi-scope into separate deltas
3. Every requirement has an executable scenario
4. Don't assume unstated requirements — ask
5. Validation must pass before presenting to the user
