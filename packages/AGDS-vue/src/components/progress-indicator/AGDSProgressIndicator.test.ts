import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSProgressIndicator from './AGDSProgressIndicator.vue'
import type { ProgressIndicatorItem } from './AGDSProgressIndicator.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

const BASIC_ITEMS: ProgressIndicatorItem[] = [
  { label: 'Introduction',         status: 'done'    },
  { label: 'Personal information', status: 'started', href: '/personal' },
  { label: 'Review',               status: 'todo',    href: '/review'   },
]

const LINK_ITEMS: ProgressIndicatorItem[] = [
  { label: 'Step one',   status: 'done',    href: '/step-1' },
  { label: 'Step two',   status: 'started', href: '/step-2' },
  { label: 'Step three', status: 'todo',    href: '/step-3' },
]

function renderPI(props: Record<string, unknown> = {}) {
  return render(AgDSProgressIndicator, {
    props: { items: BASIC_ITEMS, ...props },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSProgressIndicator — rendering', () => {
  it('renders a <nav> landmark with aria-label="Progress"', () => {
    renderPI()
    const nav = screen.getByRole('navigation', { name: 'Progress' })
    expect(nav).toBeTruthy()
  })

  it('renders all item labels', () => {
    renderPI()
    expect(screen.getByText('Introduction')).toBeTruthy()
    expect(screen.getByText('Personal information')).toBeTruthy()
    expect(screen.getByText('Review')).toBeTruthy()
  })

  it('renders status text for each item', () => {
    renderPI()
    expect(screen.getByText('Completed')).toBeTruthy()
    expect(screen.getAllByText('In progress').length).toBeGreaterThan(0)
    expect(screen.getByText('Not started')).toBeTruthy()
  })

  it('renders the default subtitle showing completion count', () => {
    renderPI({ items: LINK_ITEMS })
    expect(screen.getByText('1 of 3 steps completed')).toBeTruthy()
  })

  it('hides the subtitle when hideSubtitle=true', () => {
    renderPI({ hideSubtitle: true })
    expect(screen.queryByText(/steps completed/)).toBeNull()
  })

  it('renders a mobile toggle button with aria-expanded', () => {
    const { container } = renderPI()
    const btn = container.querySelector<HTMLButtonElement>('.agds-pi__toggle')
    expect(btn?.getAttribute('aria-expanded')).toBe('true')
  })

  it('applies the correct background class', () => {
    const { container } = renderPI({ background: 'bodyAlt' })
    expect(container.querySelector('.agds-pi--bg-bodyAlt')).toBeTruthy()
  })
})

// ─── Item rendering ───────────────────────────────────────────────────────────

describe('AgDSProgressIndicator — item rendering', () => {
  it('renders a link item as <a>', () => {
    const { container } = renderPI()
    const links = container.querySelectorAll('a')
    // 'Personal information' and 'Review' have hrefs
    expect(links.length).toBeGreaterThanOrEqual(2)
  })

  it('renders a non-href item as <button>', () => {
    const { container } = renderPI()
    // 'Introduction' has no href → button
    const buttons = container.querySelectorAll('.agds-pi__content[type="button"]')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders correct href on link items', () => {
    const { container } = renderPI()
    const link = container.querySelector<HTMLAnchorElement>('a.agds-pi__content')
    expect(link?.href).toContain('/personal')
  })

  it('applies --first class to the first item', () => {
    const { container } = renderPI()
    const items = container.querySelectorAll('.agds-pi__item')
    expect(items[0].classList.contains('agds-pi__item--first')).toBe(true)
    expect(items[1].classList.contains('agds-pi__item--first')).toBe(false)
  })

  it('applies --last class to the last item', () => {
    const { container } = renderPI()
    const items = container.querySelectorAll('.agds-pi__item')
    const last = items[items.length - 1]
    expect(last.classList.contains('agds-pi__item--last')).toBe(true)
  })
})

// ─── activePath ───────────────────────────────────────────────────────────────

describe('AgDSProgressIndicator — activePath', () => {
  it('marks the matching link item as active via aria-current="step"', () => {
    const { container } = renderPI({ activePath: '/personal' })
    const activeContent = container.querySelector('[aria-current="step"]')
    expect(activeContent).toBeTruthy()
  })

  it('adds --active class to the active item', () => {
    const { container } = renderPI({ activePath: '/personal' })
    const activeItem = container.querySelector('.agds-pi__item--active')
    expect(activeItem).toBeTruthy()
  })

  it('makes the active label bold', () => {
    const { container } = renderPI({ activePath: '/personal' })
    const boldLabel = container.querySelector('.agds-pi__label--bold')
    expect(boldLabel).toBeTruthy()
    expect(boldLabel?.textContent).toBe('Personal information')
  })

  it('matches by label when no href is present', () => {
    const buttonItems: ProgressIndicatorItem[] = [
      { label: 'Step A', status: 'done'    },
      { label: 'Step B', status: 'started' },
    ]
    const { container } = render(AgDSProgressIndicator, {
      props: { items: buttonItems, activePath: 'Step B' },
    })
    const activeItem = container.querySelector('.agds-pi__item--active')
    expect(activeItem?.textContent).toContain('Step B')
  })

  it('activates an item whose href is a prefix of activePath', () => {
    const { container } = renderPI({ activePath: '/personal/details' })
    const activeItem = container.querySelector('.agds-pi__item--active')
    expect(activeItem?.textContent).toContain('Personal information')
  })
})

// ─── Level-2 sub-items ────────────────────────────────────────────────────────

describe('AgDSProgressIndicator — level-2 sub-items', () => {
  const itemsWithSub: ProgressIndicatorItem[] = [
    {
      label: 'Personal info',
      status: 'started',
      href: '/personal',
      items: [
        { label: 'Contact details', href: '/personal/contact'  },
        { label: 'Address',         href: '/personal/address'  },
      ],
    },
    { label: 'Review', status: 'todo', href: '/review' },
  ]

  it('shows the active sub-item when activePath matches a level-2 href', () => {
    render(AgDSProgressIndicator, {
      props: { items: itemsWithSub, activePath: '/personal/contact' },
    })
    expect(screen.getByText('Contact details')).toBeTruthy()
  })

  it('does not show non-active sub-items', () => {
    render(AgDSProgressIndicator, {
      props: { items: itemsWithSub, activePath: '/personal/contact' },
    })
    expect(screen.queryByText('Address')).toBeNull()
  })

  it('renders the sub-item as a link with aria-current="step"', () => {
    const { container } = render(AgDSProgressIndicator, {
      props: { items: itemsWithSub, activePath: '/personal/contact' },
    })
    const subLink = container.querySelector('.agds-pi__sub-link')
    expect(subLink?.getAttribute('aria-current')).toBe('step')
    expect((subLink as HTMLAnchorElement)?.href).toContain('/personal/contact')
  })
})

// ─── Mobile toggle ────────────────────────────────────────────────────────────

describe('AgDSProgressIndicator — mobile toggle', () => {
  it('collapses the list when the toggle is clicked', async () => {
    const { container } = renderPI()
    const toggle = container.querySelector<HTMLButtonElement>('.agds-pi__toggle')!

    await fireEvent.click(toggle)

    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(container.querySelector('.agds-pi--expanded')).toBeNull()
  })

  it('re-expands when the toggle is clicked again', async () => {
    const { container } = renderPI()
    const toggle = container.querySelector<HTMLButtonElement>('.agds-pi__toggle')!

    await fireEvent.click(toggle)
    await fireEvent.click(toggle)

    expect(toggle.getAttribute('aria-expanded')).toBe('true')
  })
})

// ─── Button item onClick ──────────────────────────────────────────────────────

describe('AgDSProgressIndicator — button item onClick', () => {
  it('calls onClick when a button item is clicked', async () => {
    const handler = vi.fn()
    const items: ProgressIndicatorItem[] = [
      { label: 'Step A', status: 'started', onClick: handler },
    ]
    render(AgDSProgressIndicator, { props: { items } })

    const btn = screen.getByRole('button', { name: /Step A/i })
    await fireEvent.click(btn)
    expect(handler).toHaveBeenCalledOnce()
  })
})

// ─── Status labels ────────────────────────────────────────────────────────────

describe('AgDSProgressIndicator — all statuses render', () => {
  const allStatuses: ProgressIndicatorItem['status'][] = [
    'blocked', 'doing', 'started', 'todo', 'done', 'saved', 'error',
  ]

  it.each(allStatuses)('renders status "%s" without errors', (status) => {
    const items: ProgressIndicatorItem[] = [{ label: 'Step', status }]
    expect(() => {
      render(AgDSProgressIndicator, { props: { items } })
    }).not.toThrow()
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('AgDSProgressIndicator — axe', () => {
  it('passes axe on basic items', async () => {
    const { container } = renderPI()
    await runAxe(container, AXE_OPTS)
  })

  it('passes axe with activePath set', async () => {
    const { container } = renderPI({ activePath: '/personal' })
    await runAxe(container, AXE_OPTS)
  })

  it('passes axe with bodyAlt background', async () => {
    const { container } = renderPI({ background: 'bodyAlt' })
    await runAxe(container, AXE_OPTS)
  })

  it('passes axe with all status variants', async () => {
    const items: ProgressIndicatorItem[] = [
      { label: 'Blocked',  status: 'blocked' },
      { label: 'Doing',    status: 'doing'   },
      { label: 'Started',  status: 'started' },
      { label: 'Todo',     status: 'todo'    },
      { label: 'Done',     status: 'done'    },
      { label: 'Saved',    status: 'saved'   },
      { label: 'Error',    status: 'error'   },
    ]
    const { container } = render(AgDSProgressIndicator, { props: { items } })
    await runAxe(container, AXE_OPTS)
  })

  it('intentionally fails axe when a link has no accessible name', async () => {
    // Verify the axe helper actually catches real violations
    const { container } = render({
      template: '<a href="/somewhere"></a>',
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
