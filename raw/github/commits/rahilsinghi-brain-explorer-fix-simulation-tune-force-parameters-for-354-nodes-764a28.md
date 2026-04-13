---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:b912bcf
ingested_at: 2026-04-13T18:05:31.379Z
parsed_at: 2026-04-13T18:05:31.379Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(simulation): tune force parameters for 354 nodes — prevent camera-exceeding explosion

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** b912bcf
- **Date:** 2026-04-12T17:41:14Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +11
- **Deletions:** -4

charge: -30 → -3 (weak repulsion, prevents O(n²) explosion)
center: 0.01 → 0.3 (strong containment within camera frustum)
velocityDecay: 0.4 → 0.75 (high damping prevents overshoot)
alpha: 1.0 → 0.15 (low initial energy, peak radius ~68 vs ~828)
linkDistance: 15 → 12 (tighter connected clusters)
