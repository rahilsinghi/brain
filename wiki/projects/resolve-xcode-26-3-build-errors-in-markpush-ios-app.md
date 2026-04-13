---
title: Resolve Xcode 26.3 Build Errors in MarkPush iOS App
author: ai
created_at: 2026-04-12T21:28:17.378Z
last_ai_edit: 2026-04-12T21:28:17.378Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-resolve-xcode-263-build-errors-in-ios-app-cc88fe.md]]"
tags:
  - xcode
  - ios
  - markpush
  - build fix
  - swift
  - concurrency
  - keychain
  - supabase
  - project.yml
  - spm
---

# Resolve Xcode 26.3 Build Errors in MarkPush iOS App

This article details the resolution of Xcode 26.3 build errors encountered in the MarkPush iOS application. The fix involved addressing Swift concurrency issues, missing imports, incorrect UI styling, and updating project configuration files for proper compilation.

## Key Concepts

[[MarkPush]] iOS App,Xcode 26.3 Build Errors,Swift Concurrency,PBKDF2,CommonCrypto,UIKit,UIDevice,KeychainAccess,Supabase,Swift Package Manager (SPM),project.yml

## Details

A series of critical fixes were implemented to resolve build errors with Xcode 26.3 in the `rahilsinghi/MarkPush` iOS application. The changes, encompassed in commit `c3eb33c`, touched 15 files, introducing 1217 additions and 48 deletions.

Key changes include:

*   **CryptoUtils**: A `CommonCrypto` import was added to `CryptoUtils` to correctly support `PBKDF2` functionality, which was previously causing build failures due to missing cryptographic definitions.
*   **MarkPushClient**: The `MarkPushClient` now includes a `UIKit` import to properly access `UIDevice` for retrieving the device name. The call to `UIDevice.current.name` was updated to `await MainActor-isolated` to comply with Swift's concurrency requirements, ensuring UI-related operations are performed on the main actor.
*   **Keychain**: The `Keychain` implementation was updated to use `@preconcurrency import` and mark the non-Sendable `KeychainAccess` type with `nonisolated(unsafe)`. This addresses Swift concurrency warnings and errors related to accessing shared mutable state from different concurrency domains.
*   **WiFiReceiver**: The `messages` property within `WiFiReceiver` was explicitly marked as `nonisolated` to resolve concurrency issues, indicating that access to this property does not require actor isolation.
*   **SettingsView**: The `$store` binding in `SettingsView` was replaced with a manual `Binding` for sheets. This change often resolves unexpected UI behavior or crashes related to SwiftUI view lifecycle and data flow management.
*   **PairingView**: The styling for `ShapeStyle` in `PairingView` was updated from `.accent` to `.tint`, aligning with modern SwiftUI best practices and ensuring correct visual presentation.
*   **CloudReceiver**: A bug in `CloudReceiver` was fixed where a mixed-type dictionary was being passed to the `Supabase .update()` call, leading to data corruption or failed updates.
*   **project.yml**: The `project.yml` configuration file was updated to include explicit Swift Package Manager (SPM) product names. Concurrency settings were relaxed to be more targeted, and an `Info.plist` file was added with necessary camera and network permissions, which are crucial for the app's functionality.
*   **Package.swift Removal**: The `Package.swift` file was removed as SPM dependencies are now managed entirely through the `project.yml` file, streamed by `xcodegen`.

These adjustments collectively ensure that the MarkPush iOS application builds successfully with Xcode 26.3, adhering to stricter Swift concurrency rules and modern iOS development practices.

## Related

[[MarkPush]],[[API Fix: Dynamic LLM Provider/Model Reporting in Synthesis Response (Brain Project)]],[[Backend Fix: DOB Longitude Bounds and Session Complete Payload]],[[Backend Fix: DOB Query Longitude Bounds and Session Complete Payload]],[[Backend Fix: Reversed DOB Longitude Bounds and Session Complete Payload (askNYC)]],[[Backend Fix: Socrata Timeout and Transcription Object Handling]],[[Backend Fix: Socrata Tool Return Type Refactor for ADK Compatibility]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[CLAUDE.md Update: E2E Findings, Transport Decisions, and npm Publish Status in MarkPush]],[[Client and Feed Cleanup (MarkPush, 9ae0944)]],[[Client and Feed Cleanup in MarkPush (9ae0944)]],[[Remove Implementation Plan from MarkPush Repository]]
