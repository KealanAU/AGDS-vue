<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import AGDSField from '../field/AGDSField.vue'
import AGDSButton from '../button/AGDSButton.vue'
import AGDSFileUploadFile from './AGDSFileUploadFile.vue'
import AGDSFileUploadExistingFile from './AGDSFileUploadExistingFile.vue'
import {
  type AcceptedFileMimeTypes,
  type CustomFileMimeType,
  type ExistingFile,
  type FileWithStatus,
  type RejectedFile,
  convertFileToTooManyFilesRejection,
  formatFileSize,
  getAcceptedFilesSummary,
  getErrorSummary,
  getFileListSummaryText,
  removeItemAtIndex,
  validateFile,
} from './utils'

// ── Props ─────────────────────────────────────────────────────────────────────

export interface AgDSFileUploadProps {
  /** Describes the purpose of the field */
  label: string
  /** Currently accepted file list (controlled) */
  modelValue?: FileWithStatus[]
  /** If true, "(optional)" will never be appended to the label */
  hideOptionalLabel?: boolean
  /** If false, "(optional)" will be appended to the label */
  required?: boolean
  /** Provides extra information about the field */
  hint?: string
  /** Message to show when the field is invalid */
  message?: string
  /** If true, the invalid state will be rendered */
  invalid?: boolean
  /** HTML id for the trigger button — auto-generated if omitted */
  id?: string
  /** Name attribute on the hidden file input */
  name?: string
  /** Disables the entire component */
  disabled?: boolean
  /** Allow multiple files */
  multiple?: boolean
  /** List of acceptable MIME types */
  accept?: (AcceptedFileMimeTypes | CustomFileMimeType)[]
  /** Max files allowed (only applied when multiple=true) */
  maxFiles?: number
  /** Max file size in KB */
  maxSize?: number
  /** If true, image thumbnails are hidden */
  hideThumbnails?: boolean
  /** Files already uploaded to the server */
  existingFiles?: ExistingFile[]
}

