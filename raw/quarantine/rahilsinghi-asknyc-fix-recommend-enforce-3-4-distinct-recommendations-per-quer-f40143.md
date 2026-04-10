---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:02bc805
ingested_at: 2026-04-10T02:04:52.496Z
parsed_at: 2026-04-10T02:04:52.496Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3QgAkaq7nSShxtNv6"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:22.453Z
---






# fix(recommend): enforce 3-4 distinct recommendations per query

- **Repo:** rahilsinghi/askNYC
- **SHA:** 02bc805
- **Date:** 2026-03-28T19:09:58Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +11
- **Deletions:** -4

Update synthesis prompt to require exactly 3-4 named places with
varied scores and different data highlights per recommendation.
