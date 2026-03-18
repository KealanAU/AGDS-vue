import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSFileInput from './AGDSFileInput.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderFileInput(props: Record<string, unknown> = {}) {
  return render(AGDSFileInput, {
    props: { label: 'Upload document', ...props },
  })
}

/** Simulate a file selection on the hidden native input. */
function selectFiles(container: HTMLElement, files: File[]) {
  const input = container.querySelector('input[type="file"]') as HTMLInputElement
  Object.defineProperty(input, 'files', {
    value: files,
    configurable: true,
  })
  return fireEvent.change(input)
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSFileInput — rendering', () => {
  it('renders a visible trigger button', () => {
    const { getByRole } = renderFileInput()
    expect(getByRole('button')).toBeTruthy()
  })

  it('renders the field label', () => {
    const { getByText } = renderFileInput()
    expect(getByText('Upload document')).toBeTruthy()
  })

  it('label for= points to the button id', () => {
    const { getByRole, container } = renderFileInput({ id: 'my-upload' })
    const button = getByRole('button')
    const label = container.querySelector('label')
    expect(label?.getAttribute('for')).toBe(button.id)
    expect(button.id).toBe('my-upload')
  })

  it('auto-generates a button id when none is provided', () => {
    const { getByRole } = renderFileInput()
    expect(getByRole('button').id).toMatch(/^agds-file-input-/)
  })

  it('renders a visually hidden native file input', () => {
    const { container } = renderFileInput()
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toBeTruthy()
    expect(input.getAttribute('aria-hidden')).toBe('true')
    expect(input.tabIndex).toBe(-1)
  })

  it('shows the empty-state file name message', () => {
    const { getByText } = renderFileInput()
    expect(getByText('No file selected')).toBeTruthy()
  })

  it('shows "No files selected" when multiple=true', () => {
    const { getByText } = renderFileInput({ multiple: true })
    expect(getByText('No files selected')).toBeTruthy()
  })
})

// ─── Props: hint ──────────────────────────────────────────────────────────────

describe('AGDSFileInput — hint prop', () => {
  it('renders explicit hint text', () => {
    const { getByText } = renderFileInput({ hint: 'Maximum 10 MB' })
    expect(getByText('Maximum 10 MB')).toBeTruthy()
  })

  it('derives a hint from accept MIME types when no hint is provided', () => {
    const { getByText } = renderFileInput({ accept: ['application/pdf', 'image/png'] })
    expect(getByText('Files accepted: PDF, PNG')).toBeTruthy()
  })

  it('does not render a hint element when neither hint nor accept is provided', () => {
    const { container } = renderFileInput()
    expect(container.querySelector('.agds-file-input__hint')).toBeNull()
  })
})

// ─── Props: message ───────────────────────────────────────────────────────────

describe('AGDSFileInput — message prop', () => {
  it('renders a validation message', () => {
    const { getByText } = renderFileInput({ message: 'File is required' })
    expect(getByText('File is required')).toBeTruthy()
  })

  it('applies the invalid class to the message when invalid=true', () => {
    const { container } = renderFileInput({ message: 'Error', invalid: true })
    expect(container.querySelector('.agds-file-input__message--invalid')).toBeTruthy()
  })

  it('does not apply the invalid class when invalid=false', () => {
    const { container } = renderFileInput({ message: 'Info message', invalid: false })
    expect(container.querySelector('.agds-file-input__message--invalid')).toBeNull()
  })

  it('does not render a message element when message is not provided', () => {
    const { container } = renderFileInput()
    expect(container.querySelector('.agds-file-input__message')).toBeNull()
  })
})

// ─── Props: required / optional label ────────────────────────────────────────

describe('AGDSFileInput — optional label', () => {
  it('shows "(optional)" when required=false and hideOptionalLabel=false', () => {
    const { getByText } = renderFileInput({ required: false, hideOptionalLabel: false })
    expect(getByText('(optional)')).toBeTruthy()
  })

  it('hides "(optional)" when required=true', () => {
    const { queryByText } = renderFileInput({ required: true })
    expect(queryByText('(optional)')).toBeNull()
  })

  it('hides "(optional)" when hideOptionalLabel=true', () => {
    const { queryByText } = renderFileInput({ hideOptionalLabel: true })
    expect(queryByText('(optional)')).toBeNull()
  })
})

// ─── Props: disabled ──────────────────────────────────────────────────────────

describe('AGDSFileInput — disabled prop', () => {
  it('disables the trigger button', () => {
    const { getByRole } = renderFileInput({ disabled: true })
    expect((getByRole('button') as HTMLButtonElement).disabled).toBe(true)
  })

  it('disables the hidden native input', () => {
    const { container } = renderFileInput({ disabled: true })
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })
})

// ─── Props: accept ────────────────────────────────────────────────────────────

describe('AGDSFileInput — accept prop', () => {
  it('passes a plain string accept value to the native input', () => {
    const { container } = renderFileInput({ accept: '.pdf,.doc' })
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input.accept).toBe('.pdf,.doc')
  })

  it('joins an array of MIME types for the native input accept attribute', () => {
    const { container } = renderFileInput({ accept: ['application/pdf', 'image/png'] })
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input.accept).toBe('application/pdf,image/png')
  })
})

// ─── Props: multiple ──────────────────────────────────────────────────────────

