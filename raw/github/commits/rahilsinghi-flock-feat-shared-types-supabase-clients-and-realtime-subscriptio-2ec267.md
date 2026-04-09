---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:c49d036
ingested_at: 2026-04-09T04:03:38.427Z
parsed_at: 2026-04-09T04:03:38.427Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
