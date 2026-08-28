# semitrans — 数学论文半翻译技能

将英文数学论文/段落半译为中文（学习用途），专注基础数学、代数几何方向（MMP、foliation、generalized pairs 等）。

## 三档模式

| 模式 | 触发词 | 术语处理 | 追求 |
| --- | --- | --- | --- |
| `lite` | lite / 最小 / level 1 | `abbrev.md` 缩写，max 3-4 tokens | 最小可读 |
| `default` | default / 标准 / level 2 / 未指定 | 英文原形保留 | 标准半译 |
| `full` | full / 学术 / level 3 | `dictionary.md` 转中文 | 完整翻译 |

- 未指定模式 → `default`
- `term.md` 两档：T1 命中 → default 保留英文 (full 可译)；T2 命中 → default/full 均保留英文
- 未收录术语：lite/default 保留英文；full 保留英文并首次注记 `b-除子 (b-divisor)`

## 文件结构

```
semitrans/
├── SKILL.md          # 主控：模式选择、触发词、通用规则
├── default.md        # default 模式规则+示例
├── lite.md           # lite 模式规则+示例
├── full.md           # full 模式规则+示例
├── abbrev.md         # lite 缩写表（个人可编辑）
├── dictionary.md     # full 中文字典（个人可编辑）
├── term.md           # 不翻译表：T1 default 不译 / T2 两档均不译
├── README.md         # 本文件
└── references/
    ├── examples.md        # 三档对照示例（校准用）
    └── context/           # 领域背景语料
        ├── MMP_for_Foliation_and_gpair.md
        ├── WeakDecomposition_TerminationFlip.md
        ├── semiample.md
        ├── Existenc_glc.md
        └── flop_main.md
```

## 使用方式

**直接使用技能时**（翻译任务）：只读 `SKILL.md` + 对应模式的规则文件 + `abbrev.md`/`dictionary.md`。**不读取 `references/`**。

**修改技能时**（校准缩写、补字典、调模式粒度、改示例）：才读取 `references/examples.md` 作三档对照，`references/context/` 提供领域背景。

## 通用规则（SKILL.md 摘要）

- LaTeX 仅 `$...$` inline、`$$...$$` display；禁用 `\(...\)`、`\[...\]`
- 无 unicode 数学符号，保持 `.md` ASCII-clean
- 引用 `surname+year`（如 `Kaw08`）；首次全标题+arxiv/DOI，后续仅 `surname+year`
- 结构词译中文：定理、引理、命题、定义、证明

## 维护提示

- `abbrev.md` / `dictionary.md` 顶部注明「Edit freely」，可直接增删
- 同一术语在同一 document 内只对应一种译法
- 缩写非强制一一对应，选最短可辨识的；未收录术语保留英文原词并记录待补充
