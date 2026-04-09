---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:112eba0
ingested_at: 2026-04-09T01:03:46.911Z
parsed_at: 2026-04-09T01:03:46.911Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
