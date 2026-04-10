---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:9ae0944
ingested_at: 2026-04-10T02:04:52.504Z
parsed_at: 2026-04-10T02:04:52.504Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3rzCtj8mguRpFT9Z4"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:28.545Z
---






# chore: client and feed cleanup

- **Repo:** rahilsinghi/MarkPush
- **SHA:** 9ae0944
- **Date:** 2026-03-18T07:32:23Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +18
- **Deletions:** -1

- Stop existing receivers before starting new ones in MarkPushClient
- Minor FeedFeature import cleanup
- Add Xcode workspace settings
