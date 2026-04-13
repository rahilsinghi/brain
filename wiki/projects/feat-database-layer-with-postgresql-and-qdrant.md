---
title: "feat: Database Layer with PostgreSQL and Qdrant"
author: ai
created_at: 2026-04-10T17:30:47.299Z
last_ai_edit: 2026-04-10T17:30:47.299Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-database-layer-with-postgresql-models-and-qdrant-collecti-3dba28.md]]"
tags:
  - database
  - postgresql
  - qdrant
  - sqlalchemy
  - orm
  - embeddings
  - alembic
  - uuid
  - rag
  - commit
  - backend
---

# feat: Database Layer with PostgreSQL and Qdrant

This commit introduces the foundational database layer for the `raag` project, integrating PostgreSQL via SQLAlchemy ORM for structured data and Qdrant for efficient storage and retrieval of audio and lyric vector embeddings. It establishes eight asynchronous ORM models with UUID primary keys and implements async migrations using Alembic.

## Key Concepts

- [[SQLAlchemy]] async ORM,- [[PostgreSQL]],- [[Qdrant]] vector database,- Vector Embeddings (CLAP, general lyric embeddings),- [[Alembic]] for database migrations,- [[UUID]] primary keys,- TimestampMixin for automatic `created_at`/`updated_at`

## Details

This commit (`4d5fdda`) by Rahil Singhi on 2026-03-04 marks a significant step in the `raag` project, laying down the core database infrastructure. It involved changes to 8 files, adding 491 lines of code.

The implementation features:

*   **SQLAlchemy Async ORM Models**: Eight distinct models are defined to manage various aspects of musical data: `artists`, `albums`, `songs`, `lyrics`, `bars`, `entity_mentions`, `feature_artists`, and `human_corrections`. All models utilize UUIDs as primary keys for distributed and unique identification.
*   **QdrantManager**: A dedicated manager is introduced for handling vector embeddings. It supports:
    *   Audio embeddings with a 512-dimensional CLAP model.
    *   Lyric embeddings with a 384-dimensional representation.
*   **Alembic Async Migrations**: The database schema is managed using Alembic, configured for asynchronous operations, including an initial schema setup.
*   **TimestampMixin**: A `TimestampMixin` is incorporated into models to automatically handle `created_at` and `updated_at` fields, simplifying record metadata management.

This work was co-authored by Claude Opus 4.6.

## Related

[[raag Project]],[[Database Architecture]],[[Vector Databases]],[[Object-Relational Mapping (ORM)]],[[Asynchronous Programming]],[[SQLAlchemy]],[[PostgreSQL]],[[Qdrant]],[[Alembic]],[[Rahil Singhi]]
