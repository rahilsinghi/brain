---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:b1f4151
ingested_at: 2026-04-13T18:05:31.377Z
parsed_at: 2026-04-13T18:05:31.377Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(layout): add useSphereLayout hook, update types for sphere migration

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** b1f4151
- **Date:** 2026-04-12T20:11:03Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +30
- **Deletions:** -22

Removes SimNode interface, ALPHA_MIN constant, and changes DragState
from RELEASING to SNAPPING. Adds useSphereLayout hook that wraps
computeSpherePositions and exposes shared Float32Array buffers for
downstream instanced-mesh consumers.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
