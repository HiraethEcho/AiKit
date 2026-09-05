---
name: code-review-and-quality
description: Conducts multi-axis code review plus three specialized modes — peer review (fresh-perspective diff review), quick review (fast opinionated quality pass), and bad-smells review (code-smell lens). Use before merging any change. Use when reviewing code written by yourself, another agent, or a human. Use when you need to assess code quality across multiple dimensions before it enters the main branch — includes PR triage, parallel lens dispatch, and layered architecture review for large changes.
---

# Code Review and Quality

## Overview

Multi-dimensional code review with quality gates. Every change gets reviewed before merge — no exceptions. Review covers five axes: correctness, readability, architecture, security, and performance.

**Role in sdd:** this is the deep review methodology. The entry point and mode selector is `reviewing` — it picks quick/standard/deep-dive/fresh-perspective/criteria-walk; this skill supplies the detail for standard and deep-dive modes (five-axis checks, PR triage, change sizing, layered architecture, checklist).

**The approval standard:** Approve a change when it definitely improves overall code health, even if it isn't perfect. Perfect code doesn't exist — the goal is continuous improvement. Don't block a change because it isn't exactly how you would have written it. If it improves the codebase and follows the project's conventions, approve it.

## When to Use

- Before merging any PR or change — **run PR Triage first** (is it worth full review? which path?)
- After completing a feature implementation
- When another agent or model produced code you need to evaluate
- When refactoring existing code — **Layered Architecture Review** if architecture-significant
- After any bug fix (review both the fix and the regression test)

## The Five-Axis Review

Every review evaluates code across these dimensions:

### 1. Correctness

Does the code do what it claims to do?

- Does it match the spec or task requirements?
- Are edge cases handled (null, empty, boundary values)?
- Are error paths handled (not just the happy path)?
- Does it pass all tests? Are the tests actually testing the right things?
- Are there off-by-one errors, race conditions, or state inconsistencies?

### 2. Readability & Simplicity

Can another engineer (or agent) understand this code without the author explaining it?

