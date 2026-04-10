---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:695ed43
ingested_at: 2026-04-10T10:04:00.843Z
parsed_at: 2026-04-10T10:04:00.843Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3JbGyMJ1xye7Qh3BNL"}
compile_progress: null
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
