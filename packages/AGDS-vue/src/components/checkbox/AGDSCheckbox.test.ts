import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSCheckbox from './AGDSCheckbox.vue'
import AGDSCheckboxGroup from './AGDSCheckboxGroup.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderCheckbox(props: Record<string, unknown> = {}, slot = 'Accept terms') {
  return render(AGDSCheckbox, { props, slots: { default: slot } })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSCheckbox — rendering', () => {
  it('renders a checkbox input', () => {
    const { getByRole } = renderCheckbox()
    expect(getByRole('checkbox')).toBeTruthy()
  })

  it('renders the label text', () => {
    const { getByText } = renderCheckbox()
    expect(getByText('Accept terms')).toBeTruthy()
  })

  it('input is associated with label via id/for', () => {
    const { getByRole, getByText } = renderCheckbox()
    const input = getByRole('checkbox') as HTMLInputElement
    const label = getByText('Accept terms').closest('label')
    expect(label?.getAttribute('for')).toBe(input.id)
  })

  it('accepts a custom id', () => {
    const { getByRole } = renderCheckbox({ id: 'my-checkbox' })
    expect(getByRole('checkbox').id).toBe('my-checkbox')
  })

  it('applies md size class by default', () => {
    const { container } = renderCheckbox()
    expect(container.querySelector('.agds-checkbox--md')).toBeTruthy()
  })
})

// ─── Props: size ─────────────────────────────────────────────────────────────

describe('AGDSCheckbox — size prop', () => {
  it.each(['sm', 'md'] as const)('applies agds-checkbox--%s class', (size) => {
    const { container } = renderCheckbox({ size })
    expect(container.querySelector(`.agds-checkbox--${size}`)).toBeTruthy()
  })
})

// ─── Props: modelValue (v-model) ─────────────────────────────────────────────

describe('AGDSCheckbox — modelValue prop', () => {
  it('is unchecked by default', () => {
    const { getByRole } = renderCheckbox()
    expect((getByRole('checkbox') as HTMLInputElement).checked).toBe(false)
  })

  it('is checked when modelValue=true', () => {
    const { getByRole } = renderCheckbox({ modelValue: true })
    expect((getByRole('checkbox') as HTMLInputElement).checked).toBe(true)
  })
})

// ─── Props: disabled ─────────────────────────────────────────────────────────

describe('AGDSCheckbox — disabled prop', () => {
  it('is not disabled by default', () => {
    const { getByRole } = renderCheckbox()
    expect((getByRole('checkbox') as HTMLInputElement).disabled).toBe(false)
  })

  it('sets native disabled when disabled=true', () => {
    const { getByRole } = renderCheckbox({ disabled: true })
    expect((getByRole('checkbox') as HTMLInputElement).disabled).toBe(true)
  })

  it('applies disabled class on the label wrapper', () => {
    const { container } = renderCheckbox({ disabled: true })
    expect(container.querySelector('.agds-checkbox--disabled')).toBeTruthy()
  })

  it('applies disabled class on the label text', () => {
    const { container } = renderCheckbox({ disabled: true })
    expect(container.querySelector('.agds-checkbox__label--disabled')).toBeTruthy()
  })

  it('does not emit update:modelValue when disabled', async () => {
    const { getByRole, emitted } = renderCheckbox({ disabled: true })
    await fireEvent.click(getByRole('checkbox'))
    expect(emitted()['update:modelValue']).toBeUndefined()
  })
})

// ─── Props: indeterminate ────────────────────────────────────────────────────

describe('AGDSCheckbox — indeterminate prop', () => {
  it('sets aria-checked="mixed" when indeterminate', () => {
    const { getByRole } = renderCheckbox({ indeterminate: true })
    expect(getByRole('checkbox').getAttribute('aria-checked')).toBe('mixed')
  })

  it('does not set aria-checked when not indeterminate', () => {
    const { getByRole } = renderCheckbox()
    expect(getByRole('checkbox').getAttribute('aria-checked')).toBeNull()
  })

  it('renders the minus icon when indeterminate', () => {
    const { container } = renderCheckbox({ indeterminate: true })
    expect(container.querySelector('.agds-checkbox__icon--minus')).toBeTruthy()
    expect(container.querySelector('.agds-checkbox__icon--check')).toBeNull()
  })

  it('renders the check icon when not indeterminate', () => {
    const { container } = renderCheckbox()
    expect(container.querySelector('.agds-checkbox__icon--check')).toBeTruthy()
    expect(container.querySelector('.agds-checkbox__icon--minus')).toBeNull()
  })
})

