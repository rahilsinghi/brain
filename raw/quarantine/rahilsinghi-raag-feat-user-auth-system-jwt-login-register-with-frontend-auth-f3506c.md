---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:f334d97
ingested_at: 2026-04-13T16:05:10.312Z
parsed_at: 2026-04-13T16:05:10.312Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24fQq9SQJrFom1xE5fv"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:44.394Z
---






# feat: user auth system — JWT login/register with frontend auth store

- **Repo:** rahilsinghi/raag
- **SHA:** f334d97
- **Date:** 2026-03-07T01:10:10Z
- **Author:** Rahil Singhi
- **Files changed:** 10
- **Additions:** +616
- **Deletions:** -0

Adds User model, auth API (register/login/me/refresh), JWT middleware,
LoginModal, UserMenu, and Zustand auth store with token persistence.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
