import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { defineComponent, h } from 'vue'
import { runAxe } from '../../test/a11y'
import AGDSContent from './AGDSContent.vue'
import AGDSSectionContent from './AGDSSectionContent.vue'
import AGDSPageContent from './AGDSPageContent.vue'
import AGDSContentBleed from './AGDSContentBleed.vue'

// ──────────────────────────────────────────────────────────
// AGDSContent
// ──────────────────────────────────────────────────────────

describe('AGDSContent', () => {
  it('renders default element as div', () => {
    const { container } = render(AGDSContent, {
      slots: { default: '<p>Hello</p>' },
    })
    expect(container.firstElementChild!.tagName).toBe('DIV')
  })

  it('applies no-padding class', () => {
    const { container } = render(AGDSContent, {
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.classList).toContain('agds-content--none')
  })

  it('renders slot content', () => {
    render(AGDSContent, { slots: { default: '<p>Content body</p>' } })
    expect(screen.getByText('Content body')).toBeTruthy()
  })

  it('uses custom element with `as` prop', () => {
    const { container } = render(AGDSContent, {
      props: { as: 'article' },
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.tagName).toBe('ARTICLE')
  })

  it('applies background body class', () => {
    const { container } = render(AGDSContent, {
      props: { background: 'body' },
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.classList).toContain('agds-content--body')
  })

  it('applies background bodyAlt class', () => {
    const { container } = render(AGDSContent, {
      props: { background: 'bodyAlt' },
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.classList).toContain('agds-content--bodyAlt')
  })

  it('applies containerLg max-width class on inner element', () => {
    const { container } = render(AGDSContent, {
      props: { maxWidth: 'containerLg' },
      slots: { default: 'text' },
    })
    const inner = container.firstElementChild!.firstElementChild!
    expect(inner.classList).toContain('agds-content__inner--container-lg')
  })

  it('applies id to outer wrapper', () => {
    const { container } = render(AGDSContent, {
      props: { id: 'main-content' },
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.getAttribute('id')).toBe('main-content')
  })

  it('passes axe — default', async () => {
    const { container } = render(AGDSContent, { slots: { default: '<p>Text</p>' } })
    await runAxe(container)
  })
})

// ──────────────────────────────────────────────────────────
// AGDSSectionContent
// ──────────────────────────────────────────────────────────

describe('AGDSSectionContent', () => {
  it('renders default element as section', () => {
    const { container } = render(AGDSSectionContent, {
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.tagName).toBe('SECTION')
  })

  it('applies section padding class', () => {
    const { container } = render(AGDSSectionContent, {
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.classList).toContain('agds-content--section')
  })

  it('accepts custom element', () => {
    const { container } = render(AGDSSectionContent, {
      props: { as: 'div' },
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.tagName).toBe('DIV')
  })

  it('passes axe — default', async () => {
    const { container } = render(AGDSSectionContent, {
      slots: { default: '<p>Section body</p>' },
    })
    await runAxe(container)
  })

  it('passes axe — bodyAlt background', async () => {
    const { container } = render(AGDSSectionContent, {
      props: { background: 'bodyAlt' },
      slots: { default: '<p>Section body</p>' },
    })
    await runAxe(container)
  })
})

// ──────────────────────────────────────────────────────────
// AGDSPageContent
// ──────────────────────────────────────────────────────────

describe('AGDSPageContent', () => {
  it('renders default element as div', () => {
    const { container } = render(AGDSPageContent, {
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.tagName).toBe('DIV')
  })

  it('applies page padding class', () => {
    const { container } = render(AGDSPageContent, {
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.classList).toContain('agds-content--page')
  })

  it('passes axe — default', async () => {
    const { container } = render(AGDSPageContent, {
      slots: { default: '<p>Page body</p>' },
    })
    await runAxe(container)
  })
})

// ──────────────────────────────────────────────────────────
// AGDSContentBleed
// ──────────────────────────────────────────────────────────

describe('AGDSContentBleed', () => {
  const wrapInSection = (bleedProps = {}, slotContent = '<img src="x.jpg" alt="Hero">') =>
    defineComponent({
      components: { AGDSSectionContent, AGDSContentBleed },
      setup: () => ({ bleedProps }),
      template: `
        <AGDSSectionContent>
          <AGDSContentBleed v-bind="bleedProps">${slotContent}</AGDSContentBleed>
        </AGDSSectionContent>
      `,
    })

  const wrapInPage = (bleedProps = {}) =>
    defineComponent({
      components: { AGDSPageContent, AGDSContentBleed },
      setup: () => ({ bleedProps }),
      template: `
        <AGDSPageContent>
          <AGDSContentBleed v-bind="bleedProps"><img src="x.jpg" alt="Hero"></AGDSContentBleed>
        </AGDSPageContent>
      `,
    })

  it('renders slot content', () => {
    render(wrapInSection())
    expect(screen.getByRole('img', { name: 'Hero' })).toBeTruthy()
  })

  it('applies section bleed class inside SectionContent', () => {
    const { container } = render(wrapInSection())
    const bleedEl = container.querySelector('.agds-content-bleed')!
    expect(bleedEl.classList).toContain('agds-content-bleed--section')
  })

  it('applies page bleed class inside PageContent', () => {
    const { container } = render(wrapInPage())
    const bleedEl = container.querySelector('.agds-content-bleed')!
    expect(bleedEl.classList).toContain('agds-content-bleed--page')
  })

  it('applies no bleed class when not inside content component', () => {
    const { container } = render(AGDSContentBleed, {
      slots: { default: '<span>orphan</span>' },
    })
    const bleedEl = container.firstElementChild!
    // Only base class, no --section/--page modifier
    expect(bleedEl.classList).toContain('agds-content-bleed')
    expect(bleedEl.classList).not.toContain('agds-content-bleed--section')
    expect(bleedEl.classList).not.toContain('agds-content-bleed--page')
  })

  it('adds no-bleed class when visible=false', () => {
    const { container } = render(wrapInSection({ visible: false }))
    const bleedEl = container.querySelector('.agds-content-bleed')!
    expect(bleedEl.classList).toContain('agds-content-bleed--no-bleed')
  })

  it('does not add no-bleed class when visible=true', () => {
    const { container } = render(wrapInSection({ visible: true }))
    const bleedEl = container.querySelector('.agds-content-bleed')!
    expect(bleedEl.classList).not.toContain('agds-content-bleed--no-bleed')
    expect(bleedEl.classList).not.toContain('agds-content-bleed--no-bleed-xs')
    expect(bleedEl.classList).not.toContain('agds-content-bleed--no-bleed-md')
  })

  it('adds no-bleed-xs class when visible.xs=false', () => {
    const { container } = render(wrapInSection({ visible: { xs: false } }))
    const bleedEl = container.querySelector('.agds-content-bleed')!
    expect(bleedEl.classList).toContain('agds-content-bleed--no-bleed-xs')
    expect(bleedEl.classList).not.toContain('agds-content-bleed--no-bleed-md')
  })

  it('adds no-bleed-md class when visible.md=false', () => {
    const { container } = render(wrapInSection({ visible: { md: false } }))
    const bleedEl = container.querySelector('.agds-content-bleed')!
    expect(bleedEl.classList).toContain('agds-content-bleed--no-bleed-md')
    expect(bleedEl.classList).not.toContain('agds-content-bleed--no-bleed-xs')
  })

  it('adds both no-bleed-xs and no-bleed-md when both false', () => {
    const { container } = render(wrapInSection({ visible: { xs: false, md: false } }))
    const bleedEl = container.querySelector('.agds-content-bleed')!
    expect(bleedEl.classList).toContain('agds-content-bleed--no-bleed-xs')
    expect(bleedEl.classList).toContain('agds-content-bleed--no-bleed-md')
  })

  it('passes axe — bleed inside section', async () => {
    const { container } = render(wrapInSection())
    await runAxe(container)
  })

  // Intentional violation — verifies axe helper catches real failures
  it('intentional axe violation — img without alt', async () => {
    const { container } = render(
      defineComponent({
        components: { AGDSSectionContent, AGDSContentBleed },
        template: `
          <AGDSSectionContent>
            <AGDSContentBleed><img src="x.jpg"></AGDSContentBleed>
          </AGDSSectionContent>
        `,
      }),
    )
    await expect(runAxe(container)).rejects.toThrow()
  })
})
