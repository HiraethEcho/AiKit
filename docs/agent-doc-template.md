# agent name

a short introduction to the agent

## feature

支持的功能，例如 mcp, subagent, custom commands, websearch, lsp. 内置的工具，provider支持等。

## install

npm install

## config

where does the config file lie in

### global config

#### structure

a file tree of configs

```
~/.config/opencode
├── AGENTS.md
├── node_modules
├── ocx.jsonc
├── opencode.jsonc
├── package-lock.json
├── package.json
├── plugins
│   ├── agent-commands.ts
│   ├── mcp-loader.ts
│   └── rtk.ts
├── profiles
│   ├── as
│   ├── default
│   └── omos
└── tui.json
```

```

/home/hiraeth/.pi
├── agent
│   ├── AGENTS.md
│   ├── APPEND_SYSTEM.md
│   ├── extensions
│   ├── mcp.json
│   ├── models.json
│   ├── npm
│   ├── sessions
│   ├── settings.json
│   ├── vision-tool.json
│   └── zentui.json
├── pi-acp
│   └── session-map.json
└── provider-cache.json
```

#### config file

how to config in `setting.json` or `opencode.json`

#### env

the environment variables that can be set for the agent

### project config

in `./.pi` or `./.opencode`, or `.opencode.json`

### agent

how it supports `~/.agents/` and `./.agents`

## usage

how to use in cli

```sh
opencode -p -m
```

## plugin system

### usage

how to install plugins

example

```sh
pi install npm:pi-free
```

### base

base profile 的插件说明

### code

### math

### write

