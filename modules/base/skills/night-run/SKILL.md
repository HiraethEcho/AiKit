---
name: night-run
description: Runs a multi-hour build autonomously to completion — interview to certainty first, then execute milestone by milestone with a fixed four-subtask quality loop and a commit after each one. Use when the user asks to "keep going until the plan is done", "自主决策 / 持续进行直到完成", hands over a GOAL.md and says start, or asks for a long autonomous run over a task table or experiment matrix. Also covers the optional time-boxed self-review round at the end.
---

# Long-Horizon Run

## Overview

A long autonomous run is not "code for a long time". It is **one hard interview, then N
identical quality loops, then one honest report**. The failure modes are all in the
scaffolding, not the coding:

| Failure | What it looks like | Prevention |
|---|---|---|
| Guessing the requirement | 3 hours of work on the wrong matrix | Interview until you can predict the answers |
| One vague instruction | Half the cells done "to the best of my judgment" | Ask every question **before** the first commit |
| Running out of steam | Cell 9 is worse than cell 1 | Four fixed subtasks per cell, mechanical |
| Buried knowledge | The reasoning exists only in the chat | Write it into a file at each milestone |
| Silent scope drift | A refactor nobody asked for | Autonomous **decisions**, not autonomous **scope** |
| False green | A check passes without testing anything | Independent controls in every acceptance check |

## Phase 0 — Interview to certainty (before any code)

Do **not** start writing. Read whatever spec/plan exists, then ask the questions that
change what gets built.

Ask together in one batch (the `ask` tool takes a list); the user answers faster than
you can round-trip.

Always cover:

1. **Scope** — which cells/rows of the matrix are in, which are explicitly out?
2. **Scale** — what model size, seq len, step count? Fix or "measure first"?
3. **Data** — which corpus, which track, how much?
4. **Artifacts** — where do checkpoints/logs/results go, how are variants distinguished?
5. **Write boundary** — which directories may I write, which are off-limits?
6. **Autonomy level** — what may I decide alone (hyperparameters, naming, refactors)?
   What must I ask (anything that changes the goal)?

Then **restate the whole thing as a contract** and wait for explicit approval.
"Start" after approval. Not before.

**Escalate a question when two readings give different work.** Do not pick silently —
that is the one mistake this phase exists to prevent.

### Deadline check (optional, if the user gave one)

If the user names a wall-clock deadline, resolve it **now**, not at the end:

```sh
date '+%Y-%m-%d %H:%M:%S %Z'; TZ=Asia/Shanghai date    # confirm the machine's zone
```

Store the rule verbatim (e.g. "finish before 10/02 08:00 Beijing → do one extra
review round"). At the end, re-check the clock and obey it.

## Phase 1 — Per-milestone loop (repeat N times)

A milestone is one row of the matrix, one cell, one deliverable. Run **all four**
subtasks for each one. Never skip to the next cell with a "TODO".

### 1. Correct first — no bugs, tests pass

Write the code **and** the test that could fail. A test written after the fact
confirms the code; a test written first catches it.

Run it. If it fails, the bug is in the milestone, not in the test.

### 2. Quality pass

Read what you just wrote with fresh eyes. Remove dead code, unused imports,
stale docstrings, duplicated constants. Run the tests again.

### 3. Iterate 2–3 times

Genuine passes, each changing something:
- pass 1 — bugs the tests missed
- pass 2 — simplicity (a 40-line function becomes 12)
- pass 3 — what a reviewer will attack (the check that cannot fail, the name that lies)

Stop when a pass would not change anything. Say so rather than padding.

### 4. Write the teaching/decision record

Every non-obvious decision goes **into a file**, not into the chat:
what was tried, what failed, why the final shape is what it is. This is the artifact
that survives the session.

Then: **commit**. One commit per subtask.

### Milestone template

```markdown
## M<n> · <cell name>            status: DONE | PARTIAL | BLOCKED

**1. correct**   <what the test covers, the numbers>
**2. quality**   <what was removed / tidied>
**3. iterate**   pass 1 <fix> → pass 2 <simplify> → pass 3 <harden>
**4. record**    <file written>
**commits**      <sha> <sha> <sha> <sha>
**measured**     <the numbers, in the results table>
```

Keep this in the plan file. It is the only progress record that is not in the chat.

## Phase 2 — Blocked work does not stop the run

When something cannot be solved in reasonable time:

1. Write it down immediately — problem, cause, impact, when to come back.
2. Move to the next task.
3. Come back at the end, or leave it documented as open.

Never burn the remaining budget on one blocker while other cells sit untested.

## Phase 3 — Report honestly

The final report is read once. Include:

- what is done, per milestone (not a summary of activity)
- the measured numbers in a table
- what failed, what was skipped, what is still open
- the next concrete action

**Never round a failing number into a passing one.** If a check passed for the wrong
reason, say which reason.

## Anti-patterns seen in the wild

| Anti-pattern | Why it is tempting | What it cost |
|---|---|---|
| Building on an untested assumption | Looks like progress | 3 of 10 cells measured a randomly initialised backbone; every number looked plausible |
| A check that cannot fail | The code is right, obviously | An acceptance check compared a value with itself and always passed |
| Debug run overwrites the results table | Same script, fewer steps | A 6-step run replaced the canonical 200-step row in git |
| Timing without warmup | It is faster to write | The first timed call paid CUDA init and reported 745 ms for a 49 ms workload |
| Copy instead of import for the second caller | Saves an import | The two copies drifted; the comparison the experiment existed for became meaningless |
| Honest-looking output that is empty | EOS truncation is normal | "Empty generation" was read as a broken decoder instead of an untrained model |

## Working agreement to state up front

Say these once, then honour them:

- I will not commit without your approval — except when the run explicitly authorises it.
- I will not push.
- I will not change the goal; I will ask. I will decide hyperparameters, naming and
  refactors alone.
- When a check passes for the wrong reason I will say so.

## Quick start

1. Read the plan/spec. List the milestones.
2. `ask` — every question that changes the work, in one batch.
3. Restate as a contract. Get approval.
4. Resolve the deadline if there is one.
5. Loop: correct → quality → iterate → record → commit, per milestone.
6. Re-check the clock; do the review round if the deadline rule says so.
7. Report: done / measured / failed / open / next.
