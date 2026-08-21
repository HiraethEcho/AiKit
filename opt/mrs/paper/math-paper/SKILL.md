---
name: math-paper
description: "12-agent academic paper writing pipeline. 10 modes (full/plan/outline/revision/revision-coach/abstract/lit-review/format-convert/citation-check/rebuttal-audit). 3 paper types, 5 citation formats, bilingual abstracts, LaTeX/PDF output. Style Calibration + Writing Quality Check + Anti-Patterns with IRON RULE markers. Triggers: write paper, academic paper, guide my paper, parse reviews, audit my rebuttal, check my response draft, 写论文, 学术论文, 引导我写论文, 审查意见, 评估回复."
---

# Academic Paper — Academic Paper Writing Agent Team

A mathematics paper writing tool — 12-agent pipeline for theorem-proof papers, survey notes, and research notes.

**v2.5** adds two writing quality features:

- **Style Calibration** (intake Step 10, optional) — Provide 3+ past papers and the pipeline learns your writing voice (sentence rhythm, vocabulary preferences, citation integration style). Applied as a soft guide during drafting; discipline conventions always take priority. See `references/style_calibration_protocol.md`.
- **Writing Quality Check** (`references/writing_quality_check.md`) — A writing quality checklist applied during the draft self-review step. Catches overused AI-typical terms, em dash overuse, throat-clearing openers, uniform paragraph lengths, and monotonous sentence rhythm. These are good writing rules, not detection evasion.

> **Routing discipline (v3.9.2):** see `AGENTS.md` (project root) "Routing Discipline (v3.9.2)" + `references/intent_clarification_protocol.md` for cross-skill routing rules. This skill assumes routing has already settled — ambiguous cross-phase materials should have been clarified upstream.

## Quick Start

**Minimal command:**

```
Write a paper on the Riemann hypothesis and its consequences
```

```
Write a paper on the classification of finite simple groups
```

**Execution flow:**

1. Configuration interview — paper type, discipline, citation format, output format
2. Literature search — systematic search strategy, source screening
3. Architecture design — paper structure, outline, word count allocation
4. Argumentation construction — claim-evidence chains, logical flow
5. Full-text drafting — section-by-section draft, register adjustment
6. Citation compliance + bilingual abstract (parallel)
7. Peer review — five-dimension scoring, revision suggestions
8. Output formatting — LaTeX → PDF

---

## Trigger Conditions

### Trigger Keywords

**English**: write paper, academic paper, paper outline, write abstract, revise paper, literature review paper, check citations, convert to LaTeX, convert format, format paper, conference paper, journal article, thesis chapter, research paper, guide my paper, help me plan my paper, step by step paper, draft manuscript, write methodology, write discussion, parse reviews, revision roadmap, help me with my revision, I got reviewer comments, convert citations

**简体中文**: 写论文, 学术论文, 论文大纲, 写摘要, 修改论文, 文献回顾论文, 检查引用, 转 LaTeX, 转换格式, 研讨会论文, 期刊文章, 学位论文, 研究论文, 引导我写论文, 帮我规划论文, 逐步写论文, 写方法论, 写讨论, 审查意见, 修订路线图, 帮我修改, 我收到审查意见, 转换引用格式

### Plan Mode Activation

Activate `plan` mode when the user wants guidance, step-by-step planning, or expresses uncertainty about paper structure. **Default rule**: when ambiguous between `plan` and `full`, prefer `plan`.

> See `references/plan_mode_protocol.md` for full intent signals and activation rules.

### Does NOT Trigger

| Scenario                                          | Use Instead          |
| ------------------------------------------------- | -------------------- |
| Deep research / fact-checking (not paper writing) | `math-deep-research` |
| Reviewing a paper (structured review)             | `math-reviewer`      |

### Distinction from `math-deep-research`

