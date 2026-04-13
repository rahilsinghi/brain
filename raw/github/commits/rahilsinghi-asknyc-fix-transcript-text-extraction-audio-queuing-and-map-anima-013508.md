---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:fe2a48a
ingested_at: 2026-04-13T17:05:37.820Z
parsed_at: 2026-04-13T17:05:37.820Z
compiled_to: "[[Transcript Text Extraction, Audio Queuing, and Map Animation Fixes in askNYC]]"
processed_at: 2026-04-13T17:39:38.881Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix: transcript text extraction, audio queuing, and map animations

- **Repo:** rahilsinghi/askNYC
- **SHA:** fe2a48a
- **Date:** 2026-03-28T15:13:13Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +21
- **Deletions:** -19

1. Backend: extract .text from Transcription objects instead of str()
   which was dumping "text='...' finished=True" repr into the UI.
   Also use .finished to correctly set partial flag.

2. Frontend audio: queue chunks sequentially using AudioContext
   scheduling (startAt = max(now, nextPlayTime)) instead of playing
   all chunks simultaneously which created mechanical rapid-fire voice.

3. Frontend transcript: show partial transcripts too (removed
   !msg.partial gate) so text streams in real-time during speech.

4. Frontend map: set mapCenter on every pin event so flyTo always
   fires. Removed duplicate flyTo from pin sync effect to prevent
   competing animations.
