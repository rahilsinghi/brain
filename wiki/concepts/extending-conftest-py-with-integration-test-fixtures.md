---
title: Extending conftest.py with Integration Test Fixtures
author: ai
created_at: 2026-04-10T18:20:59.272Z
last_ai_edit: 2026-04-10T18:20:59.272Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-test-extend-conftest-with-integration-test-fixtures-71925b.md]]"
tags:
  - testing
  - fixtures
  - conftest
  - python
  - pytest
  - integration-tests
  - mocking
  - synthetic-data
  - gaze-diffuse
---

# Extending conftest.py with Integration Test Fixtures

This entry details the additions made to the `conftest.py` file within the `gaze-diffuse` repository. These changes introduce several new testing fixtures and utilities designed to enhance integration testing capabilities, particularly for models like CausalLMs and gaze predictors. The primary goal is to facilitate faster, more robust, and self-contained testing environments.

## Key Concepts

MockCausalLM,Synthetic Test Data,Test Fixtures (conftest.py),Smoke Tests,Test Optimization (session-scoped fixtures),Test Helpers

## Details

The `conftest.py` file in the `rahilsinghi/gaze-diffuse` repository was extended to include a suite of new testing utilities and fixtures. This commit (SHA: `7f4edbd`, dated `2026-03-15T23:36:44Z` by Rahil Singhi) involved 1 file change with 108 additions and 0 deletions.

Key additions include:

*   **`MockCausalLM` class**: A mock implementation of a causal language model, primarily used for testing Auto-Regressive (AR) baselines without requiring the full GPT-2 model. This significantly speeds up and simplifies testing by removing heavy external dependencies.
*   **`synthetic_gaze_examples` fixture**: Provides 20 synthetic gaze examples, generated for 4 participants. This fixture is crucial for creating reproducible and isolated test scenarios without relying on large, real datasets.
*   **`synthetic_gaze_dataframe` fixture**: Generates synthetic gaze data structured to match the `load_geco_corpus` format. This ensures consistency between synthetic data and the expected input format for the system under test, enabling seamless integration tests.
*   **`tiny_gaze_predictor_config`**: A minimal configuration designed for fast convergence, specifically tailored for smoke tests. This allows for quick verification of core functionalities without extensive training times.
*   **Session-scoped `bert_tokenizer`**: Implemented to prevent repeated downloads of Hugging Face models during test runs. By scoping the tokenizer to the session, it's downloaded only once, drastically improving test suite execution time and reducing network traffic.
*   **`_make_synthetic_examples` helper function**: A utility function designed for internal reuse across various test files. This promotes DRY (Don't Repeat Yourself) principles and ensures consistent synthetic data generation logic.

## Related

[[conftest.py]],[[Integration Testing]],[[Test Fixtures]],[[Mocking]],[[Synthetic Data]],[[BERT Tokenizer]],[[Gaze-Diffuse Project]]
