---
title: Personal Agent and Mediator with 10-Step Negotiation Algorithm (Flock Project)
author: ai
created_at: 2026-04-12T21:15:48.623Z
last_ai_edit: 2026-04-12T21:15:48.623Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-personal-agent-and-mediator-with-10-step-negotiation-alg-4b16e7.md]]"
tags:
  - agents
  - negotiation
  - llm
  - gemini
  - supabase
  - travel
  - planning
  - flock
  - algorithm
---

# Personal Agent and Mediator with 10-Step Negotiation Algorithm (Flock Project)

This article details the implementation of a Personal Agent and a Mediator Agent within the [[Flock Project]]. The Personal Agent facilitates user interaction and generates proposals using [[Gemini 2.5 Flash]], while the Mediator Agent employs a sophisticated 10-step algorithm to negotiate, evaluate, and finalize travel itineraries.

## Key Concepts

Personal Agent,Mediator Agent,10-Step Negotiation Algorithm,Multi-Agent System,Constraint Intersection,Aesthetic City Ranking,Compromise Negotiation,Hotel Selection,Trip Scoring,Agent Status,Why Wall,TripDecision,Tension Score

## Details

This feature introduces two key agents to the [[Flock Project]] for automated travel planning and negotiation:

**Personal Agent (`personal-agent.ts`)**
*   **Functionality**: Designed to interact directly with the user and generate initial proposals.
*   **Technology**: Utilizes `streamText` powered by [[Gemini 2.5 Flash]] for natural language processing.
*   **Prompting**: Employs a round-aware system prompt to maintain conversational context.
*   **Tools**: Integrates specialized tools for:
    *   Destination evaluation
    *   Hotel matching
    *   Generating public proposals.
*   **Status Management**: Updates the `agent_status` in [[Supabase]] upon completing its tasks.

**Mediator Agent (`mediator-agent.ts`)**
*   **Functionality**: Orchestrates the negotiation process between multiple parties (implicitly, users via their Personal Agents) to arrive at a consensus trip plan.
*   **Algorithm**: Implements a comprehensive 10-step negotiation algorithm:
    1.  **Constraint Intersection**: Identifies overlapping requirements from all parties.
    2.  **Aesthetic City Ranking**: Ranks potential cities based on aesthetic and preference criteria.
    3.  **Per-User Evaluation**: Assesses proposals from each user's perspective.
    4.  **Hard Constraint Check**: Verifies adherence to non-negotiable requirements.
    5.  **Compromise Negotiation**: Facilitates finding common ground and trade-offs.
    6.  **Hotel Selection**: Chooses suitable accommodations based on negotiated parameters.
    7.  **Trip Scoring**: Assigns a score to the finalized trip based on various metrics.
*   **Output**: Posts `MEDIATOR` generated proposals to the 'Why Wall' (presumably a display interface).
*   **Decision Making**: Writes the final `TripDecision` based on the negotiation outcome.
*   **Tension Management**: Actively manages a `tension_score` throughout the negotiation to gauge and influence group dynamics.

This feature was developed by [[Rahil Singhi]] with the assistance of [[Claude]] Opus 4.6 (1M context).

**Commit Details:**
*   **Repo**: `rahilsinghi/Flock`
*   **SHA**: `c13fee4`
*   **Date**: `2026-03-21T14:23:30Z`
*   **Author**: [[Rahil Singhi]]
*   **Files changed**: 2
*   **Additions**: +618
*   **Deletions**: -0

## Related

[[Flock Project]],[[Gemini 2.5 Flash]],[[Supabase]],[[Rahil Singhi]],[[Claude]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[Multi-Agent System]],[[10-step Negotiation Algorithm]],[[Trip Scoring]]
