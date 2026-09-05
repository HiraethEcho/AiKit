---
name: app-sdd
description: Default workflow guide (lightspec-based). Use when starting a session or task in a lightspec project — routes to the right command, skill, or agent across the workflow (init → clarify → plan → code → review → archive). The four files (SPEC/PLAN/DESIGN/HANDOFF) hold the simple project-level view; per-change detail lives in lightspec/.
---

# App SDD (default workflow guide)

## Overview

The default workflow is spec-driven development built on lightspec. This skill is the workflow entry point: task arrives → identify stage → route to the matching command/skill/agent. The lightspec three stages (proposal → apply → archive) plus sdd hooks (discovery/review/agent-skills linkage) are documented in `lightspec/AGENTS.md` → `## SDD Workflow Layer`.

## The four files (project-level view)

The four files stay simple — per-change detail lives in `lightspec/`:

- **`SPEC.md` — project-level intent source.** Read Goal on every session. Each new change derives its proposal from the relevant What entries (one What, or a What cluster, per change). After archive, append the change's decisions to the SPEC.md Decisions table (decision / choice / rationale / change id). SPEC.md is the persistent what-and-why; `lightspec/` is the per-change how-and-when.
- **`PLAN.md` — project roadmap.** One section per spec/change, phase checkboxes linking the change id; per-change task detail lives in that change's `tasks.md`. `/build` ticks the matching phase box when a change's tasks complete.
- **`DESIGN.md` — design-depth companion (optional).** A change's `design.md` may reference the relevant DESIGN.md section instead of re-deriving the same depth.
- **`HANDOFF.md` — handoff notes.** Written by `/rest` on pause, read by `/pickup` on resume.

## Clarify-stage routing (spec-router content, reference)

Former `spec-router` — no separate invocation needed; pick the clarify path directly:

| Situation                         | Path                                                               |
| --------------------------------- | ------------------------------------------------------------------ |
| Vague idea / unclear reqs         | discovery (grill-me/interview-me) + idea-refine → `/spec` proposal |
| Clear feature / change            | `/spec` directly (spec-proposal)                                   |
| Idea needs refinement before spec | idea-refine → `/spec`                                              |
| Spec exists, need tasks           | planning → `/build`                                                |

## Test-stage routing (test-router content, reference)

Former `test-router` — no separate invocation needed; pick the test path directly:

| Situation                          | Path                                          |
| ---------------------------------- | --------------------------------------------- |
| Write unit/integration tests       | test-driven-development (red-green) → `/test` |
| Browser-based tests                | browser-testing-with-devtools                 |
| Verify implementation against spec | `/build` validation step (building)           |

## Task Routing

```
Task arrives
    │
    ├── New project init? ─────────────→ /init-sdd (create lightspec/ + write SPEC/PLAN + AGENTS.md block)
    ├── New session / pickup? ────────→ /pickup (shared — reads the workflow block + four files)
    ├── Vague idea / unclear reqs? ────→ proposal flow: discovery (grill-me/interview) + idea-refine → /spec
    ├── New feature/change? ───────────→ /spec (spec-proposal → plan-reviewer → validate)
    ├── Approved change, implement? ───→ /build (building)
    │   ├── Coding task? ─────────────→ incremental-implementation
    │   ├── Test task? ───────────────→ test-driven-development
    │   ├── Need context? ────────────→ context-engineering
    │   └── Need doc-verified code? ───→ source-driven-development
    ├── Pause mid-spec / end session? → /rest (shared — park progress, handoff, no archive)
    ├── Phase complete? ───────────────→ /archive (shared — rollup; runs lightspec archive per the workflow block)
    ├── Write/run tests? ──────────────→ /test (test-driven-development)
    ├── Review code? ─────────────────→ /review (reviewing + code-reviewer agent)
    │   ├── Security concerns? ───────→ security-and-hardening
    │   └── Performance concerns? ────→ performance-optimization
    ├── Commit/branch? ───────────────→ git-workflow-and-versioning
    ├── Write docs/ADRs? ─────────────→ documentation-and-adrs
    ├── Multi-agent orchestration? ───→ orchestrator agent (dispatch playbook)
    ├── Simplify / over-engineering? ─→ /code-simplify (ponytail)
    └── Deploy/launch? ───────────────→ /ship (shipping-and-launch)
```

