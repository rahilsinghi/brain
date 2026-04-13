---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:3796dae
ingested_at: 2026-04-13T17:05:37.753Z
parsed_at: 2026-04-13T17:05:37.753Z
compiled_to: "[[Telegram Voice Message Handler with FFmpeg Conversion in Brain Project]]"
processed_at: 2026-04-13T17:18:17.855Z
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
