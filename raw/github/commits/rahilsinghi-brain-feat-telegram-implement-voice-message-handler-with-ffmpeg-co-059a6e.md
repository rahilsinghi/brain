---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:3796dae
ingested_at: 2026-04-10T08:03:40.115Z
parsed_at: 2026-04-10T08:03:40.115Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2aRx3SjsaYFra37qD"}
compile_progress: null
---



# feat(telegram): implement voice message handler with ffmpeg conversion

- **Repo:** rahilsinghi/brain
- **SHA:** 3796dae
- **Date:** 2026-04-09T00:56:00Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +73
- **Deletions:** -7

Downloads Telegram .ogg voice files via ctx.getFile()/file.download(),
converts to .wav via ffmpeg (injectable ConvertAudioFn for testability),
saves to raw/voice/{timestamp}.wav for the voice watcher pipeline.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
