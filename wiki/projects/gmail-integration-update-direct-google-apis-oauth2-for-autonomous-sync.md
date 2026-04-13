---
title: "Gmail Integration Update: Direct Google APIs OAuth2 for Autonomous Sync"
author: ai
created_at: 2026-04-13T15:35:43.912Z
last_ai_edit: 2026-04-13T15:35:43.912Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-gmail-replace-mcp-dependency-with-direct-googleapis-oau-d677ff.md]]"
tags:
  - gmail
  - integration
  - oauth2
  - googleapis
  - sync
  - automation
  - brain
  - dependency
  - cli
---

# Gmail Integration Update: Direct Google APIs OAuth2 for Autonomous Sync

This update transitions the Gmail integration within the Brain project from relying on MCP tools to directly using the `googleapis` npm package with OAuth2. This enables autonomous hourly email synchronization after a one-time browser-based consent flow, significantly streamlining the process.

## Key Concepts

Gmail Integration,OAuth2 Refresh Token,Autonomous Data Sync,Dependency Removal,One-time Consent Flow,Google APIs

## Details

The `rahilsinghi/brain` repository, at commit `f4fb916` (2026-04-10), implemented a significant enhancement to its Gmail integration. Previously, this functionality was dependent on `MCP` tools. This commit replaces that dependency with a direct integration using the `googleapis` npm package.

The new approach leverages an OAuth2 refresh token to facilitate autonomous hourly synchronization of Gmail data. This means that after an initial, one-time setup, the system can pull emails without further manual intervention. The setup involves running a `pnpm gmail:auth` command, which initiates a browser-based consent flow.

Upon its first execution, this updated integration successfully synced 41 emails, demonstrating its functionality.

Key files introduced or modified in this change include:
- `src/sources/gmail-auth.ts`: Responsible for creating the OAuth2 client.
- `scripts/gmail-auth.ts`: The command-line interface (CLI) script for the one-time consent process.
- `tests/sources/gmail-auth.test.ts`: Contains 5 dedicated tests for the OAuth2 authentication mechanism.
- `tests/sources/gmail-api.test.ts`: Includes 5 tests specifically for the Gmail API source functionality.

This development was co-authored by Claude Opus 4.6 (1M context).

## Related

[[brain — Git Activity]],[[Brain Project]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[OAuth2]],[[googleapis]],[[Gmail]],[[pnpm gmail:auth]],[[CLAUDE.md]]
