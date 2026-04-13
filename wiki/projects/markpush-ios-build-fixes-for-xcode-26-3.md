---
title: MarkPush iOS Build Fixes for Xcode 26.3
author: ai
created_at: 2026-04-12T17:28:09.758Z
last_ai_edit: 2026-04-12T17:28:09.758Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-resolve-xcode-263-build-errors-in-ios-app-cc88fe.md]]"
tags:
  - ios
  - xcode
  - swift
  - build-fix
  - markpush
  - swiftui
  - concurrency
  - keychain
  - supabase
  - development
  - bugfix
---

# MarkPush iOS Build Fixes for Xcode 26.3

This article details the resolution of several build errors encountered in the MarkPush iOS application when compiling with Xcode 26.3. The fixes addressed issues related to concurrency, UI bindings, dependency management, and missing framework imports, ensuring compatibility with updated Swift and Xcode requirements.

## Key Concepts

Xcode 26.3 Build Errors,iOS Application Development,Swift Concurrency,MainActor Isolation,Sendable Conformance,KeychainAccess,CommonCrypto,PBKDF2,UIKit,SwiftUI Bindings,Supabase Integration,Swift Package Manager (SPM),xcodegen,Info.plist Permissions

## Details

This commit (`c3eb33c`) addresses and resolves multiple build errors that emerged when compiling the MarkPush iOS application with Xcode 26.3. The changes span across various modules and configurations:

*   **CryptoUtils**: A crucial fix involved adding the `CommonCrypto` import to `CryptoUtils` to correctly support the `PBKDF2` key derivation function, which was previously causing compilation issues.
*   **MarkPushClient**: To resolve issues related to UI updates and device information access, a `UIKit` import was added for `UIDevice`. Additionally, calls to `UIDevice.current.name` were marked with `await MainActor`-isolated access to ensure thread-safe execution in an asynchronous context.
*   **Keychain**: Concurrency-related warnings and errors with the `KeychainAccess` library were mitigated by applying the `@preconcurrency import` directive and using `nonisolated(unsafe)` for the `KeychainAccess` type, which is not `Sendable`.
*   **WiFiReceiver**: The `messages` property within `WiFiReceiver` was explicitly marked as `nonisolated` to comply with Swift's concurrency safety requirements.
*   **SettingsView**: The binding for sheets in `SettingsView` was refactored to use a manual `Binding` instead of a direct `$store` binding, addressing potential SwiftUI update issues.
*   **PairingView**: The visual styling of `PairingView` was updated to use the modern `.tint` modifier instead of the deprecated `.accent` for `ShapeStyle`.
*   **CloudReceiver**: A bug involving mixed-type dictionaries in a `Supabase .update()` call was identified and fixed, ensuring correct data synchronization with the backend.
*   **project.yml**: The `project.yml` file, used by `xcodegen`, was updated to include explicit Swift Package Manager (SPM) product names, relax concurrency settings to targeted modules for better build performance, and add an `Info.plist` with necessary camera and network usage descriptions (`NSCameraUsageDescription`, `NSPhotoLibraryUsageDescription`, `NSLocalNetworkUsageDescription`, `NSBonjourServices`, `NSMicrophoneUsageDescription`).
*   **Package.swift Removal**: The `Package.swift` file was removed as SPM dependencies are now exclusively managed through the `xcodegen project.yml` configuration, streamlining the dependency management process.

## Related

[[MarkPush]],[[Xcode]],[[iOS App Development]],[[Swift Package Manager]],[[UIKit]],[[Supabase]],[[Keychain]],[[CommonCrypto]],[[PBKDF2]],[[MainActor]],[[Sendable]],[[Chore: Remove Implementation Plan from MarkPush Repository]]
