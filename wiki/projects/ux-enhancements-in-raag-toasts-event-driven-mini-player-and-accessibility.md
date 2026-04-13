---
title: "UX Enhancements in Raag: Toasts, Event-Driven Mini Player, and Accessibility"
author: ai
created_at: 2026-04-12T21:26:54.124Z
last_ai_edit: 2026-04-12T21:26:54.124Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-ux-polish-toasts-mini-player-event-driven-accessibili-252687.md]]"
tags:
  - ux
  - polish
  - toasts
  - event-driven
  - accessibility
  - raag
  - spotify
  - ui
  - frontend
  - animations
---

# UX Enhancements in Raag: Toasts, Event-Driven Mini Player, and Accessibility

This commit introduced significant user experience improvements to the Raag application, focusing on real-time feedback, interactive controls, and broader accessibility. Key updates include the integration of Sonner toast notifications, a rewrite of the Spotify Mini Player to be event-driven, and enhancements for keyboard navigation and reduced motion preferences.

## Key Concepts

Sonner toast notifications,Event-driven architecture,Accessibility enhancements (prefers-reduced-motion, focus-visible),UI animations (slide-up/slide-down, ESC dismiss),Font integration (Noto Sans Devanagari),CSS styling (scroll-mask, disabled cursor),Spotify SDK integration

## Details

This feature commit focused on a comprehensive polish of the user experience within the [[raag]] application. A primary addition was the integration of Sonner toast notifications to provide clear and timely feedback for chat errors, Spotify events, and graph-related issues. The [[SpotifyMiniPlayer]] component was completely rewritten to leverage an event-driven state model directly from the Spotify SDK, enhancing its responsiveness and reliability.

Accessibility was significantly improved through several measures, including the addition of the Noto Sans Devanagari font for proper display of Hindi lyrics, and styling for `prefers-reduced-motion` to cater to users with motion sensitivities. Keyboard navigation was enhanced with `focus-visible` styling. The `NodeDetailPanel` now features an ESC dismiss functionality and exit animations for a smoother interaction flow. Visual polish was added with a scroll-mask to the `TimelineView` and general slide-up/slide-down CSS animations across the application. Finally, a disabled cursor style was implemented for the chat input when it's not active or usable.

## Related

[[raag — Git Activity]],[[Animated Login Modal and Chat Sidebar Transitions (raag)]],[[Chat History Feature (raag)]],[[Chat Messages with Framer Motion Enter Animations and Smooth Tool Results (raag)]],[[Chat UI Improvements: Bar Chunks, Grid Layout, and Universe Linking (raag)]],[[SpotifyMiniPlayer]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]]
