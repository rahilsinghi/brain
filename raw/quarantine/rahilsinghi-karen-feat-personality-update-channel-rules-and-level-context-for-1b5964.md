---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:5dddb2e
ingested_at: 2026-04-10T01:03:40.370Z
parsed_at: 2026-04-10T01:03:40.370Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3kz3czBYci4EE1ska"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:27.386Z
---






# feat(personality): update channel rules and level context for v2 ladder

- **Repo:** rahilsinghi/karen
- **SHA:** 5dddb2e
- **Date:** 2026-04-04T15:11:49Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +29
- **Deletions:** -57

- Added email_cc, voice_call, slack channel rules
- Removed linkedin, twitter channel rules
- Updated all 10 level contexts to match v2 ladder order

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
