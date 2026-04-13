---
title: "Gmail Source Refactor: Direct Google APIs OAuth2"
author: ai
created_at: 2026-04-10T18:09:32.352Z
last_ai_edit: 2026-04-10T18:09:32.352Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-gmail-replace-mcp-dependency-with-direct-googleapis-oau-d677ff.md]]"
tags:
  - gmail
  - oauth2
  - google-apis
  - refactor
  - dependency-replacement
  - automation
  - commit
  - brain-project
---

# Gmail Source Refactor: Direct Google APIs OAuth2

This commit details a significant refactor of the Gmail data source, replacing the previous dependency on MCP (Mail Client Proxy) tools with a direct integration using the `googleapis` npm package. This change leverages OAuth2 with refresh tokens to enable autonomous hourly email synchronization. A one-time browser-based consent flow facilitates the initial setup.

## Key Concepts

*   OAuth2 (Open Authorization 2.0),*   Google APIs,*   Refresh Token,*   Autonomous Synchronization,*   Command Line Interface (CLI),*   Dependency Replacement (MCP Tools)

## Details

This commit (`f4fb916`) by Rahil Singhi, dated 2026-04-10, implements a key architectural change for the Gmail data source within the `rahilsinghi/brain` repository. The primary motivation was to remove the reliance on external MCP tools, streamlining the integration and reducing potential maintenance overhead.

The new approach directly utilizes the `googleapis` npm package to interact with Gmail APIs. It implements an OAuth2 flow, crucially employing refresh tokens to allow for continuous, autonomous data synchronization without requiring manual re-authentication. The system is designed to perform hourly syncs.

Initial setup for a new Gmail source instance involves a one-time browser consent flow, initiated via the `pnpm gmail:auth` command-line utility. This process securely grants the application necessary permissions to access Gmail data. Post-setup, the first observed synchronization successfully retrieved 41 emails.

**Commit Details:**
*   **SHA:** `f4fb916`
*   **Author:** Rahil Singhi (Co-Authored by Claude Opus 4.6)
*   **Date:** 2026-04-10T11:52:40Z
*   **Files changed:** 2
*   **Additions:** +19 lines
*   **Deletions:** -15 lines

**Key Files Introduced/Modified:**
*   `src/sources/gmail-auth.ts`: Implements the OAuth2 client factory for Gmail API authentication.
*   `scripts/gmail-auth.ts`: Provides the command-line interface for the one-time browser consent flow.
*   `tests/sources/gmail-auth.test.ts`: Contains 5 dedicated tests for the new OAuth2 authentication logic.
*   `tests/sources/gmail-api.test.ts`: Contains 5 tests specifically for the Gmail API source integration.

## Related

[[Rahil Singhi]],[[Brain Project]],[[Gmail Integration]],[[OAuth2]],[[Google APIs]],[[MCP Tools]]
