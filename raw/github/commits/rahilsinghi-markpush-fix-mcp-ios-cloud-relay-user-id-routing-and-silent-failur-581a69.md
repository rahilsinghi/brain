---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:c899cdb
ingested_at: 2026-04-13T17:05:37.829Z
parsed_at: 2026-04-13T17:05:37.829Z
compiled_to: "[[Fix: Cloud Relay User ID Routing and Silent Failure Logging in MarkPush (MCP, iOS)]]"
processed_at: 2026-04-13T17:17:52.443Z
retry_count: 0
last_error: null
compile_progress: null
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
