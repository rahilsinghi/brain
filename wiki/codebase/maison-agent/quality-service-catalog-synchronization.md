---
title: Quality Service Catalog Synchronization
author: ai
created_at: 2026-04-17T02:19:27.461Z
last_ai_edit: 2026-04-17T02:19:27.461Z
last_human_edit: null
last_embedded_hash: bd6703f28bcbf5f6
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-53.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 53
---


# Quality Service Catalog Synchronization

This code community manages the synchronization of test catalog data within the Quality Service, handling JSDoc extraction, spec file parsing, test suite scanning, and database updates through the sync-catalog.ts script.

## Key Concepts

- Test catalog synchronization
- JSDoc metadata extraction
- Test spec file parsing
- Automated test suite discovery
- Database synchronization workflow

## Details

The core of this community is the `sync-catalog.ts` script, which coordinates a multi-stage process for maintaining the Quality Service's test catalog. The script contains four primary operations:

- `sync_catalog_extractjsdocbefore`: Extracts JSDoc comments from test files to capture metadata before processing
- `sync_catalog_parsespecfile`: Parses test spec files to extract structured test definitions
- `sync_catalog_scansuites`: Discovers and analyzes test suites across the codebase
- `sync_catalog_synctodatabase`: Updates the database with the latest catalog information

These operations form a sequential workflow where JSDoc extraction precedes spec file parsing, which in turn feeds into test suite scanning before final database synchronization. The script establishes a clear dependency chain ensuring metadata is properly collected and processed before updating the test catalog in the database.

## Related

[[maison-agent]]
