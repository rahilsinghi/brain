---
title: Maison Linear Current Sprint Issues (April 2026)
author: ai
created_at: 2026-04-15T19:13:31.475Z
last_ai_edit: 2026-04-15T19:13:31.475Z
last_human_edit: null
last_embedded_hash: 5e993111a6aaab4e
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-linear-current-sprint-issues-april-2026-1776280390144.md]]"
tags:
  - maison
  - maison linear
  - sprint issues
  - linear
  - project management
  - ai visibility
  - scraper
  - cost optimization
  - qa
  - testing
  - deployment
  - llm
  - hallucination
  - mews
  - rate retrieval
  - client data
  - performance
  - bot interaction
  - nlp
  - ui bug
---




# Maison Linear Current Sprint Issues (April 2026)

This article details the high and medium priority issues from the Maison Linear project's current sprint, retrieved on April 15, 2026. Key challenges include ensuring data quality for AI visibility, optimizing scraper costs, addressing LLM hallucinations, and improving core system functionalities like rate retrieval and UI performance. The sprint focuses on critical fixes and foundational data enhancements to support AI initiatives and user experience.

## Key Concepts

AI Visibility,Scraper Optimization,LLM Hallucination,Rate Retrieval,Client Data Management,Bot Interaction Design,Quality Assurance,Deployment Testing,Performance Optimization,NLP Interface

## Details

This report outlines the current sprint's high and medium priority issues for the Maison Linear project, as of April 15, 2026.

## High Priority Issues

*   **MA-965: Backfill addresses for all clients (Todo)**
    *   **Assignee:** Durgansh Dixit
    *   This task is a prerequisite for [[AI Visibility]], requiring structured address data for all hotel clients. It involves auditing existing client records, populating address fields, and ensuring data quality.

*   **MA-964: Optimize scraper for cost (Todo)**
    *   **Assignee:** Noel Panicker
    *   An issue where the Indigo East End project generated over 30,000 QA pairs, leading to significant [[OpenAI Cost Management]] spend. The root cause was the scraper following links outside the target domain. A solution requires a model swap, capping vanity sites, and implementing URL filtering.

*   **MA-966: Create test cases for stg → prod deploy (In Progress)**
    *   **Assignee:** Julia Burke
    *   **Due:** April 20, 2026
    *   Building comprehensive [[Test Case Generation]] within the [[Quality Dashboard]] is crucial before the staging to production deployment targeted for April 22. The task involves using [[Claude How To]] to generate test cases from plain language scenarios.

*   **MA-963: AI Viz report silently fails (In Progress)**
    *   **Assignee:** Noel Panicker
    *   An intermittent problem where [[AI Visibility]] reports either fail to spawn an AWS task, or the task hangs, preventing email delivery. This affects some hotels (e.g., Ameswell, Hotel Alameda) while others work (e.g., Park Lane).

*   **MA-961: Hallucination — webchat references hotel not in KB (Todo)**
    *   **Assignee:** Noel Panicker
    *   A critical [[LLM Hallucination]] instance where the Grand Hacienda webchat referenced "El Monte Sagrado Resort," a hotel not present in the client's [[Knowledge Base Management]]. The model incorrectly generated an entity outside its authorized knowledge scope.

*   **MA-960: Fix rate retrieval for Mews (In Progress)**
    *   **Assignee:** Javed MD
    *   The `rates/getAll` API endpoint for [[Mews Integration]] currently returns only 10 results due to a default limitation. Additionally, it fails to filter out 'Private' and 'AvailabilityBlock' rate types, leading to incomplete or incorrect [[Rate Retrieval]].

*   **MA-959: Superadmin hard delete client (Backlog)**
    *   Addresses the need for a [[Client Data Management]] feature to remove duplicate clients created during onboarding. This involves implementing a delete button within the danger zone on the `/console/clients/:id` page.

*   **MA-958: BC Clients page slow load (Todo)**
    *   **Assignee:** Sandeep Baynes
    *   The B.C. Clients page experiences slow loading times because it renders all clients without [[Pagination]]. The proposed solution is to implement a [[Virtualized List]] combined with [[Server-Side Search]] for improved performance.

*   **MA-953: Bot re-asks for guest count already provided (Todo)**
    *   **Assignee:** Noel Panicker
    *   During a live demo for Park Lane, the bot redundantly asked for the guest count even after the user had already specified "family of four," indicating a flaw in [[Bot Interaction Design]] and [[Conversation Flow]].

## Medium Priority Issues

*   **MA-962: Ingestion sync email shows file count, not QA pair count (Todo)**
    *   **Assignee:** Durgansh Dixit
    *   The [[Data Ingestion]] sync email inaccurately reports "1 change" for each source file, instead of reflecting the actual number of [[QA Pair Counting]]-level changes.

*   **MA-957: Replace key-value client config with NLP interface (Todo)**
    *   **Assignee:** Sandeep Baynes
    *   The current client configuration relies on deterministic key-value pairs, which are not self-explanatory and are case-sensitive. The task is to transition to an [[NLP Interface]] for more intuitive and flexible client configuration.

*   **MA-955: Deleting visual in BC Theme page has no effect (Todo)**
    *   **Assignee:** Sandeep Baynes
    *   A bug in the B.C. [[Theme Management]] page where attempting to delete a visual asset has no discernible effect, indicating a UI backend synchronization issue.

## Related

[[AI Visibility]],[[OpenAI Cost Management]],[[Test Case Generation]],[[Quality Dashboard]],[[Claude How To]],[[AWS Task Management]],[[Error Handling]],[[LLM Hallucination]],[[Knowledge Base Management]],[[Mews Integration]],[[Rate Retrieval]],[[Client Data Management]],[[Admin Interface]],[[Virtualized List]],[[Server-Side Search]],[[Pagination]],[[Bot Interaction Design]],[[Conversation Flow]],[[Data Ingestion]],[[Email Notification]],[[QA Pair Counting]],[[NLP Interface]],[[Theme Management]],[[Staging to Production Deployment]]
