---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:695ed43
ingested_at: 2026-04-13T16:05:10.311Z
parsed_at: 2026-04-13T16:05:10.311Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24p8Bn96FEnxh5vnSFP"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:42.583Z
---






# chore: remove dead header components replaced by AppHeader

- **Repo:** rahilsinghi/raag
- **SHA:** 695ed43
- **Date:** 2026-03-15T23:39:01Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +0
- **Deletions:** -146

UniverseHeader and SongDeepDiveHeader are no longer imported —
all pages now use the unified AppHeader component.
