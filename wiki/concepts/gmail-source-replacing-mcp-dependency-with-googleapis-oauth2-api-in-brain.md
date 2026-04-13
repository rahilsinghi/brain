---
title: "Gmail Source: Replacing MCP Dependency with Googleapis OAuth2 API in Brain"
author: ai
created_at: 2026-04-13T18:15:14.698Z
last_ai_edit: 2026-04-13T18:15:14.698Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-gmail-replace-mcp-dependency-with-direct-googleapis-oau-d677ff.md]]"
tags:
  - gmail
  - oauth2
  - googleapis
  - refactor
  - automation
  - data ingestion
  - brain
  - cli
---

# Gmail Source: Replacing MCP Dependency with Googleapis OAuth2 API in Brain

This commit details a refactoring of the Gmail data source within the [[brain]] repository, eliminating its dependency on proprietary [[MCP tools]]. The new implementation leverages the `googleapis` npm package and [[OAuth2]] with refresh tokens to achieve autonomous hourly email synchronization. A one-time browser consent flow (`pnpm gmail:auth`) is required for initial setup.

## Key Concepts

[[Gmail]] Source,[[OAuth2]],[[Googleapis NPM Package]],[[MCP tools]],Autonomous Hourly Sync,Refresh Token

## Details

The `f4fb916` commit in the [[brain]] repository (dated 2026-04-10) introduces a significant enhancement to the [[Gmail]] data ingestion mechanism. The core change involves decoupling the [[Gmail]] source from reliance on existing [[MCP tools]].

Instead, the system now integrates directly with the [[Gmail]] API using the `googleapis` [[npm package]]. This direct integration utilizes [[OAuth2]] with a refresh token mechanism, enabling the system to perform autonomous hourly synchronizations of emails without manual intervention after the initial setup.

The initial authorization process is managed via a one-time command-line interface (`pnpm gmail:auth`), which guides the user through a browser-based consent flow to grant the necessary permissions. Following this setup, the system successfully performed its first sync, processing 41 emails.

This change primarily affected 2 files, resulting in +19 additions and -15 deletions, indicating a targeted refactor. New files introduced to support this functionality include:
*   `src/sources/gmail-auth.ts`: An [[OAuth2]] client factory responsible for managing authentication.
*   `scripts/gmail-auth.ts`: The CLI script for initiating the one-time browser consent flow.
*   `tests/sources/gmail-auth.test.ts`: A suite of 5 tests specifically for the new [[OAuth2]] authentication mechanism.
*   `tests/sources/gmail-api.test.ts`: A suite of 5 tests validating the functionality of the new [[Gmail]] API source.

This refactoring was co-authored by Claude Opus 4.6 (1M context).

## Related

[[brain]],[[MCP tools]],[[OAuth2]],[[Gmail]],[[Googleapis NPM Package]],[[Autonomous Hourly Sync]],[[Refresh Token]]
