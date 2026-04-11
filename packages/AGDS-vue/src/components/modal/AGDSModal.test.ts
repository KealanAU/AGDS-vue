import { describe, it, expect, afterEach } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/vue'
import { ref, nextTick } from 'vue'
import { runAxe } from '../../test/a11y'
import AGDSModal from './AGDSModal.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Renders a stateful modal wrapper so v-model updates are reflected in the DOM.
 * `open` starts true unless `initialOpen: false` is passed.
 */
function renderModal(options: {
  initialOpen?: boolean
  title?: string
  showActions?: boolean
  bodySlot?: string
} = {}) {
  const {
    initialOpen = true,
    title = 'Test modal',
    showActions = false,
    bodySlot = '<p>Modal body content</p>',
  } = options

  return render({
    components: { AGDSModal },
    template: `
      <AGDSModal v-model="open" :title="title">
        ${bodySlot}
        ${showActions ? '<template #actions><button>Save</button></template>' : ''}
      </AGDSModal>
    `,
    setup: () => {
      const open = ref(initialOpen)
      return { open, title }
    },
  })
}

afterEach(() => {
  // Clean up scroll lock side-effect between tests.
  document.body.style.overflow = ''
})

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSModal — rendering', () => {
  it('renders the dialog when modelValue is true', () => {
    renderModal()
    expect(screen.getByRole('dialog')).toBeTruthy()
  })

  it('does not render the dialog when modelValue is false', () => {
    renderModal({ initialOpen: false })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders the title', () => {
    renderModal({ title: 'My important modal' })
    expect(screen.getByText('My important modal')).toBeTruthy()
  })

  it('renders body slot content', () => {
    renderModal({ bodySlot: '<p>Slot content here</p>' })
    expect(screen.getByText('Slot content here')).toBeTruthy()
  })

  it('renders actions slot when provided', () => {
    renderModal({ showActions: true })
    expect(screen.getByText('Save')).toBeTruthy()
  })

  it('renders the close button', () => {
    renderModal()
    expect(screen.getByRole('button', { name: 'Close modal' })).toBeTruthy()
  })
})

// ─── Semantics ────────────────────────────────────────────────────────────────

describe('AGDSModal — semantics', () => {
  it('dialog has role="dialog"', () => {
    renderModal()
    const dialog = screen.getByRole('dialog')
    expect(dialog.getAttribute('role')).toBe('dialog')
  })

  it('dialog is labelled by the title element', () => {
    renderModal({ title: 'Accessible title' })
    const dialog = screen.getByRole('dialog')
    const labelId = dialog.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()
    const titleEl = document.getElementById(labelId!)
    expect(titleEl?.textContent?.trim()).toBe('Accessible title')
  })

  it('title is rendered as an h2', () => {
    renderModal()
    const dialog = screen.getByRole('dialog')
    expect(dialog.querySelector('h2')).toBeTruthy()
  })

  it('title has tabindex="-1" for programmatic focus', () => {
    renderModal()
    const dialog = screen.getByRole('dialog')
    const title = dialog.querySelector('h2')
    expect(title?.getAttribute('tabindex')).toBe('-1')
  })
})

// ─── Open / close behaviour ───────────────────────────────────────────────────

describe('AGDSModal — open/close behaviour', () => {
  it('close button closes the modal', async () => {
    renderModal()
    const closeBtn = screen.getByRole('button', { name: 'Close modal' })
    await fireEvent.click(closeBtn)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('Escape key closes the modal', async () => {
    renderModal()
    expect(screen.getByRole('dialog')).toBeTruthy()
    await fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' })
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('sets body overflow to hidden when open', () => {
    renderModal({ initialOpen: true })
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body overflow when closed', async () => {
    renderModal({ initialOpen: true })
    const closeBtn = screen.getByRole('button', { name: 'Close modal' })
    await fireEvent.click(closeBtn)
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('')
    })
  })

  it('does not set body overflow when initially closed', () => {
    renderModal({ initialOpen: false })
    expect(document.body.style.overflow).toBe('')
  })

  it('returns focus to the trigger element after close button click', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    const open = ref(false)
    render({
      components: { AGDSModal },
      template: `<AGDSModal v-model="open" title="Focus return test">Content</AGDSModal>`,
      setup: () => ({ open }),
    })

    // Simulate trigger being focused before opening the modal.
    trigger.focus()
    expect(document.activeElement).toBe(trigger)

    open.value = true
    await nextTick()
    expect(screen.getByRole('dialog')).toBeTruthy()

    await fireEvent.click(screen.getByRole('button', { name: 'Close modal' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
      expect(document.activeElement).toBe(trigger)
    })

    document.body.removeChild(trigger)
  })

  it('returns focus to the trigger element after Escape key', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    const open = ref(false)
    render({
      components: { AGDSModal },
      template: `<AGDSModal v-model="open" title="Focus return test">Content</AGDSModal>`,
      setup: () => ({ open }),
    })

    trigger.focus()
    expect(document.activeElement).toBe(trigger)

    open.value = true
    await nextTick()
    expect(screen.getByRole('dialog')).toBeTruthy()

    await fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' })
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
      expect(document.activeElement).toBe(trigger)
    })

    document.body.removeChild(trigger)
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSModal — axe accessibility', () => {
  it('has no violations when open with body content', async () => {
    renderModal()
    await runAxe(document.body, AXE_OPTS)
  })

  it('has no violations when open with actions slot', async () => {
    renderModal({ showActions: true })
    await runAxe(document.body, AXE_OPTS)
  })

  it('has no violations when closed (no dialog in DOM)', async () => {
    renderModal({ initialOpen: false })
    await runAxe(document.body, AXE_OPTS)
  })

  it('detects a violation when the dialog has no accessible name', async () => {
    // Verify the helper catches real axe failures — render with an empty title
    // so the dialog element has no accessible name (WCAG 4.1.2).
    render({
      components: { AGDSModal },
      template: `<AGDSModal :model-value="true" title="">Content</AGDSModal>`,
    })
    await expect(runAxe(document.body, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
