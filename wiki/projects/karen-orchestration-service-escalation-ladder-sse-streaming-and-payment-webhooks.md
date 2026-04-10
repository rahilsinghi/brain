---
title: "Karen Orchestration Service: Escalation Ladder, SSE Streaming, and Payment Webhooks"
author: ai
created_at: 2026-04-10T03:01:12.723Z
last_ai_edit: 2026-04-10T03:01:12.723Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-escalation-ladder-sse-streaming-and-payment-webhooks-2b581b.md]]"
tags:
  - karen
  - orchestration
  - escalation
  - sse
  - streaming
  - webhooks
  - venmo
  - payments
  - backend
  - real-time
  - rahilsinghi
---

# Karen Orchestration Service: Escalation Ladder, SSE Streaming, and Payment Webhooks

This commit introduces a 10-level escalation ladder with configurable intervals, Server-Sent Events (SSE) streaming with reliable reconnect support, and payment detection endpoints to the Karen orchestration service. The update adds 622 lines of new code across 3 files, enabling trigger, resolve, continue-anyway, and payment webhook flows. Venmo webhook integration and manual payment confirmation are also included.

## Key Concepts

- **Escalation Ladder**: A 10-level system for progressively escalating actions or notifications, with configurable intervals ranging from 5 seconds (demo mode) to 1 day (patient mode)
- **SSE Streaming**: Server-Sent Events stream that supports event history replay and `last_seq` filtering to ensure reliable client reconnection without missing events
- **Payment Webhooks**: Endpoints for detecting and confirming payments, including Venmo webhook integration and a manual payment confirmation flow
- **Orchestration Endpoints**: Dedicated endpoints for trigger, resolve, continue-anyway, and payment detection operations
- **Configurable Intervals**: Escalation timing is tunable to support both rapid demo scenarios and long-running patient workflows

## Details

## Overview

Commit `b9ff0f8` to the `rahilsinghi/karen` repository introduces three major feature areas to the Karen orchestration service: an escalation ladder, SSE-based streaming, and payment webhook handling.

## Escalation Ladder

The escalation ladder consists of 10 configurable levels that allow the Karen service to progressively escalate actions over time. Intervals are highly configurable:
- **Demo mode**: As short as 5 seconds per level for rapid testing
- **Patient mode**: Up to 1 day per level for long-running workflows

This design allows the same system to be used for both development/testing and real-world production scenarios without code changes.

## SSE Streaming

Server-Sent Events (SSE) streaming is added to enable real-time event delivery to connected clients. Key features include:
- **Event history replay**: Clients that reconnect can request past events to avoid data loss
- **`last_seq` filtering**: Clients pass their last known sequence number so the server delivers only missed events, ensuring reliable and idempotent reconnects

## Payment Detection and Webhooks

Several endpoints are introduced to handle payment lifecycle events:
- **Trigger endpoint**: Initiates an escalation sequence
- **Resolve endpoint**: Marks an escalation as resolved
- **Continue-anyway endpoint**: Allows progression despite unresolved conditions
- **Payment detection endpoint**: Automatically detects incoming payments
- **Venmo webhook**: Listens for Venmo payment notifications
- **Manual payment confirmation**: Allows operators to manually confirm a payment has been received

## Change Stats

| Metric | Value |
|---|---|
| Files Changed | 3 |
| Additions | +622 |
| Deletions | 0 |
| Author | Rahil Singhi |
| Date | 2026-04-04 |

## Related

- [[Karen Orchestration Service]]
- [[Escalation Ladder Design]]
- [[Server-Sent Events Streaming]]
- [[Payment Webhook Integration]]
- [[Venmo Webhook Handler]]
- [[Event History Replay]]
- [[Rahil Singhi]]
