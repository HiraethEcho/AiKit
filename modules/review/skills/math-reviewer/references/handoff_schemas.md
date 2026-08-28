# Handoff Schemas — Cross-Skill Data Contracts

## Purpose

Defines the exact data structure for every artifact passed between skills under manual invocation.
All agents that produce or consume these artifacts MUST conform to these schemas.
Consuming agents should validate input and request re-generation if schema violations are found.

> **Convention**: All schemas use Markdown-based structured output. Agents MUST validate required fields before accepting a handoff. Missing required fields trigger a `HANDOFF_INCOMPLETE` failure path.

---

## Schema 1: RQ Brief (math-deep-research -> math-paper)

**Producer**: `math-deep-research/research_question_agent` | `math-deep-research/socratic_mentor_agent`
**Consumer**: `math-deep-research/research_architect_agent` | `math-paper/intake_agent`

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `research_question` | string | The finalized research question (single sentence, interrogative form) |
| `sub_questions` | list[string] | 2-5 decomposed sub-questions |
| `finer_scores` | object | `{feasible: 1-10, interesting: 1-10, novel: 1-10, ethical: 1-10, relevant: 1-10}` |
| `scope` | object | `{in_scope: list[string], out_of_scope: list[string], domain: string, timeframe: string, geography: string, population: string}` |
| `methodology_type` | enum | `"qualitative"` / `"quantitative"` / `"mixed"` |
| `theoretical_framework` | string | Name of the selected or emergent theoretical framework |
| `keywords` | list[string] | 5-10 search terms for literature search |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `socratic_insights` | list[string] | Key insights from Socratic dialogue (if socratic mode) |
| `hypothesis` | string | Preliminary hypothesis (if applicable) |
| `exclusion_criteria` | list[string] | What is explicitly out of scope |
| `stakeholders` | list[string] | Key stakeholders affected by the research |
| `ethical_flags` | list[string] | Preliminary ethical considerations |

### Example

```markdown
## RQ Brief

**Research Question**: Do the zeros of Dirichlet L-functions satisfy the generalized Riemann hypothesis?

**Sub-Questions**:
1. Which L-functions admit analytic continuation to the critical strip?
2. Which L-functions admit an Euler product over unramified primes?
3. Which character families exhibit extremal zero-free regions?

**FINER Scores**: Feasible: 8, Interesting: 9, Novel: 7, Ethical: 9, Relevant: 10

**Scope**:
- In scope: Dirichlet L-functions, zero-free regions, character sums, 1900-present
- Out of scope: non-Dirichlet L-functions, computational verification only
- Domain: Analytic Number Theory, Algebraic Number Theory
- Timeframe: 1900-present
- Geography: global
- Population: character families of arbitrary modulus

**Methodology Type**: Analytic (mean-value estimates, mollifier method)

**Theoretical Framework**: Selberg class axioms + zero-density theorems

**Keywords**: Dirichlet L-functions, generalized Riemann hypothesis, zero-free region, character sums, analytic number theory
```

---

## Schema 2: Bibliography (math-deep-research -> math-paper)

**Producer**: `math-deep-research/bibliography_agent`
**Consumer**: `math-deep-research/synthesis_agent` | `math-deep-research/source_verification_agent` | `math-paper/literature_strategist_agent`

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `sources` | list[Source] | All identified sources (minimum 15 for full mode, 5 for quick mode) |
| `search_strategy` | object | `{databases: list[string], keywords: list[string], inclusion_criteria: list[string], exclusion_criteria: list[string], date_range: string}` |
| `coverage_assessment` | string | Self-assessment of literature coverage completeness |
| `minimum_sources` | integer | 15 (full mode), 5 (quick mode) |

