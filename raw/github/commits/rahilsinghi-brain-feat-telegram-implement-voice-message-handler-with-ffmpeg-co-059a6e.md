---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:3796dae
ingested_at: 2026-04-10T15:04:13.381Z
parsed_at: 2026-04-10T15:04:13.381Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
