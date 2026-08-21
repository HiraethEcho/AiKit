---
description: ARS math-paper `rebuttal-audit` mode — QA an existing rebuttal draft against reviewer comments
agent: math-writer
compatibility: opencode
---

Trigger the `math-paper` skill in `rebuttal-audit` mode. Requires BOTH the reviewer comments AND an existing rebuttal/response draft to evaluate. Produces an advisory QA report (per-comment coverage + gaps + risk flags). Does NOT generate a new response, and does NOT emit Schema 11 / verified status. Fidelity spectrum, low oversight.

If only reviewer comments are present (no draft yet), use `revision-coach` instead.

