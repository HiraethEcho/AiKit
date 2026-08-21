---
name: raycast-script-creator
description: Create and install a Raycast script command in /Users/astronaute/.config/raycast/script-commands, then register it with chezmoi after the user confirms it works in Raycast. Trigger whenever the user asks to make, add, build, or scaffold a Raycast script, Raycast command, Raycast shortcut, or any shell/zsh command they want to launch from Raycast — even if they don't use the word "script". Use this for ANY request about automating something through Raycast from the keyboard.
---

# Raycast Script Creator

Create a Raycast script command in zsh, drop it in the user's script-commands folder, let the user confirm it works in Raycast, then track it with `chezmoi add`.

## Defaults

- **Language**: `zsh` (shebang `#!/usr/bin/env zsh`). Only switch if the user explicitly asks.
- **Location**: `/Users/astronaute/.config/raycast/script-commands/` (flat, no subfolders).
- **Filename**: kebab-case of the title + extension matching the language (`.sh` for zsh/bash, `.py` for python, `.applescript` for AppleScript, `.js` for node…).
- **Author**: `astronaute`.
- **Icon**: `🤖` unless overridden.
- **authorURL**: omit.

## Workflow

### 1. Gather intent

From the user prompt, decide:
- **Behavior** — what the script does.
- **Title** — human-readable, Apple-Style-Guide-ish (`Toggle Hidden Files`, `Open Today's Journal`).
- **Mode** — `silent` (fire-and-forget), `compact` (short result line), `fullOutput` (long output window), `inline` (live in root search, needs `refreshTime`).
- **Arguments** — up to 3 positional args, each with `name`, `placeholder`, optional `optional`/`secure`.
- **needsConfirmation** — true for destructive commands.

If anything is ambiguous, ask ONE concise question with a recommended default — never ask blind.

### 2. Verify metadata spec via grimoire

Before writing, confirm the current Raycast metadata keys. Do not rely on memory:

    grimoire search "script command metadata headers" --source raycast-script-commands --top 3

Run follow-up searches for edge cases (arguments, icons, refreshTime, packageName).

### 3. Write the script

Use the **Write** tool (MCP file-writing is disallowed in this project).

Template — **follow the exact section structure below**. Raycast's own template (`templates/script-command.template.sh` in `raycast/script-commands`) groups metadata into three commented sections. Missing `packageName` or skipping these section headers has caused scripts not to appear in Raycast root search even when the required keys are all present.

    #!/usr/bin/env zsh

    # Required parameters:
    # @raycast.schemaVersion 1
    # @raycast.title <Title>
    # @raycast.mode <mode>
    # @raycast.packageName <Package>

    # Optional parameters:
    # @raycast.icon 🤖
    # @raycast.argument1 { "type": "text", "placeholder": "..." }
    # @raycast.currentDirectoryPath ~              # only if needed
    # @raycast.needsConfirmation true              # only if true

    # Documentation:
    # @raycast.description <one-sentence description>
    # @raycast.author astronaute

    set -euo pipefail

    <script body>

Rules:
- **Always include `@raycast.packageName`** — e.g. `Security`, `System`, `Developer`, `Network`. It's the root-search subtitle and empirically required for the command to be discovered reliably.
- **Keep the three section header comments** (`# Required parameters:`, `# Optional parameters:`, `# Documentation:`) — they match the official template and the working scripts already in the folder.
- **Keep the argument `placeholder` simple text**: no parentheses, no quotes, no JSON-breaking characters. `"prefix"` is fine; `"prefix (e.g. foo)"` is risky.
- `set -euo pipefail` on every zsh/bash script — fail fast aligns with the user's anti-defensive-programming philosophy.
- Double quotes around every string literal (project Rule 12).
- No useless comments (project Rule 5).
- Blank line separating metadata block from script body; Raycast needs a contiguous comment block at the top.

### 4. Make it executable

    chmod +x /Users/astronaute/.config/raycast/script-commands/<filename>

### 5. Ask the user to test

Say exactly:

> Open Raycast, search for **"<Title>"**, run it, and confirm it works as expected. Reply `ok` to track it with chezmoi, or describe the issue.

Wait. Do **not** run `chezmoi add` before the user confirms.

### 6. Track with chezmoi

On confirmation:

    chezmoi add /Users/astronaute/.config/raycast/script-commands/<filename>

Surface any chezmoi error verbatim — no silent retries. Do **not** run `chezmoi apply`.

## Output modes — quick reference

| Mode | Use when |
|------|----------|
| `silent` | Side-effect commands (toggle, copy, open). HUD only. |
| `compact` | Short success/error message or one-liner result. |
| `fullOutput` | Long / multi-line output (logs, lists). |
| `inline` | Live result in root search (system info). Requires `refreshTime`. |

## Arguments — quick reference

    # @raycast.argument1 { "type": "text", "placeholder": "name" }
    # @raycast.argument2 { "type": "dropdown", "placeholder": "env", "data": [{ "title": "Prod", "value": "prod" }] }

Positional inside the script: `$1`, `$2`, `$3`.

## Example

User: *"Create a Raycast script to copy my public IP to the clipboard."*

1. Title `Copy Public IP`, mode `silent`, icon `🌐`, no args.
2. Confirm any uncertain fields with the user.
3. `grimoire search "script command metadata headers" --source raycast-script-commands`.
4. Write `/Users/astronaute/.config/raycast/script-commands/copy-public-ip.sh`.
5. `chmod +x`.
6. Ask user to test in Raycast.
7. On `ok`, `chezmoi add <path>`.

## Avoid

- Writing via MCP tools — use Write.
- Env-var fallbacks unless user asks (project Rule 9).
- Disabling shell errors (`set +e`) without confirmation.
- Running `chezmoi apply` — only `add`.
- Creating subfolders inside `script-commands/`.
- Committing or pushing anything — out of scope.
