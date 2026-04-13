---
title: MarkPush Phase 1 Design System and Phase 2 Supabase Auth Backend
author: ai
created_at: 2026-04-13T17:34:23.693Z
last_ai_edit: 2026-04-13T17:34:23.693Z
last_human_edit: null
last_embedded_hash: 1a67397343d323c2
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-phase-1-design-system-phase-2-supabase-auth-backend-f84465.md]]"
tags:
  - markpush
  - design system
  - supabase
  - authentication
  - ios
  - ui/ux
  - backend
  - database
  - security
  - development
---


# MarkPush Phase 1 Design System and Phase 2 Supabase Auth Backend

This article details the implementation of MarkPush's Phase 1 iOS design system, focusing on custom typography, adaptive colors, and core UI components. It also covers the Phase 2 Supabase authentication backend, including user profiles, device management, push token handling, and robust Role-Level Security (RLS) policies for enhanced user management and security.

## Key Concepts

Design System (iOS),Supabase Authentication,Role-Level Security (RLS),Adaptive UI (Light/Dark Mode),Semantic Typography,Custom Fonts,UI Components (DocCard, FeedView, ReaderView),MarkdownUI Theming,Beta Whitelisting,Push Notification Management,JWT Authentication

## Details

The MarkPush project saw significant development across its frontend and backend, encompassing a comprehensive iOS design system and a robust Supabase authentication backend.

### Phase 1 Design System (iOS)

The first phase focused on establishing a consistent and visually appealing user interface for the iOS application. Key aspects included:

*   **Custom Fonts:** Integration of variable TTF files from [[Google Fonts]] (SIL OFL licensed), including `Fraunces`, `Playfair Display`, `Lora`, `Inter`, and `JetBrains Mono`, to define the app's unique typographic voice.
*   **Color Palette:** Implementation of a full color palette in `Colors.swift`, featuring a warm parchment background, a deep indigo accent, specific source badge colors, and adaptive light/dark mode support.
*   **Typography System:** Definition of semantic text styles within `Typography.swift` (e.g., `appTitle`, `readerH1`, `cardTitle`, `body`, `code`, `metadata`, `sectionHeader`) via an `MPFont` struct for consistent application.
*   **Spacing and Radius Constants:** `Spacing.swift` was created to ensure uniform spacing and corner radii throughout the UI.
*   **Color Asset Catalog:** Six adaptive colors (`mpBackground`, `mpSurface`, `mpAccent`, `mpAccentSecondary`, `mpTextPrimary`, `mpTextSecondary`) were added to the asset catalog for easy management and system integration.
*   **DocCard Redesign:** A core UI component, the `DocCard`, was redesigned to feature an unread accent bar, a pinned star indicator, source badges with palette colors, and tag pills with a '#' prefix.
*   **FeedView:** The main feed adopted a warm parchment background, a custom title, a `ScrollView` and `LazyVStack` layout, and context menus for enhanced user interaction.
*   **ReaderView:** The article reader introduced a reading progress bar and utilized a custom [[MarkdownUI]] theme, incorporating the defined palette colors for styled code blocks and blockquotes.
*   **ReadingProgressBar:** A thin, animated progress indicator for tracking reading advancement.
*   **CodeBlockView:** Dedicated view for code blocks with a dark background, a copy button, and a language label.

### Phase 2 Supabase Auth Backend

The second phase established a secure and scalable authentication and user management system using [[Supabase]]. This involved:

*   **Database Schema (`002_auth_beta.sql`):** Creation of `beta_whitelist`, `profiles`, `devices`, and `push_tokens` tables. Crucially, these tables were secured with full [[Role-Level Security (RLS)]] policies to protect user data.
*   **Profile Auto-creation:** An automatic trigger was implemented to create a user profile in the `profiles` table upon a new user insertion into `auth.users`.
*   **Beta Whitelist Function:** A function was developed to check against the beta whitelist, intended for use by [[Supabase Edge Functions]] or Auth Hooks to control access.
*   **Updated Push RLS:** The [[Role-Level Security (RLS)]] for push notifications was updated to support both legacy `device_id` and [[JWT Authentication]] for increased flexibility and security.
*   **Performance Indexes:** Indexes were added to `user_id`, `email`, and `device_id` columns across relevant tables to optimize database query performance.
*   **Seed Data:** `seed.sql` was populated with an initial beta whitelist email for testing and setup.

## Related

[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[Supabase]],[[iOS Development]],[[Design System]],[[Role-Level Security (RLS)]],[[JWT Authentication]],[[MarkdownUI]],[[Google Fonts]],[[Supabase Edge Functions]]
