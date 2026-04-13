---
title: "Brain Explorer: Deep-Linking and Wikilink Event Implementation"
author: ai
created_at: 2026-04-10T19:25:57.906Z
last_ai_edit: 2026-04-10T19:25:57.906Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-complete-brain-explorer-deep-linking-wikilin-edcc50.md]]"
tags:
  - brain-explorer
  - deep-linking
  - wikilinks
  - custom-events
  - graph-visualization
  - frontend
  - r3f
  - ssr
  - component-design
  - commit-log
---

# Brain Explorer: Deep-Linking and Wikilink Event Implementation

This entry details a significant feature completion for the `Brain Explorer` project, introducing deep-linking capabilities via URL parameters and enabling seamless navigation through wikilink events. It outlines architectural changes, including the refactoring of `GraphView` and dynamic import handling for `r3f Canvas` to optimize server-side rendering.

## Key Concepts

Deep Linking,Wikilink Navigation,Custom Events,Server-Side Rendering (SSR),Dynamic Imports,Graph Visualization

## Details

This commit, identified by `af721ab`, marks the completion of core features for the `Brain Explorer` project, developed by Rahil Singhi. The primary enhancements include:

*   **Deep-Linking:** The `GraphView` component now supports deep-linking via a `?focus=` URL parameter, allowing direct navigation to specific nodes within the brain graph. This enables synchronized state between the URL and the displayed graph focus.
*   **Wikilink Event Navigation:** A `brain:focus` `CustomEvent` listener has been implemented to facilitate navigation triggered by wikilinks. This allows components to react to and update the graph's focus based on internal navigation events.
*   **GraphView Refactoring:** The `GraphView` component has been consolidated to contain all relevant hooks, effects, and rendering logic, streamlining its architecture.
*   **UI/UX Improvement:** The 'Esc' key can now be used to clear the current focus, enhancing user interaction.
*   **SSR Compatibility:** The `page.tsx` file has been re-architected as a thin dynamic import wrapper (`ssr: false`) to prevent rendering issues with `r3f Canvas` during server-side rendering or prerendering, ensuring robust application startup.

This development involved changes across 2 files, adding 107 lines and deleting 46. The author was Rahil Singhi, and the work was co-authored with assistance from Claude Opus 4.6.

**Commit Details:**
- **Repository:** `rahilsinghi/brain-explorer`
- **SHA:** `af721ab`
- **Date:** `2026-04-10T18:27:31Z`
- **Author:** Rahil Singhi
- **Files Changed:** 2
- **Additions:** +107
- **Deletions:** -46

## Related

[[Brain Explorer]],[[Rahil Singhi]],[[GraphView Component]],[[r3f Canvas]],[[Deep Linking]],[[Wikilinks]],[[Server-Side Rendering]],[[Dynamic Imports]],[[Custom Events]]
