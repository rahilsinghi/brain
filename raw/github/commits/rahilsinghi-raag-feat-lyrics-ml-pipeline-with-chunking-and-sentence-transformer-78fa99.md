---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:a0a08c8
ingested_at: 2026-04-10T10:04:00.853Z
parsed_at: 2026-04-10T10:04:00.853Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3J5gF2NjssoLyyZWdN"}
compile_progress: null
---



# feat: lyrics ML pipeline with chunking and sentence-transformer embeddings

- **Repo:** rahilsinghi/raag
- **SHA:** a0a08c8
- **Date:** 2026-03-04T00:16:21Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +259
- **Deletions:** -0

- LyricsChunker: 3-level chunking (full_song, section, bar) with MC
  normalization and Genius artifact cleaning
- LyricsEmbedder singleton using paraphrase-multilingual-MiniLM-L12-v2
  for 384-dim embeddings with batch encoding support

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
