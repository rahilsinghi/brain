---
title: Extend conftest with Integration Test Fixtures (Gaze-Diffuse)
author: ai
created_at: 2026-04-13T17:44:30.001Z
last_ai_edit: 2026-04-13T17:44:30.001Z
last_human_edit: null
last_embedded_hash: f14b54d69dcda8f3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-test-extend-conftest-with-integration-test-fixtures-71925b.md]]"
tags:
  - testing
  - fixtures
  - python
  - integration tests
  - smoke tests
  - gaze-diffuse
  - conftest
---


# Extend conftest with Integration Test Fixtures (Gaze-Diffuse)

This update extends the `conftest.py` file in the `rahilsinghi/gaze-diffuse` repository by introducing a suite of fixtures and helper classes designed to streamline integration and smoke testing. Key additions include a `MockCausalLM` for efficient AR baseline testing, synthetic gaze data fixtures, and a session-scoped BERT tokenizer, all aimed at improving test reliability and reducing execution time.

## Key Concepts

MockCausalLM,Synthetic Gaze Data Fixtures,tiny_gaze_predictor_config,Session-Scoped BERT Tokenizer,_make_synthetic_examples helper

## Details

This commit to the `rahilsinghi/gaze-diffuse` repository focuses on enhancing the testing infrastructure by extending `conftest.py` with several integration test fixtures:

*   **`MockCausalLM` Class**: Introduced to facilitate AR (Autoregressive) baseline testing without the need to load the full GPT-2 model. This mock class ensures that AR-related tests can be run quickly and efficiently, reducing test execution time and resource consumption.

*   **`synthetic_gaze_examples` Fixture**: Provides a set of 20 synthetic gaze examples across 4 participants. This fixture is crucial for creating controlled and reproducible test scenarios.

*   **`synthetic_gaze_dataframe` Fixture**: Generates a synthetic gaze dataframe that matches the expected format of `load_geco_corpus`. This ensures compatibility with existing data loading mechanisms and allows tests to run with realistic data structures without depending on actual corpus loading.

*   **`tiny_gaze_predictor_config`**: A configuration designed for fast convergence during smoke tests. This helps in quickly verifying the basic functionality of the system without requiring extensive training or processing times.

*   **Session-Scoped `bert_tokenizer`**: Implemented as a session-scoped fixture to prevent repeated downloads of Hugging Face models during test runs. This significantly speeds up the testing process, especially when multiple tests rely on the BERT tokenizer.

*   **`_make_synthetic_examples` Helper**: A utility function created for internal reuse across different test files, standardizing the generation of synthetic examples and promoting code reusability.

These additions collectively improve the robustness, efficiency, and maintainability of the testing suite within the `gaze-diffuse` project.

## Related

[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[rahilsinghi/gaze-diffuse]],[[Testing Infrastructure]]
