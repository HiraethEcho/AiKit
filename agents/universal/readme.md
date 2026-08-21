# mcp

MCP server 配置池。

## 池

- `mcpserver-full.json` — 唯一池, `mcpServers` 格式 (pi-toolkit 加载格式), 8 servers:
  context-mode, codegraph, codebase-memory-mcp, zotero, zai-mcp-server, web-search-prime, web-reader, zread

## 约定

- 池存**模板**: 密钥留空 (`Bearer ""`), 部署时注入 (secrets 机制待实现)
- 键名规范化 (空格→连字符)
- 部署 render: settings 的 `"mcp": [names]` 引用 → 池抽取 → 生成 `mcp.json` 文件 (`{"mcpServers": {...}}`)

## pi-toolkit 加载路径 (优先级高→低)

1. `./.pi/mcp.json` — 项目 pi
2. `./.agents/mcp.json` — 项目 agents
3. `~/.pi/agent/mcp.json` — 用户 pi
4. `~/.agents/mcp.json` — 用户 agents
