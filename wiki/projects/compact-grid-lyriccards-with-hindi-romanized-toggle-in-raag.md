---
title: Compact Grid LyricCards with Hindi/Romanized Toggle in raag
author: ai
created_at: 2026-04-13T17:27:01.408Z
last_ai_edit: 2026-04-13T17:27:01.408Z
last_human_edit: null
last_embedded_hash: 4d9f110e69a7136f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-compact-grid-lyriccards-with-hindi-romanized-toggle-6bcb0a.md]]"
tags:
  - raag
  - ui
  - lyrics
  - devanagari
  - transliteration
  - frontend
  - feature
  - qdrant
---


# Compact Grid LyricCards with Hindi/Romanized Toggle in raag

This commit introduces significant UI enhancements to the `raag` project, specifically for `LyricCards`. It transforms the display from a full-width list to a compact 2-column grid, featuring smaller padding, 3-line text truncation, and tiny album art for a more efficient layout. A key new feature is the addition of a Devanagari-to-romanized transliteration toggle per card, enabling users to switch between scripts.

## Key Concepts

LyricCards,Devanagari-to-romanized transliteration,Compact UI,Grid Layout,Qdrant Integration,UI/UX Enhancement

## Details

This commit (`746b05e`) by Rahil Singhi, co-authored by Claude Opus 4.6, implemented several user interface and functional improvements for `LyricCards` within the [[raag]] repository.

**Key Features and Changes:**
*   **Compact LyricCards:** The design of `LyricCards` was optimized for density. This included reducing padding, truncating lyric text to three lines, and using smaller album art to allow for more content per screen.
*   **2-Column Grid Layout:** Lyric results are now presented in a responsive 2-column grid instead of the previous full-width list. This improves readability and space utilization.
*   **Devanagari-to-Romanized Toggle:** A new 'Languages' icon button was added to each `LyricCard`, allowing users to toggle the display of Hindi lyrics between Devanagari script and its romanized transliteration. A basic Devanagari transliteration map was implemented to support this functionality.
*   **Qdrant Entry Handling:** The system was updated to skip orphaned [[Qdrant]] entries that display "Unknown" song titles, ensuring cleaner and more relevant search results.

This update involved changes across 3 files, adding 105 lines of code and deleting 56 lines, leading to a more refined and user-friendly experience for browsing lyrics in the [[raag]] application.

## Related

[[raag]],[[Qdrant]],[[Claude Opus 4.6]],[[UI/UX Enhancement]],[[User Interface (UI)]],[[Frontend Development]]
