---
title: "MarkPush Feature Release: OTP Auth, Cloud Push, and Reader Navigation (2026-03-18)"
author: ai
created_at: 2026-04-10T21:27:20.068Z
last_ai_edit: 2026-04-10T21:27:20.068Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-otp-auth-e2e-wifi-cloud-push-reader-navigation-npm-ab93a5.md]]"
tags:
  - markpush
  - feature
  - release
  - authentication
  - otp
  - wifi
  - cloudpush
  - iosapp
  - cli
  - npm
  - supabase
  - swiftdata
  - networking
  - persistence
  - markdown
  - realtime
  - development
  - "2026"
---

# MarkPush Feature Release: OTP Auth, Cloud Push, and Reader Navigation (2026-03-18)

This wiki article details a significant MarkPush feature release, introducing robust OTP authentication with session persistence and beta whitelist enforcement. It also establishes end-to-end WiFi and cloud push capabilities, enhances the iOS app with full MarkdownUI reader navigation and SwiftData persistence, and publishes the `mcp-server` to npm. This release represents a major advancement in the project's functionality and reliability.

## Key Concepts

OTP (One-Time Password) Authentication,Magic Link Deep Linking,Session Persistence,Beta Whitelisting,Raw TCP Protocol,Supabase Realtime,MarkdownUI Rendering,SwiftData Persistence,The Composable Architecture (TCA),npm Package Publishing,Row Level Security (RLS)

## Details

This release for the MarkPush project (`rahilsinghi/MarkPush`, SHA: `afbc80a`, dated `2026-03-18T01:29:23Z`) by [[Rahil Singhi]] introduced a suite of new features and improvements across authentication, transport, client applications, and server publishing. A total of 27 files were changed, resulting in +852 additions and -108 deletions. All tests (50 iOS, 24 CLI, 32 MCP) passed, totaling 106 successful tests.

### Authentication Enhancements
The authentication system received significant upgrades, focusing on reliability and security:
- **OTP Code Entry:** Implemented as a fallback mechanism for cases where the magic link deep link fails.
- **Beta Whitelist Enforcement:** Ensures that only whitelisted users can proceed after authentication, blocking others.
- **30-Day Session Persistence:** Sessions now persist for 30 days, with automatic re-authentication for convenience.
- **Increased Test Coverage:** The number of authentication tests grew from 13 to 23, reflecting a more robust testing suite.

### Transport Layer Improvements
Both WiFi and cloud-based transport mechanisms were refined:
- **Fixed WiFi Protocol:** Switched to raw TCP, aligning with the `Network.framework` used on iOS.
- **Fixed WiFiReceiver Lifetime:** Resolved an issue where the `WiFiReceiver` was prematurely deallocated.
- **ISO8601 Timestamp Parsing:** Corrected parsing for Go's `RFC3339Nano` format to ensure accurate data handling.
- **Cloud Relay Integration:** Enabled CLI pushes via [[Supabase]], with iOS clients receiving updates via Supabase Realtime.
- **RLS-Compliant Routing:** The CLI's `CloudSender` now includes `user_id` for Supabase, facilitating Row Level Security (RLS) compliant routing.

### iOS Application Updates
The [[MarkPush]] iOS application received user experience and data management enhancements:
- **Feed to Reader Navigation:** Tapping on a feed item now navigates directly to a full [[MarkdownUI]] rendering of the content.
- **SwiftData Persistence:** Received documents are now persistently stored using [[SwiftData]], allowing the Library to display all available documents.
- **SharedModelContainer:** Ensures consistent and centralized access to SwiftData.
- **PersistenceClient TCA Dependency:** Integrated a `PersistenceClient` as a dependency within [[The Composable Architecture (TCA)]] for managing persistence operations.
- **CloudReceiver Wiring:** The `CloudReceiver` was integrated into `MarkPushClient` alongside the `WiFiReceiver` for unified data reception.

### CLI Enhancements
The Command Line Interface (CLI) was updated to support new transport features:
- **WiFi Transport:** Switched from WebSocket to raw TCP, mirroring the iOS app's implementation.
- **Cloud Configuration:** Added a `user_id` field for Supabase push routing, supporting RLS.
- **All Tests Passing:** All 24 CLI tests successfully passed.

### MCP (MarkPush Core Protocol) Publishing
The core protocol server component was made publicly available:
- **npm Publication:** `@markpush/mcp-server@0.1.0` was published to [[npm]].
- **Public Access:** `publishConfig` was added to ensure public accessibility of the package.

## Related

[[MarkPush]],[[Rahil Singhi]],[[OTP Authentication]],[[Supabase]],[[SwiftData]],[[The Composable Architecture (TCA)]],[[npm]],[[TCP Protocol]],[[MarkdownUI]]
