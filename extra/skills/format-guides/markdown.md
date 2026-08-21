---
name: markdown
description: GitHub-Flavored Markdown — README, documentation, diary, reviews
triggers: Markdown, .md, README, GFM, documentation
combines_with: python (when generating README for a package), literature (for review.md), latex (format selection)
source: opt/AI4Math/skills/markdown.md (github.com/andkhalov/AI4Math)，原样迁入
---

# Markdown — patterns and format

## When Markdown, when LaTeX

- **Markdown** — README, documentation, diary.md, literature reviews,
  experiment reports, notebook-like notes, GitHub/GitLab artifacts.
- **LaTeX** — see `load_skill("latex")`. Formal articles, dissertations,
  books.
- If the user did not specify — choose format by context: documentation
  / notes → Markdown; article / dissertation → LaTeX.
- **Do not mix** LaTeX-specific commands into Markdown without critical need.
  If a formula is needed in MD — use regular GFM math (`$...$`,
  `$$...$$` for display) or inline-code for small things.

## GitHub-Flavored Markdown — basic elements

```markdown
# Heading 1
## Heading 2 (max 3 levels)

Regular paragraph. Line break — **two spaces at end** or blank
line for new paragraph.

**bold** — only for critical terms, not for emphasizing every word.
*italic* — for titles, foreign words, emphasis.
`inline code` — commands, filenames, identifiers.

- Unordered
- list
- items

1. Numbered
2. list
3. (if order matters)

> Blockquote. Used for others' words or important notes.

[Link](https://example.com) — do not write raw URL in text when a
human-readable label is possible.

![alt text](path/to/image.png) — always write alt text.
```

## Code blocks

Always specify the language after ` ``` ` — this enables highlighting
on GitHub:

    ```python
    def foo():
        return 42
    ```

    ```bash
    git clone https://github.com/user/repo.git
    cd repo && ./setup.sh
    ```

    ```lean
    example : 1 + 1 = 2 := by norm_num
    ```

For **inline** — single backticks: `path/to/file.py:42`, `variable_name`.

## Tables

```markdown
| Column A | Column B | Column C |
|----------|:--------:|---------:|
| left     |  center  |    right |
| cell     |   cell   |     cell |
```

Alignment via `:---`, `:---:`, `---:`. GitHub renders properly.

## File links (in IDE-friendly format)

When referencing a project file, use a **clickable link** in format
`[file.py:42](path/file.py#L42)` or `path/file.py:42` — modern IDEs
can navigate these with one click.

## Math in MD

GitHub since 2022 renders LaTeX math via KaTeX:

```markdown
Inline: $x^2 + y^2 = z^2$

Display:
$$
\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}
$$
```

Limitations: not all LaTeX packages are supported, complex environments
(`align`, theorem, proof) work via `\begin{aligned}...\end{aligned}`
inside display math. For serious math, `.tex` is still better.

## Document structure

Minimum grid:

```markdown
# Title

One or two sentence summary.

## Motivation / Context

Why this is needed.

## Main content

Break into 2-4 sections at level `##`.

## Usage / Examples

Copy-paste ready examples.

## References

[1] Author, Year. [Title](url). Journal.
```

## Frontmatter (YAML)

If the file is read by some tool (Goose skills, Jekyll, mkdocs),
add YAML frontmatter at the top:

```markdown
---
name: skill-name
description: Brief description
---

# Contents here
```

For regular documentation, frontmatter is not needed.

## Anti-patterns (don't do)

- **Three+ levels of headings** (`####`, `#####`) — restructure instead.
- **Bold for every phrase** — loses the meaning of emphasis.
- **Code block without language** — no highlighting, harder to read.
- **Long links in text** (`details at https://very.long.url/...`) —
  wrap in `[text](url)`.
- **Tables with 20 columns** — better use code block with fixed
  layout or several smaller tables.
- **HTML tags** in MD (`<br>`, `<div>`) without necessity. GFM is almost always
  sufficient.
- **Emoji in headings** (`## 🚀 Install`) — visual noise, works poorly
  in terminals.

## When creating README

1. First line — `# Project Name`
2. One or two paragraphs — what it is and why
3. Section "Quick start" with one or two copy-paste commands
4. Section "Usage / Examples"
5. Section "Docs" / "Architecture" / "FAQ" as needed
6. Section "License" at the end

**Do not create README without explicit user request.** Especially do not write
`README.md` in a project that just started — this is often an anti-pattern.