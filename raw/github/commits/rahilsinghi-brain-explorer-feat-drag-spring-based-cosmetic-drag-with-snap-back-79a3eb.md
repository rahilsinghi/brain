---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:59754cd
ingested_at: 2026-04-13T17:05:37.781Z
parsed_at: 2026-04-13T17:05:37.781Z
compiled_to: "[[Spring-Based Cosmetic Drag with Snap-Back in Brain-Explorer]]"
processed_at: 2026-04-13T17:11:11.170Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat(drag): spring-based cosmetic drag with snap-back

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** 59754cd
- **Date:** 2026-04-12T20:26:31Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +90
- **Deletions:** -42

Replace d3-force simulation reheat/pin/unpin drag with direct position
writes during drag and spring-animated snap-back to rest positions on
release. State machine: IDLE → DRAGGING → SNAPPING → IDLE.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
