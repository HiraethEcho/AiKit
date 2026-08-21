# arm-lite: 代数几何纯数学研究轻量技能包

从 AI-Research-SKILLs 的 98 个技能中精选并重组为 **6 个独立技能**，专为代数几何及纯数学理论研究设计。每个技能可独立调用，按需组合。

## 技能一览

| 技能 | 用途 | 调用场景 |
|------|------|---------|
| [ideation](ideation/SKILL.md) | 问题发现与猜想形成 | 开始新项目、卡住时寻找新角度 |
| [literature-survey](literature-survey/SKILL.md) | 文献调研与论文提取 | 了解研究现状、提取数学结构 |
| [proof-exploration](proof-exploration/SKILL.md) | 证明尝试与探索循环 | 有猜想需要证明、系统尝试不同方法 |
| [paper-writing](paper-writing/SKILL.md) | LaTeX 论文写作 | 结果 ready 需要写论文 |
| [rigor-review](rigor-review/SKILL.md) | 严谨性审查 | 提交前检查、自审论文 |
| [orchestration](orchestration/SKILL.md) | 全流程编排 | 管理多周研究项目、追踪整体进度 |

## 典型使用路径

### 独立调用（按需）

```
# 只想头脑风暴
Load skill: arm-lite/ideation

# 只想调研文献
Load skill: arm-lite/literature-survey

# 只想写论文
Load skill: arm-lite/paper-writing
```

### 完整流程（编排）

```
Load skill: arm-lite/orchestration
```

orchestration 会按阶段路由到其他 5 个技能：

```
ideation → literature-survey → proof-exploration → paper-writing → rigor-review
   ↑              ↑                  ↑                  ↑              ↑
  构思           调研               探索                写作           审查
```

### 自定义组合

```
# 有猜想，跳过 ideation，直接调研+证明
literature-survey → proof-exploration

# 已有证明，只需写+审
paper-writing → rigor-review

# 探索新方向，只需要构思+调研
ideation → literature-survey
```

## 与原版 autoresearch 的差异

| 原版 autoresearch | arm-lite |
|------------------|----------|
| 单一 monolithic skill | 6 个独立可组合技能 |
| "实验"循环 | "证明尝试"循环 |
| proxy metric / baseline | 中间引理 |
| CONFIRMATORY vs EXPLORATORY | 证明进展阶段 |
| ML 评估基准 | 同行评审标准 |
| Cron-based agent continuation | 按需调用 |
| ML 论文模板 | 数学论文惯例 |

## 目标领域

- 代数几何 (Algebraic Geometry)
- 交换代数 (Commutative Algebra)
- 代数拓扑 (Algebraic Topology)
- 数论 (Number Theory)
- 表示论 (Representation Theory)
- 复几何 (Complex Geometry)
- 辛几何 (Symplectic Geometry)

## 依赖

无需额外 Python 包。所有技能是纯指导性文档，路由到现有 AI-Research-SKILLs 中的技能。

LaTeX 编译需要: `texlive`, `latexmk`, `tikz-cd`, `pgfplots`
