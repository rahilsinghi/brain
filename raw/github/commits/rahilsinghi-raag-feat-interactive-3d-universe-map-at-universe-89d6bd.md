---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:df63e54
ingested_at: 2026-04-10T10:04:00.849Z
parsed_at: 2026-04-10T10:04:00.849Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3Jdo2nnkQy9gb5AQaq"}
compile_progress: null
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
