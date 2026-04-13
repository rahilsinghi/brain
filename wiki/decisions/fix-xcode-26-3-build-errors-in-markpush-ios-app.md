---
title: Fix Xcode 26.3 Build Errors in MarkPush iOS App
author: ai
created_at: 2026-04-13T15:40:49.226Z
last_ai_edit: 2026-04-13T15:40:49.226Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-resolve-xcode-263-build-errors-in-ios-app-cc88fe.md]]"
tags:
  - ios
  - xcode
  - build
  - error
  - swift
  - concurrency
  - keychain
  - supabase
  - markpush
  - fix
  - swiftui
---

# Fix Xcode 26.3 Build Errors in MarkPush iOS App

This commit resolves critical build errors encountered in the MarkPush iOS application when compiling with Xcode 26.3. The fixes address issues related to missing crypto imports, `MainActor` isolation, `preconcurrency` imports for `KeychainAccess`, `nonisolated` properties, SwiftUI binding updates, and Supabase update calls.

## Key Concepts

[[Xcode]] Build Errors,[[iOS App Development]],[[SwiftUI]],Concurrency in Swift,KeychainAccess,Supabase Integration,Package Management (SPM)

## Details

This commit (`c3eb33c`) addresses and resolves several build errors that arose when compiling the MarkPush iOS application with Xcode 26.3. The primary issues and their solutions include:

*   **CryptoUtils**: Added the necessary `CommonCrypto` import to enable `PBKDF2` functionality.
*   **MarkPushClient**: Incorporated `UIKit` for `UIDevice` access and ensured `UIDevice.current.name` calls were `await MainActor`-isolated to comply with `MainActor` requirements.
*   **Keychain**: Utilized `@preconcurrency` import for `KeychainAccess` and marked usage of the `non-Sendable KeychainAccess` type with `nonisolated(unsafe)` to manage concurrency warnings.
*   **WiFiReceiver**: The `messages` property was explicitly marked as `nonisolated` to resolve concurrency-related issues.
*   **SettingsView**: Replaced the `$store` binding with a manual `Binding` to correctly handle sheet presentations.
*   **PairingView**: Updated styling to use `.tint` instead of the deprecated `.accent` for `ShapeStyle`.
*   **CloudReceiver**: Corrected a mixed-type dictionary issue within the `Supabase .update()` call.
*   **project.yml**: Explicitly defined Swift Package Manager (SPM) product names, relaxed concurrency settings to be targeted, and added an `Info.plist` with required camera and network permissions.
*   **Package.swift Removal**: The `Package.swift` file was removed as SPM dependencies are now managed directly through the `project.yml` file using `xcodegen`.

## Related

[[MarkPush]],[[API Code Review Findings and Fixes (8be18ba)]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker]],[[Camera Controller Enhancements (brain-explorer)]],[[CloudReceiver: fix mixed-type dictionary in Supabase .update() call]],[[project.yml]],[[Swift Package Manager]],[[xcodegen]],[[iOS Development]],[[Swift Concurrency]],[[Keychain Access]],[[Supabase]]
