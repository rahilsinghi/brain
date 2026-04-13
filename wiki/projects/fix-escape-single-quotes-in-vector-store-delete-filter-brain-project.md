---
title: "Fix: Escape Single Quotes in Vector Store Delete Filter (Brain Project)"
author: ai
created_at: 2026-04-13T15:52:06.923Z
last_ai_edit: 2026-04-13T15:52:06.923Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-escape-single-quotes-in-vector-store-delete-filter-7c531c.md]]"
tags:
  - fix
  - vector store
  - bugfix
  - brain project
  - database
  - filter
  - single quotes
  - escaping
---

# Fix: Escape Single Quotes in Vector Store Delete Filter (Brain Project)

This commit addresses a bug in the `rahilsinghi/brain` repository by implementing proper escaping for single quotes within the vector store's delete filter. This ensures that deletion operations function correctly even when filter parameters contain special characters, preventing potential errors or unexpected behavior.

## Key Concepts

Vector Store,Delete Filter,String Escaping,Bug Fix,Database Query Security

## Details

The commit `402de4e` in the `[[Brain Project]]` repository, authored by [[Rahil Singhi]] on 2026-04-04, provides a crucial fix for handling single quotes within the vector store's delete filter. Previously, unescaped single quotes could lead to incorrect parsing or errors when attempting to delete data based on filters containing such characters.

The fix, which involved changes to 1 file with 2 additions and 1 deletion, specifically targets the logic responsible for constructing delete queries. By correctly escaping single quotes, the system ensures that filter parameters are interpreted literally, enhancing the robustness and reliability of vector store deletion operations. This type of fix is essential for maintaining data integrity and preventing potential issues akin to SQL injection vulnerabilities in database interactions.

## Related

[[Brain Project]],[[Rahil Singhi]],[[Vector Store]]
