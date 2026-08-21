---
name: proof-write
description: Write or improve theorem statements and proofs.
---

# Command: proof-write

来源：arm + texra mathematical-enhancer，新增（数学专用）

## 变量

- `{{statement}}`：定理/引理陈述
- `{{sketch}}`：证明梗概/笔记
- `{{mode}}`：write（从梗概成文）| improve（增强现有证明）

## 规则（write）

- 假设先于陈述；量词显式；术语先定义
- 证明：直觉句 → 步骤化 → 收尾；边界情形显式
- 外部结果归因；内部结果 `\ref` 不重证

## 规则（improve）

- 找更自然结构/更紧界/更一般定理
- 只实现能严格证明的改进；推测 → 标注为建议
- 失败干净回退

## 输出

- 定理环境 + 证明文本（或增强版 + 论证）
- 与 theorem-proof-checklist 核对结果

## 来源

新增；参考 `skills/theorem-proof-writing` + texra mathematical-enhancer (https://github.com/texra-ai/texra-scientific-skills)。
