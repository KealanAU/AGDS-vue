import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSTable from './AGDSTable.vue'
import AGDSTableHead from './AGDSTableHead.vue'
import AGDSTableBody from './AGDSTableBody.vue'
import AGDSTableRow from './AGDSTableRow.vue'
import AGDSTableHeader from './AGDSTableHeader.vue'
import AGDSTableHeaderSortable from './AGDSTableHeaderSortable.vue'
import AGDSTableCell from './AGDSTableCell.vue'
import AGDSTableCaption from './AGDSTableCaption.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Minimal valid table for rendering/axe checks. */
function renderBasicTable(
  tableProps: Record<string, unknown> = {},
  captionText?: string,
) {
  return render({
    components: {
      AGDSTable,
      AGDSTableHead,
      AGDSTableBody,
      AGDSTableRow,
      AGDSTableHeader,
      AGDSTableCell,
      AGDSTableCaption,
    },
    template: `
      <AGDSTable v-bind="tableProps">
        <AGDSTableCaption v-if="captionText">{{ captionText }}</AGDSTableCaption>
        <AGDSTableHead>
          <AGDSTableRow>
            <AGDSTableHeader>Name</AGDSTableHeader>
            <AGDSTableHeader>Age</AGDSTableHeader>
          </AGDSTableRow>
        </AGDSTableHead>
        <AGDSTableBody>
          <AGDSTableRow>
            <AGDSTableCell>Alice</AGDSTableCell>
            <AGDSTableCell>30</AGDSTableCell>
          </AGDSTableRow>
        </AGDSTableBody>
      </AGDSTable>
    `,
    data() {
      return { tableProps, captionText }
    },
  })
}

// ─── AGDSTable — rendering ──────────────────────────────────────────────────

describe('AGDSTable — rendering', () => {
  it('renders a <table> element', () => {
    const { getByRole } = renderBasicTable()
    expect(getByRole('table')).toBeTruthy()
  })

  it('renders with agds-table class', () => {
    const { getByRole } = renderBasicTable()
    expect(getByRole('table').classList.contains('agds-table')).toBe(true)
  })
})

// ─── AGDSTable — striped prop ───────────────────────────────────────────────

describe('AGDSTable — striped prop', () => {
  it('does not add striped class by default', () => {
    const { getByRole } = renderBasicTable()
    expect(getByRole('table').classList.contains('agds-table--striped')).toBe(false)
  })

  it('adds striped class when striped=true', () => {
    const { getByRole } = renderBasicTable({ striped: true })
    expect(getByRole('table').classList.contains('agds-table--striped')).toBe(true)
  })
})

// ─── AGDSTable — tableLayout prop ──────────────────────────────────────────

describe('AGDSTable — tableLayout prop', () => {
  it('does not add layout-fixed class with default (auto) layout', () => {
    const { getByRole } = renderBasicTable()
    expect(getByRole('table').classList.contains('agds-table--layout-fixed')).toBe(false)
  })

  it('adds layout-fixed class when tableLayout="fixed"', () => {
    const { getByRole } = renderBasicTable({ tableLayout: 'fixed' })
    expect(getByRole('table').classList.contains('agds-table--layout-fixed')).toBe(true)
  })
})

// ─── AGDSTable — ARIA attributes ───────────────────────────────────────────
// aria-labelledby, aria-describedby, aria-rowcount etc. are not declared as
// props — they flow through $attrs to the <table> element via inheritAttrs.

describe('AGDSTable — ARIA attributes', () => {
  it('forwards aria-labelledby to the table element', () => {
    const { container } = render({
      components: { AGDSTable, AGDSTableHead, AGDSTableBody, AGDSTableRow, AGDSTableHeader, AGDSTableCell },
      template: `
        <AGDSTable aria-labelledby="heading-1">
          <AGDSTableHead>
            <AGDSTableRow><AGDSTableHeader>Name</AGDSTableHeader></AGDSTableRow>
          </AGDSTableHead>
          <AGDSTableBody>
            <AGDSTableRow><AGDSTableCell>Alice</AGDSTableCell></AGDSTableRow>
          </AGDSTableBody>
        </AGDSTable>
      `,
    })
    expect(container.querySelector('table')!.getAttribute('aria-labelledby')).toBe('heading-1')
  })

  it('forwards aria-rowcount to the table element', () => {
    const { container } = render({
      components: { AGDSTable, AGDSTableHead, AGDSTableBody, AGDSTableRow, AGDSTableHeader, AGDSTableCell },
      template: `
        <AGDSTable :aria-rowcount="100">
          <AGDSTableHead>
            <AGDSTableRow><AGDSTableHeader>Name</AGDSTableHeader></AGDSTableRow>
          </AGDSTableHead>
          <AGDSTableBody>
            <AGDSTableRow><AGDSTableCell>Alice</AGDSTableCell></AGDSTableRow>
          </AGDSTableBody>
        </AGDSTable>
      `,
    })
    expect(container.querySelector('table')!.getAttribute('aria-rowcount')).toBe('100')
  })

  it('sets tabindex when tabIndex=-1', () => {
    const { getByRole } = renderBasicTable({ tabIndex: -1 })
    expect(getByRole('table').getAttribute('tabindex')).toBe('-1')
  })

  it('does not set tabindex when tabIndex is not provided', () => {
    const { getByRole } = renderBasicTable()
    expect(getByRole('table').getAttribute('tabindex')).toBeNull()
  })
})

