---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:3208882
ingested_at: 2026-04-09T21:03:21.204Z
parsed_at: 2026-04-09T21:03:21.204Z
compiled_to: "[[MarkPush MCP Server (@markpush/mcp-server)]]"
processed_at: 2026-04-10T02:40:01.575Z
retry_count: 2
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuKLmwanTAKLwVWHCTq8\"}"
compile_progress: null
quarantined_at: 2026-04-10T02:40:04.500Z
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
