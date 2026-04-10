---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:33b4864
ingested_at: 2026-04-09T23:03:16.539Z
parsed_at: 2026-04-09T23:03:16.539Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2bVX11aq9tSq1BV7T"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:11.447Z
---






# feat(theme): add first-visit theme chooser overlay

- **Repo:** rahilsinghi/portfolio
- **SHA:** 33b4864
- **Date:** 2026-03-25T02:41:36Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +241
- **Deletions:** -0

Full-screen blurred overlay appears after boot screen on first visit.
Two floating cards (Dark/Light) with mini UI previews, scanlines, and
corner brackets bob with offset phases. Selected card scales up, other
fades, overlay exits smoothly. Persists choice via localStorage so it
only shows once. Includes skip option and reduced-motion support.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
