# Firm Rules — Canonical Source

This file is the **single source of truth** for firm-rule wording that is otherwise duplicated verbatim across agent prompts. Each block below is the canonical text; the agent prompts listed under "Mirrored in" carry a byte-identical copy (modulo the agent's self-reference noun, where noted).

**Why this file exists:** the contamination `R-L3-2-*` wording provably drifted between v3.9.0 (contamination-only) and v3.9.4 (contamination-AND-temporal) drafts before being single-sourced here. Manual 5×-duplication is not enough; the canonical blocks below pin it.

**ID namespaces (do NOT confuse):**

- `R-L3-2-*` = **contamination advisory** rules (origin: v3.7.3 spec §3.2 L3-2; extended v3.9.0 §3.3).
- `R-L3-1-*` = per-citation locator gate (v3.7.3 §3.1). Not mirrored here.

---

## Contamination advisory firm rules (R-L3-2-\*)

> **Canonical wording note:** R-L3-2-A carries the **v3.10 PR-B broad form** (default-advisory + opt-in strict extension across contamination AND temporal namespaces; temporal strict not yet wired). This block is the single source of truth for the wording; the contamination mirrors below are intentionally _by-ID references_, not full-block copies (see the "Mirrored in (contamination rules)" note).

<!-- canonical:R-L3-2-A -->

- **R-L3-2-A (default-advisory + opt-in strict extension):** By default, contamination and temporal-integrity signals never block emission on their own; in a namespace that accepts a `strict` value, a user-enabled strict policy may promote that namespace's specified signals to non-acknowledgeable terminal blockers. v3.10 accepts a strict value for `contamination_triangulation` only; `temporal_integrity` accepts `advisory` only (no temporal strict path exists yet). This follows the v3.5 Collaboration Depth Observer + v3.6.8 LOW-WARN precedent: hard-gating contamination by default would amount to refusing to cite mid-2024+ preprints en masse, which is too coarse — so the terminal promotion is opt-in (off by default), scoped to the namespace's accepted-strict signals, and surfaced via the §formatter terminal gate, never silently.
<!-- /canonical:R-L3-2-A -->

<!-- canonical:R-L3-2-B -->

- **R-L3-2-B (no retroactive computation):** bibliography_agent computes contamination_signals at ingest time, not at audit time. Re-running the check post-hoc on existing entries is a separate batch operation (deferred to user invocation; not part of the cite-time verification pass).
<!-- /canonical:R-L3-2-B -->

<!-- canonical:R-L3-2-C -->

- **R-L3-2-C (triangulation count over present fields):** k is computed over `*_unmatched` fields that are present. Absent fields are excluded from the count and do not default to either `true` or `false`. k_max reflects how many lookups were successfully run; the (k, k_max) pair together determines the annotation tier.
<!-- /canonical:R-L3-2-C -->

<!-- canonical:R-L3-2-D -->

- **R-L3-2-D (no API-inferred classification):** OpenAlex's `primary_location.source.type` and Crossref's `type` fields, even when returned by the APIs for matched entries, MUST NOT be used to derive any classification (venue_type, scope category, hard-block eligibility). The k=3 case makes those classifications structurally unavailable; including them in any classification logic creates fake precision.
<!-- /canonical:R-L3-2-D -->

<!-- canonical:R-L3-2-E -->

- **R-L3-2-E (gate refusal list unchanged by advisory tiers; terminal blocks ride a separate generic rule):** All triangulation _annotations_ are advisory. The terminal gate **refusal list** is NOT extended by any advisory marker shape. The gate's **advisory pass-through allowlist** MUST be extended in lockstep with any new advisory suffix so that new advisory suffixes are not accidentally routed through a refusal rule. The fix for a new advisory suffix is pass-through-list expansion, not refusal-list change. v3.10 adds a _generic_ terminal-refusal rule (formatter rule 11) that fires on any unresolved `severity=HIGH-BLOCK` token inside a `<!--ref:...-->` marker — it is NOT a per-suffix refusal entry, so the advisory suffix table and pass-through allowlist stay unchanged when a strict policy promotes a signal.
<!-- /canonical:R-L3-2-E -->

**Mirrored in (contamination rules):**

- `agents/formatter_agent.md` — R-L3-2-A + R-L3-2-E (in the contamination pass-through paragraph).
- `skills/math-deep-research/references/crossref_api_protocol.md` — R-L3-2-A (user-discretion reference).
- `skills/math-deep-research/references/openalex_api_protocol.md` — R-L3-2-A reference.
- `agents/bibliography_agent.md` — R-L3-2-B (ingest-time computation).

> These mirrors are **intentionally by-ID prose references**, not full-block copies (e.g. crossref's "the user retains discretion per R-L3-2-A", the formatter's "advisory per ... R-L3-2-A + R-L3-2-E"). The wording lives in exactly one place — the canonical block above — so the single-source goal is met without duplicating the full rule text into five files. A by-ID reference's surrounding prose MUST NOT assert an unqualified "advisory only" / "never block" / "cannot block" / "must not block" / "non-blocking" claim, since a strict policy can now block.
