---
description: Conduct a code review — five-axis, fresh-perspective, or criteria-walk
---

Follow the `reviewing` skill — five-axis standard mode, fresh-perspective mode (pre-merge blind-spot check), or criteria-walk mode (verify acceptance criteria), per the change.

Review the current changes (staged or recent commits) across five axes:

1. **Correctness** — matches the spec? Edge cases handled? Tests adequate?
2. **Readability** — clear names, straightforward logic, well-organized?
3. **Architecture** — follows existing patterns? Clean boundaries? Right abstraction?
4. **Security** — input validated? Secrets safe? Auth checked? Follow `security-and-hardening` where relevant.
5. **Performance** — no N+1 queries, unbounded ops? Follow `performance-optimization` where relevant.

**PR review**: run PR Triage first (see `reviewing`) — security/convention/intent lenses, then recommend full / targeted / reject.

**Pre-merge**: use fresh-perspective mode — read adjacent unchanged files for blind-spot bugs the author missed.

**Post-implementation**: use criteria-walk mode — verify each acceptance criterion (PASS/PARTIAL/FAIL/UNVERIFIED).

Categorize findings Critical / Important / Suggestion with file:line references and fix recommendations. Run the ponytail over-engineering pass as the final step.
