---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:fe2a48a
ingested_at: 2026-04-10T08:03:40.139Z
parsed_at: 2026-04-10T08:03:40.139Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk39Y1sJvYXbbBAwKog"}
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
