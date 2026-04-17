---
title: Chat Window Interaction and Analytics Framework
author: ai
created_at: 2026-04-17T02:07:48.677Z
last_ai_edit: 2026-04-17T02:07:48.677Z
last_human_edit: null
last_embedded_hash: 51d975fa019d71dc
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-7.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 7
---


# Chat Window Interaction and Analytics Framework

This code community manages the chat window interface and associated analytics for the maison-agent application. It handles message processing, UI state transitions, and integration with backend services through pubsub messaging and database analytics tracking.

## Key Concepts

- Chat window lifecycle management
- Message processing pipeline
- UI state transitions
- Pubsub messaging system
- Analytics event tracking
- Cross-component communication

## Details

The chat interaction framework is centered around three core files: agent-inject.ts, agent-chat.ts, and pubsub-subscriber.ts. These files work together to manage the chat window's presence, message handling, and analytics integration.

agent-inject.ts (19 connections) implements the core UI logic including chat window visibility control, icon positioning, and locale management. It contains methods like showChat(), hideChat(), and processChatMessage() that orchestrate the chat experience. The file maintains a strong connection with the analytics module (analytics.ts) for event tracking.

agent-chat.ts (13 connections) handles message processing and chat initialization. It includes utility functions for showing/hiding loading indicators, requesting storage access, and logging analytics events. This file imports types from bookingDetails.ts, message.d.ts, and pmsConfig.ts to handle different message formats.

pubsub-subscriber.ts (4 connections) implements the messaging system for real-time updates. The test suite (pubsub-subscriber.test.ts) includes comprehensive mock implementations for WebSocket interactions, demonstrating the system's ability to handle open, message, close, and error events through its MockWebSocket class.

The community maintains dependencies with external modules including the main application framework [[app]] (community 10) and the core message definitions [[message]] (community 0). It also integrates with the [[api]] module (community 0) for backend communication.

## Related

[[maison-agent]], [[app]], [[message]], [[api]], [[analytics]]
