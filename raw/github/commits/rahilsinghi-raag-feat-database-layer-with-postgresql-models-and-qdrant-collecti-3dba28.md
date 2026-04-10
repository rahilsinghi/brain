---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:4d5fdda
ingested_at: 2026-04-10T04:04:34.948Z
parsed_at: 2026-04-10T04:04:34.948Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRoh2s1rKr8DvLuAEJ1"}
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