### Source Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (e.g., `[S01]`) |
| `title` | string | Yes | Source title |
| `authors` | string | Yes | Author(s) |
| `year` | integer | Yes | Publication year |
| `doi` | string | Yes* | DOI if available (*required for journal articles) |
| `citation` | string | Yes | Full APA 7 citation |
| `type` | enum | Yes | `journal_article` / `book` / `chapter` / `conference` / `report` / `thesis` / `preprint` / `web` |
| `evidence_tier` | integer | Yes | 1-7 (1 = systematic review/meta-analysis, 7 = expert opinion) |
| `quality_tier` | enum | Yes | `tier_1` (peer-reviewed top journal) / `tier_2` (peer-reviewed) / `tier_3` (other academic) / `tier_4` (grey literature) |
| `relevance` | enum | Yes | `core` (directly addresses RQ) / `supporting` (provides context) / `peripheral` (tangential) |
| `relevance_score` | integer | Yes | 1-10 relevance to the research question |
| `annotation` | string | Yes | 2-3 sentence summary of key findings and relevance |
| `verified` | boolean | No | Whether DOI/existence has been verified |
| `retraction_check` | boolean | No | Whether checked against Retraction Watch |
| `semantic_scholar_id` | string / null | No | Semantic Scholar paper ID (v3.3). Null if S2 lookup failed or API unavailable. Used for deduplication and re-verification. |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `prisma_counts` | object | `{identified: int, screened: int, eligible: int, included: int}` (if systematic review) |

### Example

```markdown
## Bibliography

**Search Strategy**:
- Databases: Scopus, Web of Science, ERIC, Airiti Library
- Keywords: "Dirichlet L-function" AND "zero-free region"; "generalized Riemann hypothesis" AND "character"
- Inclusion: Peer-reviewed, English or Chinese, empirical or review, 2018-2025
- Exclusion: K-12, non-STEM, editorials
- Date Range: 2018-2025

**Coverage Assessment**: Strong coverage via arXiv/mathscinet. Moderate coverage of 20th-century journals. Gap: limited grey literature on computational verification.

**Minimum Sources**: 15

### Sources

[S01] Hardy, G. H., & Littlewood, J. E. (1923). Some problems of "Partitio Numerorum": III... *Acta Mathematica*, 44(1), 1-70. https://doi.org/10.1007/BF02403921
- Type: journal_article | Evidence Tier: 2 | Quality: tier_1 | Relevance: core | Score: 9
- Annotation: Establishes a subconvexity bound for quadratic characters; directly addresses RQ sub-question 1.
```

---

## Schema 3: Synthesis Report (math-deep-research -> math-paper)

**Producer**: `math-deep-research/synthesis_agent`
**Consumer**: `math-deep-research/report_compiler_agent` | `math-paper/argument_builder_agent`

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `themes` | list[Theme] | 3-7 synthesized themes (NOT per-source summaries) |
| `research_gaps` | list[string] | What the literature does NOT address |
| `key_debates` | list[Debate] | Where sources disagree, with analysis |
| `methodology_recommendations` | list[string] | Recommended methodological approaches based on gaps |
| `theoretical_implications` | list[string] | How the synthesis informs theoretical understanding |
| `consensus_areas` | list[string] | Where sources agree |

### Theme Object

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Theme label |
| `description` | string | 3-5 sentence synthesis across multiple sources |
| `supporting_sources` | list[string] | Source IDs that contribute to this theme |
| `contradicting_sources` | list[string] | Source IDs that challenge this theme (if any) |
| `strength` | enum | `strong` (5+ sources) / `moderate` (3-4) / `emerging` (1-2) |

### Debate Object

| Field | Type | Description |
|-------|------|-------------|
| `position_a` | string | First position |
| `position_b` | string | Opposing position |
| `sources_a` | list[string] | Source IDs supporting position A |
| `sources_b` | list[string] | Source IDs supporting position B |
| `evidence_balance` | string | Analysis of which position has stronger evidence and why |

### Example

```markdown
## Synthesis

### Theme 1: Immediate Feedback Loop as Primary Mechanism
The mollifier method's primary advantage lies in its uniformity, reducing the gap between mean-value bounds and pointwise control. Multiple studies [S01, S04, S07, S12] converge on the stationary-phase analysis as the key variable, with exponents ranging from 1/3 to 1/2. This aligns with Levinson's (1969) zero-counting framework...

**Strength**: Strong (5 sources)
**Supporting**: [S01, S04, S07, S12, S15]
**Contradicting**: [S09] (argues quality matters more than speed)

### Research Gaps
1. No results for imprimitive characters of composite modulus
2. Limited data on AI assessment in laboratory courses

### Key Debates
| Position A | Position B | Evidence Balance |
|------------|------------|-----------------|
| AI feedback improves all STEM equally [S01, S04] | Effects concentrated in math/physics, weaker in biology [S08, S11] | Position B has stronger evidence; likely due to assessment type differences |
```

