---
title: "Flock Project: Force Reveal Fallback and Admin Emergency Button"
author: ai
created_at: 2026-04-13T15:15:34.950Z
last_ai_edit: 2026-04-13T15:15:34.950Z
last_human_edit: null
last_embedded_hash: 32767a15159e5bc3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-force-reveal-fallback-admin-emergency-button-e68d77.md]]"
tags:
  - flock
  - api
  - fallback
  - admin
  - demo
  - reveal
  - session
  - trip decision
  - emergency
  - itinerary
---


# Flock Project: Force Reveal Fallback and Admin Emergency Button

This feature introduces a 'force-reveal' mechanism in the Flock project, ensuring that a pre-built Lisbon trip decision is always presented during a demo, even if the automated mediator fails. It includes a new API endpoint for triggering the reveal and an admin emergency button for manual activation, generating personalized user cards and a 5-day itinerary.

## Key Concepts

Force Reveal,Admin Emergency Button,Trip Decision,Session Negotiation,Mediator Fallback,Personalized User Cards,API Endpoint

## Details

This enhancement to the [[Flock Project]] introduces a robust fallback mechanism to ensure the successful demonstration of trip reveals. The core of this feature is the `POST /api/session/force-reveal` endpoint, designed to generate and present a pre-built Lisbon trip decision.

### `POST /api/session/force-reveal` Endpoint Functionality:
*   **Pre-built Trip Decision**: Provides a detailed 5-day itinerary for Lisbon, including key attractions like Alfama, Mercado, Sintra, Comporta, and LX Factory, complete with a real hotel photo.
*   **Personalized User Cards**: Automatically generates custom user cards for each participant in the session. Each card displays a match percentage, won items, traded items, and a unique 'surprise line'.
*   **Session Integration**: Writes the generated `trip_decision` to the current session, which the host page then polls to trigger the reveal animation.

### Admin Page Integration:
An **Admin Emergency Button**, labeled "Force Reveal" and visually amber, has been added to the [[Admin Interface]]. This button becomes visible when a session is either in the negotiating phase or has completed, serving as a critical fallback.

*   **One-Click Activation**: A single click on this button triggers the `force-reveal` process, activating the pre-built trip decision and initiating the reveal animation.

### Purpose:
This feature guarantees that the [[Flock Project]] demo will **always** have a trip reveal, mitigating potential failures where the automated [[Mediator]] might time out or fail to invoke the `finalize_trip` tool. It acts as a safety net, ensuring a smooth and predictable demonstration experience.

## Related

[[Flock Project]],[[Admin Interface]],[[Mediator]],[[finalize_trip tool]],[[Session Management]],[[API Endpoints]]
