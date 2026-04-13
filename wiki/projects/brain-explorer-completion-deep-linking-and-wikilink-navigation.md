---
title: "Brain Explorer Completion: Deep-Linking and Wikilink Navigation"
author: ai
created_at: 2026-04-12T22:26:07.316Z
last_ai_edit: 2026-04-12T22:26:07.316Z
last_human_edit: null
last_embedded_hash: 1b94d28ef12e8368
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-complete-brain-explorer-deep-linking-wikilin-edcc50.md]]"
tags:
  - brain-explorer
  - deep-linking
  - wikilinks
  - navigation
  - frontend
  - react
  - three.js
  - r3f
  - graphview
  - userexperience
---


# Brain Explorer Completion: Deep-Linking and Wikilink Navigation

This commit marks the completion of key navigation features in the Brain Explorer, including deep-linking via a `?focus=` URL parameter and integrated wikilink navigation. The `GraphView` component now handles all rendering and event logic, while `page.tsx` serves as a thin, dynamically imported wrapper to prevent server-side rendering issues with the R3F Canvas.

## Key Concepts

Deep-Linking,Wikilink Navigation,GraphView (Component),R3F Canvas,Server-Side Rendering (SSR),CustomEvent,User Interface (UI)

## Details

The `Brain Explorer` project, specifically the `rahilsinghi/brain-explorer` repository, has reached a significant milestone with the completion of its core navigation and rendering logic. The `GraphView` component is now central to this functionality, encapsulating all necessary hooks, effects, and rendering logic. It supports deep-linking by synchronizing with a `?focus=` URL parameter, allowing direct access to specific nodes within the graph.

Furthermore, `GraphView` includes a listener for a `brain:focus` CustomEvent, which enables seamless navigation triggered by wikilinks. Users can clear the current focus and return to an unfocused state by pressing the `Esc` key. The `page.tsx` file has been optimized to function as a thin, dynamically imported wrapper (`ssr: false`), preventing potential issues where the `R3F Canvas` might fail during the prerendering phase, thus ensuring robust client-side rendering of the interactive graph.

## Related

[[Brain Explorer Completion: Deep-Linking and Wikilink Navigation]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[Brain Explorer: Deep-Linking and Wikilink Event Implementation]],[[Brain Explorer Update: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Brain-Explorer: Spec Compliance - Wikilink Rendering, Palette Filters, and Code Cleanup]],[[Brain Explorer: Node Position Reading, Simulation Tick, and Drag Support]],[[Brain-Explorer v1.2: Force Simulation & Node Dragging Design Specification]],[[Brain-Explorer UI Fixes: Solid Backgrounds and Softer Glow]],[[Camera Controller with Arc Fly-to, Tooltips, and Esc to Clear Focus (Brain-Explorer)]],[[Camera Control Enhancement in Brain-Explorer: Disable FlyTo and Orbit During Drag]],[[Brain-Explorer]]
