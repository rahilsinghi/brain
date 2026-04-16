---
title: Relay Synchronization Utility (sync.ts) in Brain Project
author: ai
created_at: 2026-04-15T23:01:36.187Z
last_ai_edit: 2026-04-15T23:01:36.187Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/brain/file-summaries/brain_src_relay_sync_ts.md]]"
tags:
  - code-architecture
  - brain
  - synchronization
  - knowledge-base
  - utility
---

# Relay Synchronization Utility (sync.ts) in Brain Project

This module within the [[Brain Project]] handles the synchronization of knowledge base content, including file collection, content hashing, and intelligent re-embedding decisions. It provides functions for processing individual items and performing a full synchronization of inbound relay data, ensuring the knowledge base remains up-to-date and efficiently managed.

## Key Concepts

computeContentHash(),shouldReembed(),collectWikiFiles(),syncFile(),syncAll(),processItem(),DownloadFailedError,syncRelayInbound()

## Details

This `sync.ts` module serves as a core utility for managing and synchronizing content within the [[Brain Project]]. Its primary role is to ensure that the knowledge base remains up-to-date and efficiently re-embeds only necessary content.

Key functionalities include:
*   **Content Hashing and Re-embedding**: The `computeContentHash()` function generates a unique identifier (hash) for file content, allowing the `shouldReembed()` function to intelligently determine if a file has changed and requires re-embedding. This optimization minimizes redundant processing and resource usage.
*   **File Collection**: `collectWikiFiles()` is responsible for identifying and gathering all relevant wiki-related files from the specified directories, preparing them for the synchronization process.
*   **Synchronization Flow**: The module provides functions for both individual file synchronization (`syncFile()`) and a comprehensive synchronization process (`syncAll()`). These functions, alongside `processItem()`, orchestrate the workflow of checking, processing, and updating content within the knowledge base.
*   **Inbound Relay Synchronization**: `syncRelayInbound()` specifically handles the synchronization of data originating from an inbound relay, ensuring external content is correctly integrated into the local knowledge base.
*   **Error Handling**: The `DownloadFailedError` class is defined to manage specific errors encountered during content download operations, providing robust error management.

The module imports `[[yaml-loader.ts]]`, suggesting it might handle YAML configuration or data files as part of its content synchronization process.

## Related

[[Brain Project]],[[yaml-loader.ts]]
