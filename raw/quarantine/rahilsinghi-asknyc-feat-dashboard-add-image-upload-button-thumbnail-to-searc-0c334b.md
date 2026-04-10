---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:2856d95
ingested_at: 2026-04-10T02:04:52.499Z
parsed_at: 2026-04-10T02:04:52.499Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM4wdnArmHN2LqsK2eS"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:43.211Z
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
