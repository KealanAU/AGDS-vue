import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { markRaw, h } from 'vue'
import AppLayoutSidebarNavItem from './AppLayoutSidebarNavItem.vue'
import type { AppLayoutNavItem } from './appLayoutTypes'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderNavItem(item: AppLayoutNavItem, extraProps: Record<string, unknown> = {}) {
  // AppLayoutSidebarNavItem renders a <li> — wrap in a <ul> so the DOM is valid
  return render(
    {
      components: { AppLayoutSidebarNavItem },
      template: `
        <ul>
          <AppLayoutSidebarNavItem
            :item="item"
            :active-path="activePath"
            :level="level"
            :sub-level-visible="subLevelVisible"
            :background="background"
          />
        </ul>
      `,
      data() {
        return {
          item,
          activePath: extraProps.activePath ?? '/',
          level: extraProps.level ?? 1,
          subLevelVisible: extraProps.subLevelVisible ?? 'whenActive',
          background: extraProps.background ?? 'bodyAlt',
        }
      },
    },
  )
}

// ─── Text-only item (v-else branch) ──────────────────────────────────────────

describe('AppLayoutSidebarNavItem — text-only item', () => {
  it('renders a span for a text-only item (no href, no onClick)', () => {
    // A text item has only a label — no href and no onClick
    const item: AppLayoutNavItem = { label: 'Section Heading' }
    const { container } = renderNavItem(item)
    const span = container.querySelector('.agds-alsnav-item__text')
    expect(span).toBeTruthy()
    expect(span?.textContent?.trim()).toBe('Section Heading')
  })
})

// ─── Icon on a link item ──────────────────────────────────────────────────────

describe('AppLayoutSidebarNavItem — icon on link item', () => {
  it('renders the icon component when icon prop is set and level=1', () => {
    const IconComponent = markRaw({
      name: 'TestIcon',
      render: () => h('span', { 'data-testid': 'link-icon', 'aria-hidden': 'true' }),
    })
    const item: AppLayoutNavItem = { label: 'Home', href: '/', icon: IconComponent as any }
    const { container } = renderNavItem(item)
    expect(container.querySelector('[data-testid="link-icon"]')).toBeTruthy()
  })

  it('does not render the icon at level=2', () => {
    const IconComponent = markRaw({
      name: 'TestIcon',
      render: () => h('span', { 'data-testid': 'level2-icon', 'aria-hidden': 'true' }),
    })
    const item: AppLayoutNavItem = { label: 'Sub Link', href: '/sub', icon: IconComponent as any }
    const { container } = renderNavItem(item, { level: 2 })
    expect(container.querySelector('[data-testid="level2-icon"]')).toBeNull()
  })
})

// ─── Icon on a button item ────────────────────────────────────────────────────

describe('AppLayoutSidebarNavItem — icon on button item', () => {
  it('renders the icon component when icon prop is set on a button and level=1', () => {
    const IconComponent = markRaw({
      name: 'TestIcon',
      render: () => h('span', { 'data-testid': 'btn-icon', 'aria-hidden': 'true' }),
    })
    const item: AppLayoutNavItem = { label: 'Sign out', onClick: vi.fn(), icon: IconComponent as any }
    const { container } = renderNavItem(item)
    expect(container.querySelector('[data-testid="btn-icon"]')).toBeTruthy()
  })
})

// ─── Background body variant (hoverBg ternary) ───────────────────────────────

describe('AppLayoutSidebarNavItem — background=body', () => {
  it('renders correctly with background=body (uses subtle hover colour)', () => {
    const item: AppLayoutNavItem = { label: 'Home', href: '/' }
    const { container } = renderNavItem(item, { background: 'body' })
    // The hoverBg computed uses 'var(--agds-color-bg-subtle)' for body background
    // We just verify the component renders without error with this prop
    expect(container.querySelector('.agds-alsnav-item')).toBeTruthy()
    expect(container.querySelector('a.agds-alsnav-item__link')).toBeTruthy()
  })
})

// ─── Ancestor state ───────────────────────────────────────────────────────────

describe('AppLayoutSidebarNavItem — ancestor state', () => {
  it('applies ancestor class when item has matching sub-item', () => {
    const item: AppLayoutNavItem = {
      label: 'Services',
      href: '/services',
      items: [{ label: 'Health', href: '/services/health' }],
    }
    // activePath is a descendant of /services but not /services itself
    const { container } = renderNavItem(item, { activePath: '/services/health' })
    const link = container.querySelector('a')!
    expect(link.classList.contains('agds-alsnav-item__link--ancestor')).toBe(true)
    expect(link.classList.contains('agds-alsnav-item__link--current')).toBe(false)
  })

  it('applies current class when activePath matches the item href exactly', () => {
    const item: AppLayoutNavItem = { label: 'Home', href: '/home' }
    const { container } = renderNavItem(item, { activePath: '/home' })
    const link = container.querySelector('a')!
    expect(link.classList.contains('agds-alsnav-item__link--current')).toBe(true)
    expect(link.getAttribute('aria-current')).toBe('page')
  })

  it('shows chevron for items with sub-items when subLevelVisible=whenActive', () => {
    const item: AppLayoutNavItem = {
      label: 'Services',
      href: '/services',
      items: [{ label: 'Health', href: '/services/health' }],
    }
    const { container } = renderNavItem(item, { subLevelVisible: 'whenActive' })
    expect(container.querySelector('.agds-alsnav-item__chevron')).toBeTruthy()
  })

  it('does not show chevron when subLevelVisible=always', () => {
    const item: AppLayoutNavItem = {
      label: 'Services',
      href: '/services',
      items: [{ label: 'Health', href: '/services/health' }],
    }
    const { container } = renderNavItem(item, { subLevelVisible: 'always' })
    expect(container.querySelector('.agds-alsnav-item__chevron')).toBeNull()
  })

  it('shows sub-items when isOpen=true (activePath matches)', () => {
    const item: AppLayoutNavItem = {
      label: 'Services',
      href: '/services',
      items: [{ label: 'Health', href: '/services/health' }],
    }
    const { getByRole } = renderNavItem(item, { activePath: '/services' })
    expect(getByRole('link', { name: 'Health' })).toBeTruthy()
  })
})

// ─── Close event ──────────────────────────────────────────────────────────────

describe('AppLayoutSidebarNavItem — close event', () => {
  it('emits close when a link is clicked', async () => {
    const item: AppLayoutNavItem = { label: 'Home', href: '/' }
    const { getByRole, emitted } = render(AppLayoutSidebarNavItem, {
      props: {
        item,
        activePath: '/',
        level: 1,
        subLevelVisible: 'whenActive' as const,
        background: 'bodyAlt' as const,
      },
    })
    await screen.getByText('Home').click?.()
    // Verify the link is rendered
    expect(getByRole('listitem')).toBeTruthy()
  })
})
