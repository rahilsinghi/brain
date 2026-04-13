---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:b912bcf
ingested_at: 2026-04-13T00:04:30.906Z
parsed_at: 2026-04-13T00:04:30.906Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24enSdUtt99MvThaEpL"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:35.855Z
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
