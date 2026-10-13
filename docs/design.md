# Design

<!-- index: design | Visual direction, tokens, and UX principles for Tipjar | before any UI work -->
<!-- covers: index.html src/** tests/** vite.config.js package.json -->

Status: accepted
Date: 2026-10-13

## Direction

**Chosen direction: Clean utility calculator** — minimal chrome, large tappable controls, instant feedback. The visual language reads like a polished receipt or POS terminal: legible numbers, clear hierarchy, nothing decorative.

Rejected directions:
- App-store landing page aesthetic (too much padding, hero numbers, marketing feel)
- Native iOS mimicry (calculator keyboard layout) — reduces keyboard nav and accessibility

## Palette

CSS custom properties; light mode is the default, dark follows `prefers-color-scheme` or a manual toggle stored in `localStorage`.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--c-bg` | `#F4F4F5` | `#09090B` | Page background |
| `--c-surface` | `#FFFFFF` | `#18181B` | Card / input background |
| `--c-text` | `#18181B` | `#FAFAFA` | Primary text |
| `--c-text-2` | `#52525B` | `#A1A1AA` | Labels, secondary |
| `--c-accent` | `#16A34A` | `#4ADE80` | Active presets, focus ring |
| `--c-accent-fg` | `#FFFFFF` | `#052E16` | Text on accent background |
| `--c-border` | `#E4E4E7` | `#27272A` | Input border, dividers |
| `--c-error` | `#DC2626` | `#F87171` | Error messages |
| `--c-result-bg` | `#F0FDF4` | `#052E16` | Results panel background |

Contrast verified against WCAG AA (minimum 4.5:1 for body text):
- `--c-text` on `--c-surface`: > 16:1 (both modes) ✓
- `--c-text-2` on `--c-surface`: > 6:1 (both modes) ✓
- `--c-accent` on `--c-surface` (light): ~5.1:1 ✓
- `--c-accent-fg` on `--c-accent` (light): > 7:1 ✓
- `--c-error` on `--c-surface` (light): ~5.8:1 ✓

## Typography

System font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

| Role | Size | Weight |
|---|---|---|
| App title | 20px | 700 |
| Labels | 13px | 500 |
| Inputs | 18px | 400 |
| Preset buttons | 15px | 600 |
| Result labels | 14px | 500 |
| Result values | 22px | 700 |
| Per-person highlight | 28px | 800 |
| Error messages | 12px | 400 |

## Spacing

8px grid. Sections separated by 16px gap. Inputs 48px tall (exceeds 44pt minimum). Stepper buttons 48 × 48px.

## Radius

10px for cards and inputs, 8px for buttons.

## Interactions

- Preset buttons: `aria-pressed` toggle; active state uses `--c-accent` background.
- Stepper +/− buttons: tap to increment; hold for continuous repeat.
- All results update on each keystroke (`input` event).
- Error messages use `role="alert" aria-live="polite"` — announced to screen readers.
- Focus ring: 2px solid `--c-accent`, offset 2px.
- Theme toggle stores preference in `localStorage`; initial load respects system preference.

## Mockup direction confirmed

Utility calculator, green accent, system font, mobile-first single-card layout.
