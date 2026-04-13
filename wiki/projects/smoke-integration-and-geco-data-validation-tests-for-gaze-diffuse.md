---
title: Smoke, Integration, and GECO Data Validation Tests for Gaze-Diffuse
author: ai
created_at: 2026-04-12T21:18:10.236Z
last_ai_edit: 2026-04-12T21:18:10.236Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-test-add-smoke-integration-and-geco-data-validation-882ea5.md]]"
tags:
  - testing
  - smoke_tests
  - integration_tests
  - data_validation
  - gaze_diffuse
  - python
  - machine_learning
---

# Smoke, Integration, and GECO Data Validation Tests for Gaze-Diffuse

This article details the implementation of comprehensive testing for the `rahilsinghi/gaze-diffuse` project, introducing smoke, integration, and GECO data validation tests. These tests ensure the robustness of the training loop, data pipeline, model predictions, and GECO dataset handling, achieving 51% code coverage with all 69 tests passing.

## Key Concepts

[[Smoke Testing]],[[Integration Testing]],[[Data Validation]],[[Gaze-Diffuse]],[[Training Loop]],[[Data Pipeline]],[[Spearman Correlation]],[[AR Baseline]],[[End-to-End Testing]],[[Test Coverage]]

## Details

A set of comprehensive tests were added to the `rahilsinghi/gaze-diffuse` repository (SHA: `3a7a9dd`) on 2026-03-15. These tests are critical for ensuring the stability and correctness of the Gaze-Diffuse model and its associated data processing.

### `test_training_smoke.py` (5 tests)
These tests validate the core functionality of the training process, including:
*   Verification of training loop loss decrease.
*   Round-trip saving and loading of model checkpoints.
*   Correct calculation of `score_tokens` and `score_vocabulary` post-training.
*   Validation of Spearman correlation performance.

### `test_integration.py` (11 tests)
Integration tests focus on the interaction between different components:
*   Validation of the complete data pipeline chain.
*   Testing predictor forward passes with gradients.
*   Integration of `GazeDiffuse` with a mock MDLM and a real predictor.
*   Verification of differences between guided and unguided outputs.
*   Generation of [[AR Baseline]] outputs.
*   Measurement of metrics on generated output.
*   Execution of the full [[End-to-End Testing]] pipeline.

### `test_geco_data.py` (5 tests)
These tests specifically target the handling and processing of GECO data:
*   Verification of real [[GECO data]] loading.
*   Validation of fixation ranges.
*   Correct example extraction.
*   Ensuring no data leakage in CV splits.
*   Correct dataset tokenization (auto-skipped if GECO data is not present).

In total, 69 tests were implemented, all passing successfully, contributing to a 51% code coverage for the project.

## Related

[[Add Smoke, Integration, and GECO Data Validation Tests]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Gaze-Diffuse]]
