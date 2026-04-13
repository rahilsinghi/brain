---
title: "raag: UI Overhaul with Page Transitions, Unified Header, and Enhanced Loading States"
author: ai
created_at: 2026-04-13T15:41:30.351Z
last_ai_edit: 2026-04-13T15:41:30.351Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-page-transitions-unified-header-glass-skeletons-wavefo-c89924.md]]"
tags:
  - ui
  - ux
  - frontend
  - animations
  - framer-motion
  - loading states
  - header
  - raag
  - bugfix
  - api
---

# raag: UI Overhaul with Page Transitions, Unified Header, and Enhanced Loading States

This update introduces a significant visual overhaul to the `raag` project, implementing smooth page transitions using Framer Motion's AnimatePresence. It unifies the application's header across different views and enhances the user experience with new glass shimmer skeleton components for loading states and a dynamic waveform typing indicator.

## Key Concepts

Framer Motion,AnimatePresence,Page Transitions,Unified Header,Skeleton Loading Components,Waveform Typing Indicator,Reduced Motion Support,UI/UX Enhancements,API Refactoring

## Details

This commit represents Phase 1 of a major visual overhaul for the `raag` application, focusing on improving the user interface and experience. Key changes include:

*   **Page Transitions**: Integration of `framer-motion` with `AnimatePresence` for smooth route transitions, primarily affecting `template.tsx`.
*   **Unified Header**: Creation of a single `AppHeader` component to replace disparate headers previously used across `chat`, `universe`, and `deep-dive` sections, ensuring a consistent look and feel.
*   **Enhanced Loading States**: Introduction of `glass shimmer skeleton components` to provide visual feedback during data loading, improving perceived performance.
*   **Typing Indicator**: The traditional 3-dot bounce indicator has been replaced with a `waveform typing indicator` that dynamically displays the name of the active tool.
*   **CSS Enhancements**: Addition of styling for the glass shimmer animation, overrides for `sonner toast` notifications, and tool shimmer effects.
*   **Transition Utilities**: Implementation of `FadeIn` and `StaggerChildren` transition utilities, including support for users who prefer `reduced-motion`.
*   **API Fixes**: Rectification of `handleDescribe` to correctly use `api.ts`'s `describeBar` endpoint instead of a hardcoded URL, and adoption of a `ref+state pattern` for stable callback behavior.

## Related

[[raag]],[[Animated Login Modal and Chat Sidebar Transitions]],[[Unified AppHeader]],[[Glass Shimmer Skeleton Components]],[[Waveform Typing Indicator]]
