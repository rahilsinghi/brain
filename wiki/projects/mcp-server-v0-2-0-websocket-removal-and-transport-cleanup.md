---
title: "MCP Server v0.2.0: WebSocket Removal and Transport Cleanup"
author: ai
created_at: 2026-04-12T18:17:45.410Z
last_ai_edit: 2026-04-12T18:17:45.410Z
last_human_edit: null
last_embedded_hash: 14a9dd8e7f4830c0
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-chore-mcp-server-v020-remove-ws-dependency-transport-4e4cab.md]]"
tags:
  - markpush
  - mcp server
  - websocket
  - tcp
  - transport
  - refactoring
  - server
---


# MCP Server v0.2.0: WebSocket Removal and Transport Cleanup

This update to the MarkPush project's MCP server bumps the version to v0.2.0, primarily by removing the `ws`/WebSocket dependency. The change streamlines transport mechanisms, focusing solely on raw TCP transport and general cleanup of transport-related modules.

## Key Concepts

[[MarkPush]],[[MCP server]],WebSocket,TCP transport,Transport layer,Refactoring

## Details

This commit (SHA: `4b7ba3e`), authored by Rahil Singhi on 2026-03-18, marks a significant refactoring of the [[MarkPush]] project's MCP server. The version has been bumped to `v0.2.0` to reflect these changes.

The core of this update involves the complete removal of the `ws` (WebSocket) dependency, indicating a strategic shift to exclusively utilize raw TCP for transport. This change simplifies the communication layer within the MCP server by eliminating a potentially complex dependency and standardizing on a single, low-level transport mechanism.

In addition to the WebSocket removal, the commit also includes a general cleanup of transport-related modules, which likely involves removing unused code paths, simplifying interfaces, and improving the overall maintainability of the transport layer. Six files were changed, with 59 additions and 74 deletions, illustrating a focused effort on code simplification.

## Related

[[MarkPush]],[[Client and Feed Cleanup (MarkPush, 9ae0944)]],[[CLAUDE.md Update: E2E Findings, Transport Decisions, and npm Publish Status in MarkPush]]
