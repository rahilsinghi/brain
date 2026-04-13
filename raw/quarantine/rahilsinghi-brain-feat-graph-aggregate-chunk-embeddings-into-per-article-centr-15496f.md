---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:47a408d
ingested_at: 2026-04-13T16:05:10.257Z
parsed_at: 2026-04-13T16:05:10.257Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24oymGRehkUuT32GSVz"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:40.585Z
---






# feat(graph): aggregate chunk embeddings into per-article centroids

- **Repo:** rahilsinghi/brain
- **SHA:** 47a408d
- **Date:** 2026-04-10T16:13:22Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +80
- **Deletions:** -0

Adds aggregateEmbeddings() that groups LanceDB chunks by filePath and
element-wise averages their vectors into a single centroid per article.
Skips chunks with empty/missing vectors. 3 tests, all passing.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
