---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:11aaffb
ingested_at: 2026-04-13T16:05:10.311Z
parsed_at: 2026-04-13T16:05:10.311Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24iwD6FV4PPytwHrKrv"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:32.196Z
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
