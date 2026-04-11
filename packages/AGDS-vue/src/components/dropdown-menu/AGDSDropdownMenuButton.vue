<script setup lang="ts">
import { DropdownMenuTrigger } from 'reka-ui'

export interface AGDSDropdownMenuButtonProps {
  /**
   * Visual style of the trigger button.
   *
   * - `'primary'` — Filled, high-contrast. Use at most once per view.
   * - `'secondary'` — Outlined. Pair alongside a primary action.
   * - `'tertiary'` — No border, underlined text. Lower-priority actions.
   * - `'text'` — Plain text with no border or background (default). Best for compact toolbars.
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text'
  /**
   * Size of the trigger button.
   *
   * - `'sm'` — Compact; suits toolbars and dense layouts.
   * - `'md'` — Standard size (default).
   * - `'lg'` — Larger touch target; suits prominent call-to-action placements.
   */
  size?: 'sm' | 'md' | 'lg'
  /** When true, the button stretches to fill the width of its container. */
  block?: boolean
  /** When true, the button is non-interactive and visually dimmed. */
  disabled?: boolean
}

const props = withDefaults(defineProps<AGDSDropdownMenuButtonProps>(), {
  variant: 'text',
  size: 'md',
  block: false,
  disabled: false,
})
</script>

<template>
  <!--
    DropdownMenuTrigger renders as a <button> by default.
    Reka wires: aria-haspopup="menu", aria-expanded, aria-controls, onClick toggle,
    data-state="open|closed", ArrowDown opens menu, Enter/Space toggles.
  -->
  <DropdownMenuTrigger :disabled="disabled">
    <span :class="[
      'agds-button',
      `agds-button--${props.variant}`,
      `agds-button--${props.size}`,
      { 'agds-button--block': props.block },
      'agds-dropdown-menu__trigger',
      'agds-dropdown-menu-btn',
    ]">
      <span class="agds-button__label agds-dropdown-menu-btn__label">
        <slot />
      </span>
      <span
        aria-hidden="true"
        class="agds-dropdown-menu-btn__chevron"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </span>
  </DropdownMenuTrigger>
</template>

<style scoped>
</style>