describe('AGDSFileInput — multiple prop', () => {
  it('button label says "Select file" by default', () => {
    const { getByRole } = renderFileInput()
    expect(getByRole('button').getAttribute('aria-label')).toContain('Select file')
  })

  it('button label says "Select files" when multiple=true', () => {
    const { getByRole } = renderFileInput({ multiple: true })
    expect(getByRole('button').getAttribute('aria-label')).toContain('Select files')
  })

  it('sets the multiple attribute on the native input', () => {
    const { container } = renderFileInput({ multiple: true })
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input.multiple).toBe(true)
  })
})

// ─── Props: name ──────────────────────────────────────────────────────────────

describe('AGDSFileInput — name prop', () => {
  it('sets the name attribute on the native input', () => {
    const { container } = renderFileInput({ name: 'document' })
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input.name).toBe('document')
  })
})

// ─── Props: buttonSize ────────────────────────────────────────────────────────

describe('AGDSFileInput — buttonSize prop', () => {
  it('defaults to sm size', () => {
    const { getByRole } = renderFileInput()
    expect(getByRole('button').className).toContain('agds-button--sm')
  })

  it.each(['sm', 'md', 'lg'] as const)('passes size="%s" to the button', (buttonSize) => {
    const { getByRole } = renderFileInput({ buttonSize })
    expect(getByRole('button').className).toContain(`agds-button--${buttonSize}`)
  })
})

// ─── aria-label composition ───────────────────────────────────────────────────

describe('AGDSFileInput — button aria-label', () => {
  it('includes the button action, field label, and file state', () => {
    const { getByRole } = renderFileInput()
    const label = getByRole('button').getAttribute('aria-label') ?? ''
    expect(label).toContain('Select file')
    expect(label).toContain('Upload document')
    expect(label).toContain('No file selected')
  })

  it('includes "required" when required=true', () => {
    const { getByRole } = renderFileInput({ required: true })
    expect(getByRole('button').getAttribute('aria-label')).toContain('required')
  })

  it('includes "invalid" when invalid=true', () => {
    const { getByRole } = renderFileInput({ invalid: true })
    expect(getByRole('button').getAttribute('aria-label')).toContain('invalid')
  })

  it('includes "(optional)" when not required and not hidden', () => {
    const { getByRole } = renderFileInput()
    expect(getByRole('button').getAttribute('aria-label')).toContain('(optional)')
  })
})

// ─── File selection — display and aria-label update ───────────────────────────

describe('AGDSFileInput — file selection', () => {
  it('shows the single selected file name after selection', async () => {
    const { container, getByText } = renderFileInput()
    await selectFiles(container, [new File(['x'], 'report.pdf', { type: 'application/pdf' })])
    expect(getByText('report.pdf')).toBeTruthy()
  })

  it('updates the button aria-label to include the file name after selection', async () => {
    const { container, getByRole } = renderFileInput()
    await selectFiles(container, [new File(['x'], 'report.pdf', { type: 'application/pdf' })])
    expect(getByRole('button').getAttribute('aria-label')).toContain('report.pdf selected')
  })

  it('shows a count when multiple files are selected', async () => {
    const { container, getByText } = renderFileInput({ multiple: true })
    await selectFiles(container, [
      new File(['a'], 'a.pdf', { type: 'application/pdf' }),
      new File(['b'], 'b.pdf', { type: 'application/pdf' }),
    ])
    expect(getByText('2 files selected')).toBeTruthy()
  })

  it('applies the populated class after files are selected', async () => {
    const { container } = renderFileInput()
    await selectFiles(container, [new File(['x'], 'doc.pdf', { type: 'application/pdf' })])
    expect(container.querySelector('.agds-file-input__file-name--populated')).toBeTruthy()
  })
})

// ─── Events ───────────────────────────────────────────────────────────────────

describe('AGDSFileInput — events', () => {
  it('emits change when files are selected', async () => {
    const { container, emitted } = renderFileInput()
    await selectFiles(container, [new File(['x'], 'test.pdf')])
    expect(emitted().change).toHaveLength(1)
  })

  it('emits focus when the button receives focus', async () => {
    const { getByRole, emitted } = renderFileInput()
    await fireEvent.focus(getByRole('button'))
    expect(emitted().focus).toBeTruthy()
  })

  it('emits blur when the button loses focus', async () => {
    const { getByRole, emitted } = renderFileInput()
    await fireEvent.blur(getByRole('button'))
    expect(emitted().blur).toBeTruthy()
  })
})

// ─── Button triggers hidden input ─────────────────────────────────────────────

describe('AGDSFileInput — button click triggers hidden input', () => {
  it('calls click() on the hidden input when the button is clicked', async () => {
    const { container, getByRole } = renderFileInput()
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const clickSpy = vi.spyOn(input, 'click')
    await fireEvent.click(getByRole('button'))
    expect(clickSpy).toHaveBeenCalledOnce()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSFileInput — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderFileInput()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with hint text', async () => {
    const { container } = renderFileInput({ hint: 'PDF only, max 5 MB' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid with a message', async () => {
    const { container } = renderFileInput({ invalid: true, message: 'File is required' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderFileInput({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when required', async () => {
    const { container } = renderFileInput({ required: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when multiple=true', async () => {
    const { container } = renderFileInput({ multiple: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with MIME-type accept array', async () => {
    const { container } = renderFileInput({ accept: ['application/pdf', 'image/png'] })
    await runAxe(container, AXE_OPTS)
  })
})