---

## Schema 4: Paper Draft (math-paper -> math-reviewer)

**Producer**: `math-paper/draft_writer_agent`
**Consumer**: `math-reviewer/*` (reviewer panel)

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Paper title |
| `abstract` | object | `{english: string, chinese: string}` (chinese is required only if bilingual) |
| `authors` | list[Author] | Author information with CRediT roles |
| `keywords` | object | `{en: list[string], zh_cn: list[string]}` bilingual keywords (3-6 each) |
| `sections` | list[Section] | Ordered paper sections |
| `references` | list[Reference] | Full reference list with cross-referencing |
| `total_word_count` | integer | Total word count (excluding references) |
| `citation_format` | enum | `"APA7"` / `"Chicago"` / `"MLA"` / `"IEEE"` / `"Vancouver"` |
| `structure_type` | enum | `"theoretical"` / `"survey_note"` / `"research_note"` |

### Section Object

| Field | Type | Description |
|-------|------|-------------|
| `heading` | string | Section heading |
| `level` | integer | Heading level (1-4) |
| `content` | string | Full section text |
| `word_count` | integer | Word count for this section |
| `citation_count` | integer | Number of in-text citations in this section |
| `argument_strength` | enum | `compelling` / `strong` / `adequate` / `weak` (see argument_builder scoring) |

### Reference Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique reference ID (e.g., `[R01]`) |
| `full_citation` | string | Full formatted citation |
| `doi` | string | DOI if available |
| `cited_in_sections` | list[string] | Section headings where this reference is cited |

### Author Object

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Full name |
| `affiliation` | string | Institution |
| `email` | string | Contact email (corresponding author only) |
| `credit_roles` | list[string] | CRediT taxonomy roles |
| `corresponding` | boolean | Is corresponding author |

---

## Schema 6: Review Report (math-reviewer -> math-paper)

**Producer**: `math-reviewer/editorial_synthesizer_agent`
**Consumer**: `math-paper/draft_writer_agent` (revision mode)

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `editorial_decision` | enum | `"Accept"` / `"Minor Revision"` / `"Major Revision"` / `"Reject"` |
| `reviewer_reports` | list[ReviewerReport] | Individual review reports |
| `consensus` | enum | `"CONSENSUS-4"` / `"CONSENSUS-3"` / `"SPLIT"` / `"DA-CRITICAL"` |
| `revision_roadmap` | list[RoadmapItem] | Prioritized list of required changes |
| `confidence_score` | integer | 0-100 editorial confidence |

### ReviewerReport Object

| Field | Type | Description |
|-------|------|-------------|
| `reviewer_id` | string | Reviewer identifier (e.g., `EIC`, `R1`, `R2`, `R3`, `DA`) |
| `role` | string | Reviewer role description |
| `dimension_scores` | object | Per-dimension scores (skill-specific) |
| `strengths` | list[string] | Paper strengths identified |
| `weaknesses` | list[Weakness] | Paper weaknesses identified |
| `questions` | list[string] | Questions for the authors |

### Weakness Object

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | What the weakness is |
| `severity` | enum | `critical` / `major` / `minor` |
| `type` | enum | `methodology` / `theory` / `evidence` / `writing` / `structure` / `ethics` |

---

## Schema 7: Revision Roadmap (math-reviewer -> math-paper revision)

**Producer**: `math-reviewer/editorial_synthesizer_agent`
**Consumer**: `math-paper/draft_writer_agent` (revision mode)

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `items` | list[RoadmapItem] | Ordered list of revision items |
| `total_items` | integer | Total number of items |
| `must_fix_count` | integer | Number of `must_fix` priority items |
| `editorial_decision` | enum | `"Accept"` / `"Minor Revision"` / `"Major Revision"` / `"Reject"` |
| `consensus_summary` | string | Summary of reviewer consensus |
| `dissenting_opinions` | list[string] | Notable disagreements among reviewers |

