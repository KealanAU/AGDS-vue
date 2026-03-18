import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSRadio from './AGDSRadio.vue'
import AGDSRadioGroup from './AGDSRadioGroup.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderRadio(props: Record<string, unknown> = {}, slot = 'Option A') {
  return render(AGDSRadio, { props, slots: { default: slot } })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSRadio — rendering', () => {
  it('renders a radio input', () => {
    const { getByRole } = renderRadio()
    expect(getByRole('radio')).toBeTruthy()
  })

  it('renders the label text', () => {
    const { getByText } = renderRadio()
    expect(getByText('Option A')).toBeTruthy()
  })

  it('input is associated with label via id/for', () => {
    const { getByRole, getByText } = renderRadio()
    const input = getByRole('radio') as HTMLInputElement
    const label = getByText('Option A').closest('label')
    expect(label?.getAttribute('for')).toBe(input.id)
  })

  it('accepts a custom id', () => {
    const { getByRole } = renderRadio({ id: 'my-radio' })
    expect(getByRole('radio').id).toBe('my-radio')
  })

  it('applies md size class by default', () => {
    const { container } = renderRadio()
    expect(container.querySelector('.agds-radio--md')).toBeTruthy()
  })

  it('renders type="radio" on the input', () => {
    const { getByRole } = renderRadio()
    expect((getByRole('radio') as HTMLInputElement).type).toBe('radio')
  })
})

// ─── Props: size ─────────────────────────────────────────────────────────────

describe('AGDSRadio — size prop', () => {
  it.each(['sm', 'md'] as const)('applies agds-radio--%s class', (size) => {
    const { container } = renderRadio({ size })
    expect(container.querySelector(`.agds-radio--${size}`)).toBeTruthy()
  })
})

// ─── Props: modelValue / value (checked state) ───────────────────────────────

describe('AGDSRadio — checked state', () => {
  it('is unchecked when modelValue does not match value', () => {
    const { getByRole } = renderRadio({ modelValue: 'b', value: 'a' })
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(false)
  })

  it('is checked when modelValue matches value', () => {
    const { getByRole } = renderRadio({ modelValue: 'a', value: 'a' })
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(true)
  })
})

// ─── Props: disabled ─────────────────────────────────────────────────────────

describe('AGDSRadio — disabled prop', () => {
  it('is not disabled by default', () => {
    const { getByRole } = renderRadio()
    expect((getByRole('radio') as HTMLInputElement).disabled).toBe(false)
  })

  it('sets native disabled when disabled=true', () => {
    const { getByRole } = renderRadio({ disabled: true })
    expect((getByRole('radio') as HTMLInputElement).disabled).toBe(true)
  })

  it('applies disabled class on the label wrapper', () => {
    const { container } = renderRadio({ disabled: true })
    expect(container.querySelector('.agds-radio--disabled')).toBeTruthy()
  })

  it('applies disabled class on the label text', () => {
    const { container } = renderRadio({ disabled: true })
    expect(container.querySelector('.agds-radio__label--disabled')).toBeTruthy()
  })

  it('does not emit update:modelValue when disabled', async () => {
    const { getByRole, emitted } = renderRadio({ disabled: true, value: 'a' })
    await fireEvent.click(getByRole('radio'))
    expect(emitted()['update:modelValue']).toBeUndefined()
  })
})

// ─── Props: invalid ──────────────────────────────────────────────────────────