| Feature        | `math-paper`                                  | `math-deep-research` |
| -------------- | --------------------------------------------- | -------------------- |
| Primary output | Publishable paper draft                       | Research report      |
| Structure      | Journal-ready (Theoretical Paper, etc.)       | APA 7.0 report       |
| Citation       | Multi-format (APA/Chicago/MLA/IEEE/Vancouver) | APA 7.0 only         |
| Abstract       | Bilingual (zh-CN + EN)                        | Single language      |
| Peer review    | Simulated 5-dimension review                  | Editorial review     |
| Output format  | LaTeX → PDF                                   | Markdown (base draft) |
| Revision loop  | Max 2 rounds with targeted feedback           | Max 2 rounds         |

---

## Agent Team (12 Agents)

| #   | Agent                         | Role                                                                                                                                                                   | Phase                 |
| --- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 1   | `intake_agent`                | Configuration interview: paper type, discipline, journal, citation format, output format, language, word count; Handoff detection; Plan mode simplified interview      | Phase 0               |
| 2   | `literature_strategist_agent` | Search strategy design, source screening, annotated bibliography, literature matrix                                                                                    | Phase 1               |
| 3   | `structure_architect_agent`   | Paper structure selection, detailed outline, word count allocation, evidence mapping                                                                                   | Phase 2               |
| 4   | `argument_builder_agent`      | Argument construction, claim-evidence chains, logical flow, counter-argument handling; Plan mode argument stress test                                                  | Phase 3 / Plan Step 3 |
| 5   | `draft_writer_agent`          | Section-by-section full draft writing, discipline register adjustment, word count tracking                                                                             | Phase 4               |
| 6   | `citation_compliance_agent`   | Citation format verification, reference list completeness, DOI checking                                                                                                | Phase 5a              |
| 7   | `abstract_bilingual_agent`    | Bilingual abstract (zh-CN + EN), 5-7 keywords each                                                                                                                     | Phase 5b              |
| 8   | `peer_reviewer_agent`         | Simulated double-blind review, five-dimension scoring, revision suggestions (max 2 rounds)                                                                             | Phase 6               |
| 9   | `formatter_agent`             | Convert to LaTeX/PDF/Markdown, journal formatting, cover letter, citation format conversion (APA 7 / Chicago / MLA / IEEE / Vancouver)               | Phase 7               |
| 10  | `socratic_mentor_agent`       | Plan mode Socratic mentor: chapter-by-chapter guidance, convergence criteria (4 signals), question taxonomy (4 types), INSIGHT extraction                              | Plan Step 0-3         |
| 11  | `visualization_agent`         | Parse paper data and generate publication-quality figure code (Python matplotlib / R ggplot2) with APA 7.0 formatting, colorblind-safe palettes, and LaTeX integration | Phase 4 / Phase 7     |
| 12  | `revision_coach_agent`        | Parse unstructured reviewer comments into structured Revision Roadmap; classify, map, and prioritize comments; works standalone without prior pipeline execution       | Revision-Coach mode   |

---

## Output Formats

### Text Formats

LaTeX (.tex + .bib) → PDF (via XeLaTeX).

### Figures

When the paper contains quantitative results, the `visualization_agent` can generate publication-ready figures in Python (matplotlib/seaborn) or R (ggplot2) with APA 7.0 formatting and colorblind-safe palettes. Figures are delivered as runnable code + LaTeX `\includegraphics` integration code. See `references/statistical_visualization_standards.md` for chart type decision trees and code templates.

### Citation Formats

APA 7.0 (default), Chicago (Author-Date or Notes-Bibliography), MLA 9, IEEE, Vancouver. The `formatter_agent` supports late-stage citation format conversion between any two supported formats via "Convert citations to [format]".

---

## Orchestration Workflow (8 Phases)

```
Phase 0: CONFIG        -> [intake_agent]              -> Paper Configuration Record
Phase 1: RESEARCH      -> [literature_strategist]      -> Search Strategy + Source Corpus
Phase 2: ARCHITECTURE  -> [structure_architect]        -> Paper Outline + Evidence Map
Phase 3: ARGUMENTATION -> [argument_builder]           -> Argument Blueprint
Phase 4: DRAFTING      -> [draft_writer]               -> Complete Draft
Phase 5a: CITATIONS    -> [citation_compliance] ──┐    -> Citation Audit Report
Phase 5b: ABSTRACT     -> [abstract_bilingual]   ─┘    -> Bilingual Abstract + Keywords  (parallel)
Phase 6: PEER REVIEW   -> [peer_reviewer]              -> Review Report (max 2 revision loops)
Phase 7: FORMAT        -> [formatter]                  -> Final Output Package
```

