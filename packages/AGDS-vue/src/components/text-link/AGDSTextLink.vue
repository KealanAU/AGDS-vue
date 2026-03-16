<script setup lang="ts">
import { ref } from 'vue'
export interface AgDSTextLinkProps {
  /** URL the link navigates to */
  href: string
  /**
   * When to show the focus ring.
   * 'keyboard' — only for keyboard/sequential navigation (default).
   * 'all' — always show, including programmatic focus.
   */
  focusRingFor?: 'keyboard' | 'all'
}

withDefaults(defineProps<AgDSTextLinkProps>(), {
  focusRingFor: 'keyboard',
})

defineEmits<{
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const anchorEl = ref<HTMLAnchorElement | null>(null)
defineExpose({ focus: () => anchorEl.value?.focus() })
</script>

<template>
  <a
    ref="anchorEl"
    :href="href"
    :class="[
      'agds-text-link',
      { 'agds-text-link--focus-all': focusRingFor === 'all' },
    ]"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <slot />
  </a>
</template>

<style scoped>
.agds-text-link {
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-skip-ink: auto;
  transition: color var(--agds-transition-fast);
}

.agds-text-link:hover {
  color: var(--agds-color-action-primary-hover);
  text-decoration-thickness: 2px;
}

.agds-text-link:active {
  color: var(--agds-color-action-primary-active);
}

.agds-text-link:focus-visible,
.agds-text-link--focus-all:focus {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
