---
title: Escalation Ladder, SSE Streaming, and Payment Webhooks in Karen
author: ai
created_at: 2026-04-13T15:32:58.120Z
last_ai_edit: 2026-04-13T15:32:58.120Z
last_human_edit: null
last_embedded_hash: 0d75b3a3828eff4a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-escalation-ladder-sse-streaming-and-payment-webhooks-2b581b.md]]"
tags:
  - karen
  - escalation
  - sse
  - webhooks
  - payments
  - orchestration
  - backend
---


# Escalation Ladder, SSE Streaming, and Payment Webhooks in Karen

This feature introduces a 10-level escalation ladder within the [[Karen Project]] orchestration service, complete with configurable intervals and dedicated endpoints for managing escalation states. It also implements Server-Sent Events (SSE) for real-time updates with reliable reconnection mechanisms. Additionally, it integrates payment detection through webhooks, specifically for Venmo, and supports manual payment confirmation.

## Key Concepts

Escalation Ladder,Server-Sent Events (SSE),Payment Webhooks,Event History Replay,Last Sequence Filtering,Venmo Webhook,Orchestration Service

## Details

Implemented as part of the [[Karen Project]], this feature (commit `b9ff0f8`) by [[Rahil Singhi]] on 2026-04-04 introduces several critical functionalities:

1.  **Escalation Ladder**: A configurable 10-level escalation system is integrated into the Karen orchestration service. This system allows for flexible interval settings, ranging from short 5-second demo intervals to extended 1-day patient intervals, catering to diverse use cases.
2.  **Server-Sent Events (SSE) Streaming**: A robust SSE stream is established to provide real-time updates. It includes event history replay capabilities and `last_seq` filtering, ensuring reliable reconnections and consistent event delivery even after network interruptions.
3.  **Escalation Management Endpoints**: Specific API endpoints are provided to manage the state of escalations. These include:
    *   `Trigger`: To initiate an escalation.
    *   `Resolve`: To mark an escalation as resolved.
    *   `Continue-Anyway`: To proceed with the workflow despite an ongoing escalation.
    *   `Payment Detection`: For integrating payment confirmations into the escalation flow.
4.  **Payment Webhooks**: The system incorporates webhook functionality for payment detection, with specific support for [[Venmo Webhook]]s. This allows for automated recognition of payments. Manual payment confirmation is also supported, providing flexibility for cases where automated detection is not feasible or desired.

## Related

[[Karen Project]],[[Rahil Singhi]],[[Venmo Webhook]]
