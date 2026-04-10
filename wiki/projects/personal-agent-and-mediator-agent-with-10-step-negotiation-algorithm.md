---
title: Personal Agent and Mediator Agent with 10-Step Negotiation Algorithm
author: ai
created_at: 2026-04-10T02:39:01.748Z
last_ai_edit: 2026-04-10T02:39:01.748Z
last_human_edit: null
last_embedded_hash: c8b9893db1c87a8f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-personal-agent-and-mediator-with-10-step-negotiation-alg-4b16e7.md]]"
tags:
  - ai-agents
  - negotiation
  - group-travel
  - mediator
  - gemini
  - supabase
  - typescript
  - multi-agent
  - flock
  - trip-planning
  - llm
  - claude
  - constraint-satisfaction
---


# Personal Agent and Mediator Agent with 10-Step Negotiation Algorithm

This commit introduces two AI agent modules to the Flock repository: a personal agent powered by Gemini 2.5 Flash that evaluates destinations and matches hotels on behalf of individual users, and a mediator agent implementing a 10-step negotiation algorithm to resolve conflicting travel preferences across multiple users. Together, these agents automate group trip planning by balancing hard constraints, aesthetic preferences, and compromise scoring.

## Key Concepts

- **Personal Agent (`personal-agent.ts`)**: A round-aware AI agent using Gemini 2.5 Flash via `streamText`, equipped with tools for destination evaluation, hotel matching, and posting public proposals; updates `agent_status` in Supabase upon completion
- **Mediator Agent (`mediator-agent.ts`)**: An orchestrating agent that runs a structured 10-step negotiation algorithm to reconcile differing user preferences and produce a final group travel decision
- **10-Step Negotiation Algorithm**: A sequential decision pipeline covering constraint intersection, aesthetic city ranking, per-user evaluation, hard constraint checking, compromise negotiation, hotel selection, trip scoring, tension management, proposal posting to the Why Wall, and writing a final `TripDecision`
- **Constraint Intersection**: The process of identifying destinations or conditions that satisfy all users' hard requirements simultaneously
- **Aesthetic City Ranking**: Scoring and ordering candidate cities based on subjective style and preference signals aggregated across users
- **Tension Score**: A numeric metric tracked by the mediator to quantify disagreement or conflict between users during negotiation rounds
- **Why Wall**: An in-app surface where the mediator posts `MEDIATOR` proposals with reasoning, making the decision process transparent to all participants
- **TripDecision**: The final structured output written by the mediator agent representing the agreed-upon group trip plan
- **Round-Aware Prompting**: The personal agent's system prompt adapts based on the current negotiation round, enabling context-sensitive responses over multiple iterations
- **Co-Authorship with Claude Opus 4.6**: The implementation was developed with AI assistance from Claude Opus 4.6 using a 1M token context window

## Details

## Overview

Commit `c13fee4` by Rahil Singhi (2026-03-21) adds 618 lines across two new TypeScript files to the Flock repository, introducing an AI-driven negotiation layer for group travel planning.

## Personal Agent (`personal-agent.ts`)

The personal agent acts as an advocate for an individual user within the Flock group planning flow. Key characteristics include:

- **Model**: Gemini 2.5 Flash via the `streamText` interface
- **Round Awareness**: The system prompt is dynamically constructed to reflect the current negotiation round, allowing the agent to adjust its advocacy strategy as the group converges on a decision
- **Tools Available**:
  - *Destination Evaluation*: Scores candidate destinations against the user's stated preferences and constraints
  - *Hotel Matching*: Identifies hotels that align with the user's accommodation requirements
  - *Public Proposal Posting*: Submits the user's preferred options to a shared proposal surface
- **Status Tracking**: Upon completion of each round, the agent writes back to a Supabase `agent_status` field, enabling real-time UI updates and orchestration by the mediator

## Mediator Agent (`mediator-agent.ts`)

The mediator agent operates above the personal agents, synthesizing their outputs into a group decision. It implements a structured 10-step algorithm:

1. **Constraint Intersection** — Computes the set of destinations satisfying every user's hard constraints
2. **Aesthetic City Ranking** — Ranks remaining candidates by aggregated aesthetic and style preferences
3. **Per-User Evaluation** — Runs individual scoring of shortlisted cities from each user's perspective
4. **Hard Constraint Check** — Validates that proposed options do not violate any user's non-negotiable requirements
5. **Compromise Negotiation** — Identifies trade-off solutions when no perfect overlap exists
6. **Hotel Selection** — Chooses accommodation options that best satisfy the group collectively
7. **Trip Scoring** — Computes an overall quality score for the proposed trip
8. **Tension Score Management** — Tracks and updates `tension_score` to quantify remaining disagreement
9. **Why Wall Proposal Posting** — Posts `MEDIATOR`-labeled proposals to the Why Wall with transparent reasoning
10. **TripDecision Write** — Persists the final agreed-upon trip as a `TripDecision` record

## Data & Infrastructure

- **Database**: Supabase is used for persisting `agent_status`, `tension_score`, and `TripDecision` records
- **Why Wall**: A shared UI surface that aggregates both personal agent and mediator proposals, providing users visibility into the negotiation rationale

## Development Notes

This commit was co-authored with **Claude Opus 4.6** (1M context window, Anthropic), suggesting the negotiation algorithm and agent scaffolding were designed in collaboration with a long-context AI assistant capable of reasoning over the full codebase simultaneously.

## Related

- [[Flock Group Travel Planning App]]
- [[Personal Agent Architecture]]
- [[Mediator Agent Design]]
- [[Gemini 2.5 Flash Integration]]
- [[10-Step Negotiation Algorithm]]
- [[Why Wall Proposal Surface]]
- [[TripDecision Data Model]]
- [[Supabase Agent Status Tracking]]
- [[Tension Score Metric]]
- [[Round-Aware Prompting]]
- [[Claude Opus 4.6 Co-Authorship]]
- [[Multi-Agent Orchestration]]
