---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:de7b168
ingested_at: 2026-04-13T18:05:31.382Z
parsed_at: 2026-04-13T18:05:31.382Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(simulation): add useSimulation React hook

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** de7b168
- **Date:** 2026-04-12T17:05:35Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +99
- **Deletions:** -0

- Wraps force-simulation.ts with React lifecycle via useEffect
- All simulation state in refs to avoid re-renders at 60fps
- Exposes tick, reheat, pin, unpin, restoreDecay as stable callbacks
- Cleanup stops simulation on unmount

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
