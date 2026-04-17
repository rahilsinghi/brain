---
title: Personal Agent and Mediator with 10-Step Negotiation Algorithm (Flock Project)
author: ai
created_at: 2026-04-12T17:15:08.558Z
last_ai_edit: 2026-04-12T17:15:08.558Z
last_human_edit: null
last_embedded_hash: c136a2360af0d65c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-personal-agent-and-mediator-with-10-step-negotiation-alg-4b16e7.md]]"
tags:
  - personal agent
  - mediator
  - negotiation
  - flock
  - gemini
  - supabase
  - llm
  - multi-agent system
  - trip planning
---


# Personal Agent and Mediator with 10-Step Negotiation Algorithm (Flock Project)

This article details the implementation of a personal agent and a mediator agent within the [[Flock]] project, designed to facilitate travel planning negotiations. The mediator agent employs a sophisticated 10-step algorithm to manage constraints, evaluate proposals, and resolve conflicts between users.

## Key Concepts

Personal Agent,Mediator Agent,Negotiation Algorithm,Gemini 2.5 Flash,Supabase,Why Wall,Trip Decision,Tension Score

## Details

This feature introduces two key agents to the [[Flock]] project:

*   **Personal Agent (`personal-agent.ts`)**:
    *   Utilizes [[Gemini 2.5 Flash]] for `streamText` capabilities.
    *   Operates with a round-aware system prompt.
    *   Equipped with specialized tools for destination evaluation, hotel matching, and public proposal generation.
    *   Updates `agent_status` in [[Supabase]] upon completion of its tasks.

*   **Mediator Agent (`mediator-agent.ts`)**:
    *   Implements a comprehensive 10-step negotiation algorithm to streamline trip planning:
        1.  Constraint Intersection
        2.  Aesthetic City Ranking
        3.  Per-User Evaluation
        4.  Hard Constraint Check
        5.  Compromise Negotiation
        6.  Hotel Selection
        7.  Trip Scoring
    *   Posts 'MEDIATOR' proposals to the [[Why Wall]].
    *   Responsible for writing the final `TripDecision`.
    *   Actively manages the `tension_score` throughout the negotiation process to gauge and balance user satisfaction.

This implementation was co-authored by [[Rahil Singhi]] and [[Claude Opus 4.6 (1M context)]].

## Related

[[rahilsinghi/Flock]],[[Flock]],[[Gemini 2.5 Flash]],[[Supabase]],[[Why Wall]],[[Rahil Singhi]],[[Claude Opus 4.6 (1M context)]]
