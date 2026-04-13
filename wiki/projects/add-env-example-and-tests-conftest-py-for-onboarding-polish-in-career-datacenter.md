---
title: Add .env.example and tests/conftest.py for Onboarding Polish in Career-Datacenter
author: ai
created_at: 2026-04-12T22:16:48.616Z
last_ai_edit: 2026-04-12T22:16:48.616Z
last_human_edit: null
last_embedded_hash: a257c7b28552b71f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-envexample-tests-conftestpy-onboarding-f4ad36.md]]"
tags:
  - career-datacenter
  - onboarding
  - development
  - testing
  - environment-variables
  - python
  - pytest
---


# Add .env.example and tests/conftest.py for Onboarding Polish in Career-Datacenter

This update to the Career-Datacenter project introduces a `.env.example` file to guide new contributors on environment variable setup and integrates `tests/conftest.py` to streamline the test environment. These changes significantly improve the onboarding experience by providing clear configuration instructions and simplifying testing setup.

## Key Concepts

Environment Variables,.env.example,pytest,conftest.py,Developer Onboarding,sys.path manipulation

## Details

This commit to the [[Career-Datacenter]] repository focuses on enhancing the developer onboarding process through two key additions:

1.  **`.env.example` file**: A template file (`.env.example`) was added, detailing all required and optional environment variables. It includes inline comments with instructions on obtaining sensitive information like LinkedIn cookies and Gmail App Passwords. To ensure this template is available for new users, an `!.env.example` negation was added to the `.gitignore` file, allowing the template to be committed to the repository.

2.  **`tests/conftest.py`**: A `conftest.py` file was introduced within the `tests/` directory. Its primary function is to modify the `sys.path` environment at the pytest collection time, specifically adding the `cli/` directory. This eliminates the need for redundant `sys.path` manipulation hacks previously present in individual test files, leading to cleaner, more maintainable test code.

## Related

[[Career-Datacenter]],[[Add .worktrees/ to .gitignore]]
