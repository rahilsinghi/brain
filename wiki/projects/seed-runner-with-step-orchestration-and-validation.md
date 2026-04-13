---
title: Seed Runner with Step Orchestration and Validation
author: ai
created_at: 2026-04-12T18:05:32.452Z
last_ai_edit: 2026-04-12T18:05:32.452Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-seed-runner-with-step-orchestration-validation-and-f302fe.md]]"
tags:
  - seed
  - runner
  - orchestration
  - validation
  - cli
  - brain project
  - data management
---

# Seed Runner with Step Orchestration and Validation

This feature introduces a robust runner for seeding operations within the Brain Project, enabling complex step orchestration, comprehensive validation, and selective execution via an `--only` routing mechanism. It significantly enhances the control and reliability of data seeding processes.

## Key Concepts

Seed runner,Step orchestration,Data validation,--only routing (CLI),Data seeding

## Details

A new runner has been implemented in the [[Brain Project]] (`rahilsinghi/brain` repository, commit `6c71464`) to manage data seeding. This runner provides advanced capabilities including:

*   **Step Orchestration**: Allows for defining and executing seeding steps in a controlled sequence, ensuring dependencies and order are respected.
*   **Validation**: Incorporates mechanisms to validate data before or after seeding, improving data integrity and reducing errors.
*   **`--only` Routing**: A command-line interface (CLI) option that enables users to specify and run only a subset of the defined seeding steps, facilitating focused testing and partial data updates. This greatly improves the flexibility and efficiency of seed operations.

The addition of this runner, co-authored by Claude Sonnet 4.6, marks a significant enhancement to the data management infrastructure of the project, adding 420 lines of code.

## Related

[[Brain Project]],[[CLI Entry Point for PNPM Seed]],[[Brain Project Content Seeding (d37a02b)]],[[Brain Project: Data Seeding and Schema Refinements (dbfbaa6)]],[[CLAUDE.md Update: Seed & Activate Phases]],[[CLAUDE.md Update: Seed & Activate Phases and Seed Commands]],[[Automated Data Ingestion and Wiki Maintenance]]
