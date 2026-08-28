---
name: orchestrate
agent: orchestrator
description: Multi-agent orchestration — dispatch specialists in parallel, own acceptance assertions, synthesize results
---

# Orchestrate

## Overview

The Orchestrate skill coordinates multi-agent workflows. It analyzes the user's request, determines which specialist agents to dispatch, fans them out in parallel, collects results, and synthesizes a coherent output. It owns acceptance assertions and requires runtime proof before "done".

## How It Works

### Dispatch Logic

1. **Analyze request** — Determine the nature of the work (build, review, research, security, test, release)
2. **Select agents** — Choose the right specialists for the job
3. **Parallel fan-out** — Dispatch agents concurrently when there are no dependencies
4. **Collect results** — Gather outputs from all dispatched agents
5. **Synthesize** — Merge findings, resolve conflicts, produce unified output
6. **Verify** — Check acceptance criteria are met with runtime evidence

### Common Agent Dispatch Mappings

| Request Type    | Agents to Dispatch                                            |
| --------------- | ------------------------------------------------------------- |
| Ship            | code-reviewer + security-auditor + test-engineer (concurrent) |
| Build feature   | planner → builder + test-engineer                             |
| Investigate bug | deep-researcher + scope-tracer + integration-scanner          |
| Architecture    | architect + plan-reviewer                                     |
| Release         | releaser + documenter + test-engineer                         |

## Usage

Invoke when the user's request crosses multiple domains or requires coordinated effort from multiple specialists — the `orchestrator` agent (mode: primary) drives this natively; this skill provides its dispatch playbook.

Dispatch when the user's request clearly spans multiple domains (e.g., "review and ship this" → dispatch code-reviewer + releaser).

## Integration

When building complex features, orchestrate coordinates planner → builder → code-reviewer → test-engineer in sequence, with shipping running in parallel.

## Acceptance Assertions

Every orchestrated workflow MUST end with one of:

- **Proven**: All acceptance criteria verified with runtime evidence
- **Partially proven**: Some criteria met, others documented as gaps
- **Blocked**: Critical criteria cannot be met; reason documented

Never say "done" without runtime proof (test output, lint results, build artifacts).

## Rules

1. Fan out parallel work whenever agents have no interdependencies
2. Each sub-agent receives a self-contained task (no shared context)
3. Collect and synthesize rather than passing raw output
4. Flag conflicts between agent findings for user resolution
5. Own the acceptance contract — don't delegate verification
