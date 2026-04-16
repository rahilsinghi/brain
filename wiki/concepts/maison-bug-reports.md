---
title: Maison Bug Reports
author: ai
created_at: 2026-04-15T19:44:56.599Z
last_ai_edit: 2026-04-15T19:44:56.599Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-slack-bugs-channel-active-bug-reports-april-2026-1776280452893.md]]"
tags:
  - maison
  - bugs
  - bug reports
  - software development
  - quality assurance
  - linear
  - cloudbeds
  - webchat
  - llm
  - operations
---

# Maison Bug Reports

This article summarizes active bug reports for Maison as of April 15, 2026, categorizing them into critical immediate issues and recurring problems. It also outlines the standard bug reporting process, emphasizing the use of Linear for ticketing and communication within dedicated Slack threads.

## Key Concepts

Critical Bugs,Recurring Issues,Bug Reporting Process,Linear (Project Management),Cloudbeds (PMS),Webchat Hallucination,Pagination

## Details

The following is a summary of active bug reports for Maison, retrieved from the #bugs Slack channel on April 15, 2026.

### Critical Bugs (April 15)
*   **Site loading errors resolved** (Reported by Sandeep, April 15).
*   **10+ bugs on current Linear cycle** — [[Fredrik Sjoberg]] flagged this as a critical period due to the upcoming travel season.
*   **Production problem creating new client** — [[Fredrik Sjoberg]] encountered an error while attempting to create a new client (April 15).
*   **Unable to add website while creating new client** — Reported by Durgansh (April 15).
*   **STG BC logs out when adding user** — [[Fredrik Sjoberg]] experienced being logged out when trying to add [[Rahil Singhi]] as a user on `stg.maison-labs.com/console/users` (April 15).

### Recurring Issues
*   **Scrape failures** — Multiple clients are consistently failing to scrape data. This issue is tracked under ticket MA-815.
*   **Hallucination** — The webchat feature incorrectly referenced a hotel not present in the knowledge base (e.g., suggesting "El Monte Sagrado Resort" instead of "Grand Hacienda"). Refer to [[Anti-Hallucination Constraints in Resume Generation]] for related concepts.
*   **Cloudbeds pricing bug** — A bug in the [[Cloudbeds]] integration incorrectly mixed up per-night versus full-stay totals (MA-918). Client Rachel Flatley at Hotel Moraine reported this issue twice.
*   **Chat stalling** — Response times exceeding 40 seconds were observed on new go-live instances (leParc Suites / Springboard Hospitality), leading to cancellations.
*   **Bot re-asks for guest count** — During a live demo for Park Lane, the bot repeatedly asked for the guest count.
*   **BC Clients page slow** — The Clients page in the backend is experiencing significant slowness due to rendering all client data without proper [[Pagination]].
*   **Theme page delete** — Attempting to delete a visual on the theme page has no discernible effect.
*   **UTM override** — Booking links for clients are silently broken due to an unnoticed UTM override.

### Bug Reporting Process
The established process for reporting bugs within the #bugs Slack channel is as follows:
1.  Create a ticket in [[Linear (Project Management)]] using the designated bug template.
2.  Copy the link to the newly created [[Linear (Project Management)]] ticket.
3.  Start a new thread in the #bugs channel, including the link to the [[Linear (Project Management)]] ticket.
4.  All subsequent conversation and discussion related to that specific bug should take place within the created thread.

## Related

[[Call Preparation for Maison and Fredrik Sjoberg]],[[Fredrik Sjoberg]],[[Add Open Matter for Rahil Singhi (Karen Project)]],[[Rahil Singhi]],[[Linear (Project Management)]],[[Cloudbeds]],[[Anti-Hallucination Constraints in Resume Generation]],[[Pagination]]
