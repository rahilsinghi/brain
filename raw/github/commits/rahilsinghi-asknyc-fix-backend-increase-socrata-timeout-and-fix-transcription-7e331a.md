---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:b6dff7b
ingested_at: 2026-04-10T15:04:13.416Z
parsed_at: 2026-04-10T15:04:13.416Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(backend): increase Socrata timeout and fix Transcription object subscript error

- **Repo:** rahilsinghi/askNYC
- **SHA:** b6dff7b
- **Date:** 2026-03-28T14:50:30Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +7
- **Deletions:** -5

Socrata queries were timing out at 8s — bumped to 15s. Gemini Live
event.input_transcription / event.output_transcription are Transcription
objects, not strings, so slicing and sending them raw crashed; wrapped
with str() in all four call sites.
