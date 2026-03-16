import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSCollapsingSideBar from './AGDSCollapsingSideBar.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

function renderSidebar(props: Partial<InstanceType<typeof AgDSCollapsingSideBar>['$props']> & { title: string } = { title: 'Filters' }) {
  return render(AgDSCollapsingSideBar, { props })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AgDSCollapsingSideBar — rendering', () => {
  it('renders a <section> by default', () => {
    const { container } = renderSidebar({ title: 'My Section' })
    expect(container.querySelector('section.agds-csb')).toBeTruthy()
  })

  it('renders an <aside> when as="aside"', () => {
    const { container } = renderSidebar({ title: 'Sidebar', as: 'aside' })
    expect(container.querySelector('aside.agds-csb')).toBeTruthy()
  })

  it('renders a <nav> when as="nav"', () => {
    const { container } = renderSidebar({ title: 'Nav', as: 'nav' })
    expect(container.querySelector('nav.agds-csb')).toBeTruthy()
  })

  it('renders the title in the heading area', () => {
    const { container } = renderSidebar({ title: 'Filter options' })
    const heading = container.querySelector('.agds-csb__heading h2')
    expect(heading?.textContent).toBe('Filter options')
  })

  it('renders the subtitle when provided', () => {
    const { container } = renderSidebar({ title: 'Filters', subTitle: 'Choose at least one' })
    expect(container.querySelector('.agds-csb__subtitle')?.textContent).toBe('Choose at least one')
  })

  it('omits the subtitle element when subTitle is not provided', () => {
    const { container } = renderSidebar({ title: 'Filters' })
    expect(container.querySelector('.agds-csb__subtitle')).toBeNull()
  })

  it('renders the title in the toggle button text', () => {
    const { container } = renderSidebar({ title: 'Filters' })
    expect(container.querySelector('.agds-csb__toggle-title')?.textContent).toBe('Filters')
  })

  it('renders the subtitle in the toggle area when provided', () => {
    const { container } = renderSidebar({ title: 'Filters', subTitle: 'Active: 2' })
    expect(container.querySelector('.agds-csb__toggle-subtitle')?.textContent).toBe('Active: 2')
  })

  it('renders default slot content in the body', () => {
    const { getByText } = render(AgDSCollapsingSideBar, {
      props: { title: 'Filters' },
      slots: { default: '<p>Filter content here</p>' },
    })
    expect(getByText('Filter content here')).toBeTruthy()
  })

  it('renders custom heading via the title slot', () => {
    const { container } = render(AgDSCollapsingSideBar, {
      props: { title: 'Filters', ariaLabel: 'Filters' },
      slots: { title: '<h3 class="custom-heading">Custom Heading</h3>' },
    })
    expect(container.querySelector('.custom-heading')?.textContent).toBe('Custom Heading')
    // default h2 should not be rendered
    expect(container.querySelector('.agds-csb__title')).toBeNull()
  })
})

// ─── Props ────────────────────────────────────────────────────────────────────

describe('AgDSCollapsingSideBar — props', () => {
  it('applies --bg-body class by default', () => {
    const { container } = renderSidebar({ title: 'Filters' })
    expect(container.querySelector('.agds-csb--bg-body')).toBeTruthy()
  })

  it('applies --bg-bodyAlt class when background="bodyAlt"', () => {
    const { container } = renderSidebar({ title: 'Filters', background: 'bodyAlt' })
    expect(container.querySelector('.agds-csb--bg-bodyAlt')).toBeTruthy()
  })

  it('sets aria-label on the root when ariaLabel prop is provided', () => {
    const { container } = renderSidebar({ title: 'Filters', ariaLabel: 'Filters (3 active)' })
    const root = container.querySelector('.agds-csb')
    expect(root?.getAttribute('aria-label')).toBe('Filters (3 active)')
    expect(root?.getAttribute('aria-labelledby')).toBeNull()
  })

  it('sets aria-labelledby on the root (not aria-label) when ariaLabel is omitted', () => {
    const { container } = renderSidebar({ title: 'Filters' })
    const root = container.querySelector('.agds-csb')
    expect(root?.getAttribute('aria-label')).toBeNull()
    expect(root?.getAttribute('aria-labelledby')).toBeTruthy()
  })

  it('aria-labelledby references the heading container id', () => {
    const { container } = renderSidebar({ title: 'Filters' })
    const root = container.querySelector('.agds-csb')
    const headingId = container.querySelector('.agds-csb__heading')?.getAttribute('id')
    expect(root?.getAttribute('aria-labelledby')).toBe(headingId)
  })
})

