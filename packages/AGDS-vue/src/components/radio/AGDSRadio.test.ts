import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSRadio from './AGDSRadio.vue'
import AgDSRadioGroup from './AGDSRadioGroup.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderRadio(props: Record<string, unknown> = {}, slot = 'Option A') {
  return render(AgDSRadio, { props, slots: { default: slot } })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSRadio — rendering', () => {
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

describe('AgDSRadio — size prop', () => {
  it.each(['sm', 'md'] as const)('applies agds-radio--%s class', (size) => {
    const { container } = renderRadio({ size })
    expect(container.querySelector(`.agds-radio--${size}`)).toBeTruthy()
  })
})

// ─── Props: modelValue / value (checked state) ───────────────────────────────

describe('AgDSRadio — checked state', () => {
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

describe('AgDSRadio — disabled prop', () => {
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

describe('AgDSRadio — invalid prop', () => {
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

describe('AgDSRadio — required prop', () => {
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

describe('AgDSRadio — events', () => {
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

describe('AgDSRadio — inside AgDSRadioGroup', () => {
  function renderGroup(groupProps: Record<string, unknown> = {}) {
    return render({
      components: { AgDSRadioGroup, AgDSRadio },
      template: `
        <AgDSRadioGroup v-bind="groupProps" legend="Options">
          <AgDSRadio id="opt-a" value="a">Option A</AgDSRadio>
          <AgDSRadio id="opt-b" value="b">Option B</AgDSRadio>
        </AgDSRadioGroup>
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
      components: { AgDSRadioGroup, AgDSRadio },
      template: `
        <AgDSRadioGroup :invalid="true" legend="Options" messageId="err">
          <template #message>Please select an option</template>
          <AgDSRadio value="a">Option A</AgDSRadio>
        </AgDSRadioGroup>
      `,
    })
    expect(getByText('Please select an option')).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ─────────────────────────────────────────────────

describe('AgDSRadio — axe accessibility', () => {
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
      components: { AgDSRadioGroup, AgDSRadio },
      template: `
        <AgDSRadioGroup legend="Options" name="opts">
          <AgDSRadio id="r1" value="a">Option A</AgDSRadio>
          <AgDSRadio id="r2" value="b">Option B</AgDSRadio>
        </AgDSRadioGroup>
      `,
    })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when radio has no accessible name', async () => {
    // Verifies the a11y helper catches real failures.
    const { container } = render(AgDSRadio, { slots: { default: '' } })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
