---
title: iOS Auth Flow with Supabase Magic Link Login (MarkPush)
author: ai
created_at: 2026-04-10T02:56:07.121Z
last_ai_edit: 2026-04-10T02:56:07.121Z
last_human_edit: null
last_embedded_hash: b54713bdae7c27c4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-ios-auth-flow-with-supabase-magic-link-login-cd7669.md]]"
tags:
  - ios
  - swift
  - supabase
  - authentication
  - magic-link
  - otp
  - tca
  - composable-architecture
  - deep-links
  - swiftui
  - markpush
  - passwordless
  - session-management
---


# iOS Auth Flow with Supabase Magic Link Login (MarkPush)

This commit implements a full authentication flow for the MarkPush iOS app using Supabase magic link (OTP) login. It introduces a TCA-based AuthFeature with a 4-step state machine, an AuthClient dependency wrapping Supabase Auth, and supporting UI screens for landing and magic link confirmation. Auth gating is applied at the app root, toggling between an authenticated TabView and unauthenticated AuthView.

## Key Concepts

- **Magic Link Authentication**: Passwordless login via a one-time-use email link (OTP), handled through Supabase Auth
- **TCA (The Composable Architecture)**: State management pattern used to model AuthFeature as a finite state machine with side effects
- **AuthClient Dependency**: A TCA dependency wrapper around Supabase Auth, exposing `signInWithOTP`, `handleDeepLink`, `restoreSession`, and `signOut`
- **4-Step Auth State Machine**: States progress through `checking → landing → magicLinkSent → authenticated`
- **Deep Link Handling**: Custom URL scheme `markpush://auth/callback` used to receive magic link callbacks from the mail client
- **Auth Gating**: Root `AppFeature` conditionally renders `AuthView` or `TabView` based on authentication state
- **Session Restore**: On app launch, the auth state checks for an existing Supabase session before showing the landing screen
- **Design System**: Uses custom tokens (`mpBackground`, `mpAccent`) and typography (`Fraunces`, `Inter`) for consistent UI

## Details

## Overview

Commit `d43897a` in the `rahilsinghi/MarkPush` repository (authored 2026-03-17 by Rahil Singhi) adds a complete iOS authentication flow powered by Supabase magic link login. The change spans 12 files with +620 additions and -40 deletions.

---

## Components

### AuthClient
- A TCA dependency that wraps Supabase Auth SDK calls
- Exposes four async operations: `signInWithOTP`, `handleDeepLink`, `restoreSession`, `signOut`
- Reads `SupabaseURL` and `SupabaseAnonKey` from `Info.plist` for configuration

### AuthFeature
- Implements a 4-step state machine:
  1. **checking** — Attempts to restore an existing session on launch
  2. **landing** — Displays the email input screen for unauthenticated users
  3. **magicLinkSent** — Shown after OTP is dispatched; prompts user to check email
  4. **authenticated** — Session confirmed; app transitions to main TabView
- Handles: email validation, OTP send, deep link callback parsing, session restore, resend logic, and error states

### AuthView
- **Landing Screen**: Displays app logo, email text input, and a "Continue with Email" CTA button
- **Magic Link Confirmation Screen**: Provides "Open Mail", "Resend", and "Use Other Email" actions
- Styled using the MarkPush design system (`mpBackground`, `mpAccent`, `Fraunces`, `Inter` fonts)

### AppFeature
- Acts as the root feature; gates access based on auth state
- Renders `AuthView` when unauthenticated, `TabView` when authenticated
- Forwards deep link URLs to `AuthFeature` for processing
- Resets auth state upon sign out

### MarkPushApp
- Registers `.onOpenURL` handler to intercept `markpush://auth/callback` deep links and route them through the TCA store

### Info.plist
- Declares the `markpush://` custom URL scheme
- Stores Supabase project credentials (`SupabaseURL`, `SupabaseAnonKey`)

### SettingsFeature / SettingsView
- Adds an **Account** section displaying the authenticated user's email
- Includes a **Sign Out** button with a loading/in-progress state

---

## Data Flow

```
App Launch
  └─ AppFeature dispatches restoreSession
       ├─ Session found → authenticated state → TabView
       └─ No session → landing state → AuthView

Email Submitted
  └─ signInWithOTP called → magicLinkSent state

User taps magic link in Mail
  └─ markpush://auth/callback deep link fired
       └─ MarkPushApp.onOpenURL → AppFeature → AuthFeature.handleDeepLink
            └─ Session confirmed → authenticated state
```

---

## Configuration

| Key | Source |
|---|---|
| `SupabaseURL` | `Info.plist` |
| `SupabaseAnonKey` | `Info.plist` |
| URL Scheme | `markpush://` (registered in `Info.plist`) |

## Related

- [[Supabase Authentication]]
- [[The Composable Architecture (TCA)]]
- [[Magic Link / Passwordless Login]]
- [[Deep Link Handling in iOS]]
- [[MarkPush iOS App]]
- [[Session Management]]
- [[SwiftUI Design Systems]]
- [[One-Time Password (OTP)]]
- [[AppFeature Root Architecture]]
