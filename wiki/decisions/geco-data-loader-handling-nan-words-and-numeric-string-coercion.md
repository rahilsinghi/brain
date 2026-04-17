---
title: "GECO Data Loader: Handling NaN Words and Numeric String Coercion"
author: ai
created_at: 2026-04-12T21:34:20.006Z
last_ai_edit: 2026-04-12T21:34:20.006Z
last_human_edit: null
last_embedded_hash: 30a57710f97b5a70
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-data-handle-nan-words-and-numeric-string-coercion-cd1b39.md]]"
tags:
  - fix
  - data
  - geco
  - pandas
  - nan
  - type coercion
  - gaze-diffuse
  - data cleaning
---


# GECO Data Loader: Handling NaN Words and Numeric String Coercion

This update addresses data loading issues within the GECO corpus loader for the [[Gaze-Diffuse]] project. It specifically fixes problems with `NaN` words and incorrect parsing of numeric strings as floats by `pandas`. The solution involves adding `dropna` for the word column and coercing data to string types during both XLSX processing and CSV reloading.

## Key Concepts

[[Data Cleaning]],[[NaN Value Handling]],[[Type Coercion]],[[Data Loading]],[[Pandas]]

## Details

The commit `7f4d82e` in the `rahilsinghi/gaze-diffuse` repository focuses on improving the robustness of the GECO corpus loader. Analysis revealed that the GECO corpus contained 12 rows with `NaN` (Not a Number) values in the word column, which could lead to processing errors. Additionally, 205 words that appeared numeric (e.g., "1984") were incorrectly parsed as floating-point numbers by the `[[Pandas]]` library, instead of being treated as strings.

To resolve these issues, the following changes were implemented:

*   A `dropna` operation was added specifically for the word column during data loading, ensuring that rows with missing word values are handled gracefully.
*   Explicit type coercion using `astype(str)` was applied to the relevant columns. This ensures that both the initial XLSX processing and subsequent CSV reloading paths consistently treat these values as strings, preventing unintended float conversions.

This fix enhances the reliability of the GECO data ingestion pipeline, crucial for the `[[Gaze-Diffuse]]` project's functionality. The work was co-authored with [[Claude Opus 4.6]].

## Related

[[Gaze-Diffuse]],[[GECO Data]],[[Pandas]],[[Claude Opus 4.6]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]]
