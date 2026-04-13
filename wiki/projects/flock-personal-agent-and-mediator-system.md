---
title: "Flock: Personal Agent and Mediator System"
author: ai
created_at: 2026-04-10T21:08:56.073Z
last_ai_edit: 2026-04-10T21:08:56.073Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-personal-agent-and-mediator-with-10-step-negotiation-alg-4b16e7.md]]"
tags:
  - personal agent
  - mediator agent
  - negotiation
  - ai
  - llm
  - gemini
  - flock
  - trip planning
  - multi-agent system
  - supabase
  - why wall
  - claude opus
  - algorithm
---

# Flock: Personal Agent and Mediator System

This entry details a significant feature implementation within the `rahilsinghi/Flock` project, introducing a sophisticated multi-agent system. It comprises a personal agent utilizing Gemini 2.5 Flash for user-specific evaluations and a mediator agent orchestrating a 10-step negotiation algorithm to resolve travel planning conflicts. The system manages proposals, final decisions, and user tension scores.

## Key Concepts

Personal Agent,Mediator Agent,Multi-Agent System,10-Step Negotiation Algorithm,Constraint Intersection,Aesthetic City Ranking,Compromise Negotiation,Trip Scoring,Gemini 2.5 Flash,Supabase,Why Wall (Flock),TripDecision (Flock),Tension Score (Flock)

## Details

This entry describes a significant feature implementation within the `[[Flock]]` project, identified by commit `c13fee4`, authored by [[Rahil Singhi]] on March 21, 2026. This commit involved changes to two files, adding 618 lines of code.

**Key Components:**

*   **`personal-agent.ts`**:
    *   Utilizes `streamText` capabilities, powered by [[Gemini 2.5 Flash]], for generating user-specific responses.
    *   Employs a round-aware system prompt to maintain context across interactions.
    *   Integrates specialized tools for:
        *   Destination evaluation
        *   Hotel matching
        *   Generating public proposals
    *   Updates the `[[Agent Status]]` within [[Supabase]] upon completion of its tasks.

*   **`mediator-agent.ts`**:
    *   Implements a sophisticated **10-step negotiation algorithm** designed for complex trip planning scenarios. The described steps include:
        1.  Constraint intersection
        2.  Aesthetic city ranking
        3.  Per-user evaluation
        4.  Hard constraint check
        5.  Compromise negotiation
        6.  Hotel selection
        7.  Trip scoring
    *   Responsible for posting `MEDIATOR` proposals to the `[[Why Wall]]`.
    *   Finalizes the planning process by writing a `[[TripDecision]]`.
    *   Actively manages and adjusts the `[[Tension Score]]` throughout the negotiation process to guide decision-making.

This development was co-authored with assistance from [[Claude Opus 4.6]].

## Related

[[Flock]],[[Rahil Singhi]],[[Gemini 2.5 Flash]],[[Supabase]],[[Why Wall]],[[Claude Opus 4.6]],[[Agent Status]],[[TripDecision]],[[Tension Score]]
