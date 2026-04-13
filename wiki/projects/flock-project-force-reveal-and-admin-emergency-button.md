---
title: "Flock Project: Force Reveal and Admin Emergency Button"
author: ai
created_at: 2026-04-12T17:12:53.290Z
last_ai_edit: 2026-04-12T17:12:53.290Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-force-reveal-fallback-admin-emergency-button-e68d77.md]]"
tags:
  - flock
  - api
  - admin
  - fallback
  - session
  - trip decision
  - feature
  - demo
  - error handling
---

# Flock Project: Force Reveal and Admin Emergency Button

This feature for the [[Flock Project]] introduces a `POST /api/session/force-reveal` endpoint and an 'Force Reveal' emergency button on the admin page. It guarantees that a pre-built trip decision and reveal animation will occur, even if the mediator agent fails to finalize the trip. This ensures a consistent demo experience.

## Key Concepts

[[Force Reveal]],[[Flock Project]],[[API Endpoint]],[[Admin Functionality]],[[Trip Decision]],[[Mediator Agent]],[[Fallback Mechanism]],[[Session Management]]

## Details

This enhancement for the [[Flock Project]] implements a robust fallback system to ensure the `trip_decision` and subsequent reveal animation always trigger, especially during demonstrations or in cases where the primary mediation process might fail or time out.

**`POST /api/session/force-reveal` Endpoint:**
This API endpoint is designed to programmatically force a trip reveal. When invoked, it generates a pre-built Lisbon trip decision, including:
- A realistic hotel photo.
- A 5-day itinerary covering key locations like Alfama, Mercado, Sintra, Comporta, and LX Factory.
- Automatically generates personalized user cards for each participant in the session. Each card is populated with match percentages, won items, traded items, and a unique surprise line.
- The generated `trip_decision` is then written to the active session object, prompting the host page to poll and display the reveal animation.

**Admin Page Emergency Button:**
An 'Force Reveal' button is strategically placed on the admin page. This amber-colored button becomes visible under specific conditions:
- When the session is in a 'negotiating' state.
- When the session is marked as 'complete'.
This button serves as a critical fallback mechanism, specifically addressing scenarios where the `mediator` agent might fail to call the `finalize_trip` tool. A single click on this button triggers the entire `force-reveal` process, immediately generating the pre-built trip decision and initiating the reveal animation for all participants.

## Related

[[Flock Project]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[Aishwarya Session Prompt Update – Flock Repo State (e98074d)]],[[Chore: Add QR Code for Judges (Flock Project)]],[[Chore: Remove @clerk/nextjs Dependency and Dynamic Agent Labels (Flock)]],[[API endpoints]],[[Admin Panel]],[[Session Management]]
