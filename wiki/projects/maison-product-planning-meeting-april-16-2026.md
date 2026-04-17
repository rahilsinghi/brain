---
title: Maison Product Planning Meeting - April 16, 2026
author: ai
created_at: 2026-04-16T16:54:56.351Z
last_ai_edit: 2026-04-16T16:54:56.351Z
last_human_edit: null
last_embedded_hash: 7ab89857fde6df57
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-product-planning-meeting-april-16-2026-1776358468812.md]]"
tags:
  - product planning
  - maison
  - sales agent
  - lead generation
  - attribution
  - payments
  - omnichannel
  - b2b
  - b2c
  - hotel tech
  - roadmap
  - onboarding
  - integrations
---


# Maison Product Planning Meeting - April 16, 2026

This meeting outlined Maison's strategic product direction, focusing on the evolution of the sales agent from a reactive FAQ bot to a proactive, revenue-generating tool. Key discussions included onboarding for a new AI Engineer, prioritizing the Sales Agent 1.0, and evaluating three major feature proposals: GTM attribution, Instagram lead generation, and conversational payments. The team also reviewed omnichannel strategy, the Maison.Travel POC, and various product feature updates.

## Key Concepts

Sales Agent 1.0,Go-To-Market (GTM) Attribution,Cookie-Based Session Intelligence,Instagram Lead Generation,Conversational Payments,OHIP Certification (MA-879),Session Persistence,Omnichannel Strategy,Maison.Travel Proof of Concept (POC),Product Roadmap,Direct Bookings,Upselling Tools

## Details

## Meeting Overview
**Date:** April 16, 2026

**Attendees:** Fredrik (CEO), Rahil (AI Engineer), David (Sales, London), Jory (Sales, Croatia), Durgash (AI/Backend), Sandeep (via action items). Noel (Undasked scraper) was absent.

## Key Outcomes

### Rahil's Day 2 Onboarding
*   Firebase credentials with editor privileges were created for the test environment.
*   Team introductions were completed: David handles sales demos, Jory has a background in hotel tech, and Durgash focuses on AI/backend with a Masters from the UK.
*   Fredrik requested Rahil to document feature ideas in Notion and Linear, utilizing [[Claude Code & Cowork Setup for Maison]] for integration with Slack, Notion, and Linear.

### Sales Agent 1.0 — Top Priority
This initiative marks a core strategic shift for Maison's sales agent:
*   **Transformation:** From a reactive FAQ bot to a proactive, revenue-generating agent that drives direct bookings and upsells.
*   **Value Proposition:** Hotels are more likely to invest in conversion/upselling tools than basic FAQ bots, which don't replace front desk staff.
*   **Direct Booking:** Aims to save hotels 20% commission compared to OTA (Online Travel Agency) bookings.
*   **Lead Capture Agent:** Designed to detect group/event intent, conversationally collect information, and trigger emails to operators or push data to a CRM.
*   **Promo Code Functionality:** Enables Maison to deep-link with pre-populated promo codes created by hotels in their booking engines.
*   **Offers Agent:** Detects guest intent and preferences to match them with configured promotions.
*   **Client Admin Interface:** A dedicated "sales agent" tab will be added to the admin flyout.
*   **Implementation:** Fredrik created tickets for [[Sales Agent 1.0]], focusing on simple, shippable features post-development setup.

### Rahil's 3 Feature Proposals
Rahil presented three feature ideas that were well-received:

**1. GTM Attribution & Cookie-Based Session Intelligence**
*   **Problem Addressed:** David identified ROI attribution as a significant challenge for Maison.
*   **Experience:** Rahil previously built an identical system at Kismet, which ran in production for 6 months.
*   **Functionality:** Incorporates cross-domain tracking via a `/GL` parameter and a 90-day cookie window.
*   **Benefits:** Enables proving Maison's ROI, personalizing experiences for returning visitors, and transferring promo codes across different domains.
*   **Estimated Timeline (Phase 1-2):** 2-3 weeks.
*   **Related Concepts:** [[Session Persistence & User Tracking]], [[Apollo Session Storage and Chrome User Data Exclusion]]

**2. Instagram Lead Generation Flow**
*   **Vision:** Fredrik expressed a desire for a complete lead generation flow within Instagram DMs, bypassing the web chat entirely.
*   **Process:** A comment trigger initiates an auto-DM, leading to a full conversation within Instagram DMs using Maison's knowledge base, culminating in a deep link to booking.
*   **Experience:** Rahil implemented this at Kismet, where Instagram was identified as the easiest lead generation channel.
*   **Scalability:** The pattern is replicable to WhatsApp and Facebook once proven.
*   **Estimated Timeline (Phase 1):** 2-3 weeks.
*   **Related Concepts:** [[Omnichannel Strategy]], [[Channel Integrations and Personality Service (Karen Project)]]

