# Rapid Prototype Paper Skeleton

来源：AI4Math paper-writing (github.com/andkhalov/AI4Math)，改编。

## 贡献主轴

> We prove {main result} by {technique}, which {significance}.

## 章节地图

| 节 | 角色 | 目标长度 | 内容 |
| --- | --- | --- | --- |
| Abstract | 问题/结果/意义 | 100-150w | |
| Introduction | 动机/历史/主定理/策略/组织 | 2-3p | |
| Preliminaries | 定义/记号/背景 | 2-4p | |
| Main Results | 定理+证明 | 8-15p | |
| Applications | 例子/计算 | 2-4p | |
| Appendix | 技术引理/长计算 | 按需 | |

## 结果依赖图

```
thm:main
 ├── lem:key-1 (证 thm:main 步骤 2)
 ├── prop:aux (来自 [ref])
 └── cor:1 (直接推论)
```

- 悬空依赖（无来源结果）→ 标 gap：

## 缺口清单

- [ ] 未证引理：
- [ ] 缺失定义：
- [ ] 未定位外部结果：
- [ ] 未覆盖情形：
