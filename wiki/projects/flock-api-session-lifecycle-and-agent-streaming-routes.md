---
title: "Flock API: Session Lifecycle and Agent Streaming Routes"
author: ai
created_at: 2026-04-10T03:01:18.930Z
last_ai_edit: 2026-04-10T03:01:18.930Z
last_human_edit: null
last_embedded_hash: 9482ce54e34591f8
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-all-8-api-routes-for-session-lifecycle-and-agent-streami-bee619.md]]"
tags:
  - api
  - streaming
  - session-management
  - ai-agents
  - pgvector
  - flock
  - next.js
  - voice-input
  - hotel-matching
  - mediation
  - multi-agent
  - ai-sdk
---


# Flock API: Session Lifecycle and Agent Streaming Routes

This commit introduces all 8 API routes powering the Flock application's session lifecycle and AI agent streaming functionality. The routes cover the full flow from voice context ingestion and user profiling through collaborative session management, AI-mediated rounds, hotel matching, and final trip decision output. Round and mediate routes leverage AI SDK streaming responses with automatic mediator triggering.

## Key Concepts

- **Voice Context Compilation:** POST `/api/context/voice` transforms voice input into a structured `personal_context.md` file
- **User Profile Fetching:** GET `/api/context/[userId]` retrieves user profile data and aesthetic preference tags
- **Session Creation:** POST `/api/session/create` generates a unique room code and initializes the session
- **Session Joining:** POST `/api/session/join` snapshots participant context, assigns a color identity, and adds the user to the session
- **Agent Streaming (Round):** POST `/api/session/round` validates a participation gate and streams a personalized AI agent response
- **Mediator Streaming:** POST `/api/session/mediate` streams a mediator agent response after all participant agents are ready
- **Hotel Similarity Search:** GET `/api/hotels/match` uses pgvector for semantic/vector-based hotel matching
- **Output Reveal:** POST `/api/output/reveal` delivers the final trip decision alongside narration texts
- **Auto-Trigger Logic:** Round route automatically triggers the mediator when all participants complete Round 3
- **AI SDK Streaming:** Both round and mediate routes use streaming HTTP responses via the AI SDK

## Details

## Overview

Commit `e20b2f4` in the `rahilsinghi/Flock` repository (authored 2026-03-21) introduces 8 new API routes totaling +606 lines of additions across 8 files. This represents the complete backend surface area for the Flock session lifecycle and multi-agent AI streaming system.

## Route Reference

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/context/voice` | Compile voice input into `personal_context.md` |
| GET | `/api/context/[userId]` | Fetch user profile and aesthetic tags |
| POST | `/api/session/create` | Generate room code, create session |
| POST | `/api/session/join` | Snapshot context, assign color, join session |
| POST | `/api/session/round` | Validate gate, stream personal agent |
| POST | `/api/session/mediate` | Stream mediator after all agents ready |
| GET | `/api/hotels/match` | pgvector hotel similarity search |
| POST | `/api/output/reveal` | Trip decision + narration texts |

## Session Lifecycle Flow

1. **Context Ingestion:** A participant submits voice input via `/api/context/voice`, which is compiled into a structured markdown context file. Their profile and aesthetic preferences are retrievable via `/api/context/[userId]`.
2. **Session Initialization:** A host calls `/api/session/create` to generate a room code. Participants join via `/api/session/join`, which snapshots their current context and assigns them a unique color identifier.
3. **Agent Rounds:** Each participant triggers `/api/session/round`, which validates a gate condition before streaming a personalized AI agent response. Upon all participants completing Round 3, the mediator is automatically triggered.
4. **Mediation:** `/api/session/mediate` streams a synthesizing mediator agent that reconciles all participant agent outputs.
5. **Hotel Matching:** `/api/hotels/match` performs a pgvector-powered semantic similarity search to surface relevant hotel options based on aggregated context.
6. **Output Reveal:** `/api/output/reveal` delivers the final collaborative trip decision and associated narration texts to all participants.

## Technical Notes

- **Streaming:** The `/api/session/round` and `/api/session/mediate` routes return AI SDK streaming responses, enabling real-time token-by-token output in the client.
- **Auto-Trigger:** The round route contains logic to detect when all session participants have completed Round 3 and automatically initiates the mediation step without requiring an explicit client call.
- **Vector Search:** Hotel matching leverages pgvector, indicating a PostgreSQL-backed vector store for semantic embedding similarity queries.
- **Co-authorship:** This commit was co-authored with Claude Opus 4.6 (1M context) by Anthropic.

## Related

- [[Flock Project Overview]]
- [[AI SDK Streaming Responses]]
- [[pgvector Hotel Similarity Search]]
- [[Multi-Agent Mediation Architecture]]
- [[Session Lifecycle Design]]
- [[Voice Context Compilation]]
- [[Personal Context Markdown Format]]
- [[Rahil Singhi]]
