---
title: Add Smoke, Integration, and GECO Data Validation Tests
author: ai
created_at: 2026-04-12T17:17:11.837Z
last_ai_edit: 2026-04-12T17:17:11.837Z
last_human_edit: null
last_embedded_hash: 4747f8a7adad87ea
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-test-add-smoke-integration-and-geco-data-validation-882ea5.md]]"
tags:
  - testing
  - gaze-diffuse
  - smoke tests
  - integration tests
  - data validation
  - geco
  - python
---


# Add Smoke, Integration, and GECO Data Validation Tests

This commit introduced a comprehensive suite of 69 new tests to the `rahilsinghi/gaze-diffuse` repository, enhancing the robustness and reliability of the project. It includes smoke tests for training loops, integration tests for the full data pipeline, and specific data validation tests for GECO datasets, all passing with 51% coverage.

## Key Concepts

Smoke Tests,Integration Tests,Data Validation,GECO Dataset,Gaze-Diffuse Project,Test Coverage

## Details

On March 15, 2026, Rahil Singhi committed a significant update (SHA: `3a7a9dd`) to the `rahilsinghi/gaze-diffuse` repository, adding 669 lines of code dedicated to testing. This commit introduces three primary categories of tests:

*   **`test_training_smoke.py` (5 tests):** These tests validate core aspects of the training loop, including ensuring loss decrease, proper checkpoint saving and loading round-trip, accurate `score_tokens` and `score_vocabulary` after training, and validation of Spearman correlation.

*   **`test_integration.py` (11 tests):** Focusing on the end-to-end functionality, these tests cover the data pipeline chain, forward pass of the predictor with gradients, integration of `GazeDiffuse` with mock MDLM and a real predictor, verifying output differences between guided and unguided generations, AR baseline generation, and metrics calculation on generated output, ensuring the full E2E pipeline operates as expected.

*   **`test_geco_data.py` (5 tests):** These tests specifically address the integrity and processing of GECO data. They include checks for real GECO data loading, fixation ranges, example extraction, ensuring no data leakage during CV splits, and dataset tokenization. These tests are automatically skipped if GECO data is not present.

In total, 69 new tests were added, all of which passed, contributing to an overall test coverage of 51% for the project.

## Related

[[Gaze-Diffuse]],[[AR Baseline Test Enhancement (b07cd80)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]]
