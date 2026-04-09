---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:d231edb
ingested_at: 2026-04-09T04:03:38.429Z
parsed_at: 2026-04-09T04:03:38.429Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
