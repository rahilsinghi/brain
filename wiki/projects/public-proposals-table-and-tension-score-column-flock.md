---
title: Public Proposals Table and Tension Score Column (Flock)
author: ai
created_at: 2026-04-12T22:24:36.421Z
last_ai_edit: 2026-04-12T22:24:36.421Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-add-public-proposals-table-and-tension-score-column-815a44.md]]"
tags:
  - flock
  - supabase
  - realtime
  - database
  - migration
  - feature
  - whycloud
  - tensionmeter
---

# Public Proposals Table and Tension Score Column (Flock)

This commit introduces the `public_proposals` table to store data for Supabase Realtime INSERT events, driving the "Why Wall" feature. It also adds a `tension_score` column to sessions to power the "TensionMeter," and enables Realtime functionality across all session-related tables within the [[Flock Project]].

## Key Concepts

[[Supabase Realtime]],Database Migration,Realtime Events,Why Wall,TensionMeter,Session Management

## Details

This feature commit (`01c5991`) to the `rahilsinghi/Flock` repository implements a database migration that adds significant new functionality:

1.  **`public_proposals` table**: This new table is designed to capture and manage `INSERT` events, which are then used by [[Supabase Realtime]] to power the interactive "Why Wall" feature. The "Why Wall" likely displays proposals or contributions in real-time as they are added.
2.  **`tension_score` column**: Added to the existing `sessions` table, this column stores a numerical value representing the 'tension score' of a session. This score is utilized to drive the "TensionMeter" feature, which could be a visual indicator or metric related to user engagement or interaction intensity during a session.
3.  **Realtime Enablement**: The migration also configures all session-related tables to utilize Supabase Realtime. This ensures that any changes, especially `INSERT` events, within these tables can be instantly streamed and reacted to by connected clients, enhancing the dynamic nature of the [[Flock Project]].

## Related

[[Flock Project]],[[Supabase Realtime]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[Audio Layer for Flock Project]],[[Chore: Remove @clerk/nextjs Dependency and Dynamic Agent Labels (Flock)]],[[Chore: Add QR Code for Judges (Flock Project)]]
