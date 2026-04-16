---
title: Maison Agent Communication Channels
author: ai
created_at: 2026-04-15T19:15:48.037Z
last_ai_edit: 2026-04-15T19:15:48.037Z
last_human_edit: null
last_embedded_hash: fbd27b0721bf984d
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-56.md]]"
tags:
  - maison
  - code-community
  - maison-agent
  - graphify
  - pubsub
  - communication-channels
  - messaging-system
aliases:
  - Community 56
---




# Maison Agent Communication Channels

This code community defines the core communication channels within the [[maison-agent]] system, enabling distinct types of message exchange through a publish-subscribe mechanism. It categorizes interactions into public chats, private task-oriented messages, and private session-specific communications.

## Key Concepts

Pub/Sub Channels,Public Chat,Private Task Communication,Private Session Communication

## Details

This community centers around the definition and management of communication channels within the [[maison-agent]] project's `pubsub` package.

*   `packages/pubsub/src/channels.ts`: This crucial file serves as the central point for declaring and organizing the various communication channels. It likely provides an enumeration or a registry that other parts of the application use to publish or subscribe to specific message streams. The file exhibits multiple connections, indicating its foundational role in the messaging architecture.

Key internal relationships reveal the distinct channel types managed by this system:

*   `channels` → `channels_publicchat` (contains): Represents a channel dedicated to public conversations or broadcasts, where messages might be visible to all connected participants.
*   `channels` → `channels_privatetask` (contains): Defines a channel for communication related to specific, private tasks. This could facilitate direct messaging between agents or between a user and an agent concerning a particular operation.
*   `channels` → `channels_privatesession` (contains): Establishes a channel for communications tied to individual user sessions. Messages on this channel would be scoped to a particular user's active session, ensuring privacy and context-specific information exchange.

This cluster ensures a structured approach to inter-component and inter-user communication, vital for the agent's operation.

## Related

[[maison-agent]]
