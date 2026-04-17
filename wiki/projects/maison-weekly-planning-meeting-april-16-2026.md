---
title: Maison Weekly Planning Meeting — April 16, 2026
author: ai
created_at: 2026-04-16T13:45:53.384Z
last_ai_edit: 2026-04-16T13:45:53.384Z
last_human_edit: null
last_embedded_hash: 34ac6948887585de
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-weekly-planning-meeting-april-16-2026-rahil-day-2-1776347123651.md]]"
tags:
  - maison
  - planning
  - product
  - strategy
  - sales
  - attribution
  - adtech
  - omnichannel
  - instagram
  - whatsapp
  - session persistence
  - cookies
  - payments
  - sales agent
  - maison.travel
  - pms
  - integrations
  - rahil singhi
  - fredrik sjoberg
  - sandeep baynes
---


# Maison Weekly Planning Meeting — April 16, 2026

This meeting outlined strategic priorities and key contributions, particularly from new team member Rahil Singhi, focusing on advanced attribution systems, omnichannel communication flows, and core product enhancements. Discussions solidified Maison's direction towards a proactive, revenue-generating sales agent and expanded platform capabilities beyond traditional web chat, alongside the foundational work for Maison.Travel.

## Key Concepts

Attribution System,GTM Cookie Attribution System,Omnichannel Strategy,Sales Agent,Promo Code Functionality,Offers Agent,Session Persistence,Cookie Tracking,Conversational Payments,Maison.Travel POC,Website Sync,Source Ingestion,Deduplication,PMS Integrations,Lead Capture

## Details

The Maison weekly planning meeting on April 16, 2026, brought together key team members including CEO Fredrik Sjoberg and CTO Sandeep Baynes, with new hire Rahil Singhi making significant early contributions. Noel was absent, working on a scraper for a high-priority client.

**Key Outcomes for Rahil**

*   **Firebase Access:** Rahil was granted editor privileges on a test project, enabling login to the Console at `local.maison-labs.com/login`.
*   **Team Introductions:** Rahil was introduced to the sales team (David McGloin from London, Jory from Croatia with hotel tech background) and AI/Backend engineer Durgansh (Masters in AI & Robotics).
*   **Rahil's Contributions:**
    1.  **GTM Cookie Attribution System:** Rahil presented his work from Kismet, a Google Tag Manager-based system capturing a 90-day attribution journey from first touch to booking conversion, including revenue and room nights. This system uses a `/GL` parameter to correlate users across marketing sites and booking engines, injecting scripts via GTM to read session cookies and record bookings. Fredrik lauded this as a significant strength, positioning Rahil as a "domain expert" in attribution and ad tech, which David confirmed would solve their "biggest problem" of ROI attribution.
    2.  **Instagram Omnichannel Flow:** Rahil detailed a working Instagram to booking flow from Kismet. This involved a hotel posting an offer, users commenting a trigger word, an Instagram bot (powered by Maison) auto-DMing offer details, full conversation within Instagram DMs using Maison's knowledge base, and a deep link to a booking engine with pre-populated promo codes and cookie context. Fredrik emphasized the need for the *full flow* within Instagram DM, bypassing web chat entirely, which Rahil confirmed was feasible. Instagram was identified as a primary channel for lead generation alongside WhatsApp for Phase 1 of the omnichannel strategy.
    3.  **Session Persistence / Cookie Tracking:** Rahil's inquiry about cookie-based user tracking sparked discussion. Maison currently uses `localStorage` for same-session persistence but lacks cross-session memory. Rahil proposed leveraging existing hotel cookie policies and GTM to seed context for returning visitors, enabling personalization (e.g., dietary preferences) and promo code transfer to booking engines.
    4.  **Stripe/Payments:** Rahil mentioned researching [[Stripe]] MCP for conversational payments, aligning with Fredrik's vision of potentially replacing booking engines entirely if chat could handle ARI and payments.

**Major Features Discussed**

*   **Sales Agent (Major Priority):** A strategic shift from reactive FAQ bots to proactive, revenue-generating agents.
    *   **Lead Capture Agent:** To detect booking intent, collect information conversationally, and trigger email/CRM actions.
    *   **Promo Code Functionality:** To allow hotels to create codes in booking engines and Maison to deep-link with pre-populated codes.
    *   **Offers Agent:** To detect guest intent and preferences, matching them to configured hotel offers.
    *   David demonstrated existing promo code configuration on the Deshon Lodge Moab client. Linear tickets were created for Sales Agent 1.0, focusing on "simple features that can ship in days." A "Sales Agent" tab with easy configuration blocks will be added to the client admin flyout.

