---
title: Compact LyricCards with Hindi/Romanized Toggle
author: ai
created_at: 2026-04-10T17:25:38.364Z
last_ai_edit: 2026-04-10T17:25:38.364Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-compact-grid-lyriccards-with-hindi-romanized-toggle-6bcb0a.md]]"
tags:
  - lyriccards
  - ui
  - hindi
  - romanization
  - devanagari
  - grid-layout
  - raag
  - qdrant
  - frontend
  - feature
---

# Compact LyricCards with Hindi/Romanized Toggle

This update introduces significant UI improvements for LyricCards within the `raag` repository, making them more compact and displaying results in a grid layout. A key new feature allows users to toggle between Devanagari and romanized Hindi lyrics directly on each card.

## Key Concepts

Compact UI,Grid Layout,LyricCard,Devanagari Transliteration,Romanization,Qdrant (data handling)

## Details

- **Repository:** `rahilsinghi/raag`
- **Commit SHA:** `746b05e`
- **Date:** March 4, 2026, 01:58:20 UTC
- **Author:** Rahil Singhi (Co-Authored-By: Claude Opus 4.6)
- **File Changes:** 3 files changed (+105 additions, -56 deletions)

### Key Features and Improvements:

*   **Compact LyricCard Design:**
    *   Reduced padding for a more condensed look.
    *   Lyric text is now truncated to 3 lines.
    *   Album art size has been minimized.
*   **Two-Column Grid Layout:**
    *   Lyric search results are rendered in a 2-column grid, replacing the previous full-width list display.
*   **Devanagari-to-Romanized Toggle:**
    *   A new toggle button (represented by a "Languages icon") has been added to each LyricCard.
    *   This allows users to switch between viewing Hindi lyrics in Devanagari script and their romanized transliteration.
    *   Includes a basic Devanagari transliteration map to facilitate accurate romanized display.
*   **Improved Data Handling:**
    *   Logic has been implemented to skip orphaned Qdrant entries that display an "Unknown" song title, enhancing data integrity and user experience.

## Related

[[LyricCard]],[[Raag Project]],[[Devanagari Transliteration]],[[Qdrant]],[[User Interface Design]]
