import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSFileUpload from './AGDSFileUpload.vue'
import type { FileWithStatus, ExistingFile } from './utils'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderUpload(props: Record<string, unknown> = {}) {
  return render(AGDSFileUpload, {
    props: { label: 'Upload documents', modelValue: [], ...props },
  })
}

function makeFile(name: string, type = 'application/pdf', size = 1000): FileWithStatus {
  return new File(['x'.repeat(size)], name, { type }) as FileWithStatus
}

/** Simulate dropping files onto the dropzone. */
async function dropFiles(dropzone: Element, files: File[]) {
  const dataTransfer = { files }
  await fireEvent.dragEnter(dropzone, { dataTransfer })
  await fireEvent.drop(dropzone, { dataTransfer })
}

/** Simulate selecting files via the hidden input. */
async function selectFiles(container: HTMLElement, files: File[]) {
  const input = container.querySelector('input[type="file"]') as HTMLInputElement
  Object.defineProperty(input, 'files', { value: files, configurable: true })
  await fireEvent.change(input)
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSFileUpload — rendering', () => {
  it('renders a trigger button', () => {
    const { getByRole } = renderUpload()
    expect(getByRole('button', { name: /Select file/ })).toBeTruthy()
  })

  it('renders the field label', () => {
    const { getByText } = renderUpload()
    expect(getByText('Upload documents')).toBeTruthy()
  })

  it('renders a visually hidden native file input', () => {
    const { container } = renderUpload()
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toBeTruthy()
    expect(input.getAttribute('aria-hidden')).toBe('true')
    expect(input.tabIndex).toBe(-1)
  })

  it('renders hint text', () => {
    const { getByText } = renderUpload({ hint: 'Max 10 MB' })
    expect(getByText('Max 10 MB')).toBeTruthy()
  })

  it('renders error message when invalid', () => {
    const { getByText } = renderUpload({ invalid: true, message: 'File required' })
    expect(getByText('File required')).toBeTruthy()
  })

  it('renders "multiple" drag text when multiple=true', () => {
    const { getByText } = renderUpload({ multiple: true })
    expect(getByText(/Drag and drop files here/)).toBeTruthy()
  })

  it('renders "single" drag text by default', () => {
    const { getByText } = renderUpload()
    expect(getByText(/Drag and drop a file/)).toBeTruthy()
  })

  it('renders max size description when maxSize is provided', () => {
    const { getByText } = renderUpload({ maxSize: 5000 })
    expect(getByText(/cannot exceed/)).toBeTruthy()
  })

  it('renders accepted files description when accept is provided', () => {
    const { getByText } = renderUpload({ accept: ['application/pdf'] })
    expect(getByText(/Files accepted/)).toBeTruthy()
  })
})

// ─── Props: disabled ──────────────────────────────────────────────────────────

describe('AGDSFileUpload — disabled prop', () => {
  it('disables the trigger button', () => {
    const { getByRole } = renderUpload({ disabled: true })
    expect((getByRole('button', { name: /Select file/ }) as HTMLButtonElement).disabled).toBe(true)
  })

  it('disables the hidden native input', () => {
    const { container } = renderUpload({ disabled: true })
    expect((container.querySelector('input[type="file"]') as HTMLInputElement).disabled).toBe(true)
  })
})

// ─── File selection via hidden input ──────────────────────────────────────────

describe('AGDSFileUpload — file selection', () => {
  it('emits update:modelValue with the selected file', async () => {
    const { container, emitted } = renderUpload()
    await selectFiles(container, [makeFile('report.pdf')])
    const updates = emitted()['update:modelValue'] as FileWithStatus[][]
    expect(updates[0][0][0].name).toBe('report.pdf')
  })

  it('shows selected file in the file list after selection', async () => {
    const { container, getByText } = render(AGDSFileUpload, {
      props: { label: 'Upload', modelValue: [makeFile('report.pdf')] },
    })
    expect(getByText('report.pdf')).toBeTruthy()
  })

  it('shows file count summary when files are selected', () => {
    const { getByText } = render(AGDSFileUpload, {
      props: { label: 'Upload', modelValue: [makeFile('a.pdf'), makeFile('b.pdf')] },
    })
    expect(getByText('2 files selected')).toBeTruthy()
  })

  it('replaces the file in single mode', async () => {
    const existing = makeFile('old.pdf')
    const { container, emitted } = render(AGDSFileUpload, {
      props: { label: 'Upload', modelValue: [existing] },
    })
    await selectFiles(container, [makeFile('new.pdf')])
    const updates = emitted()['update:modelValue'] as FileWithStatus[][]
    expect(updates[0][0]).toHaveLength(1)
    expect(updates[0][0][0].name).toBe('new.pdf')
  })
})

// ─── File removal ─────────────────────────────────────────────────────────────

describe('AGDSFileUpload — file removal', () => {
  it('emits update:modelValue with file removed when Remove is clicked', async () => {
    const file = makeFile('report.pdf')
    const { getByRole, emitted } = render(AGDSFileUpload, {
      props: { label: 'Upload', modelValue: [file] },
    })
    await fireEvent.click(getByRole('button', { name: /Remove file: report.pdf/ }))
    const updates = emitted()['update:modelValue'] as FileWithStatus[][]
    expect(updates[0][0]).toHaveLength(0)
  })

  it('emits remove-existing-file when an existing file Remove button is clicked', async () => {
    const existingFile: ExistingFile = { name: 'existing.pdf' }
    const { getByRole, emitted } = render(AGDSFileUpload, {
      props: { label: 'Upload', modelValue: [], existingFiles: [existingFile] },
    })
    await fireEvent.click(getByRole('button', { name: /Remove file: existing.pdf/ }))
    expect(emitted()['remove-existing-file']).toHaveLength(1)
    expect((emitted()['remove-existing-file'] as ExistingFile[][])[0][0]).toEqual(existingFile)
  })
})

