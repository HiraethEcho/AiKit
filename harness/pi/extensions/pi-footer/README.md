# pi-footer

A standalone [pi](https://pi.dev) footer extension — split out of `pi-toolkit`
so it can be enabled/disabled independently.

Renders a two-line status footer in TUI mode:

- **top** — `provider · model`, context usage bar (`NN%/win`), cumulative
  cache-hit ratio (`🔱NN.N%`) and session cost (`$N.NNN`)
- **bottom** — session name, cwd, git branch + staged/unstaged/ahead/behind,
  entry count (persisted/ephemeral), and extension statuses

No config required. Install and restart pi.

## Install

```bash
pi install /path/to/pi-footer
# or point the extension dir at your ~/.pi/agent/extensions
```

## Note

Cache-hit ratio + cost are computed from session usage entries the same way
the default Pi footer does. This file intentionally duplicates
`pi-pane/metrics.ts` helpers to stay independent.

## License

MIT
