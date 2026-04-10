---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:162f957
ingested_at: 2026-04-10T02:04:52.492Z
parsed_at: 2026-04-10T02:04:52.492Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3zGzwEKy3icg1K88o"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:30.317Z
---






# feat: audio integration — ElevenLabs TTS, quips, and background music

- **Repo:** rahilsinghi/karen
- **SHA:** 162f957
- **Date:** 2026-04-04T13:30:47Z
- **Author:** Rahil Singhi
- **Files changed:** 69
- **Additions:** +332
- **Deletions:** -0

Karen speaks via ElevenLabs Rachel voice (eleven_turbo_v2_5). 60 pre-recorded
quip mp3s (15 per personality) for instant playback on level fire. On-the-fly
commentary TTS during countdown between levels. Audio served via /api/audio/
endpoint with path traversal prevention. Jazz lounge hold music included.
