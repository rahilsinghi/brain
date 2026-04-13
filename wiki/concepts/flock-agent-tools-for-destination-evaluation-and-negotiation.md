---
title: "Flock: Agent Tools for Destination Evaluation and Negotiation"
author: ai
created_at: 2026-04-10T17:07:00.837Z
last_ai_edit: 2026-04-10T17:07:00.837Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-six-agent-tools-for-destination-evaluation-and-negotiati-a071fe.md]]"
tags:
  - agent tools
  - destination evaluation
  - negotiation
  - ai
  - gemini
  - pgvector
  - flock
  - trip planning
  - software development
  - commit
  - ai agents
---

# Flock: Agent Tools for Destination Evaluation and Negotiation

This entry details a set of six agent tools developed for the Flock project, designed to automate and enhance the process of evaluating travel destinations and negotiating trip plans. These tools leverage AI models like Gemini for scoring, aesthetic matching, and compromise generation, alongside deterministic checks and vector databases.

## Key Concepts

[[check-hard-constraints.ts]],[[evaluate-destination.ts]],[[get-aesthetic-match.ts]],[[propose-compromise.ts]],[[search-activities.ts]],[[score-trip-decision.ts]],Gemini AI Model,pgvector,Cosine Similarity,Deterministic Constraints,AI Agents

## Details

This commit (`b1ef2c4`) by Rahil Singhi, co-authored by Claude Opus 4.6, introduces six distinct agent tools to the `rahilsinghi/Flock` repository. These tools facilitate various stages of destination evaluation and trip negotiation, integrating AI capabilities with structured data processing.

**Tools Overview:**
*   `check-hard-constraints.ts`: A pure function designed to deterministically verify hard constraints without requiring AI model calls.
*   `evaluate-destination.ts`: Utilizes the Gemini AI model to score potential destinations, providing reasons for the scores.
*   `get-aesthetic-match.ts`: Implements aesthetic matching for hotels using `pgvector` with a 3072-dimensional embedding, employing cosine similarity against Gemini Vision embeddings.
*   `propose-compromise.ts`: Leverages the Gemini AI model to generate potential compromises during negotiation scenarios.
*   `search-activities.ts`: Queries a pre-seeded database to find relevant activities for a destination.
*   `score-trip-decision.ts`: Calculates a personalized match score for a trip decision, incorporating elements of 'surprise'.

**Technical Details:**
*   **Repository:** `rahilsinghi/Flock`
*   **Commit SHA:** `b1ef2c4`
*   **Date:** 2026-03-21T14:23:18Z
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Opus 4.6 (1M context)
*   **Changes:** 6 files changed, +450 additions, 0 deletions.

## Related

[[Flock Project]],[[Rahil Singhi]],[[Gemini (AI model)]],[[pgvector]],[[AI Agents]],[[Trip Planning]]
