---
title: "MCP server v0.2.0: Remove ws dependency, transport cleanup"
author: ai
created_at: 2026-04-10T15:22:15.466Z
last_ai_edit: 2026-04-10T15:22:15.466Z
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
  - dependency removal
  - cleanup
  - version update
  - commit
---

# MCP server v0.2.0: Remove ws dependency, transport cleanup

This commit for the MarkPush project's MCP server updates the version to v0.2.0. It primarily focuses on removing the `ws` (WebSocket) dependency, streamlining the communication layer to use only raw TCP transport, and cleaning up the associated transport modules.

## Key Concepts

MCP server,WebSocket dependency,TCP transport,Transport modules,Version bump

## Details

This chore commit, identified by SHA `4b7ba3e`, was authored by Rahil Singhi on `2026-03-18T07:32:03Z` for the `rahilsinghi/MarkPush` repository.

The primary changes include:
*   **Version Bump**: The MCP server's version was updated to `v0.2.0`.
*   **WebSocket Dependency Removal**: The `ws` (WebSocket) dependency was completely removed. This indicates a strategic decision to simplify the server's communication protocol.
*   **Raw TCP Transport**: As a direct consequence of removing the WebSocket dependency, the server now exclusively relies on raw TCP for its transport mechanism, which might simplify the network layer and reduce overhead.
*   **Transport Module Cleanup**: Accompanying these changes, the codebase's transport-related modules underwent a cleanup, likely removing defunct WebSocket-specific code and refining the TCP implementation.

Overall, the commit involved changes in 6 files, resulting in 59 lines added and 74 lines deleted, reflecting a net reduction in code consistent with dependency removal and refactoring.

## Related

[[MarkPush]],[[MCP Server]],[[WebSocket]],[[TCP]],[[Dependency Management]],[[Version Control]]
