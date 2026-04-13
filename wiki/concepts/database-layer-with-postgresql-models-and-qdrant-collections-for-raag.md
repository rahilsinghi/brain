---
title: Database Layer with PostgreSQL Models and Qdrant Collections for raag
author: ai
created_at: 2026-04-13T17:37:50.453Z
last_ai_edit: 2026-04-13T17:37:50.453Z
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
  - raag
  - backend
  - async
---

# Database Layer with PostgreSQL Models and Qdrant Collections for raag

This commit introduces a robust database layer for the `raag` project, featuring eight SQLAlchemy asynchronous ORM models backed by PostgreSQL for structured data storage. It also integrates a `QdrantManager` to handle high-dimensional audio (CLAP) and lyric embeddings, enabling efficient vector similarity search. The setup includes Alembic for managing database migrations and a `TimestampMixin` for automatic record timestamps.

## Key Concepts

SQLAlchemy ORM,PostgreSQL,Qdrant Vector Database,Vector Embeddings (CLAP, Lyrics),Alembic Database Migrations,UUID Primary Keys,Asynchronous Database Operations,TimestampMixin

## Details

This feature commit (`4d5fdda`) by Rahil Singhi, co-authored by Claude Opus 4.6, establishes the foundational database layer for the `raag` project. The implementation includes:

*   **SQLAlchemy Async ORM Models**: Eight distinct models are defined for core entities: `artists`, `albums`, `songs`, `lyrics`, `bars`, `entity_mentions`, `feature_artists`, and `human_corrections`. All models utilize UUIDs as primary keys, ensuring global uniqueness and simplifying distributed system considerations.
*   **QdrantManager**: A dedicated manager (`QdrantManager`) is introduced to handle vector embeddings. It supports 512-dimensional CLAP embeddings for audio data and 384-dimensional embeddings for lyric data, facilitating advanced search and recommendation capabilities based on content similarity.
*   **Alembic Async Migrations**: The database schema is managed using Alembic, configured for asynchronous operations. This allows for controlled evolution of the PostgreSQL database structure from an initial schema.
*   **TimestampMixin**: A `TimestampMixin` is integrated into the ORM models to automatically manage `created_at` and `updated_at` timestamps, providing essential metadata for tracking record lifecycle.

This robust database architecture underpins `raag`'s data storage and retrieval needs, blending traditional relational data management with modern vector search capabilities.

## Related

[[raag]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[Qdrant]],[[SQLAlchemy]],[[Alembic]],[[Audio ML Pipeline with CLAP Embeddings and Librosa Features]],[[UUID Primary Keys]],[[TimestampMixin]],[[Claude Opus 4.6]]
