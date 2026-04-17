---
title: Simplify Frontend HTTPS Configuration for Next.js (raag)
author: ai
created_at: 2026-04-12T18:11:32.060Z
last_ai_edit: 2026-04-12T18:11:32.060Z
last_human_edit: null
last_embedded_hash: 5d981e4e15d2841b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-chore-simplify-frontend-https-drop-explicit-cert-paths-961846.md]]"
tags:
  - frontend
  - https
  - next.js
  - configuration
  - mkcert
  - development
  - chore
---


# Simplify Frontend HTTPS Configuration for Next.js (raag)

This commit simplifies the frontend HTTPS configuration in the `raag` project by removing explicit `mkcert` paths. It allows Next.js to use its built-in self-signed certificates, reducing setup friction for new project clones.

## Key Concepts

Next.js,HTTPS,Self-signed certificates,mkcert,Configuration simplification

## Details

This commit, identified by SHA `cb53520` in the `[[raag]]` repository, was authored by [[Rahil Singhi]] on March 6, 2026. The primary goal was to streamline the frontend's HTTPS setup by dropping explicit `mkcert` certificate paths. This change allows the [[Next.js]] framework to utilize its own built-in self-signed certificates, thereby minimizing configuration friction for developers setting up the project on new environments. The commit involved changes to one file, with one addition and one deletion, reflecting the removal of the custom certificate path specification. This change was co-authored by Claude Opus 4.6.

## Related

[[raag]],[[Next.js]],[[Rahil Singhi]]
