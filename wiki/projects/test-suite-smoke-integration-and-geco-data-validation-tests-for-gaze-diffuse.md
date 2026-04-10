---
title: "Test Suite: Smoke, Integration, and GECO Data Validation Tests for gaze-diffuse"
author: ai
created_at: 2026-04-10T02:49:22.380Z
last_ai_edit: 2026-04-10T02:49:22.380Z
last_human_edit: null
last_embedded_hash: 0061557f0ef0012f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-test-add-smoke-integration-and-geco-data-validation-882ea5.md]]"
tags:
  - testing
  - smoke-tests
  - integration-tests
  - gaze-diffuse
  - geco
  - eye-tracking
  - diffusion-language-model
  - nlp
  - python
  - pytest
  - code-coverage
  - data-validation
  - machine-learning
---


# Test Suite: Smoke, Integration, and GECO Data Validation Tests for gaze-diffuse

This commit adds a comprehensive test suite to the rahilsinghi/gaze-diffuse repository, introducing 69 passing tests across three test files covering smoke tests, integration tests, and GECO dataset validation. The suite achieves 51% code coverage and validates core functionality including training loops, data pipelines, model inference, and dataset integrity. Tests for GECO data are auto-skipped when the dataset is not present, ensuring portability across environments.

## Key Concepts

- **Smoke Tests**: Fast, high-level tests verifying that core components (training loop, checkpointing, scoring) function without catastrophic failure
- **Integration Tests**: End-to-end and multi-component tests validating that subsystems work correctly together, including guided vs. unguided generation and full pipeline runs
- **GECO Data Validation**: Tests specific to the GECO eye-tracking dataset, checking loading, fixation ranges, example extraction, cross-validation splits, and tokenization
- **GazeDiffuse Model**: The primary model under test, combining a mock or real MDLM backbone with a gaze predictor
- **MDLM (Masked Diffusion Language Model)**: A language model component used within the GazeDiffuse pipeline
- **Spearman Correlation**: A validation metric used in smoke tests to assess the rank-order correlation of model predictions
- **CV Split No-Leakage**: A data integrity check ensuring that cross-validation splits do not share examples between train and test folds
- **Auto-Skip**: A pytest mechanism used to conditionally skip GECO tests when the underlying data files are unavailable
- **Code Coverage**: 51% of the codebase is exercised by the test suite, as measured after this commit

## Details

## Overview

Commit `3a7a9dd` (2026-03-15) by Rahil Singhi introduces a structured test suite to the `rahilsinghi/gaze-diffuse` repository. Three new test files are added with a combined **+669 lines** and no deletions, bringing the total to **69 tests, all passing**, at **51% code coverage**.

---

## Test Files

### `test_training_smoke.py` (5 tests)

Provides lightweight smoke-level validation of the training subsystem:

| Test | Description |
|------|-------------|
| Training loop loss decrease | Verifies that loss decreases over training iterations |
| Checkpoint save/load round-trip | Ensures model state can be serialized and restored correctly |
| `score_tokens` after training | Validates token-level scoring output post-training |
| `score_vocabulary` after training | Validates vocabulary-level scoring output post-training |
| Validation Spearman correlation | Checks that validation predictions correlate with ground truth via Spearman rank correlation |

---

### `test_integration.py` (11 tests)

Covers multi-component and end-to-end scenarios:

| Test | Description |
|------|-------------|
| Data pipeline chain | Validates the full data ingestion and preprocessing chain |
| Predictor forward with gradients | Confirms gradient flow through the gaze predictor |
| GazeDiffuse with mock MDLM + real predictor | Tests the combined model using a mocked diffusion backbone |
| Guided vs. unguided output difference | Asserts that gaze-guided generation differs from unguided generation |
| AR baseline generation | Tests autoregressive baseline text generation |
| Metrics on generated output | Validates evaluation metrics computed on generated sequences |
| Full E2E pipeline | Runs the complete pipeline from data input to evaluated output |

---

### `test_geco_data.py` (5 tests)

Validates the GECO eye-tracking dataset integration. All tests are **auto-skipped** when GECO data is not present on the filesystem:

| Test | Description |
|------|-------------|
| Real GECO loading | Confirms the dataset loads without errors |
| Fixation ranges | Validates that fixation duration/position values fall within expected ranges |
| Example extraction | Checks that individual examples are correctly extracted from the dataset |
| CV split no-leakage | Ensures no data leakage between cross-validation folds |
| Dataset tokenization | Verifies that GECO examples are tokenized correctly |

---

## Coverage Summary

- **Total tests:** 69
- **Passing:** 69 (100%)
- **Code coverage:** 51%
- **Files changed:** 3 (all additions)
- **Lines added:** +669

## Related

- [[GazeDiffuse Model]]
- [[MDLM (Masked Diffusion Language Model)]]
- [[GECO Eye-Tracking Dataset]]
- [[Gaze-Guided Text Generation]]
- [[Training Loop and Checkpointing]]
- [[Cross-Validation Data Splitting]]
- [[Spearman Rank Correlation in NLP Evaluation]]
- [[rahilsinghi/gaze-diffuse Repository]]
