---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:e07e19e
ingested_at: 2026-04-09T21:03:21.232Z
parsed_at: 2026-04-09T21:03:21.232Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2oVaqZ5Z86YvhrXVK"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:14.174Z
---






# Remove em dashes from all human-facing email copy for natural tone

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** e07e19e
- **Date:** 2026-03-04T23:10:39Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +20
- **Deletions:** -20

Replace all em dash separators with period-space in COMPANY_HOOKS,
static follow-up bodies, and the follow-up body builder function.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
