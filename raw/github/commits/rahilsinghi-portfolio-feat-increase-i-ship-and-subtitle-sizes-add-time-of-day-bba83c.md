---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:ae7e58a
ingested_at: 2026-04-10T04:04:34.781Z
parsed_at: 2026-04-10T04:04:34.781Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRoBQ9hDYCjnAuo9LkK"}
compile_progress: null
---



# feat: increase I Ship and subtitle sizes, add time-of-day greeting

- **Repo:** rahilsinghi/portfolio
- **SHA:** ae7e58a
- **Date:** 2026-03-12T00:41:00Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +20
- **Deletions:** -2

Bumped 'I Ship' from clamp(1.8rem,4.5vw) to clamp(2.2rem,5.5vw) and
subtitle from clamp(1rem,2.5vw) to clamp(1.2rem,2.8vw). Added
contextual greeting based on visitor's local time.
