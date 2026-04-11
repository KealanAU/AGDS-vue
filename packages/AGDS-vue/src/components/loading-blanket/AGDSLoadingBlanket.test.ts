import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSLoadingBlanket from './AGDSLoadingBlanket.vue'
import loadingBlanketSrc from './AGDSLoadingBlanket.vue?raw'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderBlanket(props: Record<string, unknown> = {}) {
  return render(AGDSLoadingBlanket, {
    props: { label: 'Loading', ...props },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSLoadingBlanket — rendering', () => {
  it('renders the loading container', () => {
    const { container } = renderBlanket()
    expect(container.querySelector('.agds-loading-blanket')).toBeTruthy()
  })

  it('renders the label text', () => {
    const { getByText } = renderBlanket({ label: 'Please wait' })
    expect(getByText('Please wait')).toBeTruthy()
  })

  it('renders 3 dots by default', () => {
    const { container } = renderBlanket()
    expect(container.querySelectorAll('.agds-loading-dots__dot')).toHaveLength(3)
  })

  it('renders 5 dots when fullScreen=true', () => {
    const { container } = renderBlanket({ fullScreen: true })
    expect(container.querySelectorAll('.agds-loading-dots__dot')).toHaveLength(5)
  })

  it('renders the content wrapper', () => {
    const { container } = renderBlanket()
    expect(container.querySelector('.agds-loading-blanket__content')).toBeTruthy()
  })
})

// ─── Props: fullScreen ────────────────────────────────────────────────────────

describe('AGDSLoadingBlanket — fullScreen prop', () => {
  it('does not apply full-screen class by default', () => {
    const { container } = renderBlanket()
    expect(container.querySelector('.agds-loading-blanket--full-screen')).toBeNull()
  })

  it('applies full-screen class when fullScreen=true', () => {
    const { container } = renderBlanket({ fullScreen: true })
    expect(container.querySelector('.agds-loading-blanket--full-screen')).toBeTruthy()
  })

  it('uses md dot size class by default', () => {
    const { container } = renderBlanket()
    expect(container.querySelector('.agds-loading-dots--md')).toBeTruthy()
  })

  it('uses lg dot size class when fullScreen=true', () => {
    const { container } = renderBlanket({ fullScreen: true })
    expect(container.querySelector('.agds-loading-dots--lg')).toBeTruthy()
  })
})

// ─── ARIA ─────────────────────────────────────────────────────────────────────

describe('AGDSLoadingBlanket — ARIA', () => {
  it('label has role="status" by default (polite live region)', () => {
    const { container } = renderBlanket()
    const label = container.querySelector('.agds-loading-blanket__label')
    expect(label!.getAttribute('role')).toBe('status')
  })

  it('label has role="alert" when fullScreen=true (assertive live region)', () => {
    const { container } = renderBlanket({ fullScreen: true })
    const label = container.querySelector('.agds-loading-blanket__label')
    expect(label!.getAttribute('role')).toBe('alert')
  })

  it('dots wrapper has aria-hidden="true"', () => {
    const { container } = renderBlanket()
    const dots = container.querySelector('.agds-loading-dots')
    expect(dots!.getAttribute('aria-hidden')).toBe('true')
  })
})

// ─── Dots ─────────────────────────────────────────────────────────────────────

describe('AGDSLoadingBlanket — dots animation', () => {
  it('each dot has a staggered animation delay (100ms per dot)', () => {
    const { container } = renderBlanket()
    const dots = container.querySelectorAll('.agds-loading-dots__dot')
    dots.forEach((dot, i) => {
      expect((dot as HTMLElement).style.animationDelay).toBe(`${i * 100}ms`)
    })
  })

  it('fullScreen dots also have staggered delays', () => {
    const { container } = renderBlanket({ fullScreen: true })
    const dots = container.querySelectorAll('.agds-loading-dots__dot')
    dots.forEach((dot, i) => {
      expect((dot as HTMLElement).style.animationDelay).toBe(`${i * 100}ms`)
    })
  })
})

// ─── prefers-reduced-motion ───────────────────────────────────────────────────

describe('AGDSLoadingBlanket — prefers-reduced-motion CSS', () => {
  // jsdom cannot evaluate CSS @media queries, so we inspect the raw source
  // to verify the correct reduced-motion rules ship with the component.

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

  it('sets animation: none on dots', () => {
    const block = getReducedMotionBlocks(loadingBlanketSrc)
    expect(block).toContain('.agds-loading-dots__dot')
    expect(block).toContain('animation: none')
  })

  it('makes dots visible (opacity: 1) so loading state is still perceivable', () => {
    const block = getReducedMotionBlocks(loadingBlanketSrc)
    expect(block).toContain('opacity: 1')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSLoadingBlanket — axe accessibility', () => {
  it('has no violations with default props', async () => {
    const { container } = renderBlanket()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with fullScreen=true', async () => {
    const { container } = renderBlanket({ fullScreen: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a custom label', async () => {
    const { container } = renderBlanket({ label: 'Saving your changes' })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when an img without alt text is present', async () => {
    const { container } = renderBlanket()
    const img = document.createElement('img')
    img.setAttribute('src', 'spinner.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
