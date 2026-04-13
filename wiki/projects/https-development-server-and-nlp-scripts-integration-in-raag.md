---
title: HTTPS Development Server and NLP Scripts Integration in raag
author: ai
created_at: 2026-04-13T17:16:48.556Z
last_ai_edit: 2026-04-13T17:16:48.556Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-chore-https-dev-server-mkcert-certs-nlp-scripts-d0fc6b.md]]"
tags:
  - chore
  - https
  - mkcert
  - cors
  - nlp
  - python
  - raag
  - development
  - infrastructure
  - ingestion
---

# HTTPS Development Server and NLP Scripts Integration in raag

This commit to the `raag` repository introduces several infrastructure and utility enhancements. It enables an HTTPS development server using `mkcert` certificates and adds necessary CORS origins. Additionally, it integrates new Python scripts (`batch_ingest_all.py` and `run_nlp.py`) to facilitate NLP processing and data ingestion.

## Key Concepts

HTTPS Development Server,mkcert,CORS (Cross-Origin Resource Sharing),Natural Language Processing (NLP),Data Ingestion,Repository Infrastructure,Gitignore

## Details

This chore commit (`7aa0af6`) to the `[[raag]]` repository focuses on enhancing the development environment and adding utility scripts. Key changes include:

*   **HTTPS Development Server**: The `start.sh` script was modified to enable an experimental HTTPS development server. This is crucial for local development that mimics production environments requiring secure connections.
*   **`mkcert` Integration**: `mkcert` is used to generate locally trusted development certificates, ensuring secure connections without browser warnings. The `certs/` directory, containing these certificates, was added to `.gitignore` to prevent it from being committed to the repository.
*   **CORS Configuration**: The `https://127.0.0.1:3000` origin was added to the Cross-Origin Resource Sharing (CORS) configuration. This allows the frontend (likely running on this address) to communicate securely with the backend over HTTPS.
*   **NLP Utility Scripts**: Two new Python utility scripts were introduced:
    *   `batch_ingest_all.py`: Designed for batch ingestion of data, likely to feed raw content into the system for processing.
    *   `run_nlp.py`: A script intended to perform Natural Language Processing tasks, complementing the data ingestion workflow. These scripts contribute to the system's ability to process and understand textual data.

The commit involved changes across 4 files, with +410 additions and -2 deletions, indicating a significant addition of functionality and configuration. This work was co-authored with [[Claude Opus 4.6]].

## Related

[[raag]],[[Add everything-claude-code as Git Submodule to raag]],[[API: POST /ingest Route for Fire-and-Forget Raw Data Ingestion]],[[Automated Data Ingestion and Wiki Maintenance]],[[Add `everything-claude-code` as Git Submodule to `raag`]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[Backend Foundation with FastAPI, Pydantic, and Celery (Raag Project)]],[[mkcert]],[[CORS]],[[NLP]],[[Claude Opus 4.6]]
