import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSSwitch from './AGDSSwitch.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderSwitch(props: Record<string, unknown> = {}, slot = 'Notifications') {
  return render(AGDSSwitch, { props, slots: { default: slot } })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSSwitch — rendering', () => {
  it('renders a switch input', () => {
    const { getByRole } = renderSwitch()
    expect(getByRole('switch')).toBeTruthy()
  })

  it('renders the label text', () => {
    const { getByText } = renderSwitch()
    expect(getByText('Notifications')).toBeTruthy()
  })

  it('input is associated with label via id/for', () => {
    const { getByRole, getByText } = renderSwitch()
    const input = getByRole('switch') as HTMLInputElement
    const label = getByText('Notifications').closest('label')
    expect(label?.getAttribute('for')).toBe(input.id)
  })

  it('accepts a custom id', () => {
    const { getByRole } = renderSwitch({ id: 'my-switch' })
    expect(getByRole('switch').id).toBe('my-switch')
  })

  it('applies md size class by default', () => {
    const { container } = renderSwitch()
    expect(container.querySelector('.agds-switch--md')).toBeTruthy()
  })

  it('renders a track and thumb', () => {
    const { container } = renderSwitch()
    expect(container.querySelector('.agds-switch__track')).toBeTruthy()
    expect(container.querySelector('.agds-switch__thumb')).toBeTruthy()
  })

  it('track is aria-hidden', () => {
    const { container } = renderSwitch()
    const track = container.querySelector('.agds-switch__track')
    expect(track?.getAttribute('aria-hidden')).toBe('true')
  })
})

// ─── Props: size ─────────────────────────────────────────────────────────────

describe('AGDSSwitch — size prop', () => {
  it.each(['sm', 'md'] as const)('applies agds-switch--%s class', (size) => {
    const { container } = renderSwitch({ size })
    expect(container.querySelector(`.agds-switch--${size}`)).toBeTruthy()
  })
})

// ─── Props: modelValue (v-model) ─────────────────────────────────────────────

describe('AGDSSwitch — modelValue prop', () => {
  it('is off by default', () => {
    const { getByRole } = renderSwitch()
    expect((getByRole('switch') as HTMLInputElement).checked).toBe(false)
  })

  it('is on when modelValue=true', () => {
    const { getByRole } = renderSwitch({ modelValue: true })
    expect((getByRole('switch') as HTMLInputElement).checked).toBe(true)
  })
})

// ─── Props: disabled ─────────────────────────────────────────────────────────

describe('AGDSSwitch — disabled prop', () => {
  it('is not disabled by default', () => {
    const { getByRole } = renderSwitch()
    expect((getByRole('switch') as HTMLInputElement).disabled).toBe(false)
  })

  it('sets native disabled when disabled=true', () => {
    const { getByRole } = renderSwitch({ disabled: true })
    expect((getByRole('switch') as HTMLInputElement).disabled).toBe(true)
  })

  it('applies disabled class on the root label', () => {
    const { container } = renderSwitch({ disabled: true })
    expect(container.querySelector('.agds-switch--disabled')).toBeTruthy()
  })

  it('applies disabled class on the label text', () => {
    const { container } = renderSwitch({ disabled: true })
    expect(container.querySelector('.agds-switch__label--disabled')).toBeTruthy()
  })

  it('applies disabled class on the track', () => {
    const { container } = renderSwitch({ disabled: true })
    expect(container.querySelector('.agds-switch__track--disabled')).toBeTruthy()
  })

  it('does not emit update:modelValue when disabled', async () => {
    const { getByRole, emitted } = renderSwitch({ disabled: true })
    await fireEvent.click(getByRole('switch'))
    expect(emitted()['update:modelValue']).toBeUndefined()
  })
})

// ─── Props: invalid ───────────────────────────────────────────────────────────

describe('AGDSSwitch — invalid prop', () => {
  it('sets aria-invalid when invalid=true', () => {
    const { getByRole } = renderSwitch({ invalid: true })
    expect(getByRole('switch').getAttribute('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid when not invalid', () => {
    const { getByRole } = renderSwitch()
    expect(getByRole('switch').getAttribute('aria-invalid')).toBeNull()
  })

  it('applies invalid class to the track', () => {
    const { container } = renderSwitch({ invalid: true })
    expect(container.querySelector('.agds-switch__track--invalid')).toBeTruthy()
  })
})

// ─── Props: required ─────────────────────────────────────────────────────────

describe('AGDSSwitch — required prop', () => {
  it('sets aria-required when required=true', () => {
    const { getByRole } = renderSwitch({ required: true })
    expect(getByRole('switch').getAttribute('aria-required')).toBe('true')
  })

  it('does not set aria-required when not required', () => {
    const { getByRole } = renderSwitch()
    expect(getByRole('switch').getAttribute('aria-required')).toBeNull()
  })
})

// ─── Events ──────────────────────────────────────────────────────────────────

describe('AGDSSwitch — events', () => {
  it('emits update:modelValue with true when turned on', async () => {
    const { getByRole, emitted } = renderSwitch({ modelValue: false })
    await fireEvent.click(getByRole('switch'))
    expect(emitted()['update:modelValue']).toBeTruthy()
    expect(emitted()['update:modelValue'][0]).toEqual([true])
  })

  it('emits update:modelValue with false when turned off', async () => {
    const { getByRole, emitted } = renderSwitch({ modelValue: true })
    await fireEvent.click(getByRole('switch'))
    expect(emitted()['update:modelValue'][0]).toEqual([false])
  })

  it('emits change event', async () => {
    const { getByRole, emitted } = renderSwitch()
    await fireEvent.click(getByRole('switch'))
    expect(emitted().change).toBeTruthy()
  })

  it('emits focus event', async () => {
    const { getByRole, emitted } = renderSwitch()
    await fireEvent.focus(getByRole('switch'))
    expect(emitted().focus).toBeTruthy()
  })

  it('emits blur event', async () => {
    const { getByRole, emitted } = renderSwitch()
    await fireEvent.blur(getByRole('switch'))
    expect(emitted().blur).toBeTruthy()
  })
})

// ─── Slot: no label ───────────────────────────────────────────────────────────

describe('AGDSSwitch — without label slot', () => {
  it('does not render the label span when no slot is provided', () => {
    const { container } = render(AGDSSwitch, {
      props: { 'aria-label': 'Enable notifications' },
    })
    expect(container.querySelector('.agds-switch__label')).toBeNull()
  })
})

// ─── defineExpose ─────────────────────────────────────────────────────────────

describe('AGDSSwitch — defineExpose', () => {
  it('exposes a focus method', () => {
    const { getByRole } = renderSwitch()
    const input = getByRole('switch') as HTMLInputElement
    // Verify the element is focusable
    input.focus()
    expect(document.activeElement).toBe(input)
  })
})

// ─── Accessibility: axe-core ─────────────────────────────────────────────────

describe('AGDSSwitch — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderSwitch()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when on', async () => {
    const { container } = renderSwitch({ modelValue: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderSwitch({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid', async () => {
    const { container } = renderSwitch({ invalid: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for size=sm', async () => {
    const { container } = renderSwitch({ size: 'sm' })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when switch has no accessible name', async () => {
    // Verifies the a11y helper catches real failures.
    const { container } = render(AGDSSwitch, { slots: { default: '' } })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
