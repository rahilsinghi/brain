---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:112eba0
ingested_at: 2026-04-10T08:03:40.135Z
parsed_at: 2026-04-10T08:03:40.135Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2NWbaKbpdnqydLZgL"}
compile_progress: null
---



# feat: backend core — FastAPI app, Pydantic models, Docker image

- **Repo:** rahilsinghi/karen
- **SHA:** 112eba0
- **Date:** 2026-04-04T13:30:21Z
- **Author:** Rahil Singhi
- **Files changed:** 8
- **Additions:** +347
- **Deletions:** -0

FastAPI entry point with CORS, health check, and router registration.
Pydantic models for members, escalations, channels, personalities,
and all SSE event types. Python 3.13-slim Docker image with WeasyPrint
system deps for PDF generation.
