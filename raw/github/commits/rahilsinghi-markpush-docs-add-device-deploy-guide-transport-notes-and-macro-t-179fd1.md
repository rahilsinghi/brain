---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:37f3379
ingested_at: 2026-04-10T08:03:40.145Z
parsed_at: 2026-04-10T08:03:40.145Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2HzEmGb85CoWBW7Y7"}
compile_progress: null
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
