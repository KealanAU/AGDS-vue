import { describe, it, expect } from 'vitest'
import { defineComponent, inject, ref } from 'vue'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSControlGroup from './AGDSControlGroup.vue'
import { CONTROL_GROUP_KEY } from './controlGroupContext'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderControlGroup(props: Record<string, unknown> = {}, slot?: string) {
  return render(AGDSControlGroup, {
    props,
    slots: slot ? { default: slot } : undefined,
  })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSControlGroup — rendering', () => {
  it('renders a fieldset', () => {
    const { container } = renderControlGroup({ label: 'Colours' })
    expect(container.querySelector('fieldset')).toBeTruthy()
  })

  it('renders a legend with the label text', () => {
    const { container } = renderControlGroup({ label: 'Colours' })
    const legend = container.querySelector('legend')
    expect(legend?.textContent).toContain('Colours')
  })

  it('does not render a legend when label is omitted', () => {
    const { container } = renderControlGroup()
    expect(container.querySelector('legend')).toBeNull()
  })

  it('renders hint text when provided', () => {
    const { getByText } = renderControlGroup({ label: 'Colours', hint: 'Select all that apply' })
    expect(getByText('Select all that apply')).toBeTruthy()
  })

  it('renders an error message when invalid=true', () => {
    const { getByText } = renderControlGroup({
      label: 'Colours',
      invalid: true,
      message: 'Select at least one colour',
    })
    expect(getByText('Select at least one colour')).toBeTruthy()
  })

  it('does not render an error message when invalid=false', () => {
    const { queryByText } = renderControlGroup({
      label: 'Colours',
      message: 'Select at least one colour',
    })
    expect(queryByText('Select at least one colour')).toBeNull()
  })

  it('renders slot content', () => {
    const { getByText } = renderControlGroup({ label: 'Colours' }, '<span>Option A</span>')
    expect(getByText('Option A')).toBeTruthy()
  })
})

// ─── Props: required ──────────────────────────────────────────────────────────

describe('AGDSControlGroup — required prop', () => {
  it('appends "(optional)" to the legend when required=false (default)', () => {
    const { container } = renderControlGroup({ label: 'Colours' })
    const legend = container.querySelector('legend')
    expect(legend?.textContent).toContain('optional')
  })

  it('does not append "(optional)" when required=true', () => {
    const { container } = renderControlGroup({ label: 'Colours', required: true })
    const legend = container.querySelector('legend')
    expect(legend?.textContent).not.toContain('optional')
  })

  it('does not append "(optional)" when hideOptionalLabel=true', () => {
    const { container } = renderControlGroup({ label: 'Colours', hideOptionalLabel: true })
    const legend = container.querySelector('legend')
    expect(legend?.textContent).not.toContain('optional')
  })
})

// ─── aria-describedby ─────────────────────────────────────────────────────────

describe('AGDSControlGroup — aria-describedby', () => {
  it('sets aria-describedby when hint is provided', () => {
    const { container } = renderControlGroup({ label: 'Colours', hint: 'Pick one' })
    const fieldset = container.querySelector('fieldset')
    expect(fieldset?.getAttribute('aria-describedby')).toBeTruthy()
  })

  it('sets aria-describedby when invalid with a message', () => {
    const { container } = renderControlGroup({
      label: 'Colours',
      invalid: true,
      message: 'Required',
    })
    const fieldset = container.querySelector('fieldset')
    expect(fieldset?.getAttribute('aria-describedby')).toBeTruthy()
  })

  it('does not set aria-describedby when neither hint nor message is present', () => {
    const { container } = renderControlGroup({ label: 'Colours' })
    const fieldset = container.querySelector('fieldset')
    expect(fieldset?.getAttribute('aria-describedby')).toBeNull()
  })

  it('does not set aria-describedby for message when invalid=false', () => {
    const { container } = renderControlGroup({ label: 'Colours', message: 'Required' })
    const fieldset = container.querySelector('fieldset')
    expect(fieldset?.getAttribute('aria-describedby')).toBeNull()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSControlGroup — axe accessibility', () => {
  it('has no violations in the default state', async () => {
    const { container } = renderControlGroup({ label: 'Colours' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when required=true', async () => {
    const { container } = renderControlGroup({ label: 'Colours', required: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid with a message', async () => {
    const { container } = renderControlGroup({
      label: 'Colours',
      invalid: true,
      message: 'Select at least one colour',
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when hint is provided', async () => {
    const { container } = renderControlGroup({
      label: 'Colours',
      hint: 'Select all that apply',
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with labelled checkboxes in the slot', async () => {
    const { container } = renderControlGroup(
      { label: 'Colours', required: true },
      '<label><input type="checkbox" name="colours" value="red" /> Red</label>' +
      '<label><input type="checkbox" name="colours" value="blue" /> Blue</label>',
    )
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in the block layout', async () => {
    const { container } = renderControlGroup({ label: 'Colours', block: true })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when an unlabelled input is added', async () => {
    const { container } = renderControlGroup({ label: 'Colours' })
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    container.appendChild(input)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})

// ─── Context: messageId getter ────────────────────────────────────────────────

describe('AGDSControlGroup — context messageId getter', () => {
  it('provides messageId when invalid=true and message is set', () => {
    const captured = ref<string | undefined>(undefined)
    const Consumer = defineComponent({
      setup() {
        const ctx = inject(CONTROL_GROUP_KEY)
        captured.value = ctx?.messageId
        return () => null
      },
    })

    render({
      components: { AGDSControlGroup, Consumer },
      template: `
        <AGDSControlGroup label="Test" :invalid="true" message="Error msg">
          <Consumer />
        </AGDSControlGroup>
      `,
    })

    expect(captured.value).toBeTruthy()
  })

  it('messageId is undefined when invalid=false', () => {
    const captured = ref<string | undefined>('initial')
    const Consumer = defineComponent({
      setup() {
        const ctx = inject(CONTROL_GROUP_KEY)
        captured.value = ctx?.messageId
        return () => null
      },
    })

    render({
      components: { AGDSControlGroup, Consumer },
      template: `
        <AGDSControlGroup label="Test" :invalid="false" message="Error msg">
          <Consumer />
        </AGDSControlGroup>
      `,
    })

    expect(captured.value).toBeUndefined()
  })
})

// ─── AGDSControlGroup — id and name props ──────────────────────────────────

describe('AGDSControlGroup — id and name props', () => {
  it('uses the provided id for the container', () => {
    const { container } = renderControlGroup({ label: 'Colour', id: 'my-group' })
    expect(container.querySelector('#my-group')).toBeTruthy()
  })

  it('renders correctly when name prop is explicitly set', () => {
    const { container } = renderControlGroup(
      { label: 'Colour', name: 'colour-choice' },
      '<input type="checkbox" class="test-cb" />',
    )
    expect(container.querySelector('.agds-control-group')).toBeTruthy()
  })

  it('sets aria-describedby when both message and hint are provided with invalid=true', () => {
    const { container } = renderControlGroup({
      label: 'Colour',
      invalid: true,
      message: 'Select at least one',
      hint: 'Choose your favourite',
    })
    const fieldset = container.querySelector('fieldset')
    const describedBy = fieldset?.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    // Should include both message and hint IDs
    expect(describedBy?.split(' ').length).toBeGreaterThanOrEqual(2)
  })
})
