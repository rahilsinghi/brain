---
title: Discography Seeding and Smart Download Scripts for raag
author: ai
created_at: 2026-04-13T17:07:08.895Z
last_ai_edit: 2026-04-13T17:07:08.895Z
last_human_edit: null
last_embedded_hash: 1336809576ef3b94
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-add-discography-seeding-and-smart-download-scripts-628943.md]]"
tags:
  - raag
  - discography
  - audio
  - youtube
  - download
  - python
  - database
  - automation
---


# Discography Seeding and Smart Download Scripts for raag

This commit introduces scripts to seed the `raag` project's database with a complete discography, specifically for Seedhe Maut. It includes a smart download script that uses this metadata to find and download accurate YouTube tracks, and an audio reorganization script for fuzzy-matching existing files.

## Key Concepts

Discography seeding,Smart download scripts,YouTube audio download,Audio file reorganization,Fuzzy matching,Database pre-population

## Details

This enhancement to the `[[raag]]` project, identified by commit `486d124`, introduces a set of scripts designed to manage audio content efficiently:

*   `seed_discography.py`: This script is responsible for pre-populating the database with comprehensive discography metadata. Initially, it was used to seed the full discography of *Seedhe Maut*, including 9 albums and 135 songs.
*   `smart_download.py`: Leveraging the metadata stored in the database, this script searches YouTube on a per-track basis to identify and download accurate audio files.
*   `reorganize_audio.py`: This utility performs fuzzy matching between existing local audio files and the database entries, subsequently moving and organizing them correctly based on the seeded metadata.

**Commit Details:**
*   **Repository:** `rahilsinghi/raag`
*   **SHA:** `486d124`
*   **Date:** `2026-03-04T00:54:32Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 4
*   **Additions:** +924 lines
*   **Deletions:** -0 lines
*   **Co-Authored-By:** Claude Opus 4.6

## Related

[[raag]],[[Audio Integration in Karen Project]],[[API: POST /ingest Route for Fire-and-Forget Ingestion]]
