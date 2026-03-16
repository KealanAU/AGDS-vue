<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

export interface AgDSFieldsetProps {
  /** Describes the purpose of the group of fields */
  legend: string
  /** Provides extra information about the fieldset */
  hint?: string
  /** Defines an identifier (ID) for the fieldset. Auto-generated if omitted. */
  id?: string
}

const props = defineProps<AgDSFieldsetProps>()

// Note: fieldset is NOT rendered as a flex container — `legend` must be the
// first child of `fieldset`, and setting `fieldset` as a flex/grid container
// behaves inconsistently across browsers. Child spacing uses margins instead.

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const fieldsetId = computed(() => props.id ?? `fieldset-${uid}`)
const hintId = computed(() => `fieldset-${uid}-hint`)
</script>

<template>
  <fieldset
    :id="fieldsetId"
    :aria-describedby="hint ? hintId : undefined"
    class="agds-fieldset"
  >
    <legend class="agds-fieldset__legend">{{ legend }}</legend>

    <span v-if="hint" :id="hintId" class="agds-fieldset__hint">
      {{ hint }}
    </span>

    <div class="agds-fieldset__content">
      <slot />
    </div>
  </fieldset>
</template>

<style scoped>
.agds-fieldset {
  border: none;
  padding: 0;
  margin: 0;
  min-width: 0;
}

.agds-fieldset__legend {
  display: block;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-lg);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-tight);
  color: var(--agds-color-text);
}

.agds-fieldset__hint {
  display: block;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
  margin-top: var(--agds-space-3);
}

.agds-fieldset__content {
  margin-top: var(--agds-space-8);
}
</style>
