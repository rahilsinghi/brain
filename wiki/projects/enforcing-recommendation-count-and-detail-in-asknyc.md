---
title: Enforcing Recommendation Count and Detail in askNYC
author: ai
created_at: 2026-04-12T17:37:47.926Z
last_ai_edit: 2026-04-12T17:37:47.926Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-recommend-enforce-3-4-distinct-recommendations-per-quer-f40143.md]]"
tags:
  - asknyc
  - recommendation system
  - prompt engineering
  - llm
  - fix
  - quality improvement
---

# Enforcing Recommendation Count and Detail in askNYC

This update to the askNYC project refines the synthesis prompt to ensure each query generates exactly 3-4 distinct recommendations. These recommendations are now mandated to include varied scores and different data highlights, enhancing the quality and diversity of the generated output.

## Key Concepts

Recommendation System,Prompt Engineering,Large Language Model (LLM),Data Diversity

## Details

A commit (SHA: `02bc805`) to the [[rahilsinghi/askNYC]] repository on 2026-03-28 updated the synthesis prompt used by the application's recommendation engine. The primary goal of this change was to enforce a consistent output structure for user queries.

Specifically, the prompt was modified to require:
*   **3-4 distinct named places** in the recommendations.
*   **Varied scores** for each recommended place.
*   **Different data highlights** to be presented with each recommendation.

This enhancement aims to prevent overly similar or insufficient recommendations, ensuring a richer and more informative response for users.

## Related

[[askNYC]],[[askNYC Recommendation Page]],[[askNYC /ask Recommendation Page with Multi-Agent Pipeline]],[[Prompt Engineering]],[[Large Language Models]]
