---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:2856d95
ingested_at: 2026-04-09T01:03:46.915Z
parsed_at: 2026-04-09T01:03:46.915Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# feat(dashboard): add image upload button + thumbnail to SearchInput

- **Repo:** rahilsinghi/askNYC
- **SHA:** 2856d95
- **Date:** 2026-03-28T14:07:41Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +86
- **Deletions:** -4

Upload photo directly from the search bar via camera icon. Shows
thumbnail preview with clear button when image is attached. Both
SearchInput and CameraFeed upload flows feed the same displayImage.
