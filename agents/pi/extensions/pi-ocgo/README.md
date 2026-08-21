# pi-ocgo

Merged [OpenCode Go](https://opencode.ai/docs/go) extension for
[pi](https://pi.dev) — prompt caching **and** subscription usage in one
compact footer line. Replaces `pi-opencode-go-cache` + `pi-ocgo-usage`.

```
ocgo: 5h23% · wk30% · mo12% · 🔱42% · no-cache
```

- **Cache**: stamps `prompt_cache_key`, `24h` retention and `cache_control`
  breakpoints on every `opencode-go/*` request (openai-completions +
  anthropic-messages). GLM/Zhipu models are auto-skipped (they reject
  Anthropic markers) and show `no-cache`.
- **Usage**: reads the OpenCode Go subscription quota (rolling / weekly /
  monthly) from the dashboard SSR page, fire-and-forget (never blocks turns).
- **Cache-hit ratio**: 🔱NN.N% is the cumulative session cache read ratio,
  computed from usage entries the same way the default pi footer does.

Simplified vs the old usage footer: per-window reset countdowns and the
fetch timestamp are dropped; everything lives on one status key.

## Install

```bash
pi install ./pi-ocgo
```

## Config (usage)

Requires an OpenCode Go session cookie + workspace ID — same as pi-ocgo-usage
(the config file path is reused, so existing installs keep working).

```bash
export OPENCODE_GO_COOKIE="auth=Fe26.2*...; oc_locale=zh"
export OPENCODE_GO_WORKSPACE_ID="wrk_01..."
```

or persist via `/oc-go-config set` (writes `~/.pi/agent/pi-ocgo-usage.json`,
mode 0600). Run `/oc-go-config` for status / test / clear.

>`auth` cookie is a full OpenCode user session — treat like a password.

## Files

| file        | role                                     |
| ----------- | ---------------------------------------- |
| `index.ts`  | entry: cache + usage footer + command     |
| `cache.ts`  | prompt-cache stamping (port of cache plug)|
| `usage.ts`  | fetch + fire-and-forget cache (usage plug)|
| `config.ts` | usage config (env + file)                 |
| `config-cmd.ts` | `/oc-go-config`                  |
| `provider.ts` | opencode-go model detection           |

## License

MIT
