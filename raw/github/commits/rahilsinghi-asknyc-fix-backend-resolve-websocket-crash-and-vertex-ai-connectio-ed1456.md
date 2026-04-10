---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:01aae64
ingested_at: 2026-04-10T02:04:52.502Z
parsed_at: 2026-04-10T02:04:52.502Z
compiled_to: "[[fix(backend): resolve WebSocket crash and Vertex AI connection – askNYC (SHA 01aae64)]]"
processed_at: 2026-04-10T02:12:25.170Z
retry_count: 1
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuHB5dwrYdzk9cijxn6D\"}"
compile_progress: null
---











# fix(backend): resolve WebSocket crash and Vertex AI connection

- **Repo:** rahilsinghi/askNYC
- **SHA:** 01aae64
- **Date:** 2026-03-28T01:32:13Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +11
- **Deletions:** -5

- Fix dashboard_ws() missing Request parameter (use module-level session service)
- Alias GOOGLE_GEMINI_API_KEY to GOOGLE_API_KEY for ADK compatibility
- Add ended_at field to SessionState schema
- Pre-create ADK session before run_live() to prevent "session not found"
- Switch model to gemini-live-2.5-flash-native-audio (available on Vertex AI)
