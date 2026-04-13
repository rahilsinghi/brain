---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:f9a2c7d
ingested_at: 2026-04-12T23:04:19.880Z
parsed_at: 2026-04-12T23:04:19.880Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24g8xCMyq673tUKaMfy"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:54.242Z
---






# feat: smooth transitions, room cap, custom prompts

- **Repo:** rahilsinghi/Coro
- **SHA:** f9a2c7d
- **Date:** 2026-02-28T18:00:25Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +123
- **Deletions:** -5

- lyria_service.py: BPM clamped ±10/tick for gradual ramping
- gemini_service.py: continuity rules (≥60% overlap, DJ crossfade), custom_prompt passthrough
- room_service.py: 10-user room cap, clear stale inputs after tick
- PRD_V2.md: task distribution for Bharath + Sariya
