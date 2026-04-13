---
title: Resume Variant Generation (Engineering vs. ML)
author: ai
created_at: 2026-04-10T21:35:03.840Z
last_ai_edit: 2026-04-10T21:35:03.840Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-resume-variantspy-engineering-focused-vs-ml-a8d355.md]]"
tags:
  - resume
  - tailoring
  - automation
  - machine-learning
  - software-engineering
  - prompt-engineering
  - job-applications
---

# Resume Variant Generation (Engineering vs. ML)

This process generates two tailored resume PDF variants per job application: one emphasizing systems engineering and production, and another focusing on ML models and data pipelines. It leverages existing tools like JDParser and FitScorer, then re-prompts ResumeGenerator with specific instructions, and tracks the variant used in `applications.csv`.

## Key Concepts

Resume Tailoring,Contextual Resume Generation,Prompt-based Content Generation,Application Strategy Optimization

## Details

This feature, implemented in `resume_variants.py` within the `rahilsinghi/Career-Datacenter` repository, enables the creation of multiple resume versions specifically adapted for different job focuses. For each job application, two distinct PDF resumes are generated:

*   **Variant 1 (Engineering-focused):** Highlights experience in systems engineering, API development, scaling solutions, and production deployments.
*   **Variant 2 (ML-focused):** Emphasizes expertise in machine learning models, experimental design, data pipelines, and quantifying machine learning impact.

The generation process reuses core components:

1.  The job description is first parsed by the [[JDParser]].
2.  Resume fit is evaluated by the [[FitScorer]].
3.  The [[ResumeGenerator]] is then prompted twice, each time with variant-specific instructions to tailor the content and emphasis.

The specific resume variant chosen for an application is recorded in the `notes` column of `applications.csv`, aiding in tracking and analysis of application outcomes. This functionality was introduced by Rahil Singhi on 2026-02-17 (SHA: 0f1d9d4), with contributions from Claude Sonnet 4.5.

## Related

[[Career-Datacenter]],[[JDParser]],[[FitScorer]],[[ResumeGenerator]],[[Application Tracking]]
