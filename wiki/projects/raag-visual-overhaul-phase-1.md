---
title: Raag Visual Overhaul (Phase 1)
author: ai
created_at: 2026-04-10T22:10:34.831Z
last_ai_edit: 2026-04-10T22:10:34.831Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-page-transitions-unified-header-glass-skeletons-wavefo-c89924.md]]"
tags:
  - raag
  - visual overhaul
  - ui/ux
  - framer motion
  - page transitions
  - header
  - skeletons
  - typing indicator
  - commit
  - development
  - frontend
  - css
  - animation
---

# Raag Visual Overhaul (Phase 1)

This commit marks the first phase of a significant visual overhaul for the Raag project. It introduces dynamic page transitions using Framer Motion, establishes a unified application header, and enhances loading states with glass shimmer skeletons. Additionally, the typing indicator is upgraded to a waveform display, showing the active tool name for improved user feedback.

## Key Concepts

Page Transitions,Unified Header,Glass Shimmer Skeletons,Waveform Typing Indicator,Framer Motion,AnimatePresence,CSS Animations,Reduced Motion Support,API Integration Fixes,Stable Callback Patterns

## Details

This entry documents the `feat: page transitions, unified header, glass skeletons, waveform typing indicator` commit in the `rahilsinghi/raag` repository.

### Commit Details
- **Repo:** rahilsinghi/raag
- **SHA:** 8788161
- **Date:** 2026-03-15T20:04:24Z
- **Author:** [[Rahil Singhi]]
- **Files changed:** 15
- **Additions:** +837
- **Deletions:** -147

### Phase 1 Visual Overhaul Enhancements

This phase focuses on a comprehensive refresh of the user interface and experience:

- **Dynamic Route Transitions:** Integration of [[Framer Motion]] with `AnimatePresence` for smooth and engaging page transitions across routes (implemented in `template.tsx`).
- **Unified Application Header:** Replacement of disparate per-page headers (`chat`, `universe`, `deep-dive`) with a single, consistent `AppHeader` to improve navigation and visual coherence.
- **Enhanced Loading States:** Introduction of visually appealing glass shimmer skeleton components to provide better feedback during data loading.
- **Improved Typing Indicator:** The traditional 3-dot bounce indicator is replaced by a dynamic waveform animation, which now also displays the name of the active tool, offering clearer user context.
- **New CSS Additions:**
    - Glass shimmer animation styles.
    - Overrides for sonner toast notifications.
    - Tool shimmer effects.
- **Transition Utilities:** Implementation of `FadeIn` and `StaggerChildren` transition utilities, ensuring accessibility with built-in `reduced-motion` support.
- **Bug Fixes and Refinements:**
    - **API Integration:** Corrected the `handleDescribe` function to utilize `api.ts`'s `describeBar` endpoint, moving away from a hardcoded URL.
    - **Callback Stability:** Addressed a potential issue in `handleDescribe` by implementing a `ref` and `state` pattern to ensure stable callback behavior.

## Related

[[raag]],[[Rahil Singhi]],[[Framer Motion]],[[UI/UX Design]],[[Frontend Development]]
