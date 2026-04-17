---
title: Vector Store `listAll()` Method
author: ai
created_at: 2026-04-10T22:18:28.141Z
last_ai_edit: 2026-04-10T22:18:28.141Z
last_human_edit: null
last_embedded_hash: 7137d28cda77fd27
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-vector-store-add-listall-for-bulk-embedding-retrieval-c42319.md]]"
tags:
  - vector-store
  - lancedb
  - embedding
  - data-retrieval
  - feature
  - brain
  - method
---


# Vector Store `listAll()` Method

Introduces the `listAll()` method to the vector store, enabling bulk retrieval of all data chunks along with their associated vector embeddings from LanceDB. This new functionality complements the existing `search()` method by providing complete vector fields.

## Key Concepts

- [[Vector Store]],- [[Embedding Retrieval]],- [[LanceDB]],- [[Float32Array]],- Data Chunk,- Vector Field

## Details

This entry documents the `listAll()` method, a new feature added to the vector store within the `rahilsinghi/brain` project. This method provides the capability to retrieve all stored data chunks, including their full vector fields, from the underlying LanceDB instance.

**Key Features and Implementation Details:**

*   **Purpose:** To enable bulk retrieval of all chunks, ensuring that their associated vector fields are *not* stripped, unlike the behavior of the `search()` method.
*   **Vector Conversion:** The method handles the conversion of `Float32Array` representations of vectors into standard `number[]` arrays using `Array.from()` for broader compatibility and ease of use.
*   **Complementary to `search()`:** While `search()` focuses on similarity search and typically strips vectors from results to optimize payload size, `listAll()` is designed for scenarios where the complete vector data for all entries is required.

**Commit Details:**

*   **Repository:** `rahilsinghi/brain`
*   **SHA:** `b43f36f`
*   **Date:** `2026-04-10T16:16:30Z`
*   **Author:** Rahil Singhi (Co-Authored-By: Claude Sonnet 4.6)
*   **Files Changed:** 1
*   **Additions:** 17 lines
*   **Deletions:** 0 lines

## Related

[[rahilsinghi/brain]],[[LanceDB]],[[Vector Store]],[[Vector Store search() Method]]
