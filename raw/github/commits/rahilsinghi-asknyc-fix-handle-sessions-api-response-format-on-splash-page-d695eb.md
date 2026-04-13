---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:15caf15
ingested_at: 2026-04-13T17:05:37.822Z
parsed_at: 2026-04-13T17:05:37.822Z
compiled_to: "[[Fix: Handle Sessions API Response Format on askNYC Splash Page]]"
processed_at: 2026-04-13T17:38:58.636Z
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
