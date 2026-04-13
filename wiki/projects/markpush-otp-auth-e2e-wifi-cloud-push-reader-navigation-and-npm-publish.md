---
title: "MarkPush: OTP Auth, E2E WiFi + Cloud Push, Reader Navigation, and npm Publish"
author: ai
created_at: 2026-04-12T17:49:56.594Z
last_ai_edit: 2026-04-12T17:49:56.594Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-otp-auth-e2e-wifi-cloud-push-reader-navigation-npm-ab93a5.md]]"
tags:
  - authentication
  - otp
  - wifi
  - tcp
  - cloud push
  - supabase
  - realtime
  - ios
  - swiftdata
  - cli
  - npm
  - markpush
  - e2e
  - transport
  - reader navigation
  - session persistence
  - test coverage
---

# MarkPush: OTP Auth, E2E WiFi + Cloud Push, Reader Navigation, and npm Publish

This update to the MarkPush project introduces robust authentication with OTP fallback and 30-day session persistence, significantly enhances data transport via E2E WiFi (raw TCP) and cloud relay using Supabase, and refines the iOS app with full MarkdownUI reader navigation and SwiftData persistence. It also marks the public release of the `@markpush/mcp-server` to npm, solidifying the project's core functionality and distribution.


## Key Concepts

OTP Authentication,E2E WiFi Transport (Raw TCP),Cloud Push (Supabase/Realtime),Reader Navigation (iOS),SwiftData Persistence,npm Publish (MarkPush MCP Server),MarkPush Project,Session Persistence,Test-Driven Development (Authentication)

## Details

This commit (`afbc80a`) to the `rahilsinghi/MarkPush` repository, authored by Rahil Singhi on 2026-03-18, introduces significant feature enhancements and stability improvements across the project.

**Commit Details:**
*   **Repository:** `rahilsinghi/MarkPush`
*   **SHA:** `afbc80a`
*   **Date:** `2026-03-18T01:29:23Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 27
*   **Additions:** +852
*   **Deletions:** -108

**Key Updates:**

### Auth
*   **OTP Code Entry:** Implemented as a fallback mechanism for authentication when magic link deep linking fails.
*   **Beta Whitelist Enforcement:** Blocks non-whitelisted users post-authentication, ensuring controlled access.
*   **Session Persistence:** Introduced 30-day session persistence with automatic re-authentication for improved user experience.
*   **Test Coverage:** Authentication tests increased from 13 to 23, reflecting enhanced robustness.

### Transport
*   **Fixed WiFi Protocol:** Switched to raw TCP, aligning with iOS Network.framework for reliable end-to-end (E2E) WiFi communication.
*   **WiFiReceiver Lifetime:** Corrected an issue where `WiFiReceiver` was deallocated prematurely.
*   **ISO8601 Timestamp Parsing:** Fixed parsing for Go's RFC3339Nano format, ensuring accurate timestamp handling.
*   **Cloud Relay Integration:** Enables CLI pushes via Supabase and iOS receives via Realtime, facilitating cloud-based content delivery.
*   **User ID for RLS Routing:** The CLI's `CloudSender` now includes `user_id` for Row-Level Security (RLS)-compliant routing.

### iOS App
*   **Feed → Reader Navigation:** Tapping on a feed item now navigates directly to a full MarkdownUI rendering of the content.
*   **SwiftData Persistence:** Implemented `SwiftData` persistence upon content reception, allowing all documents to be shown in the Library.
*   **SharedModelContainer:** Ensures consistent `SwiftData` access across the application.
*   **PersistenceClient:** Added as a TCA (The Composable Architecture) dependency.
*   **CloudReceiver Integration:** Wired into the `MarkPushClient` alongside `WiFiReceiver` for combined transport handling.

### CLI
*   **WiFi Transport:** Switched from WebSocket to raw TCP for improved performance and reliability.
*   **Cloud Configuration:** Added `user_id` field to cloud configuration to support Supabase push routing.
*   **Test Status:** All 24 CLI tests are passing.

### MCP (MarkPush Control Plane)
*   **npm Publication:** Published `@markpush/mcp-server@0.1.0` to npm, making the server publicly available.
*   **`publishConfig`:** Added configuration for public access.

**Overall Test Summary:**
*   50 iOS tests passing
*   24 CLI tests passing
*   32 MCP tests passing
*   **Total:** 106 passing tests

## Related

[[MarkPush]],[[CLAUDE.md Update: E2E Findings, Transport Decisions, and npm Publish Status in MarkPush]],[[Cloud Push Debugging Guide and User ID Requirements]],[[Cloud Relay User ID Routing and Silent Failure Logging Fix (MarkPush)]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[Client and Feed Cleanup (MarkPush, 9ae0944)]],[[MarkPush Project Screenshots]],[[Remove Implementation Plan from MarkPush Repository]]
