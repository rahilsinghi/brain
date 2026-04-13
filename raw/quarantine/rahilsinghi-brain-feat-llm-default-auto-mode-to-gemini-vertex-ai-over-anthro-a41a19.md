---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:5a58407
ingested_at: 2026-04-12T23:04:19.840Z
parsed_at: 2026-04-12T23:04:19.840Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24gyKXk3WGSfvz9CepK"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:05.545Z
---






# feat(llm): default auto mode to Gemini (Vertex AI) over Anthropic

- **Repo:** rahilsinghi/brain
- **SHA:** 5a58407
- **Date:** 2026-04-10T13:05:51Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +7
- **Deletions:** -7

Anthropic API credits are exhausted (-$0.11). Auto mode now prefers
Gemini Vertex AI ($1000 GCP GenAI credits) with Anthropic as fallback.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