## Lifecycle Sequence (full feature)

```
1. /init-sdd                     → initialize project (one-time)
2. /spec                     → lightspec proposal (discovery interview + plan-reviewer review)
3. /build                    → lightspec apply, route coding skills by task type
4. /test                     → test-driven-development
5. /review                   → reviewing + full code-reviewer pass
6. lightspec validate --strict  → final check
7. /ship                     → release
8. lightspec archive            → archive change (per the workflow block)
9. /pickup                   → pick up from any breakpoint
```

Not every task needs the full flow. A bug fix may only need: debugging-and-error-recovery → test-driven-development → reviewing.

## Working Principles

1. **Check for an applicable skill before starting** — skills encode processes that prevent mistakes
2. **Skills are workflows, not suggestions** — follow steps in order, don't skip verification
3. **Multiple skills can stack** — proposal flow: discovery → idea-refine → spec-proposal → plan-reviewer
4. **When in doubt, start with a spec** — non-trivial task without a spec → spec-proposal
5. **Manage confusion actively** — inconsistent/conflicting/unclear → stop, name the confusion, ask, wait
6. **Push back when warranted** — flag clear problems, quantify the cost, propose alternatives
7. **Enforce simplicity** — fewer lines? do the abstractions earn their complexity? prefer the boring solution
8. **Maintain scope discipline** — touch only what you're asked to touch
9. **Verify, don't assume** — task complete = verification passes (tests/build/runtime evidence), "looks right" is not enough

## Failure Modes to Avoid

1. Making wrong assumptions without checking
2. Plowing ahead when confused
3. Not surfacing inconsistencies you notice
4. Not presenting tradeoffs on non-obvious decisions
5. Being sycophantic to approaches with clear problems
6. Overcomplicating code and APIs
7. Modifying code orthogonal to the task
8. Removing things you don't fully understand
9. Building without a spec because "it's obvious"
10. Skipping verification because "it looks right"

## Skill Rules

1. Check for an applicable skill before starting work
2. Skills are workflows — follow steps in order, don't skip verification steps
3. Multiple skills can apply — a feature might be idea-refine → spec-driven-development (clarify) → spec-proposal → planning → building → test-driven-development → reviewing → shipping-and-launch
4. When in doubt, start with a spec — non-trivial task without a spec → use `spec-proposal`

## Quick Reference

| Phase     | Entry              | Skill / Command                           | Summary                                      |
| --------- | ------------------ | ----------------------------------------- | -------------------------------------------- |
| Init      | `/init-sdd`        | —                                         | create lightspec/ + write four-file layer    |
| Proposal  | `/spec`            | spec-proposal + discovery + plan-reviewer | clarify → spec → review → validate           |
| Plan      | `/plan`            | planning                                  | roadmap + change scaffold                    |
| Apply     | `/build`           | building + incremental-implementation     | route coding skills by task type             |
| Test      | `/test`            | test-driven-development                   | red-green                                    |
| Review    | `/review`          | reviewing + code-reviewer                 | five-axis + full pass                        |
| Ship      | `/ship`            | shipping-and-launch                       | launch checklist + rollback                  |
| Archive   | `/archive`         | archive                                   | rollup; runs `lightspec archive` per block   |
| Rest      | `/rest`            | rest                                      | park progress + handoff, no archive          |
| Pickup    | `/pickup`          | pickup                                    | progress + next step                         |
| Upgrade   | `/upgrade`         | upgrade                                   | lite → default (one-time migration)          |
| Simplify  | `/code-simplify`   | ponytail                                  | minimal-code review                          |

Skills are invoked by name (e.g. `building`, `reviewing`); agents by persona name (e.g. `builder`, `code-reviewer`).
