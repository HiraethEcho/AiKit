---
name: designing-agents
agent: architect
description: Designs and writes a focused artifact another agent runs — an agent persona in agents/ or a workflow skill in skills/. Use when authoring a reviewer or specialist persona, a repeatable process skill — or when rewriting one that is under-specified, overlapping, or being ignored.
---

# Designing Agents

## Overview

This skill is the workflow for authoring the two prose artifacts another agent runs:

- **Agent personas** live in `agents/<name>.md`. They define a *role* another agent adopts when it needs specialized review, audit, or analysis. Example: `code-reviewer`, `security-auditor`, `test-engineer`.
- **Skills** live in `skills/<name>/SKILL.md`. They define a *workflow* — a repeatable process with gated steps, anti-rationalization guardrails, and verification. Example: `spec-proposal`, `rest`, `planning`.

Personas change an agent's *judgment*; skills change its *process*. Both fail the same way: a persona that reads like general advice gets cited but ignored; a skill that skips its guardrails becomes a suggestion. This skill is the workflow for authoring either so the result measurably changes behavior.

## When to Use

- Creating a new agent persona (reviewer, auditor, domain specialist)
- Creating a new skill (a process, checklist, or workflow)
- An existing persona or skill is vague, overlaps another, or is being ignored in practice
- Rewriting an artifact that is under-specified

**When NOT to use:** writing code, refactoring, or any task that isn't authoring a persona/skill artifact.

## The Workflow

This workflow is abstracted from the three reference personas (`agents/code-reviewer.md`, `agents/security-auditor.md`, `agents/test-engineer.md`) and from `docs/skill-anatomy.md` (sdd repo). Do not advance to the next step until the current one is settled.

### 1. Choose the target type

Ask: is this a *role* the agent should adopt, or a *process* it should follow?

| Target | Choose when | Output |
|---|---|---|
| Persona | The agent needs to evaluate or review through a specific lens (correctness, security, test strategy, accessibility, migration safety…) | `agents/<name>.md` |
| Skill | The agent needs to follow a repeatable process with gated steps, verification, and anti-rationalization guards | `skills/<name>/SKILL.md` |

If more than one applies, split them: a skill can *describe* the workflow a persona *applies* the lens to. Do not merge the formats — each has its own structure and verification.

### 2. Clarify intent

Ask the requester for:

- **One-sentence purpose** — what does this artifact do that a general agent cannot?
- **Primary tasks or steps** — 2-4 concrete things it will be invoked to do.
- **Explicit non-goals** — what it should refuse or redirect.
- **Invocation trigger** — when should the calling agent delegate to this vs. handle the task itself?

Do not proceed until the one-sentence purpose is locked. If the requester cannot state it in one sentence, the artifact is not ready to exist yet.

### 3. Scan for overlap

Read every existing artifact of the target type:

- For a persona: every file under `agents/`.
- For a skill: every `skills/*/SKILL.md` (start with the Quick Reference table in `skills/app-sdd/SKILL.md`).

If the new artifact overlaps an existing one by more than ~30% (same scope, same output), choose one of:

- **Extend** the existing artifact
- **Tighten scope** so the new artifact covers ground the existing one does not
- **Abandon** the new artifact — duplication is worse than absence

Two personas covering similar ground produce inconsistent reviews. Two skills produce conflicting advice.

### 4. Pick a kebab-case name

Follow the existing pattern:

- **Persona**: `<role>` or `<role>-<specialty>` (`code-reviewer`, `security-auditor`, `accessibility-reviewer`)
- **Skill**: verb-phrase or noun-phrase describing the process (`spec-proposal`, `context-engineering`, `planning`)
- Bad for any: `helper`, `assistant`, `smart-agent`, `codeReviewer`

The name must match across: the file name, the frontmatter `name`, and the H1 title.

### 5. Write the discovery surface

The frontmatter `description` — how the artifact is found and delegated to. Action-oriented; says *when*, not *how*.

- **Persona structure**: `<Role noun> <that does what>. Use for <concrete trigger>.`
  - Good: `Senior code reviewer that evaluates changes across five dimensions — correctness, readability, architecture, security, and performance. Use for thorough code review before merge.`
- **Skill structure**: `<Verb phrase describing what the skill does>. Use when <specific trigger conditions>.`
  - Good: `Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet.`

**Bad for any** (avoid):
- Starts with "Helps with…" or "Assists in…" — vague, not delegation-friendly.
- Summarizes the full workflow — the description says *when*, not *how*.
- Over 280 characters — gets truncated in discovery.

