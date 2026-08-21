# arsm — Functional Architecture

arsm (ARS for Math) = research toolkit for foundational mathematics, ported from aro/ per project AGENTS.md. Agent-agnostic: works with opencode, pi, claude-code, etc.

## Design principles

- **无编排器** — no orchestrator, no pipeline runner. Each skill invoked manually, one phase at a time.
- **三组独立工具** — research / review / paper writing are standalone; no `shared/` dependency. Each skill carries its own references/contracts.
- **数学专用** — content scoped to serious math academic papers, review notes, research-result notes. No venue passport control, no experiment tooling, no test components.

## Layout

```
arsm/
├── AGENTS.md              routing rules + agent roster
├── ARCHITECTURE.md        this file
├── MODE_REGISTRY.md       cross-skill mode registry
├── research/              math-deep-research
│   ├── math-deep-research/      (SKILL.md + references/ templates/ scripts/)
│   ├── agents/                  15 agents (math-researcher + 14 skill agents)
│   └── commands/  2 slash commands
├── review/                math-reviewer
│   ├── math-reviewer/           (SKILL.md + references/ templates/, no scripts)
│   ├── agents/                  8 agents (math-reviewer + 7 skill agents)
│   └── commands/  6 slash commands (one per mode)
└── paper/                 math-paper
    ├── math-paper/              (SKILL.md + references/ templates/ scripts/ contracts/)
    ├── agents/                  14 agents (math-writer, math-verifier + 12 skill agents)
    └── commands/  8 slash commands
```

## Three skills

| Skill | Role | Agents | References | Templates | Examples |
|---|---|---|---|---|---|
| `math-deep-research` | literature search + synthesis + research report | 14 | 30 | 6 | 0 |
| `math-paper` | paper writing (draft → format) + revision | 12 | 25 | 7 | 0 |
| `math-reviewer` | multi-perspective peer review | 7 | 13 | 3 | 0 |

Each skill is self-contained:

```
<group>/<skill>/
├── SKILL.md           entry point: modes, phases, routing, IRON RULEs
├── references/        protocols, style guides, API docs (incl. migrated shared/ content)
├── templates/         output skeletons
└── scripts/           Python tooling (search clients, integrity verifiers, patch tools)
```

Agents are group-level: `<group>/agents/{agent_name}.md` (subagents `math-{researcher,writer,reviewer,verifier}.md` + skill agents).

`math-paper` additionally carries `contracts/` (patch + submission JSON schemas) used by the revision-patch tooling and formatter.

## Data flow (cross-skill, manual handoff)

```
research/math-deep-research (report) ──handoff──▶ paper/math-paper (draft) ──▶ review/math-reviewer (review) ──▶ paper/math-paper (revision)
```

No automatic dispatch — user triggers each stage via `/ars-*` command or `[direct-mode]` prefix. Handoff formats defined in each skill's `references/handoff_schemas.md`.

## Mode spectrum

Every skill exposes a fidelity/balanced/originality spectrum (`references/mode_spectrum.md`): fidelity = template-heavy predictable output; balanced = default; originality = exploratory. Selection via explicit user signal; ambiguity → clarify (see `references/intent_clarification_protocol.md`).

## Shared-content migration (v2 cleanup)

Former `shared/` content distributed into skill `references/` so each skill runs standalone:
- `mode_spectrum.md`, `intent_clarification_protocol.md`, `handoff_schemas.md` → all 3 skills
- `raise_framework.md`, `style_calibration_protocol.md`, `word_count_conventions.md`, `protected_hedging_phrases.md`, `codex_audit_multifile_template.md` → deep-research + paper
- `firm_rules.md`, `ground_truth_isolation_pattern.md` → deep-research
- `contracts/` → `paper/math-paper/contracts/`

## Scripts

Per-skill — no standalone `scripts/` dir; each skill owns its tooling:

- **`research/math-deep-research/scripts/`**: `arxiv_client.py`, `openalex_client.py`, `crossref_client.py`, `_text_similarity.py` (search/resolvers); `contamination_signals.py`, `temporal_integrity_audit.py` (integrity)
- **`paper/math-paper/scripts/`**: `_block_parser.py`, `ars_anchorize_draft.py`, `ars_apply_revision_patch.py` (revision patch toolchain); `verify_submission_package.py`, `audit_snapshot.py` (submission verification)

## Removed vs aro/

Dropped: hooks/, plugins/, evals/, audits/, academic-pipeline skill, session-state commands (ars-mark-read/ars-unmark-read/ars-cache-invalidate/ars-full), venue disclosure/passport apparatus, non-math examples/templates, changelogs.
