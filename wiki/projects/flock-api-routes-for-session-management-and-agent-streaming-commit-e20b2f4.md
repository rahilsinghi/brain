---
title: Flock API Routes for Session Management and Agent Streaming (Commit e20b2f4)
author: ai
created_at: 2026-04-10T21:11:41.659Z
last_ai_edit: 2026-04-10T21:11:41.659Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-all-8-api-routes-for-session-lifecycle-and-agent-streami-bee619.md]]"
tags:
  - api
  - routes
  - flock
  - session
  - streaming
  - ai
  - agent
  - context
  - voice
  - mediation
  - hotels
  - pgvector
  - commit
  - e20b2f4
  - rahil singhi
  - claude opus
---

# Flock API Routes for Session Management and Agent Streaming (Commit e20b2f4)

This document details the 8 core API routes implemented in the `rahilsinghi/Flock` project, focusing on session lifecycle and agent streaming capabilities. These routes facilitate tasks from compiling voice input and managing user context to creating sessions, streaming agent responses, mediating interactions, and performing hotel similarity searches, culminating in a trip decision.

## Key Concepts

API Routes,Session Lifecycle,Agent Streaming,Voice Input Processing,Personal Context Management,User Profile & Aesthetic Tags,Room Code Generation,Context Snapshotting,Gate Validation,Mediator Agent,AI SDK Streaming,`pgvector` Hotel Similarity Search,Trip Decision & Narration

## Details

This commit (`e20b2f4`) introduces a comprehensive set of 8 API routes designed to manage the full lifecycle of a user session within the `Flock` application, including dynamic agent interactions and external service integrations.

### API Routes

1.  **`POST /api/context/voice`**
    *   **Function:** Compiles voice input into a `personal_context.md` file, establishing the user's personal context.
2.  **`GET /api/context/[userId]`**
    *   **Function:** Fetches a user's profile and associated aesthetic tags for context.
3.  **`POST /api/session/create`**
    *   **Function:** Generates a unique room code and initializes a new session.
4.  **`POST /api/session/join`**
    *   **Function:** Snapshots the current context, assigns a color to the participant, and allows them to join an existing session.
5.  **`POST /api/session/round`**
    *   **Function:** Validates a gate condition and streams responses from a personal agent. This route utilizes AI SDK for streaming capabilities.
6.  **`POST /api/session/mediate`**
    *   **Function:** Streams responses from a mediator agent after all individual agents are ready. This route also uses AI SDK streaming.
7.  **`GET /api/hotels/match`**
    *   **Function:** Performs a hotel similarity search using `pgvector` for efficient matching based on contextual criteria.
8.  **`POST /api/output/reveal`**
    *   **Function:** Finalizes the process by revealing the trip decision and associated narration texts.

### Key Features

*   **AI SDK Streaming:** Both the `/api/session/round` and `/api/session/mediate` routes leverage the AI SDK to provide streaming responses, enhancing real-time interaction.
*   **Automated Mediation:** The mediator agent is automatically triggered via `/api/session/mediate` once all participants have completed 'Round 3' within a session.

### Commit Information

*   **Repository:** `rahilsinghi/Flock`
*   **SHA:** `e20b2f4`
*   **Date:** 2026-03-21T14:23:44Z
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Opus 4.6 (1M context)
*   **Files changed:** 8
*   **Additions:** +606 lines
*   **Deletions:** -0 lines

## Related

[[Flock (Project)]],[[AI SDK]],[[pgvector]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[Session Management]],[[Agent Streaming]],[[Personal Context]],[[Mediator (Flock)]],[[Hotel Matching]]
