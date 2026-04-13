---
title: "Fix: Correct City Column Name in Host Page Query (city_name → display_name)"
author: ai
created_at: 2026-04-12T17:16:41.649Z
last_ai_edit: 2026-04-12T17:16:41.649Z
last_human_edit: null
last_embedded_hash: 67f6c9a5e1789c16
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-correct-city-column-name-in-host-page-query-city-name-83bd81.md]]"
tags:
  - bug fix
  - database
  - flock project
  - git commit
  - api
  - query correction
---


# Fix: Correct City Column Name in Host Page Query (city_name → display_name)

This commit addresses a bug in the [[Flock]] project by correcting the city column name used in the host page query. Specifically, it updates the column reference from `city_name` to `display_name` to ensure accurate data retrieval for host pages. The change was co-authored with [[Claude Opus 4.6 (1M context)]].

## Key Concepts

Column name correction,Host page query,[[Flock]] project development,Database schema consistency,Git commit

## Details

This commit, identified by SHA `c7cbd7b`, introduces a crucial fix within the `rahilsinghi/Flock` repository. The primary purpose of this change was to resolve an inconsistency in the host page query, where the incorrect column name `city_name` was being referenced instead of the correct `display_name`.

- **Repository:** `rahilsinghi/Flock`
- **SHA:** `c7cbd7b`
- **Date:** `2026-03-21T16:48:58Z`
- **Author:** Rahil Singhi
- **Co-Author:** [[Claude Opus 4.6 (1M context)]]
- **Files changed:** 3
- **Additions:** 6148 lines
- **Deletions:** 1647 lines

The fix ensures that the host page properly fetches and displays city information by aligning the query with the actual database schema. The substantial number of additions and deletions suggests a broader refactoring or reformatting alongside this specific column name correction.

## Related

[[Flock]],[[Claude Opus 4.6 (1M context)]],[[Host page query]]
