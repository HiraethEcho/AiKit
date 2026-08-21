# Mode Registry

Single source of truth for all modes across the ars-for-math (arsm) suite. **25 modes** across 3 skills.

When adding or modifying modes, update this file first — SKILL.md files and commands should reference this registry.

Last updated: port of v3.13.0 (2026-06-18), pipeline removed

---

## math-deep-research (8 modes)

| Mode                | Spectrum    | Output                                               | Oversight | Triggers                                                                      |
| ------------------- | ----------- | ---------------------------------------------------- | --------- | ----------------------------------------------------------------------------- |
| `full`              | Balanced    | APA 7.0 report, 3,000-8,000 words                    | High      | "research [topic]", "deep research", "academic analysis"                      |
| `quick`             | Fidelity    | Research brief, 500-1,500 words                      | Medium    | "quick brief", "30 minute summary", "quick research"                          |
| `review`            | Balanced    | Reviewer report on provided text                     | High      | "review this paper", "evaluate this paper", "assess this source"              |
| `lit-review`        | Fidelity    | Annotated bibliography + synthesis                   | Medium    | "literature review", "annotated bibliography"                                 |
| `three-way-scan`    | Fidelity    | WHY/HOW/WHAT paper shortlist + cross-paper synthesis | Low       | "WHY HOW WHAT papers", "3W literature scan", "compare these papers"           |
| `fact-check`        | Fidelity    | Claim-by-claim verification report                   | Medium    | "verify claims", "fact-check", "evidence verification"                        |
| `socratic`          | Originality | Research Plan Summary + INSIGHT collection           | Very High | "guide my research", "help me think through", "I'm not sure what to research" |
| `systematic-review` | Fidelity    | PRISMA 2020 report, 5,000-15,000 words               | Medium    | "systematic review", "meta-analysis", "PRISMA"                                |

## math-paper (10 modes)

| Mode             | Spectrum    | Output                                                                                                                  | Oversight | Triggers                                                                    |
| ---------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------- |
| `full`           | Balanced    | Complete paper draft (theorem-proof structure or domain-appropriate)                                                    | High      | "write a paper", "academic paper", "research paper"                         |
| `plan`           | Originality | Chapter Plan + INSIGHT collection (Socratic)                                                                            | Very High | "guide my paper", "help me plan", "step by step paper"                      |
| `outline-only`   | Balanced    | Detailed outline + evidence map                                                                                         | High      | "paper outline", "just need an outline"                                     |
| `revision`       | Fidelity    | Revised draft + point-by-point R&R responses                                                                            | High      | "revise paper", "incorporate reviewer feedback"                             |
| `revision-coach` | Balanced    | Revision Roadmap + Response Letter Skeleton                                                                             | Medium    | "parse reviews", "I got reviewer comments"                                  |
| `abstract-only`  | Fidelity    | Bilingual abstract + keywords                                                                                           | Medium    | "write abstract"                                                            |
| `lit-review`     | Fidelity    | Annotated bibliography in paper format                                                                                  | Medium    | "literature review paper", "write a lit review"                             |
| `format-convert` | Fidelity    | Formatted document (LaTeX → PDF)                                                                       | Low       | "convert to LaTeX", "convert citations to [format]"                         |
| `citation-check` | Fidelity    | Citation error report                                                                                                   | Low       | "check citations", "verify references"                                      |
| `rebuttal-audit` | Fidelity    | Advisory QA of an existing rebuttal draft (per-comment coverage + gaps + risk flags); no generation; no ledger emission | Low       | "audit my response", "check my rebuttal", "did I miss any reviewer comment" |

## math-reviewer (6 modes)

| Mode                | Spectrum    | Output                                                   | Oversight | Triggers                                           |
| ------------------- | ----------- | -------------------------------------------------------- | --------- | -------------------------------------------------- |
| `full`              | Balanced    | 5 review reports + Editorial Decision + Revision Roadmap | High      | "review paper", "peer review", "manuscript review" |
| `re-review`         | Fidelity    | Revision verification checklist + residual issues        | Medium    | "check revisions", "verification review"           |
| `quick`             | Fidelity    | EIC quick assessment + key issues list                   | Low       | "quick review", "quick look"                       |
| `methodology-focus` | Fidelity    | In-depth methodology review                              | Medium    | "check methodology", "focus on methods"            |
| `guided`            | Originality | Socratic issue-by-issue dialogue                         | Very High | "guide me to improve", "walk me through issues"    |
| `calibration`       | Fidelity    | Calibration Report (FNR/FPR/AUC) + confidence disclosure | Medium    | "calibrate reviewer", "measure reviewer accuracy"  |

---

## Summary

| Metric      | Count    |
| ----------- | -------- |
| Total modes | 25       |
| Fidelity    | 15 (60%) |
| Balanced    | 6 (24%)  |
| Originality | 4 (16%)  |

### Oversight levels

| Level     | Meaning                                                   |
| --------- | --------------------------------------------------------- |
| Very High | User-led dialogue or mandatory checkpoints at every stage |
| High      | User confirms key decisions (RQ, outline, configuration)  |
| Medium    | Structured format with limited decision points            |
| Low       | Mechanical/template-driven, minimal human input           |
