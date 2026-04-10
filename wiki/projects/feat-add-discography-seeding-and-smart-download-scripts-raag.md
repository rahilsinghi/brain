---
title: "feat: add discography seeding and smart download scripts (raag)"
author: ai
created_at: 2026-04-10T02:08:39.350Z
last_ai_edit: 2026-04-10T02:08:39.350Z
last_human_edit: null
last_embedded_hash: 46862ddf68d19132
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-add-discography-seeding-and-smart-download-scripts-628943.md]]"
tags:
  - raag
  - python
  - discography
  - seedhe-maut
  - youtube
  - audio
  - fuzzy-matching
  - database-seeding
  - automation
  - music
  - ai-assisted
---


# feat: add discography seeding and smart download scripts (raag)

This commit to the rahilsinghi/raag repository introduces three new Python scripts to manage and automate the Seedhe Maut discography. The scripts handle database pre-population, intelligent YouTube-based track downloading, and fuzzy-matched audio file reorganization. A total of 924 lines were added across 4 files.

## Key Concepts

- **Discography Seeding:** Pre-populating a database with structured metadata for 9 albums and 135 songs from Seedhe Maut
- **Smart Downloading:** Using database metadata to perform per-track YouTube searches for accurate and targeted audio downloads
- **Fuzzy Matching:** Algorithmically matching existing audio files to database entries using approximate string matching to correctly reorganize files
- **Database-Driven Automation:** Leveraging a local database as the source of truth to coordinate downloading and file management workflows

## Details

## Overview

Commit `486d124` to the `rahilsinghi/raag` repository adds three new Python scripts that together form a pipeline for managing a local music library focused on the Seedhe Maut discography.

## Files Added

### `seed_discography.py`
Pre-populates the application database with complete metadata for the Seedhe Maut discography, covering:
- **9 albums**
- **135 songs**

This script serves as the foundation for the other tools by establishing a structured, queryable source of truth for all discography data.

### `smart_download.py`
Uses the metadata stored in the database to perform intelligent, per-track YouTube searches. Rather than relying on bulk or imprecise queries, each track is searched individually using its database metadata, improving download accuracy.

### `reorganize_audio.py`
Applies fuzzy matching to compare existing audio files on disk against database entries. Files are then moved into the correct directory structure based on matched metadata, enabling cleanup and normalization of previously downloaded or manually added audio.

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

## Collaboration
This commit was co-authored with Claude Opus 4.6, indicating AI-assisted development.

## Related

- [[raag Project]]
- [[Seedhe Maut Discography]]
- [[YouTube Audio Downloading]]
- [[Fuzzy String Matching]]
- [[Database Seeding]]
- [[Music Library Management]]
- [[Rahil Singhi]]
