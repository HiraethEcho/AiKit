# Book to Skill

fork from https://github.com/virgiliojr94/book-to-skill/

**How it works, in 3 steps:**

1. **Point** it at a file, folder, or glob — `/book-to-skill ./my-book.pdf`
2. **It distills** the book into a skill — frameworks, decision rules, anti-patterns, and per-chapter files. Structure, not a summary.
3. **Your agent loads it on demand** — ask `/my-book replication` and it reads the right chapter and answers from the real content, no hallucination.

## 📦 What it generates

Running `/book-to-skill your-book.pdf` (or a folder, glob, or list of files) creates a full skill in your agent's skills directory (`~/.copilot/skills/<slug>/` for Copilot CLI, `~/.agents/skills/<slug>/` for Amp or cross-agent, `~/.claude/skills/<slug>/` for Claude Code):

| File | Purpose | Size |
|------|---------|------|
| `SKILL.md` | Core mental models + chapter index | ~4,000 tokens |
| `chapters/ch01-*.md` … | One file per chapter, loaded on-demand | ~1,000 tokens each |
| `glossary.md` | Every key term, alphabetically sorted with chapter refs | ~1,500 tokens |
| `patterns.md` | All techniques, algorithms, and design patterns | ~2,000 tokens |
| `cheatsheet.md` | Decision tables and quick-reference rules | ~1,000 tokens |

**Chapter files are loaded on-demand** — they don't count against the skill budget until you ask about that topic.

## 🧾 The Discovery Loop Tax

A PDF-reading agent doesn't just read — it *navigates*: it re-fetches the ToC, backtracks, and re-processes all of it on every turn. book-to-skill pays that structuring cost **once**, at conversion, so queries stay proportional to the answer — **24×–51× fewer tokens** than dumping the book into context, measured on real books.

