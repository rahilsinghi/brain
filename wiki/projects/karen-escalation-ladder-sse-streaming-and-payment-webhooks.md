---
title: "Karen: Escalation Ladder, SSE Streaming, and Payment Webhooks"
author: ai
created_at: 2026-04-10T03:02:04.185Z
last_ai_edit: 2026-04-10T03:02:04.185Z
last_human_edit: null
last_embedded_hash: 924a3ffd4a40f230
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-escalation-ladder-sse-streaming-and-payment-webhooks-2b581b.md]]"
tags:
  - escalation
  - sse
  - streaming
  - webhooks
  - venmo
  - payments
  - orchestration
  - karen
  - real-time
  - event-driven
---


# Karen: Escalation Ladder, SSE Streaming, and Payment Webhooks

This commit introduces a 10-level escalation ladder with configurable intervals to the Karen orchestration service, along with Server-Sent Events (SSE) streaming with event history replay for reliable reconnects. Additional features include trigger, resolve, and continue-anyway endpoints, as well as Venmo webhook integration and manual payment confirmation support.

## Key Concepts

- **Escalation Ladder**: A 10-level system for progressively escalating actions or notifications, with configurable intervals ranging from 5 seconds (demo) to 1 day (patient)
- **SSE Streaming**: Server-Sent Events stream that supports event history replay and `last_seq` filtering to enable reliable client reconnections
- **Payment Webhooks**: Integration with Venmo webhooks and a manual payment confirmation endpoint for detecting and processing payments
- **Orchestration Endpoints**: REST endpoints for triggering, resolving, and continuing escalation flows, including a `continue-anyway` override
- **Karen Service**: The orchestration service responsible for managing escalation logic and event-driven workflows

## Details

## Overview

Commit `b9ff0f8` to the `rahilsinghi/karen` repository adds 622 lines of new code across 3 files, implementing three major features for the Karen orchestration service.

## Escalation Ladder

The escalation ladder consists of 10 configurable levels, allowing the system to progressively escalate actions over time. Intervals are tunable depending on the use case:
- **Demo mode**: intervals as short as 5 seconds for rapid testing
- **Patient mode**: intervals up to 1 day for production workflows

This design allows Karen to be used across development, staging, and production environments without code changes.

## SSE Streaming

The SSE (Server-Sent Events) streaming implementation provides a reliable real-time event feed with the following capabilities:
- **Event history replay**: Clients can request historical events upon reconnect
- **`last_seq` filtering**: Clients pass the last received sequence number to avoid duplicate or missed events, ensuring exactly-once delivery semantics during reconnections

## Payment Detection and Webhooks

Payment handling is introduced through two mechanisms:
- **Venmo Webhook**: Listens for incoming Venmo payment notifications and triggers appropriate escalation state changes
- **Manual Payment Confirmation**: An endpoint allowing operators or users to manually confirm a payment has been received

## Endpoints Added

| Endpoint | Description |
|---|---|
| Trigger | Initiates an escalation sequence |
| Resolve | Marks an escalation as resolved |
| Continue-Anyway | Bypasses a blocking step and continues escalation |
| Payment Detection | Processes Venmo webhook or manual payment confirmation |

## Commit Metadata

- **Repository**: rahilsinghi/karen
- **SHA**: b9ff0f8
- **Date**: 2026-04-04
- **Author**: Rahil Singhi
- **Files Changed**: 3
- **Additions**: +622
- **Deletions**: 0

## Related

- [[Karen Orchestration Service]]
- [[Server-Sent Events]]
- [[Escalation Management]]
- [[Payment Webhook Integration]]
- [[Venmo API]]
- [[Event Streaming]]
- [[Rahil Singhi]]
