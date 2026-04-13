---
title: "Flock Live Room Overhaul: Polling, Participant List, Admin Start"
author: ai
created_at: 2026-04-10T17:16:40.730Z
last_ai_edit: 2026-04-10T17:16:40.730Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-live-room-overhaul-polling-participant-list-admin-st-6f8692.md]]"
tags:
  - flock
  - live room
  - polling
  - participants
  - admin control
  - frontend
  - backend
  - api
  - commit
  - feature
  - ux
  - rahil singhi
---

# Flock Live Room Overhaul: Polling, Participant List, Admin Start

This commit details a significant overhaul of the live room functionality within the Flock application. Key changes include the implementation of polling for real-time participant lists and session states across all views, removal of auto-advance for rounds, and introduction of explicit admin control for starting Round 1. The update enhances user experience on phone, host, and admin pages, providing clearer visibility of session status and participant readiness.

## Key Concepts

Polling (for real-time data updates),Live Participant List,Admin Control (over game progression),Session States (Lobby, Round N, Complete),API Endpoints (session management),Realtime Subscriptions (supplemented by polling)

## Details

This feature (`feat: live room overhaul`) introduces substantial changes to how live sessions are managed and displayed in the Flock application.

**Commit Details:**
*   **Repo:** `rahilsinghi/Flock`
*   **SHA:** `2098ccc`
*   **Date:** `2026-03-21T17:17:07Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 6
*   **Additions:** +411
*   **Deletions:** -202
*   **Co-Authored-By:** Claude Opus 4.6 (1M context) <noreply@anthropic.com>

**Core Changes:**
*   **Round Start Control:** Removed automatic advancement on join. The administrator now explicitly controls when Round 1 begins via a "Start Round 1" button on the `/admin` page.
*   **New API Endpoint:** `POST /api/session/start` - Validates that at least 2 participants are present before initiating Round 1.
*   **New API Endpoint:** `GET /api/session/participants` - Returns the current session state along with a list of participants. This endpoint is crucial for polling across all client views to ensure up-to-date information.

**Phone Page (`/room/[code]` - Participant View):**
*   **Lobby Display:** Shows a live participant list, complete with colored dots and names, indicating who has joined.
*   **Real-time Updates:** Polls the `/api/session/participants` endpoint every 2 seconds to fetch the latest session and participant data.
*   **Status Message:** Displays "The host will start Round 1 when everyone is ready" during the lobby phase.
*   **Between Rounds:** Provides visibility into participant readiness, showing who has finished versus who is still working.

**Host Page (`/room/[code]/host`):**
*   **Reliable Updates:** Implemented a 3-second polling fallback mechanism to complement existing Realtime subscriptions, ensuring participants and session state update reliably.

**Admin Page (`/admin`):**
*   **Session Overview:** Displays a live participant count for each active session, polling every 2 seconds.
*   **Participant Details:** For each session, individual participants are listed with a colored dot, name, and current status.
*   **Start Round 1 Button:** A "Start Round 1 (N joined)" button is available, which remains disabled until a minimum of 2 participants have joined the session.
*   **Session Status Badge:** A clear badge indicates the current status of the session (e.g., `Lobby`, `Round N`, `Complete`).

## Related

[[Flock]],[[API Endpoints]],[[Realtime Subscriptions]],[[Admin Interface]],[[User Experience]]
