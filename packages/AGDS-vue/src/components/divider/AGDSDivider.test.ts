import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSDivider from './AGDSDivider.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderDivider(props: Record<string, unknown> = {}, slot?: string) {
  return render(AGDSDivider, {
    props,
    slots: slot ? { default: slot } : undefined,
  })
}

// ─── Plain divider ────────────────────────────────────────────────────────────

describe('AGDSDivider — plain', () => {
  it('renders a single <hr> when no slot content is provided', () => {
    const { container } = renderDivider()
    expect(container.querySelector('hr.agds-divider')).toBeTruthy()
  })

  it('has aria-hidden="true" by default', () => {
    const { container } = renderDivider()
    const hr = container.querySelector('hr')
    expect(hr!.getAttribute('aria-hidden')).toBe('true')
  })

  it('omits aria-hidden when ariaHidden=false', () => {
    const { container } = renderDivider({ ariaHidden: false })
    const hr = container.querySelector('hr')
    expect(hr!.hasAttribute('aria-hidden')).toBe(false)
  })

  it('does not render a wrapper div', () => {
    const { container } = renderDivider()
    expect(container.querySelector('.agds-divider--with-text')).toBeNull()
  })
})

// ─── Divider with text ────────────────────────────────────────────────────────

describe('AGDSDivider — with text', () => {
  it('renders a wrapper div instead of a plain <hr> when slot content is provided', () => {
    const { container } = renderDivider({}, '<span>or</span>')
    expect(container.querySelector('.agds-divider--with-text')).toBeTruthy()
    expect(container.querySelectorAll('hr')).toHaveLength(2)
  })

  it('renders the slot content inside the text div', () => {
    const { getByText } = renderDivider({}, '<span>or</span>')
    expect(getByText('or')).toBeTruthy()
  })

  it('inner <hr> elements both have aria-hidden="true"', () => {
    const { container } = renderDivider({}, '<span>or</span>')
    const hrs = container.querySelectorAll('hr')
    hrs.forEach((hr) => {
      expect(hr.getAttribute('aria-hidden')).toBe('true')
    })
  })

  it('applies center alignment class by default', () => {
    const { container } = renderDivider({}, '<span>or</span>')
    expect(container.querySelector('.agds-divider--align-center')).toBeTruthy()
  })

  it('applies left alignment class when textAlign="left"', () => {
    const { container } = renderDivider({ textAlign: 'left' }, '<span>or</span>')
    expect(container.querySelector('.agds-divider--align-left')).toBeTruthy()
  })

  it('wrapper has role="separator"', () => {
    const { container } = renderDivider({}, '<span>or</span>')
    const wrapper = container.querySelector('.agds-divider--with-text')
    expect(wrapper!.getAttribute('role')).toBe('separator')
  })

  it('wrapper has aria-hidden="true" by default', () => {
    const { container } = renderDivider({}, '<span>or</span>')
    const wrapper = container.querySelector('.agds-divider--with-text')
    expect(wrapper!.getAttribute('aria-hidden')).toBe('true')
  })

  it('omits aria-hidden on wrapper when ariaHidden=false', () => {
    const { container } = renderDivider({ ariaHidden: false }, '<span>or</span>')
    const wrapper = container.querySelector('.agds-divider--with-text')
    expect(wrapper!.hasAttribute('aria-hidden')).toBe(false)
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSDivider — axe accessibility', () => {
  it('has no violations: plain divider', async () => {
    const { container } = renderDivider()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: plain divider, ariaHidden=false', async () => {
    const { container } = renderDivider({ ariaHidden: false })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: with text, textAlign=center', async () => {
    const { container } = renderDivider({}, '<span>or</span>')
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: with text, textAlign=left', async () => {
    const { container } = renderDivider({ textAlign: 'left' }, '<span>or</span>')
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: with text, ariaHidden=false', async () => {
    const { container } = renderDivider({ ariaHidden: false }, '<span>or</span>')
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the container holds an <img> with no alt text', async () => {
    const { container } = renderDivider()
    const img = document.createElement('img')
    img.setAttribute('src', 'divider.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
