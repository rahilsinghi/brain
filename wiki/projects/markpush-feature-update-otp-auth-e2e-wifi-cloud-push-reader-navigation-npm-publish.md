---
title: "MarkPush Feature Update: OTP Auth, E2E WiFi+Cloud Push, Reader Navigation, npm Publish"
author: ai
created_at: 2026-04-11T00:34:19.087Z
last_ai_edit: 2026-04-11T00:34:19.087Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-otp-auth-e2e-wifi-cloud-push-reader-navigation-npm-ab93a5.md]]"
tags:
  - authentication
  - transport
  - ios
  - cli
  - npm
  - markpush
  - development
  - feature
  - update
---

# MarkPush Feature Update: OTP Auth, E2E WiFi+Cloud Push, Reader Navigation, npm Publish

This significant update for the MarkPush project introduces One-Time Password (OTP) authentication, enhances end-to-end WiFi and cloud-based data transport, and adds reader navigation and persistent storage to the iOS application. Furthermore, the MarkPush MCP server has been officially published to npm, making it publicly accessible. The changes are accompanied by an expanded test suite, ensuring robustness and reliability across all components.

## Key Concepts

OTP authentication,Beta whitelist enforcement,Session persistence,End-to-end WiFi transport (raw TCP),Cloud relay push (Supabase, Realtime),ISO8601 timestamp parsing,Reader navigation (iOS),SwiftData persistence,SharedModelContainer,PersistenceClient (TCA dependency),npm package publishing

## Details

This commit (`afbc80a`) to the `rahilsinghi/MarkPush` repository, authored by Rahil Singhi on 2026-03-18, details a major feature update across the project.

### Authentication
- **OTP Code Entry:** A fallback for when magic link deep links fail, ensuring users can still authenticate.
- **Beta Whitelist Enforcement:** Non-whitelisted users are now blocked post-authentication, streamlining beta access.
- **30-Day Session Persistence:** User sessions now persist for 30 days with automatic re-authentication for improved user experience.
- **Increased Test Coverage:** Authentication tests have been expanded from 13 to 23, enhancing reliability.

### Transport
- **Fixed WiFi Protocol:** The WiFi transport now uses raw TCP, aligning with iOS Network.framework standards for robustness.
- **WiFiReceiver Lifetime Fix:** Resolved an issue where the `WiFiReceiver` was immediately deallocated.
- **ISO8601 Timestamp Parsing:** Corrected parsing for Go's RFC3339Nano format, ensuring accurate timestamp handling.
- **Cloud Relay Integration:** CLI pushes are now routed via [[Supabase]], with iOS devices receiving data via [[Realtime Communication]], enabling end-to-end cloud push capabilities.
- **CLI CloudSender:** Now includes a `user_id` for [[Cloud Relay User ID Routing and Silent Failure Logging Fix (MarkPush)]] and Row-Level Security (RLS)-compliant routing.

### iOS Application
- **Feed to Reader Navigation:** Tapping on a feed item now navigates to a full MarkdownUI rendering of the content.
- **SwiftData Persistence:** Received documents are persistently stored using [[SwiftData]], making them available in the Library.
- **SharedModelContainer:** Implemented for consistent access to [[SwiftData]] across the app.
- **PersistenceClient:** Integrated as a [[The Composable Architecture]] (TCA) dependency for managing persistence.
- **CloudReceiver Integration:** The `CloudReceiver` is now wired into the `MarkPushClient` alongside the `WiFiReceiver`, enabling seamless cloud data reception.

### Command Line Interface (CLI)
- **WiFi Transport:** Switched from WebSocket to raw [[TCP Protocol]] for improved reliability.
- **Cloud Configuration:** Added a `user_id` field for [[Supabase]] push routing, aligning with cloud relay integration.
- **Test Status:** All 24 CLI tests are passing.

### MarkPush Control Panel (MCP)
- **npm Publication:** The `@markpush/mcp-server` package has been published to npm as version `0.1.0` with `publishConfig` set for public access. This makes the [[MarkPush MCP Server]] publicly available.

### Overall Testing
- A total of 106 tests are passing, comprising 50 iOS tests, 24 CLI tests, and 32 MCP tests, demonstrating comprehensive validation of the new features and fixes.

## Related

[[MarkPush]],[[MarkPush MCP Server]],[[Cloud Relay User ID Routing and Silent Failure Logging Fix (MarkPush)]],[[Cloud Push Debugging Guide and User ID Requirements]],[[OTP Authentication]],[[TCP Protocol]],[[ISO8601 Timestamp]],[[Supabase]],[[Realtime Communication]],[[SwiftData]],[[The Composable Architecture]]
