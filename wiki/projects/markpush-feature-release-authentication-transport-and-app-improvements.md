---
title: "MarkPush Feature Release: Authentication, Transport, and App Improvements"
author: ai
created_at: 2026-04-11T00:31:02.070Z
last_ai_edit: 2026-04-11T00:31:02.070Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-otp-auth-e2e-wifi-cloud-push-reader-navigation-npm-ab93a5.md]]"
tags:
  - markpush
  - authentication
  - otp
  - wifi
  - cloud
  - ios
  - swiftdata
  - cli
  - npm
  - release
  - transport
  - supabase
  - markdownui
---

# MarkPush Feature Release: Authentication, Transport, and App Improvements

This significant update for the [[MarkPush]] project introduces robust One-Time Password (OTP) authentication with beta whitelist enforcement and 30-day session persistence. It revamps data transport using fixed raw TCP for WiFi and integrates a cloud relay via Supabase for seamless CLI-to-iOS pushes. The iOS application now features full MarkdownUI rendering, [[SwiftData]] persistence, and enhanced client-side data reception, alongside the publication of `@markpush/mcp-server` to [[npm]].

## Key Concepts

OTP Authentication,Session Persistence,Beta Whitelisting,Raw TCP Transport,Cloud Relay,Supabase Realtime,iOS Application Development,SwiftData,MarkdownUI,NPM Package Publication,Command Line Interface (CLI)

## Details

This release (`afbc80a`) for the [[MarkPush]] project, dated 2026-03-18, introduces a suite of new features and fixes across authentication, data transport, the iOS application, and the CLI.

### Authentication
- **OTP Code Entry:** Implemented as a fallback for users when the magic link deep link fails.
- **Beta Whitelist Enforcement:** Non-whitelisted users are blocked post-authentication, ensuring controlled access.
- **30-Day Session Persistence:** Sessions now persist for 30 days with automatic re-authentication for a smoother user experience.
- **Enhanced Test Coverage:** Auth tests have increased from 13 to 23, improving reliability.

### Transport
- **Fixed WiFi Protocol:** Switched to raw TCP, aligning with iOS Network.framework for stability.
- **WiFiReceiver Lifetime Fix:** Resolved an issue where `WiFiReceiver` was deallocated prematurely.
- **ISO8601 Timestamp Parsing:** Corrected parsing for Go's RFC3339Nano format.
- **Cloud Relay Integration:** The CLI now pushes data via [[Supabase]], which the iOS app receives through Realtime, enabling robust cloud-based transfers. This builds upon previous work documented in [[Cloud Push Debugging Guide and User ID Requirements]] and [[Cloud Relay User ID Routing and Silent Failure Logging Fix (MarkPush)]].
- **User ID for RLS:** The CLI's `CloudSender` now includes `user_id` for Supabase's Row Level Security (RLS)-compliant routing.

### iOS App
- **Feed to Reader Navigation:** Tapping on a feed item now navigates to a full MarkdownUI rendering, enhancing content consumption.
- **SwiftData Persistence:** Received documents are now persistently stored using [[SwiftData]], making them available in the Library.
- **SharedModelContainer:** Ensures consistent and centralized access to [[SwiftData]].
- **PersistenceClient:** Integrated as a [[The Composable Architecture|TCA]] dependency for managing persistence.
- **CloudReceiver Integration:** Wired into `MarkPushClient` alongside `WiFiReceiver` for comprehensive data reception.

### CLI
- **WiFi Transport Update:** Switched from WebSocket to raw TCP for improved reliability.
- **Cloud Configuration:** Added `user_id` field to the cloud configuration to facilitate [[Supabase]] push routing.
- **Full Test Coverage:** All 24 CLI tests are passing.

### MCP (MarkPush Control Panel)
- **NPM Publication:** The `@markpush/mcp-server@0.1.0` package has been published to [[npm]] for public access.
- **`publishConfig`:** Added to ensure proper public access configuration for the published package.

### Overall Test Status
- A total of 106 tests are passing across all components: 50 iOS tests, 24 CLI tests, and 32 MCP tests.

## Related

[[MarkPush]],[[Documentation Update for MarkPush: iOS Deployment, Transport, and Macro Trust]],[[Documentation Update: CLAUDE.md in MarkPush]],[[E2E Backend + iOS Auth/Settings/App/Library Tests (MarkPush)]],[[E2E Testing: Backend and iOS Features (MarkPush)]],[[Cloud Push Debugging Guide and User ID Requirements]],[[Cloud Push Debugging Guide and User ID Requirements Documentation Update]],[[Cloud Relay User ID Routing and Silent Failure Logging Fix (MarkPush)]],[[Supabase]],[[SwiftData]],[[MarkdownUI]],[[npm]],[[The Composable Architecture]]
