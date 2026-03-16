// ── File status ───────────────────────────────────────────────────────────────

export type FileStatus = 'none' | 'uploading' | 'success'

export type FileWithStatus = File & {
  status?: FileStatus
  href?: string
  download?: boolean | string
}

export type FileError = {
  code: string
  message: string
}

export type RejectedFile = {
  file: File
  errors: FileError[]
}

export type ExistingFile = {
  /** The file name. */
  name: string
  /** Link to a webpage where the user can view/download the existing file */
  href?: string
  /** Makes the browser treat the linked href as a download */
  download?: boolean | string
  /** The file size in bytes (optional). */
  size?: number
  /** If the file is an image, provide a URL to a 72x72 thumbnail. */
  thumbnailSrc?: string
  /** Extra file metadata */
  meta?: Record<string, unknown>
  /** Callback function when the file link is clicked. */
  onClick?: (event: MouseEvent) => void
}

export type CustomFileMimeType = {
  /** A valid MIME type e.g. `font/otf` */
  mimeType: string
  /** Array of accepted file extensions, e.g. `['.otf']`. Use an empty array for all. */
  extensions: string[]
  /** The human readable label used for the summary, e.g. "OTF font" */
  label?: string
}

// ── Error codes ───────────────────────────────────────────────────────────────

export const ERROR_CODE_FILE_TOO_LARGE = 'file-too-large'
export const ERROR_CODE_FILE_INVALID_TYPE = 'file-invalid-type'
export const ERROR_CODE_TOO_MANY_FILES = 'too-many-files'

export const TOO_MANY_FILES_ERROR: FileError = {
  code: ERROR_CODE_TOO_MANY_FILES,
  message: 'Too many files',
}

// ── MIME type mapping ─────────────────────────────────────────────────────────

export const fileTypeMapping: Record<string, { extensions: string[]; label?: string }> = {
  // Application
  'application/msword': { extensions: ['.doc'] },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { extensions: ['.docx'] },
  'application/pdf': { extensions: ['.pdf'] },
  'application/rtf': { extensions: ['.rtf'] },
  'application/vnd.ms-excel': { extensions: ['.xls'] },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { extensions: ['.xlsx'] },
  'application/vnd.ms-outlook': { extensions: ['.msg'] },
  'application/zip': { extensions: ['.zip'] },
  'application/xml': { extensions: ['.xml'] },
  // Audio
  'audio/*': { extensions: [], label: 'Any audio file' },
  'audio/mpeg': { extensions: ['.mp3'] },
  'audio/wav': { extensions: ['.wav'] },
  // Image
  'image/*': { extensions: [], label: 'Any image file' },
  'image/gif': { extensions: ['.gif'] },
  'image/heic': { extensions: ['.heic'] },
  'image/jpg': { extensions: ['.jpeg', '.jpg'] },
  'image/jpeg': { extensions: ['.jpeg', '.jpg'] },
  'image/png': { extensions: ['.png'] },
  'image/svg+xml': { extensions: ['.svg'] },
  'image/tiff': { extensions: ['.tif', '.tiff'] },
  'image/webp': { extensions: ['.webp'] },
  // Text
  'text/*': { extensions: [], label: 'Any text file' },
  'text/csv': { extensions: ['.csv'] },
  'text/plain': { extensions: ['.txt'] },
  'text/rtf': { extensions: ['.rtf'] },
  'text/xml': { extensions: ['.xml'] },
  // Video
  'video/*': { extensions: [], label: 'Any video file' },
  'video/mp4': { extensions: ['.mp4'] },
  'video/mpeg': { extensions: ['.mpeg'] },
}

export type AcceptedFileMimeTypes = keyof typeof fileTypeMapping

// ── Filesize formatter ────────────────────────────────────────────────────────

const BYTES_PER_KB = 1000
const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
const MAX_EXPONENT = UNITS.length - 1

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}

