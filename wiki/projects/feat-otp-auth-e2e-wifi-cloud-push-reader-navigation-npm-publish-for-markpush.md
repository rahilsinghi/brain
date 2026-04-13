---
title: "feat: OTP Auth, E2E WiFi+Cloud Push, Reader Navigation, npm Publish for MarkPush"
author: ai
created_at: 2026-04-12T21:51:11.323Z
last_ai_edit: 2026-04-12T21:51:11.323Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-otp-auth-e2e-wifi-cloud-push-reader-navigation-npm-ab93a5.md]]"
tags:
  - authentication
  - otp
  - magic link
  - session management
  - wifi
  - tcp
  - cloud relay
  - supabase
  - ios
  - swiftdata
  - tca
  - cli
  - npm
  - markpush
  - deployment
  - testing
  - markdown
  - feature
---

# feat: OTP Auth, E2E WiFi+Cloud Push, Reader Navigation, npm Publish for MarkPush

This commit significantly enhances the MarkPush project by introducing robust OTP authentication with session persistence and beta whitelist enforcement. It establishes a reliable end-to-end transport mechanism using raw TCP for WiFi and Supabase for cloud relay, ensuring seamless content delivery to the iOS app. Additionally, it enables rich Markdown rendering and SwiftData persistence in the iOS app, and publishes the MCP server to npm.

## Key Concepts

OTP Authentication,Magic Link,Session Persistence,Beta Whitelist,Raw TCP (WiFi Protocol),Cloud Relay Integration,Supabase Realtime,SwiftData,MarkdownUI,The Composable Architecture (TCA),npm Publish

## Details

This commit (`afbc80a`) by Rahil Singhi on March 18, 2026, details a major feature update for the `rahilsinghi/MarkPush` repository, involving 27 file changes with 852 additions and 108 deletions.

### Authentication
Significant improvements were made to the authentication system:
*   **OTP Code Entry**: Implemented as a fallback mechanism for instances where magic link deep links fail.
*   **Beta Whitelist Enforcement**: Blocks non-whitelisted users after initial authentication, controlling access.
*   **Session Persistence**: Introduced 30-day session persistence with automatic re-authentication for improved user experience.
*   **Increased Test Coverage**: Auth tests expanded from 13 to 23, enhancing reliability.

### Transport Layer
Key fixes and integrations were applied to the transport layer:
*   **Fixed WiFi Protocol**: Switched to raw TCP, mirroring the behavior of iOS's `Network.framework` for reliable communication.
*   **WiFiReceiver Lifetime**: Resolved an issue where `WiFiReceiver` was prematurely deallocated.
*   **Timestamp Parsing**: Fixed ISO8601 timestamp parsing to correctly handle Go's RFC3339Nano format.
*   **Cloud Relay Integration**: CLI pushes now route through Supabase, and the iOS app receives content via Supabase Realtime.
*   **User ID for RLS**: The `CloudSender` in the CLI now includes `user_id` for Row-Level Security (RLS)-compliant routing within Supabase.

### iOS Application
Enhancements to the iOS application focus on content display and data persistence:
*   **Feed to Reader Navigation**: Tapping on a feed item now navigates directly to a reader view with full MarkdownUI rendering.
*   **SwiftData Persistence**: Implemented `SwiftData` for local persistence of received documents, allowing all documents to be displayed in the Library.
*   **SharedModelContainer**: Ensures consistent `SwiftData` access across the application.
*   **PersistenceClient TCA Dependency**: Integrated a `PersistenceClient` into The Composable Architecture (TCA) for managing persistence.
*   **CloudReceiver Integration**: `CloudReceiver` is now wired into the `MarkPushClient` alongside `WiFiReceiver` for dual transport support.

### Command Line Interface (CLI)
Updates to the CLI primarily involve transport changes and testing:
*   **WiFi Transport**: Switched from WebSocket to raw TCP for more robust WiFi communication.
*   **Cloud Configuration**: Added a `user_id` field to the cloud configuration for Supabase push routing.
*   **Test Status**: All 24 CLI tests are passing.

### MarkPush Control Panel (MCP)
*   **npm Publication**: The `@markpush/mcp-server@0.1.0` package has been published to npm, making it publicly accessible.
*   **publishConfig**: Added `publishConfig` for public access to the package.

### Overall Test Coverage
All tests across the project are passing:
*   iOS: 50 tests
*   CLI: 24 tests
*   MCP: 32 tests
*   Total: 106 passing tests

## Related

[[MarkPush]],[[Supabase]],[[npm publish]],[[The Composable Architecture]],[[SwiftData]],[[MarkdownUI]],[[CLI]],[[iOS App Development]],[[TCP]],[[WebSocket]],[[OTP Authentication]],[[Cloud Relay]]
