---
title: "Flock: Color System Migration to Hex Values"
author: ai
created_at: 2026-04-10T17:40:14.998Z
last_ai_edit: 2026-04-10T17:40:14.998Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-switch-all-colors-from-broken-hsl-vars-to-solid-hex-value-b33df2.md]]"
tags:
  - flock
  - color system
  - hex colors
  - css variables
  - tailwind css
  - fix
  - front-end
  - refactor
  - rahil singhi
  - css
---

# Flock: Color System Migration to Hex Values

This commit addresses a critical rendering issue in the Flock repository where CSS HSL variables, particularly when used with Tailwind, were failing to display correctly. The entire color system was migrated to solid hex values to ensure consistent and accurate rendering across all components. This update resolves visual inconsistencies and improves readability.

## Key Concepts

- [[CSS Variables]] (`hsl(var(--...))`),- [[Tailwind CSS]] utility classes,- Hexadecimal color values (`#RRGGBB`),- Color System design,- CSS Color Models (HSL vs. Hex)

## Details

This commit (`f70c257`) for the `rahilsinghi/Flock` repository, authored by Rahil Singhi on 2026-03-21, involved significant changes to the project's color system, with 114 additions and 188 deletions across 3 files.

The core problem stemmed from the `hsl(var(--...))` pattern, which broke when CSS variables contained space-separated HSL values inside Tailwind utility classes. This led to incorrect rendering, such as gradients appearing as white blobs.

To resolve this, the entire color system was switched to solid hex values, ensuring consistent and correct rendering:

*   **Background**: Changed to `#0b0b14`, eliminating issues like gradients rendering as white blobs.
*   **Foreground**: Updated to `#e8ecf4`, ensuring sufficient brightness for readability.
*   **Primary**: Set to `#2dd4a8` (a teal shade).
*   **Muted**: Changed to `#7a85a0`, providing visible labels.

Additional changes include:

*   All inline styles in the host page now exclusively use hex/rgba values instead of `hsl(var())`.
*   The layout body now utilizes inline styles rather than Tailwind classes for color definitions.
*   Updates were also applied to the host page's TravelerAura colors, converting them to hex values.

This change was co-authored by Claude Opus 4.6.

## Related

[[Flock (Project)]],[[CSS Color Systems]],[[Tailwind CSS]],[[Rahil Singhi]],[[CSS Variables]],[[Color Accessibility]]