> See `references/workflow_phase_details.md` for detailed per-phase agent behavior and output descriptions.

### Checkpoint Rules

1. ⚠️ **IRON RULE**: User must confirm Paper Configuration Record before proceeding to Phase 1
2. **Phase 2 -> 3**: User must approve outline (can request restructuring)
3. ⚠️ **IRON RULE**: Max 2 revision loops; unresolved items -> "Acknowledged Limitations"
4. **Peer Review** Critical-severity issues block progression to Phase 7
5. User can skip Phase 1 (literature) if providing own sources

---

> **v3.4.0 compliance (applies to `full` mode):** Before finalization, run the RAISE principles-only check (warn-only; primary research is outside PRISMA-trAIce scope). Warnings are reported but never block the output. See `references/raise_framework.md §Scope disclaimer`.

## Phase-by-phase Invocation Contract (v3.9.2)

math-paper pipeline runs in 8 phases (Phase 0 intake → 7 formatting). The skill is invoked manually, one phase at a time.

**Single-phase agents stay strictly within their assigned phase for writes**. The 7 single-phase agents in math-paper are: `literature_strategist` (P1), `structure_architect` (P2), `draft_writer` (P4/P6 per invocation), `citation_compliance` (P5a), `abstract_bilingual` (P5b), `peer_reviewer` (P6), `formatter` (P7). Reads from upstream phases are allowed.

Multi-phase agents (`argument_builder` P3+Plan, `visualization` P4+P7) do exactly the work specified by the caller's invocation for that phase — no extension to other phases in the same call.

Routing requires explicit user signal — `/ars-<mode>` slash command or `[direct-mode]` prefix. Ambiguous cross-phase input defaults to clarification per `AGENTS.md` (project root) Routing Discipline + `references/intent_clarification_protocol.md`.

**Enforcement:** prompt-level via Phase Boundary blocks on Bucket A agents.

## Operational Modes (10 Modes)

See `references/mode_selection_guide.md` for details.

