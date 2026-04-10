---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:234d842
ingested_at: 2026-04-10T06:04:07.640Z
parsed_at: 2026-04-10T06:04:07.640Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuavCSeNQTJad3jfHbUj"}
compile_progress: null
---



# feat: coordinated drop button — 3+ presses in 2s triggers bass drop

- **Repo:** rahilsinghi/Coro
- **SHA:** 234d842
- **Date:** 2026-02-28T18:14:50Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +58
- **Deletions:** -0

- room_service.py: record_drop() with 2-second sliding window
- ws.py: drop handler bypasses Gemini, sends aggressive drop prompts to Lyria
- Broadcasts drop_progress (building) and drop_triggered (explosion) to all clients
