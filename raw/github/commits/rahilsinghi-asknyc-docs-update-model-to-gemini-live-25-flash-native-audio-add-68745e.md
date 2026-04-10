---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:905a3b1
ingested_at: 2026-04-10T08:03:40.144Z
parsed_at: 2026-04-10T08:03:40.144Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk355smKknpANKkkRZB"}
compile_progress: null
---



# docs: update model to gemini-live-2.5-flash-native-audio, add Vertex AI env vars

- **Repo:** rahilsinghi/askNYC
- **SHA:** 905a3b1
- **Date:** 2026-03-28T01:33:30Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +6
- **Deletions:** -3

- CLAUDE.md and README reflect actual model available on Vertex AI
- Added GOOGLE_GENAI_USE_VERTEXAI, GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION env docs
