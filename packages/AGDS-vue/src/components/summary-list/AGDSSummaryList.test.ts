import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { defineComponent, h } from 'vue'
import { runAxe } from '../../test/a11y'
import AGDSSummaryList from './AGDSSummaryList.vue'
import AGDSSummaryListItem from './AGDSSummaryListItem.vue'
import AGDSSummaryListItemTerm from './AGDSSummaryListItemTerm.vue'
import AGDSSummaryListItemDescription from './AGDSSummaryListItemDescription.vue'
import AGDSSummaryListItemAction from './AGDSSummaryListItemAction.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Renders a complete SummaryList with two rows:
 * - Row 1: term + description + action
 * - Row 2: term + description (no action)
 */
function renderList() {
  const Fixture = defineComponent({
    components: {
      AGDSSummaryList,
      AGDSSummaryListItem,
      AGDSSummaryListItemTerm,
      AGDSSummaryListItemDescription,
      AGDSSummaryListItemAction,
    },
    template: `
      <AGDSSummaryList>
        <AGDSSummaryListItem>
          <AGDSSummaryListItemTerm>Name</AGDSSummaryListItemTerm>
          <AGDSSummaryListItemDescription>Jane Citizen</AGDSSummaryListItemDescription>
          <AGDSSummaryListItemAction><a href="/edit-name">Edit</a></AGDSSummaryListItemAction>
        </AGDSSummaryListItem>
        <AGDSSummaryListItem>
          <AGDSSummaryListItemTerm>Email</AGDSSummaryListItemTerm>
          <AGDSSummaryListItemDescription>jane@example.com</AGDSSummaryListItemDescription>
        </AGDSSummaryListItem>
      </AGDSSummaryList>
    `,
  })
  return render(Fixture)
}

// ─── HTML elements ────────────────────────────────────────────────────────────

describe('AGDSSummaryList — HTML elements', () => {
  it('renders a <dl> root element', () => {
    const { container } = renderList()
    expect(container.querySelector('dl.agds-summary-list')).toBeTruthy()
  })

  it('renders SummaryListItem as <div>', () => {
    const { container } = renderList()
    const items = container.querySelectorAll('div.agds-summary-list-item')
    expect(items).toHaveLength(2)
  })

  it('renders SummaryListItemTerm as <dt>', () => {
    const { container } = renderList()
    const terms = container.querySelectorAll('dt.agds-summary-list-item__term')
    expect(terms).toHaveLength(2)
  })

  it('renders SummaryListItemDescription as <dd>', () => {
    const { container } = renderList()
    const descs = container.querySelectorAll('dd.agds-summary-list-item__description')
    expect(descs).toHaveLength(2)
  })

  it('renders SummaryListItemAction as <dd>', () => {
    const { container } = renderList()
    const action = container.querySelector('dd.agds-summary-list-item__action')
    expect(action).toBeTruthy()
  })
})

// ─── Slot content ─────────────────────────────────────────────────────────────

describe('AGDSSummaryList — slot content', () => {
  it('renders term text', () => {
    const { getAllByText } = renderList()
    expect(getAllByText('Name').length).toBeGreaterThan(0)
    expect(getAllByText('Email').length).toBeGreaterThan(0)
  })

  it('renders description text', () => {
    const { getByText } = renderList()
    expect(getByText('Jane Citizen')).toBeTruthy()
    expect(getByText('jane@example.com')).toBeTruthy()
  })

  it('renders action link', () => {
    const { container } = renderList()
    const link = container.querySelector('.agds-summary-list-item__action a')
    expect(link).toBeTruthy()
    expect(link!.getAttribute('href')).toBe('/edit-name')
    expect(link!.textContent).toBe('Edit')
  })
})

// ─── Individual component rendering ──────────────────────────────────────────

describe('AGDSSummaryList — individual components', () => {
  it('SummaryList renders a <dl>', () => {
    const { container } = render(AGDSSummaryList, {
      slots: { default: '<div>content</div>' },
    })
    expect(container.querySelector('dl')).toBeTruthy()
  })

  it('SummaryListItem renders a <div>', () => {
    const { container } = render(AGDSSummaryListItem, {
      slots: { default: '<dt>term</dt><dd>desc</dd>' },
    })
    expect(container.querySelector('div.agds-summary-list-item')).toBeTruthy()
  })

  it('SummaryListItemTerm renders a <dt>', () => {
    const { container } = render(AGDSSummaryListItemTerm, {
      slots: { default: 'Status' },
    })
    expect(container.querySelector('dt')).toBeTruthy()
    expect(container.querySelector('dt')!.textContent).toBe('Status')
  })

  it('SummaryListItemDescription renders a <dd>', () => {
    const { container } = render(AGDSSummaryListItemDescription, {
      slots: { default: 'Active' },
    })
    expect(container.querySelector('dd')).toBeTruthy()
    expect(container.querySelector('dd')!.textContent).toBe('Active')
  })

  it('SummaryListItemAction renders a <dd>', () => {
    const { container } = render(AGDSSummaryListItemAction, {
      slots: { default: '<a href="/edit">Edit</a>' },
    })
    expect(container.querySelector('dd')).toBeTruthy()
    expect(container.querySelector('dd a')!.getAttribute('href')).toBe('/edit')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSSummaryList — axe accessibility', () => {
  it('has no violations for a complete list', async () => {
    const { container } = renderList()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for a list without action items', async () => {
    const Fixture = defineComponent({
      components: {
        AGDSSummaryList,
        AGDSSummaryListItem,
        AGDSSummaryListItemTerm,
        AGDSSummaryListItemDescription,
      },
      template: `
        <AGDSSummaryList>
          <AGDSSummaryListItem>
            <AGDSSummaryListItemTerm>Name</AGDSSummaryListItemTerm>
            <AGDSSummaryListItemDescription>Jane Citizen</AGDSSummaryListItemDescription>
          </AGDSSummaryListItem>
        </AGDSSummaryList>
      `,
    })
    const { container } = render(Fixture)
    await runAxe(container, AXE_OPTS)
  })

  it('intentionally fails: image without alt text', async () => {
    const { container } = renderList()
    const img = document.createElement('img')
    img.setAttribute('src', 'photo.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('toHaveNoViolations')
  })
})
