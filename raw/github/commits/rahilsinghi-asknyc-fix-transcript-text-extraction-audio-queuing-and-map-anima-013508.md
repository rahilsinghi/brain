---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:fe2a48a
ingested_at: 2026-04-09T01:03:46.914Z
parsed_at: 2026-04-09T01:03:46.914Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
