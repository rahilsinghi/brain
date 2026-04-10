---
title: iOS 26 Physical Device Compatibility Fix (MarkPush)
author: ai
created_at: 2026-04-10T02:18:03.256Z
last_ai_edit: 2026-04-10T02:18:03.256Z
last_human_edit: null
last_embedded_hash: 0493ca03e27dbb7e
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-ios-26-physical-device-compatibility-56666b.md]]"
tags:
  - ios
  - ios26
  - swiftui
  - swift
  - xcode
  - supabase
  - bug-fix
  - device-compatibility
  - markpush
  - liquid-glass
  - navigationstack
  - tabview
  - code-signing
  - custom-fonts
  - portrait-orientation
---


# iOS 26 Physical Device Compatibility Fix (MarkPush)

A commit to the MarkPush repository addressing multiple iOS 26 compatibility issues for physical device deployment. Changes include UI adjustments to suppress iOS 26 Liquid Glass interface elements, orientation enforcement, Supabase session configuration, and device signing setup. Eight files were modified with 50 additions and 20 deletions.

## Key Concepts

- **iOS 26 Liquid Glass UI**: Apple's new design system in iOS 26 introduces system-managed UI elements like a '...' button in NavigationStack toolbars that may conflict with custom app layouts
- **NavigationStack vs Custom Header**: Replacing system NavigationStack toolbars with custom headers gives developers finer control over UI elements introduced by new OS versions
- **TabView Sidebar Toggle**: iOS 26 may present a sidebar toggle in TabView; `.tabViewStyle(.tabBarOnly)` suppresses this behavior
- **Custom Font Weight Handling**: SwiftUI's `.fontWeight()` modifier does not correctly apply weights to custom fonts; the correct approach is to swap font face variants directly
- **Portrait-Only Orientation**: `UIRequiresFullScreen` in the app's Info.plist enforces full-screen portrait-only mode
- **Supabase Session Initialization**: `emitLocalSessionAsInitialSession` ensures the Supabase client emits a locally cached session on startup
- **SwiftUI Environment Dismiss**: Using `@Environment(\.dismiss)` is the correct SwiftUI pattern for dismissing views programmatically
- **DEVELOPMENT_TEAM Signing**: Setting `DEVELOPMENT_TEAM` in Xcode build settings is required for code signing when deploying to a physical device

## Details

## Overview

This commit (SHA: `55aa4b6`) was authored by Rahil Singhi on 2026-03-18 and targets the [MarkPush](https://github.com/rahilsinghi/MarkPush) iOS repository. It resolves a set of issues encountered when running the app on a physical iOS 26 device, spanning UI behavior, font rendering, orientation, backend session handling, and code signing.

---

## Changes Breakdown

### 1. FeedView: Replace NavigationStack Toolbar with Custom Header
iOS 26 introduced the Liquid Glass design language, which injects a system-managed `...` (ellipsis) button into `NavigationStack` toolbars automatically. To remove this undesired element, the toolbar was replaced with a fully custom header component, giving the app explicit control over what appears in the navigation area.

### 2. Suppress Sidebar Toggle in TabView
Applying `.tabViewStyle(.tabBarOnly)` to the `TabView` prevents iOS 26 from rendering a sidebar toggle button, maintaining the traditional tab bar interface.

### 3. Fix Font Weight Warning with Custom Fonts
SwiftUI's `.fontWeight()` modifier does not function as expected with custom font families such as Lora. The fix involves directly referencing the appropriate font face variant (e.g., `Lora-Bold` instead of `Lora-Regular` with `.fontWeight(.bold)`), which resolves runtime warnings and ensures correct rendering.

### 4. Portrait-Only Orientation via UIRequiresFullScreen
Adding `UIRequiresFullScreen` to the app's `Info.plist` enforces portrait-only, full-screen presentation, preventing unintended landscape or Split View behavior on iPads and newer iPhones.

### 5. Supabase: emitLocalSessionAsInitialSession
Configuring `emitLocalSessionAsInitialSession` on the Supabase client ensures that a previously persisted local session is emitted as the initial session event on app launch, enabling seamless session restoration without requiring a fresh network authentication.

### 6. Fix PairingView Dismiss
The `PairingView` was updated to use `@Environment(\.dismiss)` for dismissal, aligning with SwiftUI best practices and resolving incorrect or non-functional dismiss behavior.

### 7. Add DEVELOPMENT_TEAM for Device Signing
The `DEVELOPMENT_TEAM` identifier was added to the Xcode project build settings, which is a prerequisite for provisioning and deploying the app to a physical device.

---

## Commit Metadata

| Field | Value |
|---|---|
| Repository | rahilsinghi/MarkPush |
| SHA | 55aa4b6 |
| Date | 2026-03-18T07:31:12Z |
| Author | Rahil Singhi |
| Files Changed | 8 |
| Additions | +50 |
| Deletions | -20 |

## Related

- [[iOS 26 Liquid Glass Design System]]
- [[SwiftUI NavigationStack]]
- [[SwiftUI TabView Styles]]
- [[Custom Font Rendering in SwiftUI]]
- [[Supabase iOS SDK]]
- [[SwiftUI Environment Values]]
- [[Xcode Code Signing and Provisioning]]
- [[UIRequiresFullScreen]]
- [[MarkPush App]]
