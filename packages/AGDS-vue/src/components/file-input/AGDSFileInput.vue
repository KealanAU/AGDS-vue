<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import AgDSButton from '../button/AGDSButton.vue'
import type { ButtonSize } from '../button/AGDSButton.vue'
import AgDSFormStack from '../form-stack/AGDSFormStack.vue'
import AgDSFlex from '../flex/AGDSFlex.vue'

// ── MIME type → display label mapping ───────────────────────────────────────

const FILE_TYPE_MAPPING: Record<string, { extensions: string[]; label?: string }> = {
  'image/jpeg':       { extensions: ['.jpg', '.jpeg'], label: 'JPEG' },
  'image/png':        { extensions: ['.png'],          label: 'PNG' },
  'image/gif':        { extensions: ['.gif'],          label: 'GIF' },
  'image/webp':       { extensions: ['.webp'],         label: 'WebP' },
  'image/svg+xml':    { extensions: ['.svg'],          label: 'SVG' },
  'application/pdf':  { extensions: ['.pdf'],          label: 'PDF' },
  'application/msword': { extensions: ['.doc'],        label: 'DOC' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    extensions: ['.docx'], label: 'DOCX',
  },
  'application/vnd.ms-excel': { extensions: ['.xls'], label: 'XLS' },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    extensions: ['.xlsx'], label: 'XLSX',
  },
  'text/csv':         { extensions: ['.csv'], label: 'CSV' },
  'text/plain':       { extensions: ['.txt'], label: 'TXT' },
  'application/zip':  { extensions: ['.zip'], label: 'ZIP' },
  'video/mp4':        { extensions: ['.mp4'], label: 'MP4' },
  'audio/mpeg':       { extensions: ['.mp3'], label: 'MP3' },
}

export type AcceptedFileMimeTypes = keyof typeof FILE_TYPE_MAPPING

// ── Props ────────────────────────────────────────────────────────────────────

export interface AgDSFileInputProps {
  /** Visible label for the field */
  label: string
  /** HTML id for the button — auto-generated if not provided */
  id?: string
  /** Accepted file types — a browser accept string or an array of MIME types */
  accept?: string | AcceptedFileMimeTypes[]
  /** Capture attribute for mobile camera. 'user' = front, 'environment' = rear */
  capture?: 'user' | 'environment'
  /** Disables the button and hidden input */
  disabled?: boolean
  /** Focuses the trigger button on mount */
  autoFocus?: boolean
  /** Allows the user to pick multiple files */
  multiple?: boolean
  /** Name attribute on the hidden file input */
  name?: string
  /** Hint text displayed below the label */
  hint?: string
  /** Renders the invalid (error) state */
  invalid?: boolean
  /** Error or status message displayed below the control */
  message?: string
  /** Marks the field as required */
  required?: boolean
  /** When true, "(optional)" is never appended to the label */
  hideOptionalLabel?: boolean
  /** Size of the trigger button */
  buttonSize?: ButtonSize
}

const props = withDefaults(defineProps<AgDSFileInputProps>(), {
  disabled: false,
  autoFocus: false,
  multiple: false,
  invalid: false,
  required: false,
  hideOptionalLabel: false,
  buttonSize: 'sm',
})

const emit = defineEmits<{
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// ── IDs ──────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const buttonId  = computed(() => props.id ?? `agds-file-input-${uid}`)
const hintId    = computed(() => `${buttonId.value}-hint`)
const messageId = computed(() => `${buttonId.value}-message`)

// ── File name state ───────────────────────────────────────────────────────────

const fileNames = ref<string[]>([])
const hasFiles  = computed(() => fileNames.value.length > 0)

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    fileNames.value = Array.from(target.files).map((f) => f.name)
  }
  emit('change', event)
}

// ── accept / hint derivation ─────────────────────────────────────────────────

const acceptString = computed<string | undefined>(() => {
  if (!props.accept) return undefined
  return Array.isArray(props.accept) ? props.accept.join(',') : props.accept
})

const acceptedFileExtensions = computed<string | undefined>(() => {
  if (!props.accept) return undefined
  if (typeof props.accept === 'string') return props.accept

  const labels = new Set<string>()
  for (const mimeType of props.accept) {
    const mapping = FILE_TYPE_MAPPING[mimeType]
    if (mapping) {
      labels.add(mapping.label ?? mapping.extensions.join(', '))
    } else {
      labels.add(mimeType)
    }
  }
  return [...labels].join(', ')
})

const resolvedHint = computed<string | undefined>(() => {
  if (props.hint) return props.hint
  if (acceptedFileExtensions.value) return `Files accepted: ${acceptedFileExtensions.value}`
  return undefined
})

// ── Selected files message ────────────────────────────────────────────────────

const fileOrFiles = computed(() => (props.multiple ? 'files' : 'file'))

