---
title: Cookie-based Authentication with Name and Room Code Login (Flock)
author: ai
created_at: 2026-04-12T21:38:13.485Z
last_ai_edit: 2026-04-12T21:38:13.485Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-cookie-based-auth-with-name-room-code-login-2aa1f5.md]]"
tags:
  - authentication
  - cookies
  - login
  - flock
  - middleware
  - session
  - http-only
---

# Cookie-based Authentication with Name and Room Code Login (Flock)

This commit introduces a simplified cookie-based authentication system for the Flock project, replacing Clerk. Users log in with a name and room code, which validates an existing session or creates a user profile, then sets an HttpOnly cookie for session management.

## Key Concepts

Cookie-based Authentication,HttpOnly Cookies,Session Management,Middleware,User Authentication Flow

## Details

This feature, implemented in the `rahilsinghi/Flock` repository (SHA: `65eee64` on 2026-03-21), replaces the previous authentication mechanism (`Clerk`) with a simpler cookie-based system suitable for demonstration purposes.

### Login Flow
The authentication process is as follows:
1.  A user provides a **name** and a **room code** (which acts as a password).
2.  The system validates if a session already exists with these credentials.
3.  It then either finds an existing user profile or creates a new one.
4.  Upon successful validation/creation, an `httpOnly` cookie is set, establishing the user's session.
5.  The user is then redirected to the appropriate page.

### Middleware
A key component of this system is a middleware that handles authentication checks. It redirects unauthenticated users to the login page, ensuring that only authenticated users can access protected routes. However, it specifically allows API routes and the 'host view' to be accessed without requiring prior authentication.

## Related

[[Flock Project]],[[Clerk]],[[Cookie-based Authentication]],[[HTTP-only Cookies]],[[Middleware]],[[User Authentication]],[[Session Management]],[[User Profile]],[[API Routes]]
