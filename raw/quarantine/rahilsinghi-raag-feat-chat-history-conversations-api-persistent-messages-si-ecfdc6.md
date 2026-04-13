---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:ae8eed5
ingested_at: 2026-04-13T16:05:10.312Z
parsed_at: 2026-04-13T16:05:10.312Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24efXAA4LJMMq6J8e2K"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:34.230Z
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
