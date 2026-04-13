---
title: "Flock Project: Session Lifecycle and Agent Streaming API Routes"
author: ai
created_at: 2026-04-12T17:19:45.948Z
last_ai_edit: 2026-04-12T17:19:45.948Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-all-8-api-routes-for-session-lifecycle-and-agent-streami-bee619.md]]"
tags:
  - api
  - flock
  - backend
  - session management
  - agent streaming
  - ai sdk
  - pgvector
  - rest api
---

# Flock Project: Session Lifecycle and Agent Streaming API Routes

This commit (e20b2f4) for the [[Flock]] project introduces eight core API routes managing the full session lifecycle, from user context and session creation to agent streaming and output revelation. These routes facilitate the interaction between users, personal agents, and a mediator agent, utilizing AI SDK for streaming responses and pgvector for hotel matching.

## Key Concepts

API Routes,Session Management,Agent Streaming,Personal Context,Mediator Agent,AI SDK,pgvector,User Authentication

## Details

The `rahilsinghi/Flock` project's backend (`e20b2f4`) implements a comprehensive set of 8 API routes to manage the application's core functionality, including session lifecycle, user context, and AI agent interactions.

### API Endpoints:

*   `POST /api/context/voice`: Compiles voice input into a `personal_context.md` file, storing user-specific information.
*   `GET /api/context/[userId]`: Fetches a user's profile data along with aesthetic tags, likely for personalized experiences.
*   `POST /api/session/create`: Initiates a new session, generating a unique room code for participants.
*   `POST /api/session/join`: Allows users to join an existing session, snapping their current context and assigning a unique color for identification.
*   `POST /api/session/round`: Validates the gate (likely a stage or phase in the session) and streams responses from a personal agent to the user. This route uses [[AI SDK]] for streaming capabilities.
*   `POST /api/session/mediate`: Streams responses from a mediator agent once all personal agents have completed their respective rounds.
*   `GET /api/hotels/match`: Performs a hotel similarity search using [[pgvector]], suggesting relevant accommodations.
*   `POST /api/output/reveal`: Finalizes the session, revealing trip decisions and narration texts.

### Key Features:

*   **AI SDK Streaming**: Both `round` and `mediate` routes leverage [[AI SDK]] for real-time, streaming responses, enhancing user interaction and responsiveness.
*   **Automated Mediation**: The mediator agent is automatically triggered to stream its output once all participants have completed Round 3, ensuring a smooth transition in the session flow.

## Related

[[Flock]],[[AI SDK]],[[pgvector]],[[Add CLAUDE.md for Project Context and Session Persistence]],[[AskNYC Backend Hardening (ad6b409)]]
