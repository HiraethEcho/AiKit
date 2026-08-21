# Paperkit — 写论文

从零写论文 + 投稿前打磨 + 收到审稿意见后修改。一切"产出论文"的东西。

## 结构

```
paperkit/
├── manifest.toml   # 清单（快速浏览全部 skills/agents/commands）
├── README.md
├── agents/         # 6 agent 流水线
├── skills/         # 9 技能 + templates/
└── commands/       # 15 命令
```

## 流水线

```
intake → structure-architect → theorem-writer → abstract-bilingual
      → formatter → revision-coach
```

各 agent 可独立调。投稿前自查 → 用 reviewkit。

## 收到 review 后修改

```
revision-coach（意见→路线图）→ 按 roadmap 改稿 → rebuttal（逐条回复）
```

模板：`skills/templates/revision-roadmap.md`、`revision-diff.md`。

## 清单

见 `manifest.toml`（`[[skills]]` `[[agents]]` `[[commands]]`，category=math，tags 分类浏览）。

## 来源

来自 mathkit 工作副本（AI4Math + arm + texra + ARS + research-writing-skill），mathkit 未动。
