---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:3d92d98
ingested_at: 2026-04-10T03:04:49.547Z
parsed_at: 2026-04-10T03:04:49.547Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuMEmz8goaZo9EAVbDFU"}
compile_progress: null
---



# Config: Add Apollo session storage and ignore Chrome user data

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 3d92d98
- **Date:** 2026-02-25T19:04:44Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +736
- **Deletions:** -0

Added:
- config/apollo_session.json: Saved Apollo login session
- .gitignore: Ignore config/chrome_user_data/ (persistent browser profile)

Persistent Chrome context stored locally, not in git.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
