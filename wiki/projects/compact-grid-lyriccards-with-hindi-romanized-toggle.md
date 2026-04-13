---
title: Compact Grid LyricCards with Hindi/Romanized Toggle
author: ai
created_at: 2026-04-10T22:15:40.430Z
last_ai_edit: 2026-04-10T22:15:40.430Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-compact-grid-lyriccards-with-hindi-romanized-toggle-6bcb0a.md]]"
tags:
  - raag
  - lyriccards
  - ui
  - grid-layout
  - devanagari
  - romanization
  - multilingual
  - qdrant
  - feature
  - commit
---

# Compact Grid LyricCards with Hindi/Romanized Toggle

This feature introduces a compact design for LyricCards within the `raag` repository, displaying lyric results in a 2-column grid. It also adds crucial functionality to toggle between Devanagari and romanized script for lyrics on each card, enhancing user experience for multilingual content.

## Key Concepts

* Compact UI Design,* Responsive Grid Layout,* Devanagari Transliteration,* Multilingual Display Toggle

## Details

The `feat` commit `746b05e` by Rahil Singhi on `2026-03-04` introduces several significant enhancements to the LyricCards functionality in the `raag` repository:

*   **Compact LyricCard Design**: The visual presentation of LyricCards has been optimized for space efficiency. This includes reduced padding, truncation of lyric text to three lines, and the use of smaller album art.
*   **2-Column Grid Layout**: Lyric search results are now rendered in a responsive 2-column grid format, improving information density and readability compared to the previous full-width list display.
*   **Devanagari/Romanized Toggle**: A new toggle button, indicated by a Languages icon, has been implemented on each LyricCard. This allows users to effortlessly switch between displaying lyrics in Devanagari script and a romanized version. This functionality is supported by a basic Devanagari transliteration map.
*   **Qdrant Entry Handling**: The system now includes logic to skip orphaned Qdrant entries that would otherwise display an "Unknown" song title, improving data quality and user experience.

This commit involved changes across 3 files, with 105 additions and 56 deletions. It was notably co-authored by Claude Opus 4.6.

## Related

[[LyricCards]],[[Devanagari Transliteration]],[[Qdrant]],[[Rahil Singhi]],[[raag (Project)]]
