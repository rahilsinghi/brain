---
title: GECO Data Parser Correction for Real Corpus Format
author: ai
created_at: 2026-04-12T17:06:49.683Z
last_ai_edit: 2026-04-12T17:06:49.683Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-correct-geco-data-parser-for-real-corpus-format-da67ea.md]]"
tags:
  - gaze-diffuse
  - geco
  - data-parsing
  - bugfix
  - data-format
  - eye-tracking
  - pandas
---

# GECO Data Parser Correction for Real Corpus Format

This article details a critical fix implemented in the `gaze-diffuse` repository to correctly parse GECO eye-tracking data. The update addresses discrepancies in `WORD_ID` formatting, `sentence_id` calculation, and robustly handles sentinel values in fixation columns, ensuring accurate data processing for the real corpus format.

## Key Concepts

[[GECO Data Format]],Data Parsing,Regular Expressions,Pandas `pd.to_numeric`,Error Handling

## Details

A significant correction was applied to the GECO data parser within the `rahilsinghi/gaze-diffuse` repository to align with the actual corpus data format. The primary issues addressed include:

1.  **`WORD_ID` Format Discrepancy**: The parser was updated to recognize `WORD_ID` in the format `PART-TRIAL-WORDPOS` (e.g., "1-5-3") instead of the previously assumed "w1.1" format.
2.  **`sentence_id` Calculation**: The `sentence_id` is now accurately computed using a composite key derived from `PART * 10000 + TRIAL`, ensuring unique and correct sentence identification.
3.  **Handling Sentinel Values**: The `pd.to_numeric` function from the Pandas library is now employed to robustly handle "." (dot) sentinel values present in fixation-related columns, preventing data type errors and ensuring proper numerical conversion.
4.  **Data Filtering**: Rows where the `WORD_ID` does not conform to the expected regex pattern are now filtered out, improving data quality and consistency.

## Related

[[Gaze-Diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[Smoke, Integration, and GECO Data Validation Tests]],[[Add Smoke, Integration, and GECO Data Validation Tests]],[[Add Test Outputs for Validation Layer Testing (a440e76)]]
