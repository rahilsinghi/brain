---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:112eba0
ingested_at: 2026-04-10T02:04:52.494Z
parsed_at: 2026-04-10T02:04:52.494Z
compiled_to: "[[feat: Backend Core — FastAPI App, Pydantic Models, Docker Image (SHA 112eba0)]]"
processed_at: 2026-04-10T02:23:41.936Z
retry_count: 1
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuJ4rTsy9EnRamBwH738\"}"
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
