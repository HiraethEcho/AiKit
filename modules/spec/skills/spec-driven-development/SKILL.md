---
name: spec-driven-development
description: Clarifies requirements and produces a concrete spec — SPEC.md (lite workflow) or a lightspec proposal (lightspec workflow). The sdd clarify stage's specification engine — use when requirements are unclear, ambiguous, or exist only as a vague idea, before planning begins.
---

# Spec-Driven Development

The sdd clarify stage's specification engine. Turns a vague idea or unclear request into a concrete, verified spec — the shared source of truth between you and the human engineer. It defines what we're building, why, and how we'll know it's done. Code without a spec is guessing.

**Position in the sdd workflow:** this skill is the clarify-stage *specification* — it feeds the workflow's spec artifact (SPEC.md or a lightspec proposal), then hands off to planning. It does NOT plan, break tasks, or implement (those are `planning`, `building`).

## When to Use

- Starting a new project or feature
- Requirements are ambiguous or incomplete
- The change touches multiple files or modules
- You're about to make an architectural decision
- The task would take more than 30 minutes to implement

**When NOT to use:** single-line fixes, typo corrections, or changes where requirements are unambiguous and self-contained (those skip clarify and go straight to `building`).

## Output by workflow

**Default workflow (has `lightspec/`):** this skill is the **requirements-clarification phase** of `spec-proposal`. Output feeds the lightspec change structure — no standalone spec file:

| This skill produces | Lands in |
|---|---|
| Clarified objective, success criteria | `lightspec/changes/<id>/proposal.md` |
| Specified requirements with scenarios | `changes/<id>/specs/<capability>/spec.md` (as `#### Scenario:` blocks) |
| Decisions + boundaries | proposal.md + the change's decisions |
| Open questions | proposal.md → resolved before approval |

**Lite workflow (SPEC.md, no lightspec):** output is `SPEC.md` — Goal / What We're Building / Decisions. Clarification here feeds `refine` (idea → SPEC.md), then `plan`.

## The Clarify Workflow

### Step 1: Gather context first

Before writing any spec content, identify and read the sources the spec will build on:

- Existing documentation (README, architecture docs, ADRs)
- Related or prior specs — the new spec should explicitly link them
- Code paths the change will touch
- External artifacts (contract, design doc, ticket, research notes)

Writing a spec without reading what exists leads to duplication, contradiction, and invented detail. If a source is missing, record it as an open question rather than guessing.

### Step 2: Surface assumptions immediately

Before writing any spec content, list what you're assuming:

```
ASSUMPTIONS I'M MAKING:
1. This is a web application (not native mobile)
2. Authentication uses session-based cookies (not JWT)
3. The database is PostgreSQL (based on existing Prisma schema)
4. We're targeting modern browsers only (no IE11)
→ Correct me now or I'll proceed with these.
```

Don't silently fill in ambiguous requirements. Assumptions are the most dangerous form of misunderstanding — surface them before they become spec.

### Step 3: Ground every claim

Every statement must fall into exactly one of four categories, clear to the reader:

- **Confirmed** — verified in code, tests, runtime, or trusted docs. Safe to build on.
- **Target** — what we intend to build. Marked explicitly, not confused with current behavior.
- **Proposed** — a design decision not yet approved. Must be reviewed before implementation.
- **Inferred** — a reasonable guess from available evidence, labeled as such. Confirm if it load-bears a decision.

If a claim fits none of these, it belongs in **Open Questions**, not the spec body. Mixing confirmed facts with proposals is how specs quietly become fiction.

**Do not invent.** Do not fabricate APIs, schemas, libraries, endpoints, file paths, or commands. If the spec needs something that doesn't exist yet, mark it Proposed or add it to Open Questions.

### Step 4: Specify the six core areas

1. **Objective** — What are we building and why? Who is the user? What does success look like?
2. **Commands** — Full executable commands with flags, not just tool names.
3. **Project Structure** — Where source lives, where tests go, where docs belong.
4. **Code Style** — One real snippet beats three paragraphs. Naming, formatting, good output example.
5. **Testing Strategy** — Framework, test locations, coverage expectations, which levels for which concerns.
6. **Boundaries** — Three-tier system:
   - **Always do:** run tests before commits, follow naming, validate inputs
   - **Ask first:** schema changes, adding dependencies, changing CI config
   - **Never do:** commit secrets, edit vendor dirs, remove failing tests without approval

### Step 5: Reframe instructions as success criteria

Vague requirements → concrete conditions:

```
REQUIREMENT: "Make the dashboard faster"

REFRAMED SUCCESS CRITERIA:
- Dashboard LCP < 2.5s on 4G connection
- Initial data load completes in < 500ms
- No layout shift during load (CLS < 0.1)
→ Are these the right targets?
```

This lets you loop toward a clear goal instead of guessing what "faster" means. In a lightspec project, these become `#### Scenario:` blocks in the spec delta.

### Step 6: Surface open questions

Anything unresolved — missing sources, unconfirmed assumptions, unapproved proposals — goes to Open Questions. The spec is not done until these are resolved or explicitly deferred with the human's consent.

## Handoff

After the spec is confirmed:

- **Default workflow** → `spec-proposal` Phase 2+: scaffold `lightspec/changes/<id>/`, write deltas with the success criteria as scenarios, plan-reviewer pass, `lightspec validate --strict`
- **Lite workflow** → `refine` converges into SPEC.md, then `plan` breaks it into PLAN.md tasks

Never start implementation from this skill. The spec is the input to planning, not a license to code.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This is simple, I don't need a spec" | Simple tasks don't need *long* specs, but they still need acceptance criteria. A two-line spec is fine. |
| "I'll write the spec after I code it" | That's documentation, not specification. The value is forcing clarity *before* code. |
| "The spec will slow us down" | A 15-minute spec prevents hours of rework. |
| "Requirements will change anyway" | That's why the spec is a living document — update it, then implement. |
| "The user knows what they want" | Even clear requests have implicit assumptions. The spec surfaces them. |

## Red Flags

- Starting to write code without any written requirements
- Asking "should I just start building?" before clarifying what "done" means
- Implementing features not mentioned in any spec
- Making architectural decisions without documenting them
- Skipping the spec because "it's obvious"

## Verification

Before handoff to planning, confirm:

- [ ] Objective, commands, structure, style, testing, boundaries covered
- [ ] Assumptions surfaced and confirmed/corrected
- [ ] Every claim categorized (Confirmed/Target/Proposed/Inferred)
- [ ] Success criteria specific and testable (→ scenarios in default workflow)
- [ ] Open questions resolved or explicitly deferred
- [ ] Output lands in the right place: lightspec proposal (default workflow) or SPEC.md (lite workflow)
- [ ] Human reviewed and approved the spec
