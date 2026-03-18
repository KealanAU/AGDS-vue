import { describe, it, expect, afterEach } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/vue'
import { ref, nextTick } from 'vue'
import { runAxe } from '../../test/a11y'
import AGDSDrawer from './AGDSDrawer.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderDrawer(options: {
  initialOpen?: boolean
  title?: string
  width?: 'md' | 'lg'
  mutedOverlay?: boolean
  showActions?: boolean
  bodySlot?: string
} = {}) {
  const {
    initialOpen = true,
    title = 'Test drawer',
    width = 'md',
    mutedOverlay = false,
    showActions = false,
    bodySlot = '<p>Drawer body content</p>',
  } = options

  return render({
    components: { AGDSDrawer },
    template: `
      <AGDSDrawer
        v-model="open"
        :title="title"
        :width="width"
        :muted-overlay="mutedOverlay"
      >
        ${bodySlot}
        ${showActions ? '<template #actions><button type="button">Save</button></template>' : ''}
      </AGDSDrawer>
    `,
    setup: () => {
      const open = ref(initialOpen)
      return { open, title, width, mutedOverlay }
    },
  })
}

afterEach(() => {
  document.body.style.overflow = ''
})

// ── Rendering ─────────────────────────────────────────────────────────────────

describe('AGDSDrawer — rendering', () => {
  it('renders the dialog when modelValue is true', () => {
    renderDrawer()
    expect(screen.getByRole('dialog')).toBeTruthy()
  })

  it('does not render the dialog when modelValue is false', () => {
    renderDrawer({ initialOpen: false })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders the title text', () => {
    renderDrawer({ title: 'My drawer' })
    expect(screen.getByText('My drawer')).toBeTruthy()
  })

  it('renders body slot content', () => {
    renderDrawer({ bodySlot: '<p>Slot body</p>' })
    expect(screen.getByText('Slot body')).toBeTruthy()
  })

  it('renders the actions slot when provided', () => {
    renderDrawer({ showActions: true })
    expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy()
  })

  it('does not render the footer when actions slot is absent', () => {
    const { container } = renderDrawer({ showActions: false })
    expect(container.querySelector('.agds-drawer__footer')).toBeNull()
  })

  it('renders the close button', () => {
    renderDrawer()
    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy()
  })

  it('applies the md width class by default', () => {
    renderDrawer()
    expect(document.body.querySelector('.agds-drawer--md')).toBeTruthy()
  })

  it('applies the lg width class when width="lg"', () => {
    renderDrawer({ width: 'lg' })
    expect(document.body.querySelector('.agds-drawer--lg')).toBeTruthy()
  })

  it('applies the muted overlay class when mutedOverlay is true', () => {
    renderDrawer({ mutedOverlay: true })
    expect(document.body.querySelector('.agds-drawer__overlay--muted')).toBeTruthy()
  })
})

// ── Semantics ─────────────────────────────────────────────────────────────────

describe('AGDSDrawer — semantics', () => {
  it('dialog has role="dialog"', () => {
    renderDrawer()
    expect(screen.getByRole('dialog').getAttribute('role')).toBe('dialog')
  })

  it('dialog has aria-modal="true"', () => {
    renderDrawer()
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true')
  })

  it('dialog is labelled by the title element via aria-labelledby', () => {
    renderDrawer({ title: 'Accessible drawer' })
    const dialog = screen.getByRole('dialog')
    const labelId = dialog.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()
    const titleEl = document.getElementById(labelId!)
    expect(titleEl?.textContent?.trim()).toBe('Accessible drawer')
  })

  it('title is rendered as an h2', () => {
    renderDrawer()
    expect(screen.getByRole('dialog').querySelector('h2')).toBeTruthy()
  })

  it('title has tabindex="-1" for programmatic focus', () => {
    renderDrawer()
    const title = screen.getByRole('dialog').querySelector('h2')
    expect(title?.getAttribute('tabindex')).toBe('-1')
  })

  it('body section has correct aria-label', () => {
    renderDrawer({ title: 'Settings' })
    expect(screen.getByRole('region', { name: 'Settings content' })).toBeTruthy()
  })
})

// ── Open / close behaviour ────────────────────────────────────────────────────

describe('AGDSDrawer — open/close behaviour', () => {
  it('close button closes the drawer', async () => {
    renderDrawer()
    await fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('clicking the overlay closes the drawer', async () => {
    renderDrawer()
    const overlay = document.body.querySelector('.agds-drawer__overlay') as HTMLElement
    await fireEvent.click(overlay)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('Escape key closes the drawer', async () => {
    renderDrawer()
    const dialog = screen.getByRole('dialog')
    await fireEvent.keyDown(dialog, { key: 'Escape' })
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('sets body overflow to hidden when open', async () => {
    renderDrawer({ initialOpen: true })
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'))
  })

  it('restores body overflow when closed', async () => {
    renderDrawer({ initialOpen: true })
    await fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('')
    })
  })

  it('does not set body overflow when initially closed', () => {
    renderDrawer({ initialOpen: false })
    expect(document.body.style.overflow).toBe('')
  })
})

// ── Focus trap ────────────────────────────────────────────────────────────────

describe('AGDSDrawer — focus trap', () => {
  it('Tab wraps from last to first focusable element', async () => {
    renderDrawer({ showActions: true })
    const dialog = screen.getByRole('dialog')
    // Wait for the open-focus animation (watch immediate → nextTick → titleEl.focus)
    await nextTick()
    await nextTick()
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'),
    )
    const last = focusable[focusable.length - 1]
    last.focus()
    await fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: false })
    expect(document.activeElement).toBe(focusable[0])
  })

  it('Shift+Tab wraps from first to last focusable element', async () => {
    renderDrawer({ showActions: true })
    const dialog = screen.getByRole('dialog')
    await nextTick()
    await nextTick()
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'),
    )
    focusable[0].focus()
    await fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(focusable[focusable.length - 1])
  })
})

// ── Axe accessibility ─────────────────────────────────────────────────────────

describe('AGDSDrawer — axe', () => {
  it('has no violations when open with body content', async () => {
    renderDrawer()
    await runAxe(document.body, AXE_OPTS)
  })

  it('has no violations when open with actions slot', async () => {
    renderDrawer({ showActions: true })
    await runAxe(document.body, AXE_OPTS)
  })

  it('has no violations when open with lg width', async () => {
    renderDrawer({ width: 'lg' })
    await runAxe(document.body, AXE_OPTS)
  })

  it('has no violations when closed', async () => {
    renderDrawer({ initialOpen: false })
    await runAxe(document.body, AXE_OPTS)
  })

  it('detects a violation when the dialog has no accessible name', async () => {
    render({
      components: { AGDSDrawer },
      template: `<AGDSDrawer :model-value="true" title="">Content</AGDSDrawer>`,
    })
    await expect(runAxe(document.body, AXE_OPTS)).rejects.toThrow()
  })
})
