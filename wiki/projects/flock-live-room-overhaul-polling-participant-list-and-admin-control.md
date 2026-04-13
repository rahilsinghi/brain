---
title: "Flock Live Room Overhaul: Polling, Participant List, and Admin Control"
author: ai
created_at: 2026-04-12T21:30:39.816Z
last_ai_edit: 2026-04-12T21:30:39.816Z
last_human_edit: null
last_embedded_hash: d20cea5dd95313e8
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-live-room-overhaul-polling-participant-list-admin-st-6f8692.md]]"
tags:
  - flock
  - realtime
  - polling
  - admin
  - session management
  - multiplayer
  - collaboration
  - api
---


# Flock Live Room Overhaul: Polling, Participant List, and Admin Control

This update significantly refactors the live room functionality in the Flock project, removing auto-advance on join and empowering the admin to manually start Round 1. It introduces robust polling mechanisms for live participant lists and session state updates across phone, host, and admin interfaces, ensuring better session management and real-time visibility.

## Key Concepts

Polling,Realtime Subscriptions,Admin Control,Participant List,Session Management,API Endpoints

## Details

This commit (`2098ccc`) introduces a comprehensive overhaul of the live room experience within the [[Flock]] project, focusing on enhanced admin control and real-time data synchronization.

**Core Changes:**
*   **Admin-Controlled Round Start:** The system no longer automatically advances to Round 1 upon participants joining. An administrator must now explicitly initiate Round 1 using a 'Start Round 1' button available on the `/admin` page.
*   **New API Endpoints:**
    *   `POST /api/session/start`: Validates that a minimum of two participants are present before commencing Round 1.
    *   `GET /api/session/participants`: Provides the current session state along with a comprehensive list of participants. This endpoint is crucial for real-time polling across all client views.

**Phone Page (`/room/[code]`):**
*   **Live Lobby:** Displays a dynamic list of participants, each indicated by a colored dot and their name.
*   **Real-time Updates:** Continuously polls the `GET /api/session/participants` endpoint every 2 seconds to keep the participant list and session state current.
*   **Waiting Message:** In the lobby, users see a message indicating, "The host will start Round 1 when everyone is ready."
*   **Between Rounds View:** Shows the readiness status of participants (who is ready vs. still working) during inter-round periods.

**Host Page (`/room/[code]/host`):**
*   **Enhanced Reliability:** Incorporates a 3-second polling fallback mechanism to complement existing [[Realtime subscriptions]], ensuring robust updates of participants and session state.

**Admin Page (`/admin`):**
*   **Live Session Overview:** Displays a real-time count of participants for each active session, updated via polling every 2 seconds.
*   **Detailed Participant List:** Each participant is shown with a colored dot, name, and current status.
*   **Round Start Button:** A "Start Round 1 (N joined)" button is available, which remains disabled until at least two participants have joined the session.
*   **Session Status Badge:** A clear badge indicates the current status of the session (e.g., Lobby, Round N, Complete).

## Related

[[Flock]],[[Session Management]],[[API Feature: POST /synthesise Endpoint with Robust Error Handling]],[[API Feature: GET /health Route with Status, Uptime, and Article Counts]],[[Realtime Subscriptions]],[[Admin Control]],[[Polling]],[[Claude Opus 4.6]]
