---
title: RAISE Framework (v3.4.0 snapshot)
snapshot_date: "2025-07-17"
upstream_source: "https://eppi.ioe.ac.uk/CMS/Portals/0/RAISE%20ESG%20BPWG.pdf"
upstream_version: "NIHR ESG Best Practice Working Group consultation draft, 17 July 2025"
citation: "Thomas J, Flemyng E, Noel-Storr A, et al. Responsible Use of AI in Evidence Synthesis (RAISE). NIHR ESG Best Practice Working Group in AI/Automation, EPPI-Centre, UCL Social Research Institute. 17 July 2025."
related: "Position Statement on AI Use in Evidence Synthesis (Cochrane, Campbell, JBI, CEE), Campbell Systematic Reviews, 2025, doi:10.1002/cl2.70074"
---

# RAISE Framework

## Scope disclaimer (required, do not remove)

RAISE's official scope is **evidence synthesis** (systematic review, meta-analysis, scoping review, rapid review, evidence mapping). When the skills apply RAISE **principles** to non-evidence-synthesis work — e.g., `math-paper full` on primary research — this is a **principle extension**, not official RAISE compliance. RAISE compliance is only claimed for outputs produced in `systematic_review` or `other_evidence_synthesis` modes.

**Used by**: `math-deep-research` systematic-review mode and `math-paper` disclosure mode.

## Four principles

Each principle carries a definition, ARS check procedure, and pass/warn/fail criteria. These are the universal kernel of RAISE and are checked in every mode.

### Principle 1 — Human oversight

**Definition:** AI and automation in evidence synthesis should be used with meaningful human oversight, not as an autonomous replacement.
**ARS check:** Verify the methodology specifies reviewer count, qualifications, and adjudication mechanism, and that the manuscript describes the human oversight applied in practice.
**Pass:** Reviewer count + adjudication mechanism + qualifications all present, each with evidence path.
**Warn:** Any one missing, OR only present in vague form ("authors reviewed AI output").
**Fail:** Two or more missing.

### Principle 2 — Transparency

**Definition:** Any AI or automation use that makes or suggests judgements must be fully and transparently reported.
**ARS check:** Verify the manuscript lists every AI tool used, at what stage, with prompts/parameters/versions.
**Pass:** All declared tools reported AND all reported tools declared.
**Warn:** Mismatch in ≤1 tool, or reporting lacks one of {stage, prompt, parameters, version}.
**Fail:** Multiple tools undeclared OR systematically missing prompts/parameters.

### Principle 3 — Reproducibility

**Definition:** AI-assisted evidence synthesis should be reproducible to a stated level.
**ARS check:** Verify the manuscript carries a reproducibility statement (model version, seeds, prompt, data access details). Stochasticity must be declared.
**Pass:** Reproducibility statement present AND stochasticity declared.
**Warn:** One of the two missing.
**Fail:** Both missing.

### Principle 4 — Fit-for-purpose

**Definition:** AI tools should be chosen and validated for specific tasks within the evidence synthesis, not applied generically.
**ARS check:** Verify the manuscript describes why each AI tool was chosen for its specific task. Look for pilot-phase evidence OR prior validation citation.
**Pass:** Per-tool justification + ≥1 validation reference.
**Warn:** Justification present without validation reference.
**Fail:** Generic "we used AI to save time" with no task-level justification.

## Full 8-role matrix (SR mode only)

Used when `raise.mode == "full"` (SR and other_evidence_synthesis). Each role carries 2–3 responsibilities extracted from the RAISE consultation PDF. The agent maps ARS users and ARS itself onto the roles they occupy.

**Default role attribution:**
- ARS user (the human running the skill): Evidence Synthesists
- ARS itself (the skill suite): AI Development Teams + Methodologists (dual role)

### Role 1 — Evidence Synthesists

1. Remain ultimately responsible for the evidence synthesis, regardless of AI assistance.
2. Report AI use in the evidence synthesis manuscript transparently.
3. Ensure ethical, legal, and regulatory standards are adhered to when using AI.

**ARS check:** the manuscript contains an author responsibility statement; AI-usage disclosure is present; ethics section addresses AI use.

### Role 2 — AI Development Teams

1. Adhere to open-science practices when designing, building, testing, and validating tools.
2. Be transparent about when AI works best, its limitations, and any interests.
3. Commit to continued learning, development, and monitoring.

**ARS self-declaration:** ARS is open-source (CC BY-NC 4.0); CHANGELOG tracks limitations; calibration results published per `calibration_mode_protocol.md`.

### Role 3 — Methodologists

1. Adhere to open science practice when researching and evaluating AI systems.
2. Commit to independent evaluations and validation of AI systems.

**ARS self-declaration:** sixth-reviewer peer review remains planned.

### Role 4 — Publishers of evidence synthesis

1. Ensure best-practice standards for responsible AI use are clear and integrated into policies and guidelines for authors.
2. Request transparency and honesty from authors on their use of AI in evidence synthesis.

**ARS note:** Out of the skills' direct control; surfaced in the disclosure statement as stakeholder context.

### Role 5 — Users of evidence synthesis

1. Critically consider the potential influence of AI use in a synthesis before use.
2. Underscore the potential impacts of AI use in downstream documents and decision-making processes.
3. Communicate the need for transparent reporting of tool accuracy and biases.

**ARS note:** Out of direct scope; listed for ecosystem completeness.

### Role 6 — Trainers of evidence synthesis methods

1. Ensure best-practice standards for responsible AI are embedded within training materials.
2. Equip trainees with the knowledge they need to determine if an AI tool is appropriate.
3. Undertake continuous training and development to stay up to date with emerging AI tools.

**ARS note:** Out of direct scope.

### Role 7 — Organisations producing evidence synthesis

1. Ensure best-practice standards for responsible AI are clear and integrated into policies and guidelines.
2. Promote, guide, and support responsible AI use in evidence synthesis activities.
3. Monitor the development and use of AI within the organisation.

**ARS note:** Out of direct scope.

### Role 8 — Funders of evidence synthesis

1. Encourage the responsible use of AI.
2. Consider sustainability and generalisability of the products they support.

**ARS note:** Out of direct scope.

## Usage in systematic-review / disclosure modes

- SR mode: `raise.mode = "full"`, both principles AND roles populated
- primary_research mode: `raise.mode = "principles_only"`, `roles` field absent or empty
- other_evidence_synthesis mode: `raise.mode = "full"`, roles populated with adaptation noted in evidence paths

Block decisions follow tier semantics: any principle at `fail` status + `systematic_review` mode → `block`. `primary_research` mode **never** blocks.
