---
title: Database Layer Implementation (PostgreSQL & Qdrant) for raag
author: ai
created_at: 2026-04-10T22:20:13.937Z
last_ai_edit: 2026-04-10T22:20:13.937Z
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
  - migration
  - vectorstore
  - raag
  - python
  - async
  - feature
---

# Database Layer Implementation (PostgreSQL & Qdrant) for raag

This commit establishes the foundational database layer for the `raag` project, integrating PostgreSQL with SQLAlchemy ORM and Qdrant for vector embeddings. It includes eight asynchronous ORM models with UUID primary keys, a QdrantManager for audio and lyric embeddings, and asynchronous Alembic migrations.

## Key Concepts

SQLAlchemy Asynchronous ORM,PostgreSQL,Qdrant Vector Database,Vector Embeddings (Audio & Lyric),Alembic Database Migrations,UUID Primary Keys,TimestampMixin

## Details

This commit, identified by SHA `4d5fdda` and authored by [[Rahil Singhi]] on `2026-03-04T00:15:52Z`, establishes the foundational database layer for the `[[raag (project)]]`.

**SQLAlchemy ORM Models:** Eight asynchronous SQLAlchemy ORM models were created to manage core application data. These models include: `artists`, `albums`, `songs`, `lyrics`, `bars`, `entity_mentions`, `feature_artists`, and `human_corrections`. All models utilize [[UUID Primary Keys]], ensuring global uniqueness.

**Qdrant Integration:** A `QdrantManager` was implemented to handle [[Vector Embeddings]]. Specifically, it supports 512-dimensional [[CLAP Embeddings]] for audio data and 384-dimensional embeddings for lyric data, enabling efficient similarity searches within the [[Qdrant]] vector database.

**Alembic Migrations:** Asynchronous [[Alembic Database Migrations]] were set up to manage database schema evolution, including the initial schema definition.

**TimestampMixin:** A [[TimestampMixin]] was introduced to automatically manage `created_at` and `updated_at` timestamps for ORM models.

This significant update involved 8 file changes and added 491 lines of code, signifying a major step in the project's data persistence and retrieval capabilities. It was co-authored by [[Claude Opus 4.6]].

## Related

[[Rahil Singhi]],[[raag (project)]],[[SQLAlchemy]],[[PostgreSQL]],[[Qdrant]],[[Alembic]],[[Vector Embeddings]],[[UUID Primary Keys]],[[TimestampMixin]],[[CLAP Embeddings]],[[Asynchronous ORM]],[[Database Migrations]],[[Claude Opus 4.6]]
