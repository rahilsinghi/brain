---
title: iOS Authentication Flow with Supabase Magic Link Login in MarkPush
author: ai
created_at: 2026-04-13T15:31:36.006Z
last_ai_edit: 2026-04-13T15:31:36.006Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-ios-auth-flow-with-supabase-magic-link-login-cd7669.md]]"
tags:
  - ios
  - authentication
  - supabase
  - magic link
  - tca
  - markpush
  - mobile development
  - swift
  - deep linking
---

# iOS Authentication Flow with Supabase Magic Link Login in MarkPush

This article details the implementation of an iOS authentication flow for the [[MarkPush]] application, utilizing Supabase's magic link login functionality. It outlines the architecture involving a TCA-based `AuthClient`, a 4-step authentication state machine in `AuthFeature`, and the associated UI components for user interaction and session management. The solution integrates deep linking and robust error handling.

## Key Concepts

Supabase Authentication,Magic Link Login,The Composable Architecture (TCA),Deep Linking,State Machine (Authentication),iOS Info.plist Configuration,Authentication Gating

## Details

The `MarkPush` application integrates a comprehensive iOS authentication flow built around Supabase's magic link system. This implementation leverages The Composable Architecture (TCA) for clear state management and dependency injection.

### Core Components:

*   **AuthClient**: This TCA dependency encapsulates all Supabase authentication interactions. It provides methods for `signInWithOTP` (for magic link requests), `handleDeepLink` (to process authentication callbacks), `restoreSession`, and `signOut`. Crucially, it retrieves Supabase credentials (URL and anonymous key) from the application's `Info.plist`.

*   **AuthFeature**: This component manages the authentication state using a 4-step state machine: `checking` → `landing` → `magicLinkSent` → `authenticated`. It handles email validation, sending OTPs, processing deep link callbacks, restoring user sessions, resending magic links, and robust error handling to guide the user through the authentication process.

*   **AuthView**: The user interface for the authentication flow is divided into two main screens. The `landing` screen presents the application logo, an email input field, and a "Continue with Email" call-to-action (CTA). Upon sending a magic link, the view transitions to a `magicLinkSent` confirmation screen, offering options to "Open Mail", resend the link, or use a different email. The UI adheres to a predefined design system, utilizing specific colors (`mpBackground`, `mpAccent`) and fonts (`Fraunces`, `Inter`).

*   **AppFeature**: This serves as the root feature of the application, responsible for authentication gating. It conditionally displays the `AuthView` when a user is unauthenticated and the main `TabView` once authenticated. It also forwards incoming deep links directly to the `AuthFeature` for processing and resets the authentication state upon user sign out.

*   **MarkPushApp**: The main application entry point includes an `.onOpenURL` handler to capture and process `markpush://auth/callback` deep links, crucial for completing the magic link authentication flow.

### Configuration and User Experience:

*   **Info.plist**: Configured to register the `markpush://` URL scheme, enabling the application to respond to specific URLs for deep linking. It also securely stores the Supabase project URL and anonymous key.

*   **SettingsFeature/View**: Within the application's settings, an "Account" section displays the authenticated user's email and provides a "Sign Out" button, which includes a loading state to indicate ongoing operations.

## Related

[[MarkPush]],[[Rahil Singhi]]