*   **Omnichannel Strategy:** Expansion beyond web chat to platforms like [[WhatsApp]], [[Instagram]], [[Facebook]], email, and OTAs.
    *   **Phase 1:** [[WhatsApp]] and [[Instagram]] identified as easiest and most active channels.
    *   Distinction was made between omnichannel (inbound, pre-stay) and guest communications (in-stay support), with guest comms being deprioritized.
    *   [[OTA integration]] (Runner for Booking.com + Expedia messaging) was discussed.
    *   Competitors like HiJiffy, Runner, and BookBoost are also pushing omnichannel.

*   **Maison.Travel POC:** A vision for a travel app for discovering and booking hotels, primarily as a vehicle for building foundational layers (content, booking, payments) to be exposed via MCP to platforms like [[ChatGPT]] and [[TikTok]].
    *   Maison's unique angle is building both the content and transactional layers, unlike competitors like MindTrip. 
    *   The POC scope includes the East End of Long Island (~100 hotels, 10-15 already ingested, existing clients).
    *   Sandeep emphasized, "Everything must be MCP compliant." Rahil raised prioritization concerns, and the team agreed to focus on B2B foundations over B2C promotion.
    *   Fredrik stated, "We're not fundraising for a web chat chatbot. We're fundraising for this."

**Product Feature Updates**

*   **Website Sync:** External URL scraping is in production, with weekly auto-sync available in the console.
*   **Source Ingestion:** Supports DOC, PDF, Excel, and external URLs. Excel extracts facts but doesn't preserve exact Q&A.
*   **Deduplication:** Reverted to a previous version where new facts take priority.
*   **PMS Integrations:** Existing integrations include [[CloudBeds]], Muse, StayNTouch, and [[Opera Cloud]].

**Action Items**

*   **Sandeep:** Add client ID and developer docs link to the admin flyout.
*   **David:** Find a hotel with Synexis promo code for an end-to-end booking demo.
*   **Fredrik:** Schedule a separate meeting on AR visibility with David, Jory, and potentially Rahil.
*   **Team:** Create tickets for [[Session Persistence]] and [[GTM Cookie Attribution System]] implementation.

**Context for Rahil's Positioning**

Fredrik explicitly positioned Rahil as a "domain expert" in attribution and ad tech due to his GTM attribution work and Instagram omnichannel flow, which were highlighted as critical for fundraising and competitive differentiation. Rahil is being considered for work on [[Maison.Travel POC]] foundations while Sandeep finalizes [[monorepo]] setup. The team values Rahil's "verified potential" based on his prior shipped work.

## Related

[[Maison]],[[Fredrik Sjoberg]],[[Sandeep Baynes]],[[Rahil Singhi]],[[Firebase]],[[GTM Cookie Attribution System]],[[Instagram Omnichannel Flow]],[[Session Persistence]],[[Cookie Tracking]],[[Stripe]],[[Payments]],[[Sales Agent]],[[Promo Code Functionality]],[[Omnichannel Strategy]],[[WhatsApp]],[[Instagram]],[[Facebook]],[[OTA integration]],[[Maison.Travel POC]],[[Website Sync]],[[Source Ingestion]],[[Deduplication]],[[PMS Integrations]],[[CloudBeds]],[[Opera Cloud]],[[Maison Agent]],[[Authentication]],[[Automated Contact Discovery and Outreach]],[[Automated Website Batch Scraping Utility]],[[Channel Integrations and Personality Service (f165982)]],[[Chat Message Sending Functional Tests]],[[Chat Response Functional Testing]],[[Chat UX Enhancements with Framer Motion]],[[Client Knowledge Base Cleanup for Pinecone and DynamoDB]],[[Client Knowledge Source Link Database Migration]],[[Console Authentication Testing]],[[Curl Ingestion Test]],[[D-EDGE]],[[Database User Table Test Suite]],[[DirectBooker]],[[Distributed Telemetry and LLM Observability]],[[monorepo]],[[ChatGPT]],[[TikTok]]
