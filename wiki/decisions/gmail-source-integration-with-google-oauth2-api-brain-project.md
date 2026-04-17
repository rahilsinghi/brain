---
title: Gmail Source Integration with Google OAuth2 API (Brain Project)
author: ai
created_at: 2026-04-12T21:23:39.785Z
last_ai_edit: 2026-04-12T21:23:39.785Z
last_human_edit: null
last_embedded_hash: 75538d155db72844
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-gmail-replace-mcp-dependency-with-direct-googleapis-oau-d677ff.md]]"
tags:
  - gmail
  - oauth2
  - googleapis
  - data ingestion
  - synchronization
  - brain project
  - cli
  - testing
  - refactor
---


# Gmail Source Integration with Google OAuth2 API (Brain Project)

This update for the `rahilsinghi/brain` repository replaces the existing MCP dependency for Gmail integration with a direct `googleapis` npm package using OAuth2. It enables autonomous hourly synchronization of Gmail data after a one-time browser consent flow, streamlining data ingestion for the Brain Project.

## Key Concepts

[[OAuth2]],[[Google APIs]],[[Data Synchronization]],[[CLI Tools]],[[Unit Testing]]

## Details

This commit (f4fb916) significantly refactors how Gmail data is ingested into the [[Brain Project]]. Previously, Gmail integration relied on [[MCP Tools]] (MarkPush). This dependency has been removed and replaced with a direct implementation using the official `googleapis` npm package.

The new system leverages [[OAuth2]] refresh tokens for secure and autonomous hourly synchronization of Gmail content. Users initiate a one-time consent flow via the `pnpm gmail:auth` command-line interface (CLI) tool, which guides them through browser-based authentication.

The initial sync after this change successfully processed 41 emails.

Key new files and their roles include:
*   `src/sources/gmail-auth.ts`: Implements the OAuth2 client factory for managing authentication.
*   `scripts/gmail-auth.ts`: Provides the one-time CLI utility for obtaining user consent.
*   `tests/sources/gmail-auth.test.ts`: Contains 5 dedicated tests for the new authentication mechanism.
*   `tests/sources/gmail-api.test.ts`: Includes 5 tests specifically for the Gmail API source, ensuring its functionality.

This change improves independence from external tools and enhances the robustness of the data ingestion pipeline.

## Related

[[Brain Project]],[[MarkPush]],[[MCP Tools]],[[Google APIs]],[[OAuth2]],[[Data Synchronization]],[[CLI Tools]],[[Unit Testing]],[[Claude]]
