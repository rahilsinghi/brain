---
title: Streaming Chat Endpoint with SSE (raag)
author: ai
created_at: 2026-04-10T17:11:42.553Z
last_ai_edit: 2026-04-10T17:11:42.553Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-streaming-chat-endpoint-with-sse-5f9c04.md]]"
tags:
  - streaming
  - chat
  - sse
  - api
  - anthropic
  - agentic
  - realtime
  - python
  - backend
  - rag-agent
  - development
---

# Streaming Chat Endpoint with SSE (raag)

This commit introduces a new `POST /api/chat/stream` endpoint in the `rahilsinghi/raag` repository, enabling real-time streaming of chat responses using Server-Sent Events (SSE). It leverages `AsyncAnthropic` for forwarding text deltas and integrates agentic tool events during execution, while maintaining a non-streaming fallback.

## Key Concepts

Server-Sent Events (SSE),Streaming APIs,AsyncAnthropic,Agentic Loops,Real-time Text Deltas,Chatbots/AI Assistants,API Endpoints

## Details

This commit, identified by SHA `ae9ec14` and authored by [[Rahil Singhi]] (with [[Claude Opus 4.6]] as co-author) on 2026-03-06, introduces a significant feature to the `[[rahilsinghi/raag]]` repository: a streaming chat endpoint.

The new endpoint, accessible via `POST /api/chat/stream`, delivers chat responses in real-time using **Server-Sent Events (SSE)**. This allows clients to receive partial responses as they are generated, improving user experience for long-running AI interactions.

**Key Implementation Details:**
*   **Technology**: It utilizes `[[AsyncAnthropic]]`'s `messages.stream()` functionality to efficiently forward text deltas from the AI model.
*   **Agentic Behavior**: The system incorporates an `[[Agentic Tools]]` loop. During tool execution, it emits `tool_start` and `tool_result` events via the SSE stream, providing transparency into the agent's actions. After tool completion, it seamlessly resumes streaming [[Anthropic Claude]]'s follow-up responses.
*   **Backward Compatibility**: The existing non-streaming `POST /api/chat/` endpoint (`[[Chat API]]`) is retained, serving as a fallback for clients that do not require or support streaming.

This addition involved 1 file change with +108 additions and 0 deletions.

## Related

[[rahilsinghi/raag]],[[Server-Sent Events]],[[AsyncAnthropic]],[[Agentic Tools]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[Anthropic Claude]],[[Chat Streaming API]],[[Chat API]]