function getSelectedFilesMessage(displayed: boolean): string {
  if (fileNames.value.length === 0) return `No ${fileOrFiles.value} selected`
  if (fileNames.value.length === 1) {
    return `${fileNames.value[0]}${displayed ? '' : ' selected'}`
  }
  return `${fileNames.value.length} files selected`
}

const displayMessage   = computed(() => getSelectedFilesMessage(true))
const announcedMessage = computed(() => getSelectedFilesMessage(false))

// ── Button label & composed aria-label ───────────────────────────────────────

const buttonLabel = computed(() => `Select ${fileOrFiles.value}`)

const optionalText = computed<string | undefined>(() => {
  if (props.required || props.hideOptionalLabel) return undefined
  return '(optional)'
})

const buttonAriaLabel = computed(() =>
  [
    buttonLabel.value,
    props.label,
    optionalText.value,
    props.required ? 'required' : undefined,
    props.invalid  ? 'invalid'  : undefined,
    announcedMessage.value,
  ]
    .filter(Boolean)
    .join(', ')
)

// ── aria-describedby for the button ──────────────────────────────────────────

const buttonDescribedBy = computed<string | undefined>(() => {
  const ids: string[] = []
  if (resolvedHint.value) ids.push(hintId.value)
  if (props.message)      ids.push(messageId.value)
  return ids.length ? ids.join(' ') : undefined
})

// ── Refs ──────────────────────────────────────────────────────────────────────

const hiddenInputRef   = ref<HTMLInputElement | null>(null)
const visibleButtonRef = ref<InstanceType<typeof AgDSButton> | null>(null)

defineExpose({ focus: () => visibleButtonRef.value?.focus() })

onMounted(() => {
  if (props.autoFocus) visibleButtonRef.value?.focus()
})

// ── Handlers ──────────────────────────────────────────────────────────────────

function handleButtonClick() {
  hiddenInputRef.value?.click()
}
</script>

<template>
  <AgDSFormStack>
    <!-- Label — for= points to the button so clicking it focuses/activates it -->
    <label :for="buttonId" class="agds-file-input__label">
      {{ props.label }}
      <span v-if="optionalText" class="agds-file-input__optional">
        {{ optionalText }}
      </span>
    </label>

    <!-- Hint -->
    <span
      v-if="resolvedHint"
      :id="hintId"
      class="agds-file-input__hint"
    >
      {{ resolvedHint }}
    </span>

    <!-- Control area: button + file name display -->
    <AgDSFlex flex-direction="column" align-items="flex-start" :gap="1">
      <AgDSButton
        ref="visibleButtonRef"
        :id="buttonId"
        variant="secondary"
        :size="props.buttonSize"
        :disabled="props.disabled"
        :aria-label="buttonAriaLabel"
        :aria-describedby="buttonDescribedBy"
        :aria-invalid="props.invalid || undefined"
        type="button"
        @click="handleButtonClick"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      >
        {{ buttonLabel }}
      </AgDSButton>

      <!-- Selected file(s) display text -->
      <span
        class="agds-file-input__file-name"
        :class="{ 'agds-file-input__file-name--populated': hasFiles }"
        aria-hidden="true"
      >
        {{ displayMessage }}
      </span>
    </AgDSFlex>

    <!-- Validation message -->
    <span
      v-if="props.message"
      :id="messageId"
      class="agds-file-input__message"
      :class="{ 'agds-file-input__message--invalid': props.invalid }"
      role="alert"
    >
      {{ props.message }}
    </span>

    <!--
      Hidden native file input — aria-hidden so AT skips it entirely.
      tabindex="-1" removes it from the tab order.
      Triggered programmatically via button click.
    -->
    <input
      ref="hiddenInputRef"
      type="file"
      :accept="acceptString"
      :capture="props.capture"
      :disabled="props.disabled"
      :multiple="props.multiple"
      :name="props.name"
      aria-hidden="true"
      tabindex="-1"
      class="agds-file-input__input"
      @change="handleChange"
    />
  </AgDSFormStack>
</template>

<style scoped>
/* ── Label ───────────────────────────────────────────────── */

.agds-file-input__label {
  display: block;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
  cursor: pointer;
}

.agds-file-input__optional {
  font-weight: var(--agds-font-weight-normal);
  color: var(--agds-color-text-muted);
  margin-inline-start: var(--agds-space-1);
}

/* ── Hint ────────────────────────────────────────────────── */

.agds-file-input__hint {
  display: block;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
}

/* ── File name display ───────────────────────────────────── */

.agds-file-input__file-name {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
}

.agds-file-input__file-name--populated {
  color: var(--agds-color-text);
  font-weight: var(--agds-font-weight-bold);
}

/* ── Validation message ──────────────────────────────────── */

.agds-file-input__message {
  display: block;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text);
}

.agds-file-input__message--invalid {
  color: var(--agds-color-error);
}

/* ── Hidden native input ─────────────────────────────────── */

.agds-file-input__input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  pointer-events: none;
}
</style>
