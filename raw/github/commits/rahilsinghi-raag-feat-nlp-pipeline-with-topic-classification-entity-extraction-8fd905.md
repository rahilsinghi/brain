---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:84dc0c2
ingested_at: 2026-04-13T17:05:37.839Z
parsed_at: 2026-04-13T17:05:37.839Z
compiled_to: "[[NLP Pipeline: Topic Classification, Entity Extraction, and Bar Annotation in Raag]]"
processed_at: 2026-04-13T17:33:40.217Z
retry_count: 0
last_error: null
compile_progress: null
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