### RoadmapItem Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique revision ID (e.g., `REV-001`) |
| `description` | string | What needs to change |
| `reviewer` | string | Which reviewer(s) raised this (e.g., `R1, R3`) |
| `type` | enum | `"Major"` / `"Minor"` / `"Editorial"` |
| `priority` | enum | `"must_fix"` / `"should_fix"` / `"consider"` |
| `target_section` | string | Section of the paper to modify |
| `suggested_action` | string | How to address the item |
| `consensus_level` | enum | `"CONSENSUS-4"` / `"CONSENSUS-3"` / `"SPLIT"` / `"DA-CRITICAL"` |
| `verification_criteria` | string | How to confirm the fix is adequate |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `deadline_suggestion` | string | Suggested timeline for completion |

---

## Schema 8: Response to Reviewers (math-paper revision -> math-reviewer re-review)

**Producer**: `math-paper/draft_writer_agent` (revision mode)
**Consumer**: `math-reviewer/editorial_synthesizer_agent` (re-review)

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `revision_round` | integer | Which revision round (1, 2, ...) |
| `items` | list[ResponseItem] | Response to each revision roadmap item |
| `summary` | object | `{resolved: integer, limitations: integer, unresolvable: integer, disagreed: integer}` |
| `word_count_delta` | integer | Net word count change (positive = added, negative = removed) |
| `new_references_added` | integer | Count of new references added during revision |
| `summary_of_changes` | string | High-level summary of all modifications |
| `new_content_highlight` | list[string] | Sections with substantial new content |

### ResponseItem Object