### 6. Draft the body

This step branches by target type.

#### 6a. Persona body (four-block structure)

Used by every persona in `agents/`:

```markdown
# <Role Heading>

You are a <experienced | senior | staff> <role title> focused on <scope>. Your role is to <primary tasks>. <One-sentence differentiator — what you prioritize vs. what you ignore.>

## <Framework / Review Dimensions / Approach>
<Numbered sections, each with 3-6 concrete questions this persona asks.>

## Output Format
<Concrete markdown template showing how findings are reported.>

## Rules
1. <Non-negotiable behavior>
```

#### 6b. Skill body (per `docs/skill-anatomy.md` (sdd repo))

Every skill in this repo follows the same section order. Do not invent new section names.

```markdown
# <Skill Title>

## Overview
<One-two sentences on what the skill does and why it matters.>

## When to Use
- <Triggering conditions>
- NOT for: <Exclusions>

## The Workflow (or Core Process / Steps)
<Numbered steps or phases. Specific and actionable — run commands, not vague advice.>

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| <Excuse to skip a step> | <Factual rebuttal> |

## Red Flags
- <Observable sign the skill is being violated>

## Verification
- [ ] <Checklist of exit criteria with evidence requirements>
```

Skills have one mandatory section personas don't: **Common Rationalizations**. This table is the anti-rationalization lever that prevents the agent from talking itself out of following the process. Personas don't need it because a persona is a lens, not a workflow with skippable steps.

### 7. Apply prompting-patterns (see `docs/prompting-patterns.md`)

Check the artifact against these sections:

- **§2.2** — Positive instructions, not prohibitions. Rewrite every "don't do X" as "do Y".
- **§2.3** — Explain *why* for any non-obvious rule. One short clause is enough.
- **§2.4** — Scan for contradictions. "Be thorough" + "be concise" must be resolved.
- **§2.5** — Remove ALL-CAPS and reward/punishment language ("CRITICAL", "you MUST", "never ever").
- **§3.1** — First sentence sets the role (persona) or the overview (skill). Make it specific, not generic.
- **§6.4** — Include anti-overengineering guards if the artifact produces or modifies code.

### 8. Minimize surface area

Cut every sentence that does not change behavior. Read each rule and ask: "If I removed this, would an invocation of this artifact produce different output?" If no, remove it.

- A 90-line focused persona beats a 200-line comprehensive one.
- A 150-line focused skill beats a 300-line exhaustive one.
- The comprehensive version gets skimmed and its rules get skipped.

### 9. Write the file(s)

- Persona → `agents/<name>.md`.
- Skill → `skills/<name>/SKILL.md` (create the directory; supporting files only if the skill exceeds ~300 lines or needs separate reference material).

Then verify per the checklist below.

## Persona Template

Frontmatter (sdd convention — minimal):

```yaml
---
name: <kebab-case>
description: <Role noun that does what>. Use for <trigger>.
---
```

Body: the four-block structure from step 6a. Include a "Skill and research hooks" section naming the skills this persona reads when present (e.g. "If the `reviewing` skill exists, read it for mode selection").

## Skill Template

Frontmatter:

```yaml
---
name: <kebab-case>
agent: <primary agent for subagent dispatch>
description: <Verb phrase>. Use when <trigger>.
---
```

Body: the section order from step 6b. Skills declare their primary `agent` so `subagent(agent: <name>)` resolves to the persona.

## Validate

Before writing the file, verify:

- [ ] Frontmatter has `name` (kebab-case), `description` (when-trigger, ≤280 chars), and for skills `agent`
- [ ] Boundaries section (persona: role scope; skill: MAY / MAY NOT)
- [ ] Every phase has an Entry and Exit condition
- [ ] Output format is specified (what does the receiver get?)
- [ ] Common Rationalizations table present (skills only)
- [ ] Under 150 lines (skill) / 90 lines (persona) — if longer, you are over-specifying
- [ ] No step instructs the artifact to execute another skill as a sub-step
- [ ] Name matches across file name, frontmatter, and H1

## Red Flags

- Authoring a persona/skill without scanning existing ones first
- A description that says *how* instead of *when* (won't be delegated to)
- Copy-pasting an existing artifact and tweaking it — read the pattern, then write fresh
- More than ~30% overlap with an existing artifact — extend or abandon instead
- An artifact longer than needed — it will be skimmed and its rules skipped
