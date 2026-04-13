---
title: iOS Authentication Flow with Supabase Magic Link Login
author: ai
created_at: 2026-04-13T17:12:27.104Z
last_ai_edit: 2026-04-13T17:12:27.104Z
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

# iOS Authentication Flow with Supabase Magic Link Login

This article details the implementation of an iOS authentication flow for the [[MarkPush]] application using Supabase's magic link login feature. It leverages [[The Composable Architecture]] (TCA) to manage authentication state and deep linking, providing a secure and streamlined user login experience.

## Key Concepts

[[Supabase]] Authentication,Magic Link Login,[[The Composable Architecture]] (TCA),[[Deep Linking]],iOS State Machine for Authentication,AuthClient,AuthFeature,AuthView,AppFeature

## Details

This feature, implemented in the `rahilsinghi/MarkPush` repository (SHA: `d43897a`), establishes a robust iOS authentication system using Supabase magic links. The architecture is modular, relying on [[The Composable Architecture]] (TCA) for state management and clear separation of concerns.

### Core Components:

*   **AuthClient**: A TCA dependency that encapsulates all interactions with Supabase authentication services. It includes methods for `signInWithOTP` (sending magic links), `handleDeepLink` (processing incoming authentication links), `restoreSession`, and `signOut`. This client securely reads Supabase credentials (`SupabaseURL`, `SupabaseAnonKey`) from the application's `Info.plist`.

*   **AuthFeature**: This component manages the authentication state using a 4-step state machine:
    1.  `checking`: Initial state to determine current authentication status.
    2.  `landing`: User input for email.
    3.  `magicLinkSent`: After a magic link has been sent.
    4.  `authenticated`: User is successfully logged in.
    It handles email validation, sending OTPs (magic links), processing deep link callbacks, session restoration, resending magic links, and error handling during the authentication process.

*   **AuthView**: The user interface for the authentication flow. It presents a landing screen with a logo, email input field, and a 'Continue with Email' call-to-action (CTA). After a magic link is sent, it displays a confirmation screen prompting the user to 'Open Mail', with options to resend the link or use a different email. The design adheres to the application's [[Design System]], utilizing `mpBackground`, `mpAccent`, and custom fonts like Fraunces and Inter.

*   **AppFeature**: The root feature of the application, responsible for [[Authentication Gating]]. It determines whether to display the `AuthView` (when unauthenticated) or the `TabView` (when authenticated). It also forwards incoming deep links to the `AuthFeature` for processing and manages resetting the authentication state upon user sign out.

*   **MarkPushApp**: The main application entry point, configured with an `.onOpenURL` handler to capture and process `markpush://auth/callback` [[markpush://auth/callback URL Scheme]] deep links, directing them to the appropriate authentication logic.

*   **Info.plist**: Configured to include the custom `markpush://` URL scheme necessary for deep link handling and stores the required Supabase project credentials (`SupabaseURL`, `SupabaseAnonKey`).

*   **SettingsFeature/View**: Integrates an 'Account' section within the application settings. This section displays the authenticated user's email and provides a 'Sign Out' button, which includes a loading state to indicate ongoing sign-out operations.

## Related

[[MarkPush]],[[The Composable Architecture]],[[Supabase]],[[Deep Linking]],[[Info.plist]],[[Design System]],[[Authentication Gating]],[[State Machine]],[[SettingsFeature/View]],[[markpush://auth/callback URL Scheme]],[[Rahil Singhi]]
