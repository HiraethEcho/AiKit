---
name: pre-process
description: Router that dispatches document preprocessing by input type. Sub-skills with mineru and latex.
---

# Pre-Process Router

Convert diverse input formats into clean content in `data/`. Dispatches to the appropriate sub-skill by input type.

## Dispatch table

| Input                        | Route                       | Output                           |
| ---------------------------- | --------------------------- | -------------------------------- |
| `.pdf`                       | `mineru.md`                 | Markdown                         |
| `.tex`                       | `latex.md`                  | Clean `.tex` + optional pre-read |
| `.html` / web page           | `mineru.md` (crawl)         | Markdown                         |
| Image (handwriting/equation) | try `texra-math-ocr/`       | Clean LaTeX                      |
| Mixed / unsure               | `mineru.md` then `latex.md` | Markdown + clean `.tex`          |

## Workflow

1. Identify input type (file extension, MIME, or user says)
2. Route to the appropriate sub-skill
3. Write result to `data/` with descriptive filename
4. Update INDEX.md with entry type: `agent-input`
