import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { defineComponent, h } from 'vue'
import { runAxe } from '../../test/a11y'
import AGDSUnorderedList from './AGDSUnorderedList.vue'
import AGDSOrderedList from './AGDSOrderedList.vue'
import AGDSListItem from './AGDSListItem.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderUl(items = ['One', 'Two', 'Three']) {
  return render(AGDSUnorderedList, {
    slots: {
      default: items
        .map((t) => `<li class="agds-list-item">${t}</li>`)
        .join(''),
    },
  })
}

function renderOl(items = ['One', 'Two', 'Three']) {
  return render(AGDSOrderedList, {
    slots: {
      default: items
        .map((t) => `<li class="agds-list-item">${t}</li>`)
        .join(''),
    },
  })
}

// ─── AGDSUnorderedList — rendering ─────────────────────────────────────────

describe('AGDSUnorderedList — rendering', () => {
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

// ─── AGDSUnorderedList — nested ─────────────────────────────────────────────

describe('AGDSUnorderedList — nested', () => {
  it('applies nested class when inside another list', () => {
    const Nested = defineComponent({
      render() {
        return h(AGDSUnorderedList, null, {
          default: () =>
            h(AGDSListItem, null, {
              default: () => [
                'Parent',
                h(AGDSUnorderedList, null, {
                  default: () => h(AGDSListItem, null, { default: () => 'Child' }),
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

// ─── AGDSOrderedList — rendering ───────────────────────────────────────────

describe('AGDSOrderedList — rendering', () => {
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

// ─── AGDSOrderedList — nested ───────────────────────────────────────────────

describe('AGDSOrderedList — nested', () => {
  it('applies nested class when inside another ordered list', () => {
    const Nested = defineComponent({
      render() {
        return h(AGDSOrderedList, null, {
          default: () =>
            h(AGDSListItem, null, {
              default: () => [
                'Parent',
                h(AGDSOrderedList, null, {
                  default: () => h(AGDSListItem, null, { default: () => 'Child' }),
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

// ─── AGDSListItem — rendering ───────────────────────────────────────────────

describe('AGDSListItem — rendering', () => {
  it('renders a <li>', () => {
    const { container } = render(AGDSListItem, {
      slots: { default: 'Item text' },
    })
    expect(container.querySelector('li.agds-list-item')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = render(AGDSListItem, {
      slots: { default: 'Hello list item' },
    })
    expect(getByText('Hello list item')).toBeTruthy()
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('AGDSUnorderedList — axe', () => {
  it('has no violations with list items', async () => {
    const { container } = render(
      defineComponent({
        render: () =>
          h(AGDSUnorderedList, null, {
            default: () => [
              h(AGDSListItem, null, { default: () => 'First' }),
              h(AGDSListItem, null, { default: () => 'Second' }),
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
          h(AGDSUnorderedList, null, {
            default: () =>
              h(AGDSListItem, null, {
                default: () => [
                  'Parent item',
                  h(AGDSUnorderedList, null, {
                    default: () =>
                      h(AGDSListItem, null, { default: () => 'Child item' }),
                  }),
                ],
              }),
          }),
      }),
    )
    await runAxe(container, AXE_OPTS)
  })
})

describe('AGDSOrderedList — axe', () => {
  it('has no violations with list items', async () => {
    const { container } = render(
      defineComponent({
        render: () =>
          h(AGDSOrderedList, null, {
            default: () => [
              h(AGDSListItem, null, { default: () => 'Step 1' }),
              h(AGDSListItem, null, { default: () => 'Step 2' }),
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
          h(AGDSUnorderedList, null, {
            default: () =>
              h(AGDSListItem, null, {
                // button with no label → axe violation
                default: () => h('button'),
              }),
          }),
      }),
    )
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
