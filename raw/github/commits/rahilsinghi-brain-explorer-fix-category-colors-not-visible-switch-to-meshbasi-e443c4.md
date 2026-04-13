---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:47d0cf0
ingested_at: 2026-04-13T17:05:37.784Z
parsed_at: 2026-04-13T17:05:37.784Z
compiled_to: "[[Brain-Explorer: Fix Category Colors Washed Out by Emissive Material]]"
processed_at: 2026-04-13T17:36:24.880Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix: category colors not visible — switch to MeshBasicMaterial with boosted instance colors

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** 47d0cf0
- **Date:** 2026-04-10T18:45:25Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +12
- **Deletions:** -9

instanceColor in Three.js multiplies with material.color, NOT material.emissive.
The white emissive at 1.5 intensity was washing out all category colors to pure white.

Fix: MeshBasicMaterial (no lighting needed for self-glowing nodes) with category
colors boosted by 1.6x so bloom picks them up. Lower bloom intensity to 1.8 and
threshold to 0.4 to match the new color pipeline.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
