---
title: iOS Authentication Flow with Supabase Magic Link Login (MarkPush)
author: ai
created_at: 2026-04-11T00:12:32.705Z
last_ai_edit: 2026-04-11T00:12:32.705Z
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
  - deep linking
  - swiftui
---

# iOS Authentication Flow with Supabase Magic Link Login (MarkPush)

This feature implements a robust iOS authentication flow for the [[MarkPush]] application, utilizing Supabase's magic link login system. It leverages [[The Composable Architecture (TCA)]] to manage authentication state and UI, including email validation, deep link handling, and session restoration.
Users can sign in via email, receive a magic link, and manage their session within the app.

## Key Concepts

[[Supabase]] Magic Link Authentication,[[The Composable Architecture (TCA)]],iOS Deep Linking,State Machine (Authentication),Email Validation,Session Management

## Details

This implementation introduces a comprehensive authentication system for the [[MarkPush]] iOS application, building upon [[Supabase]] for backend authentication and [[The Composable Architecture (TCA)]] for a structured, testable frontend.

### Core Components:

*   **AuthClient**: This is a TCA dependency that encapsulates all interactions with the Supabase authentication service. It provides methods for `signInWithOTP`, `handleDeepLink`, `restoreSession`, and `signOut`. Crucially, it securely reads Supabase credentials (URL and anonymous key) from the application's `Info.plist`.

*   **AuthFeature**: This TCA feature orchestrates the authentication process as a 4-step state machine:
    1.  `checking`: Initial state, often to restore an existing session.
    2.  `landing`: User input for email address.
    3.  `magicLinkSent`: Awaiting user interaction after sending the magic link.
    4.  `authenticated`: User is successfully logged in.
    It handles email validation, sending OTPs (magic links), processing deep link callbacks, session restoration, resend functionality, and error handling.

*   **AuthView**: The user interface component responsible for displaying the authentication screens. It includes:
    *   A landing screen with the application logo, an email input field, and a "Continue with Email" call-to-action (CTA).
    *   A magic link confirmation screen prompting the user to "Open Mail", with options to resend the link or use a different email.
    The view adheres to the application's design system, utilizing `mpBackground`, `mpAccent`, and custom fonts like Fraunces and Inter.

*   **AppFeature**: The root feature of the application. It implements authentication gating, displaying the `AuthView` when the user is unauthenticated and transitioning to a `TabView` (main application content) once authenticated. It also forwards incoming deep links to the `AuthFeature` for processing and manages the reset of authentication state upon user sign-out.

*   **MarkPushApp**: The application's main entry point, featuring an `.onOpenURL` handler specifically designed to capture and process `markpush://auth/callback` deep links, directing them to the `AppFeature`.

*   **Info.plist**: Configured to register the `markpush://` URL scheme, enabling the application to respond to specific incoming links. It also stores the necessary [[Supabase]] project credentials.

*   **SettingsFeature/View**: Integrates an "Account" section where the user's email is displayed. It also includes a "Sign Out" button, complete with a loading state, allowing users to end their session.

## Related

[[MarkPush]],[[Supabase]],[[The Composable Architecture (TCA)]],[[Deep Linking]],[[Session Management]]
