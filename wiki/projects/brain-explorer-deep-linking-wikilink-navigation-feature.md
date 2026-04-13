---
title: "Brain Explorer: Deep-Linking & Wikilink Navigation Feature"
author: ai
created_at: 2026-04-10T19:26:17.529Z
last_ai_edit: 2026-04-10T19:26:17.529Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-complete-brain-explorer-deep-linking-wikilin-edcc50.md]]"
tags:
  - brain explorer
  - deep-linking
  - wikilinks
  - frontend
  - react
  - r3f
  - ssr
  - dynamic imports
  - commit
  - feature
---

# Brain Explorer: Deep-Linking & Wikilink Navigation Feature

This commit completes major features for the Brain Explorer project, introducing robust deep-linking capabilities with URL parameter synchronization and enhanced wikilink navigation via custom events. It also refactors the `page.tsx` component to dynamically import the `r3f Canvas`, preventing server-side rendering issues.

## Key Concepts

Deep-linking,Wikilink navigation,Custom Events,Server-Side Rendering (SSR),Dynamic Imports,r3f Canvas,GraphView (component)

## Details

This commit (`SHA: af721ab`), authored by [[Rahil Singhi]] on 2026-04-10, marks a significant feature completion for the [[Brain Explorer]] project (repository: `rahilsinghi/brain-explorer`).

Key enhancements include:
-   **`GraphView` Centralization:** The `GraphView` component now consolidates all necessary hooks, effects, and rendering logic to support new navigation capabilities.
    -   **Deep-linking:** Implemented support for deep-linking by synchronizing the focused element with a `?focus=` URL parameter, allowing direct navigation to specific nodes.
    -   **Wikilink Navigation:** A `brain:focus` CustomEvent listener has been integrated to facilitate seamless navigation when a wikilink is activated within the application.
    -   **Interaction:** Users can now press 'Esc' to clear the currently focused element.
-   **`page.tsx` Refactor:** The `page.tsx` component has been transformed into a thin dynamic import wrapper. This change, specifically utilizing `ssr: false`, prevents the `r3f Canvas` (from React Three Fiber) from causing failures during the server-side prerender phase, improving application stability.

This commit involved changes to 2 files, resulting in 107 additions and 46 deletions.

Co-authored by [[Claude Opus 4.6]].

## Related

[[Brain Explorer]],[[Rahil Singhi]],[[Claude Opus 4.6]]
