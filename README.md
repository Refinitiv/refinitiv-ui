# Element Framework (EF)

Element Framework is LSEG Workspace standardised components that provides components and tooling to help product teams work faster and more efficiently.

## Shell compatibility build (ADR003 Spike 1)

This branch is an experimental **dependency build**, not production Shell support.
It follows Shell ADR003's preferred package approach rather than rewriting ELF
with a Vite plugin. ELF owns the scope and services; no Shell loader, Runtime or
registration API is changed. The framework adapter remains Spike 2.

Starting revision: `9ff231f5` on `v7`. The approved baseline deliberately upgrades
the ADR's sample baseline (core 7.5.5, elements 7.15.7, Halo 7.6.4):

| Package                    | Version |
| -------------------------- | ------- |
| `@refinitiv-ui/core`       | 7.5.7   |
| `@refinitiv-ui/elements`   | 7.15.10 |
| `@refinitiv-ui/halo-theme` | 7.6.7   |

Use Node 20+ and npm 11.5.1+ (validated with Node 24.22.0 / npm 11.19.1):

```bash
npm ci
npm run build:shell-compat
npm run test:shell-compat
```

The Nx builds type-check and emit JavaScript, declarations and source maps.
Tarballs are written to ignored `artifacts/shell-compat/`; nothing is published.
Install all three local tarballs together. They retain the original package
versions, so version numbers alone do not distinguish stock and patched builds.
Do not mix stock and compatibility ELF in one browser page:
custom-element names and theme registration are still shared.
The unused DS-theme dependency can install stock Halo transitively. The sample
resolver selects only the direct patched packages and its Rollup module-graph
check rejects bundled core/elements/Halo modules from any other location.

Public API:

```typescript
import { setupElf } from '@refinitiv-ui/elements/compat';

const scope = setupElf(existingAppShadowRoot);
// Mount controls only after setup. Unmount and finish control disconnection first.
scope.dispose();
```

The root's host must be connected. Import the controls' Halo themes before setup,
including the tooltip theme. Only one scope may be registered, even if its app is
hidden. Missing scopes, a second registration, and disposal with connected
controls throw explicit errors. Disposal is idempotent; reconnecting needs a fresh
scope. Core also exports `registerElfScope`, `requireElfScope` and
`requireActiveElfScope`; adapters must not keep another registry.

Changes in this build:

- Native `HTMLElement.title` is untouched. Explicit `tooltip` attributes and
  clipped-text tooltips use an app-local default tooltip instead of a body singleton.
- Tap/role-button keyboard synthesis and focus registration use the app root.
  Temporary completion listeners finish app presses released outside without
  synthesizing or cancelling outside input.
- Page-wide native-style imports fail with a migration message. Import Halo's
  `dark/portable/host.css` and `dark/portable/theme.css` as CSS text and place them
  in the existing shadow root. `portable/fonts.css` remains page-level, using
  Halo's distinct `Proxima Nova Fin` family; font/CSP checks remain Spike 4.
- Overlay measuring elements and default notification trays are placed in the app
  root so the sample's existing dialogs, calendar, dropdowns and notifications
  still work. Notification padding affects the app host, not document layout.

The sibling [sample app](../sample-elf/README.md) installs these **tarballs** in an
isolated `compat/` dependency tree. Its stock standalone and stock Shell entries
keep their original packages. Its additional compatibility host is a local Spike 1
test fixture, **not** `withElfAdapter` or validation of real Shell registration.
Tests check core/elements source maps and the emitted Rollup module provenance for
the selected core/elements/Halo tree, normal order workflows, local themes,
untouched outside controls and remounts.

Self-review added failing-before/fixed-after regressions for taps escaping onto
the app host, stale disconnected focus, notification style snapshots, and rapid
sample-host reconnection. The focused ELF suite has 19 checks, repeated in three
fresh Chromium runs (57 passes). The installed sample's 13 production-bundle
checks pass three times with retries disabled; its 25 stock checks retain the
existing expected tab-arrow failure. Notification style tests use controlled
timers; the sample fixes date, locale and timezone and supplies local CDN fixtures.

**Remaining release blockers:** document-level overlay locks/focus behavior and
popup clipping are not fully contained; the first outside click can still be
consumed while a popup is open. Hide/resume, removal during active interactions,
spinner listener cleanup, async asset cancellation, tab-arrow navigation,
locale inheritance, Angular/Zone.js, EFX controls, multiple apps, Shell CSP and
the real Shell browser matrix remain later spikes. The upstream document-global
tests are not a compatibility-build certification; use the focused scope tests
and sample checks, and do not claim all ELF controls are supported.

Recovery: use a previous tested compatibility app build and reload the page to
clear custom-element definitions and theme state. If none exists, return to
standalone/Classic hosting with original dependencies; never substitute stock ELF
inside Shell. Rebuilding the experimental compatibility tarballs changes their integrity:
reinstall them in the sample with `npm run install:compat`, and retain the generated
lockfile and exact tarballs together when sharing a tested build. Assign a new
version before publishing; these local builds must not overwrite existing releases.

# Documentation

Getting started and usage guidance are available in the project documentation.

# Packages

| Package                         |
| ------------------------------- |
| `@refinitiv-ui/configurations`  |
| `@refinitiv-ui/core`            |
| `@refinitiv-ui/demo-block`      |
| `@refinitiv-ui/elemental-theme` |
| `@refinitiv-ui/elements`        |
| `@refinitiv-ui/halo-theme`      |
| `@refinitiv-ui/i18n`            |
| `@refinitiv-ui/phrasebook`      |
| `@refinitiv-ui/solar-theme`     |
| `@refinitiv-ui/test-helpers`    |
| `@refinitiv-ui/theme-compiler`  |
| `@refinitiv-ui/translate`       |
| `@refinitiv-ui/utils`           |
| `create-efx`                    |

**⚠️ Solar Theme is deprecated.**

# License Information

See [LICENSE](./LICENSE.md).

# Support

For questions or issues, contact the project maintainers.

# Contributing

See [CONTRIBUTING](./CONTRIBUTING.md).
