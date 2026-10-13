# Product research

<!-- index: launch | Comparable products, user complaints, design references, and product angle | before product decisions or feature prioritisation -->

Tipjar is an original product built without reference to any specific app's assets, copy, or identity.

## Comparable products

**Splitwise** (https://splitwise.com) — group expense tracking with persistent history. Does well: social bill splitting across many people over time. Tip calculation is buried under account setup. Our angle: zero friction, no account, result in seconds.

**Tip N Split** (category: iOS tip calculator apps) — dedicated tip calculators exist as native apps. The typical complaint is requiring app install for something most people need once. Our angle: a URL in the browser beats an app nobody keeps.

**Google Search "tip calculator"** (https://www.google.com/search?q=tip+calculator) — Google shows an inline calculator on desktop; on mobile it is smaller and less usable. Locale-correct currency formatting is not handled. Our angle: locale-aware formatting, light/dark mode, large phone targets.

## What users dislike about existing tools

Sources: App Store and Play Store reviews for generic tip calculator apps.

1. **Requires sign-up or account** — for a one-time calculation, any signup gate is abandonment.
2. **Ad-heavy or slow to load** — calculators wrapped in web ads delay the one moment of value.
3. **Tiny tap targets on phones** — desktop-first layouts with small number buttons.
4. **No dark mode** — especially annoying at a dim restaurant table.
5. **Confusing custom tip field** — two separate UX paths (presets vs. text field) that fight each other.

## Design references

**Apple Calculator (iOS)** (https://support.apple.com/en-us/111824) — clean number display, large tap targets, immediate visual response. Borrowed: generous tap area sizing, result-first hierarchy.

**Intl.NumberFormat (MDN)** (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) — browser-native locale-aware number formatting; no external library needed.

**WCAG 2.2 Quick Reference** (https://www.w3.org/WAI/WCAG22/quickref/) — contrast ratios, touch target guidance, focus management. Applied directly to the token palette and control sizing.

## Our angle

Tipjar does one thing the others get wrong: it opens instantly, requires nothing, and shows the result before the user stops typing. No ads, no install, no account, and numbers formatted for the user's locale.
