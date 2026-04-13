---
title: "MarkPush: Phase 1 Design System & Phase 2 Supabase Auth Backend"
author: ai
created_at: 2026-04-12T21:55:36.874Z
last_ai_edit: 2026-04-12T21:55:36.874Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-phase-1-design-system-phase-2-supabase-auth-backend-f84465.md]]"
tags:
  - markpush
  - design system
  - ios
  - supabase
  - authentication
  - rls
  - mobile development
  - ui/ux
  - database
  - fonts
  - colors
---

# MarkPush: Phase 1 Design System & Phase 2 Supabase Auth Backend

This commit details significant advancements for the MarkPush project, introducing a comprehensive iOS design system with custom typography and adaptive colors. Concurrently, it establishes a robust Supabase authentication backend, featuring Role-Level Security (RLS) policies, profile auto-creation, and beta whitelist functionality.

## Key Concepts

Design System,Supabase Authentication,Role-Level Security (RLS),iOS Development,Custom Fonts,Adaptive Colors,MarkdownUI Theme,Database Triggers,Edge Functions,Push Notifications

## Details

The commit for `rahilsinghi/MarkPush` (SHA: `3ade875`, Date: `2026-03-17`) describes two major development phases:

### Phase 1: iOS Design System
A comprehensive design system was implemented for the iOS application, focusing on visual consistency and user experience:
*   **Custom Fonts**: Integration of variable TTF files from Google Fonts (SIL OFL licensed), including Fraunces, Playfair Display, Lora, Inter, and JetBrains Mono.
*   **Color Palette**: Defined in `Colors.swift`, featuring a warm parchment background, deep indigo accent, source badge colors, and adaptive light/dark modes.
*   **Typography**: `Typography.swift` defines `MPFont` with semantic styles such as `appTitle`, `readerH1`, `cardTitle`, `body`, `code`, `metadata`, and `sectionHeader`.
*   **Spacing**: `Spacing.swift` establishes consistent spacing and radius constants.
*   **Color Asset Catalog**: Includes 6 adaptive colors: `mpBackground`, `mpSurface`, `mpAccent`, `mpAccentSecondary`, `mpTextPrimary`, `mpTextSecondary`.
*   **UI Components**:
    *   `DocCard`: Redesigned with an unread accent bar, pinned star, source badges with palette colors, and tag pills with a '#' prefix.
    *   `FeedView`: Features a warm parchment background, custom title, `ScrollView` + `LazyVStack` layout, and context menus.
    *   `ReaderView`: Includes a reading progress bar and a custom MarkdownUI theme with palette colors, styled code blocks, and blockquotes.
    *   `ReadingProgressBar`: A thin, animated progress indicator.
    *   `CodeBlockView`: Displays code blocks with a dark background, copy button, and language label.

### Phase 2: Supabase Auth Backend
A robust authentication backend was developed using Supabase, focusing on security and performance:
*   **Database Schema (`002_auth_beta.sql`)**: Introduces `beta_whitelist`, `profiles`, `devices`, and `push_tokens` tables, all secured with full Role-Level Security (RLS) policies.
*   **Profile Auto-creation**: A trigger automatically creates a user profile upon `INSERT` into `auth.users`.
*   **Beta Whitelist**: A function for checking the beta whitelist is implemented, intended for use with [[Edge Functions]] or Auth Hooks.
*   **Pushes RLS Update**: The Role-Level Security for [[Push Notifications]] was updated to support both legacy `device_id` and [[JWT authentication]].
*   **Performance Optimization**: Indexes were added on `user_id`, `email`, and `device_id` columns.
*   **Seed Data (`seed.sql`)**: An initial beta whitelist email was added.

## Related

[[MarkPush]],[[Supabase]],[[Design Systems]],[[iOS Development]],[[Role-Level Security]],[[Push Notifications]],[[Custom Fonts]],[[Adaptive Colors]],[[MarkdownUI]],[[Database Triggers]],[[Edge Functions]],[[JWT authentication]],Branded CLI Output and Polished MCP Tool Responses (MarkPush),Chore: Remove Implementation Plan from MarkPush Repository