| Mode                 | Trigger                                                                                                                                            | Agents                       | Output                                                                                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `full`               | "Write a paper"                                                                                                                                    | All 9 (+ 11 if quantitative) | Complete paper draft (with figures if applicable)                                                                                                                                   |
| `outline-only`       | "Paper outline"                                                                                                                                    | 1->2->3                      | Detailed outline + evidence map                                                                                                                                                     |
| `revision`           | "Revise paper"                                                                                                                                     | 8->5->6                      | Patch document + deterministically applied revised draft + apply report (#390; revision log via `templates/revision_tracking_template.md`)                                          |
| `abstract-only`      | "Write abstract"                                                                                                                                   | 1->7                         | Bilingual abstract + keywords                                                                                                                                                       |
| `lit-review`         | "Literature review"                                                                                                                                | 1->2                         | Annotated bibliography + synthesis                                                                                                                                                  |
| `format-convert`     | "Convert to LaTeX" / "Convert citations to [format]"                                                                                               | 9 only                       | Formatted document; includes citation format conversion (APA 7 / Chicago / MLA / IEEE / Vancouver)                                                                                  |
| `citation-check`     | "Check citations"                                                                                                                                  | 6 only                       | Citation error report                                                                                                                                                               |
| `plan`               | "guide my paper" / "help me plan my paper"                                                                                                         | 1->10->3->4                  | Chapter Plan + INSIGHT Collection                                                                                                                                                   |
| `revision-coach`     | "parse reviews" / "revision roadmap" / "I got reviewer comments" / "should we push back" / "conference rebuttal" / "grant panel response"          | 12 only                      | Revision Roadmap + optional Tracking Template + Response Letter Skeleton (covers pushback/disagreement posture + journal / conference / grant-panel / transfer-after-review scopes) |
| **`rebuttal-audit`** | **"audit my response" / "check my rebuttal" / "did I miss any reviewer comment"** (requires BOTH reviewer comments AND an existing rebuttal draft) | **12 only (parse-only)**     | **Rebuttal QA report: per-comment coverage + gaps + risk flags. No new response generated; advisory only. Does NOT emit Schema 11 / verified status.**                              |

### Quick Mode Selection Guide

| Your Situation                                                | Recommended Mode | Spectrum    |
| ------------------------------------------------------------- | ---------------- | ----------- |
| Starting from scratch with a clear RQ                         | `full`           | balanced    |
| Need help planning before writing                             | `plan`           | originality |
| Just need an outline                                          | `outline-only`   | balanced    |
| Have a draft, received review feedback                        | `revision`       | fidelity    |
| Have unstructured reviewer comments                           | `revision-coach` | balanced    |
| Just need an abstract                                         | `abstract-only`  | fidelity    |
| Need to check/fix citations                                   | `citation-check` | fidelity    |
| Need to convert format (LaTeX, PDF) or citation style        | `format-convert` | fidelity    |
| Want a systematic literature review paper                     | `lit-review`     | fidelity    |
| Have a written rebuttal draft to QA against reviewer comments | `rebuttal-audit` | fidelity    |

**Spectrum** (v3.2): _fidelity_ = template-heavy, predictable output; _balanced_ = default; _originality_ = exploratory, template-light. See `references/mode_spectrum.md` for the full cross-skill spectrum table.

Not sure? Start with `plan` — it will guide you step by step.

### Mode Selection Logic

> See `references/mode_selection_guide.md` for trigger-to-mode mappings and the full selection flowchart.

---

## Rebuttal-Audit Mode

`rebuttal-audit` evaluates an author's **existing** rebuttal / response-to-reviewers draft for coverage, tone, and evidence. It is advisory QA — it does **not** write or rewrite the response.

**Input gate (routing):** activate `rebuttal-audit` only when the user supplies BOTH (a) the reviewer comments / decision letter AND (b) an existing rebuttal/response draft to evaluate. If only (a) is present (no draft yet), route to `revision-coach` (which _generates_ a response skeleton). If intent is ambiguous, clarify rather than guess.

**What it produces:**

- Per-comment coverage table — every reviewer concern marked `addressed` / `partially` / `missing` in the draft.
- Gap list — concerns the draft fails to answer.
- Risk flags — tone too combative, claims made without evidence, or a response that misreads the reviewer's actual point.
- Improvement suggestions (advisory).

**IRON RULE — integrity boundary (no false certification):** `rebuttal-audit` reuses `revision_coach_agent`'s comment-parsing capability, but it is advisory QA only — it **MUST NOT** emit a Schema 11 `commitment_extracted` ledger and **MUST NOT** mark the package `ready_to_submit` or any verified status. Producing a Schema 11 artifact would falsely imply the response entered a traceability system. The output is an advisory QA report only.

**Boundary vs `re-review`:** `math-reviewer`'s `re-review` mode verifies the **revised manuscript** (did the author's claimed changes actually appear in the paper) and runs after revision. `rebuttal-audit` verifies the **response letter itself** (does the rebuttal cover every comment, is its tone/evidence sound) and runs standalone, advisory. Different artifacts, different layers.

---

## Revision Mode Patch Protocol (#390)

In revision mode, `draft_writer_agent` does NOT re-emit the complete paper. The round runs **anchorize → patch → deterministic apply → finalizer**, confining the regeneration surface to the blocks the revision explicitly touches (DELEGATE-52 blast-radius containment; spec):

