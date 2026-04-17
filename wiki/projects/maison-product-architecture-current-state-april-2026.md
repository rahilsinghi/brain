---
title: Maison Product Architecture - Current State (April 2026)
author: ai
created_at: 2026-04-16T16:55:23.343Z
last_ai_edit: 2026-04-16T16:55:23.343Z
last_human_edit: null
last_embedded_hash: 815ddeeb26c5c065
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-product-architecture-current-state-april-2026-1776358490793.md]]"
tags:
  - maison
  - chatbot
  - hoteltech
  - hospitality
  - ai
  - pms
  - integrations
  - omnichannel
  - saas
  - monorepo
  - firebase
  - sales
  - roi
  - productarchitecture
---


# Maison Product Architecture - Current State (April 2026)

Maison is an AI-powered hotel chatbot platform designed to assist hotel guests by embedding a widget on hotel websites. It leverages a knowledge base compiled from scraped websites and uploaded documents to answer questions and integrates with Property Management Systems (PMS) for functionalities like availability and rates. The platform is continuously evolving to include features like proactive sales, omnichannel support, and improved ROI attribution.

## Key Concepts

AI-powered chatbot,Hotel technology,Property Management System (PMS) integrations,Knowledge Base (KB),Omnichannel communication,Sales automation,Return on Investment (ROI) attribution,Monorepo architecture,Web scraping,Session persistence,API,Admin console,Pre-Merge Kill Switch in Ouroboros (MCP tools),Conversational payments,Cross-session memory

## Details

As of April 2026, the Maison platform serves as an AI-powered hotel chatbot, embedded on hotel websites to answer guest questions. It draws information from the hotel's knowledge base, which is compiled through weekly website scraping and uploaded documents (DOC, PDF, Excel).

### Current Stack
-   **Monorepo:** `maison-agent`
-   **API:** `api.maison-labs.com` (available in test, staging, and production environments)
-   **PMS Integrations:** Integrations with `[[Cloudbeds]]`, `[[Muse]]`, `[[StayNTouch]]`, and `[[Opera Cloud]]`.
-   **Knowledge Base:** Automated website scraping with weekly synchronization and support for document uploads.
-   **Chat Widget:** An embedded iframe solution for hotel websites, utilizing local storage for session persistence.
-   **Admin Console:** A business console featuring a flyout for client-specific configuration.
-   **Firebase:** Utilized for various infrastructure components, with [[Rahil Singhi]] holding editor privileges for the test environment.

### What Works Today
-   Web chat functionality with access to the hotel's knowledge base.
-   Promo code messaging managed via client configuration prompts.
-   External URL scraping is operational in production environments.
-   Source deduplication logic, prioritizing new information over older facts.
-   Active PMS integrations enabling availability and rates queries.
-   MCP tools: `searchHotels`, `getHotelRates`, and `bookHotelOffer`.

### What's Missing / Being Built
-   **[[Sales Agent]] 1.0:** Development of proactive revenue-generating behaviors, including lead capture, offer matching, and promo deep links. Tickets have been created by [[Fredrik Sjoberg]].
-   **[[ROI Attribution]]**: A critical challenge is the inability to quantify bookings directly attributable to Maison, identified by David as the "biggest problem."
-   **[[Omnichannel]]**: Expansion beyond the web chat iframe to include platforms like `[[WhatsApp]]`, `[[Instagram]]`, `[[Facebook]]`, and `[[Email]]`.
-   **[[Cross-session memory]]**: Lack of persistent context for returning visitors without requiring a login.
-   **[[Conversational payments]]**: Users are currently redirected to a booking engine, leading to potential drop-offs.
-   **[[OHIP Certification]]**: `[[Opera Cloud]]` integration has been blocked since February due to certification requirements.
-   **[[Maison.Travel]]**: A Proof of Concept (POC) for `[[East End Long Island]]`, focusing on foundational content and a booking layer exposed via MCP.

### Key URLs
-   `maison-labs.com`: Hosts the API and internal tooling.
-   `maison.cx`: The marketing and brand website.
-   `maison.travel`: The guest-facing travel application (POC).

### Competitors Mentioned
-   `[[HiJiffy]]`, `[[Runner]]`, `[[BookBoost]]`: These competitors are actively pursuing omnichannel solutions.
-   `[[MindTrip]]`: A travel application that partners with `[[PayPal]]` and `[[Sabre]]`, built on existing data layers rather than proprietary ones.

## Related

[[Cloudbeds]],[[Muse]],[[StayNTouch]],[[Opera Cloud]],[[Firebase]],[[Rahil Singhi]],[[Sales Agent]],[[Fredrik Sjoberg]],[[ROI Attribution]],[[Omnichannel]],[[WhatsApp]],[[Instagram]],[[Facebook]],[[Email]],[[Cross-session memory]],[[Conversational payments]],[[OHIP Certification]],[[Maison.Travel]],[[East End Long Island]],[[HiJiffy]],[[Runner]],[[BookBoost]],[[MindTrip]],[[PayPal]],[[Sabre]],[[David]],[[maison-agent]],[[MCP tools]],[[Knowledge Base]],[[PMS Integrations]]
