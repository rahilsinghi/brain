---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:88e89f0
ingested_at: 2026-04-13T17:05:37.783Z
parsed_at: 2026-04-13T17:05:37.783Z
compiled_to: "[[Great Arc Bezier Tessellation and Geometry Builder for Brain-Explorer Edges]]"
processed_at: 2026-04-13T17:08:09.068Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat(edges): add Great Arc Bezier tessellation and geometry builder

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** 88e89f0
- **Date:** 2026-04-12T20:17:34Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +190
- **Deletions:** -0

Pure-function arc-geometry module: tessellateArc generates quadratic Bezier
points along sphere surface with configurable lift; buildArcGeometryArrays
produces interleaved Float32Arrays (positions + per-vertex gradient colors)
for instanced LineSegments rendering.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
