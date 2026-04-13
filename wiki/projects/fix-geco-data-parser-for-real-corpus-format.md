---
title: "Fix: GECO Data Parser for Real Corpus Format"
author: ai
created_at: 2026-04-10T18:05:18.826Z
last_ai_edit: 2026-04-10T18:05:18.826Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-correct-geco-data-parser-for-real-corpus-format-da67ea.md]]"
tags:
  - geco
  - data parsing
  - fix
  - corpus
  - gaze-diffuse
  - bugfix
  - python
---

# Fix: GECO Data Parser for Real Corpus Format

This article details a critical fix implemented in the `gaze-diffuse` repository to correctly parse GECO dataset files, specifically addressing issues with WORD_ID formats, sentence_id computation, and handling sentinel values in fixation data. The correction ensures accurate processing of real corpus data for research purposes.

## Key Concepts

- GECO Dataset,- Data Parsing,- WORD_ID,- sentence_id,- Fixations,- Data Cleaning,- Regular Expressions

## Details

This commit addresses a significant bug in the GECO data parser within the `gaze-diffuse` project, ensuring that the parser correctly interprets the real corpus format. The changes were made by Rahil Singhi on March 15, 2026.

### Commit Details
- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** `9a0d81a`
- **Date:** 2026-03-15T23:36:36Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +13
- **Deletions:** -3

### Specific Corrections Implemented
1.  **WORD_ID Format:** The parser was updated to recognize the correct `WORD_ID` format, which is `PART-TRIAL-WORDPOS` (e.g., `"1-5-3"`), instead of the previously assumed `"w1.1"` format.
2.  **`sentence_id` Computation:** The `sentence_id` is now accurately computed as a composite key using `PART * 10000 + TRIAL`, ensuring unique and consistent identification of sentences.
3.  **Fixation Data Handling:** Improved robust handling of `"."` sentinel values found in fixation columns by utilizing `pd.to_numeric`, allowing proper conversion of numerical data while managing missing or invalid entries.
4.  **Data Filtering:** Added a filtering step to remove rows where the `WORD_ID` does not conform to the expected regular expression pattern, further enhancing data quality and preventing parsing errors.

## Related

[[GECO Dataset]],[[Data Parsing]],[[Data Cleaning]],[[Gaze-Diffuse Project]],[[Fixations]]
