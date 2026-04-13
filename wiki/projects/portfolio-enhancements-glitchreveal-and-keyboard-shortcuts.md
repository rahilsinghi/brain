---
title: "Portfolio Enhancements: GlitchReveal and Keyboard Shortcuts"
author: ai
created_at: 2026-04-10T17:42:58.732Z
last_ai_edit: 2026-04-10T17:42:58.732Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-glitchreveal-hidden-text-and-keyboard-shortcuts-306553.md]]"
tags:
  - portfolio
  - frontend
  - javascript
  - ui
  - userexperience
  - keyboardshortcuts
  - glitchreveal
  - commit
---

# Portfolio Enhancements: GlitchReveal and Keyboard Shortcuts

This feature commit introduces GlitchReveal, an interactive text effect where hidden text dynamically appears as the mouse cursor approaches. It also integrates a set of keyboard shortcuts to the portfolio for enhanced navigation and functionality, such as opening a terminal or accessing external links.

## Key Concepts

- GlitchReveal,- Keyboard Shortcuts,- User Interface (UI) Enhancements,- Interactive Text Effects,- User Experience (UX)

## Details

This commit to the `rahilsinghi/portfolio` repository (SHA: `5c40080`) by Rahil Singhi on 2026-03-12 introduced significant user interface and interaction enhancements.

### GlitchReveal

GlitchReveal is a new interactive text component. It renders text invisibly until the user's mouse cursor approaches within a 100-pixel radius. Upon proximity, the hidden text scrambles into view, creating a dynamic and engaging reveal effect.

### Keyboard Shortcuts

To improve navigation and accessibility, the following keyboard shortcuts were added:

*   `Cmd+K`: Opens a simulated terminal interface.
*   `?`: Displays a cheat sheet providing an overview of available shortcuts and commands.
*   `g` followed by `h`/`l`/`r`: These sequential key presses offer quick navigation to external professional profiles:
    *   `gh`: Navigates to the author's GitHub profile.
    *   `gl`: Navigates to the author's LinkedIn profile.
    *   `gr`: Navigates to the author's resume.

This commit involved changes to 2 files, adding 214 lines of code.

## Related

[[rahilsinghi/portfolio]],[[Rahil Singhi]]
