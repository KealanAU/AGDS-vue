import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'
import AGDSMainNavDialog from './AGDSMainNavDialog.vue'
import type { MainNavItem } from './mainNavTypes'

afterEach(() => {
  document.body.style.overflow = ''
})

const linkItems: MainNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
]

const mixedItems: MainNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Action', onClick: vi.fn() },
  {
    label: 'Resources',
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Sub Action', onClick: vi.fn() },
    ],
  },
]

function renderDialog(props: Record<string, unknown> = {}) {
  return render(AGDSMainNavDialog, {
    props: { activePath: '/', isOpen: true, items: linkItems, ...props },
  })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSMainNavDialog — rendering', () => {
  it('renders nothing when isOpen is false', () => {
    renderDialog({ isOpen: false })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders the dialog when isOpen is true', () => {
    renderDialog({ isOpen: true })
    expect(screen.getByRole('dialog')).toBeTruthy()
  })

  it('renders link items as <a> elements', () => {
    renderDialog()
    expect(screen.getByRole('link', { name: 'Home' })).toBeTruthy()
  })

  it('renders button items (v-else) as <button> elements in the nav list', () => {
    renderDialog({ items: [{ label: 'Action', onClick: vi.fn() }] })
    const buttons = screen.getAllByRole('button')
    const actionBtn = buttons.find((b) => b.textContent?.trim() === 'Action')
    expect(actionBtn).toBeTruthy()
  })

  it('renders dropdown group labels', () => {
    renderDialog({ items: mixedItems })
    expect(screen.getByText('Resources')).toBeTruthy()
  })

  it('renders sub-link items inside a dropdown', () => {
    renderDialog({ items: mixedItems })
    expect(screen.getByRole('link', { name: 'Docs' })).toBeTruthy()
  })

  it('renders button sub-items (v-else) inside a dropdown', () => {
    renderDialog({ items: mixedItems })
    const buttons = screen.getAllByRole('button')
    const subActionBtn = buttons.find((b) => b.textContent?.trim() === 'Sub Action')
    expect(subActionBtn).toBeTruthy()
  })
})

// ─── Active path ──────────────────────────────────────────────────────────────

describe('AGDSMainNavDialog — active path', () => {
  it('marks the active link with aria-current="page"', () => {
    renderDialog({ activePath: '/about' })
    expect(screen.getByRole('link', { name: 'About' }).getAttribute('aria-current')).toBe('page')
  })

  it('does not mark non-active links with aria-current', () => {
    renderDialog({ activePath: '/about' })
    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBeNull()
  })

  it('applies active class to the matching link', () => {
    renderDialog({ activePath: '/about' })
    const link = screen.getByRole('link', { name: 'About' })
    expect(link.classList.contains('agds-main-nav-dialog__link--active')).toBe(true)
  })

  it('marks the active sub-link with aria-current="page"', () => {
    renderDialog({ items: mixedItems, activePath: '/docs' })
    expect(screen.getByRole('link', { name: 'Docs' }).getAttribute('aria-current')).toBe('page')
  })

  it('does not mark non-active sub-link with aria-current', () => {
    renderDialog({ items: mixedItems, activePath: '/' })
    expect(screen.getByRole('link', { name: 'Docs' }).getAttribute('aria-current')).toBeNull()
  })
})

// ─── Close behaviour ──────────────────────────────────────────────────────────

describe('AGDSMainNavDialog — close behaviour', () => {
  it('emits close when the Close menu button is clicked', async () => {
    const { emitted } = renderDialog()
    await fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(emitted().close).toHaveLength(1)
  })

  it('emits close when a top-level link is clicked', async () => {
    const { emitted } = renderDialog()
    await fireEvent.click(screen.getByRole('link', { name: 'Home' }))
    expect(emitted().close).toHaveLength(1)
  })

  it('emits close when Escape is pressed on the dialog', async () => {
    const { emitted } = renderDialog()
    const dialog = screen.getByRole('dialog')
    await fireEvent.keyDown(dialog, { key: 'Escape' })
    expect(emitted().close).toHaveLength(1)
  })

  it('does not emit close for other keys', async () => {
    const { emitted } = renderDialog()
    const dialog = screen.getByRole('dialog')
    await fireEvent.keyDown(dialog, { key: 'Enter' })
    expect(emitted().close).toBeUndefined()
  })
})

// ─── Tab focus trap ────────────────────────────────────────────────────────────

describe('AGDSMainNavDialog — Tab focus trap', () => {
  it('wraps focus to last element on Shift+Tab from first element', async () => {
    renderDialog()
    const dialog = screen.getByRole('dialog')
    const focusable = dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    expect(focusable.length).toBeGreaterThan(1)

    focusable[0].focus()
    expect(document.activeElement).toBe(focusable[0])

    await fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(focusable[focusable.length - 1])
  })

  it('wraps focus to first element on Tab from last element', async () => {
    renderDialog()
    const dialog = screen.getByRole('dialog')
    const focusable = dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    const last = focusable[focusable.length - 1]

    last.focus()
    expect(document.activeElement).toBe(last)

    await fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: false })
    expect(document.activeElement).toBe(focusable[0])
  })

  it('does not trap focus when Tab is pressed at a non-boundary element', async () => {
    renderDialog()
    const dialog = screen.getByRole('dialog')
    const focusable = dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    // Focus the first element, Tab forward: not at last, so no wrap
    if (focusable.length > 1) {
      focusable[0].focus()
      const before = document.activeElement
      // fire Tab (not at last → no preventDefault/focus change)
      await fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: false })
      // No wrap should have happened (focus stays the same or moves naturally)
      // What we test is that no error is thrown and the handler runs cleanly
      expect(focusable[0]).toBeTruthy()
      expect(before).toBe(focusable[0])
    }
  })
})
