<script setup lang="ts">
import { provide } from 'vue'
import { RADIO_GROUP_KEY } from './radioGroupContext'

export interface AgDSRadioGroupProps {
  /** Shared `name` attribute applied to every radio in the group */
  name?: string
  /** Marks every radio in the group as invalid */
  invalid?: boolean
  /** Marks every radio in the group as required */
  required?: boolean
  /** Disables every radio in the group */
  disabled?: boolean
  /**
   * The `id` of the element that describes the group error/hint.
   * Passed as `aria-describedby` on each radio when invalid.
   */
  messageId?: string
  /** Accessible label for the group — used on the fieldset legend */
  legend?: string
}

const props = withDefaults(defineProps<AgDSRadioGroupProps>(), {
  invalid: false,
  required: false,
  disabled: false,
})

provide(RADIO_GROUP_KEY, {
  get name() { return props.name },
  get invalid() { return props.invalid },
  get required() { return props.required },
  get disabled() { return props.disabled },
  get messageId() { return props.messageId },
})
</script>

<template>
  <fieldset
    class="agds-radio-group"
    :class="{ 'agds-radio-group--invalid': props.invalid }"
    :disabled="props.disabled || undefined"
  >
    <legend v-if="props.legend || $slots.legend" class="agds-radio-group__legend">
      <slot name="legend">{{ props.legend }}</slot>
      <span v-if="props.required" class="agds-radio-group__required" aria-hidden="true"> *</span>
    </legend>

    <div v-if="$slots.hint" class="agds-radio-group__hint">
      <slot name="hint" />
    </div>

    <div
      v-if="props.invalid && $slots.message"
      :id="props.messageId"
      class="agds-radio-group__message"
      role="alert"
      aria-live="assertive"
    >
      <slot name="message" />
    </div>

    <div class="agds-radio-group__items">
      <slot />
    </div>
  </fieldset>
</template>

<style scoped>
.agds-radio-group {
  border: none;
  padding: 0;
  margin: 0;
  min-width: 0;
}

.agds-radio-group__legend {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold, 700);
  color: var(--agds-color-text);
  margin-bottom: var(--agds-space-1, 0.25rem);
  padding: 0;
}

.agds-radio-group__required {
  color: var(--agds-color-error);
  font-weight: var(--agds-font-weight-bold, 700);
}

.agds-radio-group__hint {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
  margin-bottom: var(--agds-space-2, 0.5rem);
}

.agds-radio-group__message {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-error);
  margin-bottom: var(--agds-space-2, 0.5rem);
}

.agds-radio-group__items {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-2, 0.5rem);
}
</style>
