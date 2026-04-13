---
title: iOS Auth Flow with Supabase Magic Link Login (MarkPush)
author: ai
created_at: 2026-04-12T17:18:36.521Z
last_ai_edit: 2026-04-12T17:18:36.521Z
last_human_edit: null
last_embedded_hash: cb90e08c87314dd4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-ios-auth-flow-with-supabase-magic-link-login-cd7669.md]]"
tags:
  - ios
  - authentication
  - supabase
  - magiclink
  - tca
  - deeplinking
  - markpush
  - swiftui
---


# iOS Auth Flow with Supabase Magic Link Login (MarkPush)

This feature introduces an iOS authentication flow for the MarkPush application using Supabase magic links. It involves a robust state machine, email validation, deep link handling, and session management, integrated seamlessly with the app's core features.

## Key Concepts

[[Supabase]],[[Magic Link Authentication]],[[The Composable Architecture (TCA)]],[[Deep Linking]],[[State Machines]],[[iOS Development]]

## Details

This implementation details the integration of a user authentication flow into the MarkPush iOS application, leveraging Supabase for backend services and a magic link login mechanism. The architecture is built around several key components:

*   **AuthClient**: This component acts as a wrapper around the Supabase authentication client. It is implemented as a The Composable Architecture (TCA) dependency, providing functionalities such as `signInWithOTP`, `handleDeepLink`, `restoreSession`, and `signOut`. It securely retrieves Supabase credentials (URL and anonymous key) from `Info.plist`.

*   **AuthFeature**: This feature module manages the entire authentication state as a 4-step state machine:
    1.  `checking`: Initial state, often verifying an existing session.
    2.  `landing`: User input for email.
    3.  `magicLinkSent`: After an OTP is sent, awaiting user action.
    4.  `authenticated`: User is successfully logged in.
    Key actions handled include email validation, sending OTPs, processing deep link callbacks, session restoration, resend mechanisms, and comprehensive error handling.

*   **AuthView**: This is the user interface for the authentication process, designed with the application's branding. It includes:
    *   A landing screen featuring the application logo, an email input field, and a "Continue with Email" call-to-action (CTA).
    *   A magic link confirmation screen, prompting the user to "Open Mail" and offering options to resend the link or use a different email. It utilizes the app's design system, including `mpBackground`, `mpAccent`, and custom fonts like Fraunces and Inter.

*   **AppFeature**: The root feature of the application, responsible for authentication gating. It conditionally presents the `AuthView` when the user is unauthenticated and switches to the `TabView` once authenticated. It also forwards incoming deep links to the `AuthFeature` for processing and resets the authentication state upon user sign-out.

*   **MarkPushApp**: The main application entry point, which includes an `.onOpenURL` handler specifically configured to intercept `markpush://auth/callback` deep links.

*   **Info.plist**: Configured to register the `markpush://` URL scheme and store the necessary Supabase project credentials (URL and anonymous key).

*   **SettingsFeature/View**: Provides an account management section within the application settings. It displays the user's email address and includes a "Sign Out" button with a visible loading state during the sign-out process.

## Related

[[MarkPush]],[[Add .coverage and htmlcov to Gitignore]],[[API: Embedded HTTP Server with Graceful Shutdown]],[[Chore: Set Turbopack Root for Consistent Monorepo Compilation]],[[CLAUDE.md Update: E2E Findings, Transport Decisions, and npm Publish Status in MarkPush]],[[Client and Feed Cleanup (MarkPush, 9ae0944)]],[[Commit e4c9e16: MarkPush Project Screenshots]],[[Commit: Add MarkPush Project Screenshots]],[[SwiftUI]]
