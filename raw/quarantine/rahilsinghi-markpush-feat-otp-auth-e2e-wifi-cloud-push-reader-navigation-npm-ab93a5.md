---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:afbc80a
ingested_at: 2026-04-12T23:04:19.876Z
parsed_at: 2026-04-12T23:04:19.876Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24iNzqx6dDecVyH5gQQ"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:24.657Z
---






# feat: OTP auth, E2E WiFi+cloud push, reader navigation, npm publish

- **Repo:** rahilsinghi/MarkPush
- **SHA:** afbc80a
- **Date:** 2026-03-18T01:29:23Z
- **Author:** Rahil Singhi
- **Files changed:** 27
- **Additions:** +852
- **Deletions:** -108

Auth:
- OTP code entry as fallback when magic link deep link doesn't work
- Beta whitelist enforcement (non-whitelisted users blocked after auth)
- 30-day session persistence with auto re-auth
- 23 auth tests (up from 13)

Transport:
- Fixed WiFi protocol: raw TCP (matching iOS Network.framework)
- Fixed WiFiReceiver lifetime (was deallocated immediately)
- Fixed ISO8601 timestamp parsing for Go's RFC3339Nano format
- Cloud relay integration: CLI pushes via Supabase, iOS receives via Realtime
- CLI CloudSender includes user_id for RLS-compliant routing

iOS App:
- Feed → Reader navigation on tap (full MarkdownUI rendering)
- SwiftData persistence on receive (Library shows all documents)
- SharedModelContainer for consistent SwiftData access
- PersistenceClient TCA dependency
- CloudReceiver wired into MarkPushClient alongside WiFiReceiver

CLI:
- WiFi transport switched from WebSocket to raw TCP
- Cloud config: added user_id field for Supabase push routing
- All 24 CLI tests passing

MCP:
- Published @markpush/mcp-server@0.1.0 to npm
- Added publishConfig for public access

All tests: 50 iOS + 24 CLI + 32 MCP = 106 passing
