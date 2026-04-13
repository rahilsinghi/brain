---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:4d5fdda
ingested_at: 2026-04-13T17:05:37.839Z
parsed_at: 2026-04-13T17:05:37.839Z
compiled_to: "[[Database Layer with PostgreSQL Models and Qdrant Collections for raag]]"
processed_at: 2026-04-13T17:37:50.453Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat: database layer with PostgreSQL models and Qdrant collections

- **Repo:** rahilsinghi/raag
- **SHA:** 4d5fdda
- **Date:** 2026-03-04T00:15:52Z
- **Author:** Rahil Singhi
- **Files changed:** 8
- **Additions:** +491
- **Deletions:** -0

- 8 SQLAlchemy async ORM models (artists, albums, songs, lyrics, bars,
  entity_mentions, feature_artists, human_corrections) with UUID PKs
- QdrantManager for audio (512-dim CLAP) and lyric (384-dim) embeddings
- Alembic async migrations with initial schema
- TimestampMixin for created_at/updated_at

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
