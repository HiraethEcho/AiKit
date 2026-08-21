---
name: simulate-reviewer
description: Simulate a mathematics referee for expression, structure, and presentation issues — findings-first prose review, no mathematical correctness judgment.
source: research-writing-skill #16 (github.com/alfonso0512/research-writing-skill)，改编（表达层面）
---

# Command: simulate-reviewer

## 变量

- `{{text}}`：草稿或目标章节
- `{{persona}}`：代数几何 / 代数 / 数论审稿人（默认代数几何）
- `{{severity}}`：温和 | 严格（默认严格）

## 规则

- 按 prose-reviewer 纪律：**只审表达**，不判数学正确性
- findings-first；三档：逻辑流 / 记号 / 编辑提升
- 挑：结构混乱、过渡断裂、记号漂移、措辞夸大（overclaim 表述）、引用错配（书目层面）、表述模糊
- 发现疑似数学问题 → 单列"转交数学专家"，不自行裁决
- 不重写，只给意见（供 revision-coach 用）

## 输出

- 模拟审稿报告：`[P0/P1/P2] 意见 + 依据`
- 可直喂 revision-coach 生成修订路线图

## 来源

改编自 research-writing-skill `16-simulate-reviewer.md`（https://github.com/alfonso0512/research-writing-skill）+ paperkit `agents/prose-reviewer`。
