---
title: "Fix: Cloud Relay User ID Routing and Silent Failure Logging in MarkPush (MCP, iOS)"
author: ai
created_at: 2026-04-13T17:17:52.443Z
last_ai_edit: 2026-04-13T17:17:52.443Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-mcp-ios-cloud-relay-user-id-routing-and-silent-failur-581a69.md]]"
tags:
  - markpush
  - mcp
  - ios
  - bugfix
  - error handling
  - logging
  - cloud relay
  - supabase
  - development
---

# Fix: Cloud Relay User ID Routing and Silent Failure Logging in MarkPush (MCP, iOS)

This article details a critical fix for the MarkPush project, addressing issues with cloud relay user ID routing and silent failures in both the MCP server and the iOS application. The update enhances error handling, logging, and user identification, improving the reliability and observability of the system.

## Key Concepts

[[MarkPush]] (MCP Server),[[iOS App]] (MarkPushClient, CloudReceiver),[[Cloud Relay]],User ID Routing,Silent Failure Logging,[[Supabase]] Integration,Error Handling,WiFi Fallback Logic

## Details

This commit (`c899cdb`) introduces significant improvements to the `MarkPush` project, focusing on robust user ID handling and better diagnostic logging for both the MCP server and the iOS application.

### MCP Server Enhancements
*   **`auto.ts`:** Modified to explicitly throw errors when a `cloud_user_id` is missing, preventing `NULL` values from being sent and providing clearer diagnostic messages. It also now logs `WiFi` failures before attempting to fall back to the cloud relay, improving the understanding of connection issues.
*   **`pairing/server.ts`:** Enhanced to automatically populate the `user_id` from the `Supabase` devices table immediately after a successful pairing, streamlining the user identification process.
*   **`index.ts`:** The server version has been bumped from `0.1.0` to `0.2.0` to align with the `package.json` manifest.

### iOS App Improvements
*   **`MarkPushClient`:** Replaced silent `try?` blocks with explicit `do/catch` statements, integrating `os.Logger` for comprehensive error reporting related to cloud authentication, thus eliminating silent failures.
*   **`CloudReceiver`:** Added dedicated logging for `Realtime INSERTs` and instances of decode failures, providing better visibility into data flow and potential corruption within the cloud relay.

This update was co-authored by [[Claude Opus 4.6]], indicating an AI-assisted development process.

## Related

[[MarkPush]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[Supabase]],[[Cloud Relay]],[[iOS App]],[[Error Handling]],[[CloudReceiver]],[[MCP Server]],[[Claude Opus 4.6]]
