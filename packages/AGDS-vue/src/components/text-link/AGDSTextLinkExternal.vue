<script setup lang="ts">
import AgDSTextLink from './AGDSTextLink.vue'
import type { AgDSTextLinkProps } from './AGDSTextLink.vue'
import AgDSExternalLinkCallout from '../visually-hidden/AGDSExternalLinkCallout.vue'
import AgDSIcon from '../icon/AGDSIcon.vue'

export interface AgDSTextLinkExternalProps extends Omit<AgDSTextLinkProps, 'focusRingFor'> {
  /** When to show the focus ring. */
  focusRingFor?: AgDSTextLinkProps['focusRingFor']
}

withDefaults(defineProps<AgDSTextLinkExternalProps>(), {
  focusRingFor: 'keyboard',
})

defineEmits<{
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
</script>

<template>
  <AgDSTextLink
    :href="href"
    :focus-ring-for="focusRingFor"
    rel="noopener noreferrer"
    target="_blank"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <slot />
    <AgDSExternalLinkCallout />
    <AgDSIcon
      name="mdi:open-in-new"
      size="sm"
      class="agds-text-link-external__icon"
      aria-hidden="true"
    />
  </AgDSTextLink>
</template>

<style scoped>
.agds-text-link-external__icon {
  position: relative;
  top: 3px;
  margin-inline-start: var(--agds-space-1);
  flex-shrink: 0;
}
</style>
