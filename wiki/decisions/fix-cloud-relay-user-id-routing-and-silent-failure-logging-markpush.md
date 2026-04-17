---
title: "Fix: Cloud Relay User_ID Routing and Silent Failure Logging (MarkPush)"
author: ai
created_at: 2026-04-10T21:16:52.859Z
last_ai_edit: 2026-04-10T21:16:52.859Z
last_human_edit: null
last_embedded_hash: d6f928a44d57ff02
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-mcp-ios-cloud-relay-user-id-routing-and-silent-failur-581a69.md]]"
tags:
  - mcp
  - ios
  - cloud relay
  - user id routing
  - logging
  - error handling
  - supabase
  - markpush
  - fix
  - version bump
---


# Fix: Cloud Relay User_ID Routing and Silent Failure Logging (MarkPush)

This update addresses critical issues in the MarkPush project, improving cloud relay user_id routing on the MCP server and enhancing failure logging in both the MCP server and the iOS application. Key changes include explicit error handling for missing user_ids, better logging for network failures, and robust error reporting in the iOS client.

## Key Concepts

* [[MCP Server]],* [[iOS App]],* [[Cloud Relay]],* [[User ID Routing]],* [[Silent Failure Logging]],* [[Supabase]],* [[Error Handling]],* [[Structured Logging]]

## Details

This commit (`c899cdb`) by Rahil Singhi, dated 2026-03-27, introduces significant fixes and logging improvements for the MarkPush project, affecting both the MCP server and the iOS application. Five files were changed, with 77 additions and 10 deletions.

### MCP Server Changes

-   **`auto.ts`**: Modified to clearly error when a `cloud user_id` is missing, preventing `NULL` values from being sent. Also, WiFi failures are now logged before falling back to the cloud, providing better diagnostic information.
-   **`pairing/server.ts`**: Enhanced to automatically populate the `user_id` from the Supabase devices table immediately after a pairing event, ensuring correct user association.
-   **`index.ts`**: The server version was bumped from `0.1.0` to `0.2.0` to align with `package.json`.

### iOS App Changes

-   **MarkPushClient**: Replaced silent `try?` blocks with explicit `do/catch` statements, integrating `os.Logger` for comprehensive logging during cloud authentication, eliminating silent failures.
-   **CloudReceiver**: Added specific logging for `Realtime INSERTs` and decoding failures, enhancing observability of data synchronization issues.

This work was co-authored by Claude Opus 4.6.

## Related

[[MarkPush]],[[Cloud Relay]],[[Supabase Integration]],[[Error Handling]],[[Logging Practices]],[[Mobile-Cloud Communication]]
