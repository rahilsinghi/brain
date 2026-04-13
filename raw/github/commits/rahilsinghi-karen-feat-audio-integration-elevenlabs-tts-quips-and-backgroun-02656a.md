---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:162f957
ingested_at: 2026-04-13T17:05:37.812Z
parsed_at: 2026-04-13T17:05:37.812Z
compiled_to: "[[Audio Integration: ElevenLabs TTS, Quips, and Background Music in Karen Project]]"
processed_at: 2026-04-13T17:25:42.514Z
retry_count: 0
last_error: null
compile_progress: null
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
