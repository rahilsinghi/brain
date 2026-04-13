---
title: Enforce Distinct Recommendations in askNYC Synthesis Prompt
author: ai
created_at: 2026-04-13T17:21:17.165Z
last_ai_edit: 2026-04-13T17:21:17.165Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-recommend-enforce-3-4-distinct-recommendations-per-quer-f40143.md]]"
tags:
  - asknyc
  - recommendation
  - prompt engineering
  - synthesis
  - user experience
  - nlp
  - commit
---

# Enforce Distinct Recommendations in askNYC Synthesis Prompt

This commit addresses a critical refinement in the `askNYC` project, updating the synthesis prompt to ensure each query generates exactly 3-4 distinct recommendations. The enhancement mandates that these recommendations feature varied scores and highlight different data points, significantly improving the quality and diversity of user suggestions.

## Key Concepts

Recommendation Engine,Prompt Engineering,Natural Language Processing (NLP),Data Synthesis,User Experience (UX),Commit Management

## Details

This commit, identified by SHA `02bc805` in the `rahilsinghi/askNYC` repository, was authored by Rahil Singhi on March 28, 2026. The core change involves a targeted modification to the synthesis prompt used within the `askNYC` recommendation system. The update specifically enforces that all generated recommendations must adhere to the following criteria:

*   **Quantity:** Each query must yield precisely 3 to 4 named places.
*   **Diversity:** Recommendations must present varied scores, avoiding repetition or clustering.
*   **Highlighting:** Each recommendation needs to highlight different data points, ensuring a comprehensive and unique perspective for the user.

This fix aims to enhance the utility and perceived intelligence of the `askNYC` platform by preventing homogenous or insufficient recommendation outputs, thereby improving the overall user experience when seeking urban intelligence.

## Related

[[askNYC — Git Activity]],[[AskNYC Recommendation Page with Multi-Agent Pipeline]],[[/ask Recommendation Page]],[[askNYC: Model Update to Gemini 2.5 Flash Native Audio]],[[ADK Multi-Agent Backend for askNYC with NYC Open Data]]
