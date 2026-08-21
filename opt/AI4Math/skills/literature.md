---
name: literature
description: Literature review — web_search → pdf_download → analysis → literature/review.md
triggers: literature review, scientific papers, arxiv, peer-reviewed, review
combines_with: markdown (for review.md), lean (when formalizing found theorems), python (when analyzing data from papers)
---

# Literature review — workflow

## When to apply

User asks:
- "Make a literature review on topic X"
- "Find papers about Y and analyze"
- "Download PDF and tell me what's there"
- "What are the main works on Z"

## Algorithm

### 1. Search for candidates

`web_search(query, num_results=10)` with a relevant query. For
peer-reviewed sources add qualifiers:

- `site:arxiv.org` — arXiv preprints
- `filetype:pdf` — PDF documents
- `site:proceedings.neurips.cc` / `site:aclanthology.org` / etc. — specific conferences

Read results: `title / url / snippet`.

### 2. Clarify with user (important — do not download everything)

Show found results as a numbered list and ask what to download:

```
Found 8 papers:
1. <Title> — <short description> — <url>
2. ...
...
Which ones to download for detailed analysis? Specify numbers (e.g. "1, 3, 5")
or "all".
```

**Exceptions** (you may skip this step):
- User immediately said "download all" or "download the first N"
- User explicitly named one specific paper
- Only one relevant result found

### 3. Prepare folder

```
mkdir -p literature
```

If the folder already exists — do not touch existing files.

### 4. Download PDF

For each selected paper:

```
pdf_download(url="https://arxiv.org/pdf/...", dest_path="literature/")
```

- `dest_path` ending with `/` → filename is taken from URL.
- **Do not use `web_fetch` for PDF** — it decodes the response as text and
  breaks binary content. `pdf_download` uses binary-safe streaming.
- If response is `ERROR: ...` — record the reason, skip this file, continue
  with the next ones. Do not stop the entire review because of one failure.
- If URL is not a direct arxiv PDF (e.g. landing page) — try to guess the
  direct PDF link (`.../abs/` → `.../pdf/`), or fallback to
  manual `curl -L`.

### 5. Deep analysis of each PDF

For each downloaded file:

```
pdf_info(path)                         # metadata, pages, size
pdf_read(path, pages="1-3")            # intro + abstract
pdf_search(path, query="<key term>")   # term mentions
```

If needed — specific sections:

```
pdf_read(path, pages="5-8")            # methods
pdf_read(path, pages="10-12")          # results
```

**Rule**: if papers >5, read only the first 3 pages + search by
key terms. Full reading is for a separate user request.

**Never invent** content. If `pdf_read` returned empty
(scanned PDF without OCR) — mark the file as "requires manual processing",
do not fabricate.

### 6. Report `literature/review.md`

Create file via `text_editor`:

```markdown
# Literature review: <topic>

## List of papers

### 1. <Author, Year>. <Title>

- **File**: [literature/<fname>.pdf](literature/<fname>.pdf)
- **URL**: <url>
- **Key ideas** (2-3 sentences): ...
- **Methodology**: ...
- **Results**: ...

### 2. ...

## Connections between papers

<1-2 paragraphs>

- Paper #1 builds on method X from paper #3 (see page 5)
- Papers #2 and #4 both discuss concept Y, but diverge in ...
- Approach #5 criticizes ... from #1 on the basis of ...

**Do not fabricate connections from memory.** If you have not actually
seen a citation in the downloaded PDFs — either find it via
`pdf_search(query="author_name_of_other_work")`, or skip.

## Key terms

- **Term A** — definition (source: paper #1, p. 3)
- **Term B** — definition (#3, p. 7)

## What remains to read

<If there are mentions of papers not downloaded or not found>

- <Author>, <Year>. <Title> — mentioned in paper #1 (p. 5), not found
  in web_search.
```

Adapt structure to the domain:

- **Formal mathematics**: add section "Formalization in Lean 4
  (candidate lemmas)" with a list of theorems that could be
  formalized via `lean_search_scilib`.
- **ML / NLP**: add "Methodology" with architecture, datasets,
  metrics descriptions.
- **Systems papers**: "Architecture" and "Experiments".

### 7. Short summary in chat

After writing `review.md`, report to the user **in one or two
paragraphs**:

- How many papers were downloaded and analyzed
- Path to the report (`literature/review.md`)
- 2-3 main conclusions
- What remains unclear / requires next step

**Do not duplicate the entire report in chat** — the user will open
the file if needed.

## Rules

- **Do not invent quotes and page numbers**. Use `pdf_search` to
  find a specific term and return real page numbers.
- **Do not invent connections** between papers "by inspiration".
  Connection = either a real citation of one paper in another, or a
  shared term / method / dataset.
- **Do not download everything**. Clarify with the user (step 2) unless
  they explicitly declined.
- **Peer-reviewed filter** — if the user asked only for peer-reviewed
  sources, mark non-peer-reviewed (blogs, GitHub repos, Wikipedia) in
  the list as "reference only" and do not include in the main analysis.
- **After writing the report** — one `shell(ls -la literature/)` to ensure
  all files and `review.md` are in place. This is part of the execution loop.