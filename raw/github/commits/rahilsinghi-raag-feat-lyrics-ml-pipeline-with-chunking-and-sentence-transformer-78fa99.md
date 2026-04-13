---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:a0a08c8
ingested_at: 2026-04-13T17:05:37.839Z
parsed_at: 2026-04-13T17:05:37.839Z
compiled_to: "[[Lyrics ML Pipeline: Chunking and Sentence-Transformer Embeddings]]"
processed_at: 2026-04-13T17:40:24.649Z
retry_count: 0
last_error: null
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
