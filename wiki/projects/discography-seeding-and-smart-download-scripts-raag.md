---
title: Discography Seeding and Smart Download Scripts (raag)
author: ai
created_at: 2026-04-13T15:06:23.330Z
last_ai_edit: 2026-04-13T15:06:23.330Z
last_human_edit: null
last_embedded_hash: 54975519abf6af9f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-add-discography-seeding-and-smart-download-scripts-628943.md]]"
tags:
  - discography
  - music management
  - automation
  - python
  - youtube
  - database
  - file organization
  - audio
  - raag
---


# Discography Seeding and Smart Download Scripts (raag)

This commit introduces new Python scripts for the [[raag]] project, automating the management of music discographies. It enables pre-populating a database with artist metadata, intelligently downloading tracks from YouTube, and organizing existing audio files using fuzzy matching.

## Key Concepts

Discography Seeding,Smart Downloading,Audio File Organization,Database Pre-population,YouTube Integration,Fuzzy Matching,Music Metadata Management

## Details

This feature, committed to the [[raag]] repository under SHA `486d124`, significantly enhances the project's ability to manage music content. It comprises three main Python scripts:

*   `seed_discography.py`: This script is responsible for pre-populating the project's database with comprehensive discography metadata. An initial run successfully added the full [[Seedhe Maut]] discography, including 9 albums and 135 individual songs, ensuring a rich dataset for subsequent operations.
*   `smart_download.py`: Utilizing the metadata stored in the database, this script intelligently searches YouTube for each track and facilitates accurate downloads. This automates the process of acquiring high-quality audio content based on verified discography information.
*   `reorganize_audio.py`: For users with existing local audio files, this script provides a crucial utility. It employs fuzzy-matching techniques to identify and link existing files to their corresponding entries in the database, then correctly moves and organizes them according to the structured metadata.

This functionality streamlines music library management, from data acquisition to local file organization.

## Related

[[raag]],[[Seedhe Maut]],[[Claude Opus 4.6]]
