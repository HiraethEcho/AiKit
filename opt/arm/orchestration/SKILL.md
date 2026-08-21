---
name: math-research-orchestration
description: Full-lifecycle orchestration for pure mathematics research. Use when managing an end-to-end algebraic geometry research project — from initial exploration through paper submission. Routes to the 5 specialized ars-lite skills.
version: 1.0.0
author: Orchestra Research
license: MIT
tags: [Pure Mathematics, Research Orchestration, Algebraic Geometry, Project Management]
---

# Math Research Orchestration

Central coordinator for pure mathematics research projects. Routes to specialized skills at each phase. This is the "outer loop" that manages direction, while specialized skills handle execution.

## When to Use

- Managing a multi-week research project in algebraic geometry
- Need to track overall progress across multiple proof attempts
- Want a structured lifecycle from problem to paper
- Need periodic reflection on research direction

## When NOT to Use

- Working on a single, focused proof → use `proof-exploration` directly
- Just brainstorming → use `ideation` directly
- Just writing up → use `paper-writing` directly

---

## Skill Routing

| Phase | Skill | When to Invoke |
|-------|-------|---------------|
| Ideation | `ideation` | Start of project, when stuck, when pivoting |
| Literature | `literature-survey` | Start of project, when encountering unfamiliar territory |
| Proof | `proof-exploration` | When you have a conjecture and need to prove it |
| Writing | `paper-writing` | When results are ready to write up |
| Review | `rigor-review` | Before submission, periodically during writing |

---

## Workspace Structure

```
research/
├── state.yaml                # Current phase, active conjecture, next actions
├── log.md                    # Decision timeline
├── findings.md               # Evolving synthesis
├── conjectures/              # All conjectures under investigation
│   └── {name}/
│       ├── statement.md
│       ├── attempts/
│       └── status.md
├── literature/               # Survey results
├── lemmas/                   # Proven intermediate results
├── paper/                    # LaTeX source
├── review/                   # Review reports
└── to_human/                 # Progress reports
```

---

## Lifecycle

### Phase 0: Bootstrap

1. Initialize workspace
2. Define research topic (one paragraph)
3. Set initial direction in `state.yaml`

```yaml
# state.yaml
topic: "Derived categories of coherent sheaves on Calabi-Yau threefolds"
phase: ideation
active_conjecture: null
next_actions:
  - "Survey recent literature on derived categories of CY3s"
  - "Identify open problems in the area"
last_reflection: null
```

### Phase 1: Ideation

Invoke `ideation` to explore the problem space.

**Route to**:
- `ideation` — generate and filter conjectures
- `literature-survey` — understand what's known

**Exit when**: 2-3 concrete conjectures formulated and saved to `conjectures/`.

**Decision**: Pick the most promising conjecture to pursue first.

### Phase 2: Literature Deep Dive

Invoke `literature-survey` for the chosen conjecture.

**Route to**:
- `literature-survey` — search and extract key papers

**Exit when**: You understand the state of the art, key techniques, and identified gaps.

**Update** `findings.md` with synthesis.

### Phase 3: Proof Exploration

Invoke `proof-exploration` in a loop.

**Route to**:
- `proof-exploration` — attempt proofs, track progress

**Loop**:
1. Pick a proof strategy
2. Attempt the proof
3. Record results
4. Reflect after every 3-5 attempts
5. Decide: DEEPEN / BROADEN / PIVOT / CONCLUDE

**Exit when**: Conjecture is proved, disproved, or firmly blocked.

**Update** `state.yaml` with outcome.

### Phase 4: Writing

Invoke `paper-writing` once results are ready.

**Route to**:
- `paper-writing` — draft the paper
- `rigor-review` — verify before submission

**Exit when**: Paper draft complete and review grade is Accept or better.

### Phase 5: Review & Submit

Invoke `rigor-review` on the final draft.

**Route to**:
- `rigor-review` — final verification

**Exit when**: No critical or major findings remain.

---

## State Management

### state.yaml Updates

| Event | Update |
|-------|--------|
| New conjecture chosen | `active_conjecture: {name}` |
| Proof attempt cycle starts | `phase: proof-exploration` |
| Proof completed | `phase: writing`, record outcome |
| Direction change | `next_actions: [...]` |
| Reflection | `last_reflection: {date}` |

### Reflection Protocol

After every 5-10 proof attempts (or weekly, whichever comes first):

1. Read all `conjectures/*/status.md`
2. Read `findings.md`
3. Ask: What patterns emerge? What's working? What's not?
4. Decide direction: DEEPEN / BROADEN / PIVOT / CONCLUDE
5. Update `state.yaml`
6. Log reflection in `log.md`

---

## Git Protocol

| Event | Message |
|-------|---------|
| Project initialized | `research(init): {topic}` |
| Conjecture selected | `research(conjecture): {name}` |
| Phase change | `research(phase): {from} → {to}` |
| Reflection | `research(reflect): {direction} — {reason}` |
| Paper draft | `research(paper): {title}` |
| Submission ready | `research(submit): {title}` |

---

## Output

- `research/state.yaml` — project state
- `research/log.md` — decision timeline
- `research/findings.md` — evolving synthesis
- All outputs from specialized skills (conjectures/, literature/, paper/, review/)
