---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:01c5991
ingested_at: 2026-04-09T22:03:19.548Z
parsed_at: 2026-04-09T22:03:19.548Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM6NXX3VFjmyFwKr5Ne"}
compile_progress: null
quarantined_at: 2026-04-10T03:03:02.576Z
---






# feat: add public_proposals table and tension_score column

- **Repo:** rahilsinghi/Flock
- **SHA:** 01c5991
- **Date:** 2026-03-21T14:22:31Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +26
- **Deletions:** -0

Migration adds public_proposals for Supabase Realtime INSERT events
(drives the Why Wall), tension_score on sessions (drives TensionMeter),
and enables Realtime on all session-related tables.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