const props = withDefaults(defineProps<AgDSFileUploadProps>(), {
  modelValue: () => [],
  existingFiles: () => [],
  invalid: false,
  required: false,
  hideOptionalLabel: false,
  disabled: false,
  multiple: false,
  hideThumbnails: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: FileWithStatus[]]
  'remove-existing-file': [file: ExistingFile]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// ── IDs ───────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const buttonId = computed(() => props.id ?? `file-upload-${uid}`)
const fileSizeDescId = computed(() => props.maxSize ? `${buttonId.value}-size-desc` : '')
const acceptedFilesDescId = computed(() => props.accept?.length ? `${buttonId.value}-accept-desc` : '')

// ── Accept map ────────────────────────────────────────────────────────────────

const acceptMapSync = computed<Record<string, string[]> | undefined>(() => {
  if (!props.accept?.length) return undefined
  const entries: [string, string[]][] = []
  for (const item of props.accept) {
    if (typeof item === 'string') {
      entries.push([item, []])
    } else {
      entries.push([item.mimeType, item.extensions])
    }
  }
  return Object.fromEntries(entries)
})

// Native <input accept> string
const acceptString = computed<string | undefined>(() => {
  if (!props.accept?.length) return undefined
  return props.accept.map((item) => (typeof item === 'string' ? item : item.mimeType)).join(',')
})

// ── Max size ──────────────────────────────────────────────────────────────────

const maxSizeBytes = computed(() =>
  props.maxSize && !isNaN(props.maxSize) ? props.maxSize * 1000 : 0,
)
const formattedMaxSize = computed(() => formatFileSize(maxSizeBytes.value))

// ── Valid maxFiles ─────────────────────────────────────────────────────────────

const validMaxFiles = computed(() => {
  if (props.maxFiles === undefined) return undefined
  if (props.maxFiles < 1) {
    console.warn('AgDSFileUpload: maxFiles cannot be less than 1. The property is being ignored.')
    return undefined
  }
  return props.maxFiles
})

// ── File rejections ───────────────────────────────────────────────────────────

const invalidRejections = ref<RejectedFile[]>([])
const tooManyFilesRejections = ref<RejectedFile[]>([])

const hasRejections = computed(() =>
  invalidRejections.value.length > 0 || tooManyFilesRejections.value.length > 0,
)
const allRejections = computed(() => [
  ...invalidRejections.value,
  ...tooManyFilesRejections.value,
])
const pluralRejections = computed(() => allRejections.value.length > 1)

function clearErrors() {
  invalidRejections.value = []
  tooManyFilesRejections.value = []
}

// ── Status (aria-live announcement) ───────────────────────────────────────────

const liveStatus = ref('')

// ── File processing ───────────────────────────────────────────────────────────

function processFiles(rawFiles: File[]) {
  clearErrors()

  const accepted: FileWithStatus[] = []
  const rejected: RejectedFile[] = []

  for (const file of rawFiles) {
    const errors = validateFile(file, acceptMapSync.value, maxSizeBytes.value)
    if (errors.length) {
      rejected.push({ file, errors })
    } else {
      accepted.push(file as FileWithStatus)
    }
  }

  if (rejected.length) {
    invalidRejections.value = rejected
  }

  if (!accepted.length) return

  let validFiles: FileWithStatus[]

  if (props.multiple) {
    // Deduplicate by name+size+type
    const merged = [...props.modelValue, ...accepted]
    const deduped = Object.values<FileWithStatus>(
      merged.reduce(
        (acc, file) => ({ ...acc, [`${file.name}-${file.size}-${file.type}`]: file }),
        {} as Record<string, FileWithStatus>,
      ),
    )

    if (validMaxFiles.value && deduped.length > validMaxFiles.value) {
      tooManyFilesRejections.value = deduped
        .slice(validMaxFiles.value)
        .map(convertFileToTooManyFilesRejection)
      validFiles = deduped.slice(0, validMaxFiles.value)
    } else {
      validFiles = deduped
    }
  } else {
    validFiles = [accepted[0]]
  }

  liveStatus.value = validFiles.map((f) => f.name).join(', ') + ' added'
  emit('update:modelValue', validFiles)
}

// ── Drag and drop ─────────────────────────────────────────────────────────────

const dragCounter = ref(0)
const isDragActive = computed(() => dragCounter.value > 0)

function onDragEnter(e: DragEvent) {
  e.preventDefault()
  if (props.disabled) return
  dragCounter.value++
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
}

function onDragLeave(e: DragEvent) {
  e.preventDefault()
  dragCounter.value = Math.max(0, dragCounter.value - 1)
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  dragCounter.value = 0
  if (props.disabled) return
  const files = Array.from(e.dataTransfer?.files ?? [])
  if (files.length) processFiles(files)
}

// ── Hidden input + button ────────────────────────────────────────────────────

const hiddenInputRef = ref<HTMLInputElement | null>(null)
const triggerButtonRef = ref<InstanceType<typeof AGDSButton> | null>(null)

function openFilePicker() {
  hiddenInputRef.value?.click()
}

function onInputChange(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])
  if (files.length) processFiles(files)
  // Reset so the same file can be re-selected
  ;(e.target as HTMLInputElement).value = ''
}

// ── File list management ──────────────────────────────────────────────────────

function removeFile(index: number) {
  clearErrors()
  const removed = props.modelValue[index]
  liveStatus.value = removed.name + ' removed'
  emit('update:modelValue', removeItemAtIndex(props.modelValue, index))
}

function removeExistingFile(file: ExistingFile) {
  liveStatus.value = file.name + ' removed'
  emit('remove-existing-file', file)
}

// ── Summary ────────────────────────────────────────────────────────────────────

const fileSummaryText = computed(() =>
  getFileListSummaryText([...props.modelValue, ...props.existingFiles]),
)

const showFileLists = computed(() =>
  props.modelValue.length > 0 || props.existingFiles.length > 0,
)

const acceptedFilesSummary = computed(() => getAcceptedFilesSummary(props.accept))

// ── Button aria-label ─────────────────────────────────────────────────────────

const fileOrFiles = computed(() => (props.multiple ? 'files' : 'file'))
const buttonLabel = computed(() => `Select ${fileOrFiles.value}`)

const optionalText = computed(() =>
  props.required || props.hideOptionalLabel ? undefined : '(optional)',
)

const buttonAriaLabel = computed(() =>
  [
    buttonLabel.value,
    props.label,
    optionalText.value,
    props.required ? 'required' : undefined,
    props.invalid ? 'invalid' : undefined,
    fileSummaryText.value || undefined,
  ]
    .filter(Boolean)
    .join(', '),
)

