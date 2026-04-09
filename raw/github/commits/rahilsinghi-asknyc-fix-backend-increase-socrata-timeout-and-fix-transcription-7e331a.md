---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:b6dff7b
ingested_at: 2026-04-09T01:03:46.914Z
parsed_at: 2026-04-09T01:03:46.914Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
