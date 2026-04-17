---
title: Maison AI Visibility Report
author: ai
created_at: 2026-04-15T19:44:46.627Z
last_ai_edit: 2026-04-15T19:44:46.627Z
last_human_edit: null
last_embedded_hash: 3b7450bc4b93c689
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-slack-ai-visibility-ai-viz-feature-details-1776280506742.md]]"
tags:
  - maison
  - ai
  - visibility
  - report
  - hoteltech
  - openai
  - chatgpt
  - websearch
  - saas
  - architecture
  - competitive-analysis
---


# Maison AI Visibility Report

The Maison AI Visibility Report feature helps hotels assess and improve their presence in AI search results. It achieves this by comparing information AI models like ChatGPT provide about a hotel against Maison's internal knowledge base, highlighting discrepancies and areas for improvement. The system has evolved to use OpenAI Agents SDK for more reliable web searching and comprehensive report generation.

## Key Concepts

AI Visibility,[[Maison]],[[ChatGPT]],[[OpenAI Agents SDK]],[[WebSearchTool]],Report Generation,Competitive Analysis,Hotel Technology,AI Search Optimization,Prompt Engineering

## Details

The **Maison AI Visibility Report** is a crucial feature designed to help hotels understand how they are represented in AI-driven search and conversational platforms.

## What AI Visibility Does
This feature generates a comprehensive report that contrasts the information [[ChatGPT]] provides about a hotel with the data available in Maison's proprietary Knowledge Base (KB). This comparison enables hotels to identify gaps, inaccuracies, and opportunities to enhance their discoverability and representation in AI-powered services.

## Architecture Evolution
*   **v1 (February 2026):** Initially, the system used [[Playwright]] to automate a headless Chrome browser, navigating to chatgpt.com to scrape answers. This approach proved brittle, frequently encountering login walls, IP blocks, and bot detection mechanisms.
*   **v2 (April 8, 2026):** The architecture was significantly improved by integrating the [[OpenAI Agents SDK]]. An agent, powered by [[GPT-4.1]] and equipped with a [[WebSearchTool]], now searches the web for each General Frequently Asked Question (GFAQ) related to the hotel. This update dramatically reduced processing time from 30-40 minutes to 4-5 minutes per report and includes sources for all retrieved information.

Downstream processes, including KB querying, response pairing, batch evaluation, and final report generation, remained unchanged following the v2 update.

## Report Structure
The generated report includes:
*   Total number of questions tested.
*   Coverage percentage (proportion of questions answered).
*   Average accuracy score.
*   An executive summary.
*   Identified areas for improvement, specifically focusing on questions with the lowest accuracy.
*   A complete question-by-question comparison of AI-generated content vs. KB data.

## Workflow for Commercial Team (April 14)
1.  Sales or account management team sends the report to themselves first.
2.  The report is reviewed from the perspective of a client administrator.
3.  A consultative outreach email is generated using a specific [[Claude]] prompt (provided in the Slack channel).
4.  The email aims to position Maison as a trusted advisor rather than just a vendor.

## Issues
*   **Intermittent Failures:** Reports occasional failures where no [[AWS]] task is spawned or tasks hang (MA-963).
*   **Configuration Requirements:** Requires both hotel name and address in the client configuration (Admin flyout).
*   **Data Backfilling:** Urgent need to backfill addresses for all existing clients (MA-965).

## Competitive Landscape
Several competitors are addressing similar needs:
*   [[Lighthouse (Connect AI)]]: Offers a ChatGPT app for hotels, integrating live rates and direct booking.
*   [[Cendyn (AI Connect)]]: Focuses on ensuring visibility in AI search.
*   [[Profound]]: Specializes in tracking AI visibility, mentions, and citations.
*   [[80Days]]: Utilizes a '3Cs framework' – Clarity, Consistency, Credibility – for AI content.
*   [[Gartner]]: Forecasts that 50% of website traffic will originate from AI by 2028.

## Key Metrics
*   **Traveler Behavior:** 43% of travelers use AI for trip planning.
*   **Growth:** AI search traffic is growing 50% faster than traditional search engines.
*   **Booking Preference:** 62% of travelers prefer to book direct when given the option.

## Related

[[Maison]],[[ChatGPT]],[[OpenAI Agents SDK]],[[GPT-4.1]],[[WebSearchTool]],[[Claude]],[[Playwright]],[[AWS]],[[Lighthouse (Connect AI)]],[[Cendyn (AI Connect)]],[[Profound]],[[80Days]],[[Gartner]]
