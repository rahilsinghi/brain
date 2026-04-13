---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:c8f43c9
ingested_at: 2026-04-13T16:05:10.255Z
parsed_at: 2026-04-13T16:05:10.255Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24pRETZf51AQNYmgSLv"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:46.545Z
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
