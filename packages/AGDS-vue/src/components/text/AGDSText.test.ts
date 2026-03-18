import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSText from './AGDSText.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderText(props: Record<string, unknown> = {}, slot = 'Hello text') {
  return render(AGDSText, { props, slots: { default: slot } })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSText — rendering', () => {
  it('renders a <span> by default', () => {
    const { container } = renderText()
    expect(container.querySelector('span.agds-text')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = renderText({}, 'Body copy')
    expect(getByText('Body copy')).toBeTruthy()
  })
})

// ─── as prop ─────────────────────────────────────────────────────────────────

describe('AGDSText — as prop', () => {
  it.each(['p', 'div', 'li', 'label', 'strong', 'em'] as const)(
    'renders as <%s>',
    (as) => {
      const { container } = renderText({ as })
      expect(container.querySelector(`${as}.agds-text`)).toBeTruthy()
    },
  )
})

// ─── color prop ──────────────────────────────────────────────────────────────

describe('AGDSText — color prop', () => {
  it('defaults to text color', () => {
    const { container } = renderText()
    const el = container.querySelector('.agds-text') as HTMLElement
    expect(el.style.color).toContain('--agds-color-text')
  })

  it.each(['text', 'muted', 'inverse', 'disabled'] as const)(
    'applies %s color token',
    (color) => {
      const { container } = renderText({ color })
      const el = container.querySelector('.agds-text') as HTMLElement
      expect(el.style.color).toContain(`--agds-color-text`)
    },
  )
})

// ─── fontFamily prop ─────────────────────────────────────────────────────────

describe('AGDSText — fontFamily prop', () => {
  it.each(['body', 'heading', 'mono'] as const)(
    'applies %s font-family token',
    (fontFamily) => {
      const { container } = renderText({ fontFamily })
      const el = container.querySelector('.agds-text') as HTMLElement
      expect(el.style.fontFamily).toContain(`--agds-font-family-${fontFamily}`)
    },
  )
})

// ─── fontSize prop ───────────────────────────────────────────────────────────

describe('AGDSText — fontSize prop', () => {
  it('defaults to sm', () => {
    const { container } = renderText()
    const el = container.querySelector('.agds-text') as HTMLElement
    expect(el.style.fontSize).toContain('--agds-font-size-sm')
  })

  it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const)(
    'applies %s size token',
    (fontSize) => {
      const { container } = renderText({ fontSize })
      const el = container.querySelector('.agds-text') as HTMLElement
      expect(el.style.fontSize).toContain(`--agds-font-size-${fontSize}`)
    },
  )
})

// ─── fontWeight prop ─────────────────────────────────────────────────────────

describe('AGDSText — fontWeight prop', () => {
  it.each(['normal', 'medium', 'semibold', 'bold'] as const)(
    'applies %s weight token',
    (fontWeight) => {
      const { container } = renderText({ fontWeight })
      const el = container.querySelector('.agds-text') as HTMLElement
      expect(el.style.fontWeight).toContain(`--agds-font-weight-${fontWeight}`)
    },
  )
})

// ─── lineHeight prop ─────────────────────────────────────────────────────────

describe('AGDSText — lineHeight prop', () => {
  it.each(['tight', 'snug', 'normal', 'relaxed'] as const)(
    'applies %s line-height token',
    (lineHeight) => {
      const { container } = renderText({ lineHeight })
      const el = container.querySelector('.agds-text') as HTMLElement
      expect(el.style.lineHeight).toContain(`--agds-line-height-${lineHeight}`)
    },
  )
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('AGDSText — axe', () => {
  it('has no violations as default span', async () => {
    const { container } = renderText()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations as a paragraph', async () => {
    const { container } = renderText({ as: 'p' }, 'Paragraph text.')
    await runAxe(container, AXE_OPTS)
  })

  it.each(['text', 'muted', 'inverse', 'disabled'] as const)(
    'has no violations with color=%s',
    async (color) => {
      const { container } = renderText({ color }, 'Coloured text')
      await runAxe(container, AXE_OPTS)
    },
  )

  it('catches intentional axe violation — button with no accessible name', async () => {
    const { container } = render(AGDSText, {
      props: { as: 'p' },
      slots: { default: '<button></button>' },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
