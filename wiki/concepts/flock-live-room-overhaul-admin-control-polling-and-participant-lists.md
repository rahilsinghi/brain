---
title: "Flock Live Room Overhaul: Admin Control, Polling, and Participant Lists"
author: ai
created_at: 2026-04-10T21:16:47.226Z
last_ai_edit: 2026-04-10T21:16:47.226Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-live-room-overhaul-polling-participant-list-admin-st-6f8692.md]]"
tags:
  - flock
  - live room
  - admin control
  - polling
  - participant list
  - session management
  - api
  - frontend
  - backend
  - commit
---

# Flock Live Room Overhaul: Admin Control, Polling, and Participant Lists

This commit introduces a significant overhaul to the live room experience in Flock, shifting round progression from automatic to administrator-controlled. Key changes include a manual 'Start Round 1' button, real-time participant lists across all views, and new API endpoints to support session state and participant polling.

## Key Concepts

Administrator control for game progression,Real-time participant list display,API polling for session state and participants,Session management,Lobby and in-round participant status visualization

## Details

This update to the Flock project re-architects the live room experience, prioritizing administrator control and real-time participant visibility. The changes aim to provide a more controlled and informative game flow.

### Core Changes

*   **Manual Round Start:** The previous auto-advance mechanism upon participant join has been removed. Round 1 now begins only when an administrator explicitly clicks a "Start Round 1" button on the `/admin` page.
*   **New API Endpoint: `POST /api/session/start`:** This endpoint is responsible for validating that at least two participants are present before initiating Round 1.
*   **New API Endpoint: `GET /api/session/participants`:** This endpoint provides the current session state and a list of all participants. It is central to the new polling mechanism across various views.

### Page-Specific Updates

#### Phone Page (`/room/[code]`, Participant View)

*   **Live Lobby:** Participants in the lobby now see a dynamic list of other participants, complete with colored dots and names.
*   **Polling:** The phone page polls `GET /api/session/participants` every 2 seconds to update the participant list and session state.
*   **Lobby Message:** Displays a message indicating, "The host will start Round 1 when everyone is ready." 
*   **Between Rounds:** Provides visibility into who is 'ready' versus 'still working' during inter-round transitions.

#### Host Page (`/room/[code]/host`)

*   **Reliable Updates:** Implements a 3-second polling fallback alongside existing Realtime subscriptions to ensure participants and session state update reliably.

#### Admin Page (`/admin`)

*   **Live Session Overview:** Displays a live count of participants per session, updated every 2 seconds via polling.
*   **Detailed Participant List:** Each participant is shown with a colored dot, name, and current status.
*   **'Start Round 1' Button:** A dedicated button to initiate Round 1, which remains disabled until at least two participants have joined.
*   **Session Status Badge:** A visual badge indicating the current session status (e.g., `Lobby`, `Round N`, `Complete`).

**Co-Authored By:** [[Claude Opus 4.6]]

## Related

[[Flock]],[[Rahil Singhi]],[[API Endpoints]],[[Session Management]],[[Realtime Subscriptions]]
