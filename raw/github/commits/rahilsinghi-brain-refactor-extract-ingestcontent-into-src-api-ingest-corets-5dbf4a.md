---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:c78b054
ingested_at: 2026-04-10T06:04:07.614Z
parsed_at: 2026-04-10T06:04:07.614Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuauxAQnSQix4nkPoZxC"}
compile_progress: null
---



# refactor: extract ingestContent() into src/api/ingest-core.ts

- **Repo:** rahilsinghi/brain
- **SHA:** c78b054
- **Date:** 2026-04-08T18:26:35Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +142
- **Deletions:** -41

Shared function for writing raw articles with frontmatter. HTTP route
becomes thin wrapper. Enables Telegram bot to call same logic directly.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
