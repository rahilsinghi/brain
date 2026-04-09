---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:11aaffb
ingested_at: 2026-04-09T04:03:38.430Z
parsed_at: 2026-04-09T04:03:38.430Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# refactor: move type import to top of file in api.ts

- **Repo:** rahilsinghi/raag
- **SHA:** 11aaffb
- **Date:** 2026-03-15T19:23:28Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +2
- **Deletions:** -2

Move ConversationSummary/ConversationDetail import to the top of the
file alongside other imports instead of mid-file before the functions
that use them.
