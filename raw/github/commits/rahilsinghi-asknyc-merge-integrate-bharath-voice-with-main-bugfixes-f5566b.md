---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:56ccaac
ingested_at: 2026-04-09T01:03:46.914Z
parsed_at: 2026-04-09T01:03:46.914Z
compiled_to: "[[Merge: Integrate bharath/voice Branch with Main Bugfixes (SHA 56ccaac)]]"
processed_at: 2026-04-09T02:06:12.792Z
retry_count: 0
last_error: null
compile_progress: null
---



# merge: integrate bharath/voice with main bugfixes

- **Repo:** rahilsinghi/askNYC
- **SHA:** 56ccaac
- **Date:** 2026-03-28T15:01:43Z
- **Author:** Rahil Singhi
- **Files changed:** 5
- **Additions:** +56
- **Deletions:** -23

Resolved conflict in gemini_service.py _dispatch_event: kept both the
str() wrapping fix (Transcription object not subscriptable) and Bharath's
diagnostic tracking (_last_user_transcript). Updated test assertion to
match the str()-wrapped assignment.

All 70 voice pipeline tests pass. Frontend builds clean.
