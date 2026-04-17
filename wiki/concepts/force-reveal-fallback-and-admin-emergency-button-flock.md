---
title: Force Reveal Fallback and Admin Emergency Button (Flock)
author: ai
created_at: 2026-04-10T17:07:19.071Z
last_ai_edit: 2026-04-10T17:07:19.071Z
last_human_edit: null
last_embedded_hash: 432b1a3887fc1073
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-force-reveal-fallback-admin-emergency-button-e68d77.md]]"
tags:
  - force-reveal
  - fallback
  - admin-tool
  - api
  - session-management
  - demo-reliability
  - flock
  - trip-decision
  - emergency-button
---


# Force Reveal Fallback and Admin Emergency Button (Flock)

This feature introduces a 'Force Reveal' mechanism within the Flock application, providing both an API endpoint and an admin button. It guarantees that trip decision revelations always occur during demos, serving as a critical fallback if automated finalization processes fail or time out.

## Key Concepts

Force Reveal API,Admin Emergency Button,Trip Decision Reveal,Session Negotiation,Mediator Tool,Fallback Mechanism,Personalized User Cards,Itinerary Generation

## Details

This commit (SHA: `8996f38`), authored by Rahil Singhi on 2026-03-21, implements a robust "Force Reveal" mechanism within the `rahilsinghi/Flock` application. This feature ensures that a trip decision reveal always occurs, which is crucial for demo reliability, even if automated processes like the mediator's `finalize_trip` tool encounter issues.

### POST /api/session/force-reveal Endpoint
This API endpoint facilitates the immediate generation and display of a trip decision:
-   It utilizes a pre-built Lisbon trip decision, complete with a real hotel photo and a 5-day itinerary (e.g., Alfama, Mercado, Sintra, Comporta, LX Factory).
-   The system automatically generates personalized user cards for each participant in the current session.
-   Each user card displays: a match percentage, items won, items traded, and a surprise line.
-   Upon execution, the `trip_decision` is written to the session data, prompting the host page to poll for updates and trigger the reveal animation.

### Admin Page Integration
An "amber" colored "Force Reveal" button is integrated into the admin interface:
-   This button becomes visible when a session is either in the negotiating phase or has completed.
-   It serves as a direct fallback for scenarios where the `mediator` fails to call `finalize_trip`.
-   A single click on this button triggers the same pre-built trip decision and reveal animation as the API endpoint.

### Purpose
The primary goal of this feature is to enhance the reliability of the demo experience by providing a guaranteed reveal mechanism. It acts as a safety net against potential mediator timeouts or failures in the automated trip finalization process, ensuring a smooth and consistent user journey.

## Related

[[Flock (Project)]],[[Session Management (Flock)]],[[Mediator Tool]],[[Trip Decision]],[[API Endpoints]],[[Admin Interface]],[[Rahil Singhi]]
