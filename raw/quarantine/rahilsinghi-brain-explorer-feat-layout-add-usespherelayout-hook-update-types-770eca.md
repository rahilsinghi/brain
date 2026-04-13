---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:b1f4151
ingested_at: 2026-04-13T00:04:30.902Z
parsed_at: 2026-04-13T00:04:30.902Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24c5GaVgzgZw6qVQigc"}
compile_progress: null
quarantined_at: 2026-04-13T16:10:59.090Z
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
