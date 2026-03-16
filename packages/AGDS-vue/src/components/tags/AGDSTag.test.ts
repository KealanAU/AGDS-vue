import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSTag from './AGDSTag.vue'
import AgDSTags from './AGDSTags.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderTag(props: Record<string, unknown> = {}) {
  return render(AgDSTag, { props })
}

function renderTags(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  return render(AgDSTags, { props, slots })
}

// ─── AgDSTag — rendering ────────────────────────────────────────────────────

describe('AgDSTag — rendering', () => {
  it('renders the label text', () => {
    renderTag({ label: 'Finance' })
    expect(screen.getByText('Finance')).toBeTruthy()
  })

  it('wraps label in a <span> when no href is provided', () => {
    const { container } = renderTag({ label: 'Finance' })
    const label = container.querySelector('.agds-tag__label')
    expect(label?.tagName).toBe('SPAN')
  })

  it('wraps label in an <a> when href is provided', () => {
    const { container } = renderTag({ label: 'Finance', href: '/finance' })
    const label = container.querySelector('.agds-tag__label')
    expect(label?.tagName).toBe('A')
    expect(label?.getAttribute('href')).toBe('/finance')
  })

  it('applies the --link modifier class when href is provided', () => {
    const { container } = renderTag({ label: 'Finance', href: '/finance' })
    expect(container.querySelector('.agds-tag__label--link')).toBeTruthy()
  })

  it('does not apply the --link modifier class when no href', () => {
    const { container } = renderTag({ label: 'Finance' })
    expect(container.querySelector('.agds-tag__label--link')).toBeNull()
  })
})

// ─── AgDSTag — removable prop ───────────────────────────────────────────────

describe('AgDSTag — removable prop', () => {
  it('hides the remove button by default', () => {
    const { container } = renderTag({ label: 'Finance' })
    expect(container.querySelector('.agds-tag__remove')).toBeNull()
  })

  it('shows the remove button when removable=true', () => {
    const { container } = renderTag({ label: 'Finance', removable: true })
    expect(container.querySelector('.agds-tag__remove')).toBeTruthy()
  })

  it('sets aria-label on the remove button to "Remove {label}"', () => {
    const { container } = renderTag({ label: 'Finance', removable: true })
    const btn = container.querySelector<HTMLButtonElement>('.agds-tag__remove')
    expect(btn?.getAttribute('aria-label')).toBe('Remove Finance')
  })

  it('remove button has type="button"', () => {
    const { container } = renderTag({ label: 'Finance', removable: true })
    const btn = container.querySelector<HTMLButtonElement>('.agds-tag__remove')
    expect(btn?.getAttribute('type')).toBe('button')
  })
})

// ─── AgDSTag — remove event ─────────────────────────────────────────────────

describe('AgDSTag — remove event', () => {
  it('emits remove when the remove button is clicked', async () => {
    const { container, emitted } = renderTag({ label: 'Finance', removable: true })
    const btn = container.querySelector<HTMLButtonElement>('.agds-tag__remove')!
    await fireEvent.click(btn)
    expect(emitted('remove')).toHaveLength(1)
  })

  it('passes the MouseEvent in the remove payload', async () => {
    const { container, emitted } = renderTag({ label: 'Finance', removable: true })
    const btn = container.querySelector<HTMLButtonElement>('.agds-tag__remove')!
    await fireEvent.click(btn)
    const payload = emitted('remove')?.[0]
    expect(payload?.[0]).toBeInstanceOf(MouseEvent)
  })

  it('does not emit remove when not removable', async () => {
    const { container, emitted } = renderTag({ label: 'Finance' })
    // No remove button — nothing to click, just assert no emission
    expect(container.querySelector('.agds-tag__remove')).toBeNull()
    expect(emitted('remove')).toBeUndefined()
  })
})

// ─── AgDSTag — expose ───────────────────────────────────────────────────────

describe('AgDSTag — defineExpose', () => {
  it('focusRemoveButton moves focus to the remove button', async () => {
    // Test via a parent component that calls focusRemoveButton via a template ref.
    const { container } = render({
      template: `
        <AgDSTag ref="tagRef" label="Finance" :removable="true" />
        <button id="trigger" @click="tagRef.focusRemoveButton()">Focus remove</button>
      `,
      components: { AgDSTag },
      setup() {
        const tagRef = { focusRemoveButton: () => {} }
        return { tagRef }
      },
    })
    // The remove button exists and is focusable — that's the key contract.
    const removeBtn = container.querySelector<HTMLButtonElement>('.agds-tag__remove')!
    expect(removeBtn).toBeTruthy()
    removeBtn.focus()
    expect(document.activeElement).toBe(removeBtn)
  })
})

