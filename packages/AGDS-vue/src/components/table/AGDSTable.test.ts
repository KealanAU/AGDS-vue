import { describe, it, expect, vi } from 'vitest'
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

  it('applies inline width style when width prop is set', () => {
    const { container } = render({
      components: { AGDSTable, AGDSTableHead, AGDSTableBody, AGDSTableRow, AGDSTableHeader, AGDSTableCell },
      template: `
        <AGDSTable>
          <AGDSTableHead>
            <AGDSTableRow><AGDSTableHeader width="10rem">Name</AGDSTableHeader></AGDSTableRow>
          </AGDSTableHead>
          <AGDSTableBody>
            <AGDSTableRow><AGDSTableCell>Alice</AGDSTableCell></AGDSTableRow>
          </AGDSTableBody>
        </AGDSTable>
      `,
    })
    const th = container.querySelector('th')!
    expect(th.style.width).toBe('10rem')
  })

  it('does not apply inline width when width prop is not set', () => {
    const { container } = renderBasicTable()
    const th = container.querySelector('th')!
    expect(th.style.width).toBe('')
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

// ─── AGDSTableRow — props and interaction ────────────────────────────────────

describe('AGDSTableRow — selected prop', () => {
  function renderRow(rowProps: Record<string, unknown> = {}, cellContent = 'Alice') {
    return render({
      components: { AGDSTable, AGDSTableHead, AGDSTableBody, AGDSTableRow, AGDSTableHeader, AGDSTableCell },
      template: `
        <AGDSTable>
          <AGDSTableHead>
            <AGDSTableRow><AGDSTableHeader>Name</AGDSTableHeader></AGDSTableRow>
          </AGDSTableHead>
          <AGDSTableBody>
            <AGDSTableRow v-bind="rowProps"><AGDSTableCell>{{ cell }}</AGDSTableCell></AGDSTableRow>
          </AGDSTableBody>
        </AGDSTable>
      `,
      data() { return { rowProps, cell: cellContent } },
    })
  }

  it('applies selected class and aria-selected when selected=true', () => {
    const { container } = renderRow({ selected: true })
    const row = container.querySelectorAll('tbody tr')[0]
    expect(row.classList.contains('agds-table-row--selected')).toBe(true)
    expect(row.getAttribute('aria-selected')).toBe('true')
  })

  it('does not apply selected class when selected=false', () => {
    const { container } = renderRow()
    const row = container.querySelectorAll('tbody tr')[0]
    expect(row.classList.contains('agds-table-row--selected')).toBe(false)
    expect(row.getAttribute('aria-selected')).toBeNull()
  })

  it('applies invalid class when invalid=true', () => {
    const { container } = renderRow({ invalid: true })
    const row = container.querySelectorAll('tbody tr')[0]
    expect(row.classList.contains('agds-table-row--invalid')).toBe(true)
  })

  it('applies background class when background prop is set', () => {
    const { container } = renderRow({ background: 'bodyAlt' })
    const row = container.querySelectorAll('tbody tr')[0]
    expect(row.classList.contains('agds-table-row--bg-bodyAlt')).toBe(true)
  })

  it('sets data-has-background when background is set', () => {
    const { container } = renderRow({ background: 'body' })
    const row = container.querySelectorAll('tbody tr')[0]
    expect(row.getAttribute('data-has-background')).toBe('true')
  })

  it('sets data-has-background when invalid=true', () => {
    const { container } = renderRow({ invalid: true })
    const row = container.querySelectorAll('tbody tr')[0]
    expect(row.getAttribute('data-has-background')).toBe('true')
  })

  it('does not set data-has-background by default', () => {
    const { container } = renderRow()
    const row = container.querySelectorAll('tbody tr')[0]
    expect(row.getAttribute('data-has-background')).toBeNull()
  })
})

describe('AGDSTableRow — clickable prop and handleClick', () => {
  function renderClickableRow(rowProps: Record<string, unknown> = {}) {
    const clicks: MouseEvent[] = []
    const result = render({
      components: { AGDSTable, AGDSTableHead, AGDSTableBody, AGDSTableRow, AGDSTableHeader, AGDSTableCell },
      template: `
        <AGDSTable>
          <AGDSTableHead>
            <AGDSTableRow><AGDSTableHeader>Name</AGDSTableHeader></AGDSTableRow>
          </AGDSTableHead>
          <AGDSTableBody>
            <AGDSTableRow v-bind="rowProps" @click="onRowClick"><AGDSTableCell>Cell</AGDSTableCell></AGDSTableRow>
          </AGDSTableBody>
        </AGDSTable>
      `,
      data() { return { rowProps } },
      methods: { onRowClick(e: MouseEvent) { clicks.push(e) } },
    })
    return { ...result, clicks }
  }

  it('applies clickable class when clickable=true', () => {
    const { container } = renderClickableRow({ clickable: true })
    const row = container.querySelectorAll('tbody tr')[0]
    expect(row.classList.contains('agds-table-row--clickable')).toBe(true)
  })

  it('does not apply clickable class by default', () => {
    const { container } = renderClickableRow()
    const row = container.querySelectorAll('tbody tr')[0]
    expect(row.classList.contains('agds-table-row--clickable')).toBe(false)
  })

  it('emits click when a plain cell is clicked on a clickable row', async () => {
    const { container, clicks } = renderClickableRow({ clickable: true })
    const cell = container.querySelector('tbody td')!
    await fireEvent.click(cell)
    expect(clicks.length).toBe(1)
  })

  it('does not emit click when row is not clickable', async () => {
    const { container, clicks } = renderClickableRow({ clickable: false })
    const cell = container.querySelector('tbody td')!
    await fireEvent.click(cell)
    expect(clicks.length).toBe(0)
  })

  it('does not emit click when clicking a button inside the row', async () => {
    const rowClickSpy = vi.fn()
    const { container } = render({
      components: { AGDSTable, AGDSTableHead, AGDSTableBody, AGDSTableRow, AGDSTableHeader, AGDSTableCell },
      template: `
        <AGDSTable>
          <AGDSTableHead>
            <AGDSTableRow><AGDSTableHeader>Action</AGDSTableHeader></AGDSTableRow>
          </AGDSTableHead>
          <AGDSTableBody>
            <AGDSTableRow :clickable="true" @click="rowClickSpy">
              <AGDSTableCell><button type="button" id="inner-btn">Delete</button></AGDSTableCell>
            </AGDSTableRow>
          </AGDSTableBody>
        </AGDSTable>
      `,
      setup() {
        return { rowClickSpy }
      },
    })
    const innerBtn = container.querySelector('#inner-btn')!
    await fireEvent.click(innerBtn)
    expect(rowClickSpy).not.toHaveBeenCalled()
  })
})

describe('AGDSTableRow — inside fixed table', () => {
  it('applies fixed class when inside a table with tableLayout="fixed"', () => {
    const { container } = render({
      components: { AGDSTable, AGDSTableHead, AGDSTableBody, AGDSTableRow, AGDSTableHeader, AGDSTableCell },
      template: `
        <AGDSTable table-layout="fixed">
          <AGDSTableHead>
            <AGDSTableRow><AGDSTableHeader>Name</AGDSTableHeader></AGDSTableRow>
          </AGDSTableHead>
          <AGDSTableBody>
            <AGDSTableRow><AGDSTableCell>Alice</AGDSTableCell></AGDSTableRow>
          </AGDSTableBody>
        </AGDSTable>
      `,
    })
    const row = container.querySelectorAll('tbody tr')[0]
    expect(row.classList.contains('agds-table-row--fixed')).toBe(true)
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
