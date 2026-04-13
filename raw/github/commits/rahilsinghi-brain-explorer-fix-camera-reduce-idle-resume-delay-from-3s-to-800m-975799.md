---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:21070d1
ingested_at: 2026-04-13T18:05:31.384Z
parsed_at: 2026-04-13T18:05:31.384Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(camera): reduce idle resume delay from 3s to 800ms

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** 21070d1
- **Date:** 2026-04-10T20:06:33Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +1
- **Deletions:** -1

Auto-rotation resumes almost immediately after releasing orbit controls
instead of the sluggish 3-second wait.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