1. **Anchorize** the draft (`scripts/ars_anchorize_draft.py` — idempotent, content-neutral): every block gets a stable `<!--block:BNNNN-->` marker; a block manifest (`base_draft_hash` + per-block `old_hash`) is regenerated. Nothing may rewrite the draft between this step and apply.
2. **The writer emits a patch document** (`contracts/patch/revision_patch.schema.json`) as a sidecar file in its `phase6_*/` fence — block ops with hash preconditions copied from the manifest, each op tracing to `roadmap_item_ids`. See `agents/draft_writer_agent.md` § Patch-Document Revision Emission.
3. **Deterministic apply** (`scripts/ars_apply_revision_patch.py`): two-phase fail-closed — one stale hash rejects the whole patch with the base byte-untouched; untouched blocks are preserved byte-identical by construction. Structural shapes (heading rewrites/deletes, section-count change, touched-ratio > 0.6) refuse without an explicit acknowledge that only the §3.6 escalation checkpoint may grant. The apply report (`preserved_ratio`, ops, fresh block IDs, structural flags) is a **required input to re-review** alongside the revised draft.
4. **Escalation, never silent fallback:** restructure-demanding rounds go to a MANDATORY user checkpoint; a confirmed full re-emission round is provenance-stamped `mode: full_reemission_escalated` and the draft is re-anchorized afterwards (new ID generation).

Manual users run the patch scripts by hand — exact commands in `references/revision_patch_protocol.md`. Honest boundary, stated once: patch mode removes the silent-distortion channel for text the revision does not touch; it does not make the revision itself better. The `math-paper full` in-pair Phase 6→4 loop is NOT patch-adopted (its Phase 4b lint requires a full `## Draft Body`; Item 9 boundary, spec §5.2/§7).

---

## Plan Mode: Chapter-by-Chapter Guided Planning

Socratic mode that guides users through paper planning one chapter at a time. Builds a complete Paper Blueprint through structured dialogue.

> See `references/plan_mode_protocol.md` for the full chapter-by-chapter dialogue flow and Paper Blueprint structure.

---

## Handoff Protocol: math-deep-research -> math-paper

`intake_agent` automatically detects math-deep-research materials (RQ Brief / Bibliography / Synthesis / INSIGHT Collection) and skips redundant steps. See `skills/math-deep-research/SKILL.md` Handoff Protocol for the complete handoff material format.

---

## Failure Paths

See `references/failure_paths.md` for details. Quick reference:

| Failure Scenario                           | Handling Strategy                                                  |
| ------------------------------------------ | ------------------------------------------------------------------ |
| Insufficient research foundation           | Recommend running `math-deep-research` first                       |
| Wrong paper structure selected             | Return to Phase 2, suggest alternative structure                   |
| Word count significantly over/under target | Identify problematic chapters, suggest trimming/expansion          |
| Citation format entirely wrong             | Re-run the entire citation phase                                   |
| Peer review rejection                      | Analyze rejection reasons, suggest major revision or restructuring |
| Plan mode not converging                   | Suggest switching to outline-only mode                             |
| Incomplete handoff materials               | List missing items, suggest supplementing or re-running            |
| User abandons midway                       | Save completed Chapter Plan                                        |

---

## Full Academic Pipeline

See `math-deep-research` + `math-reviewer` SKILL.md files for the complete research → review workflow. This skill covers the writing stage only.

---

## Phase 0: Configuration Interview

