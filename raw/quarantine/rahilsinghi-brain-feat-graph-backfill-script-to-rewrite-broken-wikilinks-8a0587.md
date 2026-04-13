---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:6b63628
ingested_at: 2026-04-13T00:04:31.019Z
parsed_at: 2026-04-13T00:04:31.019Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24pFpASqVrWpun4vwmc"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:44.345Z
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
