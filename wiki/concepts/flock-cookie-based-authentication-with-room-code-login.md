---
title: "Flock: Cookie-Based Authentication with Room Code Login"
author: ai
created_at: 2026-04-10T17:19:44.670Z
last_ai_edit: 2026-04-10T17:19:44.670Z
last_human_edit: null
last_embedded_hash: ac8ddc58076c4776
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-cookie-based-auth-with-name-room-code-login-2aa1f5.md]]"
tags:
  - authentication
  - cookie
  - login
  - middleware
  - flock
  - development
  - feature
  - http-only
---


# Flock: Cookie-Based Authentication with Room Code Login

This article details the implementation of a simplified cookie-based authentication system for the Flock project. It replaces a third-party service (Clerk) with a custom login flow utilizing a user's name and a room code, managing sessions via an httpOnly cookie. A middleware handles redirects for unauthenticated users while permitting access to certain API routes and the host view.

## Key Concepts

Cookie-based authentication,httpOnly cookie,Authentication middleware,User authentication,Room code login

## Details

The Flock project implemented a custom cookie-based authentication system, replacing the third-party service Clerk for demo purposes. This system streamlines the login process by requiring a user's name and a room code (which serves as a password).

**Login Flow:**
1.  User provides a name and a room code.
2.  The system validates if a session already exists for the given credentials.
3.  A user profile is either found (if existing) or created.
4.  An `httpOnly` cookie is set on the user's browser for session management.
5.  The user is redirected to the appropriate page.

**Authentication Middleware:**
A middleware component is used to manage access control:
-   It redirects unauthenticated users to the login page.
-   It allows access to specific API routes and the host view without requiring prior authentication.

This implementation was part of a feature developed by [[Rahil Singhi]] on 2026-03-21, involving 4 file changes with 262 additions and 19 deletions, with contributions noted from Claude Opus 4.6. The commit SHA associated with this feature is `65eee64` in the `rahilsinghi/Flock` repository.

## Related

[[Flock (project)]],[[Clerk (authentication service)]],[[Rahil Singhi]]
