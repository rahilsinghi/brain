---
title: "MarkPush: iOS Design System and Supabase Authentication Backend"
author: ai
created_at: 2026-04-11T00:33:20.312Z
last_ai_edit: 2026-04-11T00:33:20.312Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-phase-1-design-system-phase-2-supabase-auth-backend-f84465.md]]"
tags:
  - markpush
  - ios
  - design-system
  - supabase
  - authentication
  - rls
  - fonts
  - ui
  - backend
  - commit
  - 2026-03-17
---

# MarkPush: iOS Design System and Supabase Authentication Backend

This commit introduces the foundational iOS design system for the MarkPush application, incorporating custom fonts, adaptive colors, and refined UI components. Concurrently, it implements a robust Supabase authentication backend, featuring RLS policies, user profile auto-creation, and a beta whitelist system for secure access.

## Key Concepts

Design System,Supabase Auth,Row Level Security (RLS),iOS Development,Custom Fonts,Adaptive Colors,MarkdownUI Theming,Beta Whitelist,JSON Web Token (JWT)

## Details

This significant commit (`3ade875`) for the [[MarkPush]] repository, authored by [[Rahil Singhi]] on March 17, 2026, encompasses the development of a comprehensive iOS design system and the integration of a [[Supabase]]-powered authentication backend.

### iOS Design System

The design system focuses on creating a consistent and branded user experience within the iOS application:

*   **Custom Fonts**: Integration of `Fraunces`, `Playfair Display`, `Lora`, `Inter`, and `JetBrains Mono` as variable TTF files from Google Fonts (SIL OFL licensed).
*   **Color Palette (`Colors.swift`)**: A complete palette derived from the design specification, including a warm parchment background, deep indigo accent, source badge colors, and adaptive light/dark modes.
*   **Typography (`Typography.swift`)**: Definition of `MPFont` with semantic styles such as `appTitle`, `readerH1`, `cardTitle`, `body`, `code`, `metadata`, and `sectionHeader`.
*   **Spacing (`Spacing.swift`)**: Establishment of consistent spacing and radius constants for UI elements.
*   **Color Asset Catalog**: Six adaptive colors (`mpBackground`, `mpSurface`, `mpAccent`, `mpAccentSecondary`, `mpTextPrimary`, `mpTextSecondary`) for theme consistency.
*   **UI Component Redesigns**:
    *   `DocCard`: Redesigned with an unread accent bar, pinned star, palette-colored source badges, and tag pills with a '#' prefix.
    *   `FeedView`: Features a warm parchment background, custom title, and a `ScrollView` + `LazyVStack` layout, along with context menus.
    *   `ReaderView`: Includes a reading progress bar and a custom [[MarkdownUI]] theme with specified palette colors, styled code blocks, and blockquotes.
    *   `ReadingProgressBar`: A thin, animated progress indicator.
    *   `CodeBlockView`: Dark background code blocks with a copy button and language label.

### Supabase Authentication Backend

The backend development focuses on secure and efficient user authentication and access control:

*   **Database Migrations (`002_auth_beta.sql`)**: Introduction of `beta_whitelist`, `profiles`, `devices`, and `push_tokens` tables, all secured with full [[Row Level Security (RLS)]] policies.
*   **Profile Auto-creation**: An automated trigger to create user profiles upon `auth.users` insertion.
*   **Beta Whitelist Check**: A function to verify beta access, intended for use by Edge Functions or Auth Hooks.
*   **RLS Policy Update**: `pushes` RLS policies updated to support both legacy `device_id` and [[JSON Web Token (JWT)]] authentication.
*   **Performance Indexes**: Indexes added to `user_id`, `email`, and `device_id` for improved database query performance.
*   **Initial Seed Data (`seed.sql`)**: Includes an initial beta whitelist email for testing and setup.

## Related

[[MarkPush]],[[Supabase]],[[Rahil Singhi]],[[Documentation for MarkPush MCP Server Plan and System Architecture]],[[E2E Backend + iOS Auth/Settings/App/Library Tests (MarkPush)]],[[Documentation Update for MarkPush: iOS Deployment, Transport, and Macro Trust]],[[MarkdownUI]]
