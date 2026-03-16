import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSColumns from './AGDSColumns.vue'
import AgDSColumn from './AGDSColumn.vue'

const AXE_OPTS = { rules: { 'color-contrast': { enabled: false } } } as const

function renderColumns(props: Record<string, unknown> = {}, slot = '<div>A</div><div>B</div>') {
  return render(AgDSColumns, { props, slots: { default: slot } })
}

function renderColumn(props: Record<string, unknown> = {}, slot = '<p>Content</p>') {
  return render(AgDSColumn, { props, slots: { default: slot } })
}

// ─── AgDSColumns — defaults ──────────────────────────────────────────────────

describe('AgDSColumns — defaults', () => {
  it('renders a div by default', () => {
    const { container } = renderColumns()
    expect(container.querySelector('div')).toBeTruthy()
  })

  it('applies display: grid', () => {
    const { container } = renderColumns()
    expect((container.querySelector('div') as HTMLElement).style.display).toBe('grid')
  })

  it('defaults to 12 columns', () => {
    const { container } = renderColumns()
    expect((container.querySelector('div') as HTMLElement).style.gridTemplateColumns).toBe(
      'repeat(12, 1fr)',
    )
  })
})

// ─── AgDSColumns — cols prop ─────────────────────────────────────────────────

describe('AgDSColumns — cols prop', () => {
  it('sets 3-column grid', () => {
    const { container } = renderColumns({ cols: 3 })
    expect((container.querySelector('div') as HTMLElement).style.gridTemplateColumns).toBe(
      'repeat(3, 1fr)',
    )
  })

  it('sets 1-column grid', () => {
    const { container } = renderColumns({ cols: 1 })
    expect((container.querySelector('div') as HTMLElement).style.gridTemplateColumns).toBe(
      'repeat(1, 1fr)',
    )
  })
})

// ─── AgDSColumns — gap props ─────────────────────────────────────────────────

describe('AgDSColumns — gap props', () => {
  it('maps numeric gap to a space token', () => {
    const { container } = renderColumns({ gap: 3 })
    expect((container.querySelector('div') as HTMLElement).style.gap).toBe('var(--agds-space-3)')
  })

  it('passes string gap verbatim', () => {
    const { container } = renderColumns({ gap: '1rem' })
    expect((container.querySelector('div') as HTMLElement).style.gap).toBe('1rem')
  })

  it('sets columnGap independently', () => {
    const { container } = renderColumns({ columnGap: 2 })
    expect((container.querySelector('div') as HTMLElement).style.columnGap).toBe(
      'var(--agds-space-2)',
    )
  })

  it('sets rowGap independently', () => {
    const { container } = renderColumns({ rowGap: 4 })
    expect((container.querySelector('div') as HTMLElement).style.rowGap).toBe(
      'var(--agds-space-4)',
    )
  })
})

// ─── AgDSColumns — alignItems prop ──────────────────────────────────────────

describe('AgDSColumns — alignItems prop', () => {
  it('sets align-items: center', () => {
    const { container } = renderColumns({ alignItems: 'center' })
    expect((container.querySelector('div') as HTMLElement).style.alignItems).toBe('center')
  })
})

// ─── AgDSColumns — as prop ───────────────────────────────────────────────────

describe('AgDSColumns — as prop', () => {
  it('renders as the given element', () => {
    const { container } = renderColumns({ as: 'section' })
    expect(container.querySelector('section')).toBeTruthy()
  })
})

// ─── AgDSColumns — slot ─────────────────────────────────────────────────────

describe('AgDSColumns — slot', () => {
  it('renders default slot content', () => {
    const { getByText } = renderColumns({}, '<span>Hello</span>')
    expect(getByText('Hello')).toBeTruthy()
  })
})

// ─── AgDSColumn — defaults ───────────────────────────────────────────────────

describe('AgDSColumn — defaults', () => {
  it('renders a div by default', () => {
    const { container } = renderColumn()
    expect(container.querySelector('div')).toBeTruthy()
  })

  it('has no inline grid styles when no props given', () => {
    const { container } = renderColumn()
    const el = container.querySelector('div') as HTMLElement
    expect(el.style.gridColumn).toBe('')
    expect(el.style.gridColumnStart).toBe('')
    expect(el.style.gridColumnEnd).toBe('')
  })
})

// ─── AgDSColumn — span prop ──────────────────────────────────────────────────

describe('AgDSColumn — span prop', () => {
  it('sets grid-column span shorthand', () => {
    const { container } = renderColumn({ span: 6 })
    expect((container.querySelector('div') as HTMLElement).style.gridColumn).toBe(
      'span 6 / span 6',
    )
  })

  it('spans the full 12 columns', () => {
    const { container } = renderColumn({ span: 12 })
    expect((container.querySelector('div') as HTMLElement).style.gridColumn).toBe(
      'span 12 / span 12',
    )
  })
})

// ─── AgDSColumn — start / end props ─────────────────────────────────────────

describe('AgDSColumn — start/end props', () => {
  it('sets grid-column-start', () => {
    const { container } = renderColumn({ start: 3 })
    expect((container.querySelector('div') as HTMLElement).style.gridColumnStart).toBe('3')
  })

  it('sets grid-column-end', () => {
    const { container } = renderColumn({ end: 7 })
    expect((container.querySelector('div') as HTMLElement).style.gridColumnEnd).toBe('7')
  })

  it('sets both start and end together', () => {
    const { container } = renderColumn({ start: 2, end: 8 })
    const el = container.querySelector('div') as HTMLElement
    expect(el.style.gridColumnStart).toBe('2')
    expect(el.style.gridColumnEnd).toBe('8')
  })
})

// ─── AgDSColumn — alignSelf / justifySelf props ─────────────────────────────

describe('AgDSColumn — alignSelf/justifySelf props', () => {
  it('sets align-self: center', () => {
    const { container } = renderColumn({ alignSelf: 'center' })
    expect((container.querySelector('div') as HTMLElement).style.alignSelf).toBe('center')
  })

  it('sets justify-self: flex-end', () => {
    const { container } = renderColumn({ justifySelf: 'flex-end' })
    expect((container.querySelector('div') as HTMLElement).style.justifySelf).toBe('flex-end')
  })
})

// ─── AgDSColumn — as prop ────────────────────────────────────────────────────

describe('AgDSColumn — as prop', () => {
  it('renders as the given element', () => {
    const { container } = renderColumn({ as: 'article' })
    expect(container.querySelector('article')).toBeTruthy()
  })
})

// ─── AgDSColumn — slot ──────────────────────────────────────────────────────

describe('AgDSColumn — slot', () => {
  it('renders default slot content', () => {
    const { getByText } = renderColumn({}, '<span>Cell content</span>')
    expect(getByText('Cell content')).toBeTruthy()
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('AgDSColumns — axe accessibility', () => {
  it('has no violations with default props', async () => {
    const { container } = renderColumns()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with cols=3 and gap', async () => {
    const { container } = renderColumns(
      { cols: 3, gap: 2 },
      '<p>One</p><p>Two</p><p>Three</p>',
    )
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when an <img> has no alt text', async () => {
    const { container } = renderColumns()
    const img = document.createElement('img')
    img.setAttribute('src', 'photo.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})

describe('AgDSColumn — axe accessibility', () => {
  it('has no violations with span prop', async () => {
    const { container } = renderColumn({ span: 6 })
    await runAxe(container, AXE_OPTS)
  })
})
