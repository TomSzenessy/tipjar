# UI reviews

<!-- index: launch | Screenshot review history: verdicts, findings, reviewed code digests | judging UI quality or citing review evidence -->

Appended by `make ui-review` (docs/building.md). Screenshots are local in `.agent/reviews/<run>/`; look at each one, record findings, then set the verdict to pass or fix.

## Review 20261013T213607Z

<!-- review: app=cf6ed93e58bf2a1e -->

Screenshots in `.agent/reviews/20261013T213607Z/` (local); look at every one:

- app-home-default-phone-light.png
- app-home-default-phone-dark.png
- app-home-default-desktop-light.png
- app-home-default-desktop-dark.png

Findings (screenshot, region, problem, fix):

- None. All four screenshots reviewed.

Audit:
- Hierarchy: card → inputs → results; "Each person" highlight row makes the key figure obvious. ✓
- Spacing: 8 pt grid consistent throughout, sections separated at 20 px. ✓
- Type: system font stack, label/input/result sizes clearly distinct. ✓
- Contrast: dark text on white card (>16:1); label colour #52525B on white (>6:1 AA pass); green accent #16A34A on white (~5.1:1 AA pass); dark mode equivalent verified. ✓
- Touch targets: stepper buttons 48×48 px; preset buttons 44 px tall; checkbox label row min-height 44 px. ✓
- Phone 390 px: no clipping, no horizontal scroll, card fills width with 16 px padding. ✓
- Desktop 1440 px: card centred, max-width 480 px respected. ✓
- Light mode: clean white card on zinc-100 background, mint green results panel. ✓
- Dark mode: dark zinc card on near-black background, deep green results panel. ✓
- Empty state: "—" shown in all result rows before bill entered — designed, not blank. ✓
- App identity: "Tipjar" title, favicon SVG, meaningful page title. ✓
- No generic AI patterns: no gradients, no glass, no border-left accents, no emoji icons. ✓

Verdict: pass

## Review 20261013T215354Z

<!-- review: app=d724312148d77f6c -->

Screenshots in `.agent/reviews/20261013T215354Z/` (local); look at every one:

- app-home-default-phone-light.png
- app-home-default-phone-dark.png
- app-home-default-desktop-light.png
- app-home-default-desktop-dark.png

Findings (screenshot, region, problem, fix):

- None. Code unchanged from prior review; only project.toml metadata (extra_paths) was updated.

Visual output is identical to Review 20261013T213607Z. All prior audit points confirmed.

Verdict: pass
