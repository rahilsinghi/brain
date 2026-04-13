---
title: iOS Authentication Flow with Supabase Magic Link (MarkPush)
author: ai
created_at: 2026-04-10T21:10:51.082Z
last_ai_edit: 2026-04-10T21:10:51.082Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-ios-auth-flow-with-supabase-magic-link-login-cd7669.md]]"
tags:
  - ios
  - supabase
  - authentication
  - magiclink
  - tca
  - deeplink
  - swiftui
  - markpush
  - feature
---

# iOS Authentication Flow with Supabase Magic Link (MarkPush)

This wiki article details the implementation of an iOS authentication flow for the MarkPush application, leveraging Supabase's magic link login. It integrates The Composable Architecture (TCA) for state management, handles deep links for authentication callbacks, and provides a robust user experience for sign-in and session management.

## Key Concepts

Supabase Authentication,Magic Link Login,The Composable Architecture (TCA),Deep Linking,State Machine (Authentication),iOS Development (SwiftUI)

## Details

This entry describes a significant feature (`feat: iOS auth flow with Supabase magic link login`) implemented in the `rahilsinghi/MarkPush` repository, committed on `2026-03-17` by `Rahil Singhi` (SHA: `d43897a`). The implementation involved changes across 12 files, with +620 additions and -40 deletions.

The authentication system is structured around several key components:

*   **AuthClient**: This is a [[The Composable Architecture (TCA)]] dependency responsible for wrapping [[Supabase]] authentication functionalities. It provides methods for `signInWithOTP` (magic link), `handleDeepLink`, `restoreSession`, and `signOut`. It securely reads [[Supabase]] project credentials (SupabaseURL, SupabaseAnonKey) from `Info.plist`.

*   **AuthFeature**: The core logic of the authentication process is managed by this TCA feature. It implements a 4-step state machine: `checking` (initial state, often for session restoration) → `landing` (where the user enters their email) → `magicLinkSent` (after OTP is dispatched) → `authenticated`. It handles email validation, sending the OTP, processing the deep link callback from the magic link, session restoration, resending the magic link, and comprehensive error handling.

*   **AuthView**: This SwiftUI view provides the user interface for authentication. It includes a landing screen with the application logo, an email input field, and a "Continue with Email" call-to-action (CTA). After the magic link is sent, it transitions to a confirmation screen, prompting the user to "Open Mail" and offering options to resend the link or "use other email". The view utilizes a custom design system, incorporating `mpBackground`, `mpAccent` colors, and `Fraunces`, `Inter` fonts.

*   **AppFeature**: At the root of the application, the `AppFeature` manages authentication gating. It conditionally displays the `AuthView` when the user is unauthenticated and switches to a `TabView` (main application content) once authenticated. It's also responsible for forwarding incoming deep links directly to the `AuthFeature` for processing and for resetting the authentication state upon user sign-out.

*   **MarkPushApp**: The main application entry point includes an `.onOpenURL` handler specifically configured to intercept `markpush://auth/callback` deep links, ensuring they are correctly routed to the authentication flow.

*   **Info.plist**: This project configuration file is updated to register the `markpush://` URL scheme, enabling the application to handle custom deep links. It also stores the sensitive [[Supabase]] project credentials.

*   **SettingsFeature/View**: Within the application's settings, an "Account" section is provided. This section displays the currently authenticated user's email address and includes a "Sign Out" button, which features a loading state to provide user feedback during the sign-out process.

## Related

[[Supabase]],[[The Composable Architecture (TCA)]],[[Deep Linking]],[[iOS Development]],[[MarkPush]]
