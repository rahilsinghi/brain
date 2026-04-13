---
title: "Fix: iOS 26 Physical Device Compatibility for MarkPush"
author: ai
created_at: 2026-04-12T17:09:57.973Z
last_ai_edit: 2026-04-12T17:09:57.973Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-ios-26-physical-device-compatibility-56666b.md]]"
tags:
  - ios
  - swiftui
  - bugfix
  - device_compatibility
  - markpush
  - supabase
  - development_team
  - uikit
  - ios_26
---

# Fix: iOS 26 Physical Device Compatibility for MarkPush

This commit addresses critical compatibility issues for the MarkPush application on physical iOS 26 devices. It implements UI adjustments, resolves font rendering warnings, and configures device-specific settings to ensure proper functionality and a consistent user experience.

## Key Concepts

iOS 26 Compatibility,NavigationStack Customization,TabView Styling,Font Weight Fixes,Device Orientation Control,Supabase Session Management,Device Signing

## Details

This update to the [[MarkPush]] repository (`rahilsinghi/MarkPush`) (SHA `55aa4b6`) focuses on ensuring the application's compatibility and optimal performance on physical iOS 26 devices. Key changes include:

*   **NavigationStack Replacement**: The default `NavigationStack` toolbar was replaced with a custom header to eliminate the intrusive "..." button introduced by the iOS 26 Liquid Glass system on the `FeedView`.
*   **TabView Styling**: Added `.tabViewStyle(.tabBarOnly)` to explicitly suppress the sidebar toggle, maintaining the intended tab bar behavior.
*   **Font Weight Warning Fix**: Resolved a font weight warning by adjusting `Lora` font faces, opting for direct font swapping instead of applying `.fontWeight()` to custom fonts.
*   **Portrait-Only Orientation**: Implemented `UIRequiresFullScreen` to enforce a portrait-only orientation, ensuring a consistent layout across devices.
*   **Supabase Client Configuration**: Set `emitLocalSessionAsInitialSession` on the [[Supabase]] client for improved session management.
*   **PairingView Dismissal**: Fixed an issue with `PairingView` dismissal using `@Environment(\.dismiss)`.
*   **Device Signing**: Added `DEVELOPMENT_TEAM` configuration for seamless device signing.

## Related

[[MarkPush]],[[Supabase]],[[iOS Development]],[[SwiftUI]]
