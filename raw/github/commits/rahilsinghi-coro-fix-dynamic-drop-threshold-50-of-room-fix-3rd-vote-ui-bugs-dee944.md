---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:8bc7494
ingested_at: 2026-04-10T11:03:33.646Z
parsed_at: 2026-04-10T11:03:33.646Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3JPpQEQFRhBcXTmRy3"}
compile_progress: null
---



# fix: dynamic drop threshold (50% of room), fix 3rd-vote UI bugs (#18)

- **Repo:** rahilsinghi/Coro
- **SHA:** 8bc7494
- **Date:** 2026-02-28T20:11:35Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +54
- **Deletions:** -33

Backend:
- room_service: add get_drop_threshold() — ceil(participants/2), min 1
- room_service: record_drop uses dynamic threshold; connection_id keying
- ws.py: drop_incoming broadcast is unconditional (outside if room: guard)
- ws.py: drop_triggered always fires after delay, Lyria error is non-fatal
- ws.py: 10s expiry window; all drop messages include dynamic `needed` field

Frontend:
- DropButton: neededVotes state driven by msg.needed from server
- DropButton: progress bar shown during countdown (removed !dropIncoming guard)
- DropButton: bar width and X/Y label use neededVotes (not hardcoded 3)
- useWebSocket: stable addListener via useCallback (fixes listener drop on re-render)

Co-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>