📊 **Full methodology, numbers, and per-book tables → [docs/performance.md](docs/performance.md#the-discovery-loop-tax)**

---

## ⚙️ How it works

Two halves: a deterministic Python **extractor** (document → clean text + metadata) and a spec-driven **generator** (your agent follows `SKILL.md` to turn that into a structured skill). On-demand chapter files keep the loaded skill small.

🔧 **Full walkthrough (Steps 0–10, extraction modes, token budgets) → [docs/how-it-works.md](docs/how-it-works.md)**

---

## 🚀 Usage

`/book-to-skill <path|folder|glob> [skill-name]` — plus analyze-only, generate-from-analysis, and update/fold-in modes. After a conversion, the converter can publish the skill to GitHub (private by default) so any host installs it with `npx skills add`.

▶️ **All modes and examples → [docs/usage.md](docs/usage.md)**

💬 **In practice → [use cases](https://github.com/virgiliojr94/book-to-skill-use-cases)** — a DevEx book became a survey of 300+ engineers; a scanned PDF that stalled became [#130](https://github.com/virgiliojr94/book-to-skill/pull/130). Add yours: the account lives in your own Gist, the index takes a one-line PR.

---

## 📥 Install

```bash
# One command, any host — via the cross-agent skills CLI:
npx skills add virgiliojr94/book-to-skill

# Or manually — clone into your skills folder (registers /book-to-skill):
git clone https://github.com/virgiliojr94/book-to-skill.git ~/.claude/skills/book-to-skill
# (Copilot CLI: ~/.copilot/skills/ · Amp/cross-agent: ~/.agents/skills/)
```

📥 **All hosts, optional extractors, and the standalone CLI → [docs/install.md](docs/install.md)**

---

## ❓ FAQ

Common questions — "why not just dump the PDF?", cost, privacy, non-book inputs, multi-file books.

❓ **Answers → [docs/faq.md](docs/faq.md)**

---

<details>
<summary>🔧 <strong>Requirements</strong></summary>


The extractor tries tools in order per format and uses the first available. If nothing is installed, it tells you which command to run. Plain text, Markdown, reStructuredText and AsciiDoc need no extra deps.

> **Check your setup in one command:** `python3 scripts/extract.py --check` prints which extractors are installed for every format and the exact command to install anything missing — no file needed.

**PDF — choose by book type:**

| Book type | Tool | Install | Speed |
|-----------|------|---------|-------|
| Text-heavy (prose, few tables) | `pdftotext` (poppler) | `sudo apt install poppler-utils` | ⚡ instant |
| Text-heavy fallback | `pypdf` | `pip3 install pypdf` | ⚡ instant |
| Text-heavy fallback | `pdfminer.six` | `pip3 install pdfminer.six` | ⚡ instant |
| **Technical (code, tables, formulas)** | **`docling`** | `pip3 install docling` | ~1.5s/page |

> Before extraction begins, the skill asks you whether the book is **technical** or **text-heavy** and picks the right tool automatically. Docling preserves markdown tables and code blocks; pdftotext is faster for prose-only books.

> **Scanned PDFs need OCR first.** A PDF that is page images with no text layer — a photographed or scanned book — has nothing for these tools to extract. The extractor checks the first pages and stops immediately with an explanation, rather than working through the whole book to produce an empty skill. Run OCR yourself, then convert the result:
>
> ```bash
> ocrmypdf input.pdf output.pdf
> ```

**EPUB:**

| Tool | Install | Quality |
|------|---------|---------|
| `ebooklib` + `beautifulsoup4` | `pip3 install ebooklib beautifulsoup4` | ⭐⭐⭐ Best |
| stdlib `zipfile` | built-in — no install needed | ⭐⭐ Always available |

**Other formats:**

| Format | Tool | Install |
|--------|------|---------|
| DOCX | `python-docx` (fallback: stdlib ZIP/XML) | `pip3 install python-docx` |
| HTML | `beautifulsoup4` (fallback: stdlib `html.parser`) | `pip3 install beautifulsoup4` |
| RTF | `striprtf` (fallback: regex) | `pip3 install striprtf` |
| MOBI / AZW / AZW3 | Calibre `ebook-convert` (external app, not pip) | https://calibre-ebook.com/download |
| TXT / Markdown / reStructuredText / AsciiDoc | built-in | — |

---


</details>

<details>
<summary>📁 <strong>Repository structure</strong></summary>


```
book-to-skill/
├── SKILL.md              # Skill definition + step-by-step instructions (the generator spec)
├── scripts/
│   ├── extract.py        # Thin entrypoint wrapper
│   └── extractor/        # Modular extraction package
│       ├── config.py     # Extensions, paths, dependency constants
│       ├── dependencies.py  # optional-dep probing + --check
│       ├── exceptions.py # ExtractionError (per-source failures, batch-safe)
│       ├── utils.py      # CLI parsing, multi-source resolution, chapter detection, runner
│       └── parsers/      # Format-specific parsers (pdf, epub, docx, html, rtf, calibre, text)
├── tools/
│   ├── discovery_tax.py  # measures token cost vs context-dump / discovery loop
│   └── validate_skill.py # checks a generated SKILL.md against host rules (--lens claude|copilot|amp)
├── tests/                # pytest suite (extraction, detection, discovery tax)
├── docs/
│   ├── performance.md    # measured benchmarks, discovery tax, cost
│   └── architecture.md   # pipeline + component map
├── CHANGELOG.md          # release history (semver)
├── CONTRIBUTING.md       # dev setup, PR conventions, release process
├── SECURITY.md           # vulnerability reporting
└── README.md             # This file
```

---


</details>

---
## ⚖️ Copyright & fair use

book-to-skill ships **no book content** — not a single page. It's a converter you point at files you already own.

- **Processing is local.** Extraction and analysis run on your machine. Your files are never uploaded by this tool. (If your agent's model runs in the cloud, the text you feed it follows that provider's normal data terms — same as any prompt.)
- **You use your own copy.** Bring a book you bought, docs your company owns, or papers you have the right to read.
- **The output is your notes.** A generated skill is a structured, synthesized derivative — framework names, definitions, takeaways — not a reproduction of the text. The skill explicitly never copies raw passages (see Quality Rule #7). Treat it like handwritten study notes: yours, for personal use.
- **Don't redistribute.** Publishing or sharing a generated skill of a copyrighted work can infringe the rights holder. Keep skills of third-party books private. Internal docs, your own writing, and openly-licensed material are fine to share within the bounds of their license.

When in doubt, follow the license or terms of the source document. This project is a tool; how you use it is on you.

---

## 💖 Sponsors

<img align="right" width="150" src="docs/assets/booklin-celebrating.png" alt="Booklin celebrating">

book-to-skill is free and MIT-licensed, maintained on personal time. If it saves you tokens or study hours, consider sponsoring its upkeep: PR reviews, multilingual fixes, releases, and docs.

**[Become a sponsor → github.com/sponsors/virgiliojr94](https://github.com/sponsors/virgiliojr94)**

Every sponsor is listed in [BACKERS.md](BACKERS.md). Thank you for keeping open, privacy-first tooling alive. ✨

## License

MIT — applies to the converter (code + skill definition) in this repository, **not** to any book or document you process with it.
