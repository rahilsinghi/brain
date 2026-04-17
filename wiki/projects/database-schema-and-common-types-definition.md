---
title: Database Schema and Common Types Definition
author: ai
created_at: 2026-04-17T03:29:49.379Z
last_ai_edit: 2026-04-17T03:29:49.379Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-185.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 185
---

# Database Schema and Common Types Definition

This code community defines foundational database schema elements and common types used across the maison-agent quality service. It provides base structures that other database modules can extend or reference.

## Key Concepts

- Database schema foundation
- Type definitions for database entities
- Common interface declarations
- Base table structure definitions

## Details

The cluster contains a single file `common.ts` located in the quality service's database directory. This file appears to serve as a central location for defining:

- Reusable type aliases for database operations
- Base interfaces that other table definitions might extend
- Common field definitions shared across multiple database tables
- Foundation schema elements used throughout the quality service

As the 'common' file in the database directory, it likely contains:

- Base ID and timestamp field definitions
- Common validation constraints
- Shared type definitions for quality metrics
- Foundation interfaces for database records

This file would be referenced by other table definition files in the same directory to maintain consistency across the database schema.

## Related

[[maison-agent]], [[Database Layer with PostgreSQL Models and Qdrant Collections for raag]], [[Database Schema Validation Utility]]
