---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/imessage-scheduler:b25bbc9
ingested_at: 2026-04-10T11:03:33.644Z
parsed_at: 2026-04-10T11:03:33.644Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3GdC1mEgeHsUVjWz8t"}
compile_progress: null
---



# feat: add one-command start script and rewrite README for clarity

- **Repo:** rahilsinghi/imessage-scheduler
- **SHA:** b25bbc9
- **Date:** 2026-03-10T18:27:59Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +119
- **Deletions:** -44

Add start.sh that checks prerequisites, installs deps, configures env,
and launches all services with a single command. Rewrite README with
Quick Start front and center, features list, and cleaner organization.
