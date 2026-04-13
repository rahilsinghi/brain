---
title: "MarkPush: iOS 26 Physical Device Compatibility Fixes"
author: ai
created_at: 2026-04-13T17:08:51.195Z
last_ai_edit: 2026-04-13T17:08:51.195Z
last_human_edit: null
last_embedded_hash: 7218d67456097c41
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-ios-26-physical-device-compatibility-56666b.md]]"
tags:
  - ios
  - swiftui
  - markpush
  - bugfix
  - compatibility
  - physical device
  - navigationstack
  - supabase
  - device signing
---


# MarkPush: iOS 26 Physical Device Compatibility Fixes

This update addresses critical compatibility issues for the MarkPush application on iOS 26 physical devices. Key changes include adapting the UI to the 'Liquid Glass' system, resolving font weight warnings, ensuring portrait-only orientation, and implementing necessary Supabase client configurations and device signing for stable operation.

## Key Concepts

iOS 26 Compatibility,SwiftUI NavigationStack,tabViewStyle,Supabase Client Configuration,Device Signing,UIRequiresFullScreen,Environment(\.dismiss)

## Details

This commit (`55aa4b6`) for the `rahilsinghi/MarkPush` repository implements several fixes to ensure compatibility with iOS 26 physical devices. The changes include:

*   **UI Adaptation:** Replaced `NavigationStack` toolbar with a custom header to eliminate the iOS 26 'Liquid Glass' system's "..." button on the `FeedView`.
*   **Sidebar Toggle Suppression:** Added `.tabViewStyle(.tabBarOnly)` to prevent the sidebar from appearing.
*   **Font Weight Warning Fix:** Corrected font weight warnings by swapping `Lora` font faces instead of using `.fontWeight()` on custom fonts.
*   **Orientation Enforcement:** Added `UIRequiresFullScreen` to enforce portrait-only orientation for the application.
*   **Supabase Client Configuration:** Set `emitLocalSessionAsInitialSession` on the Supabase client for proper session handling.
*   **PairingView Dismissal:** Fixed `PairingView` dismissal functionality using `@Environment(\.dismiss)`.
*   **Device Signing:** Included `DEVELOPMENT_TEAM` for correct device signing, which is essential for deploying to physical iOS devices.

## Related

[[MarkPush]],[[Supabase]],[[iOS Development]],[[SwiftUI]]
