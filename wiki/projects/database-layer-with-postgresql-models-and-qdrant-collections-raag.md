---
title: Database Layer with PostgreSQL Models and Qdrant Collections (raag)
author: ai
created_at: 2026-04-12T22:02:36.541Z
last_ai_edit: 2026-04-12T22:02:36.541Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-database-layer-with-postgresql-models-and-qdrant-collecti-3dba28.md]]"
tags:
  - database
  - postgresql
  - qdrant
  - sqlalchemy
  - alembic
  - embeddings
  - vector database
  - async
  - orm
  - raag
---

# Database Layer with PostgreSQL Models and Qdrant Collections (raag)

This commit establishes a robust and scalable database layer for the `raag` project, integrating PostgreSQL with asynchronous SQLAlchemy ORM models and Qdrant for managing vector embeddings. It includes 8 distinct ORM models for musical data, a `QdrantManager` for audio and lyric embeddings, and asynchronous Alembic migrations for schema management.

## Key Concepts

PostgreSQL,SQLAlchemy ORM,Qdrant,Vector Embeddings,Alembic Migrations,Asynchronous Database Operations,UUID Primary Keys,TimestampMixin

## Details

This feature commit (`4d5fdda`) by Rahil Singhi (co-authored by Claude Opus 4.6) for the `rahilsinghi/raag` repository introduces the foundational database layer. The implementation details include:

*   **SQLAlchemy Async ORM Models**: Eight new asynchronous SQLAlchemy ORM models were created to structure the musical data. These models include `artists`, `albums`, `songs`, `lyrics`, `bars`, `entity_mentions`, `feature_artists`, and `human_corrections`. All models are designed with UUIDs as their primary keys, ensuring global uniqueness and simplifying distributed system integration.
*   **QdrantManager**: A specialized manager for Qdrant vector collections is included. It handles both 512-dimensional CLAP (Contrastive Language-Audio Pretraining) audio embeddings and 384-dimensional lyric embeddings, facilitating efficient similarity searches and retrieval of media content.
*   **Alembic Async Migrations**: Initial asynchronous migration scripts using Alembic are provided to set up the database schema, ensuring version control and easy evolution of the database structure.
*   **TimestampMixin**: A `TimestampMixin` is implemented to automatically manage `created_at` and `updated_at` fields for database records, providing essential auditing and data tracking capabilities.

This database architecture provides a solid and flexible backbone for `raag`'s data management, supporting both relational and vector data types critical for its functionalities.

## Related

[[raag]],[[CLAP Encoder Compatibility and Lyrics Ingestion in raag]],[[Claude API Rate Limit Retry with Backoff in raag]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[PostgreSQL]],[[Qdrant]],[[SQLAlchemy]],[[Alembic]],[[Vector Embeddings]]
