import { describe, it, expect, vi } from 'vitest'
import {
  formatFileSize,
  getFileListSummaryText,
  formatFileExtension,
  getAcceptedFilesSummary,
  getErrorSummary,
  validateFile,
  convertFileToTooManyFilesRejection,
  removeItemAtIndex,
  getImageThumbnail,
  ERROR_CODE_FILE_TOO_LARGE,
  ERROR_CODE_FILE_INVALID_TYPE,
  ERROR_CODE_TOO_MANY_FILES,
} from './utils'

// ─── formatFileSize ───────────────────────────────────────────────────────────

describe('formatFileSize', () => {
  it('returns "Unknown" for non-numeric input', () => {
    expect(formatFileSize('not-a-number')).toBe('Unknown')
  })

  it('returns "Unknown" for NaN', () => {
    expect(formatFileSize(NaN)).toBe('Unknown')
  })

  it('formats bytes', () => {
    expect(formatFileSize(500)).toBe('500 B')
  })

  it('formats kilobytes', () => {
    expect(formatFileSize(1000)).toBe('1 kB')
  })

  it('formats megabytes', () => {
    expect(formatFileSize(1_500_000)).toBe('1.5 MB')
  })

  it('formats gigabytes', () => {
    expect(formatFileSize(2_000_000_000)).toBe('2 GB')
  })

  it('handles negative values', () => {
    const result = formatFileSize(-500)
    expect(result).toContain('-500')
  })

  it('handles exactly 0 bytes', () => {
    // Math.log(0) = -Infinity, clamp brings exponent to 0
    const result = formatFileSize(0)
    expect(result).toBe('0 B')
  })

  it('handles a value at a unit boundary (1000 kB → 1 MB)', () => {
    // 1,000,000 bytes = 1000 kB; formatFileSize should show "1 MB"
    expect(formatFileSize(1_000_000)).toBe('1 MB')
  })
})

// ─── getFileListSummaryText ────────────────────────────────────────────────────

describe('getFileListSummaryText', () => {
  it('returns empty string when no files selected', () => {
    expect(getFileListSummaryText([])).toBe('')
  })

  it('returns singular form for 1 file', () => {
    expect(getFileListSummaryText([{}])).toBe('1 file selected')
  })

  it('returns plural form for multiple files', () => {
    expect(getFileListSummaryText([{}, {}])).toBe('2 files selected')
  })
})

// ─── formatFileExtension ──────────────────────────────────────────────────────

describe('formatFileExtension', () => {
  it('strips the leading dot and uppercases', () => {
    expect(formatFileExtension('.pdf')).toBe('PDF')
  })

  it('uppercases an extension without a dot', () => {
    expect(formatFileExtension('csv')).toBe('CSV')
  })
})

// ─── getAcceptedFilesSummary ──────────────────────────────────────────────────

describe('getAcceptedFilesSummary', () => {
  it('returns undefined when no acceptProp', () => {
    expect(getAcceptedFilesSummary()).toBeUndefined()
  })

  it('returns undefined for empty acceptProp array', () => {
    expect(getAcceptedFilesSummary([])).toBeUndefined()
  })

  it('formats known MIME types with extensions', () => {
    const result = getAcceptedFilesSummary(['application/pdf'])
    expect(result).toContain('PDF')
  })

  it('uses label when the MIME type mapping has a label', () => {
    // 'image/*' has label "Any image file"
    const result = getAcceptedFilesSummary(['image/*'])
    expect(result).toContain('Any image file')
  })

  it('handles custom MIME type objects with a label', () => {
    const result = getAcceptedFilesSummary([
      { mimeType: 'font/otf', extensions: ['.otf'], label: 'OTF font' },
    ])
    expect(result).toContain('OTF font')
  })

  it('handles custom MIME type objects with extensions (no label)', () => {
    const result = getAcceptedFilesSummary([
      { mimeType: 'font/otf', extensions: ['.otf'] },
    ])
    expect(result).toContain('OTF')
  })

  it('deduplicates repeated extensions', () => {
    // 'image/jpg' and 'image/jpeg' both map to .jpeg and .jpg
    const result = getAcceptedFilesSummary(['image/jpg', 'image/jpeg'])
    // The result should not contain duplicates
    const parts = result!.split(', ')
    expect(parts.length).toBe(new Set(parts).size)
  })
})

// ─── getErrorSummary ──────────────────────────────────────────────────────────

