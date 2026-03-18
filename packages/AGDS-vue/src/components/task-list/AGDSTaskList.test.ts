import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSTaskList from './AGDSTaskList.vue'
import AGDSTaskListItem from './AGDSTaskListItem.vue'
import type { TaskListItem } from './AGDSTaskList.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Fixtures ────────────────────────────────────────────────────────────────

const ITEMS: TaskListItem[] = [
  { label: 'Create account', status: 'done', href: '/account' },
  { label: 'Verify identity', status: 'doing', href: '/identity' },
  { label: 'Submit application', status: 'todo', href: '/apply' },
  { label: 'Upload documents', status: 'blocked' },
  { label: 'Background check', status: 'notRequired' },
  { label: 'Confirm details', status: 'doneRecently', href: '/confirm' },
]

function renderList(props: Record<string, unknown> = {}) {
  return render(AGDSTaskList, {
    props: { items: ITEMS, ...props },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSTaskList — rendering', () => {
  it('renders the heading "Complete these tasks"', () => {
    const { getByRole } = renderList()
    expect(getByRole('heading', { name: 'Complete these tasks' })).toBeTruthy()
  })

  it('renders task-completed count text', () => {
    const { getByText } = renderList()
    // 'done' + 'doneRecently' = 2 of 6
    expect(getByText('2 of 6 tasks completed')).toBeTruthy()
  })

  it('renders an unordered list by default', () => {
    const { container } = renderList()
    expect(container.querySelector('ul.agds-task-list__items')).toBeTruthy()
    expect(container.querySelector('ol.agds-task-list__items')).toBeNull()
  })

  it('renders an ordered list when ordered=true', () => {
    const { container } = renderList({ ordered: true })
    expect(container.querySelector('ol.agds-task-list__items')).toBeTruthy()
  })

  it('renders all item labels', () => {
    const { getByText } = renderList()
    ITEMS.forEach(({ label }) => {
      expect(getByText(label, { exact: false })).toBeTruthy()
    })
  })

  it('renders link items as <a> elements', () => {
    const { container } = renderList()
    const links = container.querySelectorAll('a')
    // Items with href: account, identity, apply, confirm = 4
    expect(links.length).toBe(4)
  })

  it('renders items without href as <button> elements', () => {
    const { container } = renderList()
    // Items without href: blocked, notRequired = 2
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBe(2)
  })
})

// ─── Status rendering ─────────────────────────────────────────────────────────

describe('AGDSTaskList — status classes', () => {
  it.each([
    'notRequired',
    'blocked',
    'doing',
    'todo',
    'done',
    'doneRecently',
  ] as const)('applies status modifier class for status="%s"', (status) => {
    const { container } = render(AGDSTaskList, {
      props: { items: [{ label: 'Task', status }] },
    })
    expect(container.querySelector(`.agds-task-list-item--${status}`)).toBeTruthy()
  })
})

// ─── Message prop ────────────────────────────────────────────────────────────

describe('AGDSTaskList — message prop', () => {
  it('renders the message when provided', () => {
    const { getByText } = render(AGDSTaskList, {
      props: {
        items: [{ label: 'Task', status: 'todo', message: 'Awaiting approval' }],
      },
    })
    expect(getByText('Awaiting approval')).toBeTruthy()
  })

  it('does not render a message element when omitted', () => {
    const { container } = render(AGDSTaskList, {
      props: { items: [{ label: 'Task', status: 'todo' }] },
    })
    expect(container.querySelector('.agds-task-list-item__message')).toBeNull()
  })
})

// ─── Ordered prop ─────────────────────────────────────────────────────────────

describe('AGDSTaskList — ordered prop', () => {
  it('adds the counter span when ordered=true', () => {
    const { container } = renderList({ ordered: true })
    expect(container.querySelector('.agds-task-list-item__counter')).toBeTruthy()
  })

  it('does not render counter spans when ordered=false', () => {
    const { container } = renderList({ ordered: false })
    expect(container.querySelector('.agds-task-list-item__counter')).toBeNull()
  })
})

// ─── AGDSTaskListItem — standalone ─────────────────────────────────────────

describe('AGDSTaskListItem — standalone', () => {
  it('renders a link when href is provided', () => {
    const { container } = render(AGDSTaskListItem, {
      props: { status: 'todo', href: '/apply' },
      slots: { default: 'Submit application' },
    })
    const a = container.querySelector('a')
    expect(a).toBeTruthy()
    expect(a!.getAttribute('href')).toBe('/apply')
  })

  it('renders a button when no href is provided', () => {
    const { container } = render(AGDSTaskListItem, {
      props: { status: 'todo' },
      slots: { default: 'Submit application' },
    })
    expect(container.querySelector('button')).toBeTruthy()
  })

  it('sets disabled on button when disabled=true', () => {
    const { container } = render(AGDSTaskListItem, {
      props: { status: 'todo', disabled: true },
      slots: { default: 'Task' },
    })
    const btn = container.querySelector('button') as HTMLButtonElement
    expect(btn.disabled).toBe(true)
  })

  it('sets aria-disabled when disabled=true', () => {
    const { container } = render(AGDSTaskListItem, {
      props: { status: 'todo', disabled: true },
      slots: { default: 'Task' },
    })
    expect(container.querySelector('[aria-disabled="true"]')).toBeTruthy()
  })

  it('emits click on click', async () => {
    const { container, emitted } = render(AGDSTaskListItem, {
      props: { status: 'todo' },
      slots: { default: 'Task' },
    })
    await fireEvent.click(container.querySelector('button')!)
    expect(emitted().click).toHaveLength(1)
  })

  it('emits focus on focus', async () => {
    const { container, emitted } = render(AGDSTaskListItem, {
      props: { status: 'todo' },
      slots: { default: 'Task' },
    })
    await fireEvent.focus(container.querySelector('button')!)
    expect(emitted().focus).toHaveLength(1)
  })

  it('emits blur on blur', async () => {
    const { container, emitted } = render(AGDSTaskListItem, {
      props: { status: 'todo' },
      slots: { default: 'Task' },
    })
    await fireEvent.blur(container.querySelector('button')!)
    expect(emitted().blur).toHaveLength(1)
  })

  it('renders status label text', () => {
    const { getByText } = render(AGDSTaskListItem, {
      props: { status: 'doing' },
      slots: { default: 'Task' },
    })
    expect(getByText('In progress', { exact: false })).toBeTruthy()
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('AGDSTaskList — accessibility', () => {
  it('has no axe violations with link items', async () => {
    const { container } = render(AGDSTaskList, {
      props: {
        items: [
          { label: 'Account setup', status: 'done', href: '/account' },
          { label: 'Verify identity', status: 'doing', href: '/identity' },
        ],
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no axe violations with button items', async () => {
    const { container } = render(AGDSTaskList, {
      props: {
        items: [
          { label: 'Account setup', status: 'todo' },
          { label: 'Verify identity', status: 'blocked' },
        ],
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no axe violations when ordered=true', async () => {
    const { container } = render(AGDSTaskList, {
      props: {
        items: [
          { label: 'First task', status: 'done', href: '/first' },
          { label: 'Second task', status: 'todo', href: '/second' },
        ],
        ordered: true,
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no axe violations with all statuses', async () => {
    const { container } = render(AGDSTaskList, {
      props: {
        items: [
          { label: 'Not required task', status: 'notRequired' },
          { label: 'Blocked task', status: 'blocked' },
          { label: 'In progress task', status: 'doing', href: '/doing' },
          { label: 'Todo task', status: 'todo', href: '/todo' },
          { label: 'Done task', status: 'done', href: '/done' },
          { label: 'Done recently task', status: 'doneRecently', href: '/recent' },
        ],
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('detects axe violations (intentional: empty link label)', async () => {
    const { container } = render(AGDSTaskListItem, {
      props: { status: 'todo', href: '/apply' },
      slots: { default: '' },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
