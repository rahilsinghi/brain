---
title: "Fix: Resolve Xcode 26.3 Build Errors in iOS App (MarkPush)"
author: ai
created_at: 2026-04-11T00:21:50.482Z
last_ai_edit: 2026-04-11T00:21:50.482Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-resolve-xcode-263-build-errors-in-ios-app-cc88fe.md]]"
tags:
  - xcode
  - ios
  - build-fix
  - swift
  - markpush
  - concurrency
  - keychain
  - supabase
  - swift-package-manager
  - bugfix
---

# Fix: Resolve Xcode 26.3 Build Errors in iOS App (MarkPush)

This commit addresses and resolves critical build errors encountered with Xcode 26.3 in the MarkPush iOS application. It includes various fixes across CryptoUtils, MarkPushClient, Keychain, WiFiReceiver, SettingsView, PairingView, and CloudReceiver components, along with updates to the `project.yml` configuration and the removal of `Package.swift`.

## Key Concepts

[[Xcode]],[[iOS App Development]],[[Swift Concurrency]],[[Swift Package Manager]] (SPM),[[KeychainAccess]],[[Supabase]],[[UIKit]],[[CommonCrypto]],[[MainActor]],[[nonisolated]],[[preconcurrency]],[[Info.plist]]

## Details

This commit (SHA: `c3eb33c`) for the `rahilsinghi/MarkPush` repository, dated 2026-03-17, focused on resolving build errors arising from `Xcode 26.3`. The changes involved 15 files with 1217 additions and 48 deletions.

Specific fixes include:

*   **CryptoUtils**: Added a missing `CommonCrypto` import necessary for `PBKDF2` functionality.
*   **MarkPushClient**: Incorporated a `UIKit` import for `UIDevice` and ensured `UIDevice.current.name` was awaited on the `MainActor`-isolated context to prevent threading issues.
*   **Keychain**: Utilized `@preconcurrency` import and marked the non-`Sendable` `KeychainAccess` type as `nonisolated(unsafe)` to comply with Swift's concurrency safety requirements.
*   **WiFiReceiver**: The `messages` property was explicitly marked as `nonisolated`.
*   **SettingsView**: Replaced `$store` binding with a manual `Binding` for sheets to address specific UI/state management issues.
*   **PairingView**: Updated styling to use `.tint` instead of `.accent` for `ShapeStyle` for consistency.
*   **CloudReceiver**: Corrected a mixed-type dictionary issue within the `Supabase .update()` call.
*   **project.yml**: Explicit `SPM` product names were added, `concurrency` settings were relaxed to be targeted, and `Info.plist` was included with essential camera and network permissions.
*   **Package.swift**: The `Package.swift` file was removed, as `SPM` dependencies are now managed directly through the `xcodegen project.yml` configuration.

## Related

[[MarkPush]],[[E2E Backend + iOS Auth/Settings/App/Library Tests (MarkPush)]],[[Documentation for MarkPush MCP Server Plan and System Architecture]],[[Commit: MarkPush Project Screenshots]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]]
