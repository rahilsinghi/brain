---
title: iOS 26 Physical Device Compatibility Fixes for MarkPush
author: ai
created_at: 2026-04-12T21:10:47.660Z
last_ai_edit: 2026-04-12T21:10:47.660Z
last_human_edit: null
last_embedded_hash: 760314e0a1415922
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-ios-26-physical-device-compatibility-56666b.md]]"
tags:
  - ios
  - ios26
  - physical device
  - compatibility
  - swiftui
  - navigationstack
  - supabase
  - font
  - ui
  - bugfix
---


# iOS 26 Physical Device Compatibility Fixes for MarkPush

This article details a series of fixes implemented in the [[MarkPush]] project to ensure compatibility with iOS 26 physical devices. Key changes include replacing the `NavigationStack` toolbar, suppressing sidebar toggles, resolving font weight warnings, and adjusting settings for full-screen display and Supabase session management.

## Key Concepts

[[iOS 26]] Compatibility,[[NavigationStack]],Supabase Client Configuration,Font Weight Management,UIRequiresFullScreen,Device Signing

## Details

A series of critical fixes were applied to the [[MarkPush]] project (commit `55aa4b6`) on March 18, 2026, to address compatibility issues with iOS 26 running on physical devices:

*   **Toolbar Replacement:** The `NavigationStack` toolbar was replaced with a custom header to eliminate the iOS 26 Liquid Glass system's '...' button on `FeedView`, improving UI aesthetics and functionality.
*   **Sidebar Suppression:** Added `.tabViewStyle(.tabBarOnly)` to effectively suppress the sidebar toggle, ensuring a consistent user experience.
*   **Font Weight Warning Resolution:** The Lora font faces were swapped instead of using `.fontWeight()` on custom fonts, resolving a font weight warning.
*   **Orientation Enforcement:** `UIRequiresFullScreen` was added to enforce a portrait-only orientation for the application.
*   **Supabase Client Configuration:** The `emitLocalSessionAsInitialSession` property was set on the [[Supabase]] client to ensure proper session management.
*   **Dismissal Fix:** The `PairingView` dismissal mechanism was fixed using `@Environment(\.dismiss)`.
*   **Device Signing:** `DEVELOPMENT_TEAM` was added to facilitate correct device signing.

## Related

[[MarkPush]],[[Supabase]]