**3. Conversational Payments (Stripe)**
*   **Goal:** Replace traditional booking engine redirects with in-chat Stripe payments.
*   **Existing Infrastructure:** Maison already possesses [[PMS integrations]] and MCP (Maison Creator Platform) tools, with payment capture being the missing component.
*   **Business Model:** Enables a commission-based model (free chatbot, cut on transactions).
*   **Future Vision:** Forms a foundational component for [[Maison.Travel]].

### OHIP Certification (MA-879)
*   Fredrik and Javed are handling this certification.
*   Rahil offered assistance, but it is currently deprioritized.
*   **Status:** Blocked since February 2026 due to issues with Publisher Account, Marketplace listing, and UAT access.

### Session Persistence & User Tracking
*   **Current State:** Local storage handles session persistence within the same site visit, lacking cross-session memory.
*   **Proposal:** Utilize GTM (Google Tag Manager) cookies for a 90-day user journey, providing context for returning visitors.
*   **Experience:** Rahil has prior experience with this exact pattern, including cross-domain `/GL` stitching.
*   **Related Concepts:** [[Session Persistence & User Tracking]], [[Apollo Session Storage and Chrome User Data Exclusion]]

### Omnichannel Strategy
*   **Vision:** Extend Maison's reach beyond web chat to platforms like WhatsApp, Instagram, and Facebook, as well as email.
*   **Phase 1 Focus:** WhatsApp and Instagram were identified as the easiest and most obvious channels to integrate first.
*   **Deprioritized:** Guest communications (in-stay support) are considered a separate product area and are currently deprioritized.
*   **Competition:** Discussion included OTA integration (e.g., Booking.com/Expedia messaging), similar to the Runner competitor.
*   **Related Concepts:** [[Omnichannel Strategy]], [[Add TelegramConfig Type and Defaults]]

### Maison.Travel POC
*   **Concept:** A travel application focused on the East End of Long Island, where Maison has existing clients.
*   **Primary Goal:** To build a foundational content, booking, and payments layer, rather than a consumer-facing application.
*   **Platform Integration:** These foundations would be exposed via MCP to platforms like ChatGPT and TikTok.
*   **Strategic Importance:** Supports the VC fundraising narrative by showcasing an ambitious vision beyond web chat.
*   **Scope:** Aims to make approximately 100 hotels in the region (10-15 already done) conversationally bookable.
*   **Requirement:** Everything must be MCP-compliant.
*   **Prioritization Concern:** Rahil raised concerns about prioritization, and the team agreed to focus on B2B foundations rather than B2C promotion.

### Product Feature Updates
*   **Website Sync:** External URL scraping is functioning in production with weekly auto-sync.
*   **Source Ingestion:** Support for DOC, PDF, and Excel files has been added, in addition to URLs.
*   **PMS Integrations:** Existing integrations include [[Cloudbeds]], [[Muse]], [[StayNTouch]], and [[Opera Cloud]].
*   **Team Bandwidth:** The team's capacity is currently limited due to ongoing monorepo refactoring.

### Action Items
*   [ ] Sandeep: Add client ID and developer documentation to the admin flyout.
*   [ ] David: Find a hotel with a Synexis promo code for an end-to-end demo.
*   [ ] Fredrik: Schedule an AR visibility meeting with David, Jory, and potentially Rahil.
*   [ ] Team: Create tickets for [[Session Persistence & User Tracking]] and GTM cookie implementation.
*   [ ] Rahil: Push feature proposals to Notion and create Linear issues.

## Notion Page Created
Rahil's Feature Proposals were published at: [https://www.notion.so/3448b6104b1d815fa899c70bb9590b5b](https://www.notion.so/3448b6104b1d815fa899c70bb9590b5b)

## Related

[[Claude Code & Cowork Setup for Maison]],[[Session Persistence & User Tracking]],[[Apollo Session Storage and Chrome User Data Exclusion]],[[Omnichannel Strategy]],[[Channel Integrations and Personality Service (Karen Project)]],[[PMS integrations]],[[Maison]],[[Cloudbeds]],[[Muse]],[[StayNTouch]],[[Opera Cloud]],[[Sales Agent 1.0]],[[OHIP Certification (MA-879)]],[[Maison.Travel]]
