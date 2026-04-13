---
title: Vector Store `listAll()` Function for Bulk Embedding Retrieval
author: ai
created_at: 2026-04-13T18:34:32.843Z
last_ai_edit: 2026-04-13T18:34:32.843Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-vector-store-add-listall-for-bulk-embedding-retrieval-c42319.md]]"
tags:
  - vector-store
  - lancedb
  - embeddings
  - data-retrieval
  - brain-project
  - feature
  - code-enhancement
---

# Vector Store `listAll()` Function for Bulk Embedding Retrieval

This commit introduces a new `listAll()` function to the Brain Project's vector store, enabling the retrieval of all stored chunks along with their associated vector embeddings from LanceDB. It complements the existing `search()` function by providing full vector data, with a conversion from Float32Array to number[] for broader compatibility.

## Key Concepts

`listAll()` function,Vector Store,Embedding Retrieval,LanceDB,Float32Array to number[] conversion,`search()` function

## Details

The `listAll()` function has been added to the vector store within the [[Brain Project]] repository. Its primary purpose is to facilitate the bulk retrieval of all data chunks stored in [[LanceDB]], including their vector fields. This is a crucial distinction from the existing `[[Vector Store search() Function]]`, which typically strips vector data from its results to optimize for similarity searches.

Key aspects of the `listAll()` implementation:

*   **Comprehensive Retrieval**: It fetches all available chunks, providing a complete dataset for operations requiring full data access.
*   **Vector Inclusion**: Unlike `search()`, `listAll()` ensures that the vector embeddings associated with each chunk are included in the returned data, making it suitable for tasks like data migration, full dataset analysis, or rebuilding vector indices.
*   **Data Type Conversion**: Vectors, originally stored as `Float32Array`, are converted to standard `number[]` arrays using `Array.from()`. This conversion enhances compatibility with various downstream processes and JavaScript environments.

This enhancement supports more flexible interaction with the vector store, enabling operations that require direct access to all [[Embeddings]]. The commit was co-authored by [[Claude Sonnet 4.6]].

## Related

[[Brain Project]],[[LanceDB]],[[Vector Store search() Function]],[[Embeddings]],[[Claude Sonnet 4.6]]
