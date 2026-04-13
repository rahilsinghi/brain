---
title: iOS Authentication Flow with Supabase Magic Link in MarkPush
author: ai
created_at: 2026-04-12T21:19:52.541Z
last_ai_edit: 2026-04-12T21:19:52.541Z
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
  - deeplink
  - state machine
  - markpush
---

# iOS Authentication Flow with Supabase Magic Link in MarkPush

This document outlines the implementation of an iOS authentication flow within the MarkPush project, utilizing Supabase's magic link feature. It details the architecture, including an AuthClient wrapping Supabase, a 4-step state machine (AuthFeature), and a dedicated AuthView for user interaction.

## Key Concepts

Supabase Magic Link Authentication,The Composable Architecture (TCA),Deep Linking,iOS Development,State Machine,Email Validation,Session Management

## Details

This feature introduces a robust iOS authentication system for the [[MarkPush]] project, leveraging Supabase for magic link logins.

### AuthClient
This component serves as a [[TCA]] dependency, wrapping Supabase Authentication functionalities. It provides methods such as `signInWithOTP`, `handleDeepLink`, `restoreSession`, and `signOut`. Crucially, it reads Supabase project credentials (URL and anonymous key) from the `Info.plist`.

### AuthFeature
At the core of the authentication logic is a 4-step state machine:
1.  **Checking**: Initial state to determine current authentication status.
2.  **Landing**: Presents the initial login screen.
3.  **MagicLinkSent**: Indicates that a magic link email has been dispatched.
4.  **Authenticated**: The user has successfully logged in.
This feature handles email validation, sending OTPs, processing deep link callbacks, restoring user sessions, resending magic links, and managing error states.

### AuthView
The user interface for authentication includes:
*   A landing screen featuring the app's logo, an email input field, and a "Continue with Email" call-to-action (CTA).
*   A magic link confirmation screen, prompting the user to "Open Mail" and providing options to resend the link or use a different email.
The view adheres to the project's design system, utilizing `mpBackground`, `mpAccent` colors, and `Fraunces`, `Inter` fonts.

### AppFeature
The root `AppFeature` orchestrates authentication gating:
*   It conditionally displays the `AuthView` when the user is unauthenticated.
*   Upon successful authentication, it presents the main `TabView`.
*   Deep links are forwarded to the `AuthFeature` for processing.
*   It ensures that the authentication state is reset upon user sign-out.

### MarkPushApp
The main application entry point, `MarkPushApp`, includes an `.onOpenURL` handler specifically configured to intercept `markpush://auth/callback` deep links, crucial for completing the magic link flow.

### Info.plist
Configuration is stored in `Info.plist`, defining the `markpush://` URL scheme for deep linking and embedding the Supabase project credentials.

### SettingsFeature/View
A dedicated section within the settings displays the user's email address and provides a "Sign Out" button, complete with a loading state to indicate ongoing operations.

## Related

[[Client and Feed Cleanup (MarkPush, 9ae0944)]],[[Client and Feed Cleanup in MarkPush (9ae0944)]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[Branded CLI Output and Polished MCP Tool Responses in MarkPush]],[[MarkPush]]
