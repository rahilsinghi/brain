---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:c899cdb
ingested_at: 2026-04-10T02:04:52.503Z
parsed_at: 2026-04-10T02:04:52.503Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM31GWGHZWRtcDYCAQP"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:16.929Z
---






# fix(mcp,ios): cloud relay user_id routing and silent failure logging

- **Repo:** rahilsinghi/MarkPush
- **SHA:** c899cdb
- **Date:** 2026-03-27T00:36:24Z
- **Author:** Rahil Singhi
- **Files changed:** 5
- **Additions:** +77
- **Deletions:** -10

MCP server:
- auto.ts: error clearly when cloud user_id is missing instead of sending NULL
- auto.ts: log WiFi failures before falling back to cloud
- pairing/server.ts: auto-populate user_id from Supabase devices table after pairing
- index.ts: bump server version from 0.1.0 to 0.2.0 to match package.json

iOS app:
- MarkPushClient: replace silent try? with do/catch + os.Logger for cloud auth
- CloudReceiver: add logging for Realtime INSERTs and decode failures

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
