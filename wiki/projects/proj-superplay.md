---
title: SuperPlay – AI-Powered Spotify Playlist Curator
author: ai
created_at: 2026-04-08T14:25:52.436Z
last_ai_edit: 2026-04-08T14:25:52.436Z
last_human_edit: null
last_embedded_hash: 4ab05cc7bd702f15
sources:
  - career-datacenter/data/projects.yaml#proj_superplay
tags:
  - project
  - personal
  - python
  - xgboost
  - spotify-api
  - genius-api
  - flask
---



# SuperPlay – AI-Powered Spotify Playlist Curator

**personal** · 2024

## Problem

Automated mood-based playlist curation requires extracting audio features and lyric sentiment, then predicting track mood with high accuracy.

## Approach

Built ETL pipeline to pull 5K+ tracks from Spotify and Genius APIs, extracted audio metrics and transformer-based lyric embeddings, trained XGBoost classifier with grid-search CV.

## Results

Achieved 96% macro-F1 for mood prediction; exposed via Flask API, containerized with Docker for one-command launch.

## Key Points

- End-to-end system that ingests Spotify/Genius data, predicts track mood + sentiment, and serves personalised playlist recommendations through a Flask API (Docker-ready)
- Wrote Python ETL that pulls 5K+ tracks via Spotify & Genius APIs and stores them in a cleaned feature set (audio metrics + transformer-based lyric embeddings)
- Trained and tuned an XGBoost classifier (grid-search CV) reaching 96% macro-F1 for mood prediction
- Exposed predictions at /predict with Flask; containerised via Docker for one-command launch (docker run -p 5000:5000 superplay-api)

## Metrics

- **Mood prediction accuracy (macro-F1):** 96 percent (macro-F1) (high confidence)
- **Tracks ingested:** 5000 tracks (high confidence)

## Tech Stack

Python, XGBoost, Spotify API, Genius API, Flask, Docker, Transformer embeddings, ML (grid-search CV)

## Links

- [Repository](https://github.com/rahilsinghi/SuperPlay/tree/main)
