---
title: "Database Migration: Public Proposals and Tension Score"
author: ai
created_at: 2026-04-10T21:46:07.218Z
last_ai_edit: 2026-04-10T21:46:07.218Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-add-public-proposals-table-and-tension-score-column-815a44.md]]"
tags:
  - database
  - migration
  - supabase
  - realtime
  - feature
  - flock
  - whywall
  - tensionmeter
  - backend
  - datamodel
---

# Database Migration: Public Proposals and Tension Score

This commit introduces significant database enhancements for the Flock project. It adds the `public_proposals` table to facilitate Supabase Realtime INSERT events for the 'Why Wall' feature and a `tension_score` column to the `sessions` table, which drives the 'TensionMeter'. The migration also activates Realtime functionality across all session-related tables.

## Key Concepts

- `public_proposals` table,- `tension_score` column,- `Supabase Realtime`,- `Why Wall` feature,- `TensionMeter` feature,- Database Migrations,- Session Management

## Details

This migration, identified by SHA `01c5991` within the `rahilsinghi/Flock` repository, was committed on `2026-03-21T14:22:31Z` by Rahil Singhi, with contributions from Claude Opus 4.6.

The core changes involve:

*   **`public_proposals` table:** A new table designed to capture and manage public proposals. This table is specifically integrated with **[[Supabase Realtime]]** to allow for instant updates based on `INSERT` events, which are crucial for populating and driving the **[[Why Wall]]** user interface component.
*   **`tension_score` column:** Added to the existing `sessions` table. This column will store numerical data representing a 'tension score' for ongoing sessions, directly feeding into and powering the **[[TensionMeter]]** feature.
*   **Realtime Enablement:** The migration comprehensively enables **[[Supabase Realtime]]** for all tables related to session management. This ensures that changes and interactions within sessions are reflected in real-time across the application.

This commit involved modifications to `1` file, with `+26` lines added and `0` lines deleted, indicating an additive change to the database schema.

## Related

[[Flock Project]],[[Supabase Realtime]],[[Why Wall]],[[TensionMeter]],[[Database Migrations]],[[Session Management]],[[Rahil Singhi]]
