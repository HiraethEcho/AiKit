# lean-ctx — Context Engineering Layer

## 概述

lean-ctx 是一个 MCP 服务器（`/usr/bin/lean-ctx`），为 agent 提供压缩、缓存的上下文访问工具。每个 `ctx_*` 工具的返回结果在会话间持久缓存，重复读取仅消耗 ~13 tokens。

## 安装

```bash
# lean-ctx 已安装在系统 PATH 中
which lean-ctx    # → /usr/bin/lean-ctx

# 验证是否正常运行
lean-ctx --version
```

数据目录：`~/.local/share/lean-ctx/`

## 工具映射

| 代替               | 使用                         | 说明                               |
| ------------------ | ---------------------------- | ---------------------------------- |
| Read/cat/head/tail | `ctx_read(path, mode)`       | 缓存压缩读取，mode=auto 自适应     |
| Grep/rg            | `ctx_search(pattern, path)`  | 正则搜索，.gitignore 感知          |
| Shell/bash         | `ctx_shell(command)`         | 输出压缩（95+ 模式），信号信息保留 |
| ls/find            | `ctx_tree(path, depth)`      | 紧凑目录树，带文件数统计           |
| 符号搜索           | `ctx_semantic_search(query)` | 语义搜索（BM25+embeddings）        |
| 修改代码           | `ctx_edit(path, old, new)`   | 当 Read 不可用时的备选编辑         |

## 集成方式

| 工具     | 集成方式                                                     |
| -------- | ------------------------------------------------------------ |
| opencode | `opencode.jsonc` 的 `mcp.lean-ctx` 中配置为 local MCP 服务器 |
| pi       | 通过 MCP 桥接加载（同一条命令，经 pi 的 mcp-loader 代理）    |

## ctx_read 模式选择

| 场景       | mode         | 说明             |
| ---------- | ------------ | ---------------- |
| 浏览探索   | auto（默认） | 自动选择最优模式 |
| 即将编辑   | full         | 完整文件内容     |
| 只看 API   | signatures   | 只露函数签名     |
| 大文件概览 | map          | >500 行时用      |
| 编辑后复查 | diff         | 仅显示变动       |
| 已知行范围 | lines:N-M    | 精确行号         |

## 工作流

```
ctx_overview(task) → ctx_search/semantic_search → ctx_read → ctx_edit → ctx_read("diff") + ctx_shell(test)
ctx_knowledge(action="remember")  # 记住非显而易见的发现
```

## 参见

- `LEAN-CTX.md` — 项目根目录的完整规则
- `compatibility.md` — 与其他插件的兼容性说明
