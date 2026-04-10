---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:4985d52
ingested_at: 2026-04-10T00:03:23.772Z
parsed_at: 2026-04-10T00:03:23.772Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuGUG3cvacWeE4589Mkn\"}"
compile_progress: null
quarantined_at: 2026-04-10T02:02:25.410Z
---







# feat(seed): experience transform with metrics merge and cross-referencing

- **Repo:** rahilsinghi/brain
- **SHA:** 4985d52
- **Date:** 2026-04-08T12:30:03Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +186
- **Deletions:** -0

Maps ExperienceEntry YAML to wiki articles under wiki/experience/. Merges
MetricEntry data inline, skipping metrics already present in bullet text,
and emits [[ref:]] links to sibling entries at the same company.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
