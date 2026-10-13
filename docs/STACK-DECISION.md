# Stack decision record

<!-- index: operate | Framework/toolchain decision and rationale | Choosing a project stack or replacing an assumed tool. -->

Status: accepted
Project: tipjar
Owner: trial-owner
Date: 2026-10-13

## Decision

**Vite 5.x + Vanilla JavaScript (ES2022 modules) + Vitest 2.x for unit tests. No CSS framework — raw CSS custom properties for theming.**

Confirmed versions from npmjs.com on 2026-10-13:
- `vite`: `^5.4.11`
- `vitest`: `^2.1.8`
- Node.js ≥ 18 (LTS)

Output: `dist/` with `base: './'` for GitHub Pages sub-path hosting. All assets use relative paths.

## Why this, and what else was considered

**Vite + Vanilla JS chosen because:**
- A tip calculator has trivial state (four inputs, three outputs). No framework is justified.
- Vite provides hot-reload dev server, ES module bundling, and `dist/` output with `base: './'` for relative paths at any sub-path.
- Vitest shares the Vite config; tests run the same ES modules without transpilation ceremony.
- Zero runtime dependencies means a minimal bundle and fast mobile cold load.

**Alternatives considered and rejected:**
- **React + Next.js**: four-function calculator needs no virtual DOM, routing, or server rendering. Adds 40 KB+ of runtime.
- **SvelteKit**: better DX than React for small apps, but still a framework for a task that needs roughly 200 lines of JS.
- **Pure HTML with no build tool**: viable for the app, but Vitest requires ES modules and a dev server; manual testing of number formatting edge cases is error-prone without a test runner.

## Verification and rollback

Verify:
```
npm install
npm test        # Vitest unit tests pass
npm run build   # dist/ output with relative asset paths
```

Rollback: remove `package.json`, `vite.config.js`, `src/`, `tests/`, `dist/`, and `node_modules/`.
Serve `index.html` directly or replace with a single-file implementation.
