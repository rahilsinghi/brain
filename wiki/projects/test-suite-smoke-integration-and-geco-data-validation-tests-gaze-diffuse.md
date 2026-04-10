---
title: "Test Suite: Smoke, Integration, and GECO Data Validation Tests (gaze-diffuse)"
author: ai
created_at: 2026-04-10T02:47:36.888Z
last_ai_edit: 2026-04-10T02:47:36.888Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-test-add-smoke-integration-and-geco-data-validation-882ea5.md]]"
tags:
  - testing
  - smoke-tests
  - integration-tests
  - geco
  - gaze-diffuse
  - eye-tracking
  - diffusion-models
  - nlp
  - coverage
  - validation
  - rahil-singhi
  - python
---

# Test Suite: Smoke, Integration, and GECO Data Validation Tests (gaze-diffuse)

This commit adds a comprehensive test suite to the rahilsinghi/gaze-diffuse repository, introducing 69 passing tests across three test files covering smoke tests, integration tests, and GECO data validation. The tests achieve 51% code coverage and validate key components including the training loop, data pipeline, GazeDiffuse model, and GECO dataset handling. GECO-specific tests are auto-skipped when the dataset is not present.

## Key Concepts

- **Smoke Tests**: Lightweight tests verifying core training loop behavior, including loss decrease, checkpoint round-trips, and token/vocabulary scoring
- **Integration Tests**: End-to-end and component-level tests covering the full data pipeline, predictor gradients, guided vs. unguided generation, and metrics on generated output
- **GECO Data Validation**: Tests for real GECO dataset loading, fixation ranges, example extraction, cross-validation split leakage prevention, and dataset tokenization
- **Code Coverage**: 51% coverage achieved across the codebase with all 69 tests passing
- **Auto-Skip Mechanism**: GECO data tests are conditionally skipped when the dataset files are not present, enabling CI environments without the dataset to still run the suite
- **GazeDiffuse Model**: Tested with a mock MDLM combined with a real predictor to validate guided diffusion behavior
- **Spearman Correlation**: Used as a validation metric within the smoke test suite to assess ranking quality

## Details

## Overview

Commit `3a7a9dd` (2026-03-15) by Rahil Singhi introduces a foundational test suite to the `gaze-diffuse` repository. Three new test files were added with a total of **+669 lines** and no deletions, resulting in **69 passing tests** at **51% code coverage**.

---

## Test Files

### `test_training_smoke.py` (5 tests)
Provides fast, lightweight verification of the training pipeline:
- **Training loop loss decrease**: Confirms the model loss reduces over training steps.
- **Checkpoint save/load round-trip**: Validates that model state is correctly serialized and restored.
- **`score_tokens` after training**: Checks token-level scoring behavior post-training.
- **`score_vocabulary` after training**: Checks vocabulary-level scoring behavior post-training.
- **Validation Spearman correlation**: Asserts that predicted rankings correlate with ground truth using Spearman's rank correlation.

### `test_integration.py` (11 tests)
Covers interactions between major system components:
- **Data pipeline chain**: Verifies end-to-end data flow from raw input to model-ready format.
- **Predictor forward with gradients**: Confirms gradient flow through the predictor module.
- **GazeDiffuse with mock MDLM + real predictor**: Tests the diffusion model using a mocked language model backbone paired with a real predictor.
- **Guided vs. unguided output difference**: Asserts that guidance meaningfully changes generated outputs.
- **AR baseline generation**: Validates autoregressive baseline text generation.
- **Metrics on generated output**: Computes and checks evaluation metrics on model outputs.
- **Full E2E pipeline**: Runs the complete pipeline from data ingestion to output evaluation.

### `test_geco_data.py` (5 tests)
Validates integration with the GECO eye-tracking dataset (auto-skipped if data is absent):
- **Real GECO loading**: Confirms the dataset loads correctly from disk.
- **Fixation ranges**: Validates that fixation duration/position values fall within expected bounds.
- **Example extraction**: Checks that individual examples are correctly extracted from the dataset.
- **CV split no-leakage**: Ensures cross-validation splits do not leak participants or sentences across folds.
- **Dataset tokenization**: Verifies that text tokenization aligns correctly with gaze annotations.

---

## Commit Metadata

| Field | Value |
|---|---|
| Repository | rahilsinghi/gaze-diffuse |
| SHA | 3a7a9dd |
| Date | 2026-03-15T23:36:56Z |
| Author | Rahil Singhi |
| Files Changed | 3 |
| Additions | +669 |
| Deletions | 0 |
| Total Tests | 69 |
| Coverage | 51% |

## Related

- [[GazeDiffuse Model]]
- [[GECO Dataset]]
- [[MDLM (Masked Diffusion Language Model)]]
- [[Training Pipeline]]
- [[Data Pipeline]]
- [[Spearman Correlation Metric]]
- [[Autoregressive Baseline]]
- [[Cross-Validation Split Strategy]]
- [[Code Coverage]]
- [[Checkpoint Save and Load]]
