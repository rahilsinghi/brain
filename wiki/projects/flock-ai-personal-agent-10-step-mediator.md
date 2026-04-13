---
title: "Flock AI: Personal Agent & 10-Step Mediator"
author: ai
created_at: 2026-04-10T17:08:09.294Z
last_ai_edit: 2026-04-10T17:08:09.294Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-personal-agent-and-mediator-with-10-step-negotiation-alg-4b16e7.md]]"
tags:
  - ai-agents
  - negotiation
  - trip-planning
  - flock
  - gemini-2.5-flash
  - supabase
  - claude-opus-4.6
  - personal-agent
  - mediator-agent
  - algorithm
  - multi-agent-system
  - software-development
---

# Flock AI: Personal Agent & 10-Step Mediator

This entry details the Personal Agent and Mediator Agent components within the Flock project, designed for automated trip planning. The Personal Agent gathers user preferences using AI, while the Mediator Agent employs a sophisticated 10-step algorithm to resolve conflicts, negotiate compromises, and finalize trip decisions.

## Key Concepts

Personal Agent,Mediator Agent,10-step Negotiation Algorithm,AI-powered Negotiation,Trip Planning,Constraint Intersection,Aesthetic City Ranking,Compromise Negotiation,Gemini 2.5 Flash,Supabase Integration,Why Wall (platform),TripDecision (output),tension_score (metric)

## Details

The Flock project, developed by [[Rahil Singhi]] (commit `c13fee4` on 2026-03-21), introduces a dual-agent system for automated, collaborative trip planning. This development involved co-authorship with [[Claude Opus 4.6]].

**Personal Agent (personal-agent.ts):**
This agent is responsible for understanding and evaluating individual user preferences.
- **Core Technology:** Utilizes `streamText` with [[Gemini 2.5 Flash]] for natural language processing and interaction.
- **Functionality:** Employs a `round-aware system prompt` to adapt to conversational context. It is equipped with specialized `tools` for `destination evaluation`, `hotel matching`, and generating `public proposals` based on user input.
- **Status Management:** Updates the `agent_status` via [[Supabase]] upon completion of its tasks, ensuring real-time progress tracking.

**Mediator Agent (mediator-agent.ts):**
The Mediator Agent acts as the central negotiation and decision-making engine, designed to reconcile potentially conflicting preferences among multiple users.
- **10-Step Algorithm:** The core of its operation is a comprehensive negotiation algorithm, with key steps identified as:
    1.  **Constraint Intersection:** Identifies common ground and overlapping constraints.
    2.  **Aesthetic City Ranking:** Ranks potential destinations based on aesthetic preferences.
    3.  **Per-User Evaluation:** Considers each user's individual scores and priorities.
    4.  **Hard Constraint Check:** Verifies that all non-negotiable requirements are met.
    5.  **Compromise Negotiation:** Facilitates trade-offs and finds acceptable middle ground.
    6.  **Hotel Selection:** Chooses suitable accommodation options.
    7.  **Trip Scoring:** Calculates an overall score for proposed itineraries.
    (The raw content mentions a "10-step algorithm," implying additional steps beyond those explicitly listed.)
- **Output & Management:**
    - Posts `MEDIATOR proposals` to the [[Why Wall]] for user review and feedback.
    - Writes the final `TripDecision` document upon successful negotiation.
    - Manages a `tension_score` to track and mitigate conflict levels during the negotiation process.

This system represents a sophisticated approach to automated group decision-making, particularly for complex tasks like travel planning.

## Related

[[Flock Project]],[[Rahil Singhi]],[[Gemini 2.5 Flash]],[[Claude Opus 4.6]],[[Supabase]],[[Why Wall]],[[AI Agents]],[[Negotiation Algorithms]],[[Automated Trip Planning]]
