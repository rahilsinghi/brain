---
title: MarkPush Design System and Supabase Authentication Implementation
author: ai
created_at: 2026-04-10T17:28:11.748Z
last_ai_edit: 2026-04-10T17:28:11.748Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-phase-1-design-system-phase-2-supabase-auth-backend-f84465.md]]"
tags:
  - design system
  - ios
  - swiftui
  - supabase
  - authentication
  - rls
  - typography
  - color palette
  - ui components
  - markpush
  - database schema
  - beta whitelist
  - markdownui
  - mobile app development
---

# MarkPush Design System and Supabase Authentication Implementation

This commit introduces a comprehensive iOS design system for MarkPush, featuring custom typography, adaptive color palettes, and redesigned UI components. Concurrently, it implements a robust Supabase authentication backend with Row Level Security (RLS), profile management, and a beta whitelist, preparing the application for user authentication and push notification capabilities.

## Key Concepts

Custom Fonts (Fraunces, Playfair Display, Lora, Inter, JetBrains Mono),Variable TTF files,Semantic Typography Styles (MPFont),Consistent Spacing/Radius Constants,Adaptive Color Palette (Light/Dark mode),Color Asset Catalog,DocCard redesign,FeedView improvements,ReaderView enhancements (reading progress, custom MarkdownUI theme),CodeBlockView with copy functionality,Supabase Authentication,Row Level Security (RLS) policies,User Profile Management,Device Management,Push Token Management,Beta Whitelist Functionality,Database Triggers,Database Indexes,Seed Data

## Details

This commit (`3ade875`) by Rahil Singhi on 2026-03-17 significantly advances the MarkPush project by integrating a new iOS design system and a Supabase-powered authentication backend.

### Design System (iOS)

TheA comprehensive design system has been implemented for the iOS application, focusing on typography, color, spacing, and core UI components:

*   **Custom Fonts**: Integration of custom fonts including Fraunces, Playfair Display, Lora, Inter, and JetBrains Mono. These are utilized as variable TTF files sourced from Google Fonts, adhering to the SIL OFL license.
*   **Color Palette**: A `Colors.swift` file defines a full palette from the design specification, including a warm parchment background, a deep indigo accent, and specific colors for source badges. This palette is adaptive for both light and dark modes.
    *   A color asset catalog manages six core adaptive colors: `mpBackground`, `mpSurface`, `mpAccent`, `mpAccentSecondary`, `mpTextPrimary`, `mpTextSecondary`.
*   **Typography System**: `Typography.swift` introduces an `MPFont` system with semantic styles such as `appTitle`, `readerH1`, `cardTitle`, `body`, `code`, `metadata`, and `sectionHeader`.
*   **Spacing & Radius**: `Spacing.swift` provides consistent constants for UI spacing and element radii, ensuring a uniform look and feel.
*   **UI Components & Views**:
    *   **DocCard**: Redesigned to feature an unread accent bar, a pinned star indicator, source badges with palette colors, and tag pills using the '#' prefix.
    *   **FeedView**: Updated with a warm parchment background, a custom title, and a `ScrollView` + `LazyVStack` layout for efficient content display, alongside context menus.
    *   **ReaderView**: Enhanced with a reading progress bar, a custom `MarkdownUI` theme styled with the new palette colors, and well-defined code blocks and blockquotes.
    *   **ReadingProgressBar**: A thin, animated indicator to show reading progress.
    *   **CodeBlockView**: Presents code blocks with a dark background, a copy button, and a language label for improved user interaction.

### Supabase Auth Backend

The authentication system has been migrated and enhanced using Supabase, focusing on robust user management and security:

*   **Schema & RLS**: The `002_auth_beta.sql` migration introduces critical tables: `beta_whitelist`, `profiles`, `devices`, and `push_tokens`. Each of these tables is secured with comprehensive Row Level Security (RLS) policies.
*   **User Provisioning**: An automatic profile creation trigger is implemented to fire upon `auth.users` `INSERT` events, ensuring that a profile is created for every new user.
*   **Beta Whitelist**: A dedicated function for checking against a beta whitelist has been developed, designed to be called from Supabase Edge Functions or Auth Hooks to control application access.
*   **Authentication Flexibility**: RLS policies for `pushes` have been updated to support both legacy `device_id`-based authentication and modern JWT (JSON Web Token) authentication methods.
*   **Performance Optimization**: Database indexes are added on `user_id`, `email`, and `device_id` columns to improve query performance.
*   **Initial Data**: A `seed.sql` file provides an initial `beta_whitelist` email for testing and setup purposes.

## Related

[[MarkPush]],[[Supabase]],[[iOS Design System]],[[Row Level Security (RLS)]]
