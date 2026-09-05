---
name: git-workflow-and-versioning
description: Structures git workflow practices. Use when making any code change. Use when committing, branching, resolving conflicts, or when you need to organize work across multiple parallel streams. Also covers repo status snapshotting — local vs remote sync, branches, open PRs, and working tree state.
---

# Git Workflow and Versioning

## Overview

Git is your safety net. Treat commits as save points, branches as sandboxes, and history as documentation. With AI agents generating code at high speed, disciplined version control is the mechanism that keeps changes manageable, reviewable, and reversible.

## When to Use

Always. Every code change flows through git.

## Agent Operating Rule: Stay on the Current Branch

**The agent does not create, switch, or delete branches.** Branch selection belongs to the human — they check out the branch they want before handing work to the agent. Work in whatever branch is currently checked out.

- If the current branch looks unsuitable for the change (for example, you are on `main`/`master` and the change is not a trivial one), **stop and tell the user** so they can create the branch. Do not create it for them.
- You may still split work into separate atomic commits on the current branch — and you *should* propose that whenever a change mixes concerns.
- Worktrees are a human-initiated technique for parallel work (see [Working with Worktrees](#working-with-worktrees)); setting them up is not an agent action under this skill.

The branching material below — trunk-based development, feature branches, naming — is **reference guidance for humans** deciding how to organize work. It is not a license for the agent to create branches.

**Project overrides:** if `.ai/agent-skills-overrides.md` has a `## git-workflow-and-versioning` section with `branching: allow`, the agent may create feature branches following the naming guidance below. The default is `branching: never`. See [docs/agent-skills-setup.md](../../docs/agent-skills-setup.md).

## Core Principles

### Trunk-Based Development (Recommended)

Keep `main` always deployable. Work in short-lived feature branches that merge back within 1-3 days. Long-lived development branches are hidden costs — they diverge, create merge conflicts, and delay integration. DORA research consistently shows trunk-based development correlates with high-performing engineering teams.

```
main ──●──●──●──●──●──●──●──●──●──  (always deployable)
        ╲      ╱  ╲    ╱
         ●──●─╱    ●──╱    ← short-lived feature branches (1-3 days)
```

This is the recommended default. Teams using gitflow or long-lived branches can adapt the principles (atomic commits, small changes, descriptive messages) to their branching model — the commit discipline matters more than the specific branching strategy.

- **Dev branches are costs.** Every day a branch lives, it accumulates merge risk.
- **Release branches are acceptable.** When you need to stabilize a release while main moves forward.
- **Feature flags > long branches.** Prefer deploying incomplete work behind flags rather than keeping it on a branch for weeks.

### 1. Commit Early, Commit Often

Each successful increment gets its own commit. Don't accumulate large uncommitted changes.

```
Work pattern:
  Implement slice → Test → Verify → Commit → Next slice

Not this:
  Implement everything → Hope it works → Giant commit
```

Commits are save points. If the next change breaks something, you can revert to the last known-good state instantly.

### 2. Atomic Commits

Each commit does one logical thing:

```
# Good: Each commit is self-contained
git log --oneline
a1b2c3d Add task creation endpoint with validation
d4e5f6g Add task creation form component
h7i8j9k Connect form to API and add loading state
m1n2o3p Add task creation tests (unit + integration)

# Bad: Everything mixed together
git log --oneline
x1y2z3a Add task feature, fix sidebar, update deps, refactor utils
```

### 3. Descriptive Messages

Commit messages explain the *why*, not just the *what*:

```
# Good: Explains intent
feat: add email validation to registration endpoint

Prevents invalid email formats from reaching the database.
Uses Zod schema validation at the route handler level,
consistent with existing validation patterns in auth.ts.

# Bad: Describes what's obvious from the diff
update auth.ts
```

**Format:**
```
<type>: <short description>

<optional body explaining why, not what>
```

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `refactor` — Code change that neither fixes a bug nor adds a feature
- `test` — Adding or updating tests
- `docs` — Documentation only
- `chore` — Tooling, dependencies, config

### 4. Keep Concerns Separate

Don't combine formatting changes with behavior changes. Don't combine refactors with features. Each type of change should be a separate commit — and ideally a separate PR:

```
# Good: Separate concerns
git commit -m "refactor: extract validation logic to shared utility"
git commit -m "feat: add phone number validation to registration"

# Bad: Mixed concerns
git commit -m "refactor validation and add phone number field"
```

**Separate refactoring from feature work.** A refactoring change and a feature change are two different changes — submit them separately. This makes each change easier to review, revert, and understand in history. Small cleanups (renaming a variable) can be included in a feature commit at reviewer discretion.

### 5. Size Your Changes

Target ~100 lines per commit/PR. Changes over ~1000 lines should be split. See the splitting strategies in `reviewing` for how to break down large changes.

```
~100 lines  → Easy to review, easy to revert
~300 lines  → Acceptable for a single logical change
~1000 lines → Split into smaller changes
```

## Branching Strategy

> Reference guidance for humans organizing work. Per the [Agent Operating Rule](#agent-operating-rule-stay-on-the-current-branch), the agent does not create or switch branches unless the project opts in with `branching: allow`.

### Feature Branches

```
main (always deployable)
  │
  ├── feature/task-creation    ← One feature per branch
  ├── feature/user-settings    ← Parallel work
  └── fix/duplicate-tasks      ← Bug fixes
```

- Branch from `main` (or the team's default branch)
- Keep branches short-lived (merge within 1-3 days) — long-lived branches are hidden costs
- Delete branches after merge
- Prefer feature flags over long-lived branches for incomplete features

### Branch Naming

```
feature/<short-description>   → feature/task-creation
fix/<short-description>       → fix/duplicate-tasks
chore/<short-description>     → chore/update-deps
refactor/<short-description>  → refactor/auth-module
```

## Working with Worktrees

> Human-initiated setup for parallel work — not an agent action under this skill.

For parallel AI agent work, use git worktrees to run multiple branches simultaneously:

```bash
# Create a worktree for a feature branch
git worktree add ../project-feature-a feature/task-creation
git worktree add ../project-feature-b feature/user-settings

# Each worktree is a separate directory with its own branch
# Agents can work in parallel without interfering
ls ../
  project/              ← main branch
  project-feature-a/    ← task-creation branch
  project-feature-b/    ← user-settings branch

# When done, merge and clean up
git worktree remove ../project-feature-a
```

Benefits:
- Multiple agents can work on different features simultaneously
- No branch switching needed (each directory has its own branch)
- If one experiment fails, delete the worktree — nothing is lost
- Changes are isolated until explicitly merged

## The Save Point Pattern

```
Agent starts work
    │
    ├── Makes a change
    │   ├── Test passes? → Commit → Continue
    │   └── Test fails? → Revert to last commit → Investigate
    │
    ├── Makes another change
    │   ├── Test passes? → Commit → Continue
    │   └── Test fails? → Revert to last commit → Investigate
    │
    └── Feature complete → All commits form a clean history
```

This pattern means you never lose more than one increment of work. If an agent goes off the rails, `git reset --hard HEAD` takes you back to the last successful state.

## Change Summaries

After any modification, provide a structured summary. This makes review easier, documents scope discipline, and surfaces unintended changes:

```
CHANGES MADE:
- src/routes/tasks.ts: Added validation middleware to POST endpoint
- src/lib/validation.ts: Added TaskCreateSchema using Zod

THINGS I DIDN'T TOUCH (intentionally):
- src/routes/auth.ts: Has similar validation gap but out of scope
- src/middleware/error.ts: Error format could be improved (separate task)

POTENTIAL CONCERNS:
- The Zod schema is strict — rejects extra fields. Confirm this is desired.
- Added zod as a dependency (72KB gzipped) — already in package.json
```

This pattern catches wrong assumptions early and gives reviewers a clear map of the change. The "DIDN'T TOUCH" section is especially important — it shows you exercised scope discipline and didn't go on an unsolicited renovation.

## Pre-Commit Hygiene

Before every commit:

```bash
# 1. Check what you're about to commit
git diff --staged

# 2. Ensure no secretsgit diff --staged | grep -i "password\|secret\|api_key\|token"

# 3. Run tests
npm test

# 4. Run linting
npm run lint

# 5. Run type checking
npx tsc --noEmit
```

Automate this with git hooks:

```json
// package.json (using lint-staged + husky)
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

## Structured Commit Groups

When the working tree contains multiple logical changes, commit them as separate groups — one logical unit per commit, not one giant commit or one commit per file.

**Workflow:**

1. **Analyze the changes** — `git status` + per-file diffstat; identify distinct logical units (feature A, fix B, docs C)
2. **Group by logical unit** — each group: files that belong to one concern; split mixed changes (refactor + feature = two commits)
3. **Draft messages** — imperative mood, descriptive first line, body with why when non-obvious
4. **Confirm the plan** — present: `{N} commits, {M} files total. Proceed?` with the message list; adjust grouping/messages before committing
5. **Commit group by group** — `git add <group files> && git commit -m "<message>"` per group

## Handling Generated Files

- **Commit generated files** only if the project expects them (e.g., `package-lock.json`, Prisma migrations)
- **Don't commit** build output (`dist/`, `.next/`), environment files (`.env`), or IDE config (`.vscode/settings.json` unless shared)
- **Have a `.gitignore`** that covers: `node_modules/`, `dist/`, `.env`, `.env.local`, `*.pem`

## Using Git for Debugging

```bash
# Find which commit introduced a bug
git bisect start
git bisect bad HEAD
git bisect good <known-good-commit>
# Git checkouts midpoints; run your test at each to narrow down

# View what changed recently
git log --oneline -20
git diff HEAD~5..HEAD -- src/

# Find who last changed a specific line
git blame src/services/task.ts

# Search commit messages for a keyword
git log --grep="validation" --oneline
```

## Repo Status

Snapshot of a repository's current state — what changed, branches, dirty files. Covers local vs remote sync, commits ahead/behind, open PRs, and working tree state. Use when the user asks "what's the status of the repo", "are local and remote in sync", "check the branches", or "what's the state of dev and main".

### Identify the repo

If `$ARGUMENTS` is provided, use it as the repo path. Otherwise use the current working directory.

```bash
REPO="${ARGUMENTS:-$(pwd)}"
cd "$REPO"
git rev-parse --show-toplevel 2>/dev/null || echo "NOT A GIT REPO"
git remote get-url origin 2>/dev/null
```

If it is not a git repo, tell the user and stop.

### Fetch and collect status

Run all of the following in a single Bash tool call:

```bash
cd "${ARGUMENTS:-$(pwd)}"

# Fetch silently to update remote-tracking refs
git fetch --all --quiet 2>/dev/null

# Repo identity
echo "=REPO=$(git rev-parse --show-toplevel)"
echo "=REMOTE=$(git remote get-url origin 2>/dev/null)"
echo "=CURRENT_BRANCH=$(git branch --show-current)"

# All local branches with tracking info
echo "=LOCAL_BRANCHES="
git branch -v

# All remote branches
echo "=REMOTE_BRANCHES="
git branch -rv

# Working tree
echo "=STATUS="
git status --short

# Stash
echo "=STASH_COUNT=$(git stash list | wc -l | tr -d ' ')"

# Commits on dev not in main (if both exist)
echo "=DEV_AHEAD_MAIN="
git log main..dev --oneline 2>/dev/null || echo "(branches not found)"

# Commits on main not in dev (if both exist)
echo "=MAIN_AHEAD_DEV="
git log dev..main --oneline 2>/dev/null || echo "(branches not found)"

# Open PRs (requires gh CLI)
echo "=OPEN_PRS="
gh pr list --state open --json number,title,headRefName,baseRefName,url \
  --template '{{range .}}#{{.number}} [{{.headRefName}}→{{.baseRefName}}] {{.title}} {{.url}}{{"\n"}}{{end}}' 2>/dev/null || echo "(gh CLI not available)"
```

### Produce the summary

Analyse the output and present a clean, structured summary:

```
Repo: <repo name> (<remote URL>)
Current branch: <branch>

Branch alignment
- In sync — local and remote at the same commit
- Local ahead — N commits not yet pushed
- Local behind — N commits to pull
- Diverged — both sides have commits the other doesn't

Commits: dev vs main
- commits on dev not in main (pending merge)
- commits on main not in dev (needs merge-back)

Open PRs
- number, title, branch direction, URL

Working tree
- clean or uncommitted/untracked files

Stash
- count if entries exist

Overall assessment
- one or two sentences on overall state
```

For each branch that exists both locally and remotely, state clearly whether it is in sync, local ahead, local behind, or diverged. Focus on `main` and `dev` first, then any other active branches. List commits on `dev` but not `main` (pending merge) and any on `main` not yet in `dev` (needs a merge-back); if none, say so. List open PRs with number, title, branch direction, and URL; if none, say so. State whether the working tree is clean or dirty, briefly describing modifications. Note stash count if entries exist. Close with a one or two sentence overall assessment — e.g. "Branches are fully aligned, no outstanding work." or "dev is 2 commits ahead of main with PR #8 open and ready to merge." Keep the summary factual and concise. Do not reproduce raw git output.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll commit when the feature is done" | One giant commit is impossible to review, debug, or revert. Commit each slice. |
| "The message doesn't matter" | Messages are documentation. Future you (and future agents) will need to understand what changed and why. |
| "I'll squash it all later" | Squashing destroys the development narrative. Prefer clean incremental commits from the start. |
| "Branches add overhead" | Short-lived branches are free and prevent conflicting work from colliding. Long-lived branches are the problem — merge within 1-3 days. |
| "I'll split this change later" | Large changes are harder to review, riskier to deploy, and harder to revert. Split before submitting, not after. |
| "I don't need a .gitignore" | Until `.env` with production secrets gets committed. Set it up immediately. |

## Red Flags

- Large uncommitted changes accumulating
- Commit messages like "fix", "update", "misc"
- Formatting changes mixed with behavior changes
- No `.gitignore` in the project
- Committing `node_modules/`, `.env`, or build artifacts
- Long-lived branches that diverge significantly from main
- Force-pushing to shared branches

## Verification

For every commit:

- [ ] Commit does one logical thing
- [ ] Message explains the why, follows type conventions
- [ ] Tests pass before committing
- [ ] No secrets in the diff
- [ ] No formatting-only changes mixed with behavior changes
- [ ] `.gitignore` covers standard exclusions
