# Accessibility Testing

This library uses two complementary layers of accessibility testing. Both layers run axe-core against the same rule tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, and `best-practice`.

## Scope

This library provides **accessibility primitives** — correct WAI-ARIA roles, states, keyboard patterns, and focus management per the [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/). **WCAG conformance is a property of the consuming application.** The consumer is responsible for page structure, sufficient contrast in their chosen theme, content-level requirements (e.g. meaningful link text in context), and correct component composition.

---

## Two-layer strategy

### Layer 1 — Vitest + axe-core (jsdom)

**Files:** `src/**/*.test.ts`  
**Config:** `vitest.config.ts`, `src/test/setup.ts`, `src/test/a11y.ts`  
**When it runs:** every CI push

Renders components in jsdom and runs axe-core via `vitest-axe`. Catches WAI-ARIA role and state violations, missing accessible names, incorrect label associations, keyboard-navigation structure, and heading hierarchy. Fast — suitable for running on every commit.

Colour-contrast checks are **disabled** in this layer. jsdom has no CSS rendering engine, so `getComputedStyle` always returns empty strings. Axe's colour-contrast rule reads computed styles; running it in jsdom produces false positives on every component. Contrast is verified in Layer 2.

### Layer 2 — Playwright CT + @axe-core/playwright (Chromium)

**Files:** `src/**/*.ct.ts`  
**Config:** `playwright-ct.config.ts`, `src/test/ctMount.ts`  
**When it runs:** before releases, or when changing visual tokens

Mounts components in a real Chromium browser via `@playwright/experimental-ct-vue`. Runs axe-core with colour-contrast **enabled**. Also catches dynamic accessibility properties that jsdom cannot compute: focus-trap behaviour, scroll position, `pointer-events: none` on overlays, and any CSS-driven visibility or display changes.

---

## Running tests

```bash
# Layer 1 — Vitest (jsdom)
npx vitest run          # one-off run
npx vitest              # watch mode
pnpm test               # via package.json script
pnpm test:watch         # watch mode via package.json script

# Layer 2 — Playwright CT (Chromium, colour-contrast enabled)
npx playwright test -c playwright-ct.config.ts
pnpm test:ct
```

Running a single file:

```bash
npx vitest run src/components/button/AGDSButton.test.ts
npx playwright test -c playwright-ct.config.ts src/components/button/AGDSButton.ct.ts
```

---

## What each layer catches

| Check | Vitest (jsdom) | Playwright CT (Chromium) |
|---|---|---|
| WAI-ARIA roles and states | Yes | Yes |
| Missing accessible names | Yes | Yes |
| Label associations | Yes | Yes |
| Heading hierarchy | Yes | Yes |
| Colour contrast (WCAG 1.4.3) | No — jsdom has no computed styles | Yes |
| Focus trap runtime behaviour | Partial — no real focus events | Yes |
| CSS-driven visibility / display | No | Yes |
| `pointer-events` on overlays | No | Yes |
| Speed | Fast (~seconds) | Slower (~minutes) |
| Runs on every CI push | Yes | No — pre-release / token changes |

---

## Writing new axe unit tests (Vitest)

Import `axe` or `runAxe` from `../../test/a11y` and pass `AXE_OPTS` to disable colour-contrast:

```ts
import { render } from '@testing-library/vue'
import { runAxe, axe } from '../../test/a11y'
import AGDSMyComponent from './AGDSMyComponent.vue'

// Disable colour-contrast — jsdom has no computed styles, so this rule
// always fails with false positives in a jsdom environment.
const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

it('has no axe violations', async () => {
  const { container } = render(AGDSMyComponent, { props: { label: 'Example' } })
  expect(await axe(container, AXE_OPTS)).toHaveNoViolations()
})

// Or using the runAxe wrapper (throws on violations):
it('has no axe violations', async () => {
  const { container } = render(AGDSMyComponent, { props: { label: 'Example' } })
  await runAxe(container, AXE_OPTS)
})
```

`runAxe` is a backwards-compatible wrapper that calls `expect(results).toHaveNoViolations()` internally. The `toHaveNoViolations` matcher is registered globally in `src/test/setup.ts` — no per-file setup needed.

---

## Writing new Playwright CT tests

Import `test` and `expect` from `../../test/ctMount` and define a local `runAxe` helper scoped to `#app`:

```ts
import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSMyComponent from './AGDSMyComponent.vue'

async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    .include('#app')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

test.describe('AGDSMyComponent — real-browser axe (colour-contrast enabled)', () => {
  test('has no axe violations', async ({ mount, page }) => {
    await mount(AGDSMyComponent, { props: { label: 'Example' } })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
```

**`.include('#app')`** scopes axe to the component's mount container, excluding the Playwright CT harness markup.

**Disabled rules:**
- `landmark-one-main` — the CT harness page has no `<main>` landmark; this is not a component-level concern.
- `page-has-heading-one` — isolated component tests intentionally omit a `<h1>`; heading hierarchy is tested in consuming app contexts.
- `region` — content outside landmarks is expected in an isolated component fixture; this rule is meaningful only at page level.

Colour-contrast is **not** disabled here — that is the primary purpose of this layer.

---

## Adding a new component

1. Create `src/components/{name}/AGDS{Name}.test.ts`.
   - Render the component with `@testing-library/vue`.
   - Call `axe(container, AXE_OPTS)` (with colour-contrast disabled) for each significant prop combination.
   - Include a negative test that confirms the helper catches real violations (e.g. render without a required label and assert that `runAxe` rejects).

2. Optionally create `src/components/{name}/AGDS{Name}.ct.ts` for real-browser contrast checks.
   - Required when the component introduces new colour tokens or visual states.
   - Copy the `runAxe` helper pattern above; mount each variant and assert `results.violations` is empty.
