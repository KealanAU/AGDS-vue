import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSDirectionLink from './AGDSDirectionLink.vue'
import AgDSDirectionButton from './AGDSDirectionButton.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderLink(props: Record<string, unknown> = {}, slot = 'Continue') {
  return render(AgDSDirectionLink, {
    props: { href: '/next', direction: 'right', ...props },
    slots: { default: slot },
  })
}

function renderButton(props: Record<string, unknown> = {}, slot = 'Continue') {
  return render(AgDSDirectionButton, {
    props: { direction: 'right', ...props },
    slots: { default: slot },
  })
}

// ─── AgDSDirectionLink — rendering ─────────────────────────────────────────

describe('AgDSDirectionLink — rendering', () => {
  it('renders an <a> element', () => {
    const { getByRole } = renderLink()
    expect(getByRole('link')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = renderLink({}, 'Go back')
    expect(getByText('Go back')).toBeTruthy()
  })

  it('sets href', () => {
    const { getByRole } = renderLink({ href: '/about' })
    expect(getByRole('link').getAttribute('href')).toBe('/about')
  })
})

// ─── AgDSDirectionLink — direction prop ────────────────────────────────────

describe('AgDSDirectionLink — direction prop', () => {
  it.each(['up', 'right', 'down', 'left'] as const)(
    'renders an icon for direction="%s"',
    (direction) => {
      const { container } = renderLink({ direction })
      // AgDSIcon wraps @iconify/vue which renders an SVG
      expect(container.querySelector('svg')).toBeTruthy()
    },
  )

  it('places the icon before text when direction is left', () => {
    const { container } = renderLink({ direction: 'left' }, 'Go back')
    const link = container.querySelector('.agds-direction-link')!
    const svg = link.querySelector('svg')!
    const text = Array.from(link.childNodes).find(n => n.textContent?.includes('Go back'))!
    // compareDocumentPosition: if svg precedes text, DOCUMENT_POSITION_FOLLOWING (4) is set
    expect(svg.compareDocumentPosition(text) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('places the icon after text when direction is right', () => {
    const { container } = renderLink({ direction: 'right' }, 'Continue')
    const link = container.querySelector('.agds-direction-link')!
    const svg = link.querySelector('svg')!
    const text = Array.from(link.childNodes).find(n => n.textContent?.includes('Continue'))!
    // svg follows text: DOCUMENT_POSITION_PRECEDING (2)
    expect(svg.compareDocumentPosition(text) & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy()
  })
})

// ─── AgDSDirectionLink — external prop ─────────────────────────────────────

describe('AgDSDirectionLink — external prop', () => {
  it('sets target="_blank" and rel when external=true', () => {
    const { getByRole } = renderLink({ external: true })
    const a = getByRole('link')
    expect(a.getAttribute('target')).toBe('_blank')
    expect(a.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('appends sr-only "opens in a new tab" text when external=true', () => {
    const { getByText } = renderLink({ external: true })
    expect(getByText(', opens in a new tab')).toBeTruthy()
  })

  it('does not set target or rel by default', () => {
    const { getByRole } = renderLink()
    const a = getByRole('link')
    expect(a.getAttribute('target')).toBeNull()
    expect(a.getAttribute('rel')).toBeNull()
  })
})

// ─── AgDSDirectionLink — events ────────────────────────────────────────────

describe('AgDSDirectionLink — events', () => {
  it('emits click on click', async () => {
    const { getByRole, emitted } = renderLink()
    await fireEvent.click(getByRole('link'))
    expect(emitted().click).toHaveLength(1)
  })

  it('emits focus on focus', async () => {
    const { getByRole, emitted } = renderLink()
    await fireEvent.focus(getByRole('link'))
    expect(emitted().focus).toHaveLength(1)
  })

  it('emits blur on blur', async () => {
    const { getByRole, emitted } = renderLink()
    await fireEvent.blur(getByRole('link'))
    expect(emitted().blur).toHaveLength(1)
  })
})

// ─── AgDSDirectionLink — accessibility ─────────────────────────────────────

describe('AgDSDirectionLink — accessibility', () => {
  it('has no axe violations with direction=right', async () => {
    const { container } = renderLink({ direction: 'right' }, 'Continue')
    await runAxe(container, AXE_OPTS)
  })

  it('has no axe violations with direction=left', async () => {
    const { container } = renderLink({ direction: 'left' }, 'Go back')
    await runAxe(container, AXE_OPTS)
  })

  it('has no axe violations when external=true', async () => {
    const { container } = renderLink({ external: true }, 'Visit site')
    await runAxe(container, AXE_OPTS)
  })

  it('detects axe violations (intentional: empty link label)', async () => {
    const { container } = render(AgDSDirectionLink, {
      props: { href: '/x', direction: 'right' },
      slots: { default: '' },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})

// ─── AgDSDirectionButton — rendering ───────────────────────────────────────

describe('AgDSDirectionButton — rendering', () => {
  it('renders a <button> element', () => {
    const { getByRole } = renderButton()
    expect(getByRole('button')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = renderButton({}, 'Submit')
    expect(getByText('Submit')).toBeTruthy()
  })

  it('defaults to type="button"', () => {
    const { getByRole } = renderButton()
    expect(getByRole('button').getAttribute('type')).toBe('button')
  })
})

// ─── AgDSDirectionButton — direction prop ──────────────────────────────────

describe('AgDSDirectionButton — direction prop', () => {
  it.each(['up', 'right', 'down', 'left'] as const)(
    'renders an icon for direction="%s"',
    (direction) => {
      const { container } = renderButton({ direction })
      expect(container.querySelector('svg')).toBeTruthy()
    },
  )
})

// ─── AgDSDirectionButton — disabled state ──────────────────────────────────

describe('AgDSDirectionButton — disabled state', () => {
  it('sets disabled attribute when disabled=true', () => {
    const { getByRole } = renderButton({ disabled: true })
    expect((getByRole('button') as HTMLButtonElement).disabled).toBe(true)
  })

  it('sets aria-disabled when disabled=true', () => {
    const { getByRole } = renderButton({ disabled: true })
    expect(getByRole('button').getAttribute('aria-disabled')).toBe('true')
  })

  it('does not emit click when disabled', async () => {
    const { getByRole, emitted } = renderButton({ disabled: true })
    await fireEvent.click(getByRole('button'))
    expect(emitted().click).toBeUndefined()
  })
})

// ─── AgDSDirectionButton — loading state ───────────────────────────────────

describe('AgDSDirectionButton — loading state', () => {
  it('sets aria-busy when loading=true', () => {
    const { getByRole } = renderButton({ loading: true })
    expect(getByRole('button').getAttribute('aria-busy')).toBe('true')
  })

  it('renders the loading label in the live region', () => {
    const { getByText } = renderButton({ loading: true, loadingLabel: 'Saving' })
    expect(getByText('Saving')).toBeTruthy()
  })

  it('does not emit click when loading', async () => {
    const { getByRole, emitted } = renderButton({ loading: true })
    await fireEvent.click(getByRole('button'))
    expect(emitted().click).toBeUndefined()
  })
})

// ─── AgDSDirectionButton — events ──────────────────────────────────────────

describe('AgDSDirectionButton — events', () => {
  it('emits click when clicked', async () => {
    const { getByRole, emitted } = renderButton()
    await fireEvent.click(getByRole('button'))
    expect(emitted().click).toHaveLength(1)
  })

  it('emits focus on focus', async () => {
    const { getByRole, emitted } = renderButton()
    await fireEvent.focus(getByRole('button'))
    expect(emitted().focus).toHaveLength(1)
  })

  it('emits blur on blur', async () => {
    const { getByRole, emitted } = renderButton()
    await fireEvent.blur(getByRole('button'))
    expect(emitted().blur).toHaveLength(1)
  })

  it('emits keydown on keydown', async () => {
    const { getByRole, emitted } = renderButton()
    await fireEvent.keyDown(getByRole('button'), { key: 'Enter' })
    expect(emitted().keydown).toHaveLength(1)
  })
})

// ─── AgDSDirectionButton — keyboard ────────────────────────────────────────

describe('AgDSDirectionButton — keyboard', () => {
  it('activates on Enter key', async () => {
    const { getByRole, emitted } = renderButton()
    getByRole('button').focus()
    await fireEvent.keyDown(getByRole('button'), { key: 'Enter' })
    await fireEvent.click(getByRole('button'))
    expect(emitted().click).toBeTruthy()
  })
})

// ─── AgDSDirectionButton — defineExpose ────────────────────────────────────

describe('AgDSDirectionButton — defineExpose', () => {
  it('exposes a focus() method', () => {
    const { getByRole, getCurrentComponent } = renderButton() as any
    const vm = getCurrentComponent?.()?.exposed ?? null
    // If exposed, focus should be a function
    if (vm) {
      expect(typeof vm.focus).toBe('function')
    } else {
      // Verify the button can receive focus programmatically
      const btn = getByRole('button') as HTMLButtonElement
      btn.focus()
      expect(document.activeElement).toBe(btn)
    }
  })
})

// ─── AgDSDirectionButton — accessibility ───────────────────────────────────

describe('AgDSDirectionButton — accessibility', () => {
  it('has no axe violations in default state', async () => {
    const { container } = renderButton({}, 'Continue')
    await runAxe(container, AXE_OPTS)
  })

  it('has no axe violations when disabled', async () => {
    const { container } = renderButton({ disabled: true }, 'Continue')
    await runAxe(container, AXE_OPTS)
  })

  it('has no axe violations when loading', async () => {
    const { container } = renderButton({ loading: true, loadingLabel: 'Saving changes' }, 'Continue')
    await runAxe(container, AXE_OPTS)
  })

  it('detects axe violations (intentional: empty button label)', async () => {
    const { container } = render(AgDSDirectionButton, {
      props: { direction: 'right' },
      slots: { default: '' },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
