---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:37f3379
ingested_at: 2026-04-10T02:04:52.503Z
parsed_at: 2026-04-10T02:04:52.503Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuGirn4XzvVEiXSwSa7w\"}"
compile_progress: null
quarantined_at: 2026-04-10T02:05:43.489Z
---






# docs: add device deploy guide, transport notes, and macro trust fix to CLAUDE.md

- **Repo:** rahilsinghi/MarkPush
- **SHA:** 37f3379
- **Date:** 2026-03-24T15:35:07Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +87
- **Deletions:** -8

- Full iOS build-to-device walkthrough (xcode-select, xcodegen, signing, trust)
- Document macro trust reset after xcodegen regeneration (4 TCA macros)
- Add WiFi vs Cloud transport notes (mDNS requires foreground app)
- Add Node.js pairing/push commands for environments without Go CLI
- Update MCP server version and install commands (global vs project-scoped)
- Update current status with iPhone 16 Pro Max deploy and Claude Code MCP

Made-with: Cursor
