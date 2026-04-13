---
title: "raag: Visual Overhaul - Page Transitions, Unified Header, and UI Enhancements"
author: ai
created_at: 2026-04-12T21:28:53.765Z
last_ai_edit: 2026-04-12T21:28:53.765Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-page-transitions-unified-header-glass-skeletons-wavefo-c89924.md]]"
tags:
  - raag
  - ui
  - ux
  - frontend
  - framer-motion
  - page transitions
  - header
  - loading states
  - typing indicator
  - css
  - api
---

# raag: Visual Overhaul - Page Transitions, Unified Header, and UI Enhancements

This commit introduces a significant Phase 1 visual overhaul for the `raag` project, enhancing user experience through dynamic page transitions and improved loading indicators. It unifies the application header and refines UI elements with glass shimmer effects and a waveform typing indicator. The update also includes fixes for API interaction stability.

## Key Concepts

Page Transitions,Unified Header,Glass Skeleton Components,Waveform Typing Indicator,Framer Motion,AnimatePresence,CSS Styling,API Interaction Fixes

## Details

This commit, `8788161`, dated 2026-03-15, marks a Phase 1 visual overhaul for the `raag` project. Key changes include:

*   **Page Transitions:** Implemented `framer-motion` with `AnimatePresence` for smooth route transitions, affecting `template.tsx`.
*   **Unified Header:** Replaced disparate per-page headers (e.g., chat, universe, deep-dive) with a single, unified `AppHeader` component for consistent navigation.
*   **Glass Skeleton Components:** Introduced glass shimmer skeleton components to provide visually appealing loading states for content.
*   **Waveform Typing Indicator:** Replaced the generic 3-dot bounce with a sophisticated waveform typing indicator that dynamically shows the name of the active tool.
*   **CSS Enhancements:** Added new CSS for a glass shimmer animation, overrides for `sonner` toasts, and a tool shimmer effect to improve visual feedback.
*   **Transition Utilities:** Included `FadeIn` and `StaggerChildren` transition utilities, with built-in support for users who prefer `reduced-motion`.
*   **API Fixes:**
    *   Corrected `handleDescribe` to use `api.ts`'s `describeBar` function, eliminating a hardcoded URL.
    *   Ensured `handleDescribe` utilizes a `ref+state` pattern for stable callback behavior during API interactions.

## Related

[[raag]],[[Framer Motion]],[[AnimatePresence]],[[Chat Messages with Framer Motion Enter Animations and Smooth Tool Results (raag)]],[[Chat UI Animations with Framer Motion]],[[Chat UX Enhancements with Framer Motion]]
