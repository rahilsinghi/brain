---
title: "Test Suite: Smoke, Integration, and GECO Data Validation (gaze-diffuse)"
author: ai
created_at: 2026-04-10T02:47:03.818Z
last_ai_edit: 2026-04-10T02:47:03.818Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-test-add-smoke-integration-and-geco-data-validation-882ea5.md]]"
tags:
  - testing
  - gaze-diffuse
  - smoke-tests
  - integration-tests
  - geco
  - eye-tracking
  - diffusion-language-model
  - code-coverage
  - pytest
  - nlp
  - data-validation
  - rahil-singhi
---

# Test Suite: Smoke, Integration, and GECO Data Validation (gaze-diffuse)

This commit introduces a comprehensive test suite for the gaze-diffuse repository, adding 669 lines of test code across three test files covering smoke tests, integration tests, and GECO data validation. The suite includes 69 passing tests achieving 51% code coverage. Tests span the full pipeline from data loading and preprocessing through model training, inference, and evaluation metrics.

## Key Concepts

- **Smoke Tests**: Fast, lightweight tests verifying core training loop functionality including loss decrease, checkpoint round-trips, and Spearman correlation validation
- **Integration Tests**: End-to-end pipeline tests covering data pipeline chaining, gradient flow, guided vs unguided generation, AR baseline generation, and full E2E pipeline execution
- **GECO Data Validation**: Tests for real GECO eye-tracking dataset loading, fixation range checks, cross-validation split integrity, and tokenization; auto-skipped when data is absent
- **GazeDiffuse**: The primary model under test, validated with mock MDLM and real predictor components
- **MDLM (Mock)**: A masked diffusion language model component used in integration testing via mocking
- **Spearman Correlation**: Used as a validation metric to assess ranking consistency of model predictions
- **CV Split No-Leakage**: Cross-validation split test ensuring no data contamination between train and test folds
- **Code Coverage**: 51% coverage achieved across the codebase with this test addition

## Details

## Overview

Commit `3a7a9dd` by Rahil Singhi (2026-03-15) adds a structured test suite to the `rahilsinghi/gaze-diffuse` repository. The change introduces **+669 lines** across **3 new files** with no deletions, resulting in **69 total passing tests** at **51% code coverage**.

---

## Test Files

### `test_training_smoke.py` — 5 Tests
Sanity checks for the training pipeline:
- **Training loop loss decrease**: Verifies that the loss decreases over training iterations as expected.
- **Checkpoint save/load round-trip**: Ensures model state can be serialized and restored without corruption.
- **`score_tokens` after training**: Validates token-level scoring functionality post-training.
- **`score_vocabulary` after training**: Validates vocabulary-level scoring functionality post-training.
- **Validation Spearman correlation**: Checks that model predictions maintain meaningful rank correlation with ground truth during validation.

---

### `test_integration.py` — 11 Tests
Broader pipeline and component interaction tests:
- **Data pipeline chain**: Tests sequential composition of data preprocessing steps.
- **Predictor forward with gradients**: Confirms gradient flow through the predictor component.
- **GazeDiffuse with mock MDLM + real predictor**: Validates the model architecture using a mocked diffusion backbone alongside a real predictor.
- **Guided vs unguided output difference**: Asserts that guidance conditioning meaningfully changes model output.
- **AR baseline generation**: Tests autoregressive baseline generation functionality.
- **Metrics on generated output**: Evaluates metric computation over model-generated sequences.
- **Full E2E pipeline**: Exercises the complete end-to-end pipeline from raw input to evaluated output.

---

### `test_geco_data.py` — 5 Tests
Validation of GECO eye-tracking dataset handling (auto-skipped if GECO data is not present):
- **Real GECO loading**: Confirms the dataset loads correctly from disk.
- **Fixation ranges**: Validates that fixation duration/position values fall within expected bounds.
- **Example extraction**: Tests that individual examples are correctly extracted from the dataset.
- **CV split no-leakage**: Ensures cross-validation splits have no overlap between train and test sets.
- **Dataset tokenization**: Verifies that text associated with fixation data is tokenized correctly.

---

## Coverage Summary

| Metric | Value |
|---|---|
| Total Tests | 69 |
| Passing | 69 (100%) |
| Code Coverage | 51% |
| Files Added | 3 |
| Lines Added | +669 |
| Lines Removed | 0 |

## Related

- [[GazeDiffuse Model Architecture]]
- [[GECO Eye-Tracking Dataset]]
- [[MDLM Masked Diffusion Language Model]]
- [[Training Loop and Checkpointing]]
- [[Spearman Correlation in NLP Evaluation]]
- [[Autoregressive Baseline Generation]]
- [[Cross-Validation Data Splitting]]
- [[rahilsinghi/gaze-diffuse Repository]]
