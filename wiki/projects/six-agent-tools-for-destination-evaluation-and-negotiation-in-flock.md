---
title: Six Agent Tools for Destination Evaluation and Negotiation in Flock
author: ai
created_at: 2026-04-12T21:13:08.671Z
last_ai_edit: 2026-04-12T21:13:08.671Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-six-agent-tools-for-destination-evaluation-and-negotiati-a071fe.md]]"
tags:
  - agent tools
  - travel planning
  - destination evaluation
  - negotiation
  - gemini
  - pgvector
  - flock
  - ai
  - multi-agent system
---

# Six Agent Tools for Destination Evaluation and Negotiation in Flock

This feature introduces six specialized agent tools within the [[Flock]] project, designed to evaluate travel destinations and facilitate negotiation for optimal trip planning. The tools leverage [[Gemini]] for scoring and compromise generation, alongside `pgvector` for aesthetic hotel matching based on Gemini Vision embeddings. They automate various aspects of destination analysis, from hard constraint checks to personalized trip scoring.

## Key Concepts

Agent Tools,Destination Evaluation,Travel Negotiation,Hard Constraints,Gemini Scoring,pgvector,Cosine Similarity,Gemini Vision Embeddings,Pre-seeded Data,Trip Decision Scoring

## Details

This commit introduces a suite of six agent tools for the [[Flock]] project, aimed at enhancing destination evaluation and negotiation capabilities for travel planning. Each tool serves a specific function in the multi-agent workflow:

*   `check-hard-constraints.ts`: A pure function that deterministically verifies non-negotiable trip requirements without involving a model call.
*   `evaluate-destination.ts`: Utilizes the [[Gemini]] model to score potential destinations, providing reasons for the given score.
*   `get-aesthetic-match.ts`: Employs a `pgvector` RPC to perform `match_hotels` queries, using 3072-dimensional embeddings for aesthetic matching against Gemini Vision embeddings.
*   `propose-compromise.ts`: Leverages [[Gemini]] to generate potential compromises when initial preferences cannot be fully met.
*   `search-activities.ts`: Queries a pre-seeded dataset to find available activities for a given destination.
*   `score-trip-decision.ts`: Calculates a personalized match score for a trip decision, incorporating an element of 'surprise' or novelty.

The system ensures that hard constraints are checked deterministically, guaranteeing foundational requirements are met. Aesthetic hotel matching is performed efficiently using cosine similarity on Gemini Vision embeddings stored in `pgvector`, allowing for nuanced preference fulfillment. This architecture supports a robust and flexible approach to automated travel planning and negotiation.

## Related

[[Flock]],[[Gemini]],[[pgvector]],[[Agentic Job Application System: Multi-Agent Workflow Architecture]],[[Destination Evaluation]],[[Negotiation]]
