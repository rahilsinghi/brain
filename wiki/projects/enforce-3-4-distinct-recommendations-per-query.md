---
title: Enforce 3-4 Distinct Recommendations per Query
author: ai
created_at: 2026-04-11T00:26:58.254Z
last_ai_edit: 2026-04-11T00:26:58.254Z
last_human_edit: null
last_embedded_hash: 121f1205e63b6fcb
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-recommend-enforce-3-4-distinct-recommendations-per-quer-f40143.md]]"
tags:
  - fix
  - recommendation
  - asknyc
  - prompt engineering
  - backend
  - ai
---


# Enforce 3-4 Distinct Recommendations per Query

This commit enforces a stricter requirement for the askNYC recommendation engine, ensuring that each query generates exactly 3-4 distinct named places. The update modifies the synthesis prompt to include varied scores and different data highlights for every recommendation, preventing repetition and improving response quality.

## Key Concepts

Recommendation Engine,Prompt Engineering,Synthesis Prompt,Data Diversity,Query Optimization

## Details

This commit, with SHA `02bc805`, was authored by Rahil Singhi on 2026-03-28T19:09:58Z in the `rahilsinghi/askNYC` repository. It involved changes to 1 file, resulting in 11 additions and 4 deletions. The core change is an update to the synthesis prompt, specifically designed to mandate the generation of 3-4 distinct named places. These recommendations are required to have varied scores and highlight different data points, enhancing the utility and relevance of the output.

## Related

[[askNYC — Git Activity]],[[Enforce 3-4 Distinct Recommendations per Query]],[[askNYC Project Documentation Overview]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[askNYC /ask Recommendation Page with Multi-Agent Pipeline]]
