---
title: GECO Data Parser Fix for Real Corpus Format in Gaze-Diffuse
author: ai
created_at: 2026-04-13T17:07:15.386Z
last_ai_edit: 2026-04-13T17:07:15.386Z
last_human_edit: null
last_embedded_hash: 846a0ad91ad3ae33
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-correct-geco-data-parser-for-real-corpus-format-da67ea.md]]"
tags:
  - geco
  - data parsing
  - gaze-diffuse
  - fix
  - corpus
  - data cleaning
  - python
  - pandas
  - eyetracking
---


# GECO Data Parser Fix for Real Corpus Format in Gaze-Diffuse

This article details a critical fix implemented in the GECO data parser within the `rahilsinghi/gaze-diffuse` repository to align it with the real corpus format. The update addresses inconsistencies in `WORD_ID` parsing, `sentence_id` computation, handling of sentinel values in fixation data, and filters malformed entries.


## Key Concepts

GECO Data Format,Data Parsing,Corpus Analysis,WORD_ID,sentence_id,Sentinel Values,Regex Pattern Matching,Data Cleaning

## Details

A significant update was made to the GECO (Gaze-contingent Eye-tracking Corpus) data parser in the `rahilsinghi/gaze-diffuse` project (commit `9a0d81a`, authored by Rahil Singhi on 2026-03-15). This fix ensures that the parser correctly interprets data from the actual corpus format, resolving several inconsistencies:

*   **WORD_ID Format Correction**: The parser was adjusted to recognize the `WORD_ID` format as `PART-TRIAL-WORDPOS` (e.g., "1-5-3") instead of the previously expected "w1.1" pattern. This change is crucial for accurate identification of individual words within the dataset.
*   **Sentence ID Computation**: The `sentence_id` is now correctly computed using a composite key: `PART * 10000 + TRIAL`. This provides a robust and unique identifier for sentences, ensuring proper data aggregation and analysis.
*   **Handling Sentinel Values**: The fix incorporates the use of `pd.to_numeric` to gracefully handle "." sentinel values present in fixation columns. This prevents parsing errors and ensures that numerical operations can be performed on these columns.
*   **Filtering Malformed Entries**: Rows where the `WORD_ID` does not conform to the newly defined expected regular expression pattern are now filtered out. This enhances data quality by removing entries that do not match the corpus's structural requirements.

## Related

[[Gaze-Diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]]