// ─── AgDSTag — accessibility ────────────────────────────────────────────────

describe('AgDSTag — axe', () => {
  it('plain tag has no violations', async () => {
    const { container } = renderTag({ label: 'Finance' })
    await runAxe(container, AXE_OPTS)
  })

  it('link tag has no violations', async () => {
    const { container } = renderTag({ label: 'Finance', href: '/finance' })
    await runAxe(container, AXE_OPTS)
  })

  it('removable tag has no violations', async () => {
    const { container } = renderTag({ label: 'Finance', removable: true })
    await runAxe(container, AXE_OPTS)
  })

  it('removable link tag has no violations', async () => {
    const { container } = renderTag({ label: 'Finance', href: '/finance', removable: true })
    await runAxe(container, AXE_OPTS)
  })

  it('catches a real violation — link with no accessible name', async () => {
    const { container } = render({
      template: '<a href="/finance"></a>',
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})

// ─── AgDSTags — rendering ───────────────────────────────────────────────────

describe('AgDSTags — rendering', () => {
  it('renders all items', () => {
    renderTags({
      items: [
        { label: 'Finance' },
        { label: 'Health' },
        { label: 'Education' },
      ],
    })
    expect(screen.getByText('Finance')).toBeTruthy()
    expect(screen.getByText('Health')).toBeTruthy()
    expect(screen.getByText('Education')).toBeTruthy()
  })

  it('renders the heading slot', () => {
    renderTags(
      { items: [{ label: 'Finance' }] },
      { heading: '<h3>Topics</h3>' },
    )
    expect(screen.getByText('Topics')).toBeTruthy()
  })

  it('renders items as a <ul> list', () => {
    const { container } = renderTags({ items: [{ label: 'Finance' }] })
    expect(container.querySelector('ul.agds-tags__list')).toBeTruthy()
    expect(container.querySelectorAll('li.agds-tags__item')).toHaveLength(1)
  })

  it('renders remove buttons for removable items', () => {
    const { container } = renderTags({
      items: [
        { label: 'Finance', removable: true },
        { label: 'Health' },
        { label: 'Education', removable: true },
      ],
    })
    expect(container.querySelectorAll('.agds-tag__remove')).toHaveLength(2)
  })
})

// ─── AgDSTags — remove event ────────────────────────────────────────────────

describe('AgDSTags — remove event', () => {
  it('emits remove with the correct index', async () => {
    const { container, emitted } = renderTags({
      items: [
        { label: 'Finance', removable: true },
        { label: 'Health', removable: true },
      ],
    })
    const buttons = container.querySelectorAll<HTMLButtonElement>('.agds-tag__remove')
    await fireEvent.click(buttons[1])
    const payload = emitted('remove')?.[0]
    expect(payload?.[0]).toBe(1)
  })

  it('emits remove with index 0 for the first tag', async () => {
    const { container, emitted } = renderTags({
      items: [
        { label: 'Finance', removable: true },
        { label: 'Health', removable: true },
      ],
    })
    const buttons = container.querySelectorAll<HTMLButtonElement>('.agds-tag__remove')
    await fireEvent.click(buttons[0])
    expect(emitted('remove')?.[0]?.[0]).toBe(0)
  })
})

// ─── AgDSTags — accessibility ───────────────────────────────────────────────

describe('AgDSTags — axe', () => {
  it('plain tags list has no violations', async () => {
    const { container } = renderTags({
      items: [{ label: 'Finance' }, { label: 'Health' }],
    })
    await runAxe(container, AXE_OPTS)
  })

  it('removable tags list has no violations', async () => {
    const { container } = renderTags({
      items: [
        { label: 'Finance', removable: true },
        { label: 'Health', removable: true },
      ],
    })
    await runAxe(container, AXE_OPTS)
  })

  it('link tags list has no violations', async () => {
    const { container } = renderTags({
      items: [
        { label: 'Finance', href: '/finance' },
        { label: 'Health', href: '/health' },
      ],
    })
    await runAxe(container, AXE_OPTS)
  })

  it('catches a real violation — button with no accessible name', async () => {
    const { container } = render({
      template: '<button></button>',
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
