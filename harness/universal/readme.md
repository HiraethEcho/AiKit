# mcp

MCP server 配置池。

## 池

- `mcpserver-full.json` — 唯一池, `mcpServers` 格式, 8 servers:
  context-mode, codegraph, codebase-memory-mcp, zotero, zai-mcp-server, web-search-prime, web-reader, zread

## 约定

- 池存**模板**: 密钥留空 (`Bearer ""`), 部署时注入 (secrets 机制待实现)
- 键名规范化 (空格→连字符)
- 部署 render: settings 的 `"mcp": [names]` 引用 → 池抽取 → 生成 `mcp.json` 文件 (`{"mcpServers": {...}}`)

## 加载路径

### pi (内置 `builtin:mcp`, 1.0.0+)

Pi 自带 MCP 支持, 不再需要扩展。**只读自己的两个路径**, 不读 `.agents/`:

1. `./.pi/mcp.json` — 项目 (需先授予 project trust)
2. `~/.pi/agent/mcp.json` — 用户

同名时项目条目覆盖用户条目。CLI: `pi mcp add|list|remove|login|logout` (无需 session),
session 内 `/mcp` 查看状态、开关、重连、OAuth 登录; 外部改文件后 `/reload`。

字段: `command`/`args`/`env`/`cwd` (stdio), `url`/`headers`/`oauth` (streamable HTTP),
`type`, `timeout` (秒, 默认 60), `enabled`, `description`, `exposure`, `toolExposure`。
`exposure` ∈ `codemode` (默认) / `deferred` / `direct` / `hidden`。

> ⚠️ 池里沿用的 `directTools: true` 和 `enabled` 之外的 pi-toolkit 私有键
> (`excludeTools`, `idleTimeout`) **内置不认**:
> `directTools: true` → `"exposure": "direct"` (或 `toolExposure` 按工具映射)
> `excludeTools: [t]` → `toolExposure: { "<t>": "hidden" }`
> `idleTimeout` → 无对应 (内置常驻连接, 不回收)
> 未知键不会报错, 只是被忽略 (原本期望的 direct 暴露会变成 codemode)。

> 注意: 任何注册 `/mcp` 命令的扩展 (如 `pi-mcp-adapter`, 或旧版 `pi-toolkit/mcp`)
> 会**整体替换**内置 MCP — pi 就不再读 `mcp.json`。`pi-toolkit` 的 mcp 模块已于
> 本次移除; 不要再把它加回来。

### opencode

`.agents/mcp.json` (由 `deploy.py agents` 写出) **只服务 opencode** 等 harness
(见 `docs/opencode/opencode.md`)。**pi 不读它** —— 内置 `builtin:mcp` 只读
`~/.pi/agent/mcp.json` 与 `./.pi/mcp.json`。

### pi: 手工管理 (当前约定)

`deploy.py agents` 不会把 server 送进 pi。在终端里加, 无需 session:

```bash
pi mcp add codegraph -- codegraph serve --mcp
pi mcp list          # 连接所有 enabled server, 打印工具与错误; 有失败则 exit 1
```

或直接编辑 `~/.pi/agent/mcp.json` (个人/带凭据的 server 放这里, 不要放项目文件)。
改完在跑着的 session 里 `/reload`。

`harness/agents.toml` 的 `[pi.mcp].names` 渲染进 settings 的 `"mcp"` 键 ——
**pi 没有这个设置键, 它是 no-op**; 真正的开关是上面 `mcp.json` 里的 `enabled`。
`[agents.mcp.*].directTools` 同理对 pi 无效 (内置用 `exposure = "direct"`)。
