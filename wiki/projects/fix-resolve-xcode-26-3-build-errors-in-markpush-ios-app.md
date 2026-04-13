---
title: "Fix: Resolve Xcode 26.3 Build Errors in MarkPush iOS App"
author: ai
created_at: 2026-04-11T00:18:55.887Z
last_ai_edit: 2026-04-11T00:18:55.887Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-resolve-xcode-263-build-errors-in-ios-app-cc88fe.md]]"
tags:
  - ios
  - bugfix
  - xcode
  - build
  - swift
  - concurrency
  - markpush
  - project.yml
  - spm
---

# Fix: Resolve Xcode 26.3 Build Errors in MarkPush iOS App

This commit addresses and resolves critical build errors encountered in the MarkPush iOS application when compiling with Xcode 26.3. The fixes include updates to concurrency handling, framework imports, UI binding mechanisms, and project configuration to ensure successful compilation and proper application functionality.

## Key Concepts

[[Xcode 26.3]],[[iOS app]] build errors,Concurrency,CommonCrypto,PBKDF2,UIKit,UIDevice,MainActor,KeychainAccess,@preconcurrency,nonisolated(unsafe),Swift Package Manager (SPM),Supabase

## Details

- **CryptoUtils**: Added the necessary `CommonCrypto` import to enable `PBKDF2` functionality.
- **MarkPushClient**: Included `UIKit` import for `UIDevice` and ensured `UIDevice.current.name` calls were `await MainActor`-isolated for safe concurrency.
- **Keychain**: Updated to use `@preconcurrency` import and `nonisolated(unsafe)` for the `non-Sendable KeychainAccess` type to resolve concurrency warnings/errors.
- **WiFiReceiver**: Marked the `messages` property as `nonisolated` to align with concurrency requirements.
- **SettingsView**: Replaced direct `$store` binding with a manual `Binding` implementation for the sheet presentation.
- **PairingView**: Switched to using `.tint` instead of `.accent` for `ShapeStyle` properties, aligning with updated SwiftUI styling conventions.
- **CloudReceiver**: Corrected a mixed-type dictionary issue within the `Supabase .update()` call.
- **project.yml**: Specified explicit `SPM` product names, relaxed concurrency settings to be targeted, and added `Info.plist` entries for camera and network permissions.
- **Package.swift**: Removed the `Package.swift` file as `SPM` dependencies are now managed directly through the `project.yml` configuration via `xcodegen`.

## Related

[[MarkPush]],[[Rahil Singhi]],[[Documentation Update for MarkPush: iOS Deployment, Transport, and Macro Trust]],[[Documentation Update: Device Deployment, Transport Notes, and Macro Trust (MarkPush, CLAUDE.md)]],[[Swift Package Manager]],[[Supabase]]
