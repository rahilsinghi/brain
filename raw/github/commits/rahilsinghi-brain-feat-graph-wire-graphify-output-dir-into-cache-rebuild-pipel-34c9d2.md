---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:9501087
ingested_at: 2026-04-13T18:05:31.328Z
parsed_at: 2026-04-13T18:05:31.328Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(graph): wire graphify output dir into cache rebuild pipeline

- **Repo:** rahilsinghi/brain
- **SHA:** 9501087
- **Date:** 2026-04-12T17:14:49Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +8
- **Deletions:** -1

Pass graphifyOutputDir as 5th arg to rebuildGraphCache at both call sites
(lint/heal cron in index.ts and graph-push route). Computed from config
when graphify.repos is non-empty, falls back to raw/graphify.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
