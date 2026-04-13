---
title: Enforce Distinct Recommendations in askNYC Queries
author: ai
created_at: 2026-04-12T21:38:47.994Z
last_ai_edit: 2026-04-12T21:38:47.994Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-recommend-enforce-3-4-distinct-recommendations-per-quer-f40143.md]]"
tags:
  - asknyc
  - recommendation
  - prompt
  - fix
  - llm
  - user experience
---

# Enforce Distinct Recommendations in askNYC Queries

This update to the askNYC project refines the synthesis prompt to ensure that each query generates 3-4 distinct recommendations. The recommendations must feature varied scores and different data highlights, improving the quality and diversity of suggestions provided to users.

## Key Concepts

Recommendation Systems,Prompt Engineering,Multi-Agent Systems

## Details

A code fix was implemented in the `rahilsinghi/askNYC` repository (SHA `02bc805`) to modify the underlying synthesis prompt. This prompt, responsible for generating recommendations, was updated to enforce specific constraints:

*   **Quantity**: Precisely 3 to 4 named places must be recommended per query.
*   **Diversity**: Recommendations must present varied scores, indicating a range of options rather than uniformly high-scoring ones.
*   **Highlight Variation**: Each recommendation needs to feature different data highlights, ensuring that distinct aspects of the recommended places are emphasized.

This change aims to enhance the user experience by providing a more comprehensive and diverse set of suggestions in response to their inquiries.

## Related

[[askNYC — Git Activity]],[[AskNYC Recommendation Page with Multi-Agent Pipeline]],[[/ask Recommendation Page]],[[Prompt Engineering]],[[LLM]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]]
