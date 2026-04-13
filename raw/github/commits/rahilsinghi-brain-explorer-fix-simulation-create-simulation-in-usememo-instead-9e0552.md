---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:85b160e
ingested_at: 2026-04-13T18:05:31.379Z
parsed_at: 2026-04-13T18:05:31.379Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(simulation): create simulation in useMemo instead of useEffect

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** 85b160e
- **Date:** 2026-04-12T17:45:42Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +20
- **Deletions:** -12

useEffect runs AFTER render, so children (Edges, InstancedNodes) ran
their useMemos before positionsRef/nodeIndexMap were populated. Edge
geometry was created with all-zero positions and never re-created.

useMemo runs synchronously during render, so refs are populated BEFORE
children render. useEffect retained only for cleanup (simulation.stop).
