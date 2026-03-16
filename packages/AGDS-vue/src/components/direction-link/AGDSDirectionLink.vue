<script setup lang="ts">
import AgDSIcon from '../icon/AGDSIcon.vue'

export type Direction = 'up' | 'right' | 'down' | 'left'

export interface AgDSDirectionLinkProps {
  /** URL the link navigates to */
  href: string
  /** Arrow direction displayed alongside the link text */
  direction: Direction
  /** Opens link in a new tab. Automatically appends accessible offscreen text. */
  external?: boolean
  /**
   * When to show the focus ring.
   * 'keyboard' — only for keyboard/sequential navigation (default).
   * 'all' — always show, including programmatic focus.
   */
  focusRingFor?: 'keyboard' | 'all'
}

withDefaults(defineProps<AgDSDirectionLinkProps>(), {
  external: false,
  focusRingFor: 'keyboard',
})

defineEmits<{
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const ICON_MAP: Record<Direction, string> = {
  up: 'mdi:arrow-up',
  right: 'mdi:arrow-right',
  down: 'mdi:arrow-down',
  left: 'mdi:arrow-left',
}
</script>

<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[
      'agds-direction-link',
      { 'agds-direction-link--focus-all': focusRingFor === 'all' },
    ]"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <AgDSIcon
      v-if="direction === 'left'"
      :name="ICON_MAP[direction]"
      size="sm"
      class="agds-direction-link__icon"
      aria-hidden="true"
    />

    <slot />

    <AgDSIcon
      v-if="direction !== 'left'"
      :name="ICON_MAP[direction]"
      size="sm"
      class="agds-direction-link__icon"
      aria-hidden="true"
    />

    <span v-if="external" class="sr-only">, opens in a new tab</span>
  </a>
</template>

<style scoped>
.agds-direction-link {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-2);

  font-family: var(--agds-font-family-body);
  font-weight: var(--agds-font-weight-normal);
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-skip-ink: auto;

  cursor: pointer;
  transition: color var(--agds-transition-fast);
}

.agds-direction-link:hover {
  color: var(--agds-color-action-primary-hover);
}

.agds-direction-link:active {
  color: var(--agds-color-action-primary-active);
}

.agds-direction-link:focus-visible,
.agds-direction-link--focus-all:focus {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

.agds-direction-link__icon {
  flex-shrink: 0;
  transition: transform var(--agds-transition-fast);
}

.agds-direction-link:hover .agds-direction-link__icon {
  transform: scale(1.2);
}

.sr-only {
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
