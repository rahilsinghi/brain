---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/graphify:9a3b2b2
ingested_at: 2026-04-13T18:05:31.388Z
parsed_at: 2026-04-13T18:05:31.388Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# chore: strip modules replaced by Brain (serve, watch, transcribe, __main__, skill)

- **Repo:** rahilsinghi/graphify
- **SHA:** 9a3b2b2
- **Date:** 2026-04-10T23:19:19Z
- **Author:** Rahil Singhi
- **Files changed:** 15
- **Additions:** +1
- **Deletions:** -13594

Remove serve.py, watch.py, transcribe.py, __main__.py, and all skill-*.md files.
Strip export.py to keep only to_json() and attach_hyperedges().
Update __init__.py to remove references to stripped exports.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
