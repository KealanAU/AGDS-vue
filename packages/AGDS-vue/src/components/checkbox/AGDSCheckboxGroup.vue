<script setup lang="ts">
import { computed, getCurrentInstance, provide } from 'vue'
import { CHECKBOX_GROUP_KEY } from './checkboxGroupContext'

export interface AGDSCheckboxGroupProps {
  /** Shared `name` attribute applied to every checkbox in the group */
  name?: string
  /** Marks every checkbox in the group as invalid */
  invalid?: boolean
  /** Marks every checkbox in the group as required */
  required?: boolean
  /** Disables every checkbox in the group */
  disabled?: boolean
  /**
   * The `id` of the element that describes the group error/hint.
   * Auto-generated if not provided — only override when you need a specific id.
   */
  messageId?: string
  /** Accessible label for the group — used on the fieldset legend */
  legend?: string
  /** Hint text displayed below the legend */
  hint?: string
  /** Error message displayed when `invalid` is true */
  message?: string
}

const props = withDefaults(defineProps<AGDSCheckboxGroupProps>(), {
  invalid: false,
  required: false,
  disabled: false,
})

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const resolvedMessageId = computed(() => props.messageId ?? `agds-checkbox-group-msg-${uid}`)

provide(CHECKBOX_GROUP_KEY, {
  get name() { return props.name },
  get invalid() { return props.invalid },
  get required() { return props.required },
  get disabled() { return props.disabled },
  get messageId() { return resolvedMessageId.value },
})
</script>

<template>
  <fieldset
    class="agds-checkbox-group"
    :class="{ 'agds-checkbox-group--invalid': props.invalid }"
    :disabled="props.disabled || undefined"
  >
    <legend v-if="props.legend || $slots.legend" class="agds-checkbox-group__legend">
      <slot name="legend">{{ props.legend }}</slot>
      <span v-if="props.required" class="agds-checkbox-group__required" aria-hidden="true"> *</span>
    </legend>

    <!-- Hint / description — prop or slot -->
    <div v-if="props.hint || $slots.hint" class="agds-checkbox-group__hint">
      <slot name="hint">{{ props.hint }}</slot>
    </div>

    <!--
      Error message — carries the auto-generated id so each checkbox's
      aria-describedby points here. Shown when invalid + message/slot present.
    -->
    <div
      v-if="props.invalid && (props.message || $slots.message)"
      :id="resolvedMessageId"
      class="agds-checkbox-group__message"
      role="alert"
      aria-live="assertive"
    >
      <slot name="message">{{ props.message }}</slot>
    </div>

    <div class="agds-checkbox-group__items">
      <slot />
    </div>
  </fieldset>
</template>

<style scoped>
.agds-checkbox-group {
  border: none;
  padding: 0;
  margin: 0;
  min-width: 0;
}

.agds-checkbox-group__legend {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold, 700);
  color: var(--agds-color-text);
  margin-bottom: var(--agds-space-1, 0.25rem);
  padding: 0;
}

.agds-checkbox-group__required {
  color: var(--agds-color-error);
  font-weight: var(--agds-font-weight-bold, 700);
}

.agds-checkbox-group__hint {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
  margin-bottom: var(--agds-space-2, 0.5rem);
}

.agds-checkbox-group__message {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-error);
  margin-bottom: var(--agds-space-2, 0.5rem);
}

.agds-checkbox-group__items {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-2, 0.5rem);
}
</style>
