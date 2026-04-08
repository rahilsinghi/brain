---
title: gaze-diffuse — Git Activity
status: current
author: ai
source_type: git-commits
created_at: 2026-04-08T23:10:21.463Z
updated_at: 2026-04-08T23:10:21.463Z
tags:
  - git-activity
  - gaze-diffuse
category: projects
last_embedded_hash: ac9540cbbce48aff
---


# gaze-diffuse — Git Activity

## Summary

**gaze-diffuse** is a research repository implementing GazeDiffuse, a discrete diffusion language model conditioned on eye-tracking data to generate cognitively plausible text. The project integrates the GECO eye-tracking corpus with masked diffusion language models (MDLM/LLaDA) and a BERT-based gaze predictor, targeting submission to EMNLP 2026. It represents [[rahil-singhi]]'s ongoing work at the intersection of cognitive NLP and generative modelling.

---

## Key Developments

### Project Scaffolding & Core Architecture
The repository was initialized on a single day (2026-03-12) with a complete foundation: build configuration, AI context files, and a `.gitignore` scoped correctly to the root `data/` directory while preserving `src/data/`. The core ML stack was assembled in rapid sequence — GECO corpus loader, prompt seeds, MDLM/LLaDA model wrappers, a BERT gaze predictor, the GazeDiffuse sampler itself, and an autoregressive (AR) baseline for comparison. See also [[proj-adversarial]] and [[proj-parser]] for related NLP tooling work.

### Evaluation & Metrics
Evaluation infrastructure was built alongside the models, including custom metrics for measuring gaze-conditioned generation quality. An AR baseline was implemented for ablation comparisons, and a publication-quality results visualization script was added in the March 15 session to support the paper submission pipeline.

### Testing Infrastructure
Testing grew substantially across two sessions. An initial suite of 38 unit tests covering all modules was committed on March 12, followed by smoke tests, integration tests, GECO data validation tests, and strengthened AR baseline tests (expanded from 3 to 10 cases) on March 15 — bringing the total to 69 tests. Integration test fixtures were added via an extended `conftest.py`.

### Data Layer & GECO Parser
The GECO eye-tracking corpus loader underwent iterative refinement. After initial implementation, the parser was corrected on March 15 for the real corpus format, then further hardened on March 27 to handle NaN words and numeric string coercion — reflecting the messiness of working with real psycholinguistic datasets. This work is thematically related to [[proj-parser]].

### HPC & Training Infrastructure
High-performance computing support was added with SLURM experiment templates and setup scripts, targeting H200, H100, and L40S GPU clusters. Local training was also stabilized on March 27 with MPS (Apple Silicon) device support, macOS DataLoader fixes, portable checkpoint handling, and a GPT-2 pad token fix for the AR baseline — enabling development to proceed on local machines before HPC access was fully established.

### Documentation & Publication Pipeline
Documentation was treated as a first-class concern throughout. A comprehensive README was written on March 12, updated on March 15 with the test count. A LaTeX paper scaffold targeting EMNLP 2026 was added on March 15. Session logs were maintained across all three working sessions, and HPC findings (GPU availability, project account requirements) were documented on March 27.

---

## Timeline

### March 2026

**March 12 — Project Initialization**
Full project bootstrapped in a single session: scaffolding, data layer (GECO loader + prompt seeds), model wrappers (MDLM/LLaDA + BERT gaze predictor), GazeDiffuse sampler, AR baseline, evaluation metrics, 38 unit tests, HPC/SLURM setup scripts, and a comprehensive README. Cleanup commit removed `CLAUDE.md` and AI assistant artifacts from the repo.

**March 15 — Testing, Visualization & Paper Scaffold**
Second session extended the test suite to 69 tests (smoke, integration, GECO validation, strengthened AR baseline). GECO parser corrected for real corpus format. Publication-quality visualization script added. EMNLP 2026 LaTeX paper structure scaffolded. Makefile added with 11 task targets. README and session log updated.

**March 27 — Local Training & Data Robustness**
Third session focused on making the system runnable end-to-end locally. MPS device support added for training and the AR baseline; macOS DataLoader and checkpoint portability fixed. GECO loader hardened against NaN words and type coercion issues. HPC findings documented (H200/H100/L40S availability, project account requirement). Coverage artifacts added to `.gitignore`.
