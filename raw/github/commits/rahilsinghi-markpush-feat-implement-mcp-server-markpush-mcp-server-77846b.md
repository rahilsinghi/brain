---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:3208882
ingested_at: 2026-04-13T18:05:31.399Z
parsed_at: 2026-04-13T18:05:31.399Z
compiled_to: "[[MarkPush MCP Server Implementation]]"
processed_at: 2026-04-13T18:11:34.317Z
retry_count: 0
last_error: null
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
