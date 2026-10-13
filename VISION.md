# Project vision

<!-- index: operate | Accepted product direction, constraints, and success evidence | Starting a project or making a high-impact scope decision. -->

Status: accepted
Project: tipjar
Owner: trial-owner
Date: 2026-10-13

## Outcome

For anyone splitting a restaurant or café bill at the table on their phone: Tipjar eliminates mental arithmetic under social pressure. A user types the bill amount and sees the tip, total, and per-person amount instantly — zero sign-up, zero friction. Success metric: time to first result ≤ 5 seconds on a cold page load.

## Users and context

People at a table after a meal, typically on a phone in portrait orientation. Today they either estimate in their head or use the stock calculator with multiple manual steps. They want a single-use tool that opens instantly, requires no account, and works without a network connection.

## Platforms and constraints

- Mobile web, phone browser (primary); desktop browser (secondary).
- Fully offline — static site, no network calls after initial load.
- Hosted on GitHub Pages under a sub-path (`/<repo>/`); every asset path must be relative.
- Deployable output in `dist/`.
- No server, accounts, analytics, cookies, or tracking of any kind.
- No budget or deadline constraint; MIT license.

## Non-goals

- Persistent history or saved splits.
- Native iOS/Android app.
- Multiple currencies or exchange rates.
- Receipt scanning or itemised splitting.
- Social sharing.

## Success evidence

- Unit tests for calculation logic (tip, total, per-person, rounding, invalid input) pass with `npm test`.
- `make ui-review` produces a passing visual review at phone (390 × 844) and desktop (1440 × 900) in both light and dark mode.
- `dist/` builds cleanly with all asset paths relative (`base: './'` in vite.config.js).
- `project.toml` phase is `private-preview` and `make done` is green.
