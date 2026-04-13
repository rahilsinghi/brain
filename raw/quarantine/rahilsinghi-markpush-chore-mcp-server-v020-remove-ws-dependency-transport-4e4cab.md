---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:4b7ba3e
ingested_at: 2026-04-12T23:04:19.876Z
parsed_at: 2026-04-12T23:04:19.876Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24jv5evqSTnapxhww7Y"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:45.470Z
---






# chore: MCP server v0.2.0 — remove ws dependency, transport cleanup

- **Repo:** rahilsinghi/MarkPush
- **SHA:** 4b7ba3e
- **Date:** 2026-03-18T07:32:03Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +59
- **Deletions:** -74

- Bump to v0.2.0
- Remove ws/WebSocket dependency (raw TCP transport only)
- Clean up transport modules
