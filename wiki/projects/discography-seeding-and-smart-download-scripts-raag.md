---
title: Discography Seeding and Smart Download Scripts (raag)
author: ai
created_at: 2026-04-10T02:08:37.499Z
last_ai_edit: 2026-04-10T02:08:37.499Z
last_human_edit: null
last_embedded_hash: 97cbf2af12f77cb9
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-add-discography-seeding-and-smart-download-scripts-628943.md]]"
tags:
  - raag
  - discography
  - seeding
  - youtube
  - download
  - fuzzy-matching
  - seedhe-maut
  - music
  - python
  - automation
  - database
---


# Discography Seeding and Smart Download Scripts (raag)

This commit introduces a suite of scripts to the raag project that automate the population, downloading, and organization of music metadata. The `seed_discography.py` script pre-populates a database with the full Seedhe Maut discography (9 albums, 135 songs), while `smart_download.py` and `reorganize_audio.py` leverage that metadata for accurate YouTube downloads and file organization respectively.

## Key Concepts

- **Discography Seeding:** Pre-populating a database with structured music metadata (albums, tracks) to serve as a source of truth for downstream operations
- **Smart Downloading:** Using database metadata to perform targeted, per-track YouTube searches rather than relying on manual or fuzzy queries
- **Fuzzy File Matching:** Algorithmically matching existing audio files to database entries using approximate string matching to enable correct file reorganization
- **Database-Driven Automation:** Using a local DB as the coordination layer between metadata, downloading, and file management scripts

## Details

## Overview

Commit `486d124` to the `rahilsinghi/raag` repository adds 924 lines across 4 new files, establishing a data-driven pipeline for managing a local music library centered on the Seedhe Maut discography.

## Scripts Added

### `seed_discography.py`
Pre-populates the application database with the complete Seedhe Maut discography:
- **9 albums** with associated metadata
- **135 songs** with per-track details
- Serves as the canonical data source for all other scripts in the pipeline

### `smart_download.py`
- Reads track metadata from the database
- Performs per-track YouTube searches to find accurate matches
- Downloads audio in an organized, metadata-aware manner
- Avoids the inaccuracies of bulk or playlist-based downloads

### `reorganize_audio.py`
- Scans existing audio files on disk
- Uses fuzzy matching to associate files with their corresponding database entries
- Moves and renames files to match the expected library structure

## Commit Details

| Field | Value |
|---|---|
| Repository | rahilsinghi/raag |
| SHA | 486d124 |
| Date | 2026-03-04 |
| Author | Rahil Singhi |
| Co-Author | Claude Opus 4.6 |
| Files Changed | 4 |
| Additions | +924 |
| Deletions | 0 |

## Notes
This commit was co-authored with Claude Opus 4.6, indicating AI-assisted development.

## Related

- [[raag Project]]
- [[Seedhe Maut Discography]]
- [[YouTube Audio Downloading]]
- [[Fuzzy String Matching]]
- [[Database Seeding Patterns]]
- [[Music Library Management]]
- [[AI-Assisted Development]]
