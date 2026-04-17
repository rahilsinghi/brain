---
title: "Flock Agent Tools: Destination Evaluation and Negotiation"
author: ai
created_at: 2026-04-10T21:07:49.056Z
last_ai_edit: 2026-04-10T21:07:49.056Z
last_human_edit: null
last_embedded_hash: c64d6d7ae47353dd
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-six-agent-tools-for-destination-evaluation-and-negotiati-a071fe.md]]"
tags:
  - agent
  - tools
  - flock
  - gemini
  - pgvector
  - ai
  - travel
  - negotiation
  - destination-evaluation
  - commit
  - backend
---


# Flock Agent Tools: Destination Evaluation and Negotiation

This entry details a set of six agent tools within the `Flock` repository designed for sophisticated travel destination evaluation and trip negotiation. These tools integrate AI models like Gemini, vector databases (pgvector), and deterministic functions to assess destinations, generate compromises, and personalize trip decisions.

## Key Concepts

Agent Tools,Destination Evaluation,Trip Negotiation,Hard Constraints (deterministic),Gemini (AI Model),pgvector (vector database),Cosine Similarity,Gemini Vision Embeddings,AI-powered Travel Planning

## Details

This commit (`b1ef2c4`) introduces a comprehensive suite of six agent tools developed for the `Flock` project. These tools are designed to streamline and enhance the process of evaluating potential travel destinations and negotiating trip decisions, leveraging a blend of AI, vector search, and deterministic logic.

### Overview of Agent Tools:

*   **`check-hard-constraints.ts`**: A pure function responsible for deterministically verifying hard constraints, operating independently without requiring external model calls. This ensures critical criteria are met reliably.
*   **`evaluate-destination.ts`**: Utilizes the **Gemini** AI model to score destinations, providing detailed reasons and insights behind its evaluations. This enables a nuanced understanding of a destination's suitability.
*   **`get-aesthetic-match.ts`**: Employs **`pgvector`** for efficient hotel matching. It performs an RPC (Remote Procedure Call) to match hotels using 3072-dimensional Gemini Vision embeddings, applying **cosine similarity** to identify aesthetically similar options.
*   **`propose-compromise.ts`**: Leverages the **Gemini** AI model to generate potential compromises during trip planning, facilitating agreement among travelers by suggesting balanced options.
*   **`search-activities.ts`**: A dedicated tool for querying pre-seeded activities, allowing agents to quickly find relevant options for a destination.
*   **`score-trip-decision.ts`**: Calculates a personalized match score for trip decisions for each user, integrating an element of 'surprise' to enhance the user experience.

The development of these tools benefited from significant contributions, including co-authorship by **Claude Opus 4.6**, underscoring the collaborative and AI-assisted nature of the project.

## Related

[[Flock (Project)]],[[Gemini (AI Model)]],[[pgvector]],[[Claude Opus 4.6]],[[AI Agents]],[[Travel Planning]],[[Vector Embeddings]]
