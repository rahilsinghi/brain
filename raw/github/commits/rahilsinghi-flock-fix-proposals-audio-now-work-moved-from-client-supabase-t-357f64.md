---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:6ad5aa1
ingested_at: 2026-04-10T09:03:48.671Z
parsed_at: 2026-04-10T09:03:48.671Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcuxcYY6zFaeWrRnbi"}
compile_progress: null
---



# fix: proposals + audio now work — moved from client Supabase to API

- **Repo:** rahilsinghi/Flock
- **SHA:** 6ad5aa1
- **Date:** 2026-03-21T19:31:09Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +90
- **Deletions:** -47

ROOT CAUSE #2: Proposals were fetched via client-side Supabase (anon key)
which was blocked by RLS. Why Wall showed empty, speech bubbles never
fired, audio never triggered.

FIX:
- Participants API now returns proposals in the same response
- Host page gets proposals from API (server-side, service role key)
- All client-side Supabase imports removed from host page
- Speech bubbles, sound effects, and ElevenLabs voice now trigger
  correctly when new proposals arrive

Also added:
- CyclingInsights component during consensus wait — cycles through
  proposal quotes and loading messages every 3s with fade animation
  so the screen is never stale during the 30-60s mediator run

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
