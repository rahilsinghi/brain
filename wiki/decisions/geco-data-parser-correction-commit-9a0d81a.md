---
title: GECO Data Parser Correction (Commit 9a0d81a)
author: ai
created_at: 2026-04-10T22:04:45.950Z
last_ai_edit: 2026-04-10T22:04:45.950Z
last_human_edit: null
last_embedded_hash: c8fa59abf50e3923
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-correct-geco-data-parser-for-real-corpus-format-da67ea.md]]"
tags:
  - geco
  - data parsing
  - bug fix
  - python
  - pandas
  - regex
  - word_id
  - sentence_id
  - gaze-diffuse
---


# GECO Data Parser Correction (Commit 9a0d81a)

This commit addresses critical corrections to the GECO data parser within the `rahilsinghi/gaze-diffuse` repository. It updates the parser to correctly interpret the real GECO corpus format, resolving issues with `WORD_ID` and `sentence_id` computation, and improving robustness against sentinel values and malformed `WORD_ID` patterns.

## Key Concepts

GECO Data Format,WORD_ID Structure,sentence_id Computation,Sentinel Values in Data,Regular Expressions for Data Validation,Data Filtering

## Details

This entry documents a crucial fix implemented in the `rahilsinghi/gaze-diffuse` repository, specifically addressing the GECO data parser. The correction ensures the parser accurately handles the 'real corpus format' of the GECO dataset.

**Commit Details:**
*   **SHA:** `9a0d81a`
*   **Author:** Rahil Singhi
*   **Date:** 2026-03-15T23:36:36Z
*   **Files Changed:** 1
*   **Additions:** +13 lines
*   **Deletions:** -3 lines

**Key Changes and Rationale:**

1.  **Corrected `WORD_ID` Format:** The parser was updated to recognize the `WORD_ID` format as `PART-TRIAL-WORDPOS` (e.g., `"1-5-3"`), diverging from the previously assumed `"w1.1"` format. This is vital for correctly identifying individual words within the GECO corpus.
2.  **`sentence_id` Computation:** A new method for computing `sentence_id` was introduced, defined as `PART * 10000 + TRIAL`. This composite key ensures unique and meaningful sentence identifiers.
3.  **Handling Sentinel Values:** The correction specifically addresses how `"."` (dot) sentinel values are handled in fixation columns. The `pd.to_numeric` function is now properly utilized to convert these values, likely coercing them to `NaN` or a similar numeric representation for proper data analysis.
4.  **Robust `WORD_ID` Filtering:** The parser now includes a step to filter out rows where the `WORD_ID` does not match the expected regular expression pattern. This improves data quality by discarding malformed or irrelevant entries.

## Related

[[GECO Dataset]],[[rahilsinghi/gaze-diffuse]],[[Data Parsing]]
