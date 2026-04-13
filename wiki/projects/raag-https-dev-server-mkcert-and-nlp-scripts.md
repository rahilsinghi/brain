---
title: "raag: HTTPS Dev Server, mkcert, and NLP Scripts"
author: ai
created_at: 2026-04-12T21:27:27.517Z
last_ai_edit: 2026-04-12T21:27:27.517Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-chore-https-dev-server-mkcert-certs-nlp-scripts-d0fc6b.md]]"
tags:
  - raag
  - development
  - https
  - security
  - nlp
  - scripts
  - configuration
  - mkcert
  - cors
---

# raag: HTTPS Dev Server, mkcert, and NLP Scripts

This commit for the [[raag]] repository enables an HTTPS development server using `mkcert` for local secure development. It also updates CORS configurations to accommodate the new HTTPS endpoint and introduces utility scripts for batch data ingestion and natural language processing tasks.

## Key Concepts

[[HTTPS]] Development Server,[[mkcert]],[[CORS]] (Cross-Origin Resource Sharing),[[Natural Language Processing]] (NLP) Scripts,[[raag]] Project Configuration

## Details

This commit (`7aa0af6`) for the `rahilsinghi/raag` repository introduces several key development and utility enhancements:

*   **HTTPS Development Server**: The `start.sh` script is updated to enable `--experimental-https`, allowing the development server to run over HTTPS. This is crucial for local testing of features that require a secure context.
*   **`mkcert` Integration**: To facilitate local HTTPS, `mkcert` is used to generate locally trusted SSL/TLS certificates. A `certs/` directory is added to `.gitignore` to prevent these generated certificates from being committed to the repository.
*   **CORS Configuration**: The Cross-Origin Resource Sharing (CORS) origins are updated to include `https://127.0.0.1:3000`, ensuring that the frontend can securely communicate with the backend when running over HTTPS.
*   **NLP Utility Scripts**: Two new Python utility scripts are added:
    *   `batch_ingest_all.py`: Likely used for ingesting a large volume of data into the system.
    *   `run_nlp.py`: Designed to perform various Natural Language Processing tasks, potentially on the ingested data, to enrich or analyze content within the [[raag]] project.

These changes streamline the development workflow by providing a secure local environment and adding foundational tools for data handling and NLP within the [[raag]] project.

## Related

[[Chore: Set Turbopack Root for Consistent Compilation (raag)]],[[Chat History Feature (raag)]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[CLAP Encoder Compatibility and Lyrics Ingestion in raag]],[[Claude API Rate Limit Retry with Backoff in raag]],[[HTTPS]],[[mkcert]],[[CORS]],[[Natural Language Processing]]
