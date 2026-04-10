---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:56ccaac
ingested_at: 2026-04-10T02:04:52.499Z
parsed_at: 2026-04-10T02:04:52.499Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuGjFghxDmWvRnHZypSL\"}"
compile_progress: null
quarantined_at: 2026-04-10T02:05:48.811Z
---







# merge: integrate bharath/voice with main bugfixes

- **Repo:** rahilsinghi/askNYC
- **SHA:** 56ccaac
- **Date:** 2026-03-28T15:01:43Z
- **Author:** Rahil Singhi
- **Files changed:** 5
- **Additions:** +56
- **Deletions:** -23

Resolved conflict in gemini_service.py _dispatch_event: kept both the
str() wrapping fix (Transcription object not subscriptable) and Bharath's
diagnostic tracking (_last_user_transcript). Updated test assertion to
match the str()-wrapped assignment.

All 70 voice pipeline tests pass. Frontend builds clean.
