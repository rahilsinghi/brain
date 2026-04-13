---
title: Six Agent Tools for Destination Evaluation and Negotiation (Flock Project)
author: ai
created_at: 2026-04-12T17:12:36.389Z
last_ai_edit: 2026-04-12T17:12:36.389Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-six-agent-tools-for-destination-evaluation-and-negotiati-a071fe.md]]"
tags:
  - agent tools
  - flock
  - destination evaluation
  - negotiation
  - gemini
  - pgvector
  - ai
  - travel tech
  - multi-agent systems
---

# Six Agent Tools for Destination Evaluation and Negotiation (Flock Project)

This article details the implementation of six specialized agent tools within the Flock project, designed for comprehensive destination evaluation and negotiation. These tools leverage a combination of deterministic logic, Gemini LLM capabilities for scoring and compromise generation, and pgvector for aesthetic matching based on visual embeddings.

## Key Concepts

Agent Tools,Destination Evaluation,Negotiation,Gemini (Large Language Model),pgvector,Cosine Similarity,Hard Constraints,AI-Assisted Development

## Details

A set of six distinct agent tools has been developed as part of the [[Flock Project]] to facilitate sophisticated destination evaluation and negotiation processes. Each tool serves a specific function, contributing to a robust multi-agent workflow:

*   `check-hard-constraints.ts`: This is a pure function that deterministically checks hard constraints without involving LLM calls, ensuring strict adherence to non-negotiable criteria.
*   `evaluate-destination.ts`: Utilizes the [[Gemini]] LLM to score potential destinations, providing detailed reasons for its evaluations.
*   `get-aesthetic-match.ts`: Employs `pgvector` for performing `match_hotels` RPC. This tool matches hotels based on aesthetic preferences using 3072-dimensional [[Gemini Vision]] embeddings and [[Cosine Similarity]] for similarity comparisons.
*   `propose-compromise.ts`: Leverages the [[Gemini]] LLM to generate potential compromises during negotiation phases, offering flexible solutions.
*   `search-activities.ts`: Queries a pre-seeded database of activities, providing relevant options for a given destination.
*   `score-trip-decision.ts`: Calculates a personalized match score for trip decisions, incorporating a 'surprise' metric to account for novel or unexpected findings.

The development of these tools benefited from [[AI-Assisted Development]], specifically with contributions from Claude Opus 4.6.

## Related

[[Flock Project]],[[Agent Tools]],[[Gemini]],[[Gemini Vision]],[[pgvector]],[[Cosine Similarity]],[[AI-Assisted Development]]
