---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:6b63628
ingested_at: 2026-04-13T18:05:31.350Z
parsed_at: 2026-04-13T18:05:31.350Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(graph): backfill script to rewrite broken wikilinks

- **Repo:** rahilsinghi/brain
- **SHA:** 6b63628
- **Date:** 2026-04-10T22:59:09Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +237
- **Deletions:** -1

Walks all wiki articles, resolves [[Title]] links case-insensitively
via title and slug matching, rewrites to canonical titles. Supports
--dry-run, skips index.md and code-architecture/. Idempotent.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
