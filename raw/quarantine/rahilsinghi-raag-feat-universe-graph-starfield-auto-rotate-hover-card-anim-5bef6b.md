---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:d231edb
ingested_at: 2026-04-09T22:03:19.553Z
parsed_at: 2026-04-09T22:03:19.553Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM5Hfnq7dqppDbpZgPq"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:47.921Z
---






# feat: universe graph — starfield, auto-rotate, hover card, animated side panel

- **Repo:** rahilsinghi/raag
- **SHA:** d231edb
- **Date:** 2026-03-15T23:35:41Z
- **Author:** Rahil Singhi
- **Files changed:** 5
- **Additions:** +336
- **Deletions:** -77

Phase 4 universe enhancements:
- Add 2000-star particle starfield background sphere in THREE.js scene
- Enable auto-rotate (0.3 speed) when camera is idle
- Add NodeHoverCard: floating glass card at bottom-center showing
  node type, name, BPM, energy, year on hover
- Replace CSS slide animation with framer-motion on GraphSidePanel
  (smooth slide-in/out with AnimatePresence)
- Enhance GraphLoadingSkeleton: animated constellation with connecting
  lines, pulsing center node, waveform loading indicator
