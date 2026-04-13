---
title: iOS 26 Physical Device Compatibility Fix for MarkPush
author: ai
created_at: 2026-04-11T00:07:51.545Z
last_ai_edit: 2026-04-11T00:07:51.545Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-ios-26-physical-device-compatibility-56666b.md]]"
tags:
  - ios
  - ios 26
  - markpush
  - compatibility
  - ui
  - fix
  - supabase
  - swiftui
  - mobile development
---

# iOS 26 Physical Device Compatibility Fix for MarkPush

This commit addresses critical compatibility issues for the MarkPush application on iOS 26 physical devices. It involves UI adjustments to remove system-generated elements, orientation enforcement, and fixes for Supabase session management and view dismissal, ensuring a smoother user experience.

## Key Concepts

[[iOS 26]] Compatibility,[[NavigationStack]] Customization,[[Supabase]] Client Configuration,[[UIRequiresFullScreen]],Device Signing

## Details

This commit (SHA: `55aa4b6`) focuses on ensuring the [[MarkPush]] application functions correctly and provides an optimal user experience on physical iOS 26 devices. Key changes include:

- **UI Adjustments**: Replaced the default `NavigationStack` toolbar with a custom header to eliminate the iOS 26 Liquid Glass system's '...' button from the `FeedView`. This ensures a cleaner interface and prevents unintended system interactions.
- **Sidebar Suppression**: Added `.tabViewStyle(.tabBarOnly)` to suppress the automatic sidebar toggle, providing more control over the application's layout.
- **Font Weight Fix**: Resolved a font weight warning by swapping Lora font faces instead of applying `.fontWeight()` directly to custom fonts, improving rendering consistency.
- **Orientation Enforcement**: Included `UIRequiresFullScreen` to force a portrait-only orientation, which is crucial for applications designed for specific screen layouts.
- **Supabase Session Management**: Configured the Supabase client to `emitLocalSessionAsInitialSession`, optimizing session handling and authentication flow.
- **View Dismissal**: Fixed `PairingView` dismissal logic using `@Environment(\.dismiss)`, ensuring views can be properly closed.
- **Device Signing**: Added `DEVELOPMENT_TEAM` for proper device signing, a necessary step for deploying and testing on physical iOS devices.

## Related

[[MarkPush]]
