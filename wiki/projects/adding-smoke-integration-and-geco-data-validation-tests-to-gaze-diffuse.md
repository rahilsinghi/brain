---
title: Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse
author: ai
created_at: 2026-04-13T17:11:00.740Z
last_ai_edit: 2026-04-13T17:11:00.740Z
last_human_edit: null
last_embedded_hash: d904bdf5db8a6906
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-test-add-smoke-integration-and-geco-data-validation-882ea5.md]]"
tags:
  - testing
  - gaze-diffuse
  - smoke tests
  - integration tests
  - data validation
  - geco dataset
  - machine learning
  - quality assurance
  - python
  - testing suite
---


# Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse

This article details the implementation of a comprehensive testing suite for the `gaze-diffuse` repository, encompassing smoke, integration, and GECO data validation tests. The suite includes 69 passing tests, achieving 51% code coverage, ensuring robust functionality and data integrity for the project.

## Key Concepts

Smoke Tests,Integration Tests,Data Validation Tests,End-to-End Testing,Code Coverage,GECO Dataset,AR Baseline Generation,Checkpoint Save/Load

## Details

A new suite of tests was introduced to the `gaze-diffuse` repository (commit `3a7a9dd` by Rahil Singhi on 2026-03-15), significantly enhancing its quality assurance with 669 additions across three test files. This effort resulted in a total of 69 passing tests, contributing to 51% code coverage.

The testing suite is organized into three primary categories:

*   **`test_training_smoke.py` (5 tests):** These tests focus on fundamental aspects of the training process, verifying that the training loop exhibits a decrease in loss, ensuring checkpoint save/load round-trip functionality, confirming `score_tokens` and `score_vocabulary` after training, and validating the Spearman correlation during validation.

*   **`test_integration.py` (11 tests):** This file contains integration tests that cover interconnected components. Key checks include the data pipeline chain, forward pass with gradients for the predictor, the `GazeDiffuse` model with a mock MDLM and real predictor, differentiation between guided and unguided outputs, AR baseline generation, metric calculation on generated output, and a full end-to-end pipeline test.

*   **`test_geco_data.py` (5 tests):** Dedicated to the GECO dataset, these tests ensure proper loading of real GECO data, correct fixation ranges, accurate example extraction, no data leakage during cross-validation (CV split), and proper dataset tokenization. These tests are automatically skipped if GECO data is not present in the environment.

## Related

[[Gaze-Diffuse]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Rahil Singhi]]
