---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:a14b0de
ingested_at: 2026-04-09T04:03:38.425Z
parsed_at: 2026-04-09T04:03:38.425Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
