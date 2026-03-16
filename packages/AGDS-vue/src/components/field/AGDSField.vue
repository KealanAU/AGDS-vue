<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import AGDSFieldContainer from './AGDSFieldContainer.vue'
import AGDSFieldLabel from './AGDSFieldLabel.vue'
import AGDSFieldHint from './AGDSFieldHint.vue'
import AGDSFieldMessage from './AGDSFieldMessage.vue'

export type FieldMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface AgDSFieldProps {
  /** Describes the purpose of the field */
  label: string
  /** Defines an identifier (ID) for the field. Auto-generated if omitted. */
  id?: string
  /** An id for the label element itself (use with aria-labelledby) */
  labelId?: string
  /** Provides extra information about the field */
  hint?: string
  /** If true, renders the invalid (error) state */
  invalid?: boolean
  /** Message to show when the field is invalid */
  message?: string
  /** If false or undefined, "(optional)" will be appended to the label */
  required?: boolean
  /** If true, "(optional)" is never appended to the label */
  hideOptionalLabel?: boolean
  /** Text to prepend to the default secondary label */
  secondaryLabel?: string
  /** Constrains the max-width of the field */
  maxWidth?: FieldMaxWidth
}

const MAX_WIDTH_MAP: Record<FieldMaxWidth, string> = {
  xs: '10ch',
  sm: '20ch',
  md: '30ch',
  lg: '40ch',
  xl: '60ch',
}

const props = withDefaults(defineProps<AgDSFieldProps>(), {
  invalid: false,
  required: false,
  hideOptionalLabel: false,
})

// ── IDs ──────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const fieldId   = computed(() => props.id ?? `field-${uid}`)
const hintId    = computed(() => `field-${uid}-hint`)
const messageId = computed(() => `field-${uid}-message`)

// ── Slot props (mirror React's A11yProps) ─────────────────────────────────────

const describedBy = computed<string | undefined>(() => {
  const ids: string[] = []
  if (props.message && props.invalid) ids.push(messageId.value)
  if (props.hint)    ids.push(hintId.value)
  return ids.length ? ids.join(' ') : undefined
})

const slotProps = computed(() => ({
  id: fieldId.value,
  'aria-required': Boolean(props.required),
  'aria-invalid': Boolean(props.invalid),
  'aria-describedby': describedBy.value,
}))

const resolvedMaxWidth = computed(() =>
  props.maxWidth ? MAX_WIDTH_MAP[props.maxWidth] : undefined,
)
</script>

<template>
  <AGDSFieldContainer :invalid="props.invalid">
    <!-- Label -->
    <AGDSFieldLabel
      :html-for="fieldId"
      :id="props.labelId"
      :required="props.required"
      :hide-optional-label="props.hideOptionalLabel"
      :secondary-label="props.secondaryLabel"
    >
      {{ props.label }}
    </AGDSFieldLabel>

    <!-- Hint -->
    <AGDSFieldHint v-if="props.hint" :id="hintId">
      {{ props.hint }}
    </AGDSFieldHint>

    <!-- Error message — only shown when invalid -->
    <AGDSFieldMessage v-if="props.message && props.invalid" :id="messageId">
      {{ props.message }}
    </AGDSFieldMessage>

    <!-- Input slot — receives a11y props via scoped slot -->
    <slot v-bind="slotProps" />

    <!--
      Max-width spacer: forces the field to try to fill its maxWidth
      inside a flex container without growing beyond it.
      aria-hidden so AT skips it entirely.
    -->
    <div
      v-if="resolvedMaxWidth"
      aria-hidden="true"
      class="agds-field__max-width-spacer"
      :style="{ maxWidth: resolvedMaxWidth }"
    />
  </AGDSFieldContainer>
</template>

<style scoped>
.agds-field__max-width-spacer {
  height: 0;
  overflow: hidden;
  /* ::after forces width — a string of dashes fills the available width */
  &::after {
    content: '----------------------------------------------------------------';
  }
}
</style>
