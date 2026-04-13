---
title: "Flock API: Session Lifecycle and Agent Streaming"
author: ai
created_at: 2026-04-10T17:10:26.368Z
last_ai_edit: 2026-04-10T17:10:26.368Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-all-8-api-routes-for-session-lifecycle-and-agent-streami-bee619.md]]"
tags:
  - api
  - flock
  - session
  - streaming
  - agent
  - context
  - voice
  - pgvector
  - ai sdk
  - backend
---

# Flock API: Session Lifecycle and Agent Streaming

This document outlines the implementation of eight key API routes for the Flock project, focusing on managing user sessions, handling personal context, and orchestrating agent streaming. These endpoints facilitate voice input processing, user profile fetching, session creation and joining, personal agent streaming, mediator agent streaming, hotel similarity search, and final trip decision output.

## Key Concepts

POST /api/context/voice: Voice input compilation to personal_context.md,GET /api/context/[userId]: User profile and aesthetic tags retrieval,POST /api/session/create: Room code generation and session initialization,POST /api/session/join: Context snapshot, color assignment, and session entry,POST /api/session/round: Gate validation and personal agent streaming,POST /api/session/mediate: Mediator agent streaming after all agents are ready,GET /api/hotels/match: pgvector-based hotel similarity search,POST /api/output/reveal: Trip decision and narration text generation

## Details

This commit (`e20b2f4`) to the `rahilsinghi/Flock` repository, authored by Rahil Singhi on 2026-03-21, introduced eight new API routes crucial for the Flock project's core functionality. The changes involved 8 files, adding 606 lines of code without any deletions.

### Implemented API Routes:

1.  **`POST /api/context/voice`**: This endpoint is responsible for processing voice input and compiling it into `personal_context.md`, likely converting spoken words into structured contextual data for a user's session.
2.  **`GET /api/context/[userId]`**: Allows for fetching a specific user's profile information, including any associated aesthetic tags, which might influence personalized recommendations or agent behavior.
3.  **`POST /api/session/create`**: Initiates a new session by generating a unique room code and setting up the session's initial state, ready for participants to join.
4.  **`POST /api/session/join`**: Enables a user to join an existing session. Upon joining, it snapshots their current context, assigns them a unique color for identification within the session, and officially registers their participation.
5.  **`POST /api/session/round`**: This critical endpoint validates access gates (e.g., ensuring participation requirements are met) and then streams responses from a personal agent for the user. It leverages AI SDK streaming for real-time interaction.
6.  **`POST /api/session/mediate`**: After all participants have completed their respective 'Round 3' (as described below), this endpoint triggers and streams responses from a mediator agent. This agent likely synthesizes information or guides the group towards a consensus.
7.  **`GET /api/hotels/match`**: Utilizes `pgvector` for performing a similarity search on hotel data, enabling the system to find hotels that match specific criteria or preferences based on vector embeddings.
8.  **`POST /api/output/reveal`**: The final step in the trip planning process, this route generates and reveals the trip decision along with accompanying narration texts, summarizing the outcome of the session.

### Key Features:

*   **AI SDK Streaming:** Both the `/api/session/round` and `/api/session/mediate` routes utilize AI SDK streaming responses, enabling dynamic, real-time agent interactions.
*   **Automated Mediation Trigger:** The mediator agent is automatically triggered via `/api/session/mediate` once all participants in a session have completed 'Round 3' of their individual agent interactions.

## Related

[[Flock Project]],[[AI SDK Streaming]],[[Personal Agent]],[[Mediator Agent]],[[pgvector]],[[Context Management]],[[Session Management]]
