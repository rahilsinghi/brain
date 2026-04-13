---
title: Cookie-Based Authentication with Name and Room Code Login
author: ai
created_at: 2026-04-12T17:37:09.485Z
last_ai_edit: 2026-04-12T17:37:09.485Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-cookie-based-auth-with-name-room-code-login-2aa1f5.md]]"
tags:
  - flock
  - authentication
  - cookies
  - login
  - middleware
  - security
  - demo
  - sessionmanagement
---

# Cookie-Based Authentication with Name and Room Code Login

This commit implements a simplified, cookie-based authentication system for the Flock project, replacing Clerk. Users log in with a name and a room code, which acts as a password, leading to session validation, user profile management, and an httpOnly cookie for session persistence. A middleware handles redirects for unauthenticated users, while allowing specific API routes and host views without authentication.

## Key Concepts

Cookie-based Authentication,HTTP-only Cookies,Login Flow,Middleware,User Profiles,Session Management,Room Codes,Clerk (as replaced system)

## Details

This feature introduces a streamlined authentication mechanism for the [[Flock Project]], moving away from the more complex Clerk authentication system. The new flow is designed for demo purposes, focusing on simplicity and efficiency.

**Login Process:**
1.  **User Input:** A user provides a desired name and a specific 'room code'. The room code functions as a password for accessing a particular session.
2.  **Session Validation:** The system validates the provided room code against existing sessions.
3.  **User Profile Management:** Upon successful validation, the system either locates an existing user profile associated with the name and room, or creates a new one.
4.  **Cookie Issuance:** An `httpOnly` cookie is set, establishing the user's authenticated session. This cookie helps maintain session persistence without being accessible via client-side scripts, enhancing security.
5.  **Redirection:** The user is then redirected to the appropriate authenticated view within the application.

**Middleware Role:**
A dedicated middleware component is responsible for managing access based on authentication status:
*   It automatically redirects unauthenticated users attempting to access protected routes to the login page.
*   Crucially, it allows specific API routes and designated 'host views' to bypass the authentication check, ensuring critical functionalities and public-facing content remain accessible.

## Related

[[Flock Project]],[[Authentication]],[[Middleware]],[[Session Management]],[[User Authentication Flow]],[[Chore: Remove @clerk/nextjs Dependency and Dynamic Agent Labels (Flock)]]
