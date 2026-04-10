---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:c49d036
ingested_at: 2026-04-09T22:03:19.548Z
parsed_at: 2026-04-09T22:03:19.548Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3KimHUbGK3FrJcsTh"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:21.229Z
---






# feat: shared types, Supabase clients, and Realtime subscriptions

- **Repo:** rahilsinghi/Flock
- **SHA:** c49d036
- **Date:** 2026-03-21T14:22:40Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +300
- **Deletions:** -0

types.ts — all shared interfaces (Participant, Session, TripDecision, etc.)
supabase-server.ts — SSR client with cookies + service role client
supabase-client.ts — browser client
realtime/session.ts — subscribeToParticipants, subscribeToSession,
subscribeToProposals with typed mapper functions

These are Aishwarya's deliverables for the frontend build.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
