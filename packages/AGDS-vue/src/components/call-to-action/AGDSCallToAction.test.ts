import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSCallToActionLink from './AGDSCallToActionLink.vue'
import AGDSCallToActionButton from './AGDSCallToActionButton.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderLink(props: Record<string, unknown> = {}, slot = 'Get started') {
  return render(AGDSCallToActionLink, {
    props: { href: '/start', ...props },
    slots: { default: slot },
  })
}

function renderButton(props: Record<string, unknown> = {}, slot = 'Get started') {
  return render(AGDSCallToActionButton, {
    props,
    slots: { default: slot },
  })
}

// ─── AGDSCallToActionLink — rendering ──────────────────────────────────────

describe('AGDSCallToActionLink — rendering', () => {
  it('renders an <a> element', () => {
    const { getByRole } = renderLink()
    expect(getByRole('link')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = renderLink({}, 'Apply now')
    expect(getByText('Apply now')).toBeTruthy()
  })

  it('sets the href attribute', () => {
    const { getByRole } = renderLink({ href: '/about' })
    expect(getByRole('link').getAttribute('href')).toBe('/about')
  })

  it('renders a chevron icon', () => {
    const { container } = renderLink()
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('applies agds-cta class', () => {
    const { getByRole } = renderLink()
    expect(getByRole('link').className).toContain('agds-cta')
  })
})

// ─── AGDSCallToActionLink — external prop ──────────────────────────────────

describe('AGDSCallToActionLink — external prop', () => {
  it('does not set target by default', () => {
    const { getByRole } = renderLink()
    expect(getByRole('link').getAttribute('target')).toBeNull()
  })

  it('sets target="_blank" when external=true', () => {
    const { getByRole } = renderLink({ external: true })
    expect(getByRole('link').getAttribute('target')).toBe('_blank')
  })

  it('sets rel="noopener noreferrer" when external=true', () => {
    const { getByRole } = renderLink({ external: true })
    expect(getByRole('link').getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('renders offscreen "opens in a new tab" text when external=true', () => {
    const { getByText } = renderLink({ external: true })
    expect(getByText(', opens in a new tab')).toBeTruthy()
  })

  it('does not render offscreen text when not external', () => {
    const { queryByText } = renderLink()
    expect(queryByText(', opens in a new tab')).toBeNull()
  })
})

// ─── AGDSCallToActionLink — events ─────────────────────────────────────────

describe('AGDSCallToActionLink — events', () => {
  it('emits click when clicked', async () => {
    const { getByRole, emitted } = renderLink()
    await fireEvent.click(getByRole('link'))
    expect(emitted().click).toHaveLength(1)
  })

  it('emits click with MouseEvent payload', async () => {
    const { getByRole, emitted } = renderLink()
    await fireEvent.click(getByRole('link'))
    expect(emitted().click[0][0]).toBeInstanceOf(MouseEvent)
  })
})

// ─── AGDSCallToActionLink — accessibility ───────────────────────────────────

describe('AGDSCallToActionLink — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderLink()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when external=true', async () => {
    const { container } = renderLink({ external: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the link has no accessible name', async () => {
    const { container } = render(AGDSCallToActionLink, {
      props: { href: '/start' },
      slots: { default: '' },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('toHaveNoViolations')
  })
})

// ─── AGDSCallToActionButton — rendering ────────────────────────────────────

describe('AGDSCallToActionButton — rendering', () => {
  it('renders a <button> element', () => {
    const { getByRole } = renderButton()
    expect(getByRole('button')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = renderButton({}, 'Submit')
    expect(getByText('Submit')).toBeTruthy()
  })

  it('renders a chevron icon', () => {
    const { container } = renderButton()
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('defaults to type="button"', () => {
    const { getByRole } = renderButton()
    expect(getByRole('button').getAttribute('type')).toBe('button')
  })

  it('applies agds-cta class', () => {
    const { getByRole } = renderButton()
    expect(getByRole('button').className).toContain('agds-cta')
  })
})

// ─── AGDSCallToActionButton — type prop ────────────────────────────────────

describe('AGDSCallToActionButton — type prop', () => {
  it.each(['button', 'submit', 'reset'] as const)(
    'sets type="%s" on the native element',
    (type) => {
      const { getByRole } = renderButton({ type })
      expect(getByRole('button').getAttribute('type')).toBe(type)
    },
  )
})

// ─── AGDSCallToActionButton — disabled prop ────────────────────────────────

describe('AGDSCallToActionButton — disabled prop', () => {
  it('is not disabled by default', () => {
    const { getByRole } = renderButton()
    expect((getByRole('button') as HTMLButtonElement).disabled).toBe(false)
  })

  it('sets the native disabled attribute when disabled=true', () => {
    const { getByRole } = renderButton({ disabled: true })
    expect((getByRole('button') as HTMLButtonElement).disabled).toBe(true)
  })

  it('sets aria-disabled="true" when disabled', () => {
    const { getByRole } = renderButton({ disabled: true })
    expect(getByRole('button').getAttribute('aria-disabled')).toBe('true')
  })

  it('does not set aria-disabled when not disabled', () => {
    const { getByRole } = renderButton()
    expect(getByRole('button').getAttribute('aria-disabled')).toBeNull()
  })

  it('applies agds-cta--disabled class when disabled', () => {
    const { getByRole } = renderButton({ disabled: true })
    expect(getByRole('button').className).toContain('agds-cta--disabled')
  })

  it('does not emit click when disabled', async () => {
    const { getByRole, emitted } = renderButton({ disabled: true })
    await fireEvent.click(getByRole('button'))
    expect(emitted().click).toBeUndefined()
  })
})

// ─── AGDSCallToActionButton — loading prop ─────────────────────────────────

describe('AGDSCallToActionButton — loading prop', () => {
  it('renders spinner when loading=true', () => {
    const { getByRole } = renderButton({ loading: true })
    expect(getByRole('button').querySelector('.agds-cta__spinner')).toBeTruthy()
  })

  it('spinner has aria-hidden="true"', () => {
    const { getByRole } = renderButton({ loading: true })
    const spinner = getByRole('button').querySelector('.agds-cta__spinner')
    expect(spinner?.getAttribute('aria-hidden')).toBe('true')
  })

  it('sets native disabled when loading', () => {
    const { getByRole } = renderButton({ loading: true })
    expect((getByRole('button') as HTMLButtonElement).disabled).toBe(true)
  })

  it('sets aria-busy="true" when loading', () => {
    const { getByRole } = renderButton({ loading: true })
    expect(getByRole('button').getAttribute('aria-busy')).toBe('true')
  })

  it('does not set aria-busy when not loading', () => {
    const { getByRole } = renderButton()
    expect(getByRole('button').getAttribute('aria-busy')).toBeNull()
  })

  it('applies agds-cta--loading class when loading', () => {
    const { getByRole } = renderButton({ loading: true })
    expect(getByRole('button').className).toContain('agds-cta--loading')
  })

  it('does not emit click when loading', async () => {
    const { getByRole, emitted } = renderButton({ loading: true })
    await fireEvent.click(getByRole('button'))
    expect(emitted().click).toBeUndefined()
  })

  it('announces loadingLabel to screen readers', () => {
    const { getByText } = renderButton({ loading: true, loadingLabel: 'Submitting form' })
    expect(getByText('Submitting form')).toBeTruthy()
  })
})

// ─── AGDSCallToActionButton — events ───────────────────────────────────────

describe('AGDSCallToActionButton — events', () => {
  it('emits click when clicked in default state', async () => {
    const { getByRole, emitted } = renderButton()
    await fireEvent.click(getByRole('button'))
    expect(emitted().click).toHaveLength(1)
  })

  it('emits click with MouseEvent payload', async () => {
    const { getByRole, emitted } = renderButton()
    await fireEvent.click(getByRole('button'))
    expect(emitted().click[0][0]).toBeInstanceOf(MouseEvent)
  })
})

// ─── AGDSCallToActionButton — defineExpose ─────────────────────────────────

describe('AGDSCallToActionButton — defineExpose', () => {
  it('exposes a focus method', () => {
    const { getByRole } = renderButton()
    const button = getByRole('button') as HTMLButtonElement
    const focusSpy = vi.spyOn(button, 'focus')
    button.focus()
    expect(focusSpy).toHaveBeenCalled()
  })
})

// ─── AGDSCallToActionButton — accessibility ────────────────────────────────

describe('AGDSCallToActionButton — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderButton()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled=true', async () => {
    const { container } = renderButton({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when loading=true', async () => {
    const { container } = renderButton({ loading: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for type=submit', async () => {
    const { container } = renderButton({ type: 'submit' })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the button has no accessible name', async () => {
    const { container } = render(AGDSCallToActionButton, { slots: { default: '' } })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('toHaveNoViolations')
  })
})
