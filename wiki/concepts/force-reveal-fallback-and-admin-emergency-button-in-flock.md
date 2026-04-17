---
title: Force Reveal Fallback and Admin Emergency Button in Flock
author: ai
created_at: 2026-04-10T21:08:14.618Z
last_ai_edit: 2026-04-10T21:08:14.618Z
last_human_edit: null
last_embedded_hash: 18129a86c2a42df1
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-force-reveal-fallback-admin-emergency-button-e68d77.md]]"
tags:
  - force-reveal
  - admin-tool
  - api
  - error-handling
  - flock
  - demo-reliability
  - session-management
  - trip-decision
  - feature
---


# Force Reveal Fallback and Admin Emergency Button in Flock

This feature introduces a 'Force Reveal' mechanism within the Flock project, designed to guarantee a trip decision reveal during demonstrations. It comprises a new API endpoint and an admin emergency button, ensuring the demo's reliability even if automated mediator processes fail to finalize a trip.

## Key Concepts

Force Reveal,Admin Emergency Button,Trip Decision,Demo Reliability,Session Negotiation,API Endpoint

## Details

This commit (`8996f38`) by Rahil Singhi (co-authored by Claude Opus 4.6) implemented a crucial fallback mechanism for the Flock project to ensure demo reliability.

### `POST /api/session/force-reveal` Endpoint
This new API endpoint is designed to immediately create and trigger a trip decision reveal:
*   **Pre-built Trip Decision:** It generates a pre-defined Lisbon trip decision, complete with a real hotel photo.
*   **Itinerary:** A 5-day itinerary is included, covering key locations such as Alfama, Mercado, Sintra, Comporta, and LX Factory.
*   **Personalized User Cards:** The system automatically creates personalized user cards for all participants in the session.
*   **Card Details:** Each user card displays their match percentage, won items, traded items, and a surprise line.
*   **Reveal Trigger:** The `trip_decision` is written to the session, which the host page continuously polls to initiate the reveal animation.

### Admin Page Integration
An 'Admin page' feature complements the API endpoint:
*   **'Force Reveal' Button:** An amber-colored 'Force Reveal' button appears on the admin interface.
*   **Visibility:** This button becomes active and visible when a session is either in the 'negotiating' or 'complete' state.
*   **Fallback Purpose:** It serves as an emergency fallback, specifically for scenarios where the automated mediator times out or fails to call the `finalize_trip` tool.
*   **One-Click Activation:** A single click on this button triggers the pre-built trip decision, leading directly to the reveal animation.

### Purpose
The primary goal of this feature is to guarantee that the demo *always* concludes with a trip reveal. This prevents potential disruptions or failures in demonstrations caused by mediator timeouts or issues with the `finalize_trip` process, thereby significantly enhancing the reliability and robustness of the Flock demo environment.

### Attribution
*   **Repository:** `rahilsinghi/Flock`
*   **SHA:** `8996f38`
*   **Date:** `2026-03-21T19:48:49Z`
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Opus 4.6 (1M context) <noreply@anthropic.com>

## Related

[[Flock Project]],[[Rahil Singhi]],[[Session Management]],[[API Endpoints]],[[Error Handling]],[[Demo Procedures]]
