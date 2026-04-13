---
title: Escalation Ladder V2 Channel Order Rewrite (Karen Project)
author: ai
created_at: 2026-04-12T21:41:34.747Z
last_ai_edit: 2026-04-12T21:41:34.747Z
last_human_edit: null
last_embedded_hash: 7ff03d554f6374c7
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-karen-rewrite-escalation-ladder-for-v2-channel-order-9acaff.md]]"
tags:
  - karen
  - project
  - escalation
  - ladder
  - communication
  - channels
  - multi-agent
  - automation
  - workflow
  - rewrite
  - update
  - email
  - sms
  - whatsapp
  - discord
  - slack
  - github
  - fedex
  - sse
  - tts
---


# Escalation Ladder V2 Channel Order Rewrite (Karen Project)

The [[Karen Project]]'s escalation ladder has been revamped to a 10-level system with a specific channel order for V2, designed for more strategic and engaging outreach. This update ensures unique communication channels at each step, introduces a research cache for contacts, and adds special event triggers like an "I know where you work" SMS and FedEx rate quotes.

## Key Concepts

Escalation Ladder,Channel Order,Multi-agent system,Communication Channels,Research Cache,Server-Sent Events (SSE),FedEx Rate Quote,Text-to-Speech (TTS)

## Details

The [[Karen Project]]'s escalation ladder, a core component for multi-agent communication and outreach, has undergone a significant rewrite to introduce a V2 channel order. This update defines a new 10-level sequential outreach process:

1.  Email
2.  SMS
3.  WhatsApp + Voice
4.  OSINT + SMS
5.  Email CC
6.  Slack
7.  Discord
8.  Calendar
9.  GitHub
10. FedEx

Key changes implemented in this rewrite include:
*   `LEVEL_CHANNELS`: This configuration now ensures no repetition, with a unique communication channel assigned to each escalation level.
*   `_run_ladder` function: Enhanced to include a research cache specifically for CC contacts, differentiating them from existing [[Circle Members]].
*   `_run_research_level` function: Integrates an SSE (Server-Sent Events) animation for visual feedback and a distinct "I know where you work" SMS message at a critical point in the research phase.
*   `_emit_fedex_rate` function: A new event trigger that provides a rate quote specifically after the completion of Level 10, signaling the final stage of physical outreach.
*   `_interlude` function: Extracted to manage interval sleeps between escalation steps, now incorporating commentary via [[ElevenLabs TTS]] for a more dynamic user experience.

This rewrite aims to make the escalation process more robust, strategic, and engaging for the [[Karen Project]].

## Related

[[Karen Project]],[[Circle Members]],[[ElevenLabs TTS]],[[Multi-agent system]]