See `agents/intake_agent.md` for the complete field definitions of the Phase 0 configuration interview. The interview covers 9 core items: paper type, discipline, target journal, citation format, output format, language, abstract, word count, and existing materials — plus co-authors, funding, optional style calibration, the domain evidence profile (Step 12), and the citation-verification level (Step 13, #392: mark only by default / strict opt-in, seeding `terminal_policies.citation_existence`). Outputs a Paper Configuration Record, awaiting user confirmation.

---

## File Structure

**Agent definitions**: `<group>/agents/{agent_name}.md` — one file per agent (12 total, matching Agent Team table above).

**References** (20 files in `references/`):

- Citation: `apa7_extended_guide`, `apa7_chinese_citation_guide`, `citation_format_switcher`
- Writing: `academic_writing_style`, `writing_quality_check`, `writing_judgment_framework`
- Structure: `paper_structure_patterns` (3 types), `abstract_writing_guide`
- Domain: `journal_submission_guide`, `latex_template_reference`
- Process: `failure_paths` (12 scenarios), `mode_selection_guide` (10 modes), `plan_mode_protocol`, `workflow_phase_details`, `revision_patch_protocol` (#390 Mode B commands + marker lifecycle)
- Ethics: `statistical_visualization_standards`
- Also: `skills/math-deep-research/references/apa7_style_guide.md` (base reference, extended here)

**Templates** (7 files in `templates/`): `theoretical_paper`, `literature_review`, `survey_note`, `research_note`, `latex_article_template.tex`, `bilingual_abstract`, `revision_tracking` (4 status types).

---

## Anti-Patterns

Explicit prohibitions to prevent common failure modes:

| #   | Anti-Pattern                           | Why It Fails                                                              | Correct Behavior                                                                                                  |
| --- | -------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1   | **AI-typical overused terms**          | "delve into", "crucial", "it is important to note" = instant AI detection | Use discipline-specific vocabulary; see `references/writing_quality_check.md`                                     |
| 2   | **Em dash abuse**                      | More than 2 em dashes per page signals AI writing                         | Use parentheses, commas, or restructure the sentence                                                              |
| 3   | **Throat-clearing openers**            | "In this section, we will discuss..." adds no information                 | Start with the claim or finding directly                                                                          |
| 4   | **Uniform paragraph lengths**          | Every paragraph is 4-5 sentences = monotonous AI rhythm                   | Vary paragraph length naturally (2-8 sentences)                                                                   |
| 5   | **⚠️ IRON RULE: Fabricated citations** | Inventing plausible-sounding references that don't exist                  | Every citation must be verified via DOI or WebSearch; see `references/revision_patch_protocol.md` citation checks |
| 6   | **Sycophantic revision**               | Accepting all reviewer feedback without critical evaluation               | Use REVIEWER_DISAGREE status when reviewer is wrong; justify with evidence                                        |
| 7   | **Scope creep during revision**        | Adding unrequested sections/analyses to "improve" the paper               | Revision addresses reviewer concerns only; new content requires explicit user approval                            |
| 8   | **Ignoring failure paths**             | Continuing despite desk-reject signals or fatal methodology flaws         | Check `references/failure_paths.md`; invoke F11 Desk-Reject Recovery when triggered                               |

---

## Quality Standards

### Writing Quality

1. **Every claim must have a citation** or be supported by the paper's own data
2. **Zero citation orphans** — in-text citations <-> reference list must perfectly match
3. **Consistent register** — academic tone appropriate for the discipline
4. **Logical flow** — clear transitions between paragraphs and sections
5. **Word count compliance** — within +/-10% of target

### Bilingual Abstract Quality

6. **Independent writing** — zh-CN and EN abstracts are independently composed, NOT mechanical translations
7. **Structural alignment** — both abstracts cover the same key points in the same order
8. **Keywords** — 5-7 per language, reflecting the paper's core concepts
9. **Word count** — EN: 150-300 words; zh-CN: 300-500 characters

### Citation Quality

10. **Format compliance** — 100% adherence to selected citation style
11. ⚠️ IRON RULE: **DOI inclusion** — every source with a DOI must include it; every citation must be verified via DOI or WebSearch
12. **Currency** — flag sources older than 10 years (unless seminal works)
13. **Self-citation ratio** — flag if >15%

### Peer Review

14. **Five dimensions** — Originality (20%), Methodological Rigor (25%), Evidence Sufficiency (25%), Argument Coherence (15%), Writing Quality (15%)
15. **Actionable feedback** — every criticism must include a specific suggestion
16. **Max 2 revision rounds** — unresolved items become Acknowledged Limitations

### Mandatory Inclusions

⚠️ **IRON RULE**: Every paper MUST include: Data Availability Statement, Ethics Declaration, Conflict of Interest Statement, Funding Acknowledgment, Limitations section. Ethics statement when applicable (human subjects, sensitive data)

---

## Output Language

Follows the user's language. Academic terminology is kept in English. Bilingual abstracts are always provided regardless of the main text language.
