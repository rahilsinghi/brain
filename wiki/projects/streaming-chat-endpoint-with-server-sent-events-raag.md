---
title: Streaming Chat Endpoint with Server-Sent Events (raag)
author: ai
created_at: 2026-04-12T21:23:46.626Z
last_ai_edit: 2026-04-12T21:23:46.626Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-streaming-chat-endpoint-with-sse-5f9c04.md]]"
tags:
  - streaming
  - sse
  - chat
  - api
  - raag
  - anthropic
  - llm
  - agentic
  - real-time
---

# Streaming Chat Endpoint with Server-Sent Events (raag)

This feature introduces a new `POST /api/chat/stream` endpoint for the `raag` project, enabling real-time streaming of chat responses using Server-Sent Events (SSE). It leverages `AsyncAnthropic` to forward text deltas and includes agentic tool events (`tool_start`/`tool_result`) during tool execution, while retaining the existing non-streaming `POST /api/chat/` as a fallback.

## Key Concepts

Server-Sent Events (SSE),Asynchronous Streaming,Agentic Tooling,Real-time Communication,API Endpoints,LLM Integration

## Details

A new `POST /api/chat/stream` endpoint has been added to the `raag` project, allowing client applications to receive chat responses in real time. This is achieved by implementing Server-Sent Events (SSE), which pushes text deltas from the backend to the frontend as they become available. The implementation utilizes `AsyncAnthropic`'s `messages.stream()` functionality for efficient, asynchronous content delivery from the underlying Large Language Model (LLM).

Key aspects of this feature include:

*   **Real-time Text Deltas**: Content is streamed word by word or token by token, providing a more dynamic and responsive user experience.
*   **Agentic Tool Event Integration**: During the execution of agentic tools within the chat workflow, `tool_start` and `tool_result` events are emitted. This allows the frontend to display progress and results of tool usage to the user, before the LLM's follow-up response resumes streaming.
*   **Fallback Mechanism**: The existing non-streaming `POST /api/chat/` endpoint is maintained, offering a synchronous alternative or fallback for clients that do not require or support streaming.

This enhancement significantly improves the interactivity and perceived performance of the chat interface within `raag` by providing immediate feedback to the user.

## Related

[[raag — Git Activity]],[[Chat History Feature (raag)]],[[Chat Messages with Framer Motion Enter Animations and Smooth Tool Results (raag)]],[[Claude API Rate Limit Retry with Backoff in raag]],[[ADK Multi-Agent Backend (askNYC Project)]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[API: POST /ingest Route for Fire-and-Forget Ingestion]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[API Feature: POST /synthesise Endpoint with Robust Error Handling]],[[askNYC: Next.js 15 Dashboard with Real-time WebSocket UI]]
