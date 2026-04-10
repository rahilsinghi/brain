---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:4b7ba3e
ingested_at: 2026-04-10T08:03:40.146Z
parsed_at: 2026-04-10T08:03:40.146Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk3KoQiMrNUXAn8v5uA"}
compile_progress: null
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
