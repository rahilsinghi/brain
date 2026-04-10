---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:f4fb916
ingested_at: 2026-04-10T12:03:43.538Z
parsed_at: 2026-04-10T12:03:43.538Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4LKaahyGbxvkZkMFib"}
compile_progress: null
---



# feat(gmail): replace MCP dependency with direct googleapis OAuth2 API

- **Repo:** rahilsinghi/brain
- **SHA:** f4fb916
- **Date:** 2026-04-10T11:52:40Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +19
- **Deletions:** -15

Gmail source no longer requires MCP tools. Uses googleapis npm package
with OAuth2 refresh token for autonomous hourly sync. One-time setup
via `pnpm gmail:auth` browser consent flow. First sync: 41 emails.

Files added:
- src/sources/gmail-auth.ts — OAuth2 client factory
- scripts/gmail-auth.ts — one-time consent CLI
- tests/sources/gmail-auth.test.ts — 5 auth tests
- tests/sources/gmail-api.test.ts — 5 API source tests

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
