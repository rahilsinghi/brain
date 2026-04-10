---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:b6dff7b
ingested_at: 2026-04-10T08:03:40.140Z
parsed_at: 2026-04-10T08:03:40.140Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2X4J5AhNhYg8LrQcn"}
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
