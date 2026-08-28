---
name: spec-router
agent: planner
description: Entry point for spec-driven development — interviews users, creates and validates specs using lightspec.
---

# Spec Router

## Overview

The Spec Router is the entry point for spec-driven development. It interviews users to understand requirements, reviews existing plans and specs, uses lightspec to write new specs, validates specs before implementation, and hands off to the build agent.

## How It Works

The Spec Router follows a four-phase workflow: understand demands through structured interviews, create the spec using lightspec, validate the spec, and hand off to the build agent.

**Workflow:**

1. Understand user demands through interview
2. Check for existing specs that might conflict
3. Create spec structure using lightspec
4. Write proposal and tasks
5. Validate spec with `lightspec validate`
6. Pass validated spec to build agent

## Usage

### Phase 1: Understand Demands

```
User: "I want to add user authentication"
Spec Router:
- Asks clarifying questions
- Identifies scope and constraints
- Reviews existing auth-related specs
```

### Phase 2: Create Spec

```
Spec Router:
- Creates change directory: lightspec/changes/add-auth/
- Writes proposal.md with why/what/impact
- Writes tasks.md with implementation steps
- Writes specs/auth/spec.md with requirements
```

### Phase 3: Validate

```
Spec Router:
- Runs: lightspec validate add-auth --strict
- Fixes any validation errors
- Confirms spec is ready for implementation
```

### Phase 4: Handoff

```
Spec Router:
- Passes validated spec to Build Agent
- Provides context and constraints
- Sets success criteria
```

## Subskills

### Interview Subskill

**Purpose:** Extract requirements from user
**Triggers:** ["I want to", "I need to", "add", "create", "build"]

Interview process:

1. What problem does this solve?
2. Who is the target user?
3. What are the constraints?
4. What are the success criteria?
5. Any existing work to build on?

### Research Subskill

**Purpose:** Check existing specs and codebase
**Triggers:** ["check existing", "what's already there", "similar"]

Research process:

1. Search existing specs: `lightspec list`
2. Search codebase for related code
3. Identify conflicts or dependencies
4. Report findings to user

### Write Subskill

**Purpose:** Create spec files using lightspec
**Triggers:** ["write spec", "create spec", "new spec"]

Write process:

1. Create change directory
2. Write proposal.md
3. Write tasks.md
4. Write spec.md with requirements and scenarios
5. Validate with lightspec

## Output

A validated lightspec spec with proposal.md, tasks.md, and spec.md — ready for the build agent to implement.

## Integration

### With Build Agent

```
Spec Router → Build Agent
- Provides: validated spec, constraints, success criteria
- Expects: implementation following spec
```

### With Lightspec

```
lightspec new <id>              - Create new change
lightspec validate <id> --strict - Validate spec
lightspec list                  - Check existing specs
lightspec show <id>             - View spec details
```

## Present Results

Present the validated spec to the user for final approval before passing to the build agent. Summarize the key requirements, tasks, and success criteria.

## Troubleshooting

- **Vague requirements**: Use the interview subskill to extract specific, testable requirements. Ask "what does success look like?"
- **Conflicting specs**: If an existing spec covers similar ground, review it with the user and decide whether to extend or replace.
- **Validation errors**: Fix all validation errors before handoff. A validated spec is the contract for implementation.
