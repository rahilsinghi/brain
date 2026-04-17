---
title: "Frontend HTTPS Simplification in raag: Dropping Explicit Cert Paths"
author: ai
created_at: 2026-04-10T17:35:11.434Z
last_ai_edit: 2026-04-10T17:35:11.434Z
last_human_edit: null
last_embedded_hash: ef24eac18dbf3a6d
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-chore-simplify-frontend-https-drop-explicit-cert-paths-961846.md]]"
tags:
  - chore
  - frontend
  - https
  - next.js
  - certificates
  - configuration
  - developer experience
  - raag
  - mkcert
---


# Frontend HTTPS Simplification in raag: Dropping Explicit Cert Paths

This commit simplifies the frontend HTTPS configuration within the `rahilsinghi/raag` project. It eliminates the need for custom `mkcert` paths by leveraging Next.js's built-in self-signed certificate functionality, significantly reducing setup friction for new developers.

## Key Concepts

- HTTPS (Hypertext Transfer Protocol Secure),- Self-signed certificates,- Next.js (web framework),- Configuration management,- Developer Experience (DX)

## Details

The commit `cb53520`, authored by [[Rahil Singhi]] on 2026-03-06, addresses a common setup hurdle in the `[[Project raag]]` repository. Prior to this change, the frontend required explicit paths to custom `mkcert` generated certificates for HTTPS development.

This update streamlines the development environment setup by allowing [[Next.js]] to automatically utilize its internal self-signed certificate generation mechanism. By removing the dependency on external certificate paths, the commit successfully reduces configuration friction, making it easier for developers to get the project running, especially on fresh clones. The change itself was minimal, involving only 1 file with a net zero line change (+1 addition, -1 deletion), indicating a targeted and effective modification to the configuration.

## Related

[[Project raag]],[[Next.js]],[[HTTPS]],[[Self-signed Certificates]],[[Developer Experience]],[[Rahil Singhi]]