// ── Expose ────────────────────────────────────────────────────────────────────

defineExpose({ focus: () => triggerButtonRef.value?.focus() })
</script>

<template>
  <AGDSField
    :label="props.label"
    :id="buttonId"
    :hint="props.hint"
    :invalid="props.invalid"
    :message="props.message"
    :required="props.required"
    :hide-optional-label="props.hideOptionalLabel"
  >
    <template #default="slotProps">
      <div class="agds-file-upload__stack">

        <!-- aria-live status region (always in DOM, WCAG 4.1.3) -->
        <div role="status" class="sr-only" aria-live="polite" aria-atomic="true">
          {{ liveStatus }}
        </div>

        <!-- Drop zone -->
        <div
          class="agds-file-upload__dropzone"
          :class="{
            'agds-file-upload__dropzone--invalid': props.invalid,
            'agds-file-upload__dropzone--disabled': props.disabled,
            'agds-file-upload__dropzone--drag-active': isDragActive,
          }"
          @dragenter="onDragEnter"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
          @drop="onDrop"
        >
          <!-- Upload icon -->
          <span class="agds-file-upload__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor" focusable="false" aria-hidden="true">
              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
            </svg>
          </span>

          <!-- Hidden file input -->
          <input
            ref="hiddenInputRef"
            type="file"
            :accept="acceptString"
            :multiple="props.multiple"
            :disabled="props.disabled"
            :name="props.name"
            aria-hidden="true"
            tabindex="-1"
            class="sr-only"
            @change="onInputChange"
          />

          <!-- Drag instruction text -->
          <div class="agds-file-upload__instructions">
            <span class="agds-file-upload__drag-text" :class="{ 'agds-file-upload__drag-text--hidden': isDragActive }">
              {{ props.multiple
                ? 'Drag and drop files here or select files to upload.'
                : 'Drag and drop a file or select a file to upload.' }}
            </span>
            <span
              v-if="isDragActive"
              class="agds-file-upload__drop-text"
              aria-hidden="true"
            >
              Drop {{ fileOrFiles }} here…
            </span>

            <!-- Max size hint -->
            <span
              v-if="props.maxSize"
              :id="fileSizeDescId"
              class="agds-file-upload__desc-text"
            >
              {{ props.multiple ? 'Each file' : 'File' }} cannot exceed {{ formattedMaxSize }}.
            </span>

            <!-- Accepted types hint -->
            <span
              v-if="acceptedFilesSummary"
              :id="acceptedFilesDescId"
              class="agds-file-upload__desc-text"
            >
              Files accepted: {{ acceptedFilesSummary }}.
            </span>
          </div>

          <!-- Trigger button — gets the field a11y ID so label's for= targets it -->
          <AGDSButton
            ref="triggerButtonRef"
            variant="secondary"
            type="button"
            :id="slotProps.id"
            :disabled="props.disabled"
            :aria-label="buttonAriaLabel"
            :aria-describedby="[slotProps['aria-describedby'], fileSizeDescId, acceptedFilesDescId].filter(Boolean).join(' ') || undefined"
            focus-ring-for="all"
            @click="openFilePicker"
            @focus="emit('focus', $event)"
            @blur="emit('blur', $event)"
          >
            {{ buttonLabel }}
          </AGDSButton>
        </div>

        <!-- Rejection error panel -->
        <div v-if="hasRejections" class="agds-file-upload__error-panel" role="alert">
          <div class="agds-file-upload__error-header">
            <span class="agds-file-upload__error-title">
              The following {{ pluralRejections ? 'files' : 'file' }} could not be selected
            </span>
            <button
              type="button"
              class="agds-file-upload__error-close"
              aria-label="Dismiss error"
              @click="clearErrors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
          <p class="agds-file-upload__error-intro">
            {{ pluralRejections
              ? 'These files were unable to be accepted for the following reasons:'
              : 'This file was unable to be accepted for the following reason:' }}
          </p>
          <ul class="agds-file-upload__error-list">
            <li v-for="rejection in allRejections" :key="rejection.file.name" class="agds-file-upload__error-item">
              <span class="agds-file-upload__error-filename">{{ rejection.file.name }}</span>
              <span class="agds-file-upload__error-size"> ({{ formatFileSize(rejection.file.size) }})</span>
              <span> — {{ getErrorSummary(rejection.errors, formattedMaxSize) }}</span>
            </li>
          </ul>
        </div>

        <!-- File lists -->
        <div v-if="showFileLists" class="agds-file-upload__file-lists">
          <p v-if="fileSummaryText" class="agds-file-upload__summary">{{ fileSummaryText }}</p>

          <!-- Existing files -->
          <ul
            v-if="props.existingFiles.length"
            class="agds-file-upload__list"
            aria-label="Existing files"
          >
            <AGDSFileUploadExistingFile
              v-for="(file, index) in props.existingFiles"
              :key="index"
              :file="file"
              :hide-thumbnails="props.hideThumbnails"
              :on-remove="() => removeExistingFile(file)"
            />
          </ul>

          <!-- Newly selected files -->
          <ul
            v-if="props.modelValue.length"
            class="agds-file-upload__list"
            aria-label="Selected files"
          >
            <AGDSFileUploadFile
              v-for="(file, index) in props.modelValue"
              :key="index"
              :file="file"
              :hide-thumbnails="props.hideThumbnails"
              :on-remove="() => removeFile(index)"
            />
          </ul>
        </div>

      </div>
    </template>
  </AGDSField>
