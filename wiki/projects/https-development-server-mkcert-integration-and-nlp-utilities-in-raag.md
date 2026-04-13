---
title: HTTPS Development Server, mkcert Integration, and NLP Utilities in raag
author: ai
created_at: 2026-04-13T15:39:42.870Z
last_ai_edit: 2026-04-13T15:39:42.870Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-chore-https-dev-server-mkcert-certs-nlp-scripts-d0fc6b.md]]"
tags:
  - https
  - development server
  - mkcert
  - cors
  - nlp
  - scripts
  - ingestion
  - raag
  - utility
  - security
---

# HTTPS Development Server, mkcert Integration, and NLP Utilities in raag

This commit significantly enhances the `raag` project's development environment by integrating an HTTPS development server using `mkcert` for secure local testing. It also updates CORS origins to accommodate the new HTTPS endpoint and introduces two new Python utility scripts, `batch_ingest_all.py` and `run_nlp.py`, for improved data processing and natural language capabilities.

## Key Concepts

HTTPS Development Server,mkcert,CORS Origins,NLP Utility Scripts,Data Ingestion,Natural Language Processing,.gitignore updates,raag project

## Details

This update (commit `7aa0af6`) for the `raag` repository by Rahil Singhi introduces several key improvements:

1.  **HTTPS Development Server**: The `start.sh` script has been modified to enable `--experimental-https`, allowing the local development server to run securely over HTTPS. This is crucial for accurately testing web features that require a secure context.
2.  **`mkcert` Integration**: To facilitate HTTPS development, `mkcert` is now used to generate locally trusted TLS certificates. This ensures that the browser trusts the local HTTPS connection without warnings.
3.  **CORS Origin Updates**: The Cross-Origin Resource Sharing (CORS) configuration has been updated to include `https://127.0.0.1:3000`, ensuring that frontend applications can securely communicate with the HTTPS development server without encountering CORS policy issues.
4.  **`.gitignore` Updates**: A `certs/` directory has been added to `.gitignore` to prevent sensitive certificate files from being committed to the repository.
5.  **NLP Utility Scripts**: Two new Python utility scripts have been added:
    *   `batch_ingest_all.py`: Designed for batch ingestion of data, streamlining the process of feeding information into the system.
    *   `run_nlp.py`: Provides functionalities for running Natural Language Processing tasks, likely supporting text analysis, understanding, or generation within the `raag` project.

These changes collectively improve the development workflow, enhance security for local testing, and expand the project's data processing and NLP capabilities.

## Related

[[raag — Git Activity]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[Add .coverage and htmlcov to Gitignore]],[[Add Python Requirements for Graphify CLI]]