describe('AGDSRadio — invalid prop', () => {
  it('sets aria-invalid when invalid=true', () => {
    const { getByRole } = renderRadio({ invalid: true })
    expect(getByRole('radio').getAttribute('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid when not invalid', () => {
    const { getByRole } = renderRadio()
    expect(getByRole('radio').getAttribute('aria-invalid')).toBeNull()
  })

  it('applies invalid class to the indicator', () => {
    const { container } = renderRadio({ invalid: true })
    expect(container.querySelector('.agds-radio__indicator--invalid')).toBeTruthy()
  })
})

// ─── Props: required ─────────────────────────────────────────────────────────

describe('AGDSRadio — required prop', () => {
  it('sets aria-required when required=true', () => {
    const { getByRole } = renderRadio({ required: true })
    expect(getByRole('radio').getAttribute('aria-required')).toBe('true')
  })

  it('does not set aria-required when not required', () => {
    const { getByRole } = renderRadio()
    expect(getByRole('radio').getAttribute('aria-required')).toBeNull()
  })
})

// ─── Events ──────────────────────────────────────────────────────────────────

describe('AGDSRadio — events', () => {
  it('emits update:modelValue with the radio value when selected', async () => {
    const { getByRole, emitted } = renderRadio({ modelValue: 'b', value: 'a' })
    await fireEvent.click(getByRole('radio'))
    expect(emitted()['update:modelValue']).toBeTruthy()
    expect(emitted()['update:modelValue'][0]).toEqual(['a'])
  })

  it('emits change event', async () => {
    const { getByRole, emitted } = renderRadio({ value: 'a' })
    await fireEvent.click(getByRole('radio'))
    expect(emitted().change).toBeTruthy()
  })

  it('emits focus event', async () => {
    const { getByRole, emitted } = renderRadio()
    await fireEvent.focus(getByRole('radio'))
    expect(emitted().focus).toBeTruthy()
  })

  it('emits blur event', async () => {
    const { getByRole, emitted } = renderRadio()
    await fireEvent.blur(getByRole('radio'))
    expect(emitted().blur).toBeTruthy()
  })
})

// ─── Group context ───────────────────────────────────────────────────────────

describe('AGDSRadio — inside AGDSRadioGroup', () => {
  function renderGroup(groupProps: Record<string, unknown> = {}) {
    return render({
      components: { AGDSRadioGroup, AGDSRadio },
      template: `
        <AGDSRadioGroup v-bind="groupProps" legend="Options">
          <AGDSRadio id="opt-a" value="a">Option A</AGDSRadio>
          <AGDSRadio id="opt-b" value="b">Option B</AGDSRadio>
        </AGDSRadioGroup>
      `,
      data() { return { groupProps } },
    })
  }

  it('renders a fieldset with legend', () => {
    const { getByRole } = renderGroup()
    expect(getByRole('group', { name: 'Options' })).toBeTruthy()
  })

  it('disables all radios when group is disabled', () => {
    const { getAllByRole } = renderGroup({ disabled: true })
    getAllByRole('radio').forEach((r) => {
      expect((r as HTMLInputElement).disabled).toBe(true)
    })
  })

  it('marks all radios invalid when group is invalid', () => {
    const { getAllByRole } = renderGroup({ invalid: true })
    getAllByRole('radio').forEach((r) => {
      expect(r.getAttribute('aria-invalid')).toBe('true')
    })
  })

  it('propagates name to all radios', () => {
    const { getAllByRole } = renderGroup({ name: 'options' })
    getAllByRole('radio').forEach((r) => {
      expect((r as HTMLInputElement).name).toBe('options')
    })
  })

  it('links radios to messageId via aria-describedby when invalid', () => {
    const { getAllByRole } = renderGroup({ invalid: true, messageId: 'group-error' })
    getAllByRole('radio').forEach((r) => {
      expect(r.getAttribute('aria-describedby')).toBe('group-error')
    })
  })

  it('shows the error message slot when invalid', () => {
    const { getByText } = render({
      components: { AGDSRadioGroup, AGDSRadio },
      template: `
        <AGDSRadioGroup :invalid="true" legend="Options" messageId="err">
          <template #message>Please select an option</template>
          <AGDSRadio value="a">Option A</AGDSRadio>
        </AGDSRadioGroup>
      `,
    })
    expect(getByText('Please select an option')).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ─────────────────────────────────────────────────

describe('AGDSRadio — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderRadio()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when checked', async () => {
    const { container } = renderRadio({ modelValue: 'a', value: 'a' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderRadio({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid', async () => {
    const { container } = renderRadio({ invalid: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for size=sm', async () => {
    const { container } = renderRadio({ size: 'sm' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in a group', async () => {
    const { container } = render({
      components: { AGDSRadioGroup, AGDSRadio },
      template: `
        <AGDSRadioGroup legend="Options" name="opts">
          <AGDSRadio id="r1" value="a">Option A</AGDSRadio>
          <AGDSRadio id="r2" value="b">Option B</AGDSRadio>
        </AGDSRadioGroup>
      `,
    })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when radio has no accessible name', async () => {
    // Verifies the a11y helper catches real failures.
    const { container } = render(AGDSRadio, { slots: { default: '' } })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
