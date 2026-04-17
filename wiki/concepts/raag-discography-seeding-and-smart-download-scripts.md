---
title: Raag Discography Seeding and Smart Download Scripts
author: ai
created_at: 2026-04-10T17:05:00.898Z
last_ai_edit: 2026-04-10T17:05:00.898Z
last_human_edit: null
last_embedded_hash: fb04e4c4dfb68b9a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-add-discography-seeding-and-smart-download-scripts-628943.md]]"
tags:
  - discography
  - seeding
  - download
  - audio
  - scripting
  - raag
  - automation
  - metadata
  - python
  - fuzzy matching
---


# Raag Discography Seeding and Smart Download Scripts

This feature introduces a set of Python scripts for the 'Raag' project to manage music discographies. It automates populating a database with artist metadata, intelligently downloading tracks from YouTube, and organizing existing audio files.

## Key Concepts

Discography Seeding,Smart Audio Download,Metadata Management (Music),Fuzzy Matching (Audio Files),Database Pre-population,Audio File Organization

## Details

The commit `feat: add discography seeding and smart download scripts` (SHA `486d124`) in the `rahilsinghi/raag` repository, authored by Rahil Singhi on March 4, 2026, introduces a critical set of scripts for automated music library management.

### Key Scripts and Functionality:

*   **`seed_discography.py`**: This script is responsible for pre-populating the project's database with comprehensive discography metadata. An initial execution populated the database with the complete discography of the artist Seedhe Maut, encompassing 9 albums and 135 songs.
*   **`smart_download.py`**: Utilizing the rich metadata stored in the database, this script intelligently searches YouTube for each track. Its purpose is to identify and download the most accurate audio files available online.
*   **`reorganize_audio.py`**: This utility streamlines the organization of local audio files. It employs fuzzy matching algorithms to compare existing files with the database entries, subsequently moving and renaming them correctly according to the established metadata structure.

This development involved changes across 4 files, adding a significant 924 lines of code, and was co-authored by Claude Opus 4.6.

## Related

[[Raag (Project)]],[[Seedhe Maut]],[[YouTube]]
