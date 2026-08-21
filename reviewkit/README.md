# Reviewkit — 审稿

读论文 + 评论：审他人稿、投稿前自查。

## 结构

```
reviewkit/
├── manifest.toml   # 清单
├── README.md
├── agents/         # reviewer
├── skills/         # 6 审稿技能
├── commands/       # review / simulate-reviewer
└── templates/      # review-report
```

## 审稿流程

```
draft → review / simulate-reviewer → review-report
```

## skills

| 技能 | 用途 |
| --- | --- |
| manuscript-review | 数学正确性审稿（独立验证计算，findings-first） |
| rigor-review | 证明严谨性 6 维度（arm） |
| inline-paper-critic | 编译安全内联批注 |
| writing-commenter | 逻辑/记号/编辑三模式批注 |
| proof-obligation-audit | 证明义务与假设审计 |
| claim-evidence-ledger | 断言-证据溯源 |

## 收到 review 后怎么改

改稿工具在 paperkit（revision-coach + rebuttal + mathematical-enhancer）。

## 清单

见 `manifest.toml`（category=math，tags=review）。
