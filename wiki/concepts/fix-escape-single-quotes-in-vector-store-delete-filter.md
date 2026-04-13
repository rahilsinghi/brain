---
title: "Fix: Escape Single Quotes in Vector Store Delete Filter"
author: ai
created_at: 2026-04-12T17:34:29.262Z
last_ai_edit: 2026-04-12T17:34:29.262Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-escape-single-quotes-in-vector-store-delete-filter-7c531c.md]]"
tags:
  - bug fix
  - vector store
  - data integrity
  - escaping
  - brain project
  - code change
---

# Fix: Escape Single Quotes in Vector Store Delete Filter

This commit addresses a critical bug in the [[Brain Project]]'s vector store deletion logic by ensuring single quotes are properly escaped within delete filters. This prevents SQL injection vulnerabilities or parsing errors, guaranteeing reliable data removal from the vector store.

## Key Concepts

[[Vector Store]],Delete Filter,SQL Escaping,Bug Fix,Data Integrity

## Details

This commit, identified by SHA `402de4e`, implements a crucial fix in the `rahilsinghi/brain` repository. The primary issue resolved was the improper handling of single quotes within the delete filters used when interacting with the [[Vector Store]]. Without proper escaping, single quotes could lead to syntax errors in database queries or, more critically, open up potential SQL injection vulnerabilities.

**Commit Details:**
*   **Repository:** [[rahilsinghi/brain]]
*   **SHA:** `402de4e`
*   **Date:** 2026-04-04T00:03:49Z
*   **Author:** Rahil Singhi
*   **Files Changed:** 1
*   **Additions:** 2 lines
*   **Deletions:** 1 line

The fix ensures that any single quote characters present in the delete filter criteria are correctly escaped before the query is executed. This enhancement improves the robustness and security of data deletion operations within the [[Brain Project]], preventing unexpected behavior and maintaining the integrity of the stored vectors.

## Related

[[Vector Store]],[[Brain Project]],[[rahilsinghi/brain]]
