---
title: "askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars"
author: ai
created_at: 2026-04-12T22:02:05.748Z
last_ai_edit: 2026-04-12T22:02:05.748Z
last_human_edit: null
last_embedded_hash: d11e9d9a17d548df
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-docs-update-model-to-gemini-live-25-flash-native-audio-add-68745e.md]]"
tags:
  - asknyc
  - gemini
  - vertexai
  - documentation
  - environment-variables
  - llm
  - google-cloud
---


# askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars

This update documents the integration of the `gemini-live-2.5-flash-native-audio` model within the [[askNYC]] project. It also adds crucial [[Vertex AI]] environment variables for proper deployment and functionality. The changes are reflected in the project's documentation, specifically `CLAUDE.md` and `README` files.

## Key Concepts

[[Gemini-Live-2.5-Flash-Native-Audio]],[[Vertex AI]],[[Environment Variables]],[[Documentation Update]]

## Details

This commit, identified by SHA `905a3b1` and authored by [[Rahil Singhi]] on March 28, 2026, focuses on updating the [[askNYC]] project's model and environment variable configuration. The primary change involves updating the specified [[LLM Model Constants and Company Info Helper (Commit a9513cd)|LLM model]] to `gemini-live-2.5-flash-native-audio`, which is the actual model available on [[Vertex AI]].

To support this integration and deployment on Google Cloud, the following environment variables were added to the project's documentation:
*   `GOOGLE_GENAI_USE_VERTEXAI`
*   `GOOGLE_CLOUD_PROJECT`
*   `GOOGLE_CLOUD_LOCATION`

These changes primarily affected two files, resulting in 6 additions and 3 deletions, ensuring that the project's operational setup is correctly reflected and configured for the updated model.

## Related

askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest,askNYC: Update Gemini Model to Gemini 2.5 Flash,askNYC,[[Google Cloud]],[[LLM Model Constants and Company Info Helper (Commit a9513cd)]],CLAUDE.md,askNYC: Model Update to Gemini 2.5 Flash Native Audio,askNYC: Multimodal Urban Intelligence Platform,askNYC Project Documentation Overview,askNYC Project Documentation Update (March 2026),askNYC CLAUDE.md Update: Pipeline, Project Structure, and Architecture,[[Rahil Singhi]]
