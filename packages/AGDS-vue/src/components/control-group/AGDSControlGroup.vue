<script setup lang="ts">
import { computed, getCurrentInstance, provide } from 'vue'
import AGDSFieldContainer from '../field/AGDSFieldContainer.vue'
import AGDSFieldLabel from '../field/AGDSFieldLabel.vue'
import AGDSFieldHint from '../field/AGDSFieldHint.vue'
import AGDSFieldMessage from '../field/AGDSFieldMessage.vue'
import { CONTROL_GROUP_KEY } from './controlGroupContext'

export interface AgDSControlGroupProps {
  /** If true, children will be stacked vertically */
  block?: boolean
  /** If true, "(optional)" will never be appended to the label */
  hideOptionalLabel?: boolean
  /** Provides extra information about the group */
  hint?: string
  /** Defines an identifier (ID) which must be unique */
  id?: string
  /** If true, the invalid state will be rendered */
  invalid?: boolean
  /** Describes the purpose of the group */
  label?: string
  /** Sets a shared name attribute on child Radio/Checkbox controls */
  name?: string
  /** Message to show when the group is invalid */
  message?: string
  /** If false, "(optional)" will be appended to the label */
  required?: boolean
}

const props = withDefaults(defineProps<AgDSControlGroupProps>(), {
  block: false,
  invalid: false,
  required: false,
  hideOptionalLabel: false,
})

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const groupId = computed(() => props.id ?? `control-group-${uid}`)
const hintId = computed(() => `control-group-${uid}-hint`)
const messageId = computed(() => `control-group-${uid}-message`)
// Auto-generate a name so child controls always belong to a named group
const resolvedName = computed(() => props.name ?? `control-group-${uid}-name`)

const describedBy = computed<string | undefined>(() => {
  const ids: string[] = []
  if (props.message && props.invalid) ids.push(messageId.value)
  if (props.hint) ids.push(hintId.value)
  return ids.length ? ids.join(' ') : undefined
})

provide(CONTROL_GROUP_KEY, {
  get invalid() { return props.invalid },
  get messageId() { return props.invalid && props.message ? messageId.value : undefined },
  get name() { return resolvedName.value },
  get required() { return props.required },
})
</script>

<template>
  <AGDSFieldContainer :id="groupId" :invalid="props.invalid">
    <fieldset class="agds-control-group" :aria-describedby="describedBy">
      <AGDSFieldLabel
        v-if="props.label"
        as="legend"
        :required="props.required"
        :hide-optional-label="props.hideOptionalLabel"
      >
        {{ props.label }}
      </AGDSFieldLabel>

      <div
        class="agds-control-group__meta"
        :class="{ 'agds-control-group__meta--has-label': props.label }"
      >
        <AGDSFieldHint v-if="props.hint" :id="hintId">{{ props.hint }}</AGDSFieldHint>

        <AGDSFieldMessage v-if="props.message && props.invalid" :id="messageId">
          {{ props.message }}
        </AGDSFieldMessage>

        <div
          class="agds-control-group__items"
          :class="{ 'agds-control-group__items--block': props.block }"
        >
          <slot />
        </div>
      </div>
    </fieldset>
  </AGDSFieldContainer>
</template>

<style scoped>
.agds-control-group {
  border: none;
  padding: 0;
  margin: 0;
  min-width: 0;
}

.agds-control-group__meta {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
}

.agds-control-group__meta--has-label {
  margin-top: var(--agds-space-1);
}

.agds-control-group__items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--agds-space-2);
  padding-top: var(--agds-space-1);
  width: 100%;
}

.agds-control-group__items--block {
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>
