# context-mode-pi

**Pi Coding Agent plugin** — MCP sandbox tools, session continuity, 98% context savings.

Fork of [context-mode](https://github.com/mksglu/context-mode) stripped to Pi-only.

## What it does

| Tool | Purpose |
|---|---|
| `ctx_execute` | Run code in 12 languages → only stdout enters context |
| `ctx_execute_file` | Process files in sandbox, raw bytes never leave |
| `ctx_batch_execute` | Multi-command + multi-query in 1 call |
| `ctx_index` | Chunk markdown into FTS5 with BM25 ranking |
| `ctx_search` | Query indexed content (Porter + trigram + RRF) |
| `ctx_fetch_and_index` | Fetch URL → HTML→md → chunk → index |
| `ctx_stats` | Context savings breakdown |
| `ctx_doctor` | Diagnose installation |
| `ctx_upgrade` | Pull latest, rebuild, reconfigure |
| `ctx_purge` | Delete all indexed content |
| `ctx_insight` | Open hosted dashboard |

## Install

```bash
pi install npm:context-mode-pi
```

Or manually — add to `~/.pi/agent/settings.json`:
```json
{ "packages": ["npm:context-mode-pi"] }
```

Add MCP server to `~/.pi/agent/mcp.json`:
```json
{
  "mcpServers": {
    "context-mode-pi": { "command": "npx", "args": ["-y", "context-mode-pi"] }
  }
}
```

Restart Pi.

## Verify

In a Pi session, type `ctx stats`. Tools should respond.

## License

Elastic-2.0 (same as context-mode)
