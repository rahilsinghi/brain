---
title: "MarkPush Server v0.2.0: WebSocket Deprecation and Transport Refinement"
author: ai
created_at: 2026-04-10T21:41:34.216Z
last_ai_edit: 2026-04-10T21:41:34.216Z
last_human_edit: null
last_embedded_hash: 373a5d66acaa8283
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-chore-mcp-server-v020-remove-ws-dependency-transport-4e4cab.md]]"
tags:
  - markpush
  - mcp-server
  - version-bump
  - websocket
  - tcp
  - transport
  - cleanup
  - dependency-removal
  - chore
---


# MarkPush Server v0.2.0: WebSocket Deprecation and Transport Refinement

This release marks version 0.2.0 of the MarkPush (MCP) server, focusing on a significant architectural shift. It removes the WebSocket dependency, transitioning the server to exclusively utilize raw TCP for its transport layer. This change streamlines communication mechanisms and includes a general cleanup of transport-related modules.

## Key Concepts

**MCP Server**: The MarkPush Communication Protocol server component.,**WebSocket**: A communication protocol providing full-duplex communication channels over a single TCP connection.,**Raw TCP Transport**: Direct communication using the Transmission Control Protocol, without higher-level protocols like WebSocket.,**Dependency Removal**: The process of eliminating external libraries or modules that a project relies on.,**Transport Cleanup**: Refactoring and simplifying the code responsible for data transmission.

## Details

This commit, identified by SHA `4b7ba3e`, details the release of MarkPush (MCP) server version `v0.2.0`. Authored by Rahil Singhi on 2026-03-18, the primary objective of this update is to simplify the server's communication architecture.

Key changes include:

*   **Version Bump**: The server's version is updated to `v0.2.0`.
*   **WebSocket Deprecation**: The `ws` (WebSocket) dependency has been entirely removed. This signifies a strategic decision to move away from WebSocket-based communication.
*   **Exclusive Raw TCP Transport**: Following the removal of WebSockets, the MCP server now exclusively relies on raw TCP for its transport layer, aiming for a more streamlined and potentially lower-overhead communication method.
*   **Transport Module Cleanup**: Accompanying the architectural shift, various transport-related modules have undergone cleanup and refactoring to align with the new raw TCP-only approach.

The commit involved changes across 6 files, with 59 lines added and 74 lines deleted, indicating a refactoring effort focused on removing existing WebSocket-related code.

## Related

[[MarkPush]],[[WebSocket]],[[TCP]],[[Dependency Management]],[[Rahil Singhi]]
