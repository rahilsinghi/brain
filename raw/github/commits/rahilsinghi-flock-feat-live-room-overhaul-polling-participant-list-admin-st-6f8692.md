---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:2098ccc
ingested_at: 2026-04-09T04:03:38.420Z
parsed_at: 2026-04-09T04:03:38.420Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: live room overhaul — polling, participant list, admin start control

- **Repo:** rahilsinghi/Flock
- **SHA:** 2098ccc
- **Date:** 2026-03-21T17:17:07Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +411
- **Deletions:** -202

Core changes:
- Remove auto-advance on join. Admin now controls when Round 1 starts
  via "Start Round 1" button on /admin page.
- New POST /api/session/start — validates 2+ participants, starts Round 1
- New GET /api/session/participants — returns session state + participant
  list (used for polling by all views)

Phone page (/room/[code]):
- Lobby shows live participant list with colored dots + names
- Polls /api/session/participants every 2s
- Shows "The host will start Round 1 when everyone is ready"
- Between rounds: shows who's ready vs still working

Host page (/room/[code]/host):
- Added 3s polling fallback alongside Realtime subscriptions
- Participants and session state update reliably

Admin page (/admin):
- Shows live participant count per session (polls every 2s)
- Each participant shown with color dot + name + status
- "Start Round 1 (N joined)" button — disabled until 2+ joined
- Session status badge (Lobby / Round N / Complete)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
