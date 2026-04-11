<script setup lang="ts">
import { computed, inject } from 'vue'
import { CARD_CONTEXT_KEY } from './cardContext'

export interface AGDSCardLinkProps {
  /**
   * Element or component to render as.
   * Use 'RouterLink' / your router's link component for client-side navigation.
   */
  as?: string
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AGDSCardLinkProps>(), {
  as: 'a',
})

const context = inject(CARD_CONTEXT_KEY)

// When the parent Card is clickable, the link's ::after covers the whole card.
// The parent card itself handles the focus ring, so the link suppresses its own.
const isClickable = computed(() => !!context?.clickable)
</script>

<template>
  <component
    :is="props.as"
    v-bind="$attrs"
    :class="[
      'agds-card-link',
      isClickable && 'agds-card-link--clickable',
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.agds-card-link {
  color: var(--agds-color-brand);
  text-decoration: underline;
  font-weight: var(--agds-font-weight-semibold);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.agds-card-link:hover {
  color: var(--agds-color-brand-hover);
}

/* Standard focus ring for links in non-clickable cards. */
.agds-card-link:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Clickable card mode ─────────────────────────────────── */

/* Stretch the link's hit-area to cover the entire card surface. */
.agds-card-link--clickable::after {
  content: '';
  position: absolute;
  inset: 0;
}

/* Card wrapper handles the focus ring; suppress the link's own ring. */
.agds-card-link--clickable:focus,
.agds-card-link--clickable:focus-visible {
  outline: none;
}
</style>
