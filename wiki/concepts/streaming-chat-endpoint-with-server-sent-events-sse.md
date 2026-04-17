---
title: Streaming Chat Endpoint with Server-Sent Events (SSE)
author: ai
created_at: 2026-04-10T22:08:49.953Z
last_ai_edit: 2026-04-10T22:08:49.953Z
last_human_edit: null
last_embedded_hash: 695c5bb595ee64a4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-streaming-chat-endpoint-with-sse-5f9c04.md]]"
tags:
  - streaming
  - chat
  - api
  - sse
  - anthropic
  - claude
  - agentic
  - real-time
  - backend
  - rag
---


# Streaming Chat Endpoint with Server-Sent Events (SSE)

This commit introduces a new `/api/chat/stream` endpoint in the `raag` repository, enabling real-time chat responses via Server-Sent Events (SSE). It utilizes AsyncAnthropic's `messages.stream()` for efficient text delta delivery, including event emissions for agentic tool execution. The existing non-streaming `/api/chat/` endpoint is retained as a fallback.

## Key Concepts

- [[Server-Sent Events (SSE)]],- [[AsyncAnthropic]],- [[API Streaming]],- [[Agentic AI]],- [[Real-time Communication]],- [[API Endpoint]]

## Details

A new POST endpoint, `/api/chat/stream`, has been added to the `rahilsinghi/raag` repository to facilitate real-time chat interactions. This endpoint implements streaming responses using Server-Sent Events (SSE), allowing clients to receive incremental updates as they become available.

The implementation leverages `AsyncAnthropic` and specifically its `messages.stream()` method to forward text deltas from the underlying AI model (e.g., Claude) in real-time. This provides a more responsive user experience compared to traditional request/response cycles.

During the execution of agentic tools within the chat process, specific events—`tool_start` and `tool_result`—are emitted. These events inform the client about the initiation and completion of tool calls, providing transparency into the agent's decision-making and execution flow. After tool execution, the streaming of Claude's follow-up responses resumes.

The original non-streaming POST `/api/chat/` endpoint is preserved, serving as a fallback or for clients that do not require real-time streaming capabilities.

## Related

[[Rahil Singhi]],[[raag (Project)]],[[Claude Opus 4.6]],[[Server-Sent Events]],[[Asynchronous Programming]],[[API Design]]