| Field | Type | Description |
|-------|------|-------------|
| `roadmap_item_id` | string | Corresponds to RoadmapItem.id (e.g., `REV-001`) |
| `reviewer_comment` | string | Original reviewer comment (quoted) |
| `author_response` | string | Detailed response to the reviewer |
| `change_location` | string | Where in the paper the change was made (section + paragraph) |
| `change_block_ids` | list[string] | *(optional, #390 patch-mode rounds)* Block IDs the change landed in (`B0042`-form), the machine-checkable sibling of the free-text `change_location` — cross-checkable against the apply report's op list. **Populated by the orchestrator from the apply report, never by the writer** (spec §3.5 role split: inserted blocks get fresh IDs only at apply time, so the writer cannot know them; it emits provisional response items and the orchestrator completes the mechanical fields). Absent field = pre-patch-era or escalated full re-emission round (valid). |
| `status` | enum | `"RESOLVED"` / `"DELIBERATE_LIMITATION"` / `"UNRESOLVABLE"` / `"REVIEWER_DISAGREE"` |
| `decline_justification` | string | Required if status is `DELIBERATE_LIMITATION`, `UNRESOLVABLE`, or `REVIEWER_DISAGREE`; must cite evidence |

### Example

```markdown
## Response to Reviewers — Round 1

**Summary**: We have addressed all 12 revision items. 10 were fully addressed, 1 marked as deliberate limitation with explanation, and 1 respectfully declined with justification.

**Word Count Delta**: +420 words
**New References Added**: 3

### REV-001 (R1, R2 — CONSENSUS-3, must_fix)
**Reviewer Comment**: "The sample size justification is insufficient for the claimed effect size."
**Status**: RESOLVED
**Response**: We have added a formal power analysis (G*Power 3.1) in Section 3.2, paragraph 2. The analysis confirms that our sample of N=240 provides 0.85 power to detect a medium effect (d=0.5) at alpha=0.05...
**Changes**: Section 3.2 paragraph 2 (new content, +180 words)

### REV-007 (DA — DA-CRITICAL, must_fix)
**Reviewer Comment**: "Selective reporting of outcomes suggests confirmation bias."
**Status**: RESOLVED
**Response**: We acknowledge this valid concern. We have now reported ALL pre-registered outcomes including the two non-significant results (peer interaction frequency, self-efficacy subscale)...
**Changes**: Section 4.1 Table 3 (expanded), Section 5 paragraph 4 (new discussion of null results)
```

---

## Schema 10: Style Profile (intake -> draft_writer / report_compiler)

**Producer**: `agents/intake_agent` (Step 10)
**Consumer**: `agents/draft_writer_agent`, `agents/report_compiler_agent`
**Carried by**: passed directly as an artifact between skills

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `calibration_source` | list[string] | Filenames or titles of the analyzed writing samples |
| `sample_count` | integer | Number of samples analyzed (minimum 1, recommended 3+) |
| `sentence_length` | object | `{mean: float, stddev: float, rhythm_pattern: string}` |
| `paragraph_length` | object | `{mean_sentences: float, variation: string}` |
| `vocabulary_preferences` | object | `{hedging_words: list[string], transition_words: list[string], preferred_verbs: list[string], formality: string}` |
| `citation_style` | object | `{narrative_ratio: float, parenthetical_ratio: float, density: float, placement: string}` |
| `modifier_style` | enum | `"minimal"` / `"moderate"` / `"elaborate"` |
| `register_shifts` | list[object] | `[{section_name: string, assertiveness_level: string}]` |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `conflicts_with_discipline` | list[string] | Noted conflicts between personal style and discipline/journal norms |
| `partial_profile` | boolean | `true` if < 3 samples were analyzed (lower confidence) |
| `language_mismatch` | boolean | `true` if samples are in a different language than the target paper |

### Consumption Priority System

```
Priority 1 (HARD):   Discipline conventions — cannot be violated
Priority 2 (STRONG): Target journal conventions — if specified
Priority 3 (SOFT):   Author's personal style — only where it does not conflict with 1 or 2
```


### Example

```markdown
## Style Profile

**Calibration Source**: ["Chen_2024_AI_assessment.pdf", "Chen_2023_formative_feedback.pdf", "Chen_2022_STEM_pedagogy.pdf"]
**Sample Count**: 3

**Sentence Length**: mean: 22, stddev: 8, rhythm: "variable — mixes 10-word punchy sentences with 35-word complex ones"
**Paragraph Length**: mean 5 sentences, variation: "moderate — 3-7 sentences, shorter in Methods"
**Vocabulary Preferences**:
  - Hedging: suggests, appears to, may
  - Transitions: However, In contrast, Yet
  - Reporting verbs: found, argued, noted
  - Formality: moderate-formal
**Citation Style**: narrative 40%, parenthetical 60%, density 2.3/paragraph, placement: mixed
**Modifier Style**: minimal
**Register Shifts**: [Methods: neutral, Results: descriptive, Discussion: assertive, Conclusion: personal]
**Conflicts**: "Author prefers passive voice (68% in samples), but mathematics convention favors impersonal constructions — keeping impersonal per convention."
```

---

### Schema 11: R&R Traceability Matrix

**Producer (multi-stage, Kong A1 / v3.11)**:
- `concern_id` / `priority` / `original_comment` / `reviewer_source`: math-reviewer (first-round review)
- `commitment_extracted`: revision_coach_agent (Step 3.5 Commitment Extraction Pass)
- `authors_claim` / `revision_location` / `fulfillment_status` / `unfulfilled_rationale` / `residual_action`: math-paper revision execution (authored), then independently confirmed by re-review
- `verified` / `status` / `quality_assessment`: math-reviewer (re-review mode)

**Consumer**: math-paper (revision mode, if further revision needed), math-reviewer (re-review mode).

**Purpose**: Maps every reviewer concern through the full revision cycle — what was raised, what the author claims to have done, where the change is, and whether it was independently verified.

**Required fields**:
- `concern_id`: Unique ID (R1, R2, S1, S2, N1...)
- `priority`: `MUST_FIX` / `SHOULD_FIX` / `CONSIDER`
- `original_comment`: The reviewer's original concern text
- `authors_claim`: What the author states they did (from Response to Reviewers)
- `revision_location`: Section/page/paragraph reference in revised manuscript
- `verified`: `YES` (✅) / `PARTIAL` (⚠️) / `NO` (❌) / `CANNOT_VERIFY` (🔍)
- `status`: `FULLY_ADDRESSED` / `PARTIALLY_ADDRESSED` / `NOT_ADDRESSED` / `MADE_WORSE`
- `quality_assessment`: Free-text evaluation

**Optional fields**:
- `reviewer_source`: Which reviewer originally raised the concern (EIC, R1, R2, R3, DA)
- `residual_action`: What remains to be done if not fully addressed. This is a single concern-level string (one per Schema 11 row), distinct from the per-commitment `unfulfilled_rationale` field nested inside each `commitment_extracted` object below. Two coherence conventions govern how the two interact:
  - **(a) Semantic relationship on a partial / multi-commitment row.** A commitment's `unfulfilled_rationale` is diagnostic and per-commitment — it explains *why that commitment fell short* (backward-looking, carried on the commitment object itself). `residual_action` is forward-looking and concern-level — it states *what still remains to be done for the whole concern*. They are different granularity and different tense, so a row may legitimately carry both at once; this is neither redundancy nor contradiction. Example: a commitment object with `unfulfilled_rationale: "3-seed std error only; 5-seed deferred per §6"` (why) alongside the row-level `residual_action: "Run 5-seed replication in camera-ready"` (what remains).
  - **(b) Multi-commitment shape convention.** When one concern decomposes into N commitments, `residual_action` stays a single concern-level string (an aggregate of what remains across the concern); it is **not** expanded into a list or split per commitment. The per-commitment "why" lives on each commitment object's `unfulfilled_rationale`; the concern-level "what remains" stays on the row's `residual_action`.
- `commitment_extracted`: (Kong A1 / v3.11; nested-object shape since #268) List of objects extracted from `original_comment` by `revision_coach_agent` Step 3.5. Each object carries three **extraction** fields plus two optional **lifecycle** fields. The extraction fields are written at Step 3.5: `commitment_text` (string, verbatim or minimally normalized promise), `commitment_type` ∈ `{add_experiment, add_analysis, add_clarification, add_citation, restructure, other}`, and `required_evidence_type` ∈ `{new_section, new_figure, new_table, new_citation, methods_paragraph, discussion_paragraph, prose_edit, acknowledgment_only, other}`. Of these nine, seven are **manuscript-evidence** types verified at `revision_location` in the revised manuscript (`new_section`, `new_figure`, `new_table`, `new_citation`, `methods_paragraph`, `discussion_paragraph`, `prose_edit`); `acknowledgment_only` is the one **response-letter-evidence** type verified in the Response to Reviewers (Schema 8); `other` is an underspecified escape hatch that triggers a soft advisory at re-review (see `re_review_mode_protocol` Commitment Ledger Verification). `prose_edit` covers sentence- or paragraph-level prose changes too granular to bucket into the section/figure/table/etc. categories (typo fixes, terminology clarifications, equation formatting, citation-style corrections). The lifecycle fields (`fulfillment_status`, `unfulfilled_rationale`, defined next) are **absent at extraction time** and appended per-object during revision execution. Empty list `[]` is valid (comment carried no extractable commitment, e.g., positive feedback).
  - `commitment_extracted[].fulfillment_status`: (Kong A1 / v3.11; per-object since #268) Optional lifecycle field nested **inside each `commitment_extracted` object** (not a top-level Schema 11 field), ∈ `{fulfilled, partial, not-fulfilled, explicitly-rejected-with-rationale}`. Absent on a commitment object until revision execution fills it. Nesting it inside the object (rather than carrying a separate parallel list) makes index desynchronization between commitment and status structurally impossible (the failure mode #268 closes).
  - `commitment_extracted[].unfulfilled_rationale`: (Kong A1 / v3.11; per-object since #268) Optional lifecycle field nested **inside each `commitment_extracted` object** (not a top-level Schema 11 field): a free-text rationale required iff that object's `fulfillment_status` ∈ `{partial, not-fulfilled, explicitly-rejected-with-rationale}`. **Omitted** (not the empty string) when `fulfillment_status == fulfilled` or absent — the old `""` placeholder existed only to keep the parallel lists aligned and is dead weight in the nested shape. Three valid rationale forms: (a) "done elsewhere, see §X" pointer, (b) "rejected, reasons: …" rationale, (c) "deferred to future work" acknowledgment.

**Validation**:
- Every item from the original Revision Roadmap (Schema 7) must appear in the matrix
- `authors_claim` cannot be empty for Priority 1 items (flag as `CANNOT_VERIFY` if missing)
- Matrix travels as an artifact between skills (math-paper revision -> math-reviewer re-review)
- Each object in `commitment_extracted` MUST carry the three extraction fields (`commitment_text`, `commitment_type`, `required_evidence_type`). The two lifecycle fields are nested per-object: `fulfillment_status` is optional (absent before revision execution); `unfulfilled_rationale` MUST be present and non-empty iff that object's `fulfillment_status` ∈ `{partial, not-fulfilled, explicitly-rejected-with-rationale}`, and MUST be absent when `fulfillment_status == fulfilled` or absent. There is no separate top-level `fulfillment_status` / `unfulfilled_rationale` list — the equal-length invariant the parallel-list shape needed is retired because length mismatch is now structurally impossible (#268). Empty list `commitment_extracted: []` stays valid (comment carried no extractable commitment). Violations (a non-`fulfilled` commitment object missing its `unfulfilled_rationale`) surface as `COMMITMENT_GAP` advisory at re-review (advisory only — author retains final responsibility).
- **Legacy normalization (pre-#268 artifacts).** If an artifact still carries the old top-level parallel arrays (`fulfillment_status` / `unfulfilled_rationale` as separate lists alongside `commitment_extracted`), normalize them into the nested objects before re-review. **First verify all three were the same length** — a pre-#268 artifact may already be desynchronized (the exact failure mode #268 closes), so do NOT auto-zip a length-mismatched ledger; flag it for manual reconciliation against the source comments instead. Only for an equal-length legacy row: copy the i-th `fulfillment_status` onto the i-th commitment object, and copy the i-th `unfulfilled_rationale` only when non-empty (an empty `""` or missing entry on a non-`fulfilled` status normalizes to an *absent* nested `unfulfilled_rationale` — i.e. the nested COMMITMENT_GAP case, not a literal empty string). Re-review agents then verify ONLY the nested per-object shape; they do not walk parallel top-level arrays.

---

## Validation Rules

1. **Required field check**: All schema fields marked without "(optional)" or "No" in the Required column are REQUIRED. Consumer agents MUST verify all required fields are present before proceeding
2. **Type check**: Fields must match declared types (e.g., `enum` values must be from the allowed set)
3. **Cross-reference check**: Source IDs referenced in Synthesis must exist in Bibliography; RevisionItem IDs in Response to Reviewers must match the Revision Roadmap
5. **Failure on missing**: If a required field is missing, return `HANDOFF_INCOMPLETE` with a list of missing fields; do NOT proceed with partial data
6. **Producer validation**: Producing agent must validate output against its schema BEFORE handoff
7. **Consumer validation**: Consuming agent should validate input on receipt and request re-generation if schema violations are found

## `data_access_level` (v3.3.2+)

Every top-level `SKILL.md` declares `metadata.data_access_level` with one of three values:

- `raw` — consumes unverified sources; must assume adversarial/hallucinated input
- `redacted` — operates on sanitized material; no new raw ingestion
- `verified_only` — runs only on material that has passed source-verification

This is a declarative signal (not a runtime permission system). When adding a new skill, pick the value matching the *dirtiest* input the skill may legitimately consume.

## `task_type` (v3.3.2+)

Every top-level `SKILL.md` declares `metadata.task_type` with one of two values:

- `outcome-gradable` — the task has an objective scalar metric the skill optimizes against; a third party can score the output without deep context
- `open-ended` — the task's quality depends on domain judgment, interpretive work, or context no metric captures

This is a declarative truth-in-advertising signal. All current skills are `open-ended`: mathematics research output is judged by the validity of the mathematics and the clarity of the argument, which no scalar metric captures. When adding a new skill, do not invent a third value; if the skill genuinely spans both, split it into two skills.


See [`ground_truth_isolation_pattern.md`](ground_truth_isolation_pattern.md) for the rationale and rules behind this annotation.


