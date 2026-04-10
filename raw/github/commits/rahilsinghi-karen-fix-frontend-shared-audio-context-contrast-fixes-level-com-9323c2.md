---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:044955f
ingested_at: 2026-04-10T01:03:40.367Z
parsed_at: 2026-04-10T01:03:40.367Z
compiled_to: "[[fix(frontend): Shared Audio Context, Contrast Fixes, Level Completion Animation]]"
processed_at: 2026-04-10T02:43:40.218Z
retry_count: 0
last_error: null
compile_progress: null
---













# fix(frontend): shared audio context, contrast fixes, level completion animation

- **Repo:** rahilsinghi/karen
- **SHA:** 044955f
- **Date:** 2026-04-04T19:35:40Z
- **Author:** Rahil Singhi
- **Files changed:** 9
- **Additions:** +258
- **Deletions:** -119

- Create EscalationProvider + layout to share escalation/audio state across views
- Switching between standard and game view no longer doubles audio
- Deduplicate audio playback by URL to prevent Karen repeating
- Fix contrast: replace mc-container light panels with dark themed panels
- Add spring-animated checkmark badge on completed levels
- Add loading/isComplete state to useEscalation hook
- Stop aggressive SSE reconnection for completed escalations
- Reset state on escalation ID change to prevent stale data
