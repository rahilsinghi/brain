---
title: "Fix: Enforcing 3-4 Distinct Recommendations Per Query in AskNYC"
author: ai
created_at: 2026-04-10T21:19:42.334Z
last_ai_edit: 2026-04-10T21:19:42.334Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-recommend-enforce-3-4-distinct-recommendations-per-quer-f40143.md]]"
tags:
  - fix
  - recommendation
  - prompt
  - synthesis
  - asknyc
  - commit
  - 02bc805
---

# Fix: Enforcing 3-4 Distinct Recommendations Per Query in AskNYC

This change, implemented in the `rahilsinghi/askNYC` repository via commit `02bc805`, updates the synthesis prompt to ensure each query receives exactly 3-4 distinct recommendations. The update specifically requires named places with varied scores and different data highlights for each recommendation, enhancing output quality and diversity.

## Key Concepts

* Recommendation Systems,* Prompt Engineering,* Content Diversity,* Output Constraints,* Named Places

## Details

This commit, identified by SHA `02bc805` and authored by Rahil Singhi on 2026-03-28, introduces a critical update to the `rahilsinghi/askNYC` project. The primary goal of this fix is to enhance the quality and diversity of recommendations generated per user query.

Specifically, the modification targets the **synthesis prompt** used in the recommendation generation process. Prior to this change, the system might have produced an inconsistent number or type of recommendations. The updated prompt now strictly enforces the generation of:

*   Exactly 3 to 4 named places for each recommendation.
*   Each recommendation must include places with varied scores.
*   Each recommendation must highlight different data points, ensuring diversity beyond just the score.

This change involved modifying 1 file, with 11 additions and 4 deletions, indicating a targeted adjustment to the prompt's instructions.

## Related

[[AskNYC Project]],[[Rahil Singhi]],[[Prompt Engineering]],[[Recommendation Systems]]
