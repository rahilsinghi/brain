---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:df63e54
ingested_at: 2026-04-12T22:03:50.856Z
parsed_at: 2026-04-12T22:03:50.856Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24pNhf7onXjT7tFhCRA"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:45.950Z
---






# feat: interactive 3D Universe Map at /universe

- **Repo:** rahilsinghi/raag
- **SHA:** df63e54
- **Date:** 2026-03-04T16:20:27Z
- **Author:** Rahil Singhi
- **Files changed:** 14
- **Additions:** +1433
- **Deletions:** -1

- Add ForceGraph3D with custom Three.js node objects (album art, MC
  icosahedrons, topic octahedrons, glowing spheres with label sprites)
- Add NodeDetailPanel floating bubble popup with trivia per node type
- Add UniverseHeader, UniverseControls (view modes), GraphLoadingSkeleton
- Add TimelineView (horizontal scrollable 2017-2025 timeline)
- Add Zustand universe-store with graph state and view modes
- Add graph types (GraphNodeData, GraphEdgeData, GraphDataResponse)
- Add fetchGraphData/refreshGraphData API functions
- Add node/edge color constants and size mappings
- Add Universe nav link to chat page header
- Install react-force-graph-3d + three + @types/three

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
