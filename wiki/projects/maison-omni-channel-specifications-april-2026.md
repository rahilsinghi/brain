---
title: Maison Omni-Channel Specifications - April 2026
author: ai
created_at: 2026-04-16T18:07:09.949Z
last_ai_edit: 2026-04-16T18:07:09.949Z
last_human_edit: null
last_embedded_hash: 8fe674ec6f4f5253
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-omni-channel-specs-created-instagram-dm-whatsapp-1776362807133.md]]"
tags:
  - maison
  - omnichannel
  - instagram
  - whatsapp
  - meta
  - api
  - product plan
  - architecture
  - notion
  - integration
  - poc
---


# Maison Omni-Channel Specifications - April 2026

This report details the publication of four Notion pages outlining Maison's omni-channel strategy, including Instagram and WhatsApp integrations, new feature proposals, and a Maison.Travel Proof-of-Concept. A key architectural decision unifies Instagram and WhatsApp transport via Meta's Graph API, moving away from Twilio for WhatsApp, aiming for cost reduction and simplified management.

## Key Concepts

Instagram DM Integration,WhatsApp Native Meta API,Meta Graph API,Twilio,Omni Channel Epic,Maison.Travel POC,GTM Attribution,Instagram Lead Generation,Conversational Payments,Stripe,Session Management,UTM Tracking,Webhook Receiver,Token Management,Build Sprints,Meta Developer Account

## Details

On April 16, 2026, four Notion pages were published under the Product Plan, made visible to the entire Maison team, detailing various aspects of the omni-channel strategy:

### Published Notion Pages

1.  **Instagram DM Integration (Phase 2a)**:
    A full specification covering comment triggers, auto-DM functionalities, deep links with promo codes and [[UTM Tracking]], [[Meta Graph API]] architecture, a three-sprint build plan, [[Session Management]], and edge cases. This spec links to relevant Sales Agent Functional Requirements (FR2, FR5, FR6, FR7, FR8).

2.  **WhatsApp Native Meta API (Phase 2b)**:
    A proposal to replace [[Twilio]] with the native [[Meta Graph API]] for WhatsApp, aiming to unify the transport layer with Instagram. This approach would leverage the same [[Webhook Receiver]] and [[Token Management]] systems, leading to lower operational costs. It addresses the 24-hour session window and template messages, with an estimated two-sprint build time.

3.  **Rahil's Feature Proposals**:
    Outlines three distinct features:
    *   [[GTM Attribution]] (2-3 weeks effort)
    *   [[Instagram Lead Generation]] (2-3 weeks effort)
    *   [[Conversational Payments]] / [[Stripe]] integration (3-4 weeks effort)
    A connected pipeline diagram is included to illustrate the interdependencies.

4.  **Maison.Travel POC**:
    Describes a four-layer architecture encompassing content, booking, payments, and [[MCP distribution]]. The initial scope targets the East End of Long Island, involving approximately 100 properties. This POC links to [[Maison Exchange]] as an enabling technology.

### Key Architecture Decision: Unified Meta Transport
A significant architectural decision was made to integrate both Instagram and WhatsApp using Meta's [[Meta Graph API]], replacing [[Twilio]] for WhatsApp. This strategy involves a single Maison Meta App, shared [[Webhook Receiver]], and unified [[Token Management]]. [[Fredrik Sjoberg]] is responsible for setting up the [[Meta Developer Account]].

### Omni Channel Epic Updated
The parent [[Omni Channel Epic]] page has been updated to include links to Phase 2a and 2b specifications, along with an update note for April 16.

### Post-Meeting with Fredrik
Following a 1pm call with Fredrik, it was confirmed that the Instagram and WhatsApp specs were completed within the requested 30-minute timeframe. Fredrik is proceeding with the creation of the [[Meta Developer Account]]. The next steps include preparing the [[Maison.Travel POC]] plan for tomorrow's meeting and creating [[Linear tickets]] once Fredrik has reviewed the specifications. Discussion also covered broader visibility for the specs within the team.

## Related

[[Call Preparation for Maison and Fredrik Sjoberg]],[[Fredrik Sjoberg]],[[Rahil Singhi]],[[Session Management]],[[Meta Graph API]],[[Twilio]],[[Stripe]],[[Maison Exchange]],[[Instagram DM Integration]],[[WhatsApp Native Meta API]],[[Maison.Travel POC]],[[Omni Channel Epic]],[[GTM Attribution]],[[Instagram Lead Generation]],[[Conversational Payments]],[[UTM Tracking]],[[Webhook Receiver]],[[Token Management]],[[Meta Developer Account]],[[Linear tickets]],[[MCP distribution]]
