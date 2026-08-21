---
name: citation-check
description: Use when verifying citations in a mathematics paper — arXiv/MathSciNet/DOI existence checks, precise references (theorem number, page), no fabricated references, primary-source preference, preprint-vs-published disambiguation.
source: texra literature-search，改编（数学引用核实）
---

# Citation Check

数学论文引用核实。目的：每条引用可被读者立即找到且内容属实。

## 规范

1. **禁虚构** — 不存在的 arXiv ID / DOI / 作者 / 标题 = 硬错误。无法核实 → 标 `citation needed` + 支撑声明。
2. **精确引用** — 引用到定理号/命题号/页码："Kaw08, Theorem 2.1"；不只给论文级引用。
3. **一手来源优先** — 原始论文 > 综述 > 二手转述。综述引用只在真正引用综述观点时使用。
4. **preprint vs 已发表** — arXiv 版本与期刊版本并存时，标注两者；优先已发表版本。
5. **声明-引用匹配** — 引用必须真实支撑所挂声明；"has citation" ≠ "citation supports claim"。
6. **数学对象溯源** — 定义/构造/记号首次出现处给引用，不集中堆在引言。

## 核实途径

- arXiv：`arxiv.org/abs/<id>`；MathSciNet：MR number；DOI：`doi.org/<doi>`
- 本机 Zotero 库优先（项目惯例：检索文献优先 zotero）
- 交叉验证重要声明（日期、数值结果、优先权）

## Checklist

- [ ] 每条 `\cite{}` 有 BibTeX 条目且条目可核实
- [ ] 无虚构引用（不存在/错配/张冠李戴）
- [ ] 关键声明引用精确到定理/命题号
- [ ] preprint 与期刊版本区分标注
- [ ] 定义/构造/记号在首次出现处有引用
- [ ] 引用真实支撑声明（非装饰性引用）

## 输出

- 引用审计表：`[key] 状态(ok/需核实/虚构/错配) + 问题 + 建议`
- 虚构/错配条目单独列出（硬错误）

## 来源

改编自 `opt/texra-skills/literature-search/SKILL.md`（texra-ai/texra-scientific-skills: https://github.com/texra-ai/texra-scientific-skills），聚焦数学引用核实，独立于任何项目 AGENTS.md 惯例。
