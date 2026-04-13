---
title: Integration Test Fixtures in conftest.py for Gaze-Diffuse
author: ai
created_at: 2026-04-10T22:24:44.075Z
last_ai_edit: 2026-04-10T22:24:44.075Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-test-extend-conftest-with-integration-test-fixtures-71925b.md]]"
tags:
  - testing
  - pytest
  - fixtures
  - integration-tests
  - mocking
  - nlp
  - gaze-diffuse
  - conftest
  - development
---

# Integration Test Fixtures in conftest.py for Gaze-Diffuse

This entry details a commit focused on extending the `conftest.py` file within the `gaze-diffuse` repository to introduce new fixtures and utilities. These additions are designed to streamline and improve integration testing, primarily by providing mocked components, synthetic dataset generation, and optimized configurations for faster test execution.

## Key Concepts

- MockCausalLM: A mock class for Causal Language Models, facilitating AR baseline testing without requiring the full GPT-2 model.,- synthetic_gaze_examples: A pytest fixture providing 20 synthetic gaze examples across 4 participants for controlled testing.,- synthetic_gaze_dataframe: A fixture that generates a synthetic gaze dataframe formatted to match the `load_geco_corpus` output.,- tiny_gaze_predictor_config: A configuration designed for fast convergence, ideal for smoke tests.,- bert_tokenizer (session-scoped): A pytest fixture for a BERT tokenizer, scoped to the test session to prevent repeated Hugging Face model downloads.,- _make_synthetic_examples: A helper function created for internal reuse across various test files requiring synthetic data.

## Details

This commit (`7f4edbd`) to the `rahilsinghi/gaze-diffuse` repository, authored by Rahil Singhi on 2026-03-15, significantly extended the `conftest.py` file. The changes involved 108 additions across a single file, with no deletions, indicating a pure extension of testing capabilities.

The primary goal was to enhance the project's integration testing suite by introducing a robust set of fixtures and utilities:

- **MockCausalLM**: This mock implementation allows for AR baseline testing to proceed efficiently without the need to load the computationally expensive GPT-2 model, speeding up test cycles.
- **synthetic_gaze_examples**: A predefined fixture offering a small, consistent dataset (20 examples from 4 participants) ensuring repeatable and controlled test scenarios.
- **synthetic_gaze_dataframe**: This fixture ensures that synthetic data can be generated in a format consistent with the project's existing data loading mechanisms, specifically `load_geco_corpus`, simplifying data-dependent tests.
- **tiny_gaze_predictor_config**: Tailored for efficiency, this configuration enables rapid convergence, making it invaluable for quick sanity checks and smoke tests where full training is not required.
- **session-scoped bert_tokenizer**: By scoping the BERT tokenizer to the entire test session, the system avoids redundant downloads from Hugging Face, leading to faster test suite execution and reduced network dependency.
- **_make_synthetic_examples**: This internal helper function promotes code reuse and maintainability across different test files that require the creation of synthetic data.

## Related

[[conftest.py]],[[Integration Testing]],[[Pytest Fixtures]],[[Mocking]],[[Hugging Face Transformers]],[[GPT-2]]
