---
title: "Flock API: Session Lifecycle and Agent Streaming"
author: ai
created_at: 2026-04-12T21:21:03.602Z
last_ai_edit: 2026-04-12T21:21:03.602Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-all-8-api-routes-for-session-lifecycle-and-agent-streami-bee619.md]]"
tags:
  - api
  - flock
  - session management
  - agent streaming
  - multi-agent system
  - backend
  - voice input
  - trip planning
  - ai sdk
  - pgvector
---

# Flock API: Session Lifecycle and Agent Streaming

This commit introduces 8 core API routes to the Flock project, managing the complete session lifecycle from user context compilation and session creation to multi-agent streaming and final trip decision output. It leverages AI SDK for agent streaming and pgvector for hotel similarity searches, facilitating a dynamic, interactive travel planning experience.

## Key Concepts

API Routes,Session Management,Agent Streaming,Multi-Agent System,User Context,Voice Input Processing,pgvector,AI SDK,Trip Decision

## Details

This feature commit (SHA: `e20b2f4`) for the [[Flock Project]] establishes 8 critical API routes that orchestrate the entire session lifecycle and facilitate multi-agent streaming interactions. The implementation involves a total of 606 additions across 8 files, with no deletions, indicating a significant expansion of the project's backend capabilities.

The API routes cover the following functionalities:

*   **`POST /api/context/voice`**: Compiles voice input from the user into a `personal_context.md` file, which is likely used to tailor subsequent agent interactions.
*   **`GET /api/context/[userId]`**: Fetches a specific user's profile and associated aesthetic tags, providing personalized data for the session.
*   **`POST /api/session/create`**: Initiates a new session, generates a unique room code, and sets up the session environment.
*   **`POST /api/session/join`**: Allows a participant to join an existing session by taking a snapshot of their context, assigning them a color, and integrating them into the session.
*   **`POST /api/session/round`**: Validates a 'gate' (likely a stage or requirement) and streams responses from a 'personal agent' to the user. This route is designed to auto-trigger the mediator agent once all participants complete 'Round 3'.
*   **`POST /api/session/mediate`**: Streams responses from a 'mediator agent' after all personal agents have completed their respective rounds, suggesting a collaborative or consensus-building phase.
*   **`GET /api/hotels/match`**: Utilizes `pgvector` for efficient hotel similarity searches, a crucial component for travel recommendation within the project.
*   **`POST /api/output/reveal`**: Generates and reveals the final trip decision and accompanying narration texts, marking the conclusion of the planning process.

Both the `round` and `mediate` routes employ [[AI SDK]] for streaming responses, ensuring a dynamic and interactive user experience. The system is designed to automatically transition to the mediator phase once all participants have completed the third round of interaction with their personal agents.

This commit was co-authored with [[Claude (LLM)]] (specifically, Claude Opus 4.6 with 1M context), highlighting the use of advanced AI in the development process.

## Related

[[Flock Project]],[[AI SDK]],[[pgvector]],[[Claude (LLM)]]
