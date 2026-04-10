---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:3208882
ingested_at: 2026-04-10T09:03:48.647Z
parsed_at: 2026-04-10T09:03:48.647Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcNKqwNrudiwKw1FSJ"}
compile_progress: null
---



# feat: implement MCP server (@markpush/mcp-server)

- **Repo:** rahilsinghi/MarkPush
- **SHA:** 3208882
- **Date:** 2026-03-17T01:43:05Z
- **Author:** Rahil Singhi
- **Files changed:** 25
- **Additions:** +4430
- **Deletions:** -0

TypeScript MCP server for pushing AI-generated markdown to iPhone
directly from Claude Code or any MCP-compatible terminal.

Tools:
- push_markdown: push raw markdown with title/tags/source
- push_template: push via pre-built templates (code-review,
  meeting-notes, daily-summary, bug-report)
- pair_device: QR code pairing flow (same as CLI)
- list_devices: show paired devices
- push_history: recent push history
- unpair_device: remove paired device

Prompt templates:
- code-review, meeting-notes, daily-summary, bug-report

Infrastructure:
- AES-256-GCM encrypt/decrypt (Node.js crypto, same format as Go/Swift)
- PBKDF2 key derivation (SHA-256, 100k iterations, 32-byte key)
- WiFi transport (WebSocket + mDNS discovery)
- Cloud transport (Supabase REST API)
- Auto-transport: WiFi first (2s), cloud fallback
- Config store: shared ~/.config/markpush/ with Go CLI
- QR pairing server: ephemeral HTTP + qrcode-terminal
- Push history: local JSON file

Tests: 32 passing (vitest) — crypto, protocol, templates
Build: TypeScript → dist/ via tsc, distributed as npm bin

Install: claude mcp add markpush -- npx -y @markpush/mcp-server
