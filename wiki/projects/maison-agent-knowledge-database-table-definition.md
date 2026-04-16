---
title: Maison Agent Knowledge Database Table Definition
author: ai
created_at: 2026-04-15T19:59:31.456Z
last_ai_edit: 2026-04-15T19:59:31.456Z
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

# Maison Agent Knowledge Database Table Definition

This code community is centered around the definition of the `knowledge` table schema within the `maison-agent` project's database. It establishes the foundational structure for how knowledge-related data is stored and managed, underpinning the agent's operational memory and information retrieval capabilities.

## Key Concepts

Knowledge Management,Database Schema,Data Persistence,TypeScript Type Definitions

## Details

This code community consists solely of the file located at `/Users/rahilsinghi/Desktop/maison-agent/packages/database/src/tables/knowledge.ts`. Its primary role is to define the database schema and associated TypeScript types for the `knowledge` table within the [[maison-agent]] project.

### Notable Files and Their Roles:

*   **`packages/database/src/tables/knowledge.ts`**: This file is crucial for establishing the data model for 'knowledge' within the application's database. It dictates the fields, types, and constraints for storing informational assets, which are likely consumed by the broader [[Agent Client Database Definition]] and data persistence layers. Although the static analysis reported '0 connections' and 'no external dependencies' for this specific cluster, this typically indicates that the file primarily serves as a schema or type definition, which is then imported and used by other database interaction modules (e.g., ORMs, query builders) that were not included in this particular cluster's direct connection analysis. Its existence is fundamental for the application's ability to store, retrieve, and manage structured knowledge.

## Related

[[maison-agent]],[[Agent Client Database Definition]],[[Database Schema]],[[Database Layer with PostgreSQL Models and Qdrant Collections for raag]]