export function formatFileSize(bytes: unknown): string {
  let num = Number(bytes)
  if (isNaN(num)) return 'Unknown'
  const neg = num < 0
  if (neg) num = -num
  const exponent = clamp(Math.floor(Math.log(num) / Math.log(BYTES_PER_KB)), 0, MAX_EXPONENT)
  const val = num / Math.pow(BYTES_PER_KB, exponent)
  const p = Math.pow(10, exponent > 0 ? 2 : 0)
  let result = Math.round(val * p) / p
  if (result === BYTES_PER_KB && exponent < MAX_EXPONENT) {
    result = 1
    return `${neg ? -1 : 1} ${UNITS[exponent + 1]}`
  }
  return `${neg ? -result : result} ${UNITS[exponent]}`
}

// ── Utility functions ─────────────────────────────────────────────────────────

export function getFileListSummaryText(files: {}[]): string {
  if (files.length === 0) return ''
  return `${files.length} ${files.length === 1 ? 'file' : 'files'} selected`
}

export function formatFileExtension(ext: string): string {
  return ext.replace(/^\./, '').toUpperCase()
}

export function getAcceptedFilesSummary(
  acceptProp?: (AcceptedFileMimeTypes | CustomFileMimeType)[],
): string | undefined {
  if (!acceptProp?.length) return undefined

  const allFileTypes: string[] = []

  for (const item of acceptProp) {
    if (typeof item === 'string') {
      const option = fileTypeMapping[item]
      if (option) {
        if (option.label) {
          allFileTypes.push(option.label)
        } else {
          option.extensions.forEach((ext) => allFileTypes.push(formatFileExtension(ext)))
        }
      }
    } else if (item.label) {
      allFileTypes.push(item.label)
    } else {
      item.extensions.forEach((ext) => allFileTypes.push(formatFileExtension(ext)))
    }
  }

  return allFileTypes.filter((v, i, arr) => arr.indexOf(v) === i).join(', ')
}

export function getErrorSummary(errors: FileError[], formattedMaxFileSize: string): string {
  if (!errors?.length) return ''
  const codes = [...new Set(errors.map((e) => e.code))]
  if (codes.includes(ERROR_CODE_FILE_INVALID_TYPE)) return 'Invalid file type'
  if (codes.includes(ERROR_CODE_FILE_TOO_LARGE)) return `File is over ${formattedMaxFileSize}`
  return TOO_MANY_FILES_ERROR.message
}

export function getImageThumbnail(file: File): string | undefined {
  const imageMimeTypes = /image\/(png|jpg|jpeg|webp|heic)/i
  return file.type.match(imageMimeTypes) ? URL.createObjectURL(file) : undefined
}

export function convertFileToTooManyFilesRejection(file: File): RejectedFile {
  return { file, errors: [TOO_MANY_FILES_ERROR] }
}

export function removeItemAtIndex<T>(array: T[], index: number): T[] {
  const clone = [...array]
  clone.splice(index, 1)
  return clone
}

/**
 * Validate a single file against accept map and maxSize.
 * acceptMap: { 'image/png': ['.png'], 'image/*': [] }
 */
export function validateFile(
  file: File,
  acceptMap: Record<string, string[]> | undefined,
  maxSizeBytes: number,
): FileError[] {
  const errors: FileError[] = []

  if (acceptMap) {
    const isAccepted = Object.keys(acceptMap).some((mimeType) => {
      if (mimeType.endsWith('/*')) {
        const category = mimeType.slice(0, -2)
        return file.type.startsWith(category + '/')
      }
      return file.type === mimeType
    })
    if (!isAccepted) {
      errors.push({ code: ERROR_CODE_FILE_INVALID_TYPE, message: 'File type not accepted' })
    }
  }

  if (maxSizeBytes > 0 && file.size > maxSizeBytes) {
    errors.push({ code: ERROR_CODE_FILE_TOO_LARGE, message: 'File is too large' })
  }

  return errors
}
