---
title: Resolving Xcode 26.3 Build Errors in MarkPush iOS App
author: ai
created_at: 2026-04-10T21:15:45.790Z
last_ai_edit: 2026-04-10T21:15:45.790Z
last_human_edit: null
last_embedded_hash: 154731a9f190f33b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-resolve-xcode-263-build-errors-in-ios-app-cc88fe.md]]"
tags:
  - xcode
  - ios
  - swift
  - concurrency
  - fix
  - builderror
  - markpush
  - swiftpackage
  - keychain
  - supabase
  - uikit
  - coderefactor
---


# Resolving Xcode 26.3 Build Errors in MarkPush iOS App

This article details the comprehensive set of fixes implemented to resolve various build errors encountered when compiling the MarkPush iOS application with Xcode 26.3. The changes address issues related to Swift Concurrency, dependency management, UI element styling, and cryptographic operations.

## Key Concepts

- [[Xcode 26.3]],- [[Swift Concurrency]],- [[MainActor]],- [[Sendable]],- [[nonisolated]],- [[Swift Package Manager (SPM)]],- [[CommonCrypto]],- [[PBKDF2]],- [[UIKit]],- [[UIDevice]],- [[KeychainAccess]],- [[Supabase]],- [[project.yml (XcodeGen)]],- [[Info.plist Permissions]]

## Details

A series of critical updates were applied to the MarkPush iOS application to address build failures and warnings specifically arising from Xcode 26.3. These fixes span multiple areas of the codebase:

*   **Cryptographic Utilities (`CryptoUtils`):** Added the necessary `CommonCrypto` import to correctly facilitate `PBKDF2` (Password-Based Key Derivation Function 2) operations.
*   **Client Initialization (`MarkPushClient`):** Ensured proper `UIKit` import for `UIDevice` access and correctly handled `UIDevice.current.name` with `await MainActor`-isolated calls to prevent concurrency-related warnings or crashes.
*   **Keychain Management:** Implemented `@preconcurrency import` and used `nonisolated(unsafe)` when dealing with the `KeychainAccess` type, which is not `Sendable`, to safely interact with it in concurrent contexts.
*   **Network Receivers (`WiFiReceiver`):** Marked the `messages` property as `nonisolated` to align with Swift Concurrency rules, indicating it can be accessed from any actor.
*   **User Interface Updates (`SettingsView`, `PairingView`):**
    *   In `SettingsView`, `$store` bindings were replaced with manual `Binding` instances for sheet presentations, likely to resolve issues with observable object updates.
    *   `PairingView` was updated to use `.tint` instead of the deprecated `.accent` for `ShapeStyle` properties, conforming to modern iOS UI styling best practices.
*   **Cloud Integration (`CloudReceiver`):** Fixed an issue involving a mixed-type dictionary within a `Supabase .update()` call, ensuring data consistency and correct API interaction.
*   **Project Configuration (`project.yml`):** Significant changes were made to the XcodeGen `project.yml` file:
    *   Explicit `SPM` product names were defined, enhancing clarity and reliability of dependency resolution.
    *   Concurrency settings were relaxed and targeted, allowing more flexible and performant use of Swift Concurrency where appropriate.
    *   An `Info.plist` was explicitly added, including necessary camera and network usage permissions.
*   **Dependency Management:** The redundant `Package.swift` file was removed, consolidating `Swift Package Manager` dependency management entirely within the `xcodeproj` via `project.yml` configuration.

## Related

[[Xcode]],[[Swift Concurrency]],[[Swift Package Manager]],[[MarkPush]],[[KeychainAccess]],[[Supabase]],[[UIKit]],[[PBKDF2]]
