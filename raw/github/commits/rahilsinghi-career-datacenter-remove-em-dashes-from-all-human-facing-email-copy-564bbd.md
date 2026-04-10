---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:e07e19e
ingested_at: 2026-04-10T03:04:49.543Z
parsed_at: 2026-04-10T03:04:49.543Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuMEndKmnYBmSTmkvvr3"}
compile_progress: null
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
