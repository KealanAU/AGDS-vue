/**
 * Audit: prefers-reduced-motion CSS coverage
 *
 * Imports each animated component's source via Vite's `?raw` suffix so we can
 * assert that a `@media (prefers-reduced-motion: reduce)` block exists and
 * targets the right selector + property.  Acts as a regression guard.
 */
import { describe, it, expect } from 'vitest'

// Raw source imports — Vite resolves these at test time as plain strings.
// Note: Vitest does not expose CSS file content via ?raw without `css: true`
// in vitest.config.ts, and enabling that globally breaks accessibility queries
// in other tests (display:none hides elements from ARIA roles).  The token
// zeroing in styles/tokens.css is therefore verified by code review; the
// component tests below provide runtime regression guards for each animation.
import loadingBlanketSrc from '../components/loading-blanket/AGDSLoadingBlanket.vue?raw'
import buttonSrc from '../components/button/AGDSButton.vue?raw'
import ctaButtonSrc from '../components/call-to-action/AGDSCallToActionButton.vue?raw'
import directionButtonSrc from '../components/direction-link/AGDSDirectionButton.vue?raw'
import comboboxAsyncSrc from '../components/autocomplete/AGDSComboboxAsync.vue?raw'
import comboboxAsyncMultiSrc from '../components/autocomplete/AGDSComboboxAsyncMulti.vue?raw'
import fileUploadFileSrc from '../components/file-upload/AGDSFileUploadFile.vue?raw'
import sideNavLinkListSrc from '../components/side-nav/SideNavLinkList.vue?raw'
import sideNavSrc from '../components/side-nav/AGDSSideNav.vue?raw'
import drawerSrc from '../components/drawer/AGDSDrawer.vue?raw'

// ─── Helper ──────────────────────────────────────────────────────────────────

/**
 * Extracts the combined text of every
 * `@media (prefers-reduced-motion: reduce) { … }` block in `source`.
 * Handles nested braces correctly.
 */
function getReducedMotionBlocks(source: string): string {
  const re = /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{/g
  const blocks: string[] = []
  let match: RegExpExecArray | null

  while ((match = re.exec(source)) !== null) {
    let depth = 1
    let i = re.lastIndex
    while (i < source.length && depth > 0) {
      if (source[i] === '{') depth++
      else if (source[i] === '}') depth--
      i++
    }
    blocks.push(source.slice(match.index, i))
  }

  return blocks.join('\n')
}

// ─── AGDSLoadingBlanket ───────────────────────────────────────────────────────

describe('AGDSLoadingBlanket — prefers-reduced-motion', () => {
  const block = getReducedMotionBlocks(loadingBlanketSrc)

  it('has a prefers-reduced-motion block', () => {
    expect(block).toBeTruthy()
  })

  it('disables animation on loading dots', () => {
    expect(block).toContain('.agds-loading-dots__dot')
    expect(block).toContain('animation: none')
  })

  it('makes dots visible (opacity: 1) when animation is disabled', () => {
    expect(block).toContain('opacity: 1')
  })
})

// ─── AGDSButton ───────────────────────────────────────────────────────────────

describe('AGDSButton — prefers-reduced-motion', () => {
  const block = getReducedMotionBlocks(buttonSrc)

  it('has a prefers-reduced-motion block', () => {
    expect(block).toBeTruthy()
  })

  it('disables spinner animation', () => {
    expect(block).toContain('.agds-button__spinner')
    expect(block).toContain('animation: none')
  })
})

// ─── AGDSCallToActionButton ───────────────────────────────────────────────────

describe('AGDSCallToActionButton — prefers-reduced-motion', () => {
  const block = getReducedMotionBlocks(ctaButtonSrc)

  it('has a prefers-reduced-motion block', () => {
    expect(block).toBeTruthy()
  })

  it('disables CTA spinner animation', () => {
    expect(block).toContain('.agds-cta__spinner')
    expect(block).toContain('animation: none')
  })
})

// ─── AGDSDirectionButton ──────────────────────────────────────────────────────

describe('AGDSDirectionButton — prefers-reduced-motion', () => {
  const block = getReducedMotionBlocks(directionButtonSrc)

  it('has a prefers-reduced-motion block', () => {
    expect(block).toBeTruthy()
  })

  it('disables direction button spinner animation', () => {
    expect(block).toContain('.agds-direction-link__spinner')
    expect(block).toContain('animation: none')
  })
})

// ─── AGDSComboboxAsync ────────────────────────────────────────────────────────

describe('AGDSComboboxAsync — prefers-reduced-motion', () => {
  const block = getReducedMotionBlocks(comboboxAsyncSrc)

  it('has a prefers-reduced-motion block', () => {
    expect(block).toBeTruthy()
  })

  it('disables combobox async spinner animation', () => {
    expect(block).toContain('.agds-combobox-async__spinner')
    expect(block).toContain('animation: none')
  })
})

// ─── AGDSComboboxAsyncMulti ───────────────────────────────────────────────────

describe('AGDSComboboxAsyncMulti — prefers-reduced-motion', () => {
  const block = getReducedMotionBlocks(comboboxAsyncMultiSrc)

  it('has a prefers-reduced-motion block', () => {
    expect(block).toBeTruthy()
  })

  it('disables combobox async-multi spinner animation', () => {
    expect(block).toContain('.agds-combobox-async-multi__spinner')
    expect(block).toContain('animation: none')
  })
})

// ─── AGDSFileUploadFile ───────────────────────────────────────────────────────

describe('AGDSFileUploadFile — prefers-reduced-motion', () => {
  const block = getReducedMotionBlocks(fileUploadFileSrc)

  it('has a prefers-reduced-motion block', () => {
    expect(block).toBeTruthy()
  })

  it('disables file upload spinner animation', () => {
    expect(block).toContain('.agds-file-upload-file__spinner')
    expect(block).toContain('animation: none')
  })
})

// ─── SideNavLinkList ─────────────────────────────────────────────────────────

describe('SideNavLinkList — prefers-reduced-motion', () => {
  const block = getReducedMotionBlocks(sideNavLinkListSrc)

  it('has a prefers-reduced-motion block', () => {
    expect(block).toBeTruthy()
  })

  it('disables link hover transition', () => {
    expect(block).toContain('.agds-side-nav__link')
    expect(block).toContain('transition: none')
  })

  it('disables chevron rotate transition', () => {
    expect(block).toContain('.agds-side-nav__chevron')
    expect(block).toContain('transition: none')
  })
})

// ─── AGDSSideNav ─────────────────────────────────────────────────────────────

describe('AGDSSideNav — prefers-reduced-motion', () => {
  const block = getReducedMotionBlocks(sideNavSrc)

  it('has a prefers-reduced-motion block', () => {
    expect(block).toBeTruthy()
  })

  it('disables toggle chevron transition', () => {
    expect(block).toContain('.agds-side-nav__toggle-chevron')
    expect(block).toContain('transition: none')
  })
})

// ─── AGDSDrawer (already had reduced-motion support) ─────────────────────────

describe('AGDSDrawer — prefers-reduced-motion', () => {
  const block = getReducedMotionBlocks(drawerSrc)

  it('has a prefers-reduced-motion block', () => {
    expect(block).toBeTruthy()
  })

  it('overrides overlay enter/leave transition duration', () => {
    expect(block).toContain('.agds-drawer-overlay-enter-active')
    expect(block).toContain('.agds-drawer-overlay-leave-active')
  })

  it('overrides panel enter/leave transition duration', () => {
    expect(block).toContain('.agds-drawer-panel-enter-active')
    expect(block).toContain('.agds-drawer-panel-leave-active')
  })
})
