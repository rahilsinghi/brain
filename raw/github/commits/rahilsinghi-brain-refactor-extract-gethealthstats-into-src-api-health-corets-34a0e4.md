---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:945298f
ingested_at: 2026-04-10T11:03:33.625Z
parsed_at: 2026-04-10T11:03:33.625Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3GNB7thmDSHBpwzB4m"}
compile_progress: null
---



# refactor: extract getHealthStats() into src/api/health-core.ts

- **Repo:** rahilsinghi/brain
- **SHA:** 945298f
- **Date:** 2026-04-08T18:28:12Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +155
- **Deletions:** -40

Shared function for gathering daemon health stats. HTTP route becomes
thin wrapper. Enables Telegram bot /status command to use same logic.
