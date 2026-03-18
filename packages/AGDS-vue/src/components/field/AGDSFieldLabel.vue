<script setup lang="ts">
export interface AGDSFieldLabelProps {
  /** The id of the form element this label points to */
  htmlFor?: string
  /** An id for the label element itself (for aria-labelledby) */
  id?: string
  /** If false or undefined, "(optional)" is appended */
  required?: boolean
  /** If true, "(optional)" is never appended */
  hideOptionalLabel?: boolean
  /** Text to prepend to the default secondary label */
  secondaryLabel?: string
  /** Render as a different element, e.g. 'legend' for fieldsets */
  as?: string
}

const props = withDefaults(defineProps<AGDSFieldLabelProps>(), {
  as: 'label',
  required: false,
  hideOptionalLabel: false,
})

function secondaryLabelText(): string | undefined {
  if (props.hideOptionalLabel) return props.secondaryLabel || undefined
  if (!props.required) {
    return props.secondaryLabel
      ? `${props.secondaryLabel} (optional)`
      : '(optional)'
  }
  return props.secondaryLabel || undefined
}
</script>

<template>
  <component
    :is="props.as"
    :for="props.as === 'label' ? props.htmlFor : undefined"
    :id="props.id"
    class="agds-field-label"
  >
    <span class="agds-field-label__primary">
      <slot />
    </span>
    <span v-if="secondaryLabelText()" class="agds-field-label__secondary">
      {{ ' ' + secondaryLabelText() }}
    </span>
  </component>
</template>

<style scoped>
.agds-field-label {
  display: block;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text);
}

.agds-field-label__primary {
  font-weight: var(--agds-font-weight-bold);
}

.agds-field-label__secondary {
  font-weight: var(--agds-font-weight-normal);
  color: var(--agds-color-text-muted);
}
</style>
