---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:ae8eed5
ingested_at: 2026-04-09T05:03:49.968Z
parsed_at: 2026-04-09T05:03:49.968Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: chat history — conversations API, persistent messages, sidebar UI

- **Repo:** rahilsinghi/raag
- **SHA:** ae8eed5
- **Date:** 2026-03-07T01:10:22Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +887
- **Deletions:** -73

Adds conversations CRUD endpoint, wires chat.py to persist messages
per conversation, ChatSidebar for history navigation, and updates
Zustand store + API client with conversation management.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