// ─── Rejection errors ─────────────────────────────────────────────────────────

describe('AGDSFileUpload — rejection errors', () => {
  it('shows an error panel when a file exceeds maxSize', async () => {
    const { container, findByRole } = renderUpload({ maxSize: 1 }) // 1 KB limit
    await selectFiles(container, [makeFile('big.pdf', 'application/pdf', 5000)])
    const alert = await findByRole('alert')
    expect(alert).toBeTruthy()
    expect(alert.textContent).toContain('big.pdf')
  })

  it('shows an error panel when file type is not accepted', async () => {
    const { container, findByRole } = renderUpload({ accept: ['image/png'] })
    await selectFiles(container, [makeFile('doc.pdf', 'application/pdf')])
    const alert = await findByRole('alert')
    expect(alert.textContent).toContain('doc.pdf')
  })

  it('dismisses the error panel when close button is clicked', async () => {
    const { container, findByRole, queryByRole } = renderUpload({ accept: ['image/png'] })
    await selectFiles(container, [makeFile('doc.pdf', 'application/pdf')])
    const closeBtn = await findByRole('button', { name: 'Dismiss error' })
    await fireEvent.click(closeBtn)
    expect(queryByRole('alert')).toBeNull()
  })
})

// ─── Drag and drop ────────────────────────────────────────────────────────────

describe('AGDSFileUpload — drag and drop', () => {
  it('emits update:modelValue when files are dropped', async () => {
    const { container, emitted } = renderUpload()
    const dropzone = container.querySelector('.agds-file-upload__dropzone')!
    await dropFiles(dropzone, [makeFile('dropped.pdf')])
    const updates = emitted()['update:modelValue'] as FileWithStatus[][]
    expect(updates[0][0][0].name).toBe('dropped.pdf')
  })

  it('applies drag-active class on dragenter', async () => {
    const { container } = renderUpload()
    const dropzone = container.querySelector('.agds-file-upload__dropzone')!
    await fireEvent.dragEnter(dropzone, { dataTransfer: { files: [] } })
    expect(dropzone.classList.contains('agds-file-upload__dropzone--drag-active')).toBe(true)
  })

  it('removes drag-active class on drop', async () => {
    const { container } = renderUpload()
    const dropzone = container.querySelector('.agds-file-upload__dropzone')!
    await fireEvent.dragEnter(dropzone, { dataTransfer: { files: [] } })
    await fireEvent.drop(dropzone, { dataTransfer: { files: [] } })
    expect(dropzone.classList.contains('agds-file-upload__dropzone--drag-active')).toBe(false)
  })
})

// ─── maxFiles ─────────────────────────────────────────────────────────────────

describe('AGDSFileUpload — maxFiles', () => {
  it('rejects files beyond maxFiles and emits an error panel', async () => {
    const { container, findByRole } = renderUpload({ multiple: true, maxFiles: 2 })
    await selectFiles(container, [
      makeFile('a.pdf'), makeFile('b.pdf'), makeFile('c.pdf'),
    ])
    const alert = await findByRole('alert')
    expect(alert.textContent).toContain('c.pdf')
  })
})

// ─── Existing files ───────────────────────────────────────────────────────────

describe('AGDSFileUpload — existing files', () => {
  it('renders existing file names', () => {
    const { getByText } = render(AGDSFileUpload, {
      props: {
        label: 'Upload',
        modelValue: [],
        existingFiles: [{ name: 'server-file.pdf' }],
      },
    })
    expect(getByText('server-file.pdf')).toBeTruthy()
  })

  it('renders existing files list with accessible label', () => {
    const { getByRole } = render(AGDSFileUpload, {
      props: {
        label: 'Upload',
        modelValue: [],
        existingFiles: [{ name: 'server-file.pdf' }],
      },
    })
    expect(getByRole('list', { name: 'Existing files' })).toBeTruthy()
  })
})

// ─── Button click triggers file picker ───────────────────────────────────────

describe('AGDSFileUpload — button click triggers file picker', () => {
  it('calls click() on the hidden input when the button is clicked', async () => {
    const { container, getByRole } = renderUpload()
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const clickSpy = vi.spyOn(input, 'click')
    await fireEvent.click(getByRole('button', { name: /Select file/ }))
    expect(clickSpy).toHaveBeenCalledOnce()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSFileUpload — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderUpload()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid', async () => {
    const { container } = renderUpload({ invalid: true, message: 'File required' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderUpload({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when required', async () => {
    const { container } = renderUpload({ required: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when multiple=true', async () => {
    const { container } = renderUpload({ multiple: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with selected files', async () => {
    const { container } = render(AGDSFileUpload, {
      props: { label: 'Upload', modelValue: [makeFile('report.pdf')] },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with existing files', async () => {
    const { container } = render(AGDSFileUpload, {
      props: { label: 'Upload', modelValue: [], existingFiles: [{ name: 'server.pdf' }] },
    })
    await runAxe(container, AXE_OPTS)
  })
})
