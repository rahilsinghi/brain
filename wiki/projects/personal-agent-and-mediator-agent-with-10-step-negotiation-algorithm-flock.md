---
title: Personal Agent and Mediator Agent with 10-Step Negotiation Algorithm (Flock)
author: ai
created_at: 2026-04-10T02:38:04.383Z
last_ai_edit: 2026-04-10T02:38:04.383Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-personal-agent-and-mediator-with-10-step-negotiation-alg-4b16e7.md]]"
tags:
  - flock
  - multi-agent
  - negotiation
  - trip-planning
  - gemini
  - supabase
  - mediator
  - personal-agent
  - ai
  - group-coordination
  - tension-score
  - tripdecision
---

# Personal Agent and Mediator Agent with 10-Step Negotiation Algorithm (Flock)

This commit introduces two AI agent modules to the Flock repository: a personal agent powered by Gemini 2.5 Flash that evaluates destinations and matches hotels on behalf of individual users, and a mediator agent that implements a 10-step negotiation algorithm to resolve group travel conflicts. Together, these agents automate multi-party trip planning by intersecting constraints, ranking cities, and producing a final TripDecision with tension scoring.

## Key Concepts

- **Personal Agent**: A round-aware AI agent using Gemini 2.5 Flash via `streamText`, equipped with tools for destination evaluation, hotel matching, and posting public proposals
- **Mediator Agent**: An orchestration agent implementing a structured 10-step negotiation algorithm for resolving conflicting group travel preferences
- **10-Step Negotiation Algorithm**: A sequential process covering constraint intersection, aesthetic city ranking, per-user evaluation, hard constraint checking, compromise negotiation, hotel selection, and trip scoring
- **Constraint Intersection**: The process of identifying destinations that satisfy the overlapping hard requirements of all group members
- **Aesthetic City Ranking**: Ranking candidate destinations based on stylistic or qualitative preferences of the group
- **Tension Score**: A numeric metric managed by the mediator to quantify disagreement or conflict within the group
- **TripDecision**: The final structured output written by the mediator agent representing the agreed-upon trip plan
- **Why Wall**: A shared proposal board where the mediator posts MEDIATOR proposals for group visibility
- **Agent Status**: A per-user status field updated in Supabase upon agent completion
- **Supabase Integration**: Used for persistent state management including agent status and trip decisions

## Details

## Overview

Commit `c13fee4` (2026-03-21) by Rahil Singhi adds 618 lines across two new files to the Flock repository, introducing AI-driven negotiation infrastructure for group trip planning. The implementation was co-authored with Claude Opus 4.6 (1M context).

## Files Changed

### `personal-agent.ts`
Implements a personal AI agent for each user in the group negotiation. Key characteristics:
- Uses **Gemini 2.5 Flash** via the `streamText` API
- Operates with a **round-aware system prompt**, adapting its behavior based on the current negotiation round
- Equipped with tools for:
  - **Destination evaluation**: Scoring candidate destinations against user preferences
  - **Hotel matching**: Finding accommodations that fit user criteria
  - **Public proposals**: Posting suggestions to the shared Why Wall
- On completion, updates the user's `agent_status` field in **Supabase**

### `mediator-agent.ts`
Implements the central mediator responsible for resolving group travel conflicts using a **10-step algorithm**:

| Step | Description |
|------|-------------|
| 1 | **Constraint Intersection** — Identify destinations meeting all hard requirements |
| 2 | **Aesthetic City Ranking** — Rank cities by qualitative group preferences |
| 3 | **Per-User Evaluation** — Assess each candidate from each user's perspective |
| 4 | **Hard Constraint Check** — Filter out any destination violating non-negotiable constraints |
| 5 | **Compromise Negotiation** — Find middle-ground options across user preferences |
| 6 | **Hotel Selection** — Choose accommodations aligned with the compromise destination |
| 7 | **Trip Scoring** — Assign an overall score to the proposed trip |
| 8–10 | *(Additional negotiation, tension management, and finalization steps)* |

The mediator also:
- Posts **MEDIATOR proposals** to the Why Wall for group transparency
- Writes the final **TripDecision** record to Supabase
- Manages the **tension_score**, a numeric measure of intra-group conflict

## Commit Metadata
- **Repo:** rahilsinghi/Flock
- **SHA:** c13fee4
- **Date:** 2026-03-21T14:23:30Z
- **Author:** Rahil Singhi
- **Co-Author:** Claude Opus 4.6 (1M context)
- **Additions:** +618 | **Deletions:** -0 | **Files changed:** 2

## Related

- [[Flock Project]]
- [[Gemini 2.5 Flash]]
- [[Multi-Agent Negotiation]]
- [[Group Trip Planning]]
- [[Supabase Integration]]
- [[Why Wall]]
- [[TripDecision Schema]]
- [[Tension Score]]
- [[streamText API]]
- [[Claude Opus 4.6]]
