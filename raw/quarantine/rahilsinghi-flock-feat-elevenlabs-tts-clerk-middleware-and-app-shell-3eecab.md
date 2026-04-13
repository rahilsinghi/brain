---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:a14b0de
ingested_at: 2026-04-13T16:05:10.308Z
parsed_at: 2026-04-13T16:05:10.308Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24dZP3JH5bcR4z8Z8JB"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:19.325Z
---






# feat: ElevenLabs TTS, Clerk middleware, and app shell

- **Repo:** rahilsinghi/Flock
- **SHA:** a14b0de
- **Date:** 2026-03-21T14:23:57Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +183
- **Deletions:** -0

tts.ts — voice map for 7 voices, generateSpeech with turbo_v2_5,
getOrGenerateClip (static file fallback), preGenerateRevealClips
middleware.ts — Clerk auth with public routes for API + demo
(app)/layout.tsx — dark shell layout
(app)/preference/page.tsx — profile viewer stub with completeness bar

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