// ─── Toggle button ────────────────────────────────────────────────────────────

describe('AgDSCollapsingSideBar — toggle button', () => {
  it('toggle button has type="button"', () => {
    const { container } = renderSidebar({ title: 'Filters' })
    expect(container.querySelector('.agds-csb__toggle')?.getAttribute('type')).toBe('button')
  })

  it('toggle button has aria-expanded="false" initially', () => {
    const { container } = renderSidebar({ title: 'Filters' })
    expect(container.querySelector('.agds-csb__toggle')?.getAttribute('aria-expanded')).toBe('false')
  })

  it('toggle button aria-label matches the title', () => {
    const { container } = renderSidebar({ title: 'Filter options' })
    expect(container.querySelector('.agds-csb__toggle')?.getAttribute('aria-label')).toBe('Filter options')
  })

  it('toggle button aria-controls references the body id', () => {
    const { container } = renderSidebar({ title: 'Filters' })
    const controls = container.querySelector('.agds-csb__toggle')?.getAttribute('aria-controls')
    const bodyId = container.querySelector('.agds-csb__body')?.getAttribute('id')
    expect(controls).toBe(bodyId)
    expect(controls).toBeTruthy()
  })

  it('sets aria-expanded="true" after clicking the toggle', async () => {
    const { container } = renderSidebar({ title: 'Filters' })
    const btn = container.querySelector<HTMLButtonElement>('.agds-csb__toggle')!
    await fireEvent.click(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('true')
  })

  it('adds --open class to body after clicking the toggle', async () => {
    const { container } = renderSidebar({ title: 'Filters' })
    await fireEvent.click(container.querySelector<HTMLButtonElement>('.agds-csb__toggle')!)
    expect(container.querySelector('.agds-csb__body--open')).toBeTruthy()
  })

  it('collapses again on second click', async () => {
    const { container } = renderSidebar({ title: 'Filters' })
    const btn = container.querySelector<HTMLButtonElement>('.agds-csb__toggle')!
    await fireEvent.click(btn)
    await fireEvent.click(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('false')
    expect(container.querySelector('.agds-csb__body--open')).toBeNull()
  })

  it('adds --open class to chevron when expanded', async () => {
    const { container } = renderSidebar({ title: 'Filters' })
    await fireEvent.click(container.querySelector<HTMLButtonElement>('.agds-csb__toggle')!)
    expect(container.querySelector('.agds-csb__chevron--open')).toBeTruthy()
  })

  it('chevron is aria-hidden', () => {
    const { container } = renderSidebar({ title: 'Filters' })
    expect(container.querySelector('.agds-csb__chevron')?.getAttribute('aria-hidden')).toBe('true')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSCollapsingSideBar — axe accessibility', () => {
  it('has no violations in collapsed state', async () => {
    const { container } = renderSidebar({ title: 'Filters' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in expanded state', async () => {
    const { container } = renderSidebar({ title: 'Filters' })
    await fireEvent.click(container.querySelector<HTMLButtonElement>('.agds-csb__toggle')!)
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with bodyAlt background', async () => {
    const { container } = renderSidebar({ title: 'Filters', background: 'bodyAlt' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with subtitle', async () => {
    const { container } = renderSidebar({ title: 'Filters', subTitle: 'Choose filters' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with explicit ariaLabel', async () => {
    const { container } = renderSidebar({ title: 'Filters', ariaLabel: 'Filters (2 active)' })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the toggle button has an empty aria-label', async () => {
    // Empty title causes the toggle aria-label to be empty — an axe violation.
    const { container } = renderSidebar({ title: '' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
