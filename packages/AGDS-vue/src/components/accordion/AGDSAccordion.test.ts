import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSAccordion from './AGDSAccordion.vue'
import AgDSAccordionItem from './AGDSAccordionItem.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderAccordion(
  accordionProps: Record<string, unknown> = {},
  itemProps: Record<string, unknown> = {},
  slot = 'Panel content',
) {
  return render({
    components: { AgDSAccordion, AgDSAccordionItem },
    template: `
      <AgDSAccordion v-bind="accordionProps">
        <AgDSAccordionItem value="item-1" title="Item one" v-bind="itemProps">
          ${slot}
        </AgDSAccordionItem>
        <AgDSAccordionItem value="item-2" title="Item two">
          Second panel
        </AgDSAccordionItem>
      </AgDSAccordion>
    `,
    setup: () => ({ accordionProps, itemProps }),
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSAccordion — rendering', () => {
  it('renders a top-level container with the accordion class', () => {
    const { container } = renderAccordion()
    expect(container.querySelector('.agds-accordion')).toBeTruthy()
  })

  it('renders both accordion items', () => {
    const { getByText } = renderAccordion()
    expect(getByText('Item one')).toBeTruthy()
    expect(getByText('Item two')).toBeTruthy()
  })

  it('renders panel content in slot when item starts open', () => {
    // Reka renders panel children eagerly when the item is open from mount.
    // Use defaultValue so no animation frame is needed before content appears.
    const { getByText } = renderAccordion({ defaultValue: ['item-1'] }, {}, 'Custom slot content')
    expect(getByText('Custom slot content')).toBeTruthy()
  })
})

// ─── Trigger ─────────────────────────────────────────────────────────────────

describe('AgDSAccordion — trigger', () => {
  it('renders trigger buttons for each item', () => {
    const { getAllByRole } = renderAccordion()
    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('trigger has aria-expanded="false" when closed', () => {
    const { getAllByRole } = renderAccordion()
    const [trigger] = getAllByRole('button')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('trigger has aria-expanded="true" after clicking', async () => {
    const { getAllByRole } = renderAccordion()
    const [trigger] = getAllByRole('button')
    await fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })

  it('trigger has aria-controls attribute present', () => {
    // Reka sets aria-controls to the panel id. The attribute exists even if
    // jsdom resolves the generated id asynchronously; we assert presence only
    // since verifying the exact id would test Reka internals rather than our component.
    const { getAllByRole } = renderAccordion()
    const [trigger] = getAllByRole('button')
    expect(trigger.hasAttribute('aria-controls')).toBe(true)
  })
})

// ─── Open / close ─────────────────────────────────────────────────────────────

describe('AgDSAccordion — open/close behaviour', () => {
  it('panel has data-state="open" after trigger click', async () => {
    // Reka removes the hidden attribute and sets data-state="open" on the panel
    // when expanded. Testing data-state is more reliable than finding visible
    // text in jsdom which has no layout engine to drive CSS animations.
    const { container, getAllByRole } = renderAccordion()
    await fireEvent.click(getAllByRole('button')[0])
    const openPanel = container.querySelector('.agds-accordion-item__panel[data-state="open"]')
    expect(openPanel).toBeTruthy()
  })

  it('type=multiple allows two items open simultaneously', async () => {
    const { getAllByRole } = renderAccordion({ type: 'multiple' })
    const [first, second] = getAllByRole('button')
    await fireEvent.click(first)
    await fireEvent.click(second)
    expect(first.getAttribute('aria-expanded')).toBe('true')
    expect(second.getAttribute('aria-expanded')).toBe('true')
  })

  it('type=single closes the first item when a second is opened', async () => {
    const { getAllByRole } = renderAccordion({ type: 'single', collapsible: true })
    const [first, second] = getAllByRole('button')
    await fireEvent.click(first)
    await fireEvent.click(second)
    expect(first.getAttribute('aria-expanded')).toBe('false')
    expect(second.getAttribute('aria-expanded')).toBe('true')
  })

  it('defaultValue opens the matching item on mount', () => {
    // type='multiple' uses an array for defaultValue
    const { getAllByRole } = renderAccordion({ defaultValue: ['item-1'] })
    expect(getAllByRole('button')[0].getAttribute('aria-expanded')).toBe('true')
  })
})

// ─── Props: heading level ──────────────────────────────────────────────────────

describe('AgDSAccordionItem — headingLevel prop', () => {
  it('defaults to h3', () => {
    const { container } = renderAccordion()
    expect(container.querySelector('h3')).toBeTruthy()
  })

  it('renders the specified heading level', () => {
    const { container } = renderAccordion({}, { headingLevel: 2 })
    expect(container.querySelector('h2')).toBeTruthy()
  })
})

// ─── Props: disabled ──────────────────────────────────────────────────────────

describe('AgDSAccordionItem — disabled prop', () => {
  it('sets data-disabled on the trigger when disabled=true', () => {
    const { getAllByRole } = renderAccordion({}, { disabled: true })
    const [trigger] = getAllByRole('button')
    expect(trigger.hasAttribute('data-disabled')).toBe(true)
  })

  it('does not open when clicked while disabled', async () => {
    const { getAllByRole } = renderAccordion({}, { disabled: true })
    const [trigger] = getAllByRole('button')
    await fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })
})

// ─── Props: indent ────────────────────────────────────────────────────────────

describe('AgDSAccordion — indent prop', () => {
  it('applies indented class to trigger when indent=true', () => {
    const { container } = renderAccordion({ indent: true })
    expect(
      container.querySelector('.agds-accordion-item__trigger--indented'),
    ).toBeTruthy()
  })

  it('does not apply indented class when indent=false (default)', () => {
    const { container } = renderAccordion()
    expect(
      container.querySelector('.agds-accordion-item__trigger--indented'),
    ).toBeNull()
  })
})

// ─── Props: background ────────────────────────────────────────────────────────

describe('AgDSAccordionItem — background prop', () => {
  it('applies body background class by default', () => {
    const { container } = renderAccordion()
    expect(
      container.querySelector('.agds-accordion-item__trigger--bg-body'),
    ).toBeTruthy()
  })

  it('applies bodyAlt background class when set on accordion', () => {
    const { container } = renderAccordion({ background: 'bodyAlt' })
    expect(
      container.querySelector('.agds-accordion-item__trigger--bg-bodyAlt'),
    ).toBeTruthy()
  })

  it('item-level background overrides accordion-level background', () => {
    const { container } = renderAccordion({ background: 'body' }, { background: 'bodyAlt' })
    // First item (with override) should have bodyAlt
    const triggers = container.querySelectorAll('.agds-accordion-item__trigger')
    expect(triggers[0].classList.contains('agds-accordion-item__trigger--bg-bodyAlt')).toBe(true)
    // Second item (no override) should inherit body from accordion
    expect(triggers[1].classList.contains('agds-accordion-item__trigger--bg-body')).toBe(true)
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSAccordion — axe accessibility', () => {
  it('has no violations in default (multiple, closed) state', async () => {
    const { container } = renderAccordion()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when an item is open', async () => {
    const { container, getAllByRole } = renderAccordion()
    await fireEvent.click(getAllByRole('button')[0])
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when type=single', async () => {
    const { container } = renderAccordion({ type: 'single' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when indent=true', async () => {
    const { container } = renderAccordion({ indent: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when an item is disabled', async () => {
    const { container } = renderAccordion({}, { disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when background=bodyAlt', async () => {
    const { container } = renderAccordion({ background: 'bodyAlt' })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when the trigger has no accessible name', async () => {
    // Verify the helper catches real axe failures — title prop omitted so the
    // button has no accessible name (WCAG 4.1.2).
    const { container } = render({
      components: { AgDSAccordion, AgDSAccordionItem },
      template: `
        <AgDSAccordion>
          <AgDSAccordionItem value="bad" title="">Content</AgDSAccordionItem>
        </AgDSAccordion>
      `,
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
