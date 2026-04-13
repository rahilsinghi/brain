---
title: "MCP Server v0.2.0: WebSocket Removal and Transport Cleanup (MarkPush)"
author: ai
created_at: 2026-04-11T01:34:50.592Z
last_ai_edit: 2026-04-11T01:34:50.592Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-chore-mcp-server-v020-remove-ws-dependency-transport-4e4cab.md]]"
tags:
  - markpush
  - mcp server
  - websocket
  - tcp
  - transport
  - refactor
  - backend
  - chore
---

# MCP Server v0.2.0: WebSocket Removal and Transport Cleanup (MarkPush)

This commit for the [[MarkPush]] project bumps the MCP server version to v0.2.0, primarily focusing on removing the WebSocket dependency. The server now exclusively uses raw TCP for transport, accompanied by general cleanup of transport-related modules.

## Key Concepts

[[MarkPush]],[[MCP Server]],WebSocket protocol,TCP transport,Version control,Code refactoring

## Details

This entry details a significant update to the **MCP server** within the `rahilsinghi/MarkPush` repository, identified by commit SHA `4b7ba3e` from `2026-03-18T07:32:03Z`, authored by Rahil Singhi.

The primary changes include:

*   **Version Bump**: The MCP server has been updated to version `v0.2.0`.
*   **WebSocket Dependency Removal**: The server's reliance on `ws/WebSocket` for communication has been eliminated. This change streamlines the communication layer.
*   **Raw TCP Transport**: The server now exclusively utilizes raw TCP for its transport mechanism, simplifying the underlying network communication.
*   **Transport Module Cleanup**: Accompanying the removal of the WebSocket dependency, various transport-related modules have undergone a cleanup process to ensure efficiency and maintainability.

This commit involved modifications to 6 files, with 59 additions and 74 deletions, indicating a focused refactoring effort on the server's transport layer.

## Related

[[MarkPush]],[[Documentation for MarkPush MCP Server Plan and System Architecture]],[[CLAUDE.md Update: E2E Findings, Transport Decisions, and npm Publish Status in MarkPush]]
