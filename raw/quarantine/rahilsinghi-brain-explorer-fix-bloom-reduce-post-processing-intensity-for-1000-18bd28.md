---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:d5be95b
ingested_at: 2026-04-13T16:05:10.273Z
parsed_at: 2026-04-13T16:05:10.273Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24fZSpR1YpNW8nzxdpb"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:46.375Z
---







# fix(bloom): reduce post-processing intensity for 1000+ node graphs

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** d5be95b
- **Date:** 2026-04-13T01:56:36Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +3
- **Deletions:** -3

Bloom at intensity=0.6 caused white blowout with 1200+ code nodes
using toneMapped=false transmission materials. Reduced to 0.08 with
threshold 0.92 to preserve glass aesthetic without overwhelming glow.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
