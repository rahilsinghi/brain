---
title: Compact Grid LyricCards with Hindi/Romanized Toggle (raag)
author: ai
created_at: 2026-04-12T17:48:31.499Z
last_ai_edit: 2026-04-12T17:48:31.499Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-compact-grid-lyriccards-with-hindi-romanized-toggle-6bcb0a.md]]"
tags:
  - raag
  - frontend
  - ui
  - lyrics
  - internationalization
  - devanagari
  - qdrant
---

# Compact Grid LyricCards with Hindi/Romanized Toggle (raag)

This feature introduces a more compact display for LyricCards within the [[raag]] project, arranging them in a 2-column grid. It includes a toggle button to switch between Devanagari and romanized Hindi lyrics, along with improvements to skip 'Unknown' song titles from Qdrant entries.

## Key Concepts

LyricCards,Hindi/Romanized Toggle,Devanagari Transliteration,[[Qdrant]] Integration

## Details

Implemented as part of the `rahilsinghi/raag` project, this feature refines the display and functionality of LyricCards. Key changes include:

*   **Compact Design**: LyricCards now feature smaller padding, 3-line text truncation for brevity, and tiny album art to optimize screen real estate.
*   **Grid Layout**: Lyric results are rendered in a 2-column grid, moving away from a full-width list to improve readability and visual organization.
*   **Language Toggle**: A Devanagari-to-romanized toggle button, indicated by a 'Languages' icon, has been added to each card, allowing users to switch between scripts.
*   **Data Handling Improvement**: The system now skips orphaned [[Qdrant]] entries that display 'Unknown' song titles, ensuring cleaner data presentation.
*   **Transliteration**: Basic Devanagari transliteration mapping is provided to enable the romanized display of lyrics.

This commit (SHA: 746b05e) was authored by Rahil Singhi and co-authored by [[Claude Opus 4.6]].

## Related

[[raag]],[[Compact Grid LyricCards with Hindi/Romanized Toggle]],[[Compact LyricCards with Hindi/Romanized Toggle]],[[Claude Opus]]
