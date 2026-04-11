<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import AGDSFieldContainer from '../field/AGDSFieldContainer.vue'
import AGDSFieldLabel from '../field/AGDSFieldLabel.vue'
import AGDSFieldHint from '../field/AGDSFieldHint.vue'
import AGDSFieldMessage from '../field/AGDSFieldMessage.vue'

export interface AGDSGroupedFieldsProps {
  /** Describes the purpose of the group of fields. */
  legend: string
  /** If true, the invalid state will be rendered for field 1. */
  field1Invalid?: boolean
  /** If true, the invalid state will be rendered for field 2. */
  field2Invalid?: boolean
  /** If true, "(optional)" will never be appended to the legend even when required is false. */
  hideOptionalLabel?: boolean
  /** Provides extra information about the group of fields. */
  hint?: string
  /** A unique ID used as the basis for internal IDs. */
  id?: string
  /** Message to show when either field is invalid. */
  message?: string
  /** Marks the group as required. When false, "(optional)" is appended to the legend. */
  required?: boolean
  /** If true, the legend is hidden from sighted users but remains visible to screen readers. */
  visuallyHideLegend?: boolean
}

const props = withDefaults(defineProps<AGDSGroupedFieldsProps>(), {
  field1Invalid: false,
  field2Invalid: false,
  hideOptionalLabel: false,
  required: false,
  visuallyHideLegend: false,
})

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const hintId = computed(() => `grouped-fields-${uid}-hint`)
const messageId = computed(() => `grouped-fields-${uid}-message`)

const invalid = computed(() => props.field1Invalid || props.field2Invalid)

function getAriaDescribedBy(fieldInvalid: boolean): string | undefined {
  const ids: string[] = []
  if (fieldInvalid && props.message) ids.push(messageId.value)
  if (props.hint) ids.push(hintId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
}

const field1Props = computed(() => ({
  'aria-describedby': getAriaDescribedBy(props.field1Invalid),
  'aria-invalid': props.field1Invalid,
}))

const field2Props = computed(() => ({
  'aria-describedby': getAriaDescribedBy(props.field2Invalid),
  'aria-invalid': props.field2Invalid,
}))
</script>

<template>
  <AGDSFieldContainer :invalid="invalid">
    <fieldset class="agds-grouped-fields">
      <AGDSFieldLabel
        as="legend"
        :class="{ 'agds-grouped-fields__legend--hidden': visuallyHideLegend }"
        :hide-optional-label="hideOptionalLabel"
        :required="props.required"
      >
        {{ legend }}
      </AGDSFieldLabel>

      <div
        class="agds-grouped-fields__stack"
        :class="{ 'agds-grouped-fields__stack--spaced': !visuallyHideLegend }"
      >
        <AGDSFieldHint v-if="hint" :id="hintId">{{ hint }}</AGDSFieldHint>
        <AGDSFieldMessage v-if="message && invalid" :id="messageId">{{ message }}</AGDSFieldMessage>

        <div class="agds-grouped-fields__row" data-grouped-fields>
          <slot :field1-props="field1Props" :field2-props="field2Props" />
        </div>
      </div>
    </fieldset>
  </AGDSFieldContainer>
</template>

<style scoped>
/* Reset fieldset browser defaults */
.agds-grouped-fields {
  border: none;
  padding: 0;
  margin: 0;
  min-width: 0;
}

/* Vertical stack: hint → message → field row */
.agds-grouped-fields__stack {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-2); /* mapSpacing(0.5) = 0.5rem */
}

/* When legend is visible, add space between it and the stack below */
.agds-grouped-fields__stack--spaced {
  margin-top: var(--agds-space-2); /* mapSpacing(0.5) = 0.5rem */
}

/* Two fields sit side-by-side, wrapping on small screens */
.agds-grouped-fields__row {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--agds-space-4); /* mapSpacing(1) = 1rem */
}

/* Visually hide the legend while keeping it accessible */
.agds-grouped-fields__legend--hidden {
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
