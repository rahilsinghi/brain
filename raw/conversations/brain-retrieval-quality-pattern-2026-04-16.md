---
status: processed
source_type: conversation
ingested_at: 2026-04-16T22:32:00Z
parsed_at: 2026-04-16T22:32:00Z
compiled_to: "[[Brain Retrieval Quality: The Code Article Pollution Pattern]]"
processed_at: 2026-04-17T02:45:47.298Z
retry_count: 0
last_error: null
compile_progress: null
---



# Brain Retrieval Quality: The Code Article Pollution Pattern

Key insight discovered 2026-04-16 while validating brain search quality on Mac Studio. Documents a retrieval failure mode and the architectural fix.

## The Problem

When graphify code articles coexist with career/personal articles in `wiki/projects/`, code content dominates search results for any query that mentions a repo name.

**Concrete example:** Query "what is my hourly rate at maison" returned:
- wiki/projects/job-salary-intelligence-and-reporting.md (wrong)
- wiki/projects/maison-agent-database-access-test-suite.md (wrong — code)
- wiki/projects/ui-theme-management-and-application.md (wrong — code)

Despite the correct articles existing:
- wiki/decisions/maison-rahil-onboarding-call-summary-march-29-2026.md
- wiki/decisions/maison-negotiation-logistics-notes-rahil-fredrik.md
- wiki/people/rahil-singhi-s-employment-offer-and-immigration-planning-at-maison.md

## Why It Happens

Graphify's community-drop compiler produces one wiki article per code cluster. A mid-sized repo (maison-agent) generates ~270 such articles. Each contains the repo name in content (file paths, imports, test descriptions). When the user asks "maison hourly rate":

- 270 code articles contain "maison" and match keyword boost
- ~15 career articles contain "maison" and match keyword boost
- Vector similarity slightly favors career articles
- But 18:1 numeric dominance → code articles win re-ranking

## The Fix: Folder-Scoped Default Search

Three-part architectural fix:

### 1. Segregate code articles to `wiki/codebase/{repo}/`

Graphify-sourced articles live in `wiki/codebase/maison-agent/`, `wiki/codebase/portfolio/`, etc. Career/decision/people articles stay in `wiki/projects/`, `wiki/decisions/`, `wiki/people/`.

### 2. Hybrid search with folder filter

`VectorStore.hybridSearch()` accepts `{ excludeFolders?, includeFolders? }`. Default behavior excludes `wiki/codebase/` for general queries. Fetches 5x candidates (up from 3x) since some get filtered.

### 3. Auto-detect code intent in synthesize()

Regex-based intent detection in `synthesize()`:
```
/\b(code|function|class|impl|refactor|bug|api endpoint|module|import|test file)\b/i
```
When matched, sets `excludeFolders: []` so code articles are searchable. Otherwise defaults to excluding `wiki/codebase/`.

## Also Applied

- **Obsidian graph view** — filter updated to `-path:codebase` (matching existing `-path:raw` pattern)
- **Brain Explorer** — already separates wiki/code layers via `node.layer` property, no change needed

## Principle: Contextual Noise Floor

The larger the brain grows, the more important it is to segment articles by query context. Raw graphify output is high-volume but narrow-purpose (code understanding). Career/decision articles are low-volume but high-value for identity/context queries. Mixing them in default search lets quantity drown quality.

**Rule of thumb:** If a new source type generates >3x as many articles as the query-answering articles it would compete with, segregate it behind a folder filter.

Other candidates for future segregation if they grow:
- Daily logs (high volume)
- Graphify architecture summaries (one per repo, so not an issue yet)
- Telegram message dumps (if raw text gets compiled 1:1)

## Verification After Fix

Expected: query "what is my hourly rate at maison" returns decision/people articles first, not code summaries. Run after move + daemon restart to confirm.

## Related

[[Brain Project]]
[[Graphify]]
[[brain_query]]
[[Hybrid Search]]
[[LanceDB]]
[[Retrieval Augmented Generation]]
