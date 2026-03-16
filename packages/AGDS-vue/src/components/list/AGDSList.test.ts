import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { defineComponent, h } from 'vue'
import { runAxe } from '../../test/a11y'
import AgDSUnorderedList from './AGDSUnorderedList.vue'
import AgDSOrderedList from './AGDSOrderedList.vue'
import AgDSListItem from './AGDSListItem.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderUl(items = ['One', 'Two', 'Three']) {
  return render(AgDSUnorderedList, {
    slots: {
      default: items
        .map((t) => `<li class="agds-list-item">${t}</li>`)
        .join(''),
    },
  })
}

function renderOl(items = ['One', 'Two', 'Three']) {
  return render(AgDSOrderedList, {
    slots: {
      default: items
        .map((t) => `<li class="agds-list-item">${t}</li>`)
        .join(''),
    },
  })
}

// ─── AgDSUnorderedList — rendering ─────────────────────────────────────────

describe('AgDSUnorderedList — rendering', () => {
  it('renders a <ul>', () => {
    const { container } = renderUl()
    expect(container.querySelector('ul.agds-unordered-list')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = renderUl(['Alpha'])
    expect(getByText('Alpha')).toBeTruthy()
  })

  it('does not apply nested class at depth 1', () => {
    const { container } = renderUl()
    expect(container.querySelector('.agds-list--nested')).toBeNull()
  })
})

// ─── AgDSUnorderedList — nested ─────────────────────────────────────────────

describe('AgDSUnorderedList — nested', () => {
  it('applies nested class when inside another list', () => {
    const Nested = defineComponent({
      render() {
        return h(AgDSUnorderedList, null, {
          default: () =>
            h(AgDSListItem, null, {
              default: () => [
                'Parent',
                h(AgDSUnorderedList, null, {
                  default: () => h(AgDSListItem, null, { default: () => 'Child' }),
                }),
              ],
            }),
        })
      },
    })
    const { container } = render(Nested)
    const lists = container.querySelectorAll('ul')
    expect(lists).toHaveLength(2)
    expect(lists[1].classList.contains('agds-list--nested')).toBe(true)
  })
})

// ─── AgDSOrderedList — rendering ───────────────────────────────────────────

describe('AgDSOrderedList — rendering', () => {
  it('renders an <ol>', () => {
    const { container } = renderOl()
    expect(container.querySelector('ol.agds-ordered-list')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = renderOl(['Step one'])
    expect(getByText('Step one')).toBeTruthy()
  })

  it('does not apply nested class at depth 1', () => {
    const { container } = renderOl()
    expect(container.querySelector('.agds-list--nested')).toBeNull()
  })
})

// ─── AgDSOrderedList — nested ───────────────────────────────────────────────

describe('AgDSOrderedList — nested', () => {
  it('applies nested class when inside another ordered list', () => {
    const Nested = defineComponent({
      render() {
        return h(AgDSOrderedList, null, {
          default: () =>
            h(AgDSListItem, null, {
              default: () => [
                'Parent',
                h(AgDSOrderedList, null, {
                  default: () => h(AgDSListItem, null, { default: () => 'Child' }),
                }),
              ],
            }),
        })
      },
    })
    const { container } = render(Nested)
    const lists = container.querySelectorAll('ol')
    expect(lists).toHaveLength(2)
    expect(lists[1].classList.contains('agds-list--nested')).toBe(true)
  })
})

// ─── AgDSListItem — rendering ───────────────────────────────────────────────

describe('AgDSListItem — rendering', () => {
  it('renders a <li>', () => {
    const { container } = render(AgDSListItem, {
      slots: { default: 'Item text' },
    })
    expect(container.querySelector('li.agds-list-item')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = render(AgDSListItem, {
      slots: { default: 'Hello list item' },
    })
    expect(getByText('Hello list item')).toBeTruthy()
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('AgDSUnorderedList — axe', () => {
  it('has no violations with list items', async () => {
    const { container } = render(
      defineComponent({
        render: () =>
          h(AgDSUnorderedList, null, {
            default: () => [
              h(AgDSListItem, null, { default: () => 'First' }),
              h(AgDSListItem, null, { default: () => 'Second' }),
            ],
          }),
      }),
    )
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a nested list', async () => {
    const { container } = render(
      defineComponent({
        render: () =>
          h(AgDSUnorderedList, null, {
            default: () =>
              h(AgDSListItem, null, {
                default: () => [
                  'Parent item',
                  h(AgDSUnorderedList, null, {
                    default: () =>
                      h(AgDSListItem, null, { default: () => 'Child item' }),
                  }),
                ],
              }),
          }),
      }),
    )
    await runAxe(container, AXE_OPTS)
  })
})

describe('AgDSOrderedList — axe', () => {
  it('has no violations with list items', async () => {
    const { container } = render(
      defineComponent({
        render: () =>
          h(AgDSOrderedList, null, {
            default: () => [
              h(AgDSListItem, null, { default: () => 'Step 1' }),
              h(AgDSListItem, null, { default: () => 'Step 2' }),
            ],
          }),
      }),
    )
    await runAxe(container, AXE_OPTS)
  })

  it('catches intentional axe violation — button with no accessible name', async () => {
    const { container } = render(
      defineComponent({
        render: () =>
          h(AgDSUnorderedList, null, {
            default: () =>
              h(AgDSListItem, null, {
                // button with no label → axe violation
                default: () => h('button'),
              }),
          }),
      }),
    )
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
