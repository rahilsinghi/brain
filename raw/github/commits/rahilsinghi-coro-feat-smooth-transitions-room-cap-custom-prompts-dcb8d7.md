---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:f9a2c7d
ingested_at: 2026-04-13T17:05:37.846Z
parsed_at: 2026-04-13T17:05:37.846Z
compiled_to: "[[Coro Enhancements: Smooth Transitions, Room Cap, and Custom Prompts]]"
processed_at: 2026-04-13T17:42:15.143Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat: smooth transitions, room cap, custom prompts

- **Repo:** rahilsinghi/Coro
- **SHA:** f9a2c7d
- **Date:** 2026-02-28T18:00:25Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +123
- **Deletions:** -5

- lyria_service.py: BPM clamped ±10/tick for gradual ramping
- gemini_service.py: continuity rules (≥60% overlap, DJ crossfade), custom_prompt passthrough
- room_service.py: 10-user room cap, clear stale inputs after tick
- PRD_V2.md: task distribution for Bharath + Sariya
