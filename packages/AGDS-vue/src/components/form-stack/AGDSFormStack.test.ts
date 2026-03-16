import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSFormStack from './AGDSFormStack.vue'

const AXE_OPTS = { rules: { 'color-contrast': { enabled: false } } } as const

function renderFormStack(props: Record<string, unknown> = {}, slot = '<input /><input />') {
  return render(AgDSFormStack, { props, slots: { default: slot } })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AgDSFormStack — rendering', () => {
  it('renders a div by default', () => {
    const { container } = renderFormStack()
    expect(container.querySelector('div')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = renderFormStack({}, '<label>Name</label>')
    expect(getByText('Name')).toBeTruthy()
  })
})

// ─── Layout ───────────────────────────────────────────────────────────────────

describe('AgDSFormStack — layout', () => {
  it('applies display: flex', () => {
    const { container } = renderFormStack()
    expect((container.querySelector('div') as HTMLElement).style.display).toBe('flex')
  })

  it('applies flex-direction: column', () => {
    const { container } = renderFormStack()
    expect((container.querySelector('div') as HTMLElement).style.flexDirection).toBe('column')
  })

  it('applies gap using the space-2 token', () => {
    const { container } = renderFormStack()
    expect((container.querySelector('div') as HTMLElement).style.gap).toBe('var(--agds-space-2)')
  })
})

// ─── as prop ──────────────────────────────────────────────────────────────────

describe('AgDSFormStack — as prop', () => {
  it('renders as a <form> when as="form"', () => {
    const { container } = renderFormStack({ as: 'form' })
    expect(container.querySelector('form')).toBeTruthy()
  })

  it('renders as a <fieldset> when as="fieldset"', () => {
    const { container } = renderFormStack({ as: 'fieldset' })
    expect(container.querySelector('fieldset')).toBeTruthy()
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('AgDSFormStack — axe accessibility', () => {
  it('has no violations wrapping labelled inputs', async () => {
    const { container } = render(AgDSFormStack, {
      slots: {
        default: `
          <div>
            <label for="name">Name</label>
            <input id="name" type="text" />
          </div>
          <div>
            <label for="email">Email</label>
            <input id="email" type="email" />
          </div>
        `,
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations rendered as a form', async () => {
    const { container } = render(AgDSFormStack, {
      props: { as: 'form' },
      attrs: { 'aria-label': 'Contact form' },
      slots: {
        default: `
          <label for="msg">Message</label>
          <input id="msg" type="text" />
        `,
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when an <img> has no alt text', async () => {
    const { container } = renderFormStack()
    const img = document.createElement('img')
    img.setAttribute('src', 'photo.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
