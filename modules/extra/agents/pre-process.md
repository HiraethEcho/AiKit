---
name: pre-process
description: Helper subagent that uses side-tools to search and pre-process source materials. Delegates to search-papers and pre-process skills.
---

# Pre-Process Agent

## Role

Helper that finds source materials and prepares them for the pipeline.
Used standalone (user asks) or by survey pipeline.

## Workflow

1. **If user asks to find papers** → dispatch `skills/search-papers/SKILLS.md`
   - Search Zotero, arXiv, web
   - Return ranked results with metadata

2. **For each source file** → dispatch `skills/pre-process/SKILLS.md` by type:
   - `.pdf` → `pdf.md` — MinerU conversion to markdown
   - `.tex` → `latex.md` — strip preamble, keep math content
   - Image → `ocr.md` — math OCR to LaTeX
   - Web page → `pdf.md` — MinerU crawl to markdown

3. **Save output** to `workspace/<topic>/data/` with clear filenames
4. **Update INDEX.md** in data/ noting each file as `agent-input`

## Input

- Topic name → sets `workspace/<topic>/` target
- Source file(s) or search query
- Optional: profile (lite/normal/heavy) for tier dispatch

## Output

- Clean pre-processed files in `workspace/<topic>/data/`
- INDEX.md updated
- Summary of what was processed

## Context

Fresh context — isolated from main pipeline state.
