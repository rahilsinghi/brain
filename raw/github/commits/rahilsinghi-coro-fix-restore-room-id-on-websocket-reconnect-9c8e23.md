---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:82cdae8
ingested_at: 2026-04-10T06:04:07.641Z
parsed_at: 2026-04-10T06:04:07.641Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuaugnhEvDFSPG8y2TZH"}
compile_progress: null
---



# fix: restore room_id on WebSocket reconnect

- **Repo:** rahilsinghi/Coro
- **SHA:** 82cdae8
- **Date:** 2026-02-28T17:24:18Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +9
- **Deletions:** -0

When a WebSocket reconnects, room_id is lost because it's a local
variable. Now reads room_id from the message payload and re-registers
the connection in the room's broadcast set.
