---
title: "MarkPush Feature Update: Authentication, Transport, and iOS Enhancements"
author: ai
created_at: 2026-04-13T17:27:53.757Z
last_ai_edit: 2026-04-13T17:27:53.757Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-otp-auth-e2e-wifi-cloud-push-reader-navigation-npm-ab93a5.md]]"
tags:
  - markpush
  - feature
  - authentication
  - transport
  - ios
  - cli
  - npm
  - supabase
  - swiftdata
  - otp
  - tcp
  - markdownui
  - commit
---

# MarkPush Feature Update: Authentication, Transport, and iOS Enhancements

This significant update to the [[MarkPush]] project introduces robust authentication with OTP fallback and 30-day session persistence. It enhances data transport with fixed E2E WiFi, [[Supabase]] cloud push capabilities, and improves the iOS app with [[MarkdownUI]] reader navigation and [[SwiftData]] persistence, alongside publishing the MCP server to [[npm]].

## Key Concepts

OTP Authentication,E2E WiFi Transport,Cloud Push Notifications,Reader Navigation (iOS),npm Package Publishing,Session Persistence,SwiftData,The Composable Architecture (TCA),Supabase Realtime,Raw TCP Transport,Beta Whitelist Enforcement

## Details

The [[MarkPush]] project received a significant feature update (commit `afbc80a` on 2026-03-18) encompassing authentication, data transport, iOS application enhancements, CLI improvements, and npm package publication.

### Authentication
*   **OTP Fallback:** Implemented one-time password (OTP) code entry as a backup method for authentication when magic link deep links fail.
*   **Beta Whitelist Enforcement:** Non-whitelisted users are now blocked after authentication, ensuring controlled access during the beta phase.
*   **Session Persistence:** User sessions persist for 30 days with automatic re-authentication.
*   **Test Coverage:** Authentication tests increased from 13 to 23, significantly improving robustness.

### Transport Layer
*   **WiFi Protocol Fixes:** The WiFi protocol was fixed to use raw TCP, matching the behavior of iOS's `Network.framework`. The `WiFiReceiver`'s lifetime issue, where it was deallocated immediately, was also resolved.
*   **Timestamp Parsing:** Corrected ISO8601 timestamp parsing to properly handle Go's RFC3339Nano format.
*   **Cloud Relay Integration:** Introduced cloud relay functionality, allowing CLI pushes via [[Supabase]] and iOS app receptions via [[Supabase Realtime]]. The CLI's `CloudSender` now includes `user_id` for Row-Level Security (RLS)-compliant routing.

### iOS Application
*   **Reader Navigation:** Tapping on a feed item now navigates to a full [[MarkdownUI]] rendering of the content within a dedicated reader view.
*   **SwiftData Persistence:** Implemented [[SwiftData]] for local persistence of received documents, ensuring that the "Library" view displays all historical content.
*   **SharedModelContainer:** A `SharedModelContainer` was established for consistent and managed access to [[SwiftData]].
*   **PersistenceClient TCA Dependency:** Integrated `PersistenceClient` as a dependency within [[The Composable Architecture]] (TCA) framework.
*   **CloudReceiver Integration:** The `CloudReceiver` was wired into the `MarkPushClient` alongside the existing `WiFiReceiver`.

### Command Line Interface (CLI)
*   **WiFi Transport Update:** Switched the WiFi transport mechanism from WebSocket to raw TCP for improved reliability and consistency.
*   **Cloud Configuration:** Added a `user_id` field to the cloud configuration for proper routing of pushes through [[Supabase]].
*   **Test Status:** All 24 CLI tests are passing.

### MarkPush Control Panel (MCP)
*   **npm Publication:** The `@markpush/mcp-server@0.1.0` package was published to [[npm]], making the server publicly accessible.
*   **Publish Configuration:** Added `publishConfig` for public access.

### Overall Test Status
All 106 tests across the project components are passing: 50 iOS tests, 24 CLI tests, and 32 MCP tests.

## Related

[[MarkPush]],[[Supabase]],[[npm]],[[The Composable Architecture]],[[SwiftData]],[[MarkdownUI]],[[Supabase Realtime]]