// ─── Props: invalid ──────────────────────────────────────────────────────────

describe('AGDSCheckbox — invalid prop', () => {
  it('sets aria-invalid when invalid=true', () => {
    const { getByRole } = renderCheckbox({ invalid: true })
    expect(getByRole('checkbox').getAttribute('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid when not invalid', () => {
    const { getByRole } = renderCheckbox()
    expect(getByRole('checkbox').getAttribute('aria-invalid')).toBeNull()
  })

  it('applies invalid class to the indicator', () => {
    const { container } = renderCheckbox({ invalid: true })
    expect(container.querySelector('.agds-checkbox__indicator--invalid')).toBeTruthy()
  })
})

// ─── Props: required ─────────────────────────────────────────────────────────

describe('AGDSCheckbox — required prop', () => {
  it('sets aria-required when required=true', () => {
    const { getByRole } = renderCheckbox({ required: true })
    expect(getByRole('checkbox').getAttribute('aria-required')).toBe('true')
  })

  it('does not set aria-required when not required', () => {
    const { getByRole } = renderCheckbox()
    expect(getByRole('checkbox').getAttribute('aria-required')).toBeNull()
  })
})

// ─── Events ──────────────────────────────────────────────────────────────────

describe('AGDSCheckbox — events', () => {
  it('emits update:modelValue with true when checked', async () => {
    const { getByRole, emitted } = renderCheckbox({ modelValue: false })
    await fireEvent.click(getByRole('checkbox'))
    expect(emitted()['update:modelValue']).toBeTruthy()
    expect(emitted()['update:modelValue'][0]).toEqual([true])
  })

  it('emits update:modelValue with false when unchecked', async () => {
    const { getByRole, emitted } = renderCheckbox({ modelValue: true })
    await fireEvent.click(getByRole('checkbox'))
    expect(emitted()['update:modelValue'][0]).toEqual([false])
  })

  it('emits change event', async () => {
    const { getByRole, emitted } = renderCheckbox()
    await fireEvent.click(getByRole('checkbox'))
    expect(emitted().change).toBeTruthy()
  })

  it('emits focus event', async () => {
    const { getByRole, emitted } = renderCheckbox()
    await fireEvent.focus(getByRole('checkbox'))
    expect(emitted().focus).toBeTruthy()
  })

  it('emits blur event', async () => {
    const { getByRole, emitted } = renderCheckbox()
    await fireEvent.blur(getByRole('checkbox'))
    expect(emitted().blur).toBeTruthy()
  })
})

// ─── CheckboxGroup — group-level props ───────────────────────────────────────

describe('AGDSCheckboxGroup — group-level props', () => {
  it('renders without a legend when legend prop is omitted', () => {
    const { container } = render({
      components: { AGDSCheckboxGroup, AGDSCheckbox },
      template: `
        <AGDSCheckboxGroup>
          <AGDSCheckbox id="c1">Option A</AGDSCheckbox>
        </AGDSCheckboxGroup>
      `,
    })
    expect(container.querySelector('legend')).toBeNull()
  })

  it('shows required indicator when required=true', () => {
    const { container } = render({
      components: { AGDSCheckboxGroup, AGDSCheckbox },
      template: `
        <AGDSCheckboxGroup legend="Colours" :required="true">
          <AGDSCheckbox id="c1">Red</AGDSCheckbox>
        </AGDSCheckboxGroup>
      `,
    })
    expect(container.querySelector('.agds-checkbox-group__required')).toBeTruthy()
  })

  it('shows hint text when hint prop is provided', () => {
    const { getByText } = render({
      components: { AGDSCheckboxGroup, AGDSCheckbox },
      template: `
        <AGDSCheckboxGroup legend="Colours" hint="Select all that apply">
          <AGDSCheckbox id="c1">Red</AGDSCheckbox>
        </AGDSCheckboxGroup>
      `,
    })
    expect(getByText('Select all that apply')).toBeTruthy()
  })

  it('shows error message via message prop when invalid', () => {
    const { getByText } = render({
      components: { AGDSCheckboxGroup, AGDSCheckbox },
      template: `
        <AGDSCheckboxGroup legend="Colours" :invalid="true" message="Select at least one colour">
          <AGDSCheckbox id="c1">Red</AGDSCheckbox>
        </AGDSCheckboxGroup>
      `,
    })
    expect(getByText('Select at least one colour')).toBeTruthy()
  })
})

// ─── Group context ───────────────────────────────────────────────────────────

describe('AGDSCheckbox — inside AGDSCheckboxGroup', () => {
  function renderGroup(groupProps: Record<string, unknown> = {}) {
    return render({
      components: { AGDSCheckboxGroup, AGDSCheckbox },
      template: `
        <AGDSCheckboxGroup v-bind="groupProps" legend="Options">
          <AGDSCheckbox id="opt-a">Option A</AGDSCheckbox>
          <AGDSCheckbox id="opt-b">Option B</AGDSCheckbox>
        </AGDSCheckboxGroup>
      `,
      data() { return { groupProps } },
    })
  }

  it('renders a fieldset with legend', () => {
    const { getByRole } = renderGroup()
    expect(getByRole('group', { name: 'Options' })).toBeTruthy()
  })

  it('disables all checkboxes when group is disabled', () => {
    const { getAllByRole } = renderGroup({ disabled: true })
    getAllByRole('checkbox').forEach((cb) => {
      expect((cb as HTMLInputElement).disabled).toBe(true)
    })
  })

  it('marks all checkboxes invalid when group is invalid', () => {
    const { getAllByRole } = renderGroup({ invalid: true })
    getAllByRole('checkbox').forEach((cb) => {
      expect(cb.getAttribute('aria-invalid')).toBe('true')
    })
  })

  it('propagates name to all checkboxes', () => {
    const { getAllByRole } = renderGroup({ name: 'options' })
    getAllByRole('checkbox').forEach((cb) => {
      expect((cb as HTMLInputElement).name).toBe('options')
    })
  })

  it('links checkboxes to messageId via aria-describedby when invalid', () => {
    const { getAllByRole } = renderGroup({ invalid: true, messageId: 'group-error' })
    getAllByRole('checkbox').forEach((cb) => {
      expect(cb.getAttribute('aria-describedby')).toBe('group-error')
    })
  })

  it('shows the error message slot when invalid', () => {
    const { getByText } = render({
      components: { AGDSCheckboxGroup, AGDSCheckbox },
      template: `
        <AGDSCheckboxGroup :invalid="true" legend="Options" messageId="err">
          <template #message>Please select at least one option</template>
          <AGDSCheckbox>Option A</AGDSCheckbox>
        </AGDSCheckboxGroup>
      `,
    })
    expect(getByText('Please select at least one option')).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ─────────────────────────────────────────────────

describe('AGDSCheckbox — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderCheckbox()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when checked', async () => {
    const { container } = renderCheckbox({ modelValue: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderCheckbox({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid', async () => {
    const { container } = renderCheckbox({ invalid: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when indeterminate', async () => {
    const { container } = renderCheckbox({ indeterminate: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for size=sm', async () => {
    const { container } = renderCheckbox({ size: 'sm' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in a group', async () => {
    const { container } = render({
      components: { AGDSCheckboxGroup, AGDSCheckbox },
      template: `
        <AGDSCheckboxGroup legend="Options">
          <AGDSCheckbox id="c1">Option A</AGDSCheckbox>
          <AGDSCheckbox id="c2">Option B</AGDSCheckbox>
        </AGDSCheckboxGroup>
      `,
    })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when checkbox has no accessible name', async () => {
    // Verifies the a11y helper catches real failures.
    const { container } = render(AGDSCheckbox, { slots: { default: '' } })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
