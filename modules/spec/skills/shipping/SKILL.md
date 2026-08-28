---
name: shipping
agent: releaser
description: Prepares code for release with git workflow, documentation, and commit/release/audit modes.
---

# Shipping

## Overview

The Shipping subskill merges git-workflow, ci-cd, and documentation-and-adrs into a unified shipping workflow. It prepares code for release, writes clear commit messages, updates documentation, and hands off to archive.

## How It Works

The skill detects the complexity of the release, selects the appropriate mode, executes the shipping workflow (commit, documentation, versioning), and hands off to the archive skill.

**Workflow:**

1. Detect complexity (commit/release/audit)
2. Select appropriate mode
3. Execute shipping workflow
4. Update documentation
5. Hand off to archive

## Usage

### Commit Mode (Lite)

Atomic commits for changes.

**When:** After review, before push
**Duration:** 2-5 minutes
**Output:** Clean commit history

**Workflow (git-workflow):**

1. Stage changes
2. Write conventional commit
3. Push to branch

**Output:**

```bash
git add -A
git commit -m "feat(auth): add dark mode support

- Add CSS variables for theming
- Add system preference detection
- Add manual toggle in settings

Closes #123"
```

### Release Mode (Normal)

Full release workflow.

**When:** Preparing for production
**Duration:** 10-30 minutes
**Output:** Release ready

**Workflow:**

1. **Version**: Bump version (semver)
2. **Changelog**: Update CHANGELOG.md
3. **Documentation**: Update README, API docs
4. **Tests**: Run full test suite
5. **Build**: Verify build passes
6. **Tag**: Create release tag
7. **Push**: Push with tags

**Output:**

```bash
# Version bump
npm version minor

# Tag and push
git tag v1.2.0
git push --tags
```

### Audit Mode (Heavy)

Documentation and observability audit.

**When:** Major releases, architecture changes
**Duration:** 30-60 minutes
**Output:** Complete documentation

**Workflow:**

1. **API Documentation**: Update API docs
2. **Architecture Decision Records**: Write ADRs
3. **Observability**: Add logging, metrics, tracing
4. **Runbook**: Create operations runbook
5. **Migration Guide**: Write migration guide if breaking changes

## Output

A clean commit history with conventional commits, updated CHANGELOG.md, version tags, and updated API documentation.

## Integration

### With Reviewing Subskill

```
Reviewing → Shipping
Input: Approved code
Output: Ready to ship
```

### With Archive

```
Shipping → Archive
Input: Shipped code
Output: Archived spec
```

### With Lightspec

```
lightspec update <id> --task <task-id> --status shipped
```

## Mode Selection

### Auto-Detect

```
Simple changes    → commit
Release work      → release
Major release     → audit
```

### Manual Override

```
User: "Commit this"    → commit mode
User: "Prepare release" → release mode
User: "Full audit"     → audit mode
```

## Present Results

Report what was shipped: commit hash, version tag, changelog entry, and any documentation updates. Highlight breaking changes or migration steps.

## Troubleshooting

- **Dirty working tree**: If there are uncommitted changes, commit or stash before shipping.
- **Version conflict**: If the version tag already exists, bump the version again or force with caution.
- **Missing docs**: If documentation is missing, use audit mode to generate ADRs and runbooks before release.