</template>

<style scoped>
/* ── Outer stack ─────────────────────────────────────────── */

.agds-file-upload__stack {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-4);
}

/* ── Drop zone ───────────────────────────────────────────── */

.agds-file-upload__dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--agds-space-4);
  padding: var(--agds-space-6);
  text-align: center;

  border: var(--agds-border-width-lg, 3px) dashed var(--agds-color-border);
  border-radius: var(--agds-border-radius, 4px);
  background-color: var(--agds-color-bg);

  transition:
    border-color var(--agds-transition-fast, 100ms ease),
    background-color var(--agds-transition-fast, 100ms ease);
}

.agds-file-upload__dropzone--invalid {
  border-color: var(--agds-color-error);
  background-color: var(--agds-color-error-muted);
}

.agds-file-upload__dropzone--disabled {
  cursor: not-allowed;
  border-color: var(--agds-color-border-muted);
  background-color: var(--agds-color-bg-shade);
  color: var(--agds-color-text-muted);
}

.agds-file-upload__dropzone--drag-active {
  border-color: var(--agds-color-action-primary);
  background-color: var(--agds-color-bg-shade);
}

/* ── Upload icon ─────────────────────────────────────────── */

.agds-file-upload__icon {
  color: var(--agds-color-text-muted);
  display: inline-flex;
}

/* ── Instructions ────────────────────────────────────────── */

.agds-file-upload__instructions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--agds-space-2);
  position: relative;
}

.agds-file-upload__drag-text {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text-muted);
}

.agds-file-upload__drag-text--hidden {
  visibility: hidden;
}

.agds-file-upload__drop-text {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-action-primary);
}

.agds-file-upload__desc-text {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
}

/* ── Error panel ─────────────────────────────────────────── */

.agds-file-upload__error-panel {
  border: var(--agds-border-width-lg, 3px) solid var(--agds-color-error);
  border-radius: var(--agds-border-radius, 4px);
  padding: var(--agds-space-4);
  background-color: var(--agds-color-error-muted);
}

.agds-file-upload__error-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--agds-space-2);
  margin-bottom: var(--agds-space-2);
}

.agds-file-upload__error-title {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
}

.agds-file-upload__error-close {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--agds-space-1);
  color: var(--agds-color-text);
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
}

.agds-file-upload__error-close:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-file-upload__error-intro {
  margin: 0 0 var(--agds-space-2);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text);
}

.agds-file-upload__error-list {
  margin: 0;
  padding-inline-start: var(--agds-space-5);
}

.agds-file-upload__error-item {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text);
}

.agds-file-upload__error-filename {
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-error);
}

/* ── File lists ──────────────────────────────────────────── */

.agds-file-upload__file-lists {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-2);
}

.agds-file-upload__summary {
  margin: 0;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
}

.agds-file-upload__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-2);
}

/* ── Utilities ───────────────────────────────────────────── */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
