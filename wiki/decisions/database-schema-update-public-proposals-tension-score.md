---
title: "Database Schema Update: Public Proposals & Tension Score"
author: ai
created_at: 2026-04-10T17:42:18.831Z
last_ai_edit: 2026-04-10T17:42:18.831Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-add-public-proposals-table-and-tension-score-column-815a44.md]]"
tags:
  - database
  - migration
  - supabase
  - realtime
  - schema
  - public_proposals
  - tension_score
  - sessions
  - why_wall
  - tensionmeter
---

# Database Schema Update: Public Proposals & Tension Score

This update introduces the `public_proposals` table to support Supabase Realtime INSERT events for the Why Wall feature and adds a `tension_score` column to sessions for the TensionMeter. It also enables Realtime capabilities across all session-related tables.

## Key Concepts

- [[Supabase Realtime]],- Database Migration,- `public_proposals` table,- `tension_score` column,- [[Why Wall]],- [[TensionMeter]]

## Details

This commit, identified by SHA `01c5991` from the `rahilsinghi/Flock` repository, introduces significant database schema changes. Executed on 2026-03-21T14:22:31Z by Rahil Singhi, with contributions from Claude Opus 4.6 (1M context), the migration primarily focuses on enhancing real-time data capabilities and supporting new application features.

The key additions include:
*   **`public_proposals` table**: This new table is designed to capture and manage public proposals. It plays a crucial role in driving the [[Why Wall]] feature by utilizing Supabase Realtime INSERT events, allowing for instantaneous updates and display of new proposals.
*   **`tension_score` column**: Added to the existing `sessions` table, this column is intended to store a 'tension score'. This score directly feeds into and drives the functionality of the [[TensionMeter]] feature, providing real-time insights into session dynamics.

Furthermore, this update explicitly enables Supabase Realtime on all session-related tables, ensuring that data changes across these tables are immediately propagated to connected clients. The change involved 1 file modification, adding 26 lines of code with no deletions, indicating a pure schema expansion.

## Related

[[Supabase Realtime]],[[Why Wall]],[[TensionMeter]],[[Flock Project]],[[Rahil Singhi]]
