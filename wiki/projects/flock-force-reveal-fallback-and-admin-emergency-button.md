---
title: "Flock: Force Reveal Fallback and Admin Emergency Button"
author: ai
created_at: 2026-04-13T18:10:38.417Z
last_ai_edit: 2026-04-13T18:10:38.417Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-force-reveal-fallback-admin-emergency-button-e68d77.md]]"
tags:
  - flock
  - api
  - session management
  - admin tool
  - fallback
  - trip decision
  - feature
  - demo
---

# Flock: Force Reveal Fallback and Admin Emergency Button

This feature introduces a `/api/session/force-reveal` endpoint and an administrative 'Force Reveal' button within the [[Flock]] project. It enables the immediate generation and display of a pre-built Lisbon trip decision, complete with personalized user cards. This mechanism serves as a crucial fallback to ensure the reveal animation always triggers, particularly for demonstrations, even if the automated mediator process fails.

## Key Concepts

Force Reveal Mechanism,Admin Emergency Functionality,Session Management,Trip Decision Generation,Fallback System,API Endpoint

## Details

This enhancement for the [[Flock]] project addresses the need for a guaranteed trip decision 'reveal' animation, especially in demonstration environments, by providing a manual override. It mitigates scenarios where the automated [[Mediator]] might fail to finalize a trip decision.

### `POST /api/session/force-reveal` Endpoint

This dedicated `POST` endpoint, when activated, performs the following:

*   **Pre-built Trip Decision**: Generates a pre-defined Lisbon trip decision, including a realistic hotel photo and a 5-day itinerary (e.g., Alfama, Mercado, Sintra, Comporta, LX Factory).
*   **Personalized User Cards**: Automatically creates personalized user cards for each participant in the current session. Each card displays:
    *   A match percentage.
    *   Items won.
    *   Items traded.
    *   A unique 'surprise line'.
*   **Session Update**: The generated `trip_decision` is written to the active session state. The host page then polls this session data to trigger and display the reveal animation.

### Admin Page Integration

*   **'Force Reveal' Button**: An amber-colored 'Force Reveal' button is added to the [[Admin Refresh and Graph Metadata Display|admin page]].
*   **Conditional Visibility**: This button becomes visible and active when a session is in either a `negotiating` or `complete` state.
*   **Manual Fallback**: It acts as a critical manual fallback, specifically designed for situations where the automated [[Mediator]] system times out or otherwise fails to successfully invoke the `finalize_trip` tool.
*   **Instant Trigger**: A single click on this button initiates the pre-built trip decision generation process via the `/api/session/force-reveal` endpoint and immediately triggers the reveal animation, thereby ensuring the demo's continuity.

## Related

[[Flock]],[[API Server Factory with Graceful Drain]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[Admin Refresh and Graph Metadata Display]],[[Mediator]]
