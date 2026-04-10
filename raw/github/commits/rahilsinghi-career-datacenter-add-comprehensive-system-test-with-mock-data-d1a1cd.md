---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:5fa09be
ingested_at: 2026-04-10T09:03:48.664Z
parsed_at: 2026-04-10T09:03:48.664Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupchBAcZLgDpBCNno2m"}
compile_progress: null
---



# Add comprehensive system test with mock data

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 5fa09be
- **Date:** 2026-02-14T16:54:18Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +373
- **Deletions:** -0

Created end-to-end test demonstrating full pipeline:
- 8 mock jobs (mix of good and bad matches)
- Filtering: 3 passed, 5 rejected (correct)
- Scoring: All passing jobs ≥8.0 (high fit)
- Tracking: CSV saved with deduplication

Test shows system working correctly without web scraping.

Test results:
- Backend Engineer, NYC, -170k, Python, BigQuery → 8.8/10 ✅
- ML Engineer, Remote, -150k, LLM, FastAPI → 8.2/10 ✅
- Full Stack, NYC, hospitality tech, TypeScript → 9.1/10 ✅

Rejected correctly:
- PhD required, 10+ years, C++ only, salary <k

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
