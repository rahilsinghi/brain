---
title: "Fix: Enforce 3-4 Distinct Recommendations Per Query in askNYC"
author: ai
created_at: 2026-04-13T15:57:34.502Z
last_ai_edit: 2026-04-13T15:57:34.502Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-recommend-enforce-3-4-distinct-recommendations-per-quer-f40143.md]]"
tags:
  - asknyc
  - fix
  - recommendation
  - prompt_engineering
  - llm_behavior
  - synthesis
  - backend
---

# Fix: Enforce 3-4 Distinct Recommendations Per Query in askNYC

This update to the `askNYC` project modifies the synthesis prompt to ensure that each query response includes exactly 3-4 distinct recommendations. These recommendations must feature varied scores and different data highlights, enhancing the quality and diversity of user suggestions.

## Key Concepts

Recommendation System,Synthesis Prompt,LLM Behavior Control,Query Response Formatting,Prompt Engineering

## Details

This commit addresses a fix in the `rahilsinghi/askNYC` repository, specifically targeting the recommendation generation logic. The change, identified by SHA `02bc805` and authored by Rahil Singhi on 2026-03-28T19:09:58Z, involved modifying 1 file with 11 additions and 4 deletions.

The core of the fix lies in updating the synthesis prompt provided to the underlying Language Model. The updated prompt now explicitly requires the model to return exactly 3-4 named places as recommendations. Crucially, it also mandates that these recommendations have varied scores and highlight different data points, ensuring a richer and more informative output for the user.

## Related

[[askNYC]],[[askNYC /ask Recommendation Page with Multi-Agent Pipeline]],[[AskNYC Recommendation Page with Multi-Agent Pipeline]],[[API Feature: Report Actual LLM Provider/Model in Synthesis Response]]
