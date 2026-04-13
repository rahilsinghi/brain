---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:c8f43c9
ingested_at: 2026-04-13T18:05:31.365Z
parsed_at: 2026-04-13T18:05:31.365Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(graph): strip wiki/ prefix from LanceDB paths in embedding aggregation

- **Repo:** rahilsinghi/brain
- **SHA:** c8f43c9
- **Date:** 2026-04-10T16:26:21Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +5
- **Deletions:** -2

LanceDB stores filePaths as wiki/category/slug.md but scan-wiki uses
category/slug.md as node IDs. Normalize in aggregateEmbeddings().

Generated first graph cache: 315 nodes with UMAP 3D positions.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