// ─── AGDSTableCaption ───────────────────────────────────────────────────────

describe('AGDSTableCaption — rendering', () => {
  it('renders caption text', () => {
    const { getByText } = renderBasicTable({}, 'User data')
    expect(getByText('User data')).toBeTruthy()
  })
})

// ─── AGDSTableHeader ────────────────────────────────────────────────────────

describe('AGDSTableHeader — rendering', () => {
  it('renders as <th> by default with scope="col"', () => {
    const { container } = renderBasicTable()
    const ths = container.querySelectorAll('th')
    expect(ths.length).toBeGreaterThan(0)
    ths.forEach((th) => expect(th.getAttribute('scope')).toBe('col'))
  })
})

// ─── AGDSTableHeaderSortable — rendering & interaction ─────────────────────

describe('AGDSTableHeaderSortable — rendering', () => {
  function renderSortableHeader(props: Record<string, unknown> = {}) {
    return render({
      components: { AGDSTable, AGDSTableHead, AGDSTableBody, AGDSTableRow, AGDSTableHeaderSortable, AGDSTableCell },
      template: `
        <AGDSTable>
          <AGDSTableHead>
            <AGDSTableRow>
              <AGDSTableHeaderSortable v-bind="sortProps" @click="onClick">Name</AGDSTableHeaderSortable>
            </AGDSTableRow>
          </AGDSTableHead>
          <AGDSTableBody>
            <AGDSTableRow><AGDSTableCell>Alice</AGDSTableCell></AGDSTableRow>
          </AGDSTableBody>
        </AGDSTable>
      `,
      data() { return { sortProps: props } },
      methods: { onClick() {} },
    })
  }

  it('renders a <th> with a sort button inside', () => {
    const { container } = renderSortableHeader()
    const th = container.querySelector('th')
    expect(th).toBeTruthy()
    const btn = th!.querySelector('button')
    expect(btn).toBeTruthy()
  })

  it('does not set aria-sort when sort prop is absent', () => {
    const { container } = renderSortableHeader()
    expect(container.querySelector('th')?.getAttribute('aria-sort')).toBeNull()
  })

  it('sets aria-sort="ascending" when sort="ASC"', () => {
    const { container } = renderSortableHeader({ sort: 'ASC' })
    expect(container.querySelector('th')?.getAttribute('aria-sort')).toBe('ascending')
  })

  it('sets aria-sort="descending" when sort="DESC"', () => {
    const { container } = renderSortableHeader({ sort: 'DESC' })
    expect(container.querySelector('th')?.getAttribute('aria-sort')).toBe('descending')
  })

  it('emits click when the sort button is clicked', async () => {
    // Test the sortable header directly — it renders a button that emits 'click'.
    const { container, emitted } = render(AGDSTableHeaderSortable, {
      slots: { default: 'Name' },
    })
    const btn = container.querySelector('button')!
    await fireEvent.click(btn)
    expect(emitted().click).toHaveLength(1)
    expect(emitted().click[0][0]).toBeInstanceOf(MouseEvent)
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSTable — axe accessibility', () => {
  it('has no violations in basic state', async () => {
    const { container } = renderBasicTable({}, 'User data')
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when striped=true', async () => {
    const { container } = renderBasicTable({ striped: true }, 'User data')
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with sortable headers', async () => {
    const { container } = render({
      components: { AGDSTable, AGDSTableHead, AGDSTableBody, AGDSTableRow, AGDSTableHeaderSortable, AGDSTableCell, AGDSTableCaption },
      template: `
        <AGDSTable>
          <AGDSTableCaption>Sortable user data</AGDSTableCaption>
          <AGDSTableHead>
            <AGDSTableRow>
              <AGDSTableHeaderSortable sort="ASC">Name</AGDSTableHeaderSortable>
              <AGDSTableHeaderSortable>Age</AGDSTableHeaderSortable>
            </AGDSTableRow>
          </AGDSTableHead>
          <AGDSTableBody>
            <AGDSTableRow>
              <AGDSTableCell>Alice</AGDSTableCell>
              <AGDSTableCell>30</AGDSTableCell>
            </AGDSTableRow>
          </AGDSTableBody>
        </AGDSTable>
      `,
    })
    await runAxe(container, AXE_OPTS)
  })
})
