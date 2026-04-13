---
title: "MarkPush Major Feature Update: March 2026"
author: ai
created_at: 2026-04-10T15:15:16.854Z
last_ai_edit: 2026-04-10T15:15:16.854Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-otp-auth-e2e-wifi-cloud-push-reader-navigation-npm-ab93a5.md]]"
tags:
  - markpush
  - feature update
  - authentication
  - otp
  - magic link
  - wifi
  - cloud push
  - supabase
  - ios
  - cli
  - npm
  - swiftdata
  - tca
  - march 2026
  - version 0.1.0
  - tcp
  - iso8601
  - testing
---

# MarkPush Major Feature Update: March 2026

This document details a significant update to the MarkPush project, introducing robust authentication enhancements including OTP and 30-day session persistence. It establishes end-to-end WiFi and cloud-based push capabilities, alongside improved reader navigation within the iOS app. Furthermore, the core MarkPush component has been published to npm as `@markpush/mcp-server@0.1.0`.

## Key Concepts

- OTP Authentication,- Magic Link Deep Link,- Beta Whitelist Enforcement,- Session Persistence,- Raw TCP Protocol (WiFi),- ISO8601 / RFC3339Nano Timestamp Parsing,- Cloud Relay Integration (Supabase Realtime),- Row-Level Security (RLS),- MarkdownUI Rendering,- SwiftData Persistence,- SharedModelContainer,- The Composable Architecture (TCA),- npm Package Publishing,- End-to-End Push Notifications

## Details

This document outlines a major feature update for the [[MarkPush]] project, identified by commit SHA `afbc80a` on `2026-03-18T01:29:23Z`, authored by [[Rahil Singhi]]. This update involved 27 files, adding 852 lines and deleting 108 lines, signifying substantial changes across the codebase.

### Core Project Details

- **Repo:** [[rahilsinghi/MarkPush]]
- **SHA:** `afbc80a`
- **Date:** `2026-03-18T01:29:23Z`
- **Author:** [[Rahil Singhi]]
- **Files changed:** 27
- **Additions:** +852
- **Deletions:** -108

### Authentication Enhancements

Significant improvements were made to the authentication system:

- **OTP code entry** serves as a fallback mechanism when [[Magic Link]] deep links fail.
- **Beta whitelist enforcement** blocks non-whitelisted users after initial authentication, controlling access during beta phases.
- **30-day session persistence** with automatic re-authentication ensures a smoother user experience.
- Auth tests increased from 13 to **23**, indicating improved test coverage and reliability.

### Transport Layer Development

The transport layer received critical updates to ensure reliable end-to-end push functionality:

- The [[WiFi Protocol]] was fixed to use **raw TCP**, aligning with [[iOS Network.framework]].
- **WiFiReceiver lifetime** issues were resolved, preventing immediate deallocation.
- **ISO8601 timestamp parsing** was fixed to correctly handle Go's [[RFC3339Nano]] format.
- **Cloud relay integration** enables CLI pushes via [[Supabase]] and iOS receives via Supabase [[Realtime]] services.
- The CLI CloudSender now includes `user_id` for **RLS-compliant routing**, enhancing security and data isolation.

### iOS Application Updates

The iOS application saw user experience and architectural improvements:

- **Feed → Reader navigation** on tap provides full [[MarkdownUI]] rendering for documents.
- **SwiftData persistence** on receive means the Library now shows all documents, leveraging [[SwiftData]].
- A **SharedModelContainer** ensures consistent [[SwiftData]] access across the application.
- **PersistenceClient** was integrated as a [[The Composable Architecture]] (TCA) dependency.
- **CloudReceiver** was wired into the MarkPushClient alongside the WiFiReceiver for unified data reception.

### CLI Enhancements

The Command Line Interface (CLI) was updated to support new transport mechanisms:

- **WiFi transport** was switched from WebSocket to [[Raw TCP]], mirroring iOS.
- **Cloud configuration** now includes a `user_id` field for [[Supabase]] push routing, aligning with RLS.
- All **24 CLI tests** are passing.

### MCP (MarkPush Core Protocol) and npm Publishing

- The `@markpush/mcp-server@0.1.0` package was **published to [[npm]]**.
- `publishConfig` was added to ensure public access to the package.

### Overall Test Status

- A total of **106 tests are passing**: 50 iOS + 24 CLI + 32 MCP, reflecting a robust and well-tested system.

## Related

[[Rahil Singhi]],[[MarkPush]],[[Supabase]],[[Network.framework]],[[SwiftData]],[[The Composable Architecture]],[[npm]],[[Raw TCP]],[[ISO8601]],[[RFC3339Nano]],[[MarkdownUI]],[[OTP]],[[Magic Link]],[[Realtime]]
