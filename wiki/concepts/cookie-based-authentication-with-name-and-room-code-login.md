---
title: Cookie-Based Authentication with Name and Room Code Login
author: ai
created_at: 2026-04-10T21:19:32.606Z
last_ai_edit: 2026-04-10T21:19:32.606Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-cookie-based-auth-with-name-room-code-login-2aa1f5.md]]"
tags:
  - authentication
  - cookies
  - login
  - middleware
  - session
  - http-only
  - flock
  - demo
  - development
---

# Cookie-Based Authentication with Name and Room Code Login

This article details the implementation of a custom cookie-based authentication system for the Flock project, replacing the Clerk service. It outlines a simplified login flow where users provide a name and room code to establish a session, secured by an HTTP-only cookie, and describes the role of authentication middleware in managing access.

## Key Concepts

Cookie-Based Authentication,HTTP-only Cookies,Authentication Middleware,User Sessions,Login Flow,Room Code Authentication

## Details

This feature, committed to the `rahilsinghi/Flock` repository (SHA: `65eee64`) on 2026-03-21 by Rahil Singhi (with co-authorship by Claude Opus 4.6), introduces a custom cookie-based authentication system. This implementation replaces a third-party service, Clerk, with a simpler mechanism, likely for demonstration or focused application needs.

**Login Flow:**
1.  Users are presented with input fields for a `name` and a `room code` (which functions as a password for room entry).
2.  The system first checks if an existing session is valid.
3.  It then either finds an existing user profile associated with the provided credentials or creates a new one.
4.  Upon successful validation, an `httpOnly` cookie is set on the client's browser. This cookie securely stores the session information.
5.  The user is then redirected to the appropriate application view.

**Authentication Middleware:**
A dedicated middleware component manages access control based on authentication status:
*   It redirects unauthenticated users to the login page, ensuring restricted areas are protected.
*   It specifically allows access to certain API routes and the 'host view' (presumably a public or less restricted area) without requiring full user authentication.

## Related

[[Flock (Project)]],[[Authentication]],[[Authentication Middleware]],[[Clerk (Authentication Service)]]