- Are names descriptive and consistent with project conventions? (No `temp`, `data`, `result` without context)
- Is the control flow straightforward (avoid nested ternaries, deep callbacks)?
- Is the code organized logically (related code grouped, clear module boundaries)?
- Are there any "clever" tricks that should be simplified?
- **Could this be done in fewer lines?** (1000 lines where 100 suffice is a failure)
- **Are abstractions earning their complexity?** (Don't generalize until the third use case)
- Would comments help clarify non-obvious intent? (But don't comment obvious code.)
- Are there dead code artifacts: no-op variables (`_unused`), backwards-compat shims, or `// removed` comments?

### 3. Architecture

Does the change fit the system's design?

- Does it follow existing patterns or introduce a new one? If new, is it justified?
- Does it maintain clean module boundaries?
- Is there code duplication that should be shared?
- Are dependencies flowing in the right direction (no circular dependencies)?
- Is the abstraction level appropriate (not over-engineered, not too coupled)?

### 4. Security

For detailed security guidance, see `security-and-hardening`. Does the change introduce vulnerabilities?

- Is user input validated and sanitized?
- Are secrets kept out of code, logs, and version control?
- Is authentication/authorization checked where needed?
- Are SQL queries parameterized (no string concatenation)?
- Are outputs encoded to prevent XSS?
- Are dependencies from trusted sources with no known vulnerabilities?
- Is data from external sources (APIs, logs, user content, config files) treated as untrusted?
- Are external data flows validated at system boundaries before use in logic or rendering?

### 5. Performance

For detailed profiling and optimization, see `performance-optimization`. Does the change introduce performance problems?

- Any N+1 query patterns?
- Any unbounded loops or unconstrained data fetching?
- Any synchronous operations that should be async?
- Any unnecessary re-renders in UI components?
- Any missing pagination on list endpoints?
- Any large objects created in hot paths?

## Change Sizing

Small, focused changes are easier to review, faster to merge, and safer to deploy. Target these sizes:

```
~100 lines changed   → Good. Reviewable in one sitting.
~300 lines changed   → Acceptable if it's a single logical change.
~1000 lines changed  → Too large. Split it.
```

**What counts as "one change":** A single self-contained modification that addresses one thing, includes related tests, and keeps the system functional after submission. One part of a feature — not the whole feature.

**Splitting strategies when a change is too large:**

| Strategy | How | When |
|----------|-----|------|
| **Stack** | Submit a small change, start the next one based on it | Sequential dependencies |
| **By file group** | Separate changes for groups needing different reviewers | Cross-cutting concerns |
| **Horizontal** | Create shared code/stubs first, then consumers | Layered architecture |
| **Vertical** | Break into smaller full-stack slices of the feature | Feature work |

**When large changes are acceptable:** Complete file deletions and automated refactoring where the reviewer only needs to verify intent, not every line.

**Separate refactoring from feature work.** A change that refactors existing code and adds new behavior is two changes — submit them separately. Small cleanups (variable renaming) can be included at reviewer discretion.

## PR Triage (pre-step)

Before committing a full five-axis pass on a PR, triage: is this change worth the review effort, and what kind of review does it need? Prevents wasting a full pass on a PR that's obviously unmergeable, trivial, or needs only targeted attention.

**When:** PR review requests, "review this PR", branch review before merge.

**Workflow:**

1. **Resolve the scope** — fetch the PR/branch: changed files, additions/deletions, commit arc, base vs head. Record what you're reviewing.
2. **Quick-assess three lenses:**
   - **Security risk** — touches auth, input handling, data exposure, dependencies? High risk → security lens first
   - **Convention drift** — follows the repo's AGENTS.md / style / patterns? Drift → note for the full pass
   - **Intent clarity** — does the PR description match the diff? Mismatch → flag before deep review
3. **Tally + rank** — list findings by severity (blocker / concern / nit)
4. **Recommend:**
   - **Full review** — non-trivial, clean intent, worth the five-axis pass
   - **Targeted review** — clear problem areas; review only those (e.g. security lens only)
   - **Reject with reasons** — obvious blockers (build broken, secrets committed, giant unfocused diff); return to author with the top reasons

Triage is minutes, not the full review. It decides which review path the change gets.

## Change Descriptions

Every change needs a description that stands alone in version control history.

**First line:** Short, imperative, standalone. "Delete the FizzBuzz RPC" not "Deleting the FizzBuzz RPC." Must be informative enough that someone searching history can understand the change without reading the diff.

**Body:** What is changing and why. Include context, decisions, and reasoning not visible in the code itself. Link to bug numbers, benchmark results, or design docs where relevant. Acknowledge approach shortcomings when they exist.

**Anti-patterns:** "Fix bug," "Fix build," "Add patch," "Moving code from A to B," "Phase 1," "Add convenience functions."

## Review Process

### Step 1: Understand the Context

Before looking at code, understand the intent:

```
- What is this change trying to accomplish?
- What spec or task does it implement?
- What is the expected behavior change?
```

### Step 2: Review the Tests First

Tests reveal intent and coverage:

```
- Do tests exist for the change?
- Do they test behavior (not implementation details)?
- Are edge cases covered?
- Do tests have descriptive names?
- Would the tests catch a regression if the code changed?
```

### Step 3: Review the Implementation

Walk through the code with the five axes in mind:

```
For each file changed:
1. Correctness: Does this code do what the test says it should?
2. Readability: Can I understand this without help?
3. Architecture: Does this fit the system?
4. Security: Any vulnerabilities?
5. Performance: Any bottlenecks?
```

### Step 4: Categorize Findings

Label every comment with its severity so the author knows what's required vs optional:

| Prefix | Meaning | Author Action |
|--------|---------|---------------|
| *(no prefix)* | Required change | Must address before merge |
| **Critical:** | Blocks merge | Security vulnerability, data loss, broken functionality |
| **Nit:** | Minor, optional | Author may ignore — formatting, style preferences |
| **Optional:** / **Consider:** | Suggestion | Worth considering but not required |
| **FYI** | Informational only | No action needed — context for future reference |

This prevents authors from treating all feedback as mandatory and wasting time on optional suggestions.

### Step 5: Verify the Verification

Check the author's verification story:

```
- What tests were run?
- Did the build pass?
- Was the change tested manually?
- Are there screenshots for UI changes?
- Is there a before/after comparison?
```

### Parallel Lens Dispatch (deep-dive option)

For large changes (300+ lines, cross-cutting), dispatch specialist lenses in parallel instead of one sequential pass — each lens is independent, so they run concurrently:

- **security-auditor** — vulnerabilities, injection, auth gaps, data exposure
- **codebase-pattern-finder** — peer comparison: does this match similar implementations elsewhere?
- **integration-scanner** — ripple: what connects to the changed components, and do those connections still hold?

Then **reconcile** — merge lens findings, dedupe, rank by severity. The five-axis walk (Step 3) stays the spine; lenses add depth where the change is big enough to warrant it.

## Multi-Model Review Pattern

Use different models for different review perspectives:

```
Model A writes the code
    │
    ▼
Model B reviews for correctness and architecture
    │
    ▼
Model A addresses the feedback
    │
    ▼
Human makes the final call
```

This catches issues that a single model might miss — different models have different blind spots.

**Example prompt for a review agent:**
```
Review this code change for correctness, security, and adherence to
our project conventions. The spec says [X]. The change should [Y].
Flag any issues as Critical, Important, or Suggestion.
```

## Layered Architecture Review

For architecture-significant changes (large refactors, new subsystems, boundary changes), a single pass over the whole diff misses layer-level issues. Review top-down, layer by layer.

**When:** architecture changes, large refactors, new modules with clear layering.

**Workflow:**

1. **Identify the target** — the subsystem/module/boundary under review; what changed and what layers it touches
2. **Plan the layer structure** — top-down: the layers involved (e.g. API → domain → data), their responsibilities, and the contracts between them
3. **Per-layer review** — for each layer:
   - **Contracts**: does it expose/promise what consumers expect?
   - **Responsibilities**: does it do one thing, or leak concerns from other layers?
   - **Boundaries**: are cross-layer calls respecting the layering (no skipping, no reverse dependencies)?
4. **Capture emergent principles** — patterns the change establishes (or violates) that future work should follow; record them as findings or ADR material

The five-axis review still applies inside each layer; the layering walk adds the cross-layer view.

## Dead Code Hygiene

After any refactoring or implementation change, check for orphaned code:

1. Identify code that is now unreachable or unused
2. List it explicitly
3. **Ask before deleting:** "Should I remove these now-unused elements: [list]?"

Don't leave dead code lying around — it confuses future readers and agents. But don't silently delete things you're not sure about. When in doubt, ask.

```
DEAD CODE IDENTIFIED:
- formatLegacyDate() in src/utils/date.ts — replaced by formatDate()
- OldTaskCard component in src/components/ — replaced by TaskCard
- LEGACY_API_URL constant in src/config.ts — no remaining references
→ Safe to remove these?
```

## Review Speed

Slow reviews block entire teams. The cost of context-switching to review is less than the waiting cost imposed on others.

- **Respond within one business day** — this is the maximum, not the target
- **Ideal cadence:** Respond shortly after a review request arrives, unless deep in focused coding. A typical change should complete multiple review rounds in a single day
- **Prioritize fast individual responses** over quick final approval. Quick feedback reduces frustration even if multiple rounds are needed
- **Large changes:** Ask the author to split them rather than reviewing one massive changeset

## Handling Disagreements

When resolving review disputes, apply this hierarchy:

1. **Technical facts and data** override opinions and preferences
2. **Style guides** are the absolute authority on style matters
3. **Software design** must be evaluated on engineering principles, not personal preference
4. **Codebase consistency** is acceptable if it doesn't degrade overall health

**Don't accept "I'll clean it up later."** Experience shows deferred cleanup rarely happens. Require cleanup before submission unless it's a genuine emergency. If surrounding issues can't be addressed in this change, require filing a bug with self-assignment.

## Honesty in Review

When reviewing code — whether written by you, another agent, or a human:

- **Don't rubber-stamp.** "LGTM" without evidence of review helps no one.
- **Don't soften real issues.** "This might be a minor concern" when it's a bug that will hit production is dishonest.
- **Quantify problems when possible.** "This N+1 query will add ~50ms per item in the list" is better than "this could be slow."
- **Push back on approaches with clear problems.** Sycophancy is a failure mode in reviews. If the implementation has issues, say so directly and propose alternatives.
- **Accept override gracefully.** If the author has full context and disagrees, defer to their judgment. Comment on code, not people — reframe personal critiques to focus on the code itself.

## Dependency Discipline

Part of code review is dependency review:

**Before adding any dependency:**
1. Does the existing stack solve this? (Often it does.)
2. How large is the dependency? (Check bundle impact.)
3. Is it actively maintained? (Check last commit, open issues.)
4. Does it have known vulnerabilities? (`npm audit`)
5. What's the license? (Must be compatible with the project.)

**Rule:** Prefer standard library and existing utilities over new dependencies. Every dependency is a liability.

## The Review Checklist

```markdown
## Review: [PR/Change title]

### Context
- [ ] I understand what this change does and why

### Correctness
- [ ] Change matches spec/task requirements
- [ ] Edge cases handled
- [ ] Error paths handled
- [ ] Tests cover the change adequately

### Readability
- [ ] Names are clear and consistent
- [ ] Logic is straightforward
- [ ] No unnecessary complexity

### Architecture
- [ ] Follows existing patterns
- [ ] No unnecessary coupling or dependencies
- [ ] Appropriate abstraction level

### Security
- [ ] No secrets in code
- [ ] Input validated at boundaries
- [ ] No injection vulnerabilities
- [ ] Auth checks in place
- [ ] External data sources treated as untrusted

### Performance
- [ ] No N+1 patterns
- [ ] No unbounded operations
- [ ] Pagination on list endpoints

### Verification
- [ ] Tests pass
- [ ] Build succeeds
- [ ] Manual verification done (if applicable)

### Verdict
- [ ] **Approve** — Ready to merge
- [ ] **Request changes** — Issues must be addressed
```
## See Also

- For detailed security review guidance, see `references/security-checklist.md`
- For performance review checks, see `references/performance-checklist.md`

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "It works, that's good enough" | Working code that's unreadable, insecure, or architecturally wrong creates debt that compounds. |
| "I wrote it, so I know it's correct" | Authors are blind to their own assumptions. Every change benefits from another set of eyes. |
| "We'll clean it up later" | Later never comes. The review is the quality gate — use it. Require cleanup before merge, not after. |
| "AI-generated code is probably fine" | AI code needs more scrutiny, not less. It's confident and plausible, even when wrong. |
| "The tests pass, so it's good" | Tests are necessary but not sufficient. They don't catch architecture problems, security issues, or readability concerns. |

## Red Flags

- PRs merged without any review
- Review that only checks if tests pass (ignoring other axes)
- "LGTM" without evidence of actual review
- Security-sensitive changes without security-focused review
- Large PRs that are "too big to review properly" (split them)
- No regression tests with bug fix PRs
- Review comments without severity labels — makes it unclear what's required vs optional
- Accepting "I'll fix it later" — it never happens

## Verification

After review is complete:

- [ ] All Critical issues are resolved
- [ ] All Important issues are resolved or explicitly deferred with justification
- [ ] Tests pass
- [ ] Build succeeds
- [ ] The verification story is documented (what changed, how it was verified)

---

## Peer Review

Fresh-perspective diff review for changes you did NOT author. Reads the diff plus adjacent unchanged files the diff expects to be consistent with, and flags inconsistency-class bugs the work-author missed because they were too close to the change.

**When:** "peer-review this PR", "review this PR", "fresh eyes on", "did I miss anything", "check this branch before merge", or a PR/branch you did not author. Do NOT use for your own in-flight work — fresh perspective requires you not to be the author. Decline and route to another agent/session if you wrote the change.

**Gap-classes ranked by what fresh perspective uniquely catches:**

1. **Inconsistency between changed and unchanged files** — author updated A; B still references the old shape of A
2. **Renamed/removed concepts not propagated** — diff renames a field; other files still use the old name (markdown/comments won't break the build, so tests miss it)
3. **Frontmatter / convention drift** — new file follows convention X; siblings follow Y
4. **Missing call sites** — new function added, no caller; or internal function removed, docs still reference it
5. **Documentation lag** — diff changes behavior; README / inline docs still describe old behavior
6. **Quality-of-life issues** — naming, organization, leaked design speculation — flag but don't block

**Steps:**

1. **Establish the change set** — `gh pr diff <N>`, or `git diff <base>...HEAD`; record changed files and lines
2. **Read the diff in full**, both directions
3. **Read adjacent UNCHANGED files** — for each non-trivial concept changed, grep for files that reference it but are not in the diff, and read them cold
4. **Read anchoring context** — AGENTS.md/CLAUDE.md, recent commit arc, active plan files
5. **Synthesize the report** (format below)
6. **End with a clear next-action question**

**Report format:**

```
## Review — <PR/branch identifier>

### What works
<2-4 bullets — design calls that hold up>

### Problems
<numbered list, severity-ordered. For each: file:line ref, what's wrong, why it matters>

### Biggest risk
<one paragraph — the most important thing to know before merging>

### Optional pulls / suggestions
<low-severity quality-of-life items, separable from the merge decision>
```

Every problem has a file:line ref or is dropped. Honest severity — don't inflate quality-of-life into blockers; don't downplay shipping blockers as nits.

---

## Quick Review

Fast opinionated one-pass quality check. Not a deep review — one pass, one voice. For depth use the main five-axis flow above.

**Focus:** simplicity, test integrity, correctness fundamentals.

**Scope:** read code, read tests, run linters, check git diff, report findings. Do NOT edit application code, fix bugs, rewrite tests, or make architectural decisions.

**Checklist:**

- **Simplicity (YAGNI):** abstractions with one implementation? parameters always the same value at every call site? handling cases that don't exist yet? could this be a 5-line function instead of a 50-line class?
- **Test integrity:** do tests assert real behavior or just that functions were called? tests that pass no matter the implementation? tests testing the framework? would deleting the implementation break these tests? happy-path-only coverage?
- **Correctness:** unchecked error returns / ignored exceptions? unvalidated input assumptions? race conditions or shared mutable state? does the code do what its name says?
- **Hygiene:** dead code, commented-out blocks, never-resolved TODOs? inconsistent naming in the same file? magic numbers/strings?

**Report:**

```
Review complete. Found {N} issues.

CORRECTNESS
  [file:line] — What's wrong and why it matters.
TESTS
  [file:line] — What this test doesn't actually prove.
SIMPLICITY
  [file:line] — What could be removed.
HYGIENE
  [file:line] — Minor issues.

VERDICT: {Ship it / Fix before shipping / Needs rethink}
```

If nothing is wrong, say so plainly. Report only — don't suggest fixes unless asked.

---

## Bad Smells

Code-smell lens checklist — deep review focused on design quality. Identifies the design weaknesses most likely to slow future work or hide latent defects; outputs a structured review report plus a severity-ordered remediation todo.

Before starting, work through the checklist below to keep smell definitions, review prompts, and refactor directions consistent.

**审查流程:**

1. 在下判断前先理解仓库结构
2. 识别核心执行路径、职责边界和共享抽象
3. 遍历坏味道清单，检查存在的问题
4. 只报告证据足够扎实的发现

注意：清单较长，允许时用多个并行子 Agent 审查；尽全力检查所有相关代码。

**证据标准:** 每个报告出的坏味道都要引用文件路径与关键函数/方法/类/字段，说明触发判断的行为或结构，区分事实与推断，说明为什么是设计/可维护性问题而非样式偏好，并给出匹配的重构方向。

**严重级别:** `高`（实质性损害可变更性、正确性风险或架构清晰度）、`中`（明确存在但影响有限的可维护性债务）、`低`（真实但次要的清理项）。

**置信度:** `高`（多处直接证据或强结构证据）、`中`（局部证据清晰但仓库覆盖有限）、`低`（看似合理但证据不完整——优先省略）。

**报告结构:**

```md
## 发现

### 1. 简短的发现标题
- 坏味道：过大的类
- 严重级别：高
- 置信度：高
- 证据：`path/to/file.ts` 包含 ...
- 影响：...
- 重构方向：抽取类、移动方法、拆分阶段
```

然后输出按严重级别排序的整改待办（优先级、目标区域、重构目标、重构方式、预期收益、风险说明），从低风险高收益动作开始。

**不要做:** 把 lint 问题伪装成坏味道；无证据报告；能渐进重构却建议大范围重写；把框架样板误判为推测性泛化。

### Code-Smell Checklist

#### 1. 神秘命名

审查提示：
- 变量、函数、类和字段是否见名知意？
- 是否存在单字母命名、不透明缩写、拼音缩写，或一词多义掩盖真实意图？

重构方向：重命名为更清晰的名字

#### 2. 重复代码

审查提示：
- 两处或更多区域是否共享几乎相同的控制流、分支或转换逻辑？
- 抽取共享行为是否能减少重复，同时又不会把危险的隐藏耦合注入关键模块？

重构方向：抽取函数、移动语句、上移方法

#### 3. 过长函数

审查提示：
- 这个函数是否只有一个职责？
- 是否存在深层分支、嵌套循环，或多个非核心职责混在一起？
- 它的控制流是否很难用一句话概括？

重构方向：抽取函数、使用查询函数消除临时变量、引入参数对象、直接传递整个对象、分解条件逻辑、以多态取代条件分支、拆分循环

#### 4. 过长参数列表

审查提示：
- 函数是否接收了超出调用方可轻松推理的信息量？
- 是否有若干参数总是一起传来传去？
- 是否在用 flag 参数切换行为？

重构方向：以查询取代参数、直接传递整个对象、引入参数对象、移除 flag 参数、将相关函数组合成类

#### 5. 全局数据

审查提示：
- 状态是否可被许多位置全局访问并随意修改？
- 是否把公共静态变量或单例状态当作共享临时空间？

重构方向：封装变量

#### 6. 可变数据

审查提示：
- 某些状态是否暴露了超过必要范围的写权限？
- 是否有多条带副作用的路径在修改同一份数据？
- 是否很难知道某个值究竟在哪里被改掉了？

重构方向：封装变量、拆分变量、移动语句、抽取函数、分离查询与修改、移除设值方法、使用查询函数消除临时变量、将相关函数组合成类

#### 7. 发散式变化

审查提示：
- 一个模块是否会因为很多彼此无关的原因而变化？
- 领域规则、格式化、持久化和传输关注点是否都堆积在同一个地方？

重构方向：拆分阶段、移动方法、抽取函数、抽取类

#### 8. 霰弹式修改

审查提示：
- 一个功能或策略变化是否需要在许多文件里做零碎修改？
- 行为是否被稀薄地分散在多个低内聚模块中？

重构方向：移动方法、移动字段、将相关函数组合成类、把分散的计算集中为一次转换、拆分阶段、内联函数、内联类

#### 9. 依恋情结

审查提示：
- 某个函数是否与另一个对象或模块交互得比与自己“家里人”还多？
- 它是否主要是在读取外部数据，然后远距离施加逻辑？

重构方向：移动方法、抽取函数

#### 10. 数据泥团

审查提示：
- 同样的 3 到 4 个字段或参数是否反复一起出现？
- 它们是否代表一个稳定概念，值得拥有自己的对象？

重构方向：抽取类、引入参数对象、直接传递整个对象

#### 11. 基本类型偏执

审查提示：
- 字符串、数字或布尔值是否在承载金钱、手机号、状态、单位等领域概念？
- 领域不变量是否只能靠约定来维持？

重构方向：以对象取代基本类型、以子类取代类型码、以多态取代条件分支

#### 12. 重复的条件分发

审查提示：
- 是否存在多个 `switch` 语句，或围绕同一类型码/状态反复出现的 `if-else` 链？
- 新增一个变体时，是否需要改很多处分支？

重构方向：以多态取代条件分支

#### 13. 循环过重

审查提示：
- 命令式循环是否把本可更清晰表达的集合转换逻辑搞得难懂？
- 在不损害清晰度或性能要求的前提下，声明式集合 API 是否会更可读？

重构方向：用管道式处理取代循环

#### 14. 懒惰元素

审查提示：
- 某个类、函数或抽象是否做得太少，不值得继续存在？
- 它是否只是早期重构或过度设计后留下的壳？

重构方向：内联函数、内联类、折叠继承层次

#### 15. 推测性泛化

审查提示：
- 是否为了尚未到来的未来需求提前放进了某个抽象？
- 钩子、扩展点或继承层次是否处于未使用或缺乏正当性的状态？

重构方向：折叠继承层次、内联函数、内联类、修改函数声明、删除死代码

#### 16. 临时字段

审查提示：
- 某些字段是否只对某个狭窄算法或某条调用路径有意义？
- 它们在大多数时间里是否都是 `null` 或无关紧要？

重构方向：抽取类、抽取函数、引入特例

#### 17. 消息链

审查提示：
- 是否存在像 `a.b().c().d()` 这样的长对象导航链？
- 调用方是否知道了太多协作者的内部细节？

重构方向：隐藏委托关系、抽取函数、移动方法

#### 18. 中间人

审查提示：
- 某个类是否主要只是把调用转发给别处，几乎没有自己的行为？
- 这种委托是否只增加了仪式感，却没有隔离出真正有价值的复杂度？

重构方向：移除中间人、内联函数

#### 19. 内幕交易

审查提示：
- 两个模块是否过于自由地交换私有细节？
- 这种协作亲密度是否已经越过了原本的封装边界？

重构方向：移动方法、隐藏委托关系、以委托取代子类、以委托取代父类

#### 20. 过大的类

审查提示：
- 某个类是否拥有过多字段、方法或职责？
- 它是否成了不相关行为不断堆积的聚集点？

重构方向：提炼父类、以子类取代类型码、抽取类

#### 21. 接口不一致的平行类

审查提示：
- 相似概念是否被实现成了方法名或签名互不兼容的多个类？
- 如果对齐 API，调用方是否本可共享一套共同接口？

重构方向：修改函数声明、移动方法、提炼父类

#### 22. 数据类

审查提示：
- 某个类是否基本只包含字段加 getter/setter？
- 本应跟数据放在一起的行为是否散落在别处？

重构方向：封装记录、移除设值方法、移动方法、抽取函数、拆分阶段

#### 23. 被拒绝的遗赠

审查提示：
- 子类是否继承了自己并不真正想要的行为或字段？
- 这种继承关系是否破坏了可替换性？

重构方向：以委托取代子类、以委托取代父类

#### 24. 注释掩盖混乱

审查提示：
- 很长的注释是否是在为难懂的代码打补丁？
- 注释是否主要在解释一团纠缠的代码“怎么工作”，而不是说明它“为什么存在”？

重构方向：抽取函数、修改函数声明、引入断言

#### 分诊指引

当异味很多时，优先报告那些：
- 扭曲了变更边界
- 迫使改动扩散到许多文件
- 用糟糕命名或超长函数遮蔽领域逻辑
- 把行为从它所属的数据身边拆散
- 通过可变共享状态制造正确性风险

把异味看作相互关联的一组模式。例如：`过大的类` 往往和 `发散式变化` 同时出现；`霰弹式修改` 往往指向内聚性薄弱；`数据泥团` 与 `基本类型偏执` 往往暗示缺失领域对象；`依恋情结` 与 `消息链` 往往暴露出行为放错了位置。
