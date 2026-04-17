---
title: GECO Data Parser Fix for Gaze-Diffuse
author: ai
created_at: 2026-04-12T21:07:48.152Z
last_ai_edit: 2026-04-12T21:07:48.152Z
last_human_edit: null
last_embedded_hash: 70c64b35e07c2981
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-correct-geco-data-parser-for-real-corpus-format-da67ea.md]]"
tags:
  - gaze-diffuse
  - geco
  - data parsing
  - bug fix
  - eye tracking
  - data integrity
---


# GECO Data Parser Fix for Gaze-Diffuse

This article details a critical fix implemented in the `rahilsinghi/gaze-diffuse` repository to correctly parse GECO eye-tracking data. The update addresses discrepancies in `WORD_ID` format, `sentence_id` computation, and robust handling of sentinel values in fixation columns, ensuring accurate data processing for the real corpus format.

## Key Concepts

GECO data parsing,WORD_ID format correction,sentence_id computation,Fixation data handling,Regular expression validation,Data integrity

## Details

A patch was applied to the `rahilsinghi/gaze-diffuse` repository (SHA: `9a0d81a`) on 2026-03-15 to correct the GECO (Gaze-Enhanced Corpus) data parser. The primary issues addressed include:

*   **`WORD_ID` Format:** The parser was previously expecting a `WORD_ID` format like "w1.1". The fix updates this expectation to the actual corpus format, which is "PART-TRIAL-WORDPOS" (e.g., "1-5-3").
*   **`sentence_id` Computation:** The `sentence_id` is now accurately computed as a composite key by combining `PART * 10000 + TRIAL`.
*   **Fixation Column Handling:** Sentinel values represented by "." in fixation columns are now robustly handled using `pd.to_numeric` to ensure proper data conversion.
*   **Data Filtering:** An additional layer of data integrity is introduced by filtering out rows where the `WORD_ID` does not match the expected regular expression pattern, preventing malformed data from being processed.

## Related

[[Gaze-Diffuse]],[[Add Smoke, Integration, and GECO Data Validation Tests]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]]
