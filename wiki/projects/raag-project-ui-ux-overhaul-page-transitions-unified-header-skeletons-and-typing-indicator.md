---
title: "Raag Project UI/UX Overhaul: Page Transitions, Unified Header, Skeletons, and Typing Indicator"
author: ai
created_at: 2026-04-12T17:28:39.965Z
last_ai_edit: 2026-04-12T17:28:39.965Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-page-transitions-unified-header-glass-skeletons-wavefo-c89924.md]]"
tags:
  - ui/ux
  - raag
  - framer-motion
  - frontend
  - commit
  - visual overhaul
  - page transitions
  - header
  - skeletons
  - typing indicator
---

# Raag Project UI/UX Overhaul: Page Transitions, Unified Header, Skeletons, and Typing Indicator

This commit represents a significant Phase 1 visual overhaul for the `rahilsinghi/raag` project, introducing smooth page transitions using Framer Motion, a consolidated application header, and engaging loading states with 'glass shimmer' skeleton components. It also enhances user feedback with a waveform typing indicator that shows the active tool name.

## Key Concepts

[[Framer Motion]],[[Page Transitions]],[[Unified Header]],[[Skeleton Loading States]],[[Waveform Typing Indicator]],[[UI/UX Design]]

## Details

This commit, `8788161`, authored by Rahil Singhi on 2026-03-15, marks a comprehensive Phase 1 visual overhaul for the `rahilsinghi/raag` repository. Key enhancements include:

*   **Framer Motion Integration**: The project now utilizes `framer-motion` with `AnimatePresence` for fluid and engaging route transitions, applied via `template.tsx`.
*   **Unified Application Header**: A single `AppHeader` component replaces disparate per-page headers (e.g., chat, universe, deep-dive), ensuring a consistent navigation experience across the application.
*   **Glass Shimmer Skeletons**: New 'glass shimmer' skeleton components have been introduced to provide visually appealing loading states, improving perceived performance and user experience.
*   **Waveform Typing Indicator**: The traditional 3-dot bounce typing indicator has been upgraded to a dynamic waveform display that also shows the name of the active tool, offering more informative feedback to the user.
*   **CSS Enhancements**: Several CSS additions have been made, including a 'glass shimmer' animation, overrides for sonner toasts, and specific tool shimmer effects.
*   **Transition Utilities**: `FadeIn` and `StaggerChildren` transition utilities have been added, along with support for `reduced-motion` accessibility preferences.
*   **Bug Fixes**: A critical fix ensures that `handleDescribe` now correctly uses `api.ts`'s `describeBar` function instead of a hardcoded URL, improving API interaction stability. Another fix addresses the `ref+state` pattern for stable callbacks in `handleDescribe`.

The update involved changes to 15 files, with 837 additions and 147 deletions, signifying a substantial frontend refactoring.

## Related

[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[CLAP Encoder Compatibility and Lyrics Ingestion (raag eb48f40)]],[[Chat UI Animations with Framer Motion]],[[Chat UX Enhancements with Framer Motion]],[[CLAUDE.md Documentation Update: Page Flow, Theme System, and Key Files]],[[API Feature: POST /synthesise Endpoint with Robust Error Handling]]
