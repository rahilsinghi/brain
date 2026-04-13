---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:84dc0c2
ingested_at: 2026-04-12T22:03:50.859Z
parsed_at: 2026-04-12T22:03:50.859Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24p1zxfeHZhuRrjxFFT"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:41.109Z
---






# feat: NLP pipeline with topic classification, entity extraction, bar annotation

- **Repo:** rahilsinghi/raag
- **SHA:** 84dc0c2
- **Date:** 2026-03-04T00:16:30Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +317
- **Deletions:** -0

- TopicClassifier using BART zero-shot for 10 primary topics and 11 tags
- EntityExtractor using Claude API for artist mentions, places, cultural
  refs, self-references, and featured artists
- BarAnnotator using Claude API with batching (50 bars/batch), robust
  3-strategy JSON extraction, and copyright-aware prompting

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
