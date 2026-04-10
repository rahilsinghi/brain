---
title: Strengthen AR Baseline Tests from 3 to 10 (gaze-diffuse)
author: ai
created_at: 2026-04-10T02:14:34.444Z
last_ai_edit: 2026-04-10T02:14:34.444Z
last_human_edit: null
last_embedded_hash: b83707cf8b925cd5
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-test-strengthen-ar-baseline-tests-from-3-to-10-5951df.md]]"
tags:
  - testing
  - autoregressive
  - gaze-diffusion
  - baseline
  - unit-tests
  - config-validation
  - batch-generation
  - temperature
  - lambda
  - gaze-diffuse
---


# Strengthen AR Baseline Tests from 3 to 10 (gaze-diffuse)

A commit to the gaze-diffuse repository by Rahil Singhi expanded the autoregressive (AR) baseline test suite from 3 to 10 tests, adding 132 lines of new test coverage. The changes address config validation, lambda semantics, temperature defaults, result format verification, and multi-prompt batch behavior. This improves confidence in the correctness of the AR sampling pipeline.

## Key Concepts

- **Config Validation:** Tests for invalid configurations such as negative `top_k` and zero `max_new_tokens`
- **Lambda Semantics:** Verifying that `lam=0` correctly triggers unguided (non-gaze-conditioned) generation
- **Temperature Defaults:** Ensuring default temperature values are applied correctly alongside custom `gaze_temperature` settings
- **Result Format Verification:** Using mocked generation to assert the expected output structure of `generate_ar_samples`
- **Multi-Prompt Batching:** Validating batch behavior with 3 prompts × 3 samples = 9 expected results

## Details

## Overview

This commit (`b07cd80`) in the `rahilsinghi/gaze-diffuse` repository strengthens the AR (autoregressive) baseline test suite, increasing the number of tests from 3 to 10. The change involved modifying a single file with 132 additions and 1 deletion.

## Test Coverage Added

### Config Validation
- Tests that passing a negative `top_k` value raises an appropriate error or is handled correctly
- Tests that passing `max_new_tokens=0` is caught as an invalid configuration

### Lambda Semantics
- Confirms that setting `lam=0` disables gaze-guided generation, effectively producing unguided/standard AR samples
- This is a critical boundary condition for the gaze-diffusion hybrid model

### Temperature Handling
- Verifies that default temperature values are used when none are explicitly provided
- Tests that a custom `gaze_temperature` parameter overrides the default correctly

### Result Format
- Uses mocked generation calls to isolate and verify the output format of `generate_ar_samples`
- Ensures the returned structure matches the expected schema regardless of model internals

### Multi-Prompt Batch Testing
- Exercises the batch generation path with 3 prompts and 3 samples per prompt
- Asserts that exactly 9 results are returned, confirming correct batching logic

## Commit Metadata

| Field | Value |
|---|---|
| Repository | rahilsinghi/gaze-diffuse |
| SHA | b07cd80 |
| Date | 2026-03-15 |
| Author | Rahil Singhi |
| Files Changed | 1 |
| Additions | +132 |
| Deletions | -1 |

## Related

- [[gaze-diffuse Repository]]
- [[Autoregressive Baseline Sampling]]
- [[Gaze-Guided Diffusion Models]]
- [[generate_ar_samples Function]]
- [[Lambda Parameter Semantics]]
- [[Batch Generation Pipeline]]
- [[Rahil Singhi]]
