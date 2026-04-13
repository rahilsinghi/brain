---
title: Database Layer with PostgreSQL and Qdrant (Raag Project)
author: ai
created_at: 2026-04-12T18:01:47.594Z
last_ai_edit: 2026-04-12T18:01:47.594Z
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
  - audio
  - lyrics
  - raag
  - backend
---

# Database Layer with PostgreSQL and Qdrant (Raag Project)

This feature establishes a robust database layer for the [[raag]] project, integrating PostgreSQL with SQLAlchemy ORM for structured data and Qdrant for efficient vector embeddings. It provides foundational data storage for musical content, including artists, albums, songs, and lyrics, along with a migration system.

## Key Concepts

PostgreSQL,SQLAlchemy ORM,Qdrant,Vector Embeddings,CLAP Embeddings,Alembic Migrations,UUID Primary Keys,TimestampMixin

## Details

The `rahilsinghi/raag` project implements a comprehensive database layer designed to manage musical content and related data. This foundational update, introduced in commit `4d5fdda`, leverages:
*   **PostgreSQL with SQLAlchemy Async ORM**: Eight distinct SQLAlchemy ORM models (`artists`, `albums`, `songs`, `lyrics`, `bars`, `entity_mentions`, `feature_artists`, `human_corrections`) are defined. Each model utilizes Universally Unique Identifiers (UUIDs) as primary keys, ensuring global uniqueness and simplifying distributed system considerations.
*   **Qdrant Vector Database**: Qdrant is integrated for handling high-dimensional vector embeddings, crucial for similarity search functionalities.
    *   **Audio Embeddings**: Audio data is represented using 512-dimensional CLAP (Contrastive Language-Audio Pretraining) embeddings.
    *   **Lyric Embeddings**: Lyric content is processed into 384-dimensional vector embeddings.
*   **Alembic Migrations**: Asynchronous Alembic scripts are included to manage database schema evolution, providing an initial schema setup and facilitating future updates.
*   **TimestampMixin**: A `TimestampMixin` is implemented to automatically add `created_at` and `updated_at` fields to database records, ensuring proper data provenance and auditing.

This database architecture provides a scalable and efficient backbone for the [[raag]] project, supporting complex queries and advanced AI-driven content analysis.

## Related

[[raag]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[CLAP Encoder Compatibility and Lyrics Ingestion in raag]],[[Claude-powered Word-Level Rhyme Annotator for Raag]]
