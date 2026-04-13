---
title: Streaming Chat Endpoint with Server-Sent Events (SSE) in raag
author: ai
created_at: 2026-04-13T15:35:53.696Z
last_ai_edit: 2026-04-13T15:35:53.696Z
last_human_edit: null
last_embedded_hash: 2e849b1e852209bc
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-streaming-chat-endpoint-with-sse-5f9c04.md]]"
tags:
  - streaming
  - chat
  - sse
  - api
  - anthropic
  - llm
  - real-time
  - agentic
  - raag
---


# Streaming Chat Endpoint with Server-Sent Events (SSE) in raag

The `raag` project introduces a `POST /api/chat/stream` endpoint for real-time chat responses using Server-Sent Events (SSE). This feature leverages `AsyncAnthropic` to stream text deltas and emits `tool_start`/`tool_result` events during agentic tool execution, providing live updates. It significantly enhances the user experience by offering dynamic feedback during AI interactions.

## Key Concepts

Streaming Chat,Server-Sent Events (SSE),AsyncAnthropic,Agentic Tool Loop,tool_start/tool_result events,Real-time Communication,API Endpoint

## Details

The `raag` project has implemented a new API endpoint, `POST /api/chat/stream`, which facilitates real-time chat interactions through Server-Sent Events (SSE). This endpoint is designed to provide a more dynamic and responsive user experience by delivering content as it's generated, rather than waiting for a complete response.

The core functionality relies on `AsyncAnthropic`'s `messages.stream()` method, enabling the continuous forwarding of text deltas from the underlying Large Language Model (LLM). A key enhancement of this streaming endpoint is its integration with the agentic tool loop. During periods when the AI agent is executing tools, the endpoint emits `tool_start` and `tool_result` events. These events provide transparent, real-time feedback to the client about the agent's actions, before resuming the streaming of Claude's follow-up responses.

This new streaming capability coexists with the previously established non-streaming `POST /api/chat/` endpoint, which remains available for use cases where a single, complete response is preferred or as a fallback mechanism.

## Related

[[raag]],[[Chat History Feature (raag)]],[[Chat Messages with Framer Motion Enter Animations]],[[API Feature: POST /synthesise Endpoint with Robust Error Handling]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[Animated Login Modal and Chat Sidebar Transitions (raag)]],[[Chat UI Improvements: Bar Chunks, Grid Layout, and Universe Linking (raag)]]
