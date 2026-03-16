import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { defineComponent, h } from 'vue'
import { runAxe } from '../../test/a11y'
import AgDSContent from './AGDSContent.vue'
import AgDSSectionContent from './AGDSSectionContent.vue'
import AgDSPageContent from './AGDSPageContent.vue'
import AgDSContentBleed from './AGDSContentBleed.vue'

// ──────────────────────────────────────────────────────────
// AgDSContent
// ──────────────────────────────────────────────────────────

describe('AgDSContent', () => {
  it('renders default element as div', () => {
    const { container } = render(AgDSContent, {
      slots: { default: '<p>Hello</p>' },
    })
    expect(container.firstElementChild!.tagName).toBe('DIV')
  })

  it('applies no-padding class', () => {
    const { container } = render(AgDSContent, {
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.classList).toContain('agds-content--none')
  })

  it('renders slot content', () => {
    render(AgDSContent, { slots: { default: '<p>Content body</p>' } })
    expect(screen.getByText('Content body')).toBeTruthy()
  })

  it('uses custom element with `as` prop', () => {
    const { container } = render(AgDSContent, {
      props: { as: 'article' },
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.tagName).toBe('ARTICLE')
  })

  it('applies background body class', () => {
    const { container } = render(AgDSContent, {
      props: { background: 'body' },
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.classList).toContain('agds-content--body')
  })

  it('applies background bodyAlt class', () => {
    const { container } = render(AgDSContent, {
      props: { background: 'bodyAlt' },
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.classList).toContain('agds-content--bodyAlt')
  })

  it('applies containerLg max-width class on inner element', () => {
    const { container } = render(AgDSContent, {
      props: { maxWidth: 'containerLg' },
      slots: { default: 'text' },
    })
    const inner = container.firstElementChild!.firstElementChild!
    expect(inner.classList).toContain('agds-content__inner--container-lg')
  })

  it('applies id to outer wrapper', () => {
    const { container } = render(AgDSContent, {
      props: { id: 'main-content' },
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.getAttribute('id')).toBe('main-content')
  })

  it('passes axe — default', async () => {
    const { container } = render(AgDSContent, { slots: { default: '<p>Text</p>' } })
    await runAxe(container)
  })
})

// ──────────────────────────────────────────────────────────
// AgDSSectionContent
// ──────────────────────────────────────────────────────────

describe('AgDSSectionContent', () => {
  it('renders default element as section', () => {
    const { container } = render(AgDSSectionContent, {
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.tagName).toBe('SECTION')
  })

  it('applies section padding class', () => {
    const { container } = render(AgDSSectionContent, {
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.classList).toContain('agds-content--section')
  })

  it('accepts custom element', () => {
    const { container } = render(AgDSSectionContent, {
      props: { as: 'div' },
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.tagName).toBe('DIV')
  })

  it('passes axe — default', async () => {
    const { container } = render(AgDSSectionContent, {
      slots: { default: '<p>Section body</p>' },
    })
    await runAxe(container)
  })

  it('passes axe — bodyAlt background', async () => {
    const { container } = render(AgDSSectionContent, {
      props: { background: 'bodyAlt' },
      slots: { default: '<p>Section body</p>' },
    })
    await runAxe(container)
  })
})

// ──────────────────────────────────────────────────────────
// AgDSPageContent
// ──────────────────────────────────────────────────────────

describe('AgDSPageContent', () => {
  it('renders default element as div', () => {
    const { container } = render(AgDSPageContent, {
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.tagName).toBe('DIV')
  })

  it('applies page padding class', () => {
    const { container } = render(AgDSPageContent, {
      slots: { default: 'text' },
    })
    expect(container.firstElementChild!.classList).toContain('agds-content--page')
  })

  it('passes axe — default', async () => {
    const { container } = render(AgDSPageContent, {
      slots: { default: '<p>Page body</p>' },
    })
    await runAxe(container)
  })
})

// ──────────────────────────────────────────────────────────
// AgDSContentBleed
// ──────────────────────────────────────────────────────────

describe('AgDSContentBleed', () => {
  const wrapInSection = (bleedProps = {}, slotContent = '<img src="x.jpg" alt="Hero">') =>
    defineComponent({
      components: { AgDSSectionContent, AgDSContentBleed },
      setup: () => ({ bleedProps }),
      template: `
        <AgDSSectionContent>
          <AgDSContentBleed v-bind="bleedProps">${slotContent}</AgDSContentBleed>
        </AgDSSectionContent>
      `,
    })

  const wrapInPage = (bleedProps = {}) =>
    defineComponent({
      components: { AgDSPageContent, AgDSContentBleed },
      setup: () => ({ bleedProps }),
      template: `
        <AgDSPageContent>
          <AgDSContentBleed v-bind="bleedProps"><img src="x.jpg" alt="Hero"></AgDSContentBleed>
        </AgDSPageContent>
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
    const { container } = render(AgDSContentBleed, {
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
        components: { AgDSSectionContent, AgDSContentBleed },
        template: `
          <AgDSSectionContent>
            <AgDSContentBleed><img src="x.jpg"></AgDSContentBleed>
          </AgDSSectionContent>
        `,
      }),
    )
    await expect(runAxe(container)).rejects.toThrow()
  })
})
