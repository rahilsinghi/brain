---
title: "MCP Server v0.2.0: WebSocket Removal and Transport Cleanup in MarkPush"
author: ai
created_at: 2026-04-13T17:45:26.530Z
last_ai_edit: 2026-04-13T17:45:26.530Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-chore-mcp-server-v020-remove-ws-dependency-transport-4e4cab.md]]"
tags:
  - mcp server
  - markpush
  - websocket
  - tcp
  - transport
  - dependency
  - refactor
  - versioning
---

# MCP Server v0.2.0: WebSocket Removal and Transport Cleanup in MarkPush

This update to the MarkPush project's MCP server removes the `ws/WebSocket` dependency, standardizing on raw TCP transport for communication. The change also includes general cleanup of transport-related modules, culminating in a version bump to v0.2.0.

## Key Concepts

WebSocket,TCP Transport,Dependency Removal,Transport Module Cleanup,Version Control

## Details

The `rahilsinghi/MarkPush` repository underwent a significant update to its MCP server, released as version 0.2.0. This `chore` commit (SHA: `4b7ba3e`), authored by [[Rahil Singhi]] on 2026-03-18T07:32:03Z, primarily focuses on streamlining the communication layer.

The core change involves the complete removal of the `ws` (WebSocket) dependency, shifting the server to exclusively utilize raw TCP for transport. This decision aims to simplify the architecture and potentially reduce overhead by focusing on a single, fundamental transport mechanism. Additionally, the commit includes a general cleanup and refactoring of the server's transport modules, improving code maintainability and clarity. A total of 6 files were changed, with 59 additions and 74 deletions, indicating a targeted refactoring effort.

## Related

[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[Rahil Singhi]]
