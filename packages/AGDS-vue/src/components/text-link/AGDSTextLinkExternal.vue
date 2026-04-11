<script setup lang="ts">
import AGDSTextLink from './AGDSTextLink.vue'
import type { AGDSTextLinkProps } from './AGDSTextLink.vue'
import AGDSExternalLinkCallout from '../visually-hidden/AGDSExternalLinkCallout.vue'
import AGDSIcon from '../icon/AGDSIcon.vue'

export interface AGDSTextLinkExternalProps extends Omit<AGDSTextLinkProps, 'focusRingFor'> {
  /** When to show the focus ring. */
  focusRingFor?: AGDSTextLinkProps['focusRingFor']
}

withDefaults(defineProps<AGDSTextLinkExternalProps>(), {
  focusRingFor: 'keyboard',
})

defineEmits<{
  /** Emitted when the external link is clicked. */
  click: [event: MouseEvent]
  /** Emitted when the link receives focus. */
  focus: [event: FocusEvent]
  /** Emitted when the link loses focus. */
  blur: [event: FocusEvent]
}>()
</script>

<template>
  <AGDSTextLink
    :href="href"
    :focus-ring-for="focusRingFor"
    rel="noopener noreferrer"
    target="_blank"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <slot />
    <AGDSExternalLinkCallout />
    <AGDSIcon
      name="mdi:open-in-new"
      size="sm"
      class="agds-text-link-external__icon"
      aria-hidden="true"
    />
  </AGDSTextLink>
</template>

<style scoped>
.agds-text-link-external__icon {
  position: relative;
  top: 3px;
  margin-inline-start: var(--agds-space-1);
  flex-shrink: 0;
}
</style>
