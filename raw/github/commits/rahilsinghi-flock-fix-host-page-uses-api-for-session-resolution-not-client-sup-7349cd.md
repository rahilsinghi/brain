---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:26ae077
ingested_at: 2026-04-10T09:03:48.672Z
parsed_at: 2026-04-10T09:03:48.672Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcbeHXmZyi9QX981S4"}
compile_progress: null
---



# fix: host page uses API for session resolution (not client Supabase)

- **Repo:** rahilsinghi/Flock
- **SHA:** 26ae077
- **Date:** 2026-03-21T19:15:04Z
- **Author:** Rahil Singhi
- **Files changed:** 5
- **Additions:** +38
- **Deletions:** -23

ROOT CAUSE: Host page was stuck on "Waiting for travelers" because it
used client-side Supabase (anon key) to resolve room code → session ID.
The sessions table has RLS that blocks anon reads, so sessionId stayed
null and polling never started.

FIX:
- Participants API now accepts ?roomCode= parameter (resolves server-side
  with service role key)
- API also returns cities for sphere (no client Supabase needed at all)
- Host page polls immediately using roomCode, captures sessionId from
  API response
- Removed all client-side Supabase imports from host page
- Polling starts on mount, not waiting for sessionId

This fixes the #1 demo-blocking bug: host screen now shows participants
as they join, updates round state, and renders the sphere.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
