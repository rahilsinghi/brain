---
title: iOS Authentication Flow with Supabase Magic Link
author: ai
created_at: 2026-04-10T17:10:04.224Z
last_ai_edit: 2026-04-10T17:10:04.224Z
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
  - deep link
  - state machine
  - swift
  - markpush
---

# iOS Authentication Flow with Supabase Magic Link

This article details the implementation of an iOS authentication flow for the MarkPush app, leveraging Supabase magic links. It outlines a modular architecture using The Composable Architecture (TCA) to manage authentication states, UI components, and deep link handling for a seamless user login experience.

## Key Concepts

Supabase,Magic Link Authentication,The Composable Architecture (TCA),Deep Linking,State Machine,One-Time Password (OTP),Info.plist configuration,URL Scheme

## Details

This document describes the iOS authentication flow implemented within the `rahilsinghi/MarkPush` project (SHA: `d43897a`), utilizing Supabase's magic link login. The architecture, authored by Rahil Singhi on 2026-03-17, is built with The Composable Architecture (TCA) and is structured into several distinct components:

*   **AuthClient**: A TCA dependency responsible for wrapping Supabase Authentication functionalities. It provides methods such as `signInWithOTP`, `handleDeepLink`, `restoreSession`, and `signOut`. This client securely reads Supabase project credentials (URL and anonymous key) from `Info.plist`.

*   **AuthFeature**: Manages the authentication logic as a 4-step state machine: `checking` → `landing` → `magicLinkSent` → `authenticated`. It handles email validation, sending OTPs, processing deep link callbacks, restoring user sessions, managing resend mechanisms, and error handling during the authentication process.

*   **AuthView**: The user interface component for authentication. It includes a landing screen with a logo, email input, and a "Continue with Email" call-to-action (CTA). A separate magic link confirmation screen is displayed after an email is sent, prompting the user to "Open Mail," offering a resend option, or allowing them to "use other email." The UI adheres to a defined design system, incorporating elements like `mpBackground`, `mpAccent`, `Fraunces` (font), and `Inter` (font).

*   **AppFeature**: The root feature that governs authentication gating for the entire application. It displays the `AuthView` when the user is unauthenticated and switches to a `TabView` once authenticated. It's also responsible for forwarding incoming deep links to the `AuthFeature` for processing and for resetting the authentication state upon user sign-out.

*   **MarkPushApp**: Contains the `.onOpenURL` handler, which intercepts `markpush://auth/callback` deep links to facilitate the magic link authentication flow.

*   **Info.plist**: Configured to define the `markpush://` URL scheme, enabling deep link recognition, and to store the Supabase project credentials required by the `AuthClient`.

*   **SettingsFeature/View**: Incorporates an "Account" section where the user's email is displayed. It also provides a "Sign Out" button, which includes a loading state to indicate ongoing operations.

## Related

[[Supabase]],[[The Composable Architecture]],[[Deep Linking]],[[iOS Development]],[[Authentication]]
