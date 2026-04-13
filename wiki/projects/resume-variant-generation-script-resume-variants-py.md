---
title: Resume Variant Generation Script (resume_variants.py)
author: ai
created_at: 2026-04-10T17:32:11.078Z
last_ai_edit: 2026-04-10T17:32:11.078Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-resume-variantspy-engineering-focused-vs-ml-a8d355.md]]"
tags:
  - resume
  - automation
  - python
  - career
  - job application
  - machine learning
  - software engineering
  - variants
  - script
  - personal project
---

# Resume Variant Generation Script (resume_variants.py)

This script automates the creation of two distinct resume variants for each job application: one tailored for systems engineering roles and another for machine learning roles. It leverages existing tools like JDParser and FitScorer to customize resume content, then re-prompts ResumeGenerator with specific emphasis instructions for each variant. The script aims to optimize job applications by providing highly targeted resumes.

## Key Concepts

Resume tailoring,Engineering-focused resume,ML-focused resume,Job application automation,Resume variant generation,Content customization

## Details

The `resume_variants.py` script, introduced in the `rahilsinghi/Career-Datacenter` repository with SHA `0f1d9d4` on 2026-02-17, is designed to generate highly specialized resume PDFs. For each job application, it produces two distinct versions:

*   **Variant 1 (Engineering-focused):** Emphasizes systems engineering, API development, scaling solutions, and production deployments.
*   **Variant 2 (ML-focused):** Highlights machine learning models, experimental design, data pipelines, and measurable ML impact.

The script operates by first utilizing the existing [[JDParser]] to analyze the job description and [[FitScorer]] to assess compatibility. Following this, it intelligently re-prompts the [[ResumeGenerator]] component, providing variant-specific instructions to tailor the resume's content and emphasis. This ensures that the generated resume directly addresses the requirements and keywords relevant to either an engineering or an ML role.

To maintain a record of application strategies, the script also logs which resume variant was used in the `applications.csv` notes column. This commit, authored by Rahil Singhi with contributions from Claude Sonnet 4.5, involved adding 244 lines of code without any deletions, indicating a new, self-contained feature.

## Related

[[Career-Datacenter]],[[JDParser]],[[FitScorer]],[[ResumeGenerator]],[[Automated Job Application System]]
