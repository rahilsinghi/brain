---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:045f4c9
ingested_at: 2026-04-10T02:04:52.478Z
parsed_at: 2026-04-10T02:04:52.478Z
compiled_to: "[[parseVoice: Transcription, Classification, and Markdown Drop Implementation]]"
processed_at: 2026-04-10T02:06:10.035Z
retry_count: 2
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuGqECai4ZfsTNMfUXh9\"}"
compile_progress: null
quarantined_at: 2026-04-10T02:07:10.258Z
---









# feat(voice): add parseVoice — transcription + classification + markdown drop + sidecar

- **Repo:** rahilsinghi/brain
- **SHA:** 045f4c9
- **Date:** 2026-04-09T00:50:01Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +150
- **Deletions:** -0

Implements parseVoice with idempotent .processed sidecar guard, frontmatter drop
to raw/{cluster}/, daily log entry via appendDailyEntry, and full TDD coverage (5 tests).

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
