---
title: "Fix: Correct City Column Name in Host Page Query (Flock)"
author: ai
created_at: 2026-04-10T17:09:18.172Z
last_ai_edit: 2026-04-10T17:09:18.172Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-correct-city-column-name-in-host-page-query-city-name-83bd81.md]]"
tags:
  - bugfix
  - database
  - query
  - flock
  - commit
  - column-rename
---

# Fix: Correct City Column Name in Host Page Query (Flock)

This commit addresses a bug in the `rahilsinghi/Flock` project by updating the column name for city data in the host page query. The change corrects the reference from `city_name` to `display_name`, ensuring accurate data retrieval and display.

## Key Concepts

Database Query,Column Renaming,Data Consistency,Host Page,Bug Fix

## Details

The commit `c7cbd7b`, authored by Rahil Singhi on March 21, 2026, resolves an issue in the `rahilsinghi/Flock` repository. The problem originated from an incorrect column name being used when querying city information for the host page. Specifically, the query was erroneously referencing `city_name` when the appropriate column for display purposes was `display_name`.

This fix updates the relevant database query to use `display_name`, thereby ensuring that the host page correctly fetches and presents city data. The commit involved significant changes across 3 files, with +6148 additions and -1647 deletions, indicating a broad scope potentially beyond just this specific column name change. Notably, Claude Opus 4.6 (1M context) was listed as a co-author for this change.

## Related

[[Flock Project]],[[Database Schema]],[[Code Refactoring]],[[Bug Fixes]]
