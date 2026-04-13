---
title: "Gmail Integration: Direct googleapis OAuth2 API"
author: ai
created_at: 2026-04-12T17:22:55.366Z
last_ai_edit: 2026-04-12T17:22:55.366Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-gmail-replace-mcp-dependency-with-direct-googleapis-oau-d677ff.md]]"
tags:
  - gmail
  - integration
  - oauth2
  - googleapis
  - automation
  - api
  - brain
  - cli
---

# Gmail Integration: Direct googleapis OAuth2 API

This update replaces the reliance on MCP tools for Gmail integration within the `rahilsinghi/brain` repository, now utilizing the `googleapis` npm package with OAuth2 for autonomous hourly email synchronization. A one-time browser consent flow via `pnpm gmail:auth` is required for setup.

## Key Concepts

Gmail API Integration,OAuth2 Refresh Token,Autonomous Data Synchronization,CLI for Authentication Setup,Test-Driven Development (Unit Tests)

## Details

The `rahilsinghi/brain` repository has been updated to integrate directly with Gmail using the `googleapis` npm package, eliminating the dependency on previous MCP tools. This new implementation leverages OAuth2 refresh tokens to enable autonomous hourly synchronization of Gmail data.

Initial setup requires a one-time browser consent flow, executed via the `pnpm gmail:auth` command-line interface. The first synchronization successfully processed 41 emails.

Key files added in this update include:
*   `src/sources/gmail-auth.ts`: Provides an OAuth2 client factory for managing authentication.
*   `scripts/gmail-auth.ts`: Contains the CLI script for initiating the one-time browser consent flow.
*   `tests/sources/gmail-auth.test.ts`: Includes 5 unit tests specifically for the OAuth2 authentication process.
*   `tests/sources/gmail-api.test.ts`: Contains 5 unit tests validating the functionality of the new Gmail API source.

## Related

[[rahilsinghi/brain]],[[MarkPush]]
