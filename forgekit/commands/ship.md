---
description: Run the pre-launch checklist and prepare for release (sdd ship stage)
---

Follow the `shipping` skill.

Run through the pre-launch checklist:

1. **Code Quality** — tests pass, build clean, lint clean, no unresolved TODOs
2. **Security** — audit clean, no secrets in code, auth in place, headers configured (follow `security-and-hardening`)
3. **Performance** — no N+1 queries, images optimized, bundle sized (follow `performance-optimization`)
4. **Accessibility** — keyboard nav, screen reader, contrast (follow `frontend-ui-engineering` a11y section)
5. **Infrastructure** — env vars set, migrations ready, monitoring configured (follow `ci-cd-and-automation`)
6. **Documentation** — README current, ADRs written, changelog updated (follow `documentation-and-adrs`)

Report any failing checks and help resolve them. Define the rollback plan before proceeding.

**sdd lifecycle**: after release, archive the change — `lightspec archive <id>` (per the workflow block; lite workflow uses `/archive`), then write the change's decisions back to SPEC.md Decisions.
