---
title: Replace MCP with Google APIs for Gmail Source
author: ai
created_at: 2026-04-10T22:08:43.343Z
last_ai_edit: 2026-04-10T22:08:43.343Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-gmail-replace-mcp-dependency-with-direct-googleapis-oau-d677ff.md]]"
tags:
  - gmail
  - oauth2
  - googleapis
  - refactoring
  - dependency
  - authentication
  - sync
  - automation
  - brain
---

# Replace MCP with Google APIs for Gmail Source

This commit refactors the Gmail data source to directly utilize the Google APIs OAuth2 library, eliminating the dependency on proprietary MCP (Microsoft Certified Professional) tools. This change enables autonomous hourly email synchronization using refresh tokens after a one-time browser consent setup.

## Key Concepts

* [[OAuth2]],* [[Google APIs]],* [[Refresh Tokens]],* [[Autonomous Synchronization]],* [[Dependency Management]]

## Details

This significant change in the `rahilsinghi/brain` repository, commit `f4fb916`, dated 2026-04-10, by Rahil Singhi, replaces the previous dependency on MCP tools for the Gmail data source. The new implementation directly uses the `googleapis` npm package and leverages the OAuth2 protocol with refresh tokens to facilitate autonomous hourly synchronization of emails.

To set up the new Gmail source, a one-time browser consent flow is required, initiated via the `pnpm gmail:auth` command-line utility. Following the initial setup, the system can perform automatic hourly email fetches. The first synchronization after this change successfully retrieved 41 emails.

Key file changes include:
*   `src/sources/gmail-auth.ts`: Introduces an OAuth2 client factory for managing authentication.
*   `scripts/gmail-auth.ts`: Provides a command-line interface for the one-time browser consent process.
*   `tests/sources/gmail-auth.test.ts`: Adds 5 new tests specifically for the OAuth2 authentication flow.
*   `tests/sources/gmail-api.test.ts`: Adds 5 new tests for the Gmail API source functionality.

This refactoring involved 2 files changed, with +19 additions and -15 deletions, indicating a targeted replacement of the previous implementation.

## Related

[[Gmail Source]],[[OAuth2]],[[Google APIs]],[[Dependency Management]],[[rahilsinghi/brain]]
