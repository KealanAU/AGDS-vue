import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSField from './AGDSField.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderField(props: Record<string, unknown> = {}, slotContent = '<input v-bind="slotProps" />') {
  return render(AgDSField, {
    props: { label: 'Full name', ...props },
    slots: {
      default: `<template #default="slotProps">${slotContent}</template>`,
    },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSField — rendering', () => {
  it('renders a label', () => {
    const { getByText } = renderField()
    expect(getByText('Full name')).toBeTruthy()
  })

  it('appends "(optional)" when required is false', () => {
    const { getByText } = renderField({ required: false })
    expect(getByText('(optional)', { exact: false })).toBeTruthy()
  })

  it('does not append "(optional)" when required is true', () => {
    const { queryByText } = renderField({ required: true })
    expect(queryByText('(optional)', { exact: false })).toBeNull()
  })

  it('does not append "(optional)" when hideOptionalLabel is true', () => {
    const { queryByText } = renderField({ hideOptionalLabel: true })
    expect(queryByText('(optional)', { exact: false })).toBeNull()
  })

  it('prepends secondaryLabel to "(optional)"', () => {
    const { getByText } = renderField({ secondaryLabel: 'max 100 chars' })
    expect(getByText('max 100 chars (optional)', { exact: false })).toBeTruthy()
  })

  it('renders hint text', () => {
    const { getByText } = renderField({ hint: 'As it appears on your ID' })
    expect(getByText('As it appears on your ID')).toBeTruthy()
  })

  it('renders the error message when invalid', () => {
    const { getByText } = renderField({ invalid: true, message: 'Name is required' })
    expect(getByText('Name is required')).toBeTruthy()
  })

  it('does not render the error message when not invalid', () => {
    const { queryByText } = renderField({ invalid: false, message: 'Name is required' })
    expect(queryByText('Name is required')).toBeNull()
  })

  it('uses a custom id on the label htmlFor when provided', () => {
    const { container } = renderField({ id: 'my-field' })
    const label = container.querySelector('label')
    expect(label?.getAttribute('for')).toBe('my-field')
  })

  it('sets a custom labelId on the label element', () => {
    const { container } = renderField({ labelId: 'my-label' })
    const label = container.querySelector('label')
    expect(label?.id).toBe('my-label')
  })
})

// ─── Slot props (a11y props) ──────────────────────────────────────────────────

describe('AgDSField — slot a11y props', () => {
  it('passes aria-required=true when required', () => {
    const { container } = renderField({ required: true })
    const input = container.querySelector('input')
    expect(input?.getAttribute('aria-required')).toBe('true')
  })

  it('passes aria-invalid=true when invalid', () => {
    const { container } = renderField({ invalid: true })
    const input = container.querySelector('input')
    expect(input?.getAttribute('aria-invalid')).toBe('true')
  })

  it('passes aria-describedby referencing hint id when hint is set', () => {
    const { container } = renderField({ hint: 'Some hint' })
    const input = container.querySelector('input')
    const describedBy = input?.getAttribute('aria-describedby') ?? ''
    expect(describedBy).toContain('hint')
  })

  it('passes aria-describedby referencing message id when invalid + message', () => {
    const { container } = renderField({ invalid: true, message: 'Error' })
    const input = container.querySelector('input')
    const describedBy = input?.getAttribute('aria-describedby') ?? ''
    expect(describedBy).toContain('message')
  })

  it('does not set aria-describedby when no hint or message', () => {
    const { container } = renderField()
    const input = container.querySelector('input')
    expect(input?.getAttribute('aria-describedby')).toBeNull()
  })
})

// ─── Invalid state ────────────────────────────────────────────────────────────

describe('AgDSField — invalid state', () => {
  it('applies the invalid CSS modifier to the container', () => {
    const { container } = renderField({ invalid: true })
    expect(container.querySelector('.agds-field-container--invalid')).toBeTruthy()
  })

  it('does not apply the invalid modifier when not invalid', () => {
    const { container } = renderField()
    expect(container.querySelector('.agds-field-container--invalid')).toBeNull()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSField — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderField()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid with a message', async () => {
    const { container } = renderField({ invalid: true, message: 'Name is required' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when required', async () => {
    const { container } = renderField({ required: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when hint is set', async () => {
    const { container } = renderField({ hint: 'Enter your legal name' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for each maxWidth variant', async () => {
    for (const maxWidth of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      const { container } = renderField({ maxWidth })
      await runAxe(container, AXE_OPTS)
    }
  })

  it('has a violation when a label has no associated control', async () => {
    const { container } = render({ template: '<label>Orphan label</label>' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