describe('getErrorSummary', () => {
  it('returns empty string for empty errors array', () => {
    expect(getErrorSummary([], '5 MB')).toBe('')
  })

  it('returns "Invalid file type" for file-invalid-type error', () => {
    const errors = [{ code: ERROR_CODE_FILE_INVALID_TYPE, message: 'Invalid type' }]
    expect(getErrorSummary(errors, '5 MB')).toBe('Invalid file type')
  })

  it('returns size message for file-too-large error', () => {
    const errors = [{ code: ERROR_CODE_FILE_TOO_LARGE, message: 'Too large' }]
    expect(getErrorSummary(errors, '5 MB')).toBe('File is over 5 MB')
  })

  it('returns too-many-files message for other errors', () => {
    const errors = [{ code: ERROR_CODE_TOO_MANY_FILES, message: 'Too many' }]
    expect(getErrorSummary(errors, '5 MB')).toBe('Too many files')
  })
})

// ─── validateFile ─────────────────────────────────────────────────────────────

describe('validateFile', () => {
  function makeFile(type: string, size = 100): File {
    return new File(['x'.repeat(size)], 'test.pdf', { type })
  }

  it('returns no errors when acceptMap is undefined', () => {
    const file = makeFile('image/png')
    expect(validateFile(file, undefined, 0)).toHaveLength(0)
  })

  it('returns no errors when file type matches exactly', () => {
    const file = makeFile('image/png')
    expect(validateFile(file, { 'image/png': ['.png'] }, 0)).toHaveLength(0)
  })

  it('returns invalid-type error when file type does not match', () => {
    const file = makeFile('image/png')
    const errors = validateFile(file, { 'application/pdf': ['.pdf'] }, 0)
    expect(errors.some((e) => e.code === ERROR_CODE_FILE_INVALID_TYPE)).toBe(true)
  })

  it('accepts file via wildcard category match (image/*)', () => {
    const file = makeFile('image/webp')
    expect(validateFile(file, { 'image/*': [] }, 0)).toHaveLength(0)
  })

  it('rejects file that does not match wildcard category', () => {
    const file = makeFile('application/pdf')
    const errors = validateFile(file, { 'image/*': [] }, 0)
    expect(errors.some((e) => e.code === ERROR_CODE_FILE_INVALID_TYPE)).toBe(true)
  })

  it('returns too-large error when file exceeds maxSizeBytes', () => {
    const file = makeFile('image/png', 1000)
    const errors = validateFile(file, undefined, 500)
    expect(errors.some((e) => e.code === ERROR_CODE_FILE_TOO_LARGE)).toBe(true)
  })

  it('returns no size error when maxSizeBytes is 0 (no limit)', () => {
    const file = makeFile('image/png', 999999)
    expect(validateFile(file, undefined, 0)).toHaveLength(0)
  })

  it('returns both type and size errors when both fail', () => {
    const file = makeFile('image/png', 10000)
    const errors = validateFile(file, { 'application/pdf': ['.pdf'] }, 1000)
    expect(errors).toHaveLength(2)
  })
})

// ─── convertFileToTooManyFilesRejection ───────────────────────────────────────

describe('convertFileToTooManyFilesRejection', () => {
  it('wraps a file with the too-many-files error', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' })
    const rejection = convertFileToTooManyFilesRejection(file)
    expect(rejection.file).toBe(file)
    expect(rejection.errors[0].code).toBe(ERROR_CODE_TOO_MANY_FILES)
  })
})

// ─── removeItemAtIndex ────────────────────────────────────────────────────────

describe('removeItemAtIndex', () => {
  it('removes the item at the given index', () => {
    expect(removeItemAtIndex(['a', 'b', 'c'], 1)).toEqual(['a', 'c'])
  })

  it('does not mutate the original array', () => {
    const original = ['a', 'b', 'c']
    removeItemAtIndex(original, 0)
    expect(original).toHaveLength(3)
  })
})

// ─── getImageThumbnail ────────────────────────────────────────────────────────

describe('getImageThumbnail', () => {
  it('returns a URL for image/png files', () => {
    vi.stubGlobal('URL', { createObjectURL: vi.fn(() => 'blob:test') })
    const file = new File([''], 'test.png', { type: 'image/png' })
    expect(getImageThumbnail(file)).toBe('blob:test')
    vi.unstubAllGlobals()
  })

  it('returns undefined for non-image files', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' })
    expect(getImageThumbnail(file)).toBeUndefined()
  })
})
