---
title: "Vector Store: listAll() for Bulk Embedding Retrieval"
author: ai
created_at: 2026-04-12T21:54:43.849Z
last_ai_edit: 2026-04-12T21:54:43.849Z
last_human_edit: null
last_embedded_hash: ff82855d32f4e715
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-vector-store-add-listall-for-bulk-embedding-retrieval-c42319.md]]"
tags:
  - vector store
  - lancedb
  - embedding retrieval
  - data retrieval
  - commit
  - brain project
---


# Vector Store: listAll() for Bulk Embedding Retrieval

This commit introduces a `listAll()` method to the vector store within the [[Brain Project]], enabling the bulk retrieval of all chunks along with their associated vector fields from [[LanceDB]]. Unlike the `search()` method, `listAll()` explicitly includes the vectors in its results and handles the conversion of `Float32Array` to `number[]`.

## Key Concepts

Vector Store,Bulk Embedding Retrieval,LanceDB,listAll() method,Float32Array to number[] conversion

## Details

A new `listAll()` method has been added to the vector store component of the [[Brain Project]]. This function is designed to retrieve all stored chunks from the [[LanceDB]] database, ensuring that their vector fields are included in the results.

Key aspects of this feature:
- **Purpose**: Facilitates the bulk retrieval of all data chunks present in the vector store.
- **Vector Inclusion**: Crucially, `listAll()` returns chunks *including* their vector fields, differentiating it from the existing `search()` method which typically strips vectors from its results for efficiency or specific query types.
- **Data Type Conversion**: The implementation specifically converts `Float32Array` vector data into `number[]` arrays using `Array.from()`, ensuring compatibility and ease of use within the application.

This enhancement (commit `b43f36f`) was authored by Rahil Singhi on 2026-04-10, with one file changed, adding 17 lines of code.

## Related

[[Brain Project]],[[LanceDB]],[[Vector Store Search Functionality]]
