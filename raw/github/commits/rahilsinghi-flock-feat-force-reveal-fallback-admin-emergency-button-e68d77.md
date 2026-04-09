---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:8996f38
ingested_at: 2026-04-09T04:03:38.413Z
parsed_at: 2026-04-09T04:03:38.413Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: force-reveal fallback + admin emergency button

- **Repo:** rahilsinghi/Flock
- **SHA:** 8996f38
- **Date:** 2026-03-21T19:48:49Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +109
- **Deletions:** -4

POST /api/session/force-reveal:
- Pre-built Lisbon trip decision with real hotel photo
- 5-day itinerary: Alfama, Mercado, Sintra, Comporta, LX Factory
- Auto-generates personalized user cards from session participants
- Each card gets: match %, won items, traded items, surprise line
- Writes trip_decision to session → host page polls and shows reveal

Admin page:
- "Force Reveal" amber button appears when session is negotiating
  or complete (fallback for when mediator fails to call finalize_trip)
- One click → pre-built trip decision → reveal animation triggers

This ensures the demo ALWAYS has a reveal, even if the mediator
times out or fails to use the finalize_trip tool.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
