---
title: wiki-sync.ts
author: ai
created_at: 2026-04-15T22:01:55.851Z
last_ai_edit: 2026-04-15T22:01:55.851Z
last_human_edit: null
last_embedded_hash: 65d998e4ca7e8336
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/brain/file-summaries/brain_src_timesheet_wiki-sync_ts.md]]"
tags:
  - code-architecture
  - brain
  - wiki
  - data-sync
  - automation
  - typescript
---



# wiki-sync.ts

The `wiki-sync.ts` file in the [[Brain Project]] repository provides utilities for formatting and synchronizing weekly data to a wiki. It includes functions for date formatting, ISO week number calculation, and structuring weekly articles for wiki ingestion.

## Key Concepts

`capitalize()`,`formatDateShort()`,`isoWeekNumber()`,`formatWeeklyArticle()`,`syncWeekToWiki()`

## Details

The `wiki-sync.ts` file is a core component within the `brain` repository, located at `/Users/rahilsinghi/Desktop/brain/src/timesheet/wiki-sync.ts`. Its primary function is to facilitate the process of updating and maintaining wiki content, specifically for weekly data summaries. The file encapsulates several utility functions:

*   **`capitalize()`**: A general-purpose helper function to capitalize strings, likely used for consistent formatting within wiki articles.
*   **`formatDateShort()`**: Formats dates into a concise, short string representation suitable for wiki entries or titles.
*   **`isoWeekNumber()`**: Calculates the ISO week number for a given date, crucial for organizing weekly reports or summaries.
*   **`formatWeeklyArticle()`**: This function is responsible for structuring raw weekly data into a predefined format suitable for publication as a wiki article.
*   **`syncWeekToWiki()`**: The main orchestration function that combines the above utilities to perform the actual synchronization of weekly data to the wiki, ensuring consistency and automation in content delivery.

This script contributes to the [[Automated Data Ingestion and Wiki Maintenance]] efforts within the [[Brain Project]], streamlining the creation and updating of [[Weekly Report]]s.

## Related

[[Brain Project]],[[Automated Data Ingestion and Wiki Maintenance]],[[Weekly Report]],[[Timesheet]],[[Date and Time Utilities]]
