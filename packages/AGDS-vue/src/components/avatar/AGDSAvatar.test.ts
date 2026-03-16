import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSAvatar from './AGDSAvatar.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderAvatar(
  props: Record<string, unknown> = {},
  attrs: Record<string, unknown> = {},
) {
  return render(AgDSAvatar, { props, attrs })
}

// ─── Initials derivation ──────────────────────────────────────────────────────

describe('AgDSAvatar — initials', () => {
  it('shows first and last initials for a two-word name', () => {
    const { getByRole } = renderAvatar({ name: 'Jane Doe' })
    expect(getByRole('img').textContent).toBe('JD')
  })

  it('shows first and last word initials for a multi-word name', () => {
    const { getByRole } = renderAvatar({ name: 'Mary Jane Watson' })
    expect(getByRole('img').textContent).toBe('MW')
  })

  it('shows a single initial for a one-word name', () => {
    const { getByRole } = renderAvatar({ name: 'Madonna' })
    expect(getByRole('img').textContent).toBe('M')
  })

  it('shows "?" for an empty name', () => {
    // aria-label defaults to name ('') which would strip the role; provide label explicitly
    const { container } = renderAvatar({ name: '' }, { 'aria-label': 'Unknown user' })
    expect(container.querySelector('.agds-avatar')!.textContent).toBe('?')
  })

  it('handles unicode names correctly', () => {
    const { getByRole } = renderAvatar({ name: 'Ångström Öberg' })
    expect(getByRole('img').textContent).toBe('ÅÖ')
  })
})

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSAvatar — rendering', () => {
  it('renders a <span> element', () => {
    const { container } = renderAvatar({ name: 'Jane Doe' })
    expect(container.querySelector('span.agds-avatar')).toBeTruthy()
  })

  it('has role="img" by default', () => {
    const { getByRole } = renderAvatar({ name: 'Jane Doe' })
    expect(getByRole('img')).toBeTruthy()
  })

  it('defaults aria-label to the name prop', () => {
    const { getByRole } = renderAvatar({ name: 'Jane Doe' })
    expect(getByRole('img').getAttribute('aria-label')).toBe('Jane Doe')
  })

  it('uses a custom aria-label when provided', () => {
    const { container } = renderAvatar({ name: 'Jane Doe' }, { 'aria-label': 'Avatar for Jane Doe' })
    expect(container.querySelector('.agds-avatar')!.getAttribute('aria-label')).toBe('Avatar for Jane Doe')
  })
})

// ─── Props: tone ─────────────────────────────────────────────────────────────

describe('AgDSAvatar — tone prop', () => {
  it('defaults to neutral tone', () => {
    const { container } = renderAvatar({ name: 'Jane Doe' })
    expect(container.querySelector('.agds-avatar--neutral')).toBeTruthy()
  })

  it.each(['neutral', 'action'] as const)(
    'applies agds-avatar--%s class for tone="%s"',
    (tone) => {
      const { container } = renderAvatar({ name: 'Jane Doe', tone })
      expect(container.querySelector(`.agds-avatar--${tone}`)).toBeTruthy()
    },
  )
})

// ─── Props: size ─────────────────────────────────────────────────────────────

describe('AgDSAvatar — size prop', () => {
  it('defaults to md size', () => {
    const { container } = renderAvatar({ name: 'Jane Doe' })
    expect(container.querySelector('.agds-avatar--md')).toBeTruthy()
  })

  it.each(['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const)(
    'applies agds-avatar--%s class for size="%s"',
    (size) => {
      const { container } = renderAvatar({ name: 'Jane Doe', size })
      expect(container.querySelector(`.agds-avatar--${size}`)).toBeTruthy()
    },
  )
})

// ─── aria-hidden ─────────────────────────────────────────────────────────────

describe('AgDSAvatar — aria-hidden', () => {
  it('sets aria-hidden="true" and removes role when aria-hidden="true"', () => {
    const { container } = renderAvatar({ name: 'Jane Doe' }, { 'aria-hidden': 'true' })
    const el = container.querySelector('.agds-avatar')!
    expect(el.getAttribute('aria-hidden')).toBe('true')
    expect(el.getAttribute('role')).toBeNull()
    expect(el.getAttribute('aria-label')).toBeNull()
  })

  it('accepts the boolean true for aria-hidden', () => {
    const { container } = renderAvatar({ name: 'Jane Doe' }, { 'aria-hidden': true })
    const el = container.querySelector('.agds-avatar')!
    expect(el.getAttribute('aria-hidden')).toBe('true')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSAvatar — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderAvatar({ name: 'Jane Doe' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for tone=action', async () => {
    const { container } = renderAvatar({ name: 'Jane Doe', tone: 'action' })
    await runAxe(container, AXE_OPTS)
  })

  it.each(['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const)(
    'has no violations for size=%s',
    async (size) => {
      const { container } = renderAvatar({ name: 'Jane Doe', size })
      await runAxe(container, AXE_OPTS)
    },
  )

  it('has no violations when aria-hidden="true"', async () => {
    const { container } = renderAvatar({ name: 'Jane Doe' }, { 'aria-hidden': 'true' })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the container holds an <img> with no alt text', async () => {
    // Verify our a11y helper correctly catches real violations.
    const { container } = renderAvatar({ name: 'Jane Doe' })
    const img = document.createElement('img')
    img.setAttribute('src', 'avatar.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
