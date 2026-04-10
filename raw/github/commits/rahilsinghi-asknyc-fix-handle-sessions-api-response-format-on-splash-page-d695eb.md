---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:15caf15
ingested_at: 2026-04-10T15:04:13.420Z
parsed_at: 2026-04-10T15:04:13.420Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix: handle sessions API response format on splash page

- **Repo:** rahilsinghi/askNYC
- **SHA:** 15caf15
- **Date:** 2026-03-28T13:49:19Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +3
- **Deletions:** -2

Backend returns {sessions: [...]} not a raw array. Extract the
array before calling .slice() to prevent runtime TypeError.
